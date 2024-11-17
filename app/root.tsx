import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { MetaFunction } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react";
import dotenv from "dotenv";
import path from "path";



export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Remix",
        url: "https://remix.run",
      },
    },
  ];
};

export async function loader() {
  const env = process.env.NODE_ENV;
  console.log(env, 'url', process.env.PUBLIC_API_URL)
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}.local`) });
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
  dotenv.config(); // 기본 .env 파일
  return json({
    ENV: {
      SOME_SECRET: process.env.SOME_SECRET,
      PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    },
  });
}


export default function Layout({ children }: { children: React.ReactNode }) {
  const env = useLoaderData<typeof loader>();
  console.log(env, 'envenv')

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  console.log('app start!')

  return (
    <QueryClientProvider client={queryClient}>

    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* {children} */}
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              env.ENV
            )}`,
          }}
        />
        <Scripts />
      </body>
    </html>
    </QueryClientProvider>
  );
}

/* export default function App() {
  // return <Outlet />;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  console.log('app start!')

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
} */

