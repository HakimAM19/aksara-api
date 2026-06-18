import db from "@/lib/db";

export async function validateToken(req) {

  try {

    const token =
      req.headers.get("authorization");



    if (!token) {

      return null;

    }



    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE token = ?
      `,
      [token]
    );



    if (rows.length === 0) {

      return null;

    }



    return rows[0];

  } catch (error) {

    return null;

  }

}