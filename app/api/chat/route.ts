//app/api/chat/route.ts
import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';  // Assuming you're using Axios

// Initialize Hugging Face API client
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: Request) {
    const { message } = await req.json();
    console.log('Received message:', message); // Check the received message

    // Validate input
    if (!message || message.trim() === '') {
      return NextResponse.json({ data: 'Invalid input message.' }, { status: 400 });
    }

    try {
        const response = await hf.textGeneration({
            model: 'DmitryYarov/aristotle_based_on_rugpt3large_based_on_gpt',
            inputs: message,
            parameters: { max_length: 150, temperature: 0.7 },
          });


      const botMessage = response?.generated_text || "I'm sorry, I couldn't process that.";
      return NextResponse.json({ data: botMessage });
    } catch (error: unknown) {  // error is typed as 'unknown'
        console.error('Error during API call:', error);

        // Narrow the type using instanceof
        if (error instanceof AxiosError) {
            console.error('Hugging Face API response error:', error.response?.data);
        } else if (error instanceof Error) {
            console.error('General error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }

        return NextResponse.json({ data: "Sorry, something went wrong." }, { status: 500 });
    }


  }
