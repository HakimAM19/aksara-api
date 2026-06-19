"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // <-- Import SweetAlert2

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: email.trim(), // Gunakan trim untuk menghapus spasi tak sengaja
            password: password.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (!data.success) {

        // Alert Gagal Login Keren (Dark Mode)
        Swal.fire({
          title: "Login Gagal!",
          text: data.message || "Email atau password salah.",
          icon: "error",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#d33"
        });

        return;
      }

      localStorage.setItem(
        "aksara_token",
        data.token
      );

      localStorage.setItem(
        "aksara_role",
        data.role
      );

      localStorage.setItem(
        "aksara_user",
        data.user
      );

      // Alert Sukses Login Keren Otomatis Hilang dalam 1.5 detik
      Swal.fire({
        title: "Login Berhasil!",
        text: `Selamat datang kembali, ${data.user}!`,
        icon: "success",
        background: "#111",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false
      });

      router.push("/");
      router.refresh();

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan pada server.",
        icon: "error",
        background: "#111",
        color: "#fff"
      });

    }

  };

  return (

    <main className="min-h-screen bg-black text-white flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#111] p-8 rounded-3xl border border-gray-800"
      >

        <h1 className="text-4xl font-black mb-8">

          Login

        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-4 mb-4 rounded-xl bg-black border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 mb-6 rounded-xl bg-black border border-gray-700"
        />

        <button
          className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition"
        >

          Login

        </button>

      </form>

    </main>

  );

}