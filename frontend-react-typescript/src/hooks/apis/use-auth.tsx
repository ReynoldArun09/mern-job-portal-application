import * as React from "react";
import { AuthContext } from "../../context/auth-provider";
export default function UseAuth() {
  const context = React.use(AuthContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { isAuthFetching, user } = context;

  return {
    isAuthFetching,
    user,
  };
}
