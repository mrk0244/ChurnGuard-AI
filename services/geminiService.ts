import { GoogleGenAI, Type } from "@google/genai";
import { CustomerProfile, ChurnPrediction } from "../types";

// Initialize Gemini
// Note: In a real production app, you might proxy this through a backend.
// For this demo, we use the environment variable directly.
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeChurnRisk = async (profile: CustomerProfile): Promise<ChurnPrediction> => {
  const ai = getAiClient();

  const prompt = `
    Act as an expert Data Scientist specializing in Telecom Customer Churn prediction using Random Forest and Gradient Boosting techniques.
    Analyze the following customer profile and predict the likelihood of them leaving the service (churning).
    
    Customer Profile:
    ${JSON.stringify(profile, null, 2)}
    
    Consider these typical patterns in the Telco Churn dataset:
    - Month-to-month contracts have higher churn.
    - Fiber optic internet users often have higher churn due to price or competition.
    - Lack of tech support or online security increases risk.
    - Electronic check payment method is often correlated with higher churn.
    - Long tenure and 2-year contracts drastically reduce churn.
    
    Provide a precise probability, risk level, key contributing factors (simulating feature importance), and a personalized retention strategy.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          churnProbability: {
            type: Type.NUMBER,
            description: "The probability of churn as a percentage (0-100).",
          },
          riskLevel: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High", "Critical"],
          },
          factors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                factor: { type: Type.STRING },
                impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                direction: { type: Type.STRING, enum: ["Positive", "Negative"], description: "Positive means increases churn risk, Negative decreases it." },
                description: { type: Type.STRING },
              },
              required: ["factor", "impact", "direction", "description"],
            },
          },
          retentionStrategy: {
            type: Type.STRING,
            description: "A specific action plan to keep this customer.",
          },
          recommendedOffer: {
            type: Type.STRING,
            description: "A specific discount or add-on to offer.",
          },
        },
        required: ["churnProbability", "riskLevel", "factors", "retentionStrategy", "recommendedOffer"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini.");
  }

  return JSON.parse(text) as ChurnPrediction;
};
