import { NextResponse } from "next/server";
import db from "@/lib/db";
import { validateToken } from "@/lib/auth";



// =====================================
// GET TOPICS
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



    const [rows] = await db.query(`
      SELECT *
      FROM topics
      ORDER BY id DESC
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
// CREATE TOPIC
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

    const { name } = body;



    if (!name?.trim()) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Nama topic wajib diisi",
        },
        {
          status: 400,
        }
      );

    }



    await db.query(
      `
      INSERT INTO topics (name)
      VALUES (?)
      `,
      [name.trim()]
    );



    return NextResponse.json({

      success: true,

      message:
        "Topic berhasil dibuat",

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