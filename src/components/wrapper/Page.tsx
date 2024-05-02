import React, { forwardRef, ReactNode, HTMLAttributes } from "react";

// next
import Head from "next/head";

// material-ui
import { Box } from "@mui/material";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  meta?: ReactNode;
  title?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Head>
        <title>{`${title} - SAT NUSA PERSADA`}</title>
        {meta}
      </Head>
      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

Page.displayName = "Page";

export default Page;
