import { FaqAccordion, getFaqsAction } from "@/modules/faq";

export const revalidate = 3600; // Revalidate every hour or handle via On-Demand Revalidation

export default async function FaqPage() {
  const faqs = await getFaqsAction();

  return (
    <div className="container py-12 lg:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline">Часто задаваемые вопросы</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Здесь вы найдете ответы на популярные вопросы о заказах, доставке и моей продукции.
          </p>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
