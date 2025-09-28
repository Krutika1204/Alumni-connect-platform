
import { GoogleGenAI } from "@google/genai";
import { Profile } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable is not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getCareerAdvice = async (profile: Profile): Promise<string> => {
  if (!API_KEY) {
    return "The AI Career Advisor is currently unavailable. An API key has not been configured.";
  }

  const prompt = `
    Based on the following user profile, act as an expert career advisor and provide some actionable advice. 
    The user is part of a university alumni network.

    **User Profile:**
    - Degree: ${profile.degree}
    - Graduation Year: ${profile.graduationYear}
    - Current Role: ${profile.jobTitle} at ${profile.company}
    - Industry: ${profile.industry}
    - Bio: "${profile.bio}"

    **Your Task:**
    1.  Suggest 2-3 potential career advancement paths or alternative roles that align with their background.
    2.  Recommend 3-5 key skills they should focus on developing for future growth in their field.
    3.  Provide one piece of networking advice specific to leveraging an alumni network.

    Format your response in simple markdown. Use headings and bullet points.
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching career advice from Gemini:", error);
    return "Sorry, I couldn't generate career advice at this time. Please try again later.";
  }
};
