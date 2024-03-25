import SearchCollectionContainer from "@/components/SearchCollectionContainer";
import SearchTab from "@/components/SearchTab";

export default function SearchCollections({
    params,
}: {
    params: {
        query: string;
    };
}) {
    return (
        <div className="w-full mt-3">
            <SearchTab />
            <SearchCollectionContainer />
        </div>
    );
}
