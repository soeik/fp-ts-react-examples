import React, {useEffect, useState} from "react";
import { fold as foldOption, fromNullable } from "fp-ts/lib/Option";
import { Either, fold as foldEither } from "fp-ts/lib/Either"
import { User } from "./types";
import { UsersList } from "./UsersList";
import { httpGet } from "./httpGet";

type UsersResponse = Either<Error, User[]>

interface EitherExampleProps {
  type: string;
}

const getUsers = httpGet<User[]>("https://jsonplaceholder.typicode.com/users");
const getError = httpGet<User[]>("https://jsonplaceholder.typicode.com/willfailwith404");

export function EitherExample({ type }: EitherExampleProps) {
  const [usersResponse, setUsersResponse] = useState<UsersResponse | null>(null);

  useEffect(() => {
    setUsersResponse(null);

    if(type === 'error'){
      getError().then(setUsersResponse);
    }

    if(type === 'success'){
      getUsers().then(setUsersResponse);
    }

  }, [type]);

  const maybeResponse = fromNullable(usersResponse);

  const renderLoadingState = ()=> <div>Loading users...</div>;
  const renderErrorState = (error: Error) => <div>Something bad happened: { error.message }</div>;
  const renderUsers = (users: User[]) => <UsersList users={users} />;
  const renderUsersResponse = foldEither(renderErrorState, renderUsers);

  return foldOption(renderLoadingState, renderUsersResponse)(maybeResponse);
}
