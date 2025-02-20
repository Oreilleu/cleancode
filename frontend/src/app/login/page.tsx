"use client";

import Button from "@/app/components/Button";
import { LoginIcon } from "@/app/components/icons/LogoIcon";
import Input from "@/app/components/inputs/Input";
import { useLogin } from "./hook";

const Login = () => {
  const { onSubmit, register, errors, isLoading } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-4">
              <LoginIcon />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Volt</h1>
            <p className="text-gray-500 mt-1">Accédez à votre compte</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email"
              {...register("email", { required: "Ce champ est requis" })}
              required
              placeholder="votre@email.com"
              autoComplete="email"
              error={errors.email?.message}
            />

            <Input
              id="password"
              type="password"
              label="Mot de passe"
              {...register("password", { required: "Ce champ est requis" })}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Connexion en cours..."
              fullWidth
              variant="primary"
            >
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
