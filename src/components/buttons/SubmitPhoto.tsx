"use client";

import React from "react";
import { useStore } from "@/lib/store";

export function SubmitPhoto() {
    const resetStore = useStore((state) => state.reset);

    const handleLogout = () => {
        resetStore();
    };

    return (
        <button
            className="text-sm border border-borderColor p-2 shadow-md rounded-md hover:text-textSecondary hover:border-textSecondary"
            onClick={handleLogout}
        >
            Submit a photo
        </button>
    );
}
