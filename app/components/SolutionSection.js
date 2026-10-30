import { FaBrain, FaGlobeAmericas, FaChartPie, FaShieldAlt } from 'react-icons/fa';
import AnimatedSection from './AnimatedSection';

const solutions = [
  {
    text: 'End-to-end climate-resilient crop insurance on web and mobile.',
    icon: FaShieldAlt,
  },
  {
    text: 'AI, satellite imagery, and local weather fused into one risk engine.',
    icon: FaBrain,
  },
  {
    text: 'Dynamic premiums and automated claims—no paperwork bottlenecks.',
    icon: FaChartPie,
  },
  {
    text: 'Coverage tailored to plot size, crop type, and regional exposure.',
    icon: FaGlobeAmericas,
  },
];

export default function SolutionSection() {
  return (
    <section id="solution-section" className="section-padding bg-[#0a0d10]">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-label">Our answer</span>
          <h2 className="section-title">Veridian Analytics platform</h2>
          <p className="section-subtitle mx-auto">
            Precision risk pricing and transparent payouts—designed for the people who grow our food.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {solutions.map((solution, index) => (
            <AnimatedSection
              key={solution.text}
              delayClass={`stagger-${index + 1}`}
              className="card-surface p-6 md:p-8 flex gap-4 items-start group"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-teal-500/20">
                <solution.icon className="h-5 w-5 text-teal-400" aria-hidden />
              </div>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{solution.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
