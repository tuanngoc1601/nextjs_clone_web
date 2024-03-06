"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPhotos } from "@/api/apiRequest";
import { FaHeart } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa6";

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
    const ENPOINT = process.env.NEXT_APP_BACKEND_URL;
    const [perPage, setPerPage] = useState(30);
    const [page, setPage] = useState(1);
    const [dataPhotos, setDataPhotos] = useState<Photo[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreImages = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        fetch(
            `https://api.unsplash.com/photos?client_id=${client_id}&per_page=${perPage}`
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
            <div className="w-full columns-3 gap-4 space-y-4 px-5 mt-10">
                {dataPhotos &&
                    dataPhotos?.map((photo, index) => {
                        return (
                            <div className="image-container" key={index}>
                                <img src={photo.urls.small} alt="" />
                                <div className="overlay flex flex-col items-center justify-between p-4">
                                    <div className="w-full flex flex-row items-center justify-end gap-x-2">
                                        <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                                            <FaHeart />
                                        </button>
                                        <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                                            <LuPlus />
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center justify-between gap-x-2">
                                            <img
                                                src={
                                                    photo.user.profile_image
                                                        .small
                                                }
                                                alt=""
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <p className="text-white text-15px overflow-hidden font-medium">{photo.user.name}</p>
                                        </div>
                                        <button className="px-3 py-2 text-base text-iconColor rounded border-black shadown-sm bg-bgButtonIcon hover:text-textPrimary hover:bg-white">
                                            <FaArrowDown />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </InfiniteScroll>
    );
};

export default PhotoContainer;
