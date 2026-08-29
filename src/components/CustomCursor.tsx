"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import clsx from "clsx";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fix centering: GSAP x/y overwrites Tailwind's transform translate(-50%, -50%)
    // We must explicitly tell GSAP to keep them centered at -50%
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      setDotX(mouseX);
      setDotY(mouseY);
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      
      setRingX(ringX);
      setRingY(ringY);
      
      requestAnimationFrame(render);
    };
    
    requestAnimationFrame(render);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={clsx(
          "fixed top-0 left-0 pointer-events-none z-[100] w-1.5 h-1.5 bg-white rounded-full mix-blend-difference transition-transform duration-200",
          isHovering ? "scale-[2]" : "scale-100"
        )}
      />
      
      <div
        ref={ringRef}
        className={clsx(
          "fixed top-0 left-0 pointer-events-none z-[90] rounded-full border border-white/40 transition-all duration-300 ease-out",
          isHovering ? "w-12 h-12 bg-white/5 border-white/60" : "w-6 h-6 bg-transparent"
        )}
      />
    </>
  );
}
