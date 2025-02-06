import { getCategories } from "@/actions/categoryActions";
import { CategoryBar } from "./category-bar";
import { Navbar } from "./navbar";

export async function Header() {
  const allCategories = await getCategories();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <Navbar />
      {/* <SearchBar /> */}
      <div>
        <CategoryBar categories={allCategories} />
      </div>
    </header>
  );
}
