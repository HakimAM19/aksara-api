import { NextResponse } from "next/server";
import db from "@/lib/db";



// =====================================
// GET ALL ARTICLES
// =====================================

export async function GET() {

  try {

    const [rows] = await db.query(`

      SELECT
      articles.*,
      topics.name AS topic_name

      FROM articles

      LEFT JOIN topics
      ON articles.topic_id = topics.id

      ORDER BY articles.created_at DESC

    `);

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      error: error.message,
    });
  }
}



// =====================================
// CREATE ARTICLE
// =====================================

export async function POST(req) {

  try {

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



    // VALIDATION

    if (
      !title ||
      !content ||
      !topic_id
    ) {

      return NextResponse.json({

        error:
          "Title, content, dan topic wajib diisi",

      });
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

      user_id,
      topic_id,
      title,
      preview,
      content,
      image_url,
      article_type,
      price,
      is_premium,

    ]);



    return NextResponse.json({

      message:
        "Artikel berhasil dibuat",

      article_id:
        result.insertId,

    });

  } catch (error) {

    return NextResponse.json({

      error:
        error.message,

    });
  }
}