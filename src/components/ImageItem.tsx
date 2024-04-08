"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { likePhoto, unlikePhoto } from "@/api/unsplash";

interface ImageProps {
    slug: string;
    alt_description: string;
    imageUrl: string;
    userImageUrl: string;
    name: string;
    username: string;
    width: number;
    height: number;
    isLike: boolean;
}

const ImageItem: React.FC<ImageProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const id = props?.slug.slice(props?.slug.length - 11);
    const accessToken = useStore((state) => state.accessToken);
    const likedPhotos = useStore((state) => state.likedPhotos);
    const addLikedPhotos = useStore((state) => state.addLikedPhoto);
    const [isLikePhoto, setIsLikePhoto] = useState<boolean>(false);

    const handleReactPhoto = async () => {
        if (accessToken && accessToken !== "") {
            if (!isLikePhoto) {
                setIsLikePhoto(true);
                addLikedPhotos(id);
                await likePhoto(id, accessToken);
            } else {
                setIsLikePhoto(false);
                addLikedPhotos(id);
                await unlikePhoto(id, accessToken);
            }
        }
    };

    useEffect(() => {
        setIsLikePhoto(likedPhotos.includes(id) ? true : false);
    }, [likedPhotos]);

    return (
        <div className="image-container relative">
            <Link href={`/photos/${props?.slug}`} className="cursor-zoom-in">
                {props?.imageUrl && (
                    <Image
                        src={props.imageUrl}
                        alt={props?.alt_description ?? "image"}
                        width={500}
                        height={500}
                        className={`${loading ? "blur" : "opacity-100"}`}
                        style={{
                            aspectRatio: `${props?.width} / ${props?.height}`,
                        }}
                        onLoad={() => setLoading(false)}
                    />
                )}
                <div className="overlay"></div>
            </Link>

            <div className="absolute top-0 right-0 pt-4 pe-4 flex flex-col items-end justify-between opacity-0 reaction">
                <div className="w-full flex flex-row items-center justify-end gap-x-2 relative top-0 right-0">
                    <button
                        className={`${
                            isLikePhoto
                                ? "bg-bgLike"
                                : "bg-bgButtonIcon hover:text-textPrimary hover:bg-white hover:border-textSecondary"
                        } text-base text-iconColor border-black font-medium px-3 py-2 rounded shadow-sm`}
                        onClick={handleReactPhoto}
                    >
                        <FaHeart
                            className={`${
                                isLikePhoto ? "text-white" : "text-textPrimary"
                            }`}
                        />
                    </button>
                    <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                        <LuPlus />
                    </button>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 pe-4 pb-4 flex flex-row items-center justify-end opacity-0 download-photo">
                <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                    <FaArrowDown />
                </button>
            </div>

            <div className="opacity-0 user-info">
                <div className="w-fit flex flex-row items-center justify-start gap-x-2 cursor-pointer absolute bottom-0 ps-4 pb-4">
                    <Link href={`/${props?.username}`}>
                        {props?.userImageUrl && (
                            <Image
                                src={props.userImageUrl}
                                alt={props?.name ?? "image"}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )}
                    </Link>
                    <Link href={`/${props?.username}`}>
                        <p className="text-white text-15px overflow-hidden font-medium">
                            {props?.name}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ImageItem;
