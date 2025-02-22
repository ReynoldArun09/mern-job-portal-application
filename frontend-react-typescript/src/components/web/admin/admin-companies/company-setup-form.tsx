import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanySchema, CompanySchemaType } from "@/validations/company-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAdminStore } from "@/stores/useAdminStore";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CompanySetupForm() {
  const navigate = useNavigate();
  const { FetchCompanyById, singleCompanyData, isFetching, UpdateCompany } = useAdminStore();
  const [logo, setLogo] = useState("");
  const { id } = useParams<{ id: string }>();
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    location: "",
    description: "",
    website: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanySchemaType>({
    resolver: zodResolver(CompanySchema),
  });

  useEffect(() => {
    if (singleCompanyData) {
      setCompanyDetails({
        name: singleCompanyData?.name || "",
        location: singleCompanyData?.location || "",
        description: singleCompanyData?.description || "",
        website: singleCompanyData?.website || "",
      });
    }
  }, [singleCompanyData]);

  useEffect(() => {
    if (!id) return;
    FetchCompanyById(id);
  }, [FetchCompanyById, id]);

  useEffect(() => {
    if (companyDetails) {
      reset(companyDetails);
    }
  }, [companyDetails, reset]);

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<CompanySchemaType> = async (values: CompanySchemaType) => {
    if (!id) return;
    const Inputvalues = {
      name: values.name,
      location: values.location,
      description: values.description,
      website: values.website,
      logo,
    };
    try {
      const result = await UpdateCompany(id, Inputvalues);
      toast.success(`Company ${result.name} sucessfully updated!!!`);
      navigate("/admin/companies");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
      toast.error("Something went wrong while updating company details");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-5 p-8">
        <Button
          onClick={() => navigate("/admin/companies")}
          variant="outline"
          className="flex items-center gap-2 text-gray-500 font-semibold"
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <h1 className="font-bold text-xl">Company Setup</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Company Name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label>Description</Label>
          <Input type="text" {...register("description")} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label>Website</Label>
          <Input type="text" {...register("website")} />
          {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
        </div>
        <div>
          <Label>Location</Label>
          <Input type="text" {...register("location")} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <Label>Logo</Label>
          <Input type="file" accept="image/*" onChange={changeFileHandler} />
        </div>
      </div>
      {isFetching ? (
        <Button className="w-full my-4">
          {" "}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4">
          Update
        </Button>
      )}
    </form>
  );
}
