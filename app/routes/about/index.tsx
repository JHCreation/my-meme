import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = ( parent ) => {
  // console.log(parent)
  return [
    { title: "리믹스 앱 - About" },
    { name: "description", content: "리믹스의 어바웃 페이지" },
    
  ];
};

export default function About () {
  return <div className="">test</div>
}