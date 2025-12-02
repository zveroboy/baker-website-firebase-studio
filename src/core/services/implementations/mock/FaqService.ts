import { injectable } from "inversify";
import { IFaqService } from "../../interfaces";
import { Faq } from "@prisma/client";

@injectable()
export class MockFaqService implements IFaqService {
    private faqs: Faq[] = [
        {
            id: "mock-faq-1",
            question: "Как заказать торт?",
            answer: "Выберите торт в каталоге и заполните форму заказа.",
            order: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "mock-faq-2",
            question: "Есть ли доставка?",
            answer: "Да, мы доставляем по Москве и МО.",
            order: 200,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    async getFaqs(): Promise<Faq[]> {
        return this.faqs.sort((a, b) => a.order - b.order);
    }

    async getFaqById(id: string): Promise<Faq | null> {
        return this.faqs.find(f => f.id === id) || null;
    }

    async createFaq(data: Omit<Faq, "id" | "createdAt" | "updatedAt">): Promise<Faq> {
        const newFaq: Faq = {
            ...data,
            id: `mock-faq-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.faqs.push(newFaq);
        return newFaq;
    }

    async updateFaq(id: string, data: Partial<Faq>): Promise<Faq> {
        const index = this.faqs.findIndex(f => f.id === id);
        if (index === -1) throw new Error("FAQ not found");

        this.faqs[index] = { ...this.faqs[index], ...data, updatedAt: new Date() };
        return this.faqs[index];
    }

    async deleteFaq(id: string): Promise<void> {
        this.faqs = this.faqs.filter(f => f.id !== id);
    }

    async reorderFaqs(items: { id: string; order: number }[]): Promise<void> {
        items.forEach(item => {
            const faq = this.faqs.find(f => f.id === item.id);
            if (faq) {
                faq.order = item.order;
            }
        });
    }
}

