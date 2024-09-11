import { getServerAuthSession } from "@/server/auth";
import { NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';


export async function POST(req: Request) {

  try {
    const session: any = await authenticateUser();
    if (!session)
      return NextResponse.json({
        error: "Unauthorized",
      }, {
        status: 401,
      });


    const { messages } = await req.json();
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();


  } catch (error) {
    return NextResponse.json({
      error: error,
    }, {
      status: 401,
    });
  }
}



async function authenticateUser() {
  try {
    const session = await getServerAuthSession();
    if (session) return session;

    // const token = headers().get('Authorization')?.trim()
    // if (!session && token) {
    //   const userSession = await verifyAuth(token);
    //   return userSession;
    // }

    return null;
  } catch (error) {
    console.log("Error authenticating user: ", error);
    return null;
  }
}