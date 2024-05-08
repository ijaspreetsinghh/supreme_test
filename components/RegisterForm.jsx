"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        alert("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className='grid place-items-center h-screen bg-slate-100'>
      <div className='shadow-lg p-5 rounded-lg   bg-white drop-shadow-2xl '>
        <h1 className='text-xl font-bold my-4 text-center'>Register</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Full Name'
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <button className='bg-black rounded-lg text-white font-bold cursor-pointer px-6 py-2'>
            Register
          </button>

          <p className='text-slate-500 inline-block mx-auto mt-6'>
            Already have an account?&nbsp;
            <Link
              className='text-sm mt-3 text-right   text-black font-semibold'
              href={"/"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
