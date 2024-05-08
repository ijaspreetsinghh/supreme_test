"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/getAllUsers", { method: "POST" });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        // console.log(response);
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className='grid place-items-center h-screen  bg-slate-100'>
      <div className='max-w-xl p-6 rounded-lg bg-white drop-shadow-2xl '>
        <p className='text-xl font-bold my-4 text-center '>All Users</p>
        {isLoading ? (
          <p className='font-semibold text-lg text-black'>Loading...</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <div className='py-4 border-b-2'>
                  <p className='text-base font-medium text-black'>
                    Name: {user.name}
                  </p>
                  <p className='text-base font-medium text-black'>
                    Email: {user.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={() => signOut()}
        className=' bottom-8 right-8 rounded-lg absolute  bg-red-500 text-white font-bold px-6 py-2 mt-3'>
        Log Out
      </button>
    </div>
  );
}
