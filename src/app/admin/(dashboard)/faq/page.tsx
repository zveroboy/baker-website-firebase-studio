import { FaqAdminClient } from "@/modules/faq/components/FaqAdminClient";
import { getFaqsAction } from "@/modules/faq/actions";

export default async function FaqAdminPage() {
  const faqs = await getFaqsAction();

  return <FaqAdminClient initialFaqs={faqs} />;
}
