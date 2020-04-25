import React from "react";
import { Option, some, none, fold } from "fp-ts/lib/Option";
import { User } from "./types";
import { UsersList } from "./UsersList";

export function OptionExample() {
  const [users, setUsers] = React.useState<Option<User[]>>(none);

  React.useEffect(() => {
    fetchMaybeUsers().then(setUsers);
  }, []);

  return fold(renderLoadingState, renderUsers)(users);

  function renderUsers(users: User[]) {
    return <UsersList users={users} />;
  }

  function renderLoadingState() {
    return <div>loading users...</div>;
  }
}

function fetchMaybeUsers() {
  return fetchMaybe("https://jsonplaceholder.typicode.com/users");
}

function fetchMaybe(url: string) {
  return fetch(url)
    .then(resp => resp.json())
    .then(jsonResp => some(jsonResp));
}
