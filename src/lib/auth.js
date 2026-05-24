import db from "@/lib/db";

export async function validateToken(req) {

  try {

    const token =
      req.headers.get("authorization");



    if (!token) {

      return false;

    }



    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE token = ?
      `,
      [token]
    );



    return rows.length > 0;

  } catch (error) {

    return false;

  }

}