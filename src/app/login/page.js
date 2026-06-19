"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "/api/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    if (!data.success) {

      alert(
        data.message
      );

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

    alert("Login berhasil");

    router.push("/");

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
          className="w-full bg-white text-black py-4 rounded-xl font-bold"
        >

          Login

        </button>

      </form>

    </main>

  );

}