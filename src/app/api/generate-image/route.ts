// app/api/generate-image/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

export async function POST(req: Request) {
  try {
    // Parse FormData instead of JSON
    const formData = await req.formData();
    const prompt = formData.get("prompt") as string;
    const imageFile = formData.get("image") as File;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    // Initialize the GoogleGenAI client
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_AI_API_KEY!, // Make sure this is set in your .env.local
    });

    // Prepare the content array for the AI model
    const contents: any[] = [
      { 
        text: `You are an AI powered YouTube thumbnail Generator. Your job is to generate high quality YouTube Thumbnails. Make sure to create the thumbnail in aspect ratio 16:9, add relevant text in modern and readable font. The thumbnail should compel people to click. Avoid NSFW, violence, or disallowed content. Topic of the video - ${prompt}`
      }
    ];

    // Convert uploaded image to base64 and add to content if provided
    if (imageFile && imageFile.size > 0) {
      const buffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const mimeType = imageFile.type || "image/jpeg";

      contents.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      });
    }

    // Generate image with AI using Gemini's image generation capability
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Check if response is valid
    if (!response.candidates || response.candidates.length === 0) {
      return NextResponse.json(
        { error: "No response from AI model" },
        { status: 500 }
      );
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      return NextResponse.json(
        { error: "No content in AI response" },
        { status: 500 }
      );
    }

    // Look for image data in the response parts
    let generatedImageBase64 = null;
    let responseText = null;

    for (const part of candidate.content.parts) {
      if (part.text) {
        responseText = part.text;
      } else if (part.inlineData) {
        // Convert the image data to base64 data URL
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType || "image/png";
        generatedImageBase64 = `data:${mimeType};base64,${imageData}`;
        break; // Use the first image found
      }
    }

    if (!generatedImageBase64) {
      return NextResponse.json(
        { error: "No image generated in response" },
        { status: 500 }
      );
    }

    // Return with the field name the frontend expects
    return NextResponse.json({ 
      generatedImage: generatedImageBase64,
      text: responseText // Optional: include any text response
    });

  } catch (err: any) {
    console.error("Image generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate image", details: err.message },
      { status: 500 }
    );
  }
}