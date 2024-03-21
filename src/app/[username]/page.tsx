import React from "react";
import { getUserInfo } from "@/api/unsplash";
import UserPhotoTabs from "@/components/UserPhotosTab";
import ProfileInfo from "@/components/ProfileInfo";
import UserPhotoContainer from "@/components/UserPhotoContainer";

export default async function UserProfile({
    params,
}: {
    params: {
        username: string;
    };
}) {
    const userData = await getUserInfo(params.username);
    return (
        <div className="w-full mt-28">
            {userData && <ProfileInfo user={userData} />}
            <UserPhotoTabs
                total_photos={userData?.total_photos || 0}
                total_likes={userData?.total_likes || 0}
                total_collections={userData?.total_collections || 0}
            />

            <UserPhotoContainer />
        </div>
    );
}
