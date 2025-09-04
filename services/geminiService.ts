import { GoogleGenerativeAI, Part } from "@google/generative-ai";
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
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  
  // API 클라이언트 초기화 방식 수정
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // 모델 인스턴스 생성 방식 수정 (최신 안정 모델 사용)
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const { originalImage, conceptImage, location, requirements } = projectData;

  // 텍스트와 이미지를 구분하여 처리하는 조건부 로직
  if (originalImage && conceptImage) {
    // 이미지 편집 경로 (두 이미지가 모두 제공된 경우)
    const promptParts: Part[] = [
      await fileToGenerativePart(originalImage),
      await fileToGenerativePart(conceptImage),
      { text: `
        Analyze the first image (a building site at ${location}) and the second image (a concept for a new building).
        Your task is to edit the first image. Seamlessly remove the existing building and replace it with a new one heavily inspired by the architecture in the second image.
        The new building must fit realistically into the context of the first image (lighting, shadows, scale, perspective).
        Incorporate user requirements: "${requirements}".
        The final output must be only the edited, photorealistic image without any text.
      `},
    ];
    
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: promptParts }],
      });

      const response = result.response;
      const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

      if (imagePart && imagePart.inlineData) {
          const { mimeType, data } = imagePart.inlineData;
          return `data:${mimeType};base64,${data}`;
      }
      
      const refusalText = response.text();
      throw new Error(`The AI did not return an image. It might have refused the request. Reason: ${refusalText || 'No reason provided.'}`);

    } catch (e) {
      console.error("Error during Gemini API call (Image Editing):", e);
      throw new Error(`Failed to generate image. Details: ${e instanceof Error ? e.message : String(e)}`);
    }

  } else {
    // 텍스트-이미지 생성 경로 (이미지가 제공되지 않은 경우)
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
      Output format: 16:9 aspect ratio.
    `;
    
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            const { mimeType, data } = imagePart.inlineData;
            return `data:${mimeType};base64,${data}`;
        }

        const refusalText = response.text();
        throw new Error(`The AI did not return an image. It might have refused the request. Reason: ${refusalText || 'No reason provided.'}`);
    } catch (e) {
        console.error("Error during Gemini API call (Text-to-Image):", e);
        throw new Error(`Failed to generate image. Details: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
};