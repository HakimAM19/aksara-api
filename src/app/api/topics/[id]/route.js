import db from "@/lib/db";


// ====================================
// GET TOPIC BY ID
// ====================================

export async function GET(req, context) {

  try {

    const { id } = await context.params;

    const [rows] = await db.query(`
      SELECT *
      FROM topics
      WHERE id = ?
    `, [id]);


    if (rows.length === 0) {

      return Response.json({
        error: "Topic tidak ditemukan"
      });
    }


    return Response.json(rows[0]);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ====================================
// UPDATE TOPIC
// ====================================

export async function PUT(req, context) {

  try {

    const { id } = await context.params;

    const body = await req.json();

    const { name } = body;


    if (!name) {

      return Response.json({
        error: "Nama topic wajib diisi"
      });
    }


    // CEK TOPIC
    const [check] = await db.query(`
      SELECT *
      FROM topics
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Topic tidak ada mau ngapain dah?"
      });
    }


    await db.query(`
      UPDATE topics
      SET name = ?
      WHERE id = ?
    `, [
      name,
      id
    ]);


    return Response.json({
      message: "Topic berhasil diupdate"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ====================================
// DELETE TOPIC
// ====================================

export async function DELETE(req, context) {

  try {

    const { id } = await context.params;

    const [check] = await db.query(`
      SELECT *
      FROM topics
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Topic tidak ada mau hapus apa?"
      });
    }


    await db.query(`
      DELETE FROM topics
      WHERE id = ?
    `, [id]);


    return Response.json({
      message: "Topic berhasil dihapus"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}