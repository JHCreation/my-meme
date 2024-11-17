import React from "react";
// import "styled-components";
import { Select, SelectSizeStylesType, SelectStatesStylesType } from "@material-tailwind/react";


declare module "@material-tailwind/react/types/components/select" {
  // type size = "sm" | "md" | "lg";
  // export type propTypesSize = size
  /* export interface SelectProps {
    size?: string;
    why: 'why';
  } */
}

declare module "@material-tailwind/react/components/Select" {
  interface SelectProps {
    // size?: "sm" | "md" | "lg" |"why"
    why?: "why"
  }
}