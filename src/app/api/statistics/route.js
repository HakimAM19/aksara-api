import { NextResponse } from "next/server";
import db from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET(req) {

  try {

    // =====================================
    // AUTH VALIDATION
    // =====================================

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



    // =====================================
    // MONTHLY TRANSACTIONS
    // =====================================

    const [monthlyTransactions] =
      await db.query(`

        SELECT

        DATE_FORMAT(created_at, '%Y-%m')
        AS month,

        COUNT(*) AS total_transactions,

        SUM(amount) AS total_income

        FROM article_purchases

        GROUP BY month

        ORDER BY month DESC

      `);



    // =====================================
    // TRENDING ARTICLES
    // =====================================

    const [trendingArticles] =
      await db.query(`

        SELECT

        title,
        views

        FROM articles

        ORDER BY views DESC

        LIMIT 5

      `);



    // =====================================
    // TRENDING TOPICS
    // =====================================

    const [trendingTopics] =
      await db.query(`

        SELECT

        topics.name AS topic_name,

        COUNT(articles.id)
        AS total_articles

        FROM topics

        LEFT JOIN articles
        ON topics.id = articles.topic_id

        GROUP BY topics.id

        ORDER BY total_articles DESC

        LIMIT 5

      `);



    return NextResponse.json({

      success: true,

      statistics: {

        monthly_transactions:
          monthlyTransactions,

        trending_articles:
          trendingArticles,

        trending_topics:
          trendingTopics,

      },

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