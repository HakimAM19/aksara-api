import db from "@/lib/db";


// ======================================
// GET ALL TRANSACTIONS
// ======================================

export async function GET() {

  try {

    const [rows] = await db.query(`
      SELECT
      transactions.*,
      users.name AS user_name
      FROM transactions
      JOIN users
      ON transactions.user_id = users.id
      ORDER BY transactions.id DESC
    `);

    return Response.json(rows);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ======================================
// CREATE TRANSACTION
// ======================================

export async function POST(req) {

  try {

    const body = await req.json();

    console.log(body);

    const {
      user_id,
      total_price,
      status
    } = body;


    // VALIDASI
    if (
      !user_id ||
      !total_price
    ) {

      return Response.json({
        error: "Field wajib diisi"
      });
    }


    // CEK USER
    const [user] = await db.query(`
      SELECT *
      FROM users
      WHERE id = ?
    `, [user_id]);


    if (user.length === 0) {

      return Response.json({
        error: "User tidak ditemukan"
      });
    }


    // INSERT
    await db.query(`
      INSERT INTO transactions (
        user_id,
        total_price,
        status
      )
      VALUES (?, ?, ?)
    `, [
      user_id,
      total_price,
      status || "pending"
    ]);


    return Response.json({
      message: "Transaksi berhasil dibuat"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}