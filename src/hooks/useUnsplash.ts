import { getPhotos } from "@/api/apiRequest";
import { useQuery } from "react-query";

const staleTime = 1000 * 60 * 60 * 2;

// export const useGetPhotos = ({ per_page }: { per_page: string }) =>
//     useQuery(per_page, () => getPhotos({ per_page }), {
//         staleTime,
//     });
