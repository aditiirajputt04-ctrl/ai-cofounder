
import { GoogleGenAI, Type } from "@google/genai";
import { StartupPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStartupPlan = async (userIdea: string, userName: string, userRole: string): Promise<StartupPlan> => {
  // Using gemini-flash-lite-latest for the absolute fastest response time possible
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: `Analyze: "${userIdea}". Founder: ${userName} (${userRole}).`,
    config: {
      systemInstruction: "You are a speed-optimized strategist. Provide a dense, high-impact JSON business blueprint. Be telegraphic. No conversational filler. Focus on high-signal market gaps. Output strictly JSON.",
      responseMimeType: "application/json",
      maxOutputTokens: 1000, // Strictly limit output to reduce generation time
      thinkingConfig: { thinkingBudget: 0 }, // Ensure zero latent reasoning time
      temperature: 0, // Deterministic, zero-hesitation output
      topP: 0.1, 
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          refinedIdea: { type: Type.STRING },
          targetUsers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                userType: { type: Type.STRING },
                painPoint: { type: Type.STRING }
              },
              required: ["userType", "painPoint"]
            }
          },
          mvpFeatures: {
            type: Type.OBJECT,
            properties: {
              mustHave: { type: Type.ARRAY, items: { type: Type.STRING } },
              optional: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          monetization: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                modelName: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          pitchSummary: { type: Type.STRING },
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          competitors: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                marketPosition: { type: Type.STRING },
                keyDifferentiator: { type: Type.STRING },
                strategicGap: { type: Type.STRING }
              },
              required: ["name", "marketPosition", "keyDifferentiator", "strategicGap"]
            } 
          },
          founderNote: { type: Type.STRING }
        },
        required: ["refinedIdea", "targetUsers", "mvpFeatures", "monetization", "pitchSummary", "swot", "competitors", "founderNote"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate plan");
  }

  return JSON.parse(response.text.trim()) as StartupPlan;
};

export const getDemoPlan = (): StartupPlan => ({
  refinedIdea: "A hyper-local delivery ecosystem that utilizes existing neighborhood networks to deliver fresh groceries and essentials in under 15 minutes.",
  targetUsers: [
    { userType: "Urban Professionals", painPoint: "High time-poverty leading to poor nutrition and reliance on expensive takeout." },
    { userType: "Eco-conscious Families", painPoint: "Wanting local produce without the logistics of visiting multiple markets." }
  ],
  mvpFeatures: {
    mustHave: [
      "Real-time Inventory Sync",
      "Dynamic Neighborhood Courier App",
      "Contactless Micro-Drop Zones",
      "Predictive Reordering Algorithm"
    ],
    optional: [
      "Subscription-based 'Infinite' tier",
      "Community Garden Integration"
    ]
  },
  monetization: [
    { modelName: "Logistics-as-a-Service", description: "Taking a 15% fulfillment fee from local vendors per transaction." },
    { modelName: "Premium Subscription", description: "Monthly $19.99 for unlimited 15-min deliveries and zero markup." }
  ],
  pitchSummary: "Our platform bridges the gap between local quality and modern convenience. By empowering neighborhood networks to fulfill demand, we create a sustainable, high-velocity commerce engine that beats traditional big-box delivery on speed, freshness, and community impact.",
  swot: {
    strengths: ["Ultra-low latency delivery", "Localized trust", "Low overhead"],
    weaknesses: ["Scale limitations", "Courier dependability"],
    opportunities: ["Urban density growth", "Partnerships with local farmers"],
    threats: ["Gig economy regulations", "Established player price wars"]
  },
  competitors: [
    { 
      name: "Instacart", 
      marketPosition: "High-Volume Market Aggregator",
      keyDifferentiator: "Massive retailer partnership network and established trust with major chains.",
      strategicGap: "Generic logistics and high markups. We win on the 15-minute promise and hyper-local vendor focus that Instacart's 'big-box' infrastructure cannot support."
    },
    { 
      name: "Getir", 
      marketPosition: "Venture-Backed Speed Specialist",
      keyDifferentiator: "Proprietary dark-store network optimized for rapid pick-and-pack operations.",
      strategicGap: "Getir relies on expensive owned-inventory dark stores. Our 'Neighborhood Network' model leverages existing vendor infrastructure, ensuring lower burn and better community ties."
    },
    { 
      name: "DoorDash DashMart", 
      marketPosition: "Eco-System Expansion Leader",
      keyDifferentiator: "Existing user-base from meal delivery allows for seamless cross-selling into convenience.",
      strategicGap: "Lacks the specialized 'fresh/local' grocery identity. Customers view them as a food app; we are a community-first infrastructure for local quality produce."
    }
  ],
  founderNote: "Great concept! As an Aspiring Entrepreneur, this model balances operational complexity with high community value. Focus on the micro-logistics first."
});
