"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        alert("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='grid place-items-center h-screen  bg-slate-100'>
      <div className=' max-w-xl p-5 rounded-lg bg-white drop-shadow-2xl'>
        <h1 className='text-xl font-bold my-4 text-center '>Login</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
          <input
            className='rounded-lg'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <input
            className='rounded-lg'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <button className='bg-black rounded-lg text-white font-bold cursor-pointer px-6 py-2'>
            Login
          </button>

          <p className='text-slate-500 inline-block mx-auto mt-6'>
            Don&apos;t have an account?&nbsp;
            <Link
              className='text-sm mt-3 text-right   text-black font-semibold'
              href={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
