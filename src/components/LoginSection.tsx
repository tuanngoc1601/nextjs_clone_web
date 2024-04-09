import React from "react";
import { useStore } from "@/lib/store";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { SubmitPhoto } from "./buttons/SubmitPhoto";

export default function LoginSection({ code }: { code: string }) {
    const accessToken = useStore.getState().accessToken;
    const ENPOINT_AUTHORIZE = process.env.NEXT_PUBLIC_APP_OAUTH_AUTHORIZE;
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_2;
    const redirect_uri = process.env.NEXT_PUBLIC_APP_REDIRECT_URI;

    function getAuthorizationCode() {
        redirect(`${ENPOINT_AUTHORIZE}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=public+write_likes`);
    }

    return (
        <div className="flex flex-row items-center font-medium text-textPrimary justify-center gap-x-8">
            {accessToken === "" && (
                <form action={getAuthorizationCode}>
                    <button
                        className="text-sm cursor-pointer ms-5 hover:text-textSecondary"
                        type="submit"
                    >
                        Log in
                    </button>
                </form>
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
