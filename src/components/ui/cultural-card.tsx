import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const culturalCardVariants = cva(
  "rounded-lg border text-card-foreground shadow-heritage transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card",
        heritage: "bg-gradient-heritage border-primary/20 shadow-cultural hover:shadow-festival",
        artisan: "bg-card pattern-heritage border-muted hover:border-primary/30",
        festival: "bg-gradient-saffron border-accent/30 shadow-festival animate-heritage-glow",
        timeline: "bg-heritage border-border hover:bg-card",
        collaboration: "bg-gradient-primary border-primary/40 shadow-cultural",
      },
      padding: {
        default: "p-6",
        sm: "p-4", 
        lg: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export interface CulturalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof culturalCardVariants> {}

const CulturalCard = React.forwardRef<HTMLDivElement, CulturalCardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(culturalCardVariants({ variant, padding }), className)}
      {...props}
    />
  )
)
CulturalCard.displayName = "CulturalCard"

const CulturalCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CulturalCardHeader.displayName = "CulturalCardHeader"

const CulturalCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-cultural text-cultural-heading leading-none tracking-tight", className)}
    {...props}
  />
))
CulturalCardTitle.displayName = "CulturalCardTitle"

const CulturalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-heritage", className)}
    {...props}
  />
))
CulturalCardDescription.displayName = "CulturalCardDescription"

const CulturalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CulturalCardContent.displayName = "CulturalCardContent"

const CulturalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
))
CulturalCardFooter.displayName = "CulturalCardFooter"

export { 
  CulturalCard, 
  CulturalCardHeader, 
  CulturalCardFooter, 
  CulturalCardTitle, 
  CulturalCardDescription, 
  CulturalCardContent,
  culturalCardVariants 
}