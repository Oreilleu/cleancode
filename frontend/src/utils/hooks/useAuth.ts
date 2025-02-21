import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "../localstorage-handler";
import { LocalStorageKey } from "../enums/localstorage-key.enum";
import { Routes } from "../enums/path.enum";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    try {
      const token = getLocalStorage(LocalStorageKey.TOKEN);

      if (!token) {
        logout();
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeLocalStorage(LocalStorageKey.USER);
    removeLocalStorage(LocalStorageKey.TOKEN);
    setIsAuthenticated(false);
    router.push(Routes.LOGIN);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return { isAuthenticated, isLoading, logout };
};

export default useAuth;
