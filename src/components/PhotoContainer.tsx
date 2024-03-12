"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageItem from "./ImageItem";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import Image from "next/image";

interface Photo {
    id: string;
    urls: {
        small: string;
    };
    user: {
        name: string;
        profile_image: {
            small: string;
        };
    };
}

const PhotoContainer: React.FC = () => {
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
    const [perPage, setPerPage] = useState(30);
    const [page, setPage] = useState(1);
    const [dataPhotos, setDataPhotos] = useState<Photo[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreImages = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        fetch(
            `${ENPOINT}/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
        )
            .then((res) => res.json())
            .then((data) => {
                setDataPhotos((prev) => [...prev, ...data]);
            });
    }, [page]);

    return (
        <InfiniteScroll
            dataLength={dataPhotos.length}
            next={loadMoreImages}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more images to load</p>}
        >
            <div className="w-full lg:block sm:hidden columns-3 gap-4 space-y-4 lg:px-5 sm:px-2.5 mt-10">
                {dataPhotos &&
                    dataPhotos?.map((photo, index) => (
                        <ImageItem
                            key={index}
                            imageUrl={photo.urls?.small}
                            userImageUrl={photo.user?.profile_image?.small}
                            username={photo.user?.name}
                        />
                    ))}
            </div>
            <div className="w-full mt-10 lg:hidden sm:block">
                {dataPhotos &&
                    dataPhotos?.map((photo, index) => (
                        <div className="flex flex-col mb-12" key={index}>
                            <div className="flex flex-row items-center justify-start px-2.5 gap-x-2 mb-2">
                                <Image
                                    src={photo.user?.profile_image?.small}
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                                <p className="text-15px overflow-hidden font-medium">
                                    {photo.user?.name}
                                </p>
                            </div>
                            <Image src={photo.urls?.small} alt="" width={500} height={500} />
                            <div className="flex flex-row items-center justify-between px-2.5 mt-4">
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
        </InfiniteScroll>
    );
};

export default PhotoContainer;
