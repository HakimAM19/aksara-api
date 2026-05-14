import db from "@/lib/db";


// ====================================
// GET USER BY ID
// ====================================

export async function GET(req, context) {

  try {

    const { id } = await context.params;

    const [rows] = await db.query(`
      SELECT * FROM users
      WHERE id = ?
    `, [id]);


    if (rows.length === 0) {

      return Response.json({
        error: "User tidak ditemukan"
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
// UPDATE USER
// ====================================

export async function PUT(req, context) {

  try {

    const { id } = await context.params;

    const body = await req.json();

    const {
      name,
      email,
      role
    } = body;


    if (!name || !email) {

      return Response.json({
        error: "Field wajib diisi"
      });
    }


    const [check] = await db.query(`
      SELECT * FROM users
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Data tidak ada mau ngapain dah?"
      });
    }


    await db.query(`
      UPDATE users
      SET
      name = ?,
      email = ?,
      role = ?
      WHERE id = ?
    `, [
      name,
      email,
      role,
      id
    ]);


    return Response.json({
      message: "User berhasil diupdate"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}


// ====================================
// DELETE USER
// ====================================

export async function DELETE(req, context) {

  try {

    const { id } = await context.params;

    const [check] = await db.query(`
      SELECT * FROM users
      WHERE id = ?
    `, [id]);


    if (check.length === 0) {

      return Response.json({
        error: "Data tidak ada mau ngapain dah?"
      });
    }


    await db.query(`
      DELETE FROM users
      WHERE id = ?
    `, [id]);


    return Response.json({
      message: "User berhasil dihapus"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}