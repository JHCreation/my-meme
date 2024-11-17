import { Input as MTInput, InputProps as MTInputProps} from "@material-tailwind/react";

// export interface InputProps extends Omit<MTInputProps, 'size'> {
//   size?: 'sm'|'md'|'lg'
// }

export interface InputProps extends Omit<React.ComponentPropsWithRef<typeof MTInput>, 'size'> {
  size?: 'sm'|'md'|'lg'
}

const labelClass= "peer-placeholder-shown:!leading-[3.5] peer-focus:!leading-[1.25] text-[11px] peer-focus:!text-[11px] peer-focus:top-[-0.38rem] peer-placeholder-shown:!text-[13px]"
const containerClass= "!min-w-0 h-8"
const inputClass= "text-xs"
export const Input = ({size, ...props}: InputProps) => {
  console.log(props)
  const is_sm= size == "sm"
  return (
    <MTInput
      size="md"
      labelProps={{ 
        className: is_sm ? labelClass : "",
      }}
      containerProps={{className: is_sm ? containerClass : "!min-w-0"}}
      className={`relative ${is_sm ? inputClass : ''}`}
      {...props}
    />
  )
}