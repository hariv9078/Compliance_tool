import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function GET() {
  try {
    // Await cookies() since it's now async in Next.js 13+
    const cookieStore = await cookies(); 
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { username: string };

    const result = await db.query(
      "SELECT user_id, username, fpr, approver, hod FROM users WHERE username = $1",
      [decoded.username]
    );
    
    
    console.log("Database Response:", result.rows[0]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error in GET /user:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
