"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  blur?: boolean;
  once?: boolean;
}

const directionVariants: Record<Direction, { hidden: object; visible: object }> = {
  up:    { hidden: { y: 32, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: -32, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: 32, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: -32, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  none:  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  once = true,
}: ScrollRevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1, once });

  const variants = {
    hidden: {
      ...directionVariants[direction].hidden,
      ...(blur ? { filter: "blur(8px)" } : {}),
    },
    visible: {
      ...directionVariants[direction].visible,
      ...(blur ? { filter: "blur(0px)" } : {}),
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
