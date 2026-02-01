import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import mishImg from "./assets/mish.jpg";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import confetti from "canvas-confetti";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, ScrollTrigger);

function App() {
  const container = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const fullTextRef = useRef<HTMLHeadingElement>(null);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const helloArray: string[] = [
    "Hello", // English
    "Hola", // Spanish
    "Bonjour", // French
    "Hallo", // German
    "Ciao", // Italian
    "Olá", // Portuguese
    "Привет", // Russian (Privet)
    "你好", // Chinese (Nǐ hǎo)
    "こんにちは", // Japanese (Konnichiwa)
    "안녕하세요", // Korean (Annyeonghaseyo)
    "مرحبا", // Arabic (Marhaban)
    "नमस्ते", // Hindi (Namaste)
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Get all hellos except English, then shuffle
      const otherHellos = helloArray.slice(1);

      // Cycle through each hello with scramble effect
      otherHellos.forEach((hello) => {
        tl.to(greetingRef.current, {
          duration: 0.8,
          scrambleText: {
            text: hello,
            chars: "upperAndLowerCase",
            speed: 0.5,
          },
        });
      });

      // End with English "Hello"
      tl.to(greetingRef.current, {
        duration: 1.5,
        scrambleText: {
          text: "Hello",
          chars: "upperAndLowerCase",
          speed: 0.5,
        },
      });

      // After 3 seconds, scramble to "Happy Birthday!"
      tl.to(fullTextRef.current, {
        duration: 2,
        scrambleText: {
          text: "Happy Birthday!",
          chars: "upperAndLowerCase",
          speed: 0.4,
        },
        delay: 1.5,
        onComplete: () => {
          // Fire confetti bursts
          const duration = 3000;
          const end = Date.now() + duration;

          const frame = () => {
            confetti({
              particleCount: 7,
              startVelocity: 65,
              angle: 60,
              spread: 300,
              origin: { x: 0, y: 0.6 },
            });
            confetti({
              particleCount: 7,
              startVelocity: 65,
              angle: 120,
              spread: 300,
              origin: { x: 1, y: 0.6 },
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          };
          frame();
        },
      });

    },
    { scope: container }
  );

  // Windmill scroll animation
  useGSAP(() => {
    gsap.to("#pin-windmill-svg", {
      rotation: 1440,
      ease: "none",
      scrollTrigger: {
        scrub: 2,
        pin: true,
        trigger: "#pin-windmill",
        start: "top top",
        endTrigger: "#pin-windmill-wrap",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.progress == 1) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        },
        
      },
    });
  });

  return (
    <div className="App" ref={container}>
      <div className="container">
        <h2 className="text" ref={fullTextRef}>
          <span ref={greetingRef}>Hello</span> Mishka,
        </h2>
      </div>

      <div id="pin-windmill-wrap">
        <div id="pin-windmill">
          <img id="pin-windmill-svg" src={mishImg} alt="Mish" />
          {showButton && (
            <button className="continue-btn" onClick={() => navigate("/video")}>
              CLICK TO CONTINUE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
