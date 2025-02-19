import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // TODO : vérifié l'intégrité du token

    if (!token) {
      router.push("/login");
    }
  }, [router]);
};

export default useAuth;
