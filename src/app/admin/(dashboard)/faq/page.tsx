import { FaqAdminClient, getFaqsAction } from "@/modules/faq";

export default async function FaqAdminPage() {
  const faqs = await getFaqsAction();

  return <FaqAdminClient initialFaqs={faqs} />;
}
