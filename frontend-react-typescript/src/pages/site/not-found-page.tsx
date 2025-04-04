import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Head from "../../utils/seo/head";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      if (location.state && location.state?.from) {
        navigate(location.state?.from);
      } else {
        navigate("/");
      }
    }, 1000);
  }, [location.state, location.state?.from, navigate]);

  return (
    <>
      <Head title="Page Not Found" description="job portal application, 404 page" />
      <section className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold sm:text-xl md:text-2xl lg:text-4xl">Page Not Found</h1>
      </section>
    </>
  );
}
