import { getCategories } from "@/actions/categoryActions";
import { CategoryBar } from "./category-bar";
import { Navbar } from "./navbar";
import { SearchBar } from "./search-bar";

export async function Header() {
  const allCategories = await getCategories();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <Navbar />
      <SearchBar />
      <CategoryBar categories={allCategories} />
    </header>
  );
}
