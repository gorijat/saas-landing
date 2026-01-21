import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";



export async function POST(req: Request) { // Handle subscription
  const { email } = await req.json(); // Extract email from request body

  if (!email || !email.includes('@')) { // Basic email validation
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), 'emails.txt'); // Path to store emails

  fs.appendFileSync(filePath, email + '\n'); // Append email to file

    return NextResponse.json({ message: 'Success' }); // Return success response

}