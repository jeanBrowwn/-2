import { GoogleGenAI, Part, Modality } from "@google/genai";
import { ProjectData } from '../types';

// 파일(File) 객체를 Gemini API가 요구하는 Part 형식으로 변환하는 헬퍼 함수
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateArchitecturalImage = async (projectData: ProjectData): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { originalImage, conceptImage, location, requirements } = projectData;

  try {
    // Image editing path
    if (originalImage && conceptImage) {
      const promptParts: Part[] = [
        await fileToGenerativePart(originalImage),
        await fileToGenerativePart(conceptImage),
      { text: `
        **Objective: Photorealistic Architectural Synthesis**

        **1. Core Task:**
        - Analyze the first image (a building site at ${location}) and the second image (an architectural concept).
        - Your primary goal is to edit the first image. You must meticulously remove the existing building and replace it with a new one that is a high-fidelity realization of the concept from the second image.

        **2. Contextual Integration (Critical):**
        - **Lighting & Shadows:** The new building's lighting must perfectly match the soft, diffused ambient light and shadow direction of the original street scene. Avoid harsh contrasts from the concept image.
        - **Scale & Perspective:** The new building must be seamlessly integrated into the original image's perspective, scale, and lens distortion.
        - **Environmental Harmony:** Ensure that existing urban elements like power lines, poles, and street signs integrate logically with the new structure, either passing in front of or behind it as physically appropriate.

        **3. Architectural & Style Requirements:**
        - Adhere strictly to the user's requirements: "${requirements}".
        - The new building's form, materials, and key features (like the rounded corners and rooftop vegetation from the concept) must be the primary inspiration.

        **4. Realism Enhancement (Imperfection Application):**
        - Apply subtle urban weathering and material variations to the new building's facade to avoid an overly clean, "CG" look.
        - The glass windows of the new building must generate realistic reflections of the opposite buildings and streetscape visible in the original photo.

        **5. Final Output:**
        - The final output must be **only the edited, photorealistic image**. Do not add any text, watermarks, or explanations.
      `},
    ];
      
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: promptParts },
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });

      for (const part of result.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
          const { mimeType, data } = part.inlineData;
          return `data:${mimeType};base64,${data}`;
        }
      }

      const refusalText = result.text;
      throw new Error(`The AI did not return an image. It might have refused the request. Reason: ${refusalText || 'No image data found in response.'}`);

    } else {
      // Text-to-image generation path
      const prompt = `
        Generate a professional, photorealistic architectural photograph of a brand new building located at "${location}".
        The building should be a complete replacement synthesis, seamlessly integrated into its surrounding streetscape.
        The architectural style and features must follow these requirements: "${requirements}".
        Apply creative GPS navigation:
        - POSITIVE destination: modern, sustainable, innovative design, high-end materials like glass, steel, and natural wood.
        - NEGATIVE safety boundaries: avoid unrealistic elements, distorted perspectives, or elements that clash with an urban environment.
        - LATENT GAP creative playground: explore creative lighting, dynamic angles, and a sense of lived-in reality.
        The final image should have a professional quality, with realistic lighting, shadows, and textures.
        Camera: Use a wide-angle lens (around 24mm) at eye-level to capture the building in its context.
        Lighting: Golden hour warmth with soft ambient shadows.
        Atmosphere: Clear day clarity, post-rain freshness.
      `;
      
      const result = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '16:9',
        },
      });
      
      if (result.generatedImages?.[0]?.image?.imageBytes) {
        const base64ImageBytes = result.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
      }

      throw new Error('The AI did not return an image. No image data found in response.');
    }
  } catch (e) {
    console.error("Error during Gemini API call:", e);
    throw new Error(`Failed to generate image. Details: ${e instanceof Error ? e.message : String(e)}`);
  }
};
