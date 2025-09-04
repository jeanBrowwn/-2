
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ProjectData } from '../types';

const fileToGenerativePart = async (file: File) => {
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
  
  if (projectData.originalImage && projectData.conceptImage) {
    // Image Editing path
    const { originalImage, conceptImage, location, requirements } = projectData;
    
    const originalImagePart = await fileToGenerativePart(originalImage);
    const conceptImagePart = await fileToGenerativePart(conceptImage);

    const prompt = `
      Analyze the first image, which shows a building site at ${location}.
      Now, look at the second image, which shows a concept for a new building.
      Your task is to edit the first image. You must seamlessly remove the existing building and replace it with a new one that is heavily inspired by the architecture in the second image.
      The new building must fit realistically into the context of the first image (lighting, shadows, scale, perspective).
      Incorporate the following user requirements: "${requirements}".
      The final output must be only the edited, photorealistic image. Do not add any text.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    originalImagePart,
                    conceptImagePart,
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: ['IMAGE', 'TEXT'],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }
        throw new Error("The AI did not return an image. It might have refused the request. Response: " + response.text);
    } catch (e) {
        console.error("Error during image editing generation:", e);
        throw new Error("Failed to generate image with image editing model. Please check your inputs and API key.");
    }
    
  } else {
    // Text-to-Image path
    const { location, requirements } = projectData;
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

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '16:9',
            },
        });
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (e) {
        console.error("Error during text-to-image generation:", e);
        throw new Error("Failed to generate image with text-to-image model. The prompt may have been blocked. Please check your inputs and API key.");
    }
  }

  throw new Error("Could not generate image. Please ensure you have provided either both images for editing, or text prompts for generation.");
};
