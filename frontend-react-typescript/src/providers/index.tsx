import ErrorFallback from "@/components/common/error-fallback";
import LoadingSpinner from "@/components/common/loading-spinner";
import { ThemeProvider } from "@/context/theme-provider";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import AuthProvider from "../context/auth-provider";
import { NuqsAdapter } from "nuqs/adapters/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <HelmetProvider>
          <NuqsAdapter>
            <AuthProvider>
              <ThemeProvider defaultTheme="dark">
                {children}
                <Toaster richColors />
              </ThemeProvider>
            </AuthProvider>
          </NuqsAdapter>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
