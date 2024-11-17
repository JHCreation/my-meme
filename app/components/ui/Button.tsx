
// import { Button } from "@material-tailwind/react";
// import { Button as MTButton } from "@material-tailwind/react";
import MaterialTailwind from "@material-tailwind/react";
const { Button:MTButton } = MaterialTailwind;
// import { Button as MTButtons } from "@material-tailwind/react";
// import Button from "./";
import { ComponentProps } from "react";
import { color } from "@material-tailwind/react/types/components/button";



/* declare module '@material-tailwind/react' {
  interface ButtonPropsColorOverrides {
    color?: color | "main";
  }
  
} */
/* interface ExButtonProps extends Omit<ComponentProps<typeof MTButton>, 'color'> {
  color?: color | "main"
}
declare const Button: React.ForwardRefExoticComponent<ExButtonProps> */

export const Button = ({ children, className, size, variant, color, ...props }: 
  React.ComponentPropsWithoutRef<typeof MTButton> ) => {
  return(
    <MTButton
      variant={variant}
      size={size}
      color={color || 'black'}
      {...props}
      className={`hover:shadow-none shadow-none ${color ? '': (variant == "filled" ? 'bg-main' : '')} ${className}`}
    >{children}</MTButton>
  )
}

export default Button;