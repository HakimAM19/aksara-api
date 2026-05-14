import { NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET() {

  try {

    const [rows] = await connection.execute(`
      SELECT
      article_purchases.*,
      articles.title
      FROM article_purchases
      LEFT JOIN articles
      ON article_purchases.article_id = articles.id
      ORDER BY article_purchases.created_at DESC
    `);

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json({
      error: error.message,
    });

  }

}

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      article_id,
      buyer_name,
      amount,
      status,
    } = body;

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
        buyer_name,
        amount,
        status,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Purchase success",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message,
    });

  }

}