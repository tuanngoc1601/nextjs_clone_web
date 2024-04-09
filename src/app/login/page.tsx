import { loginUser } from "@/api/unsplash";
import LoginButton from "@/components/buttons/ButtonLogin";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: { code: string };
}) {
    const response = await loginUser(searchParams.code);

    return (
        <div className="w-full min-h-screen flex flex-row item-center justify-center">
            <LoginButton accessToken={response.access_token} />
        </div>
    );
}
