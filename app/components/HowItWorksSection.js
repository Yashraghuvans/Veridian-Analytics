import {
  FaMobileAlt,
  FaMapMarkerAlt,
  FaCloudUploadAlt,
  FaDollarSign,
  FaRocket,
} from 'react-icons/fa';
import AnimatedSection from './AnimatedSection';

const steps = [
  { number: '01', title: 'Register', detail: 'Farmer signs up via mobile or web in minutes.', icon: FaMobileAlt },
  { number: '02', title: 'Geo-tag', detail: 'Plot boundaries and crop inputs are captured on-site.', icon: FaMapMarkerAlt },
  { number: '03', title: 'Analyze', detail: 'Real-time climate and yield risk scoring runs continuously.', icon: FaCloudUploadAlt },
  { number: '04', title: 'Price', detail: 'Dynamic premium reflects actual exposure—not averages.', icon: FaDollarSign },
  { number: '05', title: 'Payout', detail: 'Satellite-verified damage triggers fast, fair compensation.', icon: FaRocket },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works-section" className="section-padding">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-label">Process</span>
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle mx-auto">
            Five clear steps from enrollment to payout—with automation at every stage.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {steps.map((step, index) => (
            <AnimatedSection
              key={step.number}
              delayClass={`stagger-${Math.min(index + 1, 5)}`}
              className="card-surface p-6 flex flex-col h-full relative overflow-hidden"
            >
              <span className="text-[10px] font-mono text-emerald-500/80 tracking-widest mb-4">
                {step.number}
              </span>
              <step.icon className="h-8 w-8 text-emerald-400/90 mb-4" aria-hidden />
              <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-grow">{step.detail}</p>
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-emerald-500/40 to-transparent"
                  aria-hidden
                />
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
