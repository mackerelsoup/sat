import { useRef } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);
function App() {
  const container = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);

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
    },
    { scope: container }
  );

  return (
    <div className="App">
      <div ref={container} className="container">
        <h2 className="text"><span ref={greetingRef}>Hello</span> Mishka</h2>
      </div>
    </div>
  );
}

export default App;
