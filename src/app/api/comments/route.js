import { NextResponse } from "next/server";
import connection from "@/lib/db";
import { validateToken } from "@/lib/auth";



// =====================================
// GET COMMENTS
// =====================================

export async function GET(req) {

  try {

    const isValid =
      await validateToken(req);

    if (!isValid) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    const [rows] = await connection.execute(`
      SELECT *
      FROM comments
      ORDER BY created_at DESC
    `);



    return NextResponse.json({

      success: true,

      total: rows.length,

      data: rows,

    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}



// =====================================
// CREATE COMMENT
// =====================================

export async function POST(req) {

  try {

    const isValid =
      await validateToken(req);

    if (!isValid) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    const body = await req.json();

    const {
      article_id,
      name,
      comment,
    } = body;



    if (
      !article_id ||
      !name?.trim() ||
      !comment?.trim()
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Semua field wajib diisi",
        },
        {
          status: 400,
        }
      );

    }



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
        name.trim(),
        comment.trim(),
      ]
    );



    return NextResponse.json({

      success: true,

      message:
        "Comment added",

    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}