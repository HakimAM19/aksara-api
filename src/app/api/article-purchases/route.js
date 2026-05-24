import { NextResponse } from "next/server";
import connection from "@/lib/db";
import { validateToken } from "@/lib/auth";



// =====================================
// GET PURCHASES
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
      SELECT
      article_purchases.*,
      articles.title

      FROM article_purchases

      LEFT JOIN articles
      ON article_purchases.article_id = articles.id

      ORDER BY article_purchases.created_at DESC
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
// CREATE PURCHASE
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
      buyer_name,
      amount,
      status,
    } = body;



    if (
      !article_id ||
      !buyer_name?.trim()
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Nama pembeli wajib diisi",
        },
        {
          status: 400,
        }
      );

    }



    if (
      !amount ||
      Number(amount) <= 0
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Nominal pembelian tidak valid",
        },
        {
          status: 400,
        }
      );

    }



    await connection.execute(
      `
      INSERT INTO article_purchases
      (
        article_id,
        buyer_name,
        amount,
        status
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        article_id,
        buyer_name.trim(),
        amount,
        status || "paid",
      ]
    );



    return NextResponse.json({

      success: true,

      message:
        "Purchase success",

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