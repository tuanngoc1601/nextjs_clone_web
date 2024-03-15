"use client";

import React, { useState } from "react";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { MdCollections } from "react-icons/md";

interface PhotoDataProps {
    total_photos: number;
    total_likes: number;
    total_collections: number;
}

const UserPhotoTabs: React.FC<PhotoDataProps> = (props) => {
    const [activeTab, setActiveTab] = useState<string>("photos");

    const handTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className="sticky top-14 z-10 bg-white h-14 w-full flex flex-row items-center justify-start mt-48 px-5 gap-x-8 border-b border-borderColor mb-10">
            <div
                className={`flex flex-row items-center justify-center gap-x-2 font-medium text-textPrimary text-sm  ${
                    activeTab === "photos"
                        ? "text-textSecondary"
                        : "cursor-pointer hover:text-textSecondary"
                }`}
                onClick={() => handTabClick("photos")}
            >
                <span>
                    <MdPhotoSizeSelectActual />
                </span>
                Photos&nbsp;
                {(props?.total_photos / 1000).toFixed(1)}k
            </div>
            <div
                className={`flex flex-row items-center justify-center gap-x-2 font-medium text-textPrimary text-sm  ${
                    activeTab === "likes"
                        ? "text-textSecondary"
                        : "cursor-pointer hover:text-textSecondary"
                }`}
                onClick={() => handTabClick("likes")}
            >
                <span>
                    <FaHeart />
                </span>
                Likes&nbsp;
                {(props?.total_likes / 1000).toFixed(0)}k
            </div>
            <div
                className={`flex flex-row items-center justify-center gap-x-2 font-medium text-textPrimary text-sm  ${
                    activeTab === "collections"
                        ? "text-textSecondary"
                        : "cursor-pointer hover:text-textSecondary"
                }`}
                onClick={() => handTabClick("collections")}
            >
                <span>
                    <MdCollections />
                </span>
                Collections&nbsp;
                {props?.total_collections}
            </div>
        </div>
    );
};

export default UserPhotoTabs;
