import BreadCrumbs from "@/components/common/bread-crumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore";
import { useJobStore } from "@/stores/useJobStore";
import Head from "@/utils/seo/head";
import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DescriptionPage() {
  const { GetSingleJob, singleJob, ApplyJob } = useJobStore();
  const { user } = useAuthStore();
  const userId = user?._id;
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;
    GetSingleJob(id);
  }, [GetSingleJob, id]);

  const isApplied = singleJob?.applications.some((application) => application.applicant === userId) || false;

  const handleSubmit = () => {
    if (!id) return;
    if (isApplied) return;
    if (user?.role === "recruiter") {
      toast.error("Recruiter cannot apply for job.");
      return;
    }
    ApplyJob(id);
  };

  return (
    <>
      <Head title="Description Page" description="job portal application, Description page" />
      <BreadCrumbs />
      <section className="min-h-[70vh] py-5">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold tracking-wider">{singleJob?.title}</h1>
                </div>
                <div className="space-x-2.5">
                  <Badge variant="outline" className="shrink-0">
                    {singleJob?.position} Position
                  </Badge>
                  <Badge variant="outline" className="shrink-0">
                    {singleJob?.jobType}
                  </Badge>
                </div>
              </div>
              <div>
                {user && (
                  <Button disabled={isApplied} className="bg-purple-600 text-white" onClick={handleSubmit}>
                    {isApplied ? "Applied" : "Apply Now"}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-md py-2.5 font-bold">Job Description</h2>
            <div className="flex flex-col space-y-2.5 w-fit">
              <div>
                <Badge variant="outline" className="shrink-0 py-1">
                  Company Name: {singleJob?.company.name}
                </Badge>
              </div>
              <div className="flex gap-4">
                <Badge variant="outline" className="shrink-0 py-1">
                  {singleJob?.description}
                </Badge>
                <Badge variant="outline" className="shrink-0 py-1">
                  Location : {singleJob?.location}
                </Badge>
              </div>
              <div className="flex gap-4">
                <Badge variant="outline" className="shrink-0 py-1">
                  Salary : {singleJob?.salary}
                </Badge>
              </div>
              <div className="flex gap-4">
                {singleJob?.requirements.map((req) => (
                  <Badge key={req}>{req}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
