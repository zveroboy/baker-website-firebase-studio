import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import type { Faq } from "@prisma/client";
  
  interface FaqAccordionProps {
    faqs: Faq[];
  }
  
  export function FaqAccordion({ faqs }: FaqAccordionProps) {
    if (faqs.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
          Вопросов пока нет.
        </div>
      );
    }
  
    return (
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-wrap">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

