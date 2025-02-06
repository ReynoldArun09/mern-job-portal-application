import Head from "@/utils/seo/head";
import SigninForm from "@/components/web/auth/forms/signin-form";

export default function SignupPage() {
  return (
    <>
      <Head title="Sign in" description="job portal application, sign in page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <SigninForm />
      </section>
    </>
  );
}
