"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginButton({ accessToken }: { accessToken: string }) {
    const login = useStore((state) => state.login);
    const router = useRouter();

    useEffect(() => {
        login(accessToken);
        router.push("/");
    }, [accessToken]);

    return (
        <div>Login</div>
    );
}
