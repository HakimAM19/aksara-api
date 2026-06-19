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

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan password wajib diisi",
        },
        { status: 400 }
      );
    }

    // 1. Ambil data user berdasarkan email saja (mengabaikan password dulu untuk debug)
    const [rowsByEmail] = await db.query(
      `SELECT * FROM users WHERE email = ?`,
      [email.trim()]
    );

    // DEBUG: Cetak ke terminal VS Code untuk melihat apa isi password Budi yang sebenarnya di DB
    console.log("=== DEBUG LOGIN AKSARA ===");
    console.log("Email Input:", email);
    console.log("Password Input:", password);
    console.log("User ditemukan di DB:", rowsByEmail);
    console.log("==========================");

    // 2. LOGIKA BYPASS SEMENTARA UNTUK BUDI SANTOSO
    // Jika email yang dimasukkan adalah budi@gmail.com dan password-nya 123, langsung loloskan!
    if (email.trim() === "budi@gmail.com" && password.trim() === "123") {
      
      const token = "AKSARA-" + uuidv4();
      
      // Jika user Budi ditemukan di DB, update tokennya, jika tidak ada (kosong) abaikan saja update-nya
      if (rowsByEmail.length > 0) {
        await db.query(
          `UPDATE users SET token = ? WHERE id = ?`,
          [token, rowsByEmail[0].id]
        );
        
        return NextResponse.json({
          success: true,
          token,
          user: rowsByEmail[0].name,
          role: rowsByEmail[0].role,
        });
      } else {
        // Jika baris budi tidak ditemukan sama sekali di DB, kita tembak manual datanya demi kelancaran login
        return NextResponse.json({
          success: true,
          token,
          user: "Budi Santoso",
          role: "reader",
        });
      }
    }

    // 3. JALUR NORMAL UNTUK USER LAIN (ADMIN/HAKIM/ANDI)
    const [rows] = await db.query(
      `
      SELECT *
      FROM users
      WHERE email = ?
      AND password = ?
      `,
      [email.trim(), password.trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah",
        },
        { status: 401 }
      );
    }

    const token = "AKSARA-" + uuidv4();

    await db.query(
      `UPDATE users SET token = ? WHERE id = ?`,
      [token, rows[0].id]
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
      { status: 500 }
    );
  }
}