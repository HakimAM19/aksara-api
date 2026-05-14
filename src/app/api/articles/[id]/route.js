import { NextResponse } from "next/server";
import db from "@/lib/db";



// =====================================
// GET ARTICLE BY ID
// =====================================

export async function GET(req, context) {

  try {

    const { id } = await context.params;

    const [rows] = await db.query(`

      SELECT
      articles.*,
      topics.name AS topic_name

      FROM articles

      LEFT JOIN topics
      ON articles.topic_id = topics.id

      WHERE articles.id = ?

    `, [id]);



    if (rows.length === 0) {

      return NextResponse.json({

        error:
          "Artikel tidak ditemukan",

      });
    }



    // UPDATE VIEWS

    await db.query(`

      UPDATE articles
      SET views = views + 1
      WHERE id = ?

    `, [id]);



    return NextResponse.json(rows[0]);

  } catch (error) {

    return NextResponse.json({

      error:
        error.message,

    });
  }
}



// =====================================
// UPDATE ARTICLE
// =====================================

export async function PUT(req, context) {

  try {

    const { id } = await context.params;

    const body = await req.json();

    const {

      topic_id,
      title,
      preview,
      content,
      image_url,
      article_type,
      price,
      is_premium,

    } = body;



    const [check] = await db.query(`

      SELECT *
      FROM articles
      WHERE id = ?

    `, [id]);



    if (check.length === 0) {

      return NextResponse.json({

        error:
          "Artikel tidak ditemukan",

      });
    }



    await db.query(`

      UPDATE articles

      SET

      topic_id = ?,
      title = ?,
      preview = ?,
      content = ?,
      image_url = ?,
      article_type = ?,
      price = ?,
      is_premium = ?

      WHERE id = ?

    `, [

      topic_id,
      title,
      preview,
      content,
      image_url,
      article_type,
      price,
      is_premium,
      id,

    ]);



    return NextResponse.json({

      message:
        "Artikel berhasil diupdate",

    });

  } catch (error) {

    return NextResponse.json({

      error:
        error.message,

    });
  }
}



// =====================================
// DELETE ARTICLE
// =====================================

export async function DELETE(req, context) {

  try {

    const { id } = await context.params;



    const [check] = await db.query(`

      SELECT *
      FROM articles
      WHERE id = ?

    `, [id]);



    if (check.length === 0) {

      return NextResponse.json({

        error:
          "Artikel tidak ditemukan",

      });
    }



    // DELETE COMMENTS FIRST

    await db.query(`

      DELETE FROM comments
      WHERE article_id = ?

    `, [id]);



    // DELETE ARTICLE

    await db.query(`

      DELETE FROM articles
      WHERE id = ?

    `, [id]);



    return NextResponse.json({

      message:
        "Artikel berhasil dihapus",

    });

  } catch (error) {

    return NextResponse.json({

      error:
        error.message,

    });
  }
}