import { injectable } from "inversify";
import { IUserService } from "../../interfaces";
import { User } from "@prisma/client";

@injectable()
export class MockUserService implements IUserService {
    private users: User[] = [
        {
            id: "mock-user-1",
            name: "Admin User",
            email: "admin@example.com",
            emailVerified: true,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: "admin",
            banned: false,
            banReason: null,
            banExpires: null
        }
    ];

    async getProfile(id: string): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }

    async updateProfile(id: string, data: Partial<User>): Promise<User> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) throw new Error("User not found");

        this.users[index] = { ...this.users[index], ...data, updatedAt: new Date() };
        return this.users[index];
    }
}

