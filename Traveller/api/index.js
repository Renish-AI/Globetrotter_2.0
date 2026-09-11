import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake-key');

app.post('/api/ai/generate-itinerary', async (req, res) => {
  try {
    const { destination, budget, days, interests } = req.body;

    if (!days || !interests) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const prompt = `
      You are an expert travel planner. Generate a highly detailed itinerary for a trip.
      Parameters:
      - Destination: ${destination || 'Global'}
      - Budget: ${budget || 'Flexible'}
      - Duration: ${days} days
      - Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}

      Respond STRICTLY with a valid JSON object matching this structure:
      {
        "stops": [
          {
            "name": "City Name",
            "type": "city",
            "days": 2,
            "activities": [
              {
                "name": "Activity Name",
                "description": "Brief description",
                "estimatedCost": 50
              }
            ]
          }
        ]
      }
      Do not include any markdown formatting, backticks, or extra text. Just the JSON object.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let jsonResult;
    try {
        const cleanText = text.replace(/```json\n?|```/g, '').trim();
        jsonResult = JSON.parse(cleanText);
    } catch (e) {
        console.error('Failed to parse AI response:', text);
        return res.status(500).json({ error: 'Invalid response format from AI' });
    }

    res.json(jsonResult);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`GlobeTrotter backend running on port ${port}`);
  });
}

export default app;
