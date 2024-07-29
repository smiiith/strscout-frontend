"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { ReactNode } from "react"
import ts from "typescript"

export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: ReactNode }) {
    // @ts-ignore
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
