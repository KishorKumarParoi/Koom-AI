import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-white text-white-foreground text-black shadow-xs hover:bg-white/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        gradientPurpleBlue:
          "bg-gradient-to-r from-[#a22fe0] via-[#5f6ee0] to-[#2fdbe0] text-white shadow-lg hover:brightness-110 border-0",
        gradientOrangePink:
          "bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white shadow-lg hover:brightness-110 border-0",
        gradientGreenBlue:
          "bg-gradient-to-r from-[#43e97b] to-[#38f9d7] text-white shadow-lg hover:brightness-110 border-0",
        glass:
          "bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20",
        shine:
          "relative overflow-hidden bg-gradient-to-r from-[#a22fe0] via-[#5f6ee0] to-[#2fdbe0] text-white shadow-lg border-0 before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0.2)_100%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700 before:pointer-events-none",
        gradientDark:
          "bg-gradient-to-r from-[#232526] via-[#414345] to-[#232526] text-white shadow-lg hover:brightness-110 border-0",
        gradientWhite:
          "bg-gradient-to-r from-[#f8fafc] via-[#e2e8f0] to-[#f8fafc] text-[#232526] shadow-lg hover:brightness-105 border-0",
        gradientGrey:
          "bg-gradient-to-r from-[#bdc3c7] via-[#e0e0e0] to-[#bdc3c7] text-[#232526] shadow-lg hover:brightness-105 border-0",
        gradientBlueIndigo:
          "bg-gradient-to-r from-[#396afc] to-[#2948ff] text-white shadow-lg hover:brightness-110 border-0",
        gradientPinkPurple:
          "bg-gradient-to-r from-[#ff6a00] via-[#ee0979] to-[#a22fe0] text-white shadow-lg hover:brightness-110 border-0",
        gradientAquaLime:
          "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white shadow-lg hover:brightness-110 border-0",
        gradientRedYellow:
          "bg-gradient-to-r from-[#f7971e] to-[#ffd200] text-white shadow-lg hover:brightness-110 border-0",
        dark: "bg-[#18181b] text-white shadow-md hover:bg-[#232326] border border-[#232526]",
        lowDark:
          "bg-[#232326] text-white shadow hover:bg-[#414345] border border-[#232526]",
        white:
          "bg-white text-[#232526] shadow hover:bg-gray-100 border border-gray-200",
        shadowWhite:
          "bg-white text-[#232526] shadow-lg hover:bg-gray-50 border border-gray-100",
        grey: "bg-gradient-to-r from-[#e0e0e0] to-[#bdc3c7] text-[#232526] shadow hover:brightness-105 border border-[#d1d5db]",
        slate:
          "bg-gradient-to-r from-[#64748b] to-[#334155] text-white shadow hover:brightness-110 border border-[#475569]",
        neutral:
          "bg-gradient-to-r from-[#f3f4f6] to-[#d1d5db] text-[#232526] shadow hover:brightness-105 border border-[#e5e7eb]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
