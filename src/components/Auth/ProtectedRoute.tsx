"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, token } = useAppSelector((state) => state.auth);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const isAuthPage = pathname.startsWith("/auth");

        // If no user/token and not on auth page, redirect to sign-in
        if (!user && !token && !isAuthPage) {
            router.push("/auth/sign-in");
        }
        // If user is logged in and tries to access auth pages, redirect to dashboard
        else if (user && token && isAuthPage) {
            router.push("/");
        }
    }, [user, token, pathname, router, isMounted]);

    // Don't render anything until mounted to avoid hydration mismatch
    if (!isMounted) {
        return null;
    }

    // While checking auth, we might want to return null or a loader if we are blocking
    // But since we are doing redirects in useEffect, we can render children.
    // However, to prevent flashing of protected content, we could conditionally render.

    // Simple approach: Render children. The useEffect will redirect if needed.
    // To be safer against flashing:
    const isAuthPage = pathname.startsWith("/auth");
    if (!user && !token && !isAuthPage) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
