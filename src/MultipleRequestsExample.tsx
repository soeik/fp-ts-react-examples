import React, {useEffect, useState} from "react"
import {httpGet} from "./httpGet";
import {Post, User} from "./types";
import {Either, fold as foldEither} from "fp-ts/lib/Either";
import {fold as foldOption, fromNullable} from "fp-ts/lib/Option";
import {UsersList} from "./UsersList";
import {PostsList} from "./PostsList";

type Response<T> =  Either<Error, T>
type UsersResponse = Response<User[]>
type PostsResponse = Response<Post[]>
const getUsers = httpGet<User[]>("https://jsonplaceholder.typicode.com/users");
const getPosts = httpGet<Post[]>("https://jsonplaceholder.typicode.com/posts");
export function MultipleRequestsExamples() {
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [posts, setPosts] = useState<PostsResponse | null>(null);

    useEffect(()=>{
       getUsers().then(setUsers);
       getPosts().then(setPosts);
    },[]);

    const maybeUsers = fromNullable(users);
    const maybePosts = fromNullable(posts);

    const makeRenderLoadingState = (text: string) => ()=> <div>Loading {text}...</div>;
    const renderErrorState = (error: Error) => <div>Something bad happened: { error.message }</div>;

    const renderUsers = foldEither(renderErrorState, (users: User[]) => <UsersList users={users} />);
    const renderPosts = foldEither(renderErrorState, (posts: Post[]) => <PostsList posts={posts} />);

    return <div>
        Users:
        {foldOption(makeRenderLoadingState("users"), renderUsers)(maybeUsers)}
        Posts:
        {foldOption(makeRenderLoadingState("posts"), renderPosts)(maybePosts)}
    </div>
}


