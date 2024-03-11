"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const NavBar = () => {
    const pathname = usePathname();

    return (
        <nav className="sticky top-14 z-10 bg-white h-14 w-full flex flex-row items-center justify-center mt-62px sm:px-2.5 lg:px-5 gap-x-8 border-b border-borderColor">
            <div className="h-full flex-none sm:hidden lg:flex flex-row items-center justify-center gap-x-4">
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
            <div className="w-px h-8 flex-none sm:hidden lg:block bg-borderColor"></div>
            <div className="w-full overflow-hidden flex flex-row items-center justify-between nav-slider">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    className="w-full h-full"
                >
                    <SwiperSlide className="sm:block lg:hidden">
                        <Link href={"/"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center">
                                Editorial
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide className="sm:block lg:hidden">
                        <Link href={"/unsplash"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Unsplash+
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/spring"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Spring
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/wallpapers"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Wallpapers
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Nature
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                3D Renders
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Travel
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Architecture
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Textures
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Street
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Film
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Archival
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/spring"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Spring
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/wallpapers"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Wallpapers
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Nature
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                3D Renders
                            </a>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link href={"/nature"} legacyBehavior>
                            <a className="flex h-full text-sm font-medium items-center justify-center text-textPrimary hover:text-textSecondary">
                                Travel
                            </a>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </nav>
    );
};

export default NavBar;
