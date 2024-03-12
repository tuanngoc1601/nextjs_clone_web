"use client";

import NavBar from "@/components/NavBar";
import PhotoContainer from "@/components/PhotoContainer";
import { FaSquarespace } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TbLineScan } from "react-icons/tb";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <NavBar />
            <div className="w-full lg:grid sm:hidden grid-cols-2 gap-6 px-5 mt-8">
                <div className="flex flex-col justify-end items-start gap-y-4">
                    <h1 className="text-40px font-bold leading-5 text-textSecondary">
                        Unsplash
                    </h1>
                    <div className="w-full flex flex-row items-end justify-between">
                        <div className="text-lg">
                            <p>The internet’s source for visuals.</p>
                            <p>Powered by creators everywhere.</p>
                        </div>
                        <div className="flex flex-row items-center text-xs justify-center bg-bgInputSearch rounded-md gap-x-2 px-3 py-2">
                            <p>Supported by</p>
                            <p className="flex flex-row uppercase items-center justify-center tracking-wider gap-x-1">
                                <span className="text-xl">
                                    <FaSquarespace />
                                </span>
                                Squarespace
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-center justify-between bg-bgInputSearch rounded-md hover:bg-bgHover hover:shadow-sm hover:shadown-bgHover py-2">
                        <span className="flex-none ps-4 text-2xl text-textPrimary cursor-pointer hover:text-textSecondary">
                            <IoIosSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Search high-resolution images"
                            className="w-full text-15px border-0 outline-none bg-transparent p-2"
                        />
                        <span className="flex-none pe-4 text-2xl text-textPrimary cursor-pointer hover:text-textSecondary">
                            <TbLineScan />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                    <div className="flex flex-col h-280 bg-bgSection rounded-md p-5 items-start justify-between">
                        <p className="text-lg font-medium text-textPrimary">
                            <strong className="text-textSecondary">
                                Yes, it’s really free.
                            </strong>
                            &nbsp; All images can be downloaded and used for
                            personal or commercial projects.
                        </p>
                        <p className="w-full underline text-15px text-textPrimary text-end">
                            Learn about our License
                        </p>
                    </div>
                    <div
                        className="h-280 rounded-md bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                "url('https://pbs.twimg.com/media/DQUJQoWVwAIewSV?format=jpg&name=4096x4096')",
                        }}
                    >
                        <div
                            className="h-full w-full flex flex-col items-start justify-end p-5 text-white"
                            style={{
                                background:
                                    "linear-gradient(0deg,#000000a6,#0000 55%)",
                            }}
                        >
                            <h3 className="text-xs font-semibold">
                                Discover Unsplash+
                            </h3>
                            <p className="text-lg font-semibold">
                                Unlimited downloads.
                                <br />
                                Full legal protections.
                                <br />
                                No ads
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-2.5 md:flex lg:hidden flex-col gap-y-4">
                <h1 className="text-2xl font-bold leading-5 text-textSecondary mt-10 mb-4">
                    Unsplash
                </h1>
                <div className="w-full overflow-hidden flex flex-row items-center justify-between slider">
                    <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={30}
                        className="w-full h-full"
                    >
                        <SwiperSlide>
                            <div
                                className="h-168 rounded-md bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage:
                                        "url('https://pbs.twimg.com/media/DQUJQoWVwAIewSV?format=jpg&name=4096x4096')",
                                }}
                            >
                                <div
                                    className="h-full w-full flex flex-col items-start justify-end p-5 text-white"
                                    style={{
                                        background:
                                            "linear-gradient(0deg,#000000a6,#0000 55%)",
                                    }}
                                >
                                    <h3 className="text-xs font-semibold">
                                        Discover Unsplash+
                                    </h3>
                                    <p className="text-lg font-semibold">
                                        Unlimited downloads.
                                        <br />
                                        Full legal protections.
                                        <br />
                                        No ads
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col h-168 bg-bgSection rounded-md p-5 items-start justify-between">
                                <p className="text-lg font-medium text-textPrimary">
                                    <strong className="text-textSecondary">
                                        Yes, it’s really free.
                                    </strong>
                                    &nbsp; All images can be downloaded and used
                                    for personal or commercial projects.
                                </p>
                                <p className="w-full underline text-15px text-textPrimary text-end">
                                    Learn about our License
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col h-168 bg-bgSection rounded-md p-5 items-start justify-between">
                                <p className="text-lg font-medium text-textPrimary">
                                    <strong className="text-textSecondary">
                                        Yes, it’s really free.
                                    </strong>
                                    &nbsp; All images can be downloaded and used
                                    for personal or commercial projects.
                                </p>
                                <p className="w-full underline text-15px text-textPrimary text-end">
                                    Learn about our License
                                </p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <PhotoContainer />
        </div>
    );
}
