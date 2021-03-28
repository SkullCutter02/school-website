import React, { useState } from "react";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Posts } from "../../types/Posts";

const PostsEditor: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("");

  const fetchPosts = async (page: number, filter: string) => {
    const res = await fetch(`/api/posts?page=${page}&limit=10&filter=${filter}`);
    return await res.json();
  };

  const { isLoading, isError, error, data, isPreviousData } = useQuery<Posts, Error>(
    ["admin-posts", page, filter],
    () => fetchPosts(page, filter),
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="editor">
        <h1>Posts</h1>

        {isLoading ? (
          <Skeleton height={20} count={4} style={{ marginBottom: "15px" }} />
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          <div className="posts">
            {data.posts.map((post) => (
              <div className="post" key={post.uuid}>
                <p>
                  {post.title}: {post.body}
                </p>
                <FontAwesomeIcon
                  color={"grey"}
                  icon={faPencilAlt}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
                <FontAwesomeIcon
                  color={"grey"}
                  icon={faTrashAlt}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </div>
            ))}

            <Link href={"/admin/dashboard/post/create"}>
              <p className="editor-add-feature">Add Post</p>
            </Link>

            <div className="search-bar">
              <img src={"/searchbar-icon.png"} alt="searchbar-icon" />
              <input type="text" placeholder="Search" onChange={(e) => setFilter(e.target.value)} />
            </div>

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
        )}
      </div>

      <style jsx>{`
        .post {
          display: flex;
          margin-bottom: 15px;
        }

        .post p {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .page-controls {
          margin: 20px 0;
        }

        .search-bar input {
          font-size: 0.8rem;
        }

        .editor-add-feature {
          margin-bottom: 15px;
        }
      `}</style>
    </>
  );
};

export default PostsEditor;
