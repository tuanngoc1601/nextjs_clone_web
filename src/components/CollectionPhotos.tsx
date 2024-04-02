"use client";

import React, { useEffect, useState } from "react";
import ImageItem from "./ImageItem";
import { getPhotoCollection } from "@/api/unsplash";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";

interface Photo {
    id: string;
    alt_description: string;
    slug: string;
    width: number;
    height: number;
    liked_by_user: boolean;
    urls: {
        raw: string;
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

const CollectionPhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const params = useParams<{ collectionId: string }>();
    const accessToken = useStore((state) => state.accessToken);

    useEffect(() => {
        (async () => {
            const data = await getPhotoCollection(params.collectionId, accessToken);
            setPhotos(data);
        })();
    }, [params.collectionId]);

    return (
        <div className="w-full columns-3 gap-4">
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
                        width={photo.width}
                        height={photo.height}
                        isLike={photo.liked_by_user}
                    />
                ))}
        </div>
    );
};

export default CollectionPhotos;
