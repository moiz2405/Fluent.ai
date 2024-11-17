import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';

let chatSession: ChatSession | undefined;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      throw new Error('No message received');
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Gemini API key is missing');
    }

    // Initialize the chat session if it's the first request
    if (!chatSession) {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      chatSession = model.startChat({
        history: [
          { role: 'user', parts: [{ text: 'Hello' }] },
          {
            role: 'model',
            parts: [
              {
                text: 'You are FluentAI, an English tutor. Your job is to help users learn English, improve their grammar, pronunciation, vocabulary, and writing skills. Answer questions and explain concepts clearly, helping with exercises if asked. Keep the conversation focused on learning English. If a user asks something not related to English learning, gently steer them back to English-related topics.'
              }
            ]
          },
          { role: 'model', parts: [{ text: 'I can assist with grammar, vocabulary, pronunciation, and more. What would you like to work on?' }] }
        ],
      });
    }

    // Send the user's message and get the model's response
    const chatResponse = await chatSession.sendMessage(message);
    const botResponse = chatResponse.response.text();

    return NextResponse.json({
      status: 'success',
      data: { response: botResponse },
    });
  } catch (error: unknown) {
    // Type guard for error to check if it's an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({
        status: 'error',
        message: error.message || 'An unexpected error occurred.',
      });
    }

    // In case error is not an instance of Error
    return NextResponse.json({
      status: 'error',
      message: 'An unexpected error occurred.',
    });
  }
}
