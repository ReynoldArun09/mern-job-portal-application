import { Label } from "@/components/ui/label";
import { filterData } from "@/constants";
import { useJobStore } from "@/stores/useJobStore";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function FilterJobCard() {
  const { SetSearchQuery } = useJobStore();
  const [selectedValue, setSelectedValue] = React.useState("");

  React.useEffect(() => {
    SetSearchQuery(selectedValue);
  }, [SetSearchQuery, selectedValue]);

  return (
    <section>
      <h1 className="text-blue-600 font-bold text-xl tracking-widest py-3">Filter jobs</h1>
      <div>
        <RadioGroup value={selectedValue} onValueChange={(value) => setSelectedValue(value)}>
          {filterData.map((data, index) => (
            <div key={index}>
              <h2 className="tracking-wide font-bold underline py-2">{data?.fitlerType}</h2>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2 my-2" key={idx}>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </section>
  );
}
