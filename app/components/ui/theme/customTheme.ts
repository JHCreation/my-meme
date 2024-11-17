import { theme_select } from "./select";

export const customTheme = {
  dialog: {
    defaultProps: {
      size: "md",
    },
    valid: {
      sizes: ["xs", "sm", "md", "lg", "xl", "xxl", "cs"],
    },
    styles: {
      base: {
        backdrop: {
          overflow: 'overflow-y-auto',
          // transitionDuration: 'duration-[2000ms]',
        },
      },
      sizes: {
        cs: {
          display: "flex",
          flexDirection: "flex-col",
          width: "w-screen",
          minWidth: "min-w-[100vw]",
          maxWidth: "max-w-[100vw]",
          height: "h-screen",
          minHeight: "min-h-[100vh]",
          maxHeight: "max-h-[100vh]",
          m: "m-0",
          borderRadius: "rounded-none",
        },
      }
    }
  },

  button: {
    defaultProps: {
      variant: "filled",
      size: "md",
      color: "main",
      fullWidth: false,
      ripple: true,
      className: "",
    },
    valid: {
      variants: ["filled", "outlined", "gradient", "text"],
      sizes: ["sm", "md", "lg"],
      colors: [
        "main"
      ]
    },
    styles: {
      sizes: {
        sm: {
          fontSize: "text-xs",
          py: "py-2",
          px: "px-4",
          borderRadius: "rounded-lg",
        },
        md: {
          fontSize: "text-xs",
          py: "py-3",
          px: "px-6",
          borderRadius: "rounded-lg",
          
        },
        lg: {
          fontSize: "text-sm",
          py: "py-3.5",
          px: "px-7",
          borderRadius: "rounded-lg",
        },
        
      },
      variants: {
        filled: {
          main: {
            backgroud: "bg-main",
            color: "text-white",
            shadow: "shadow-md shadow-blue-gray-500/10",
            hover: "hover:shadow-lg hover:shadow-blue-gray-500/20",
            focus: "focus:opacity-[0.85] focus:shadow-none",
            active: "active:opacity-[0.85] active:shadow-none",
          },
        }
      }
    }
  },
  // select: theme_select
}