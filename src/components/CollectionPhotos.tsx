"use client";

import React, { useEffect, useState } from "react";
import ImageItem from "./ImageItem";
import { getPhotoCollection } from "@/api/unsplash";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getDataWithBlurUrl } from "@/utils/getBase64";
import { Photo } from "@/lib/types";

const CollectionPhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const params = useParams<{ collectionId: string }>();
    const accessToken = useStore((state) => state.accessToken);

    useEffect(() => {
        (async () => {
            const data = await getPhotoCollection(params.collectionId, accessToken);

            const dataWithBlurHash = await getDataWithBlurUrl(data);

            setPhotos(dataWithBlurHash);
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
                        blurHash={photo.blurHash}
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
