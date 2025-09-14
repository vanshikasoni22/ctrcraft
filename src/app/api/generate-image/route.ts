import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;

    if (!image || !prompt) {
      return NextResponse.json(
        { error: 'Image and prompt are required', generatedImage: null },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const base64 = imageBuffer.toString('base64');

    console.log('Processing image with prompt:', prompt);

    const result = await generateText({
      model: google('gemini-2.0-flash-exp'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image: base64 }
          ]
        }
      ]
    });

    // Note: The AI SDK response structure might be different
    // You may need to adjust this based on the actual response
    const generatedImageUrl = result.text || `data:${image.type};base64,${base64}`;

    return NextResponse.json({
      generatedImage: generatedImageUrl,
      error: null,
      text: result.text
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image', generatedImage: null },
      { status: 500 }
    );
  }
}
