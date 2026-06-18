import db from "@/lib/db";


// ===============================
// GET ALL COMMENTS
// ===============================

export async function GET() {

  try {

    const [rows] = await db.query(`
      SELECT
      comments.*,
      users.name AS user_name,
      articles.title AS article_title
      FROM comments
      JOIN users
      ON comments.user_id = users.id
      JOIN articles
      ON comments.article_id = articles.id
      ORDER BY comments.id DESC
    `);

    return Response.json(rows);

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }

}



// ===============================
// CREATE COMMENT
// ===============================

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      article_id,
      user_id,
      comment // PERBAIKAN: Ubah content menjadi comment agar sinkron dengan Postman & DB
    } = body;

    // VALIDASI
    if (
      !article_id ||
      !user_id ||
      !comment?.trim() // PERBAIKAN: Cek variabel comment
    ) {
      return Response.json({
        error: "Semua field wajib diisi"
      }, { status: 400 });
    }

    // CEK ARTICLE
    const [article] = await db.query(`
      SELECT *
      FROM articles
      WHERE id = ?
    `, [article_id]);

    if (article.length === 0) {
      return Response.json({
        error: "Artikel tidak ditemukan"
      }, { status: 404 });
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
      }, { status: 404 });
    }

    // SIMPAN KE DATABASE
    await db.query(`
      INSERT INTO comments (
        article_id,
        user_id,
        comment -- PERBAIKAN: Nama kolom di tabel MariaDB Anda adalah comment
      )
      VALUES (?, ?, ?)
    `, [
      Number(article_id),
      Number(user_id),
      comment.trim() // PERBAIKAN: Masukkan variabel comment
    ]);

    return Response.json({
      message: "Komentar berhasil ditambahkan"
    });

  } catch (error) {
    return Response.json({
      error: error.message
    }, { status: 500 });
  }
}