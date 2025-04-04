import { AnimatedSpan, Terminal, TypingAnimation } from "../magicui/terminal";
import { Particles } from "../ui/particles";

export function TerminalDemo() {
  return (
    <>
      {/* <Particles
        className="absolute inset-2"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      /> */}
      <Terminal className="bg-black ">
        <TypingAnimation>&gt; npm interviewclear</TypingAnimation>

        <AnimatedSpan delay={1700} className="text-green-500">
          <span>✔ Use mockmate ai.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2200} className="text-green-500">
          <span>✔ Solve mockmate ai's suggestion.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2700} className="text-green-500">
          <span>✔ Give mock interview.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3200} className="text-green-500">
          <span>✔ Check score.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3700} className="text-green-500">
          <span>✔ Analysis question and answer.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4200} className="text-green-500">
          <span>✔ Check scope of Improvements.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4700} className="text-green-500">
          <span>✔ Ask our ai</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5200} className="text-blue-500">
          <span>ℹ Updated 1 file:</span>
          <span className="pl-2">- Offerletter.txt</span>
        </AnimatedSpan>

        <TypingAnimation delay={5700} className="text-muted-foreground">
          Success! you have successfully landed a job.
        </TypingAnimation>
      </Terminal>
    </>
  );
}
