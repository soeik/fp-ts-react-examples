import React, {useEffect, useState} from "react";
import {Post, User} from "./types";
import {httpGet} from "./httpGet";
import {none, Option, some, fold as foldOption} from "fp-ts/lib/Option";
import { fold as foldEither } from "fp-ts/lib/Either";
import {Either} from "fp-ts/lib/Either";
import {constant} from "fp-ts/lib/function";

interface UsersListProps {
  posts: Post[];
}
const makeGetUser = (userId: number) => httpGet<User>("https://jsonplaceholder.typicode.com/users/" + userId.toString());

export function PostsList({ posts }: UsersListProps) {
  return (
    <ul>
      {posts.map(p => (
        <li key={p.id}>
          <PostTitleAndAuthor post={p}/>
        </li>
      ))}
    </ul>
  );
}

interface PostTitleAndAuthorProps {
  post: Post
}

function PostTitleAndAuthor({ post }: PostTitleAndAuthorProps) {
  const getUser = makeGetUser(post.userId);
  const [maybeUser, setMaybeUser] = useState<Option<Either<Error, User>>>(none);
  useEffect(() => {
    getUser().then((u) => setMaybeUser(some(u)));
  }, []);


  return <>
    {post.title} ----->{" "}
    {
      foldOption(
        constant("....."),
        foldEither(
            constant("Cannot load author"),
            (a: User) => a.name
        )
  )(maybeUser)}</>;
}
