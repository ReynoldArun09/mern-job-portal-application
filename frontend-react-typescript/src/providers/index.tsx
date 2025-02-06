import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "../context/theme-provider";
import ErrorFallback from "../components/common/error-fallback";
import TopLoader from "../components/common/top-loader";
import AuthProvider from "../context/auth-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<TopLoader />}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <HelmetProvider>
          <AuthProvider>
            <ThemeProvider defaultTheme="dark">
              {children}
              <Toaster richColors />
            </ThemeProvider>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
