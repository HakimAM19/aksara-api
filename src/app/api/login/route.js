import { NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      email,
      password,
    } = body;



    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE email = ?
      AND password = ?
      `,
      [email, password]
    );



    if (rows.length === 0) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Email atau password salah",
        },
        {
          status: 401,
        }
      );

    }



    const token =
      "AKSARA-" + uuidv4();



    await db.query(
      `
      UPDATE users
      SET token = ?
      WHERE id = ?
      `,
      [
        token,
        rows[0].id,
      ]
    );



return NextResponse.json({

  success: true,

  token,

  user: rows[0].name,

  role: rows[0].role,

});

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}