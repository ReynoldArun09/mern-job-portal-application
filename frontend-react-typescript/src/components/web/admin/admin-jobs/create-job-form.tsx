import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminStore } from "@/stores/useAdminStore";
import { JobSchema, JobSchemaType } from "@/validations/job-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateJobForm() {
  const navigate = useNavigate();
  const { isFetching } = useAdminStore();
  const {
    register,
    handleSubmit,
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
      companyId: "",
      createdBy: "",
    },
  });

  const onSubmit: SubmitHandler<JobSchemaType> = (values: JobSchemaType) => {
    // (values);
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
        <h1 className="font-bold text-xl">Create Job</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Job Title</Label>
          <Input type="text" {...register("title")} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Label>Description</Label>
          <Input type="text" {...register("description")} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <Label>Salary</Label>
          <Input type="text" {...register("salary")} />
          {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
        </div>
        <div>
          <Label>Location</Label>
          <Input type="text" {...register("location")} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <Label>Experience Level</Label>
          <Input type="text" {...register("experienceLevel")} />
          {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>}
        </div>
        <div>
          <Label>Job Type</Label>
          <Input type="text" {...register("jobType")} />
          {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
        </div>
        <div>
          <Label>Position</Label>
          <Input type="text" {...register("position")} />
          {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
        </div>
      </div>
      {isFetching ? (
        <Button className="w-full my-4">
          {" "}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4">
          Create
        </Button>
      )}
    </form>
  );
}
