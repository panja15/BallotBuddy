// file: app/api/chat/route.js
import { NextResponse } from 'next/server';
import { generateResponse } from '../../../lib/gemini';
import { SYSTEM_PROMPT } from '../../../prompts/chatPrompt';
import { retrieveContext } from '../../../rag/retriever';

export async function POST(req) {
  try {
    const { message, userData } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Combine knowledge base context with user-specific data (if provided)
    const baseContext = await retrieveContext(message);
    const userContext = userData ? `User Data: ${JSON.stringify(userData)}` : 'No user data provided.';
    const finalContext = `${baseContext}\n\n${userContext}`;

    // Format the prompt
    const formattedPrompt = SYSTEM_PROMPT
      .replace('{context}', finalContext)
      .replace('{query}', message);

    const rawResponse = await generateResponse(formattedPrompt);
    
    // Attempt to parse JSON from Gemini's response
    try {
      // Sometimes Gemini wraps JSON in code blocks
      const cleanJson = rawResponse.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return NextResponse.json(parsed);
    } catch (parseError) {
      // Fallback for non-JSON responses
      return NextResponse.json({
        answer: rawResponse,
        reasoning: ["General assistance provided."],
        nextSteps: ["Check the official ECI portal for more details."],
        source: "Election Commission of India"
      });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
