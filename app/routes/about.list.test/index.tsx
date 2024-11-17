import { json, Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import queryOptions from '~/api/category/queryOption';


import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "@material-tailwind/react";
// import pkg from '@material-tailwind/react';
// const {Button} = pkg;
// import Button from "~/components/ui/Button";


const query= (page,size)=> queryOptions.list(page, size)
const getParams= ({searchParams})=> {
  const page= searchParams.get("page");
  const size= searchParams.get("size");
  const pageVal= Number(page) || 1;
  const sizeVal= Number(size) || 10;
  return { page: pageVal, size: sizeVal }
}

export async function loader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const { page, size }= getParams({ searchParams: url.searchParams })

  const queryClient = new QueryClient()
  const { queryKey, queryFn }= query(page, size);
  await queryClient.prefetchQuery({ 
    queryKey, queryFn,
    // staleTime: 5000, 
  } );

  return json({ dehydratedState: dehydrate(queryClient) })
}

function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, size }= getParams({ searchParams: searchParams })
  const { queryKey, queryFn }= query(page, size);
  const { data } = useQuery({ queryKey, queryFn })
  console.log(data, 'server?? client??')

  return <div className="">
    <Button>test</Button>
    <span className="text-orange-800">test list.......</span>
    {
      data && 
      <ul className="text-2xs">
      {
        data.category_list.map(d=>{
          return (
            <div key={d.id} className="text-red-200">{d.name}-test</div>
          )
        })
      }
      </ul>
    }
    <Outlet />

  </div>
}

export default function PostsRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>()
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}


/* export const loader = async () => {
  const { SOME_SECRET, REMIX_API_URL }= process.env;
  const res= await fetch(`${REMIX_API_URL}/api/category/list-all`, {
    method: 'get',
    
    // content_type: 'application/json'
  })
  const data= await res.json()
  // const secret= process.env.SOME_SECRET;
  // const data = await getUsers();
  // console.log(data)
  return data;

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return json({ dehydratedState: dehydrate(queryClient) })
  
  // return { SOME_SECRET, REMIX_API_URL }
};

export default function AboutList () {
  const data = useLoaderData<any>();
  console.log(data, 'server?? client??')
  return <div className="">
    <span className="text-orange-800">test list.......</span>
    {
      data && 
      <ul className="text-2xs">
      {
        data.category_list.map(d=>{
          return (
            <div key={d.id} className="text-red-200">{d.name}-test</div>
          )
        })
      }
      </ul>
    }
    <Outlet />

  </div>
} */