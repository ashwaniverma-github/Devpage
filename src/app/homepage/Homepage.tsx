import Link from 'next/link';
import React from 'react';
import prisma from '../../../prisma/db';

export default async function Homepage() {
  const users = await prisma.user.findMany();

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold">Users</h1>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/${user.username}`}>
              <a className="text-blue-500 hover:underline">{user.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
