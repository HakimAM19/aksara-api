import db from "@/lib/db";

export async function GET() {

  try {

    // ======================================
    // TOTAL TRANSAKSI BULAN INI
    // ======================================

    const [monthlyTransactions] = await db.query(`
      SELECT COUNT(*) AS total
      FROM transactions
      WHERE MONTH(created_at) = MONTH(NOW())
      AND YEAR(created_at) = YEAR(NOW())
    `);


    // ======================================
    // TOTAL TRANSAKSI TAHUN INI
    // ======================================

    const [yearlyTransactions] = await db.query(`
      SELECT COUNT(*) AS total
      FROM transactions
      WHERE YEAR(created_at) = YEAR(NOW())
    `);


    // ======================================
    // ARTIKEL TRENDING
    // ======================================

    const [trendingArticles] = await db.query(`
      SELECT
      id,
      title,
      views
      FROM articles
      ORDER BY views DESC
      LIMIT 5
    `);


    // ======================================
    // TOPIK TRENDING
    // ======================================

    const [trendingTopics] = await db.query(`
      SELECT
      topics.name,
      COUNT(articles.id) AS total_articles
      FROM topics
      LEFT JOIN articles
      ON topics.id = articles.topic_id
      GROUP BY topics.id
      ORDER BY total_articles DESC
      LIMIT 5
    `);


    // ======================================
    // TOTAL REVENUE
    // ======================================

    const [revenue] = await db.query(`
      SELECT
      SUM(total_price) AS total_revenue
      FROM transactions
      WHERE status = 'paid'
    `);


    // ======================================
    // RESPONSE
    // ======================================

    return Response.json({

      monthly_transactions:
        monthlyTransactions[0].total,

      yearly_transactions:
        yearlyTransactions[0].total,

      total_revenue:
        revenue[0].total_revenue || 0,

      trending_articles:
        trendingArticles,

      trending_topics:
        trendingTopics

    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}