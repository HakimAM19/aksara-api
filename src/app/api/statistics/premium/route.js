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
      price

      FROM articles

      WHERE is_premium = 1

      ORDER BY created_at DESC

      LIMIT 6

    `);

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      error: error.message,
    });
  }
}