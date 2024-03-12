"use client";

import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import UserPhotoTabs from "@/components/UserPhotosTab";
import ProfileInfo from "@/components/ProfileInfo";
import ImageItem from "@/components/ImageItem";

interface Custom {
    title: string;
    source: {
        title: string;
    };
}

interface UserProfileProps {
    name: string;
    first_name: string;
    bio: string;
    location: string;
    total_photos: number;
    total_likes: number;
    total_collections: number;
    profile_image: {
        small: string;
        medium: string;
        large: string;
    };
    tags: {
        custom: Custom[];
    };
}

interface Photo {
    id: string;
    urls: {
        raw: string;
        regular: string;
        full: string;
    };
    user: {
        name: string;
        profile_image: {
            small: string;
        };
    };
}

export default function UserProfile({
    params,
}: {
    params: { username: string };
}) {
    const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
    const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
    const [user, setUser] = useState<UserProfileProps | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 10;

    const loadMoreImages = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        if (!client_id || !params.username || !ENPOINT) {
            return;
        }
        fetch(`${ENPOINT}/users/${params.username}?client_id=${client_id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            });
    }, []);

    useEffect(() => {
        if (!client_id || !params.username || !ENPOINT) {
            return;
        }
        fetch(
            `${ENPOINT}.com/users/${params.username}/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPhotos((prev) => [...prev, ...data]);
            });
    }, [page]);

    return (
        <div className="w-full mt-28">
            {user && <ProfileInfo user={user} />}
            <UserPhotoTabs
                total_photos={user?.total_photos || 0}
                total_likes={user?.total_likes || 0}
                total_collections={user?.total_collections || 0}
            />

            <InfiniteScroll
                dataLength={photos.length}
                next={loadMoreImages}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more images to load</p>}
            >
                <div className="w-full columns-3 gap-4 space-y-4 px-5">
                    {photos &&
                        photos.map((photo, index) => (
                            <ImageItem
                                key={index}
                                imageUrl={photo.urls?.raw}
                                userImageUrl={photo.user?.profile_image?.small}
                                username={photo.user?.name}
                            />
                        ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}
