import { injectable } from "inversify";
import { IUserService } from "../../interfaces";
import { User } from "@prisma/client";
import { prisma } from "@/lib/db";

@injectable()
export class RealUserService implements IUserService {
    async getProfile(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async updateProfile(id: string, data: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        });
    }
}

