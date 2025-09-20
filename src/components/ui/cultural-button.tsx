import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const culturalButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        heritage: "bg-gradient-primary text-primary-foreground shadow-cultural hover:shadow-heritage animate-heritage-glow",
        festival: "bg-gradient-saffron text-accent-foreground shadow-festival animate-festival-pulse hover:scale-105 transition-transform",
        cultural: "bg-heritage text-heritage-foreground border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground shadow-heritage",
        artisan: "bg-card text-card-foreground border border-border hover:bg-muted shadow-heritage",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CulturalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof culturalButtonVariants> {
  asChild?: boolean
}

const CulturalButton = React.forwardRef<HTMLButtonElement, CulturalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(culturalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CulturalButton.displayName = "CulturalButton"

export { CulturalButton, culturalButtonVariants }