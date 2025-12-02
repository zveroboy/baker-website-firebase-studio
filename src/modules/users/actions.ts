"use server";

import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { IUserService } from "@/core/services/interfaces";
import { updateProfileSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { User } from "@prisma/client";

// Helper to get service
const getUserService = () => container.get<IUserService>(TYPES.UserService);

export async function getProfileAction(): Promise<User | null> {
    const service = getUserService();
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) return null;

    // In mock mode, we might not find the real user ID in the mock store
    // so we might want to return the session user if service fails, or handle it gracefully.
    // But strictly speaking, we should ask the service.
    return await service.getProfile(session.user.id);
}

export async function updateProfileAction(data: unknown) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return { error: "Unauthorized" };
    }

    const result = updateProfileSchema.safeParse(data);
    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const service = getUserService();
    try {
        await service.updateProfile(session.user.id, result.data);
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { error: "Failed to update profile" };
    }
}

