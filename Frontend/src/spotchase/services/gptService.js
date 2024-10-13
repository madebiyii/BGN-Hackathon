"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_SECRET_KEY,
});

// Used to generate content for genre pages
export async function generateContent(genre) {
  const prompt = `Create a detailed, engaging description for a genre page focused on ${genre} music. The description should resemble a horoscope, characterizing the type of person who typically enjoys this genre. Describe their personality traits, hobbies, and lifestyle in a way that resonates with fans of ${genre} music, while ensuring the content is inclusive and respectful to all readers. The aim is to entertain and inform, making the reader feel seen and connected to the genre through a mix of factual information about ${genre} and creative insights into the community that surrounds it. Avoid mentioning any specific app or service, and ensure the content is standalone and complete. The content should be written in a friendly, engaging tone that captures the essence of ${genre} music.`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
      top_p: 1,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}
