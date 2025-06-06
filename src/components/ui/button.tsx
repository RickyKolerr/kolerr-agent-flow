
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-pink text-white hover:bg-brand-pink/90 shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline: "border border-input bg-background hover:bg-brand-pink/10 hover:text-brand-pink shadow-sm",
        secondary: "bg-brand-navy text-white hover:bg-brand-navy/80 shadow-md",
        ghost: "hover:bg-brand-pink/10 hover:text-brand-pink",
        link: "text-brand-pink underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to text-white hover:opacity-90 shadow-md",
        save: "bg-brand-navy border border-brand-pink text-white hover:bg-brand-navy/90 shadow-md",
        purple: "bg-brand-purple text-white hover:bg-brand-purple/90 shadow-md",
        magenta: "bg-brand-magenta text-white hover:bg-brand-magenta/90 shadow-md",
        lavender: "bg-brand-lavender text-white hover:bg-brand-lavender/90 shadow-md",
        fuchsia: "bg-brand-fuchsia text-white hover:bg-brand-fuchsia/90 shadow-md",
        teal: "bg-brand-teal text-white hover:bg-brand-teal/90 shadow-md"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
