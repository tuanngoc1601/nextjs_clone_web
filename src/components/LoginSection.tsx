"use client";

import React from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { SubmitPhoto } from "./buttons/SubmitPhoto";

export default function LoginSection() {
    const accessToken = useStore((state) => state.accessToken);
    const router = useRouter();
    const ENPOINT_AUTHORIZE = process.env.NEXT_PUBLIC_APP_OAUTH_AUTHORIZE;
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_2;
    const redirect_uri = process.env.NEXT_PUBLIC_APP_REDIRECT_URI;

    const getAuthorizationCode = () => {
        router.push(
            `${ENPOINT_AUTHORIZE}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=public+write_likes`
        );
    };

    return (
        <div className="flex flex-row items-center font-medium text-textPrimary justify-center gap-x-8">
            {accessToken === "" && (
                <button
                    className="text-sm cursor-pointer ms-5 hover:text-textSecondary"
                    onClick={getAuthorizationCode}
                >
                    Log in
                </button>
            )}
            <SubmitPhoto />
            {accessToken !== "" && (
                <>
                    <span className="text-xl cursor-pointer text-textPrimary hover:text-textSecondary">
                        <FaBell />
                    </span>
                    <Image
                        src="https://images.unsplash.com/placeholder-avatars/extra-large.jpg?bg=fff&crop=faces&dpr=2&h=32&w=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full bg-bgInputSearch cursor-pointer"
                    />
                </>
            )}
        </div>
    );
}
