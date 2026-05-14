import { NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(
  request,
  context
) {

  try {

    const params = await context.params;

    const id = params.id;

    const [rows] = await connection.execute(
      `
      SELECT *
      FROM comments
      WHERE article_id = ?
      ORDER BY created_at DESC
      `,
      [id]
    );

    return NextResponse.json(rows);

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      error: error.message,
    });

  }

}