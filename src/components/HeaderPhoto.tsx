"use client";

import React, { useEffect } from "react";
import { likePhoto, unlikePhoto } from "@/api/unsplash";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface Props {
    id: string;
    username: string;
    name: string;
    userImageUrl: string;
    isLike: boolean;
}

const HeaderPhoto: React.FC<Props> = (props) => {
    const accessToken = useStore((state) => state.accessToken);
    const isLikePhoto = useStore((state) => state.isLikePhoto);
    const updateLikePhoto = useStore((state) => state.updateLikePhoto);

    const handleReactPhoto = async () => {
        if (accessToken && accessToken !== "") {
            if (!isLikePhoto) {
                updateLikePhoto(true);
                await likePhoto(props?.id, accessToken);
            } else {
                updateLikePhoto(false);
                await unlikePhoto(props?.id, accessToken);
            }
        }
    };

    useEffect(() => {
        updateLikePhoto(props?.isLike);
    }, [props?.id]);

    return (
        <>
            <div className="h-62 flex flex-row items-center justify-center gap-x-2">
                <Link href={`/${props?.username}`}>
                    {props?.userImageUrl && (
                        <img
                            src={props.userImageUrl}
                            alt={props?.name ?? "image"}
                            width={32}
                            height={32}
                            className="rounded-full cursor-pointer"
                        />
                    )}
                </Link>

                <div className="flex flex-col overflow-hidden whitespace-nowrap">
                    <Link href={`/${props?.username}`}>
                        <h3 className="block text-15px leading-5 font-medium text-textSecondary cursor-pointer">
                            {props?.name}
                        </h3>
                    </Link>

                    <p className="text-textPrimary text-xs hover:text-textSecondary cursor-pointer">
                        {props?.username}
                    </p>
                </div>
            </div>
            <div className="sm:w-full md:w-auto flex flex-row items-center sm:justify-between md:justify-center gap-x-2">
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <button
                        className={`${
                            isLikePhoto
                                ? "bg-bgLike"
                                : "bg-white border border-borderColor"
                        } text-sm text-textPrimary font-medium px-3 py-2 rounded hover:text-textSecondary hover:border-textSecondary shadow`}
                        onClick={handleReactPhoto}
                    >
                        <FaHeart
                            className={`${
                                isLikePhoto ? "text-white" : "text-textPrimary"
                            }`}
                        />
                    </button>
                    <button className="bg-white text-sm text-textPrimary font-medium border border-borderColor px-3 py-2 rounded hover:text-textSecondary hover:border-textSecondary shadow">
                        <FaPlus />
                    </button>
                </div>
                <div className="flex flex-row items-center justify-center rounded-md shadow">
                    <button className="h-8 inline-flex items-center justify-center font-medium bg-white text-sm text-textPrimary border translate-x-px border-borderColor rounded-s px-3 py-2 hover:text-textSecondary hover:border-textSecondary">
                        Download
                    </button>
                    <button className="h-8 inline-flex items-center justify-center text-sm bg-white text-textPrimary border border-borderColor rounded-e px-3 py-2 hover:text-textSecondary hover:border-textSecondary hover:z-10">
                        <FaChevronDown />
                    </button>
                </div>
            </div>
        </>
    );
};

export default HeaderPhoto;
