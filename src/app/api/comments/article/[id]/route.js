import { NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET(
  request,
  context
) {

  try {

    const { id } =
      await context.params;

    const [rows] =
      await connection.execute(

      `
      SELECT

        comments.*,

        users.name

      FROM comments

      LEFT JOIN users
      ON comments.user_id = users.id

      WHERE comments.article_id = ?

      ORDER BY comments.created_at DESC
      `,

      [id]

    );

    return NextResponse.json(
      rows
    );

  } catch (error) {

    return NextResponse.json({

      error:
        error.message,

    });

  }

}