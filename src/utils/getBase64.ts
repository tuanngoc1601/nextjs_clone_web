import { Photo } from "@/lib/types";

export async function getBase64(imageUrl: string) {
    try {
        const base64str = await fetch(imageUrl).then(async (res) =>
            Buffer.from(await res.arrayBuffer()).toString("base64")
        );

        const blurSvg = `
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
                <filter id='b' color-interpolation-filters='sRGB'>
                    <feGaussianBlur stdDeviation='1' />
                </filter>

                <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
                href='data:image/avif;base64,${base64str}' />
            </svg>
        `;

        const toBase64 = (str: string) =>
            typeof window === "undefined"
                ? Buffer.from(str).toString("base64")
                : window.btoa(str);

        return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
    } catch (err) {
        console.log(err);
    }
}

export async function getDataWithBlurUrl(data: Photo[]) {
    const resources = await Promise.all(
        data.map(async (photo) => ({
            ...photo,
            blurHash: await getBase64(photo.urls?.small),
        }))
    );

    return resources;
}
