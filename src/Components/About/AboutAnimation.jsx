import React from 'react'
import { loadFull } from "tsparticles";
import Particles from "react-particles";
import { useCallback } from "react";

function AboutAnimation() {
     const options = {
         particles: {
             number: {
                 value: 40,
                 density: {
                     enable: true,
                     area: 900,
                 },
             },
             color: {
                 value: ["eedaff"],
             },
             shape: {
                 type: "star",
             },
             opacity: {
                 value: 1,
             },
             size: {
                 value: { min: 1, max: 5 },
             },
             links: {
                 enable: true,
                 distance: 150,
                 color: "#808080",
                 opacity: 0.4,
                 width: 1,
             },
             move: {
                 enable: true,
                 speed: 4,
                 direction: "none",
                 random: false,
                 straight: false,
                 outModes: "out",
             },
         },
         interactivity: {
             events: {
                 onHover: {
                     enable: true,
                     mode: "grab",
                 },
                 onClick: {
                     enable: true,
                     mode: "push",
                 },
             },
             modes: {
                 grab: {
                     distance: 140,
                     links: {
                         opacity: 2,
                     },
                 },
                 push: {
                     quantity: 4,
                 },
             },
         },
         background: {
             color: "#000", // Set background color to black
         },
     };

     const particlesInit = useCallback(async (engine) => {
         await loadFull(engine);
     }, []);
  return (
      <div>
          
          <Particles options={options} init={particlesInit} />
      </div>
  );
}

export default AboutAnimation