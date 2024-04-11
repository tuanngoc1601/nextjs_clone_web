"use client";

import React, { useEffect, useState } from "react";
import { likePhoto, unlikePhoto } from "@/api/unsplash";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HeaderProps } from "@/lib/types";

const HeaderPhoto: React.FC<HeaderProps> = (props) => {
    const accessToken = useStore((state) => state.accessToken);
    const likedPhotos = useStore((state) => state.likedPhotos);
    const addLikedPhoto = useStore((state) => state.addLikedPhoto);
    const [isLikedPhoto, setIsLikedPhoto] = useState<boolean>(false);

    const handleReactPhoto = async () => {
        if (accessToken && accessToken !== "") {
            if (!isLikedPhoto) {
                setIsLikedPhoto(true);
                addLikedPhoto(props?.id);
                await likePhoto(props?.id, accessToken);
            } else {
                setIsLikedPhoto(false);
                addLikedPhoto(props?.id);
                await unlikePhoto(props?.id, accessToken);
            }
        }
    };

    useEffect(() => {
        setIsLikedPhoto(likedPhotos.includes(props?.id) ? true : false);
    }, [props?.id, likedPhotos]);

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
                            isLikedPhoto
                                ? "bg-bgLike"
                                : "bg-white border border-borderColor"
                        } text-sm text-textPrimary font-medium px-3 py-2 rounded hover:text-textSecondary hover:border-textSecondary shadow`}
                        onClick={handleReactPhoto}
                    >
                        <FaHeart
                            className={`${
                                isLikedPhoto ? "text-white" : "text-textPrimary"
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
