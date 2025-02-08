import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useAdminStore } from "../../stores/useAdminStore";

export default function CreateCompanyPage() {
  const [companyName, setCompanyName] = useState("");

  const { CreateCompany } = useAdminStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CreateCompany(companyName);
  };

  return (
    <section className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-[600px]">
        <CardHeader className="space-y-5">
          <CardTitle className="text-3xl font-bold text-center">Create Your Company</CardTitle>
          <CardDescription className="text-md">What would you like to give your company name? you can change this later.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <Label className="font-bold">Company Name</Label>
            <Input placeholder="facebook, microsoft, linkedin" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <div className="flex items-center gap-5">
              <Button className="w-full" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
