"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}: Props) {
  const offset = { up: { y: 25 }, left: { x: -25 }, right: { x: 25 } }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Screen me aane se thoda pehle trigger hoga
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
}