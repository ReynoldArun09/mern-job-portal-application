import * as React from "react";
import { ThemeProviderContext } from "../context/theme-provider";

export default function useTheme() {
  const context = React.useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
}
