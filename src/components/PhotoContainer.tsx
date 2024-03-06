"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageItem from "./ImageItem";

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
            `https://api.unsplash.com/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
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
                    dataPhotos?.map((photo, index) => (
                        <ImageItem
                            key={index}
                            imageUrl={photo.urls.small}
                            userImageUrl={photo.user.profile_image.small}
                            username={photo.user.name}
                        />
                    ))}
            </div>
        </InfiniteScroll>
    );
};

export default PhotoContainer;
