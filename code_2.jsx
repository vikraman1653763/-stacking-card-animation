import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section00 = () => {
  const containerRef1 = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef1,
    offset: ["start start", "end end"]
  });

  const projects = [
    {
      title: "Matthias Leidinger",
      description:
        "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
      src: "/assets/ab_sam_1.jpg",
      link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
      color: "#BBACAF"
    },
    {
      title: "Clément Chapillon",
      description:
        "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes.",
      src: "/assets/ab_sam_2.png",
      link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
      color: "#977F6D"
    },
    {
      title: "Zissou",
      description:
        "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. They’re encoded with an ambiguity that lets the viewer find their own story within them.",
      src: "/assets/ab_sam_3.png",
      link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
      color: "#C2491D"
    },
    // repeat more if needed...
  ];

  return (
    <main ref={containerRef1} className="bg-white">
      <div className="min-h-screen">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          const range = [i * 0.25, 1];
          const scale = useTransform(scrollYProgress, range, [1, targetScale]);
          const imageScale = useTransform(scrollYProgress, range, [2, 1]);

          return (
            <div
              key={i}
              className="h-screen flex items-center justify-center sticky top-0 z-10"
            >
              <motion.div
                style={{
                  backgroundColor: project.color,
                  scale,
                  top: `calc(-5vh + ${i * 25}px)`
                }}
                className="relative flex flex-col h-[500px] w-[1000px] rounded-[25px] p-[50px] transform origin-top text-black shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-4 text-center">{project.title}</h2>
                <div className="flex gap-6 items-start mt-4">
                  <div className="w-[40%]">
                    <p className="mb-4 text-[16px] leading-relaxed">{project.description}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="underline text-[14px]">
                      See more →
                    </a>
                  </div>
                  <motion.div
                    className="w-[60%] h-[300px] overflow-hidden  rounded-xl"
                  >
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Section00;
