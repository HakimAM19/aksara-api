import db from "@/lib/db";


// ======================================
// GET ALL DETAIL
// ======================================

export async function GET() {

  try {

    const [rows] = await db.query(`
      SELECT
      transaction_details.*,
      articles.title AS article_title
      FROM transaction_details
      JOIN articles
      ON transaction_details.article_id = articles.id
      ORDER BY transaction_details.id DESC
    `);

    return Response.json(rows);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ======================================
// CREATE DETAIL
// ======================================

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      transaction_id,
      article_id,
      price
    } = body;


    // VALIDASI
    if (
      !transaction_id ||
      !article_id ||
      !price
    ) {

      return Response.json({
        error: "Field wajib diisi"
      });
    }


    // CEK TRANSACTION
    const [transaction] = await db.query(`
      SELECT *
      FROM transactions
      WHERE id = ?
    `, [transaction_id]);


    if (transaction.length === 0) {

      return Response.json({
        error: "Transaksi tidak ditemukan"
      });
    }


    // CEK ARTICLE
    const [article] = await db.query(`
      SELECT *
      FROM articles
      WHERE id = ?
    `, [article_id]);


    if (article.length === 0) {

      return Response.json({
        error: "Artikel tidak ditemukan"
      });
    }


    // INSERT
    await db.query(`
      INSERT INTO transaction_details (
        transaction_id,
        article_id,
        price
      )
      VALUES (?, ?, ?)
    `, [
      transaction_id,
      article_id,
      price
    ]);


    return Response.json({
      message: "Detail transaksi berhasil dibuat"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}