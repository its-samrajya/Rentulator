"use client";
import { generateAllInvoice } from "@/actions/generateAllInvoice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

const GenerateButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      className={cn(
        "cursor-pointer text-base bg-primary",
        isPending && "bg-gray-400 hover:bg-gray-500",
      )}
      size="lg"
      onClick={() =>
        startTransition(() => {
          generateAllInvoice();
        })
      }
    >
      {isPending ? "Generating..." : "Generate All invoice"}
    </Button>
  );
};
export default GenerateButton;
