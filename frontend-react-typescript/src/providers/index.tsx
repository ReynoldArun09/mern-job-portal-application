import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "../context/theme-provider";
import ErrorFallback from "../components/common/error-fallback";
import TopLoader from "../components/common/top-loader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<TopLoader />}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark">
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
