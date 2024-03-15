"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ImageItem from "./ImageItem";
import { getUserPhotos } from "@/api/unsplash";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";

interface PhotoProps {
    id: string;
    slug: string;
    urls: {
        raw: string;
        regular: string;
        full: string;
        small: string;
    };
    user: {
        name: string;
        profile_image: {
            small: string;
            large: string;
        };
        username: string;
    };
}

const UserPhotoContainer: React.FC = () => {
    const params = useParams<{ username: string }>();
    const [photos, setPhotos] = useState<PhotoProps[]>([]);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [initialLoad, setInitialLoad] = useState(true);

    const onScroll = () => {
        const isEndPage =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight;

        if (isEndPage) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const fetchUserPhotos = async (username: string) => {
            try {
                const userPhotos = await getUserPhotos(username, perPage, page);
                if (initialLoad) {
                    setInitialLoad(false);
                    setPhotos(userPhotos);
                } else {
                    setPhotos((prev) => [...prev, ...userPhotos]);
                }
            } catch (err) {
                console.error("Failed fetching photos", err);
            }
        };

        fetchUserPhotos(params.username);
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <>
            <div className="w-full md:block sm:hidden lg:columns-3 md:columns-2 gap-4 px-5">
                {photos &&
                    photos.map((photo, index) => (
                        <ImageItem
                            key={index}
                            slug={photo.slug}
                            imageUrl={photo.urls?.small}
                            userImageUrl={photo.user?.profile_image?.large}
                            name={photo.user?.name}
                            username={photo.user?.username}
                        />
                    ))}
            </div>
            <div className="w-full mt-10 md:hidden sm:block">
                {photos &&
                    photos?.map((photo, index) => (
                        <div className="flex flex-col mb-50" key={index}>
                            <div className="flex flex-row items-center justify-start px-3 gap-x-2 mb-3">
                                <Image
                                    src={photo.user?.profile_image?.large}
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                                <p className="text-15px overflow-hidden font-medium">
                                    {photo.user?.name}
                                </p>
                            </div>
                            <Image
                                src={photo.urls?.small}
                                alt=""
                                width={500}
                                height={500}
                                style={{ width: "100%" }}
                            />
                            <div className="flex flex-row items-center justify-between px-3 mt-3">
                                <div className="flex flex-row items-center justify-center gap-x-2">
                                    <button className="px-3 py-2 text-base text-textPrimary rounded shadow bg-white border h-8 w-10 border-borderColor">
                                        <FaHeart />
                                    </button>
                                    <button className="px-3 py-2 text-base text-textPrimary rounded shadow bg-white border h-8 w-10 border-borderColor">
                                        <LuPlus />
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
                        </div>
                    ))}
            </div>
        </>
    );
};

export default UserPhotoContainer;