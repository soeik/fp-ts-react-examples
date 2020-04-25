import React, {useEffect, useState} from "react";
import { Option, some, none, fold as foldOption } from "fp-ts/lib/Option";
import { Either, fold as foldEither } from "fp-ts/lib/Either"
import { User } from "./types";
import { UsersList } from "./UsersList";
import {httpGet} from "./httpGet";

type UsersResponse = Either<Error, User[]>

interface EitherExampleProps {
  type: string;
}

export function EitherExample({ type }: EitherExampleProps) {
  const [optionUsersResponse, setOptionUsersResponse] = useState<Option<UsersResponse>>(none);

  useEffect(() => {
    if(type === 'loading'){
      setOptionUsersResponse(none);
    }

    if(type === 'error'){
      getError().then(userResp => setOptionUsersResponse(some(userResp)));
    }

    if(type === 'success'){
      getUsers().then(userResp => setOptionUsersResponse(some(userResp)));
    }
  }, [type]);

  const renderLoadingState = ()=> <div>loading users...</div>;
  const renderErrorState = (error: Error) => <div>Something bad happened: { error.message }</div>;
  const renderUsers = (users: User[]) => <UsersList users={users} />;
  const renderUsersResponse = foldEither(renderErrorState, renderUsers);

  return foldOption(renderLoadingState, renderUsersResponse)(optionUsersResponse);
}

function getUsers() {
  return httpGet<User[]>("https://jsonplaceholder.typicode.com/users");
}

function getError() {
  return httpGet<User[]>("https://jsonplaceholder.typicode.com/willfailwith404");
}
