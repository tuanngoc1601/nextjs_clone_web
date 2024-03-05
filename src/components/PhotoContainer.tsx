"use client";

import React, { useEffect, useState } from "react";
import { getPhotos } from "@/api/apiRequest";
import InfiniteScroll from "./InfiniteScroll";
import { FaHeart, FaDownload } from "react-icons/fa";

interface Photo {
    id: string;
    urls: {
        small: string;
    };
}

const PhotoContainer: React.FC = () => {
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    const ENPOINT = process.env.NEXT_APP_BACKEND_URL;
    const [perPage, setPerPage] = useState(10);
    const [dataPhotos, setDataPhotos] = useState<Photo[]>([]);

    const loadMore = () => {
        setPerPage(perPage + 10);
    };

    useEffect(() => {
        fetch(
            `https://api.unsplash.com/photos?client_id=${client_id}&per_page=${perPage}`
        )
            .then((res) => res.json())
            .then((data) => {
                setDataPhotos(data);
            });
    }, [perPage]);

    console.log(perPage);

    return (
        <InfiniteScroll loadMore={loadMore}>
            <div className="w-full columns-3 gap-4 space-y-4 px-5 mt-10">
                {dataPhotos &&
                    dataPhotos?.map((photo, index) => {
                        return (
                            <div className="image-container" key={index}>
                                <img src={photo.urls.small} alt="" />
                                <div className="overlay">
                                    <button>
                                        <FaHeart />
                                    </button>
                                    <button>
                                        <FaDownload />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </InfiniteScroll>
    );
};

export default PhotoContainer;
