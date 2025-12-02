import { injectable } from "inversify";
import { IAuthService } from "../../interfaces";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { User } from "@prisma/client";

@injectable()
export class RealAuthService implements IAuthService {
    async getCurrentSession(): Promise<{ user: User; session: any } | null> {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        
        if (!session) return null;

        return {
            user: session.user as unknown as User, // Type assertion might be needed if Better Auth types mismatch Prisma types slightly
            session: session.session
        };
    }
}

