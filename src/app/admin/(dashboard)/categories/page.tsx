import { CategoryAdminClient, getCategoriesAction } from "@/modules/categories";

export default async function CategoriesAdminPage() {
  const categories = await getCategoriesAction();

  return <CategoryAdminClient categories={categories} />;
}
