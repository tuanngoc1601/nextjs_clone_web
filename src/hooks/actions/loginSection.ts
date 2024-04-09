"use server"

import { loginUser } from "@/api/unsplash"

export async function handleLoginServer(code: string) {
    const response = await loginUser(code);
    const result = await response.json();

    return result;
}