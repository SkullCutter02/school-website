import React, { useEffect } from "react";
import Link from "next/link";

import useStore from "../state/store";

const Navbar: React.FC = () => {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        updateUser(data);
      }
    };

    fetchUser().then();
  }, []);

  return (
    <>
      <nav>
        <div className="nav-top-line" />
        <div className="nav-banner">
          <div className="left">
            <Link href={"/"}>
              <h2>Y11 INTERACTIVE WEBSITE</h2>
            </Link>
          </div>
          <div className="right">
            <img src={"/user.jpg"} alt="user-icon" />
            {user ? (
              <Link href={"/admin/dashboard"}>
                <p>{user.username}</p>
              </Link>
            ) : (
              <Link href={"/admin/auth"}>
                <p>Log In</p>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .nav-top-line {
          width: 100vw;
          background: #a0138e;
          height: 3.5px;
        }

        .nav-banner {
          width: 100vw;
          height: 70px;
          display: flex;
          justify-content: space-between;
        }

        .left,
        .right {
          display: flex;
          height: 100%;
          align-items: center;
        }

        .left h2 {
          margin-left: 40px;
          font-size: 1.3rem;
          cursor: pointer;
        }

        .right p {
          margin-right: 40px;
          color: #4e4e4e;
          font-size: 1rem;
          cursor: pointer;
          font-family: "Times New Roman", serif;
        }

        .right p:hover {
          color: #757575;
        }

        .right img {
          height: 25px;
          width: 25px;
          display: block;
          cursor: pointer;
          margin-right: 6px;
        }

        @media screen and (max-width: 600px) {
          .left h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
