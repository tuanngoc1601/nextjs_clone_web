"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const stopPropagation = useCallback((e: any) => {
        e.stopPropagation();
    }, []);

    const backPreviouPage = useCallback(
        (e: any) => {
            router.back();
        },
        [router]
    );

    useEffect(() => {
        const body = document.querySelector("body");

        if (body) {
            body.style.overflow = "hidden";
        }

        return () => {
            if (body) {
                body.style.overflow = "auto";
            }
        };
    }, []);

    return (
        <div className="w-full min-h-screen bg-bgModal backdrop-blur-sm fixed top-0 left-0 z-30 overflow-auto modal-content">
            <div
                className="w-full min-h-screen top-0 left-0 absolute py-4 pb-25 px-17.5 z-30 flex flex-row justify-center items-center overflow-auto rounded-lg cursor-zoom-out"
                onClick={(e) => backPreviouPage(e)}
            >
                <div
                    className="cursor-default"
                    onClick={(e) => stopPropagation(e)}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
