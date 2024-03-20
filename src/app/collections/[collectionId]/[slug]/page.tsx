import React from "react";
import CollectionItem from "@/components/CollectionItem";
import Image from "next/image";
import { getCollections, getRelatedCollections } from "@/api/unsplash";
import { IoIosShareAlt, IoIosMore } from "react-icons/io";
import CollectionPhotos from "@/components/CollectionPhotos";

export const getServerCollectionProps = async (collectionId: string) => {
    try {
        const collection = await getCollections(collectionId);
        return collection;
    } catch (err) {
        console.error("Failed fetching data", err);
    }
};

export const getServerCollectionRelatedProps = async (collectionId: string) => {
    try {
        const collectionRelated = await getRelatedCollections(collectionId);
        return collectionRelated;
    } catch (err) {
        console.error("Failed fetching data", err);
    }
};

export default async function CollectionDetail({
    params,
}: {
    params: { collectionId: string; slug: string };
}) {
    const collection = await getServerCollectionProps(params.collectionId);
    const collectionRelated = await getServerCollectionRelatedProps(
        params.collectionId
    );

    return (
        <div className="w-full px-5 mt-28 flex flex-col">
            <h1 className="text-5xl font-bold mb-4">{collection?.title}</h1>
            <div className="flex flex-row items-start justify-between mb-20">
                <div>
                    <p className="text-lg mb-6">{collection?.description}</p>
                    <div className="flex flex-row items-center justify-start gap-x-2">
                        {collection?.user?.profile_image?.small && (
                            <Image
                                src={collection.user.profile_image.small}
                                alt={collection.user?.name ?? "image"}
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                        )}
                        <p className="block leading-5 overflow-hidden whitespace-nowrap font-medium">
                            {collection?.user?.name}
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
                {collection?.total_photos || 0} photos
            </p>
            <CollectionPhotos />
            <h2 className="text-2xl text-textSecondary font-semibold mt-16 mb-6">
                You might also like
            </h2>
            <div className="w-full grid grid-cols-3 gap-x-6 gap-y-12">
                {collectionRelated &&
                    collectionRelated.map((collection: any, index: any) => (
                        <CollectionItem
                            key={index}
                            id={collection.id}
                            title={collection.title}
                            total_photos={collection.total_photos}
                            name={collection.user?.name}
                            tags={collection.tags.slice(0, 3)}
                            preview_photos={collection.preview_photos}
                        />
                    ))}
            </div>
        </div>
    );
}
