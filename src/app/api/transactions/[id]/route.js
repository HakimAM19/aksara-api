import db from "@/lib/db";


export async function GET(req, context) {

  try {

    const { id } = await context.params;

    const [rows] = await db.query(`
      SELECT *
      FROM transactions
      WHERE id = ?
    `, [id]);


    if (rows.length === 0) {

      return Response.json({
        error: "Transaksi tidak ditemukan"
      });
    }


    return Response.json(rows[0]);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



export async function DELETE(req, context) {

  try {

    const { id } = await context.params;

    const [check] = await db.query(`
      SELECT *
      FROM transactions
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Transaksi tidak ada mau hapus apa?"
      });
    }


    // HAPUS DETAIL DULU
    await db.query(`
      DELETE FROM transaction_details
      WHERE transaction_id = ?
    `, [id]);


    // HAPUS TRANSACTION
    await db.query(`
      DELETE FROM transactions
      WHERE id = ?
    `, [id]);


    return Response.json({
      message: "Transaksi berhasil dihapus"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}