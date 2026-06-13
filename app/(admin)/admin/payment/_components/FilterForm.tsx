import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";

const FilterForm = () => {
  return (
    <div>
      <Button
        variant="secondary"
        className="text-base cursor-pointer"
        size="lg"
      >
        <Funnel />
        Filter
      </Button>
    </div>
  );
};

export default FilterForm;
