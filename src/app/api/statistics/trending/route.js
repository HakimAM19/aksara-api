import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {

  try {

    const [rows] = await db.query(`

      SELECT
      id,
      title,
      preview,
      image_url,
      views

      FROM articles

      ORDER BY views DESC

      LIMIT 6

    `);

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      error: error.message,
    });
  }
}