// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// export async function GET() {
//   try {
//     console.log("Fetching cookies...");
    
//     const cookieStore = cookies();
//     const token = cookieStore.get("auth_token")?.value;
//     console.log("Token received:", token);

//     if (!token) {
//       console.error("No token found, unauthorized request.");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
//     // console.log("Decoded token:", decoded);

//     // Use "decoded.username" instead of email
//     const username = decoded.username;
//     // console.log("Fetching data for username:", username);

//     // Ensure column names are correctly formatted
//     const result = await db.query(
//       `SELECT * FROM sourcefile 
//        WHERE "fpr" = $1 OR "approver" = $1 OR "hod" = $1`,
//       [username] 
//     );
    
//     // console.log("Query Result:", result.rows);

//     return NextResponse.json({ data: result.rows });
//   } catch (error) {
//     console.error("Error in GET /api/sourcefile:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// API route to get filter options
export async function GET(request) {
  try {
    console.log("Fetching cookies...");
    
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    console.log("Token received:", token);

    if (!token) {
      console.error("No token found, unauthorized request.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
    const username = decoded.username;
    
    // Get URL to parse query parameters
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    // If action is 'getOptions', fetch distinct values for dropdown options
    if (action === 'getOptions') {
      const columnName = searchParams.get('column');
      if (!columnName) {
        return NextResponse.json({ error: "Column name is required" }, { status: 400 });
      }
      
      // Fetch distinct values for the specified column
      // Using parameterized query for column name is not directly supported in most SQL implementations
      // so we manually check if the column name is valid to prevent SQL injection
      const validColumns = ['locations', 'department', 'act', 'status', 'fpr', 'approver', 'hod'];
      
      if (!validColumns.includes(columnName)) {
        return NextResponse.json({ error: "Invalid column name" }, { status: 400 });
      }
      
      const result = await db.query(
        `SELECT DISTINCT "${columnName}" FROM sourcefile WHERE "${columnName}" IS NOT NULL ORDER BY "${columnName}"`
      );
      
      return NextResponse.json({ options: result.rows.map(row => row[columnName]) });
    }
    
    // If action is 'getData' or not specified, fetch filtered data
    const locations = searchParams.get('locations');
    const department = searchParams.get('department');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const fpr = searchParams.get('fpr');
    const approver = searchParams.get('approver');
    const hod = searchParams.get('hod');
    const act = searchParams.get('act');
    const status = searchParams.get('status');
    const amount = searchParams.get('amount');
    const interest = searchParams.get('interest');
    const penalty = searchParams.get('penalty');
    
    // Build the base query with the username condition
    let query = `SELECT * FROM sourcefile WHERE ("fpr" = $1 OR "approver" = $1 OR "hod" = $1)`;
    const queryParams = [username];
    let paramCounter = 2;

    // Add filter conditions dynamically if they exist
    if (locations) {
      query += ` AND "locations" = $${paramCounter}`;
      queryParams.push(locations);
      paramCounter++;
    }
    
    if (department) {
      query += ` AND "department" = $${paramCounter}`;
      queryParams.push(department);
      paramCounter++;
    }
    
    if (startDate && endDate) {
      query += ` AND "due_date" BETWEEN $${paramCounter} AND $${paramCounter + 1}`;
      queryParams.push(startDate, endDate);
      paramCounter += 2;
    }
    
    if (act) {
      query += ` AND "act" = $${paramCounter}`;
      queryParams.push(act);
      paramCounter++;
    }
    
    if (status) {
      query += ` AND "status" = $${paramCounter}`;
      queryParams.push(status);
      paramCounter++;
    }
    
    // Handle other filters as needed
    if (fpr) {
      query += ` AND "fpr" = $${paramCounter}`;
      queryParams.push(fpr);
      paramCounter++;
    }
    
    if (approver) {
      query += ` AND "approver" = $${paramCounter}`;
      queryParams.push(approver);
      paramCounter++;
    }
    
    if (hod) {
      query += ` AND "hod" = $${paramCounter}`;
      queryParams.push(hod);
      paramCounter++;
    }
    
    // Execute the query with the filters
    const result = await db.query(query, queryParams);
    
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("Error in GET /api/sourcefile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}