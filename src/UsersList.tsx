import React from "react";
import { User } from "./types";

interface UsersListProps {
  users: User[];
}

export function UsersList({ users }: UsersListProps) {
  return (
    <ul>
      {users.map(u => (
        <li key={u.name}>{u.name}</li>
      ))}
    </ul>
  );
}
