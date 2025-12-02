import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@example.com" }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    // Create the user using Better Auth to handle password hashing
    // Note: internal calls usually don't need full request context if properly mocked or supported
    // But auth.api.signUpEmail might expect headers. 
    // If it fails, we'll instruct user to use the UI (if I enable signup temporarily) 
    // or use a dedicated seed script.
    
    // Let's try to use the internal functionality if possible, or just rely on the fact 
    // that this route is a real request handler.
    // We need to construct a request? 
    // auth.api.signUpEmail IS the handler logic in some frameworks, but in better-auth 
    // it calls the API.
    
    // Actually, better-auth allows server-side actions.
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@example.com",
        password: "password123",
        name: "Admin User",
        // role: "admin" // might be ignored by default validator
      }
    });

    if (user?.user) {
      // Manually promote to admin
      await prisma.user.update({
        where: { id: user.user.id },
        data: { role: "admin" },
      });
      
      return NextResponse.json({ success: true, message: "Admin created. Email: admin@example.com, Pass: password123" });
    }
    
    return NextResponse.json({ error: "Failed to create user" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

