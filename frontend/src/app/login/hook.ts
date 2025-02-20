import { Login } from "@/interfaces/login.interface";
import { ResponseError } from "@/interfaces/response-error.interface";
import { AuthenticatedUser } from "@/interfaces/user.interface";
import {
  globalErrorMessage,
  userErrorMessage,
} from "@/utils/enums/error-message.enum";
import { LocalStorageKey } from "@/utils/enums/localstorage-key.enum";
import { Routes } from "@/utils/enums/path.enum";
import useAuth from "@/utils/hooks/useAuth";
import { setLocalStorage } from "@/utils/localstorage-handler";
import { zodLoginSchema } from "@/utils/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: "onBlur",
    resolver: zodResolver(zodLoginSchema),
  });

  const { isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (data: Login) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const json: ResponseError = await response.json();

        toast.error(json.message || globalErrorMessage.ERROR_OCCURRED);
        return;
      }

      const json: AuthenticatedUser = await response.json();

      setLocalStorage(LocalStorageKey.USER, json.user);
      setLocalStorage(LocalStorageKey.TOKEN, json.token);
      router.push(Routes.SCOOTERS);
      toast.success(userErrorMessage.LOGIN_SUCCESS);
    } catch (error) {
      console.error(error);
      toast.error(globalErrorMessage.ERROR_OCCURRED);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(Routes.SCOOTERS);
    }
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};
