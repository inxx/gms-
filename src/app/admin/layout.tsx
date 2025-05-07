import { getServerSession } from "next-auth";
import { adminAuthOptions } from "@/lib/auth/admin";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  // 현재 경로 확인
  const pathname = children.props?.childProp?.segment;
  
  // 로그인 페이지가 아닐 때만 세션 체크
  if (pathname !== 'login') {
    const session = await getServerSession(adminAuthOptions);
    if (!session) {
      // redirect("/admin/login");
    }
  }

  return <>{children}</>;
}