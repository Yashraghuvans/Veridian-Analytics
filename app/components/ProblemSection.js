import { FaCloud, FaChartBar, FaFileAlt, FaSeedling } from 'react-icons/fa';
import AnimatedSection from './AnimatedSection';

const problems = [
  {
    text: 'Most smallholders lack access to reliable, affordable crop insurance.',
    icon: FaSeedling,
  },
  {
    text: 'Climate volatility drives unpredictable yields and rising financial losses.',
    icon: FaCloud,
  },
  {
    text: 'Legacy schemes are slow, one-size-fits-all, and hard to trust.',
    icon: FaFileAlt,
  },
  {
    text: 'Traditional products ignore real-time risk and hyperlocal farm data.',
    icon: FaChartBar,
  },
];

export default function ProblemSection() {
  return (
    <section id="problem-section" className="section-padding border-t border-white/[0.04]">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-label">The challenge</span>
          <h2 className="section-title">Why farmers need a better model</h2>
          <p className="section-subtitle mx-auto">
            Insurance should respond as fast as the weather changes—not months after the harvest is lost.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <AnimatedSection
              key={problem.text}
              delayClass={`stagger-${index + 1}`}
              className="card-surface p-6 md:p-8 flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <problem.icon className="h-5 w-5 text-emerald-400" aria-hidden />
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{problem.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
