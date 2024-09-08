"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function VendorSearchGrid(props: {}) {
  const { data, total, nextPage, prevPage, isPrevPageAvailable, isNextPageAvailable } = useVendorSearch();

  return (
    <section className="container w-full py-8">
      <div className="grid grid-cols-1 gap-2 pb-8 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        {data.map((item) => (
          <Card key={item.id} className="p-4">
            {item.details}
          </Card>
        ))}
      </div>

      <div className="flex w-full items-center justify-between sm:justify-around">
        <Button onClick={prevPage} disabled={!isPrevPageAvailable} className="block">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>

        <div className="font-semibold">{`${total} results found`}</div>

        <Button onClick={nextPage} disabled={!isNextPageAvailable} className="block">
          <ArrowRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </section>
  );
}
