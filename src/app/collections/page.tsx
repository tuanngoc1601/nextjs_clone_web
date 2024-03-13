import React from 'react';
import CollectionContainer from "@/components/CollectionContainer";

export default function CollectionPage() {

    return (
        <div className="w-full px-5 mt-28 flex flex-col">
            <div className="flex flex-col items-start justify-center gap-2">
                <h1 className="text-5xl text-textSecondary font-bold">
                    Collections
                </h1>
                <p className="text-lg text-textSecondary leading-7 mt-3">
                    Explore the world through collections of beautiful photos
                    free to use under
                    <br />
                    the{" "}
                    <a className="text-textPrimary underline cursor-pointer hover:text-textSecondary">
                        Unsplash License
                    </a>
                    .
                </p>
            </div>
            <CollectionContainer />
        </div>
    );
}
