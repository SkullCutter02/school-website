import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          router.push("/");
        }
      })
      .catch((err) => {
        router.push("/");
        console.log(err);
      });
  }, []);
};

export default useAuth;
