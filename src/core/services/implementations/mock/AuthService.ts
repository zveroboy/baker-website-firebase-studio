import { injectable } from "inversify";
import { IAuthService } from "../../interfaces";
import { User } from "@prisma/client";

@injectable()
export class MockAuthService implements IAuthService {
    async getCurrentSession(): Promise<{ user: User; session: any } | null> {
        // Always return a mock admin user
        const mockUser: User = {
            id: "mock-admin-id",
            name: "Mock Admin",
            email: "admin@example.com",
            emailVerified: true,
            image: null,
            role: "admin",
            banned: false,
            banReason: null,
            banExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const mockSession = {
            id: "mock-session-id",
            userId: mockUser.id,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            token: "mock-token",
            createdAt: new Date(),
            updatedAt: new Date(),
            ipAddress: "127.0.0.1",
            userAgent: "Mock Agent"
        };

        return { user: mockUser, session: mockSession };
    }
}

