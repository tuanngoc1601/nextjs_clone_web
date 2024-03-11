"use client";

import CollectionItem from "@/components/CollectionItem";
import ImageItem from "@/components/ImageItem";
import { useEffect, useState } from "react";
import { IoIosShareAlt, IoIosMore } from "react-icons/io";

interface Photo {
    id: string;
    urls: {
        raw: string;
        full: string;
    };
    user: {
        profile_image: {
            small: string;
        };
        username: string;
    };
}

interface Tag {
    title: string;
}

interface Collection {
    title: string;
    description: string;
    user: {
        name: string;
        profile_image: {
            small: string;
        };
    };
    total_photos: number;
    tags: Tag[];
    preview_photos: Photo[];
}

export default function CollectionDetail({
    params,
}: {
    params: { slug: string };
}) {
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    const [collection, setCollection] = useState<Collection | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [collectionRelated, setCollectionRelated] = useState<Collection[]>(
        []
    );

    useEffect(() => {
        fetch(
            `https://api.unsplash.com/collections/${params.slug}?client_id=${client_id}`
        )
            .then((res) => res.json())
            .then((data) => {
                setCollection(data);
            });
    }, [params.slug]);

    useEffect(() => {
        fetch(
            `https://api.unsplash.com/collections/${params.slug}/photos?client_id=${client_id}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data);
            });

        fetch(
            `https://api.unsplash.com/collections/${params.slug}/related?client_id=${client_id}`
        )
            .then((res) => res.json())
            .then((data) => {
                setCollectionRelated(data);
            });
    }, []);

    console.log(collection);

    return (
        <div className="w-full px-5 mt-28 flex flex-col">
            <h1 className="text-5xl font-bold mb-4">{collection?.title}</h1>
            <div className="flex flex-row items-start justify-between mb-20">
                <div>
                    <p className="text-lg mb-6">{collection?.description}</p>
                    <div className="flex flex-row items-center justify-start gap-x-2">
                        <img
                            src={collection?.user.profile_image.small}
                            alt=""
                            className="h-8 w-8 rounded-full"
                        />
                        <p className="block leading-5 overflow-hidden whitespace-nowrap font-medium">
                            {collection?.user.name}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-2">
                    <button className="bg-white text-textPrimary border border-borderColor px-3 py-1 h-8 rounded text-sm shadow inline-flex gap-x-1 font-medium items-center justify-center hover:text-textSecondary hover:border-textSecondary">
                        <IoIosShareAlt className="text-lg" />
                        Share
                    </button>
                    <button className="bg-white text-textPrimary border border-borderColor px-3 py-1 h-8 rounded text-sm shadow inline-flex items-center justify-center hover:text-textSecondary hover:border-textSecondary">
                        <IoIosMore className="text-lg" />
                    </button>
                </div>
            </div>
            <p className="text-15px text-textSecondary mb-6 leading-8">
                {collection?.total_photos} photos
            </p>
            <div className="w-full columns-3 gap-4 space-y-4">
                {photos &&
                    photos?.map((photo, index) => (
                        <ImageItem
                            key={index}
                            imageUrl={photo.urls.raw}
                            userImageUrl={photo.user.profile_image.small}
                            username={photo.user.username}
                        />
                    ))}
            </div>
            <h2 className="text-2xl text-textSecondary font-semibold mt-16 mb-6">You might also like</h2>
            <div className="w-full grid grid-cols-3 gap-x-6 gap-y-12">
                {collectionRelated &&
                    collectionRelated.map((collection, index) => (
                        <CollectionItem
                            key={index}
                            title={collection.title}
                            total_photos={collection.total_photos}
                            name={collection.user.name}
                            tags={collection.tags.slice(0, 3)}
                            preview_photos={collection.preview_photos}
                        />
                    ))}
            </div>
        </div>
    );
}
