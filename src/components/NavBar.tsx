"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();

    return (
        <nav className="sticky top-14 z-10 bg-white h-14 w-full flex flex-row items-center justify-center mt-62px px-5 gap-x-8 border-b border-borderColor">
            <div className="h-full flex flex-row items-center justify-center gap-x-4">
                <Link href={"/"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center">
                        Editorial
                    </a>
                </Link>
                <Link href={"/unsplash"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Unsplash+
                    </a>
                </Link>
            </div>
            <div className="w-px h-8 bg-borderColor"></div>
            <div className="w-full flex flex-row items-center justify-between">
                <Link href={"/spring"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Spring
                    </a>
                </Link>
                <Link href={"/wallpapers"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Wallpapers
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Nature
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        3D Renders
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Travel
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Architecture & Interiors
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Textures & Patterns
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Street Photography
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Film
                    </a>
                </Link>
                <Link href={"/nature"} legacyBehavior>
                    <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                        Archival
                    </a>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
