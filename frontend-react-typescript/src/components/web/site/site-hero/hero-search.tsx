import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSearchQuery from "@/hooks/useSearchQuery";

export default function HeroSearch() {
  const { search, setSearch } = useSearchQuery();
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/browse?search=${search}`);
  };

  return (
    <div className="flex lg:w-2/5 border items-center rounded-full mx-auto">
      <Input
        placeholder="Search jobs by title, company or keywords"
        className="outline-none border-none w-full px-6 focus-visible:ring-0"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        size={"lg"}
        className="rounded-r-full bg-purple-600 hover:bg-purple-700 text-white"
        onClick={handleSubmit}
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
