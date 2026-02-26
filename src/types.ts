import type { ReactNode } from "react";

export type Route = {
    path: string;
    requiresUser: boolean;
    element: () => ReactNode;
}