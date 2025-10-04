import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-primary bounce-hover rounded-xl shadow-lg",
        hero: "bg-gradient-hero text-white hover:shadow-glow bounce-hover rounded-2xl shadow-xl font-heading font-bold text-lg",
        success: "bg-gradient-success text-success-foreground hover:shadow-success bounce-hover rounded-xl shadow-lg",
        warning: "bg-gradient-warning text-warning-foreground bounce-hover rounded-xl shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 bounce-hover rounded-xl",
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground bounce-hover rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 smooth-hover rounded-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground smooth-hover rounded-xl",
        link: "text-primary underline-offset-4 hover:underline smooth-hover",
        badge: "bg-gradient-card text-card-foreground border-2 border-border hover:shadow-lg smooth-hover rounded-full text-xs",
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
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
