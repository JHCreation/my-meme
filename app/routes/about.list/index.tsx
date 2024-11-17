import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";




/* export const loader = async ({
  context,
}: LoaderFunctionArgs) => {
  console.log(context);
  return '';
};
 */

export default function AboutList () {
  
  
  return <div className="">
    <span className="text-orange-200">No list.......</span>
    <Outlet />
    <p className="underline">
      <Link to={'test'}>test</Link>
    </p>

  </div>
}