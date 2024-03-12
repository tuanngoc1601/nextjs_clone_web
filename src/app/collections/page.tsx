"use client";

import CollectionItem from "@/components/CollectionItem";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Tag {
    type: string;
    title: string;
}

interface Photo {
    id: string;
    urls: {
        raw: string;
        full: string;
    };
}

interface Collection {
    title: string;
    total_photos: number;
    user: {
        name: string;
    };
    tags: Tag[];
    preview_photos: Photo[];
}

export default function CollectionPage() {
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
    const [perPage, setPerPage] = useState(8);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreCollections = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        fetch(
            `${ENPOINT}/collections?client_id=${client_id}&per_page=${perPage}&page=${page}`
        )
            .then((res) => res.json())
            .then((data) => {
                setCollections((prev) => [...prev, ...data]);
            });
    }, [page]);

    return (
        <InfiniteScroll
            dataLength={collections.length}
            next={loadMoreCollections}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more collections to load</p>}
        >
            <div className="w-full px-5 mt-28 flex flex-col">
                <div className="flex flex-col items-start justify-center gap-2">
                    <h1 className="text-5xl text-textSecondary font-bold">
                        Collections
                    </h1>
                    <p className="text-lg text-textSecondary leading-7 mt-3">
                        Explore the world through collections of beautiful
                        photos free to use under
                        <br />
                        the{" "}
                        <a className="text-textPrimary underline cursor-pointer hover:text-textSecondary">
                            Unsplash License
                        </a>
                        .
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-x-6 gap-y-12 mt-16">
                    {collections &&
                        collections.map((collection, index) => (
                            <CollectionItem
                                key={index}
                                title={collection.title}
                                total_photos={collection.total_photos}
                                name={collection.user?.name}
                                tags={collection.tags.slice(0, 3)}
                                preview_photos={collection.preview_photos}
                            />
                        ))}
                </div>
            </div>
        </InfiniteScroll>
    );
}
