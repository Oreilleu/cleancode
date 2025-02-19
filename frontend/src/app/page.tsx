"use client";

import useAuth from "@/utils/hooks/useAuth";

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
