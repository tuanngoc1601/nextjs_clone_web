"use client";

import React, { useEffect, useState } from "react";
import { loginUser } from "@/api/unsplash";
import LoginButton from "@/components/buttons/ButtonLogin";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";

export default function LoginPage() {
    const code = useSearchParams().get("code");
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const login = useStore((state) => state.login);
    const router = useRouter();

    useEffect(() => {
        if(initialLoad) {
            setInitialLoad(false);
        } else {
            (async () => {
                const response = await loginUser(code ?? "");
                login(response.access_token);
                router.push("/");
            })();
        }
    }, [initialLoad]);

    return (
        <div className="w-full min-h-screen flex flex-row item-center justify-center"></div>
    );
}
