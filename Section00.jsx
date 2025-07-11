import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const dummyCards = [
  {
    title: "Design",
    text: "Crafting every pixel with precision.",
    color: "#f94f4f",
  },
  {
    title: "Development",
    text: "Building rock-solid applications.",
    color: "#4f8cf9",
  },
  {
    title: "QA & Testing",
    text: "Ensuring bug-free experiences.",
    color: "#4ff95e",
  },
  {
    title: "Deployment",
    text: "Seamless production rollouts.",
    color: "#f9dc4f",
  },
  {
    title: "Support",
    text: "24/7 reliability & monitoring.",
    color: "#cd4ff9",
  },
];

export default function StackingCards() {
  const { scrollY } = useScroll();
  const cardRefs = useRef([]);
  const [tops, setTops] = useState([]);

  const SHRINK_SCALE = 0.3;
  const MAX_TRANSLATE = 100;
  const ANIM_RANGE = 5000;

  // Measure offsetTop of each card
  useLayoutEffect(() => {
    const measure = () => {
      setTops(cardRefs.current.map((el) => el?.offsetTop || 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="min-h-[400vh] bg-gray-100">
              <div className="h-[100vh]"></div>

      <div className="max-w-2xl mx-auto">
        {dummyCards.map((card, i) => {
          const currentTop = tops[i] || 0;
          const nextTop = tops[i + 1] || null; // undefined if last card

          // Animation only if there is a next card
          const activationOffset = window.innerHeight * 0.5;
          const animStart = nextTop - activationOffset;
          const animEnd = animStart + ANIM_RANGE;

          // Scale from 1 to SHRINK_SCALE only if not last card
          const scale = useTransform(
            scrollY,
            [animStart, animEnd],
            [1, nextTop ? SHRINK_SCALE : 1],
            { clamp: true }
          );

          const y = useTransform(
            scrollY,
            [animStart, animEnd],
            ["0px", nextTop ? `-${MAX_TRANSLATE}px` : "0px"],
            { clamp: true }
          );

          return (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="sticky top-100 pb-8 z-0"
            >
              <motion.div
                style={{
                  scale,
                  y,
                  transformOrigin: "top center",
                  zIndex: dummyCards.length - i,
                }}
              >
                <div
                  className="p-8 rounded-2xl shadow-xl w-[500px] h-[500px] mx-auto"
                  style={{ backgroundColor: card.color }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white">{card.text}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      <div className="h-[90vh]"></div>
      </div>
      
    </div>
  );
}
