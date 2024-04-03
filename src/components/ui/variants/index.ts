import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "p-4 rounded-md font-semibold hover:opacity-70 active:scale-95 inline-flex items-center",
  {
    variants: {
      variant: {
        primary: "bg-indigo-500 border-indigo-900 border-2 text-white",
        secondary: "bg-gray-500 border-gray-900 border-2 text-white",
      },
    },
    defaultVariants: {
      variant: "primary"
    },
  },
)

export { buttonVariants }