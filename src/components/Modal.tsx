"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();

    const backPreviouPage = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <div>
            <div
                className="w-full min-h-screen bg-black opacity-50 backdrop-blur-sm fixed top-0 left-0 z-30 cursor-zoom-out"
                onClick={() => backPreviouPage()}
            >
            </div>
            <div className="w-90% h-90% flex flex-row items-center justify-center bg-white fixed z-40 p-4 top-1/2 left-1/2 transform overflow-auto modal rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default Modal;
