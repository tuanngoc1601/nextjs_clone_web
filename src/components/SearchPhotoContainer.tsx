"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ImageItem from "./ImageItem";
import { getSearchPhotos } from "@/api/unsplash";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";

interface Photo {
    id: string;
    slug: string;
    alt_description: string;
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

const SearchPhotoContainer: React.FC = () => {
    const params = useParams<{ query: string }>();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1);
    const perPage = 30;
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        (async (query: string) => {
            const userPhotos = await getSearchPhotos(query, perPage, page);
            if (initialLoad) {
                setInitialLoad(false);
                setPhotos(userPhotos?.results);
            } else {
                setPhotos((prev) => [...prev, ...userPhotos?.results]);
            }
        })(params.query);
    }, [perPage, page, params.query]);

    return (
        <>
            <div className="w-full px-5 mb-8">
                <div className="w-full md:block sm:hidden lg:columns-3 md:columns-2 gap-4">
                    {photos &&
                        photos.length > 0 &&
                        photos.map((photo, index) => (
                            <ImageItem
                                key={index}
                                slug={photo.slug}
                                imageUrl={photo.urls?.small}
                                userImageUrl={photo.user?.profile_image?.large}
                                name={photo.user?.name}
                                username={photo.user?.username}
                                alt_description={photo.alt_description}
                            />
                        ))}
                </div>
                <button
                    className="w-full border border-borderColor flex flex-row items-center justify-center text-textPrimary hover:border-textSecondary hover:text-textSecondary rounded text-base font-medium py-4 mt-4"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Load more
                </button>
            </div>

            <div className="w-full mt-10 md:hidden sm:block">
                {photos &&
                    photos.length > 0 &&
                    photos.map((photo, index) => (
                        <div className="flex flex-col mb-50" key={index}>
                            <div className="flex flex-row items-center justify-start px-3 gap-x-2 mb-3">
                                {photo.user?.profile_image?.large && (
                                    <Image
                                        src={photo.user.profile_image.large}
                                        alt={photo.user?.name ?? "image"}
                                        width={32}
                                        height={32}
                                        className="rounded-full object-cover"
                                    />
                                )}
                                <p className="text-15px overflow-hidden font-medium">
                                    {photo.user?.name}
                                </p>
                            </div>
                            {photo.urls?.small && (
                                <Image
                                    src={photo.urls.small}
                                    alt={photo?.alt_description ?? "image"}
                                    width={500}
                                    height={500}
                                    style={{ width: "100%" }}
                                />
                            )}
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

export default SearchPhotoContainer;
