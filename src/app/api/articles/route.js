import { NextResponse } from "next/server";
import db from "@/lib/db";
import { validateToken } from "@/lib/auth";


// =====================================
// GET FREE ARTICLES + PAGINATION
// =====================================

export async function GET(req) {

  try {

    const { searchParams } =
      new URL(req.url);

    const page =
      parseInt(
        searchParams.get("page")
      ) || 1;

    const limit = 6;

    const offset =
      (page - 1) * limit;



    const [countRows] =
      await db.query(`

        SELECT COUNT(*) AS total
        FROM articles
        WHERE
          is_premium = 0
          OR is_premium IS NULL

      `);

    const totalArticles =
      countRows[0].total;

    const totalPages =
      Math.ceil(
        totalArticles / limit
      );



    const [rows] = await db.query(

      `

      SELECT
        articles.*,
        topics.name AS topic_name

      FROM articles

      LEFT JOIN topics
      ON articles.topic_id = topics.id

      WHERE
        articles.is_premium = 0
        OR articles.is_premium IS NULL

      ORDER BY articles.created_at DESC

      LIMIT ?
      OFFSET ?

      `,

      [
        limit,
        offset,
      ]

    );



    return NextResponse.json({

      success: true,

      page,

      limit,

      totalArticles,

      totalPages,

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

    const user =
      await validateToken(req);

    if (!user) {

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



    if (
      user.role !== "admin" &&
      user.role !== "writer"
    ) {

      return NextResponse.json(

        {
          success: false,
          message: "Forbidden",
        },

        {
          status: 403,
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



    const [result] = await db.query(

      `

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

      `,

      [

        user_id || null,
        topic_id,
        title.trim(),
        preview?.trim() || "",
        content.trim(),
        image_url?.trim() || "",
        article_type || "free",
        price || 0,
        is_premium || 0,

      ]

    );



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