"use client";

import React, { useEffect, useState } from "react";
import ImageItem from "./ImageItem";
import { getPhotoCollection } from "@/api/unsplash";
import { useParams } from "next/navigation";

interface Photo {
    id: string;
    alt_description: string;
    slug: string;
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

    useEffect(() => {
        const fetchPhotoCollection = async () => {
            try {
                const data = await getPhotoCollection(params.collectionId);
                setPhotos(data);
            } catch (err) {
                console.error("Failed fetching collection's photos", err);
            }
        };

        fetchPhotoCollection();
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
                    />
                ))}
        </div>
    );
};

export default CollectionPhotos;
