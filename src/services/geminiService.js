import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key.
// IMPORTANT: In a real production app, NEVER expose your API key directly in client-side code.
// You should proxy these requests through your own backend.
// For this demo, we will check if the key exists in env variables or use a placeholder string.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(apiKey);

export const generateAIResponse = async (prompt, complexity = "normal") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    let systemInstruction = "";
    switch (complexity) {
      case "explain-like-im-10":
        systemInstruction = "You are a friendly AI study assistant. Explain the following concept simply and clearly, as if you are talking to a 10-year-old. Use analogies a kid would understand.";
        break;
      case "detailed":
        systemInstruction = "You are an expert AI study assistant. Provide a highly detailed, comprehensive, and advanced explanation of the following concept, suitable for a college-level student.";
        break;
      case "normal":
      default:
        systemInstruction = "You are a helpful AI study assistant. Provide a clear, concise, and informative answer to the following question, suitable for a high school student.";
        break;
    }

    const fullPrompt = `${systemInstruction}\n\nQuestion: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return `Sorry, an error occurred: ${error.message}`;
  }
};

export const generateQuizQuestions = async (topic) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `Generate exactly 10 multiple choice questions about "${topic}". 
        Format the output strictly as a JSON array of objects. Do not use markdown blocks like \`\`\`json. Just output the raw JSON array.
        Each object should have:
        - "question": The question text
        - "options": An array of exactly 4 strings representing the choices
        - "correctAnswer": The exact string of the correct choice from the options array.`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();
        
        // Clean up potential markdown formatting from Gemini
        if (text.startsWith("```json")) {
            text = text.substring(7);
        }
        if (text.startsWith("```")) {
            text = text.substring(3);
        }
        if (text.endsWith("```")) {
            text = text.substring(0, text.length - 3);
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating quiz:", error);
        // Fallback mock questions
        return Array.from({ length: 10 }, (_, i) => ({
            question: `Sample Question ${i + 1} about ${topic}`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A"
        }));
    }
}
