"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

function Landing() {
  const slider = useRef(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  let xPercent = 0;
  let direction = -1;
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-=500px",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.1 * direction;
    requestAnimationFrame(animation);
  };
  return (
    <main className="relative flex h-[100vh]  overflow-hidden">
      <Image src="/Images/background.jpg" alt="background" fill />
      <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p
            ref={firstText}
            className="relative m-0 text-white text-[230px] font-medium pr-[50px]"
          >
            Software Developer -
          </p>
          <p
            ref={secondText}
            className="absolute m-0 text-white text-[230px] font-medium pr-[50px] left-[100%] top-0"
          >
            Software Developer -
          </p>
        </div>
      </div>
    </main>
  );
}

export default Landing;
