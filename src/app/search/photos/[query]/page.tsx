import SearchPhotoContainer from "@/components/SearchPhotoContainer";
import SearchTab from "@/components/SearchTab";

export default function SearchPhotos({
    params,
}: {
    params: {
        query: string;
    };
}) {
    return (
        <div className="w-full mt-3">
            <SearchTab />
            <SearchPhotoContainer />
        </div>
    );
}
