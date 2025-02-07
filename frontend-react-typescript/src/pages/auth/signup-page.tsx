import SignupForm from "@/components/web/auth/signup-form";
import Head from "@/utils/seo/head";

export default function SignupPage() {
  return (
    <>
      <Head title="Sign up" description="job portal application, signup page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <SignupForm />
      </section>
    </>
  );
}
