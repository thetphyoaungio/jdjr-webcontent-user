"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <ProgressBar
        height="4px"
        color="#FEC900"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </NextThemesProvider>
  );
}
