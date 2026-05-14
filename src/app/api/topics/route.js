import db from "@/lib/db";


// ====================================
// GET ALL TOPICS
// ====================================

export async function GET() {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM topics
      ORDER BY id DESC
    `);

    return Response.json(rows);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ====================================
// CREATE TOPIC
// ====================================

export async function POST(req) {

  try {

    const body = await req.json();

    const { name } = body;


    // VALIDASI
    if (!name) {

      return Response.json({
        error: "Nama topic wajib diisi"
      });
    }


    // CEK DUPLIKAT
    const [check] = await db.query(`
      SELECT *
      FROM topics
      WHERE name = ?
    `, [name]);


    if (check.length > 0) {

      return Response.json({
        error: "Topic sudah ada"
      });
    }


    await db.query(`
      INSERT INTO topics (name)
      VALUES (?)
    `, [name]);


    return Response.json({
      message: "Topic berhasil dibuat"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}