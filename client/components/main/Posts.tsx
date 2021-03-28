import React, { useState } from "react";
import { useQuery } from "react-query";
import { parseISO, format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

import { Posts as PostsType } from "../../types/Posts";
import Spinner from "../reuseable/Spinner";

const Posts: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");

  const fetchPosts = async (page: number, filter: string) => {
    const res = await fetch(`/api/posts?page=${page}&limit=10&filter=${filter}`);
    return await res.json();
  };

  const { isLoading, isError, error, data, isPreviousData } = useQuery<PostsType, Error>(
    ["posts", page, filter],
    () => fetchPosts(page, filter),
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <main>
        <div className="posts-container">
          <div className="posts-information">
            <h1>Posts</h1>
            <div className="search-bar">
              <img src={"/searchbar-icon.png"} alt="searchbar-icon" />
              <input type="text" placeholder="Search" onChange={(e) => setFilter(e.target.value)} />
            </div>
          </div>

          {isLoading ? (
            <Spinner size={50} />
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            data && (
              <div className="posts">
                {data.posts.map((post) => (
                  <div className="post" key={post.uuid}>
                    <div className="user-info">
                      <p className="user">{post.user}</p>
                      <p className="date">
                        {format(parseISO(post.createdAt), "MMM d, yyyy")} •{" "}
                        {formatDistanceToNow(parseISO(post.createdAt))} ago
                      </p>
                    </div>
                    <div className="post-info">
                      <Link href={`/post/${post.uuid}`}>
                        <h2>{post.title}</h2>
                      </Link>
                      <p>{post.body}</p>
                    </div>
                    <div className="views-info">
                      <p>{post.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          <div className="page-controls">
            <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
              Previous Page
            </button>
            <button
              onClick={() => {
                if (!isPreviousData && data.hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPreviousData || !data?.hasMore}
            >
              Next Page
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          min-height: 400px;
          position: relative;
        }

        .posts-container {
          width: 83%;
          margin: 0 auto;
        }

        .posts-information {
          display: flex;
          justify-content: space-between;
          align-content: center;
        }

        .posts-information h1 {
          font-size: 1.3rem;
          font-weight: 200;
          transform: translateY(5px);
        }

        .search-bar {
          height: 100%;
          display: flex;
          align-content: center;
          margin-right: 10px;
          border-bottom: 1px solid grey;
          padding: 7px;
        }

        .search-bar img {
          width: 15px;
          height: 15px;
        }

        .search-bar input {
          border: none;
          margin-left: 10px;
          font-size: 1rem;
          font-weight: 200;
          letter-spacing: 1px;
        }

        .search-bar input::placeholder {
          color: #4f4f4f;
        }

        .post {
          border: 0.8px solid #000;
          margin-top: 40px;
          height: 280px;
          display: flex;
          flex-direction: column;
          padding: 20px 30px;
        }

        .user-info {
          margin-bottom: 2px;
        }

        .user-info .user {
          font-size: 0.9rem;
          font-weight: 200;
          letter-spacing: 0.7px;
          color: #3c3c3c;
        }

        .user-info .date {
          margin-top: 8px;
          font-size: 0.8rem;
          font-weight: 200;
          color: #4c4c4c;
        }

        .post-info {
          padding: 15px 0;
          height: 75%;
          border-bottom: 0.7px solid #8a8a8a;
        }

        .post-info h2 {
          font-weight: 400;
          margin-bottom: 14px;
          cursor: pointer;
          display: inline-block;
        }

        .post-info p {
          font-weight: 300;
          letter-spacing: 0.8px;
          font-size: 0.9rem;
          line-height: 1.6em;
          max-height: 6.4em; /* max-height = line-height * max-number-of-lines */
          overflow: hidden;
          color: #292929;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }

        .views-info {
          margin-top: 20px;
        }

        .views-info p {
          font-size: 0.8rem;
          font-weight: 350;
          color: #606060;
          letter-spacing: 0.7px;
          margin-left: 2px;
        }

        .page-controls {
          float: right;
          margin: 30px 0 70px;
        }

        .page-controls button {
          cursor: pointer;
          margin-right: 20px;
          border: 1px solid black;
          padding: 6px 8px;
          border-radius: 20px;
          background: #fff;
          color: #343434;
        }

        .page-controls button:disabled {
          border: 1px solid #989898;
          cursor: initial;
          color: #acacac;
        }
      `}</style>
    </>
  );
};

export default Posts;
