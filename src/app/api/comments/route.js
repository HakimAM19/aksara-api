import { NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET() {

  try {

    const [rows] = await connection.execute(`
      SELECT *
      FROM comments
      ORDER BY created_at DESC
    `);

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      error: error.message,
    });

  }

}

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      article_id,
      name,
      comment,
    } = body;

    await connection.execute(
      `
      INSERT INTO comments
      (
        article_id,
        name,
        comment
      )
      VALUES (?, ?, ?)
      `,
      [
        article_id,
        name,
        comment,
      ]
    );

    return NextResponse.json({
      message: "Comment added",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      error: error.message,
    });

  }

}