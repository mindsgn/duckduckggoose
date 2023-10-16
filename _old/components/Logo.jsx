import { motion, useMotionValue } from "framer-motion";
import React from "react";
const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(0, 0, 0, 1)"
  }
};

export default function App() {
  const pathLength = useMotionValue(0);
  const duration = 1;
  return (
    <div className="App">
      <motion.svg
        width="420"
        height="200"
        viewBox="0 0 366 438.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*new row*/}
        <g opacity="1">
          <motion.path
            d="M144.5,131.9c21.4,0,38.9-17.4,38.9-38.9S166,54.2,144.5,54.2S105.7,71.6,105.7,93S123.1,131.9,144.5,131.9 M144.5,69.3 c13.1,0,23.7,10.6,23.7,23.7c0,13.1-10.6,23.7-23.7,23.7s-23.7-10.6-23.7-23.7C120.8,79.9,131.4,69.3,144.5,69.3"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration, ease: "easeInOut" },
              fill: { duration: duration, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M43.5,106.8c4.7,1.8,9.5,2.8,14.4,2.8c5.2,0,10.4-1.1,15.4-3.2c8.6-3.7,15.3-10.2,18.8-18.3c3.8-8.7,3.7-18.6-0.3-27.9 l-3-7L57,66.9l6,13.9l16.6-7.2c0.2,2.9-0.3,5.7-1.5,8.3c-2,4.6-5.9,8.3-11,10.5C61.4,95,55,95.1,49.1,92.8 c-5.9-2.3-10.5-6.8-13-12.7c-5.2-12,0.4-26,12.4-31.2c6.1-2.6,12.7-2.6,18.8,0l6-13.9c-9.8-4.2-21-4.2-30.8,0 c-19.7,8.5-28.8,31.4-20.3,51.1C26.3,95.6,33.8,103,43.5,106.8"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration, ease: "easeInOut" },
              fill: { duration: duration, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M229.6,87.1c21.4,0,38.9-17.4,38.9-38.9S251.1,9.4,229.7,9.4s-38.9,17.4-38.9,38.9C190.8,69.7,208.2,87.1,229.6,87.1 M229.6,24.5c13.1,0,23.7,10.6,23.7,23.7S242.7,72,229.6,72s-23.7-10.6-23.7-23.7S216.6,24.5,229.6,24.5"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration, ease: "easeInOut" },
              fill: { duration: duration, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M307.5,113.1c7.8,0,15.5-2.4,22-6.9c8.5-5.9,14.2-14.8,16.1-25c3.8-21.1-10.2-41.3-31.3-45.2l-23.1-4.2l-13.9,76.5 l23.1,4.2C302.8,112.9,305.1,113.1,307.5,113.1 M303.4,49.4l8.2,1.5c12.9,2.3,21.4,14.7,19.1,27.6c-1.1,6.2-4.6,11.7-9.8,15.3 s-11.5,5-17.8,3.8l-8.2-1.5L303.4,49.4z"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration, ease: "easeInOut" },
              fill: { duration: duration, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          {/*new row*/}
          <motion.path
            d="M144.5,239.7c21.4,0,38.9-17.4,38.9-38.9s-17.4-38.9-38.9-38.9s-38.9,17.4-38.9,38.9S123.1,239.7,144.5,239.7 M144.5,177.1c13.1,0,23.7,10.6,23.7,23.7s-10.6,23.7-23.7,23.7s-23.7-10.6-23.7-23.7C120.8,187.7,131.4,177.1,144.5,177.1"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+1, ease: "easeInOut" },
              fill: { duration: duration+1, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M44.8,154.8c5-3.8,11.3-5.5,17.6-4.6c6.5,0.9,12.3,4.4,16.1,9.8l12.3-8.8c-6.2-8.7-15.8-14.5-26.4-16 c-10.3-1.4-20.5,1.3-28.8,7.5c-8.3,6.3-13.6,15.4-15,25.7c-1.4,10.3,1.3,20.5,7.5,28.8c6.3,8.3,15.4,13.6,25.7,15 c1.8,0.2,3.6,0.4,5.3,0.4c17.6,0,31.9-12.3,34.4-30.3l1-7.5l-34.2-4.7l-2.1,15l18,2.5c-4.2,7.9-12.8,10.7-20.4,9.7 c-6.3-0.9-11.8-4.1-15.7-9.2c-3.8-5.1-5.5-11.3-4.6-17.6C36.5,164.2,39.8,158.6,44.8,154.8"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+1, ease: "easeInOut" },
              fill: { duration: duration+1, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M229.6,194.5c21.4,0,38.9-17.4,38.9-38.9s-17.4-38.9-38.9-38.9s-38.9,17.4-38.9,38.9C190.8,177,208.2,194.5,229.6,194.5 M229.6,131.9c13.1,0,23.7,10.6,23.7,23.7s-10.6,23.7-23.7,23.7s-23.7-10.6-23.7-23.7S216.6,131.9,229.6,131.9"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+1, ease: "easeInOut" },
              fill: { duration: duration+1, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M333.3,154.5c-7.7-6.9-17.7-10.5-28-9.9l-23.5,1.2l4.1,77.6l23.5-1.2c21.4-1.1,37.9-19.5,36.8-40.9 C345.5,170.9,341,161.4,333.3,154.5 M308.5,207.1l-8.3,0.4l-2.5-47.4l8.3-0.4c6.3-0.3,12.4,1.8,17.1,6.1 c4.7,4.2,7.5,10.1,7.8,16.4C331.7,195.2,321.6,206.4,308.5,207.1"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+1, ease: "easeInOut" },
              fill: { duration: duration+1, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M333.3,154.5c-7.7-6.9-17.7-10.5-28-9.9l-23.5,1.2l4.1,77.6l23.5-1.2c21.4-1.1,37.9-19.5,36.8-40.9 C345.5,170.9,341,161.4,333.3,154.5 M308.5,207.1l-8.3,0.4l-2.5-47.4l8.3-0.4c6.3-0.3,12.4,1.8,17.1,6.1 c4.7,4.2,7.5,10.1,7.8,16.4C331.7,195.2,321.6,206.4,308.5,207.1"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+1, ease: "easeInOut" },
              fill: { duration: duration+1, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          {/*new row*/}
          <motion.path
            d="M148.1,263.4c-21.4,0-38.9,17.4-38.9,38.9s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C187,280.8,169.5,263.4,148.1,263.4 M148.1,326c-13.1,0-23.7-10.6-23.7-23.7s10.6-23.7,23.7-23.7s23.7,10.6,23.7,23.7S161.2,326,148.1,326"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+2, ease: "easeInOut" },
              fill: { duration: duration+2, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M94.2,275l-1.9-7.3l-33.4,8.8l3.8,14.6l17.5-4.6c-0.8,8.9-7.7,14.8-15.1,16.8c-12.7,3.3-25.7-4.3-29-16.9 c-3.3-12.6,4.3-25.6,16.9-29c6.4-1.7,13-0.7,18.6,2.8l8-12.8c-9.1-5.6-20.2-7.3-30.5-4.6c-20.7,5.4-33.2,26.7-27.7,47.5 c4.6,17.4,20.4,29,37.6,29c3.3,0,6.6-0.4,9.9-1.3C88.4,312.8,99.3,294.4,94.2,275"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+2, ease: "easeInOut" },
              fill: { duration: duration+2, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M229.6,295.9c21.4,0,38.9-17.4,38.9-38.9c0-21.4-17.4-38.9-38.9-38.9s-38.9,17.4-38.9,38.9 C190.8,278.5,208.2,295.9,229.6,295.9 M229.6,233.3c13.1,0,23.7,10.6,23.7,23.7s-10.6,23.7-23.7,23.7s-23.7-10.6-23.7-23.7 S216.6,233.3,229.6,233.3"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+2, ease: "easeInOut" },
              fill: { duration: duration+2, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          <motion.path
            d="M326,252.3l-20.9-10.8l-35.7,69l20.9,10.8c5.7,2.9,11.8,4.3,17.8,4.3c14.1,0,27.7-7.7,34.6-21c4.8-9.2,5.7-19.8,2.5-29.6 C342,265.1,335.2,257,326,252.3 M329.2,297.7c-6,11.6-20.3,16.2-32,10.2l-7.4-3.8l21.8-42.1l7.4,3.8c5.6,2.9,9.8,7.8,11.7,13.9 C332.7,285.6,332.1,292,329.2,297.7"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+2, ease: "easeInOut" },
              fill: { duration: duration+2, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
          {/*new row*/}
          <motion.path
            d="M259.5,363.5l-12.3,8.5c3,4.3,6.9,8.2,11.4,11.6c-14.9,18.5-44.5,30.5-76.4,30.5c-31.7,0-61.6-12-76.5-30.5 c4.5-3.4,8.3-7.3,11.3-11.6l-12.3-8.5c-3.1,4.4-7.8,8.5-13.2,11.4c-5.4,3-11.4,4.7-16.7,4.8l0.5,15c5.6-0.2,11.5-1.5,17.2-3.8 c17.4,23.4,51.8,38.1,89.7,38.1c37.9,0,72.2-14.8,89.6-38.1c5.7,2.3,11.5,3.6,17.2,3.8l0.5-15c-5.3-0.2-11.2-1.9-16.7-4.8 C267.3,372,262.6,367.9,259.5,363.5"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: duration+3, ease: "easeInOut" },
              fill: { duration: duration+3, ease: [1, 0, 0.8, 1] }
            }}
            strokeWidth="2"
            stroke="#000"
          />
        </g>
      </motion.svg>
    </div>
  );
}
