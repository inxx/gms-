"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn UI
import { Input } from "@/components/ui/input";   // shadcn UI
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (res?.error) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">관리자 로그인</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">아이디</label>
            <Input
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">비밀번호</label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button className="w-full" type="submit" size="lg">
            로그인
          </Button>
        </form>

        <div className="pt-4 border-t">
            <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push('/admin/register')}
            >
            회원가입
            </Button>
        </div>
      </div>
    </div>
  );
}