"use client"

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageItem from "./ImageItem";
import { getUserPhotos } from "@/api/unsplash";

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
        <div className="w-full columns-3 gap-4 px-5">
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
    );
};

export default UserPhotoContainer;
