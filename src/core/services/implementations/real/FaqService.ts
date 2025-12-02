import { injectable } from "inversify";
import { IFaqService } from "../../interfaces";
import { prisma } from "@/lib/db";
import { Faq } from "@prisma/client";

@injectable()
export class RealFaqService implements IFaqService {
    async getFaqs(): Promise<Faq[]> {
        return await prisma.faq.findMany({
            orderBy: { order: 'asc' }
        });
    }

    async getFaqById(id: string): Promise<Faq | null> {
        return await prisma.faq.findUnique({
            where: { id }
        });
    }

    async createFaq(data: Omit<Faq, "id" | "createdAt" | "updatedAt">): Promise<Faq> {
        return await prisma.faq.create({
            data
        });
    }

    async updateFaq(id: string, data: Partial<Faq>): Promise<Faq> {
        return await prisma.faq.update({
            where: { id },
            data
        });
    }

    async deleteFaq(id: string): Promise<void> {
        await prisma.faq.delete({
            where: { id }
        });
    }

    async reorderFaqs(items: { id: string; order: number }[]): Promise<void> {
        // Use transaction for atomicity
        await prisma.$transaction(
            items.map(item => 
                prisma.faq.update({
                    where: { id: item.id },
                    data: { order: item.order }
                })
            )
        );
    }
}

