import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: AnimatedCounterProps) {
  const [mounted, setMounted] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    `${prefix}${Number(latest).toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    setMounted(true);
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [value, count]);

  if (!mounted) {
    return <span>{prefix}{Number(0).toFixed(decimals)}{suffix}</span>;
  }

  return <motion.span className="font-variant-numeric: tabular-nums">{rounded}</motion.span>;
}
