import SigninForm from "@/components/web/auth/signin-form";
import Head from "@/utils/seo/head";

export default function SigninPage() {
  return (
    <>
      <Head title="Sign in" description="job portal application, signin page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <SigninForm />
      </section>
    </>
  );
}
