import db from "@/lib/db";


// ====================================
// GET ALL USERS
// ====================================

export async function GET() {

  try {

    const [rows] = await db.query(`
      SELECT * FROM users
    `);

    return Response.json(rows);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}


// ====================================
// CREATE USER
// ====================================

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      name,
      email,
      role
    } = body;


    // VALIDASI
    if (!name || !email) {

      return Response.json({
        error: "Nama dan email wajib diisi"
      });
    }


    await db.query(`
      INSERT INTO users
      (name, email, role)
      VALUES (?, ?, ?)
    `, [
      name,
      email,
      role || "reader"
    ]);


    return Response.json({
      message: "User berhasil dibuat"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}