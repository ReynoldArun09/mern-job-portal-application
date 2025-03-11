import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { JobSchema, JobSchemaType } from "@/validations/job-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

export default function CreateJobForm() {
  const navigate = useNavigate();
  const { isFetching, CreateJob, adminCompaniesData, GetAdminCompanies } = useAdminStore();
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobSchemaType>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      description: "",
      position: 0,
      salary: 0,
      location: "",
      experienceLevel: 0,
      jobType: "",
      requirements: [{ item: "" }],
      companyId: "",
    },
  });

  useEffect(() => {
    if (adminCompaniesData && adminCompaniesData?.length === 0) {
      GetAdminCompanies();
    }
    return;
  }, [GetAdminCompanies, adminCompaniesData]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
  });

  const onSubmit: SubmitHandler<JobSchemaType> = async (values: JobSchemaType) => {
    const InputValues = {
      ...values,
      position: values.position || 1,
      salary: values.salary || 1,
      experienceLevel: values.experienceLevel || 1,
      createdBy: user?._id,
    };

    try {
      const result = await CreateJob(InputValues);
      toast.success(result.message);
      navigate("/admin/jobs");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
      toast.error("Something went wrong while creating job");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Job Title</Label>
          <Input type="text" {...register("title")} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label>Description</Label>
          <Input type="text" {...register("description")} placeholder="description..." />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label>Salary</Label>
          <Input type="number" {...register("salary")} />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
        </div>
        <div>
          <Label>Location</Label>
          <Input type="text" {...register("location")} placeholder="location..." />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <Label>Experience Level</Label>
          <Input type="number" {...register("experienceLevel")} />
          {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>}
        </div>
        <div>
          <Label>Job Type</Label>
          <Input type="text" {...register("jobType")} placeholder="ex: full time, part time.." />
          {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
        </div>
        <div>
          <Label>Position</Label>
          <Input type="number" {...register("position")} />
          {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
        </div>
      </div>
      <div>
        <Label>Company</Label>
        <Controller
          name="companyId" // Bind to companyId in form state
          control={control} // Connect Controller to the form control
          defaultValue="" // Set default value for companyId
          render={({ field }) => (
            <Select {...field} onValueChange={field.onChange}>
              {" "}
              {/* Bind value change to form state */}
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Companies</SelectLabel>
                  {adminCompaniesData?.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.companyId && <p className="text-red-500 text-sm">{errors.companyId.message}</p>}
      </div>
      <div className="py-5">
        <Label>Requirements</Label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 mb-2">
            <Input type="text" placeholder={`Requirements ${index + 1}`} {...register(`requirements.${index}.item`)} />
            <Button type="button" onClick={() => remove(index)} className="text-red-500">
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ item: "" })} className="mt-2">
          Add Requirement
        </Button>
      </div>

      <Button type="submit" disabled={isFetching} className="w-full my-4">
        Submit
      </Button>
    </form>
  );
}
