import { NextResponse } from "next/server";
import db from "@/lib/db";
import { validateToken } from "@/lib/auth";



// =====================================
// GET ALL ARTICLES
// =====================================

export async function GET(req) {

  try {

    // AUTH VALIDATION

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

      SELECT
      articles.*,
      topics.name AS topic_name

      FROM articles

      LEFT JOIN topics
      ON articles.topic_id = topics.id

      ORDER BY articles.created_at DESC

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
// CREATE ARTICLE
// =====================================

export async function POST(req) {

  try {

    // AUTH VALIDATION

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

      user_id,
      topic_id,
      title,
      preview,
      content,
      image_url,
      article_type,
      price,
      is_premium,

    } = body;



    // =====================================
    // VALIDATION
    // =====================================

    if (

      !title?.trim() ||
      !content?.trim() ||
      !topic_id

    ) {

      return NextResponse.json(

        {
          success: false,

          error:
            "Title, content, dan topic wajib diisi",
        },

        {
          status: 400,
        }

      );

    }



    // VALIDASI PREMIUM PRICE

    if (

      is_premium &&
      (!price || Number(price) <= 0)

    ) {

      return NextResponse.json(

        {
          success: false,

          error:
            "Artikel premium wajib memiliki harga",
        },

        {
          status: 400,
        }

      );

    }



    const [result] = await db.query(`

      INSERT INTO articles (

        user_id,
        topic_id,
        title,
        preview,
        content,
        image_url,
        article_type,
        price,
        is_premium

      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    `, [

      user_id || null,
      topic_id,
      title.trim(),
      preview?.trim() || "",
      content.trim(),
      image_url?.trim() || "",
      article_type || "free",
      price || 0,
      is_premium || false,

    ]);



    return NextResponse.json({

      success: true,

      message:
        "Artikel berhasil dibuat",

      article_id:
        result.insertId,

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