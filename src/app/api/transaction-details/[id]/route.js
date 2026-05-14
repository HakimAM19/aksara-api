import db from "@/lib/db";


// ======================================
// GET DETAIL BY ID
// ======================================

export async function GET(req, context) {

  try {

    const { id } = await context.params;

    const [rows] = await db.query(`
      SELECT *
      FROM transaction_details
      WHERE id = ?
    `, [id]);


    if (rows.length === 0) {

      return Response.json({
        error: "Detail transaksi tidak ditemukan"
      });
    }


    return Response.json(rows[0]);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ======================================
// DELETE DETAIL
// ======================================

export async function DELETE(req, context) {

  try {

    const { id } = await context.params;

    const [check] = await db.query(`
      SELECT *
      FROM transaction_details
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Detail transaksi tidak ada"
      });
    }


    await db.query(`
      DELETE FROM transaction_details
      WHERE id = ?
    `, [id]);


    return Response.json({
      message: "Detail transaksi berhasil dihapus"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}