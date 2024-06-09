"use client"

import {
    QueryClient,
    QueryClientProvider,

} from "@tanstack/react-query"
import { useState } from "react"


export const QueryProvider = ({
    children
} : {
    children : React.ReactNode
}) => {
    const [QC] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={QC}>{children}</QueryClientProvider>
    )
}