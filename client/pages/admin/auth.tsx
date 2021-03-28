import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import AnimatedInput from "../../components/reuseable/AnimatedInput";
import SpinnerButton from "../../components/reuseable/SpinnerButton";
import useStore from "../../state/store";

const AuthPage: React.FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errMsgRef = useRef<HTMLParagraphElement>(null);

  const updateUser = useStore((state) => state.updateUser);

  const login = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    errMsgRef.current.textContent = "";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);

        if (data.errors) {
          errMsgRef.current.textContent = data.errors;
        } else if (data.msg) {
          errMsgRef.current.textContent = data.msg;
        } else {
          errMsgRef.current.textContent = "Something went wrong";
        }
      } else {
        updateUser(data);
        await router.push("/admin/dashboard");
      }
    } catch (err) {
      console.log(err);
      errMsgRef.current.textContent = "Something went wrong";
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={login}>
        <h2>Log In</h2>
        <AnimatedInput text={"Username"} name={"username"} margin={30} />
        <AnimatedInput text={"Password"} name={"password"} margin={20} inputType={"password"} required />
        <p className="err-msg" ref={errMsgRef} />
        <div className="submit-btn">
          <SpinnerButton text={"Log In"} isLoading={isLoading} buttonType={"submit"} />
        </div>
      </form>

      <style jsx>{`
        .auth-form {
          width: 55%;
          height: 300px;
          margin: 130px auto;
        }

        .submit-btn {
          float: right;
        }
      `}</style>
    </>
  );
};

export default AuthPage;
