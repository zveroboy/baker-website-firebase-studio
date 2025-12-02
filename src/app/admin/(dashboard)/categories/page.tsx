import { CategoryAdminClient } from "@/modules/categories/components/CategoryAdminClient";
import { getCategoriesAction } from "@/modules/categories/actions";

export default async function CategoriesAdminPage() {
  const categories = await getCategoriesAction();

  return <CategoryAdminClient categories={categories} />;
}
