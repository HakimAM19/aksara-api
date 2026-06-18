import db from "@/lib/db";


// ===============================
// GET COMMENT BY ID
// ===============================

export async function GET(req, context) {

  try {

    const { id } = await context.params;

    const [rows] = await db.query(`
      SELECT *
      FROM comments
      WHERE id = ?
    `, [id]);


    if (rows.length === 0) {

      return Response.json({
        error: "Komentar tidak ditemukan"
      });
    }


    return Response.json(rows[0]);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ===============================
// DELETE COMMENT
// ===============================

export async function DELETE(req, context) {

  try {

    const { id } = await context.params;

    const [check] = await db.query(`
      SELECT *
      FROM comments
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Komentar tidak ada mau hapus apa?"
      });
    }


    await db.query(`
      DELETE FROM comments
      WHERE id = ?
    `, [id]);


    return Response.json({
      message: "Komentar berhasil dihapus"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}