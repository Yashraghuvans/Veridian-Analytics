import { FaChartLine, FaLightbulb, FaSatellite } from 'react-icons/fa';
import AnimatedSection from './AnimatedSection';

const aiActions = [
  {
    title: 'Predictive modeling',
    text: 'Rainfall, soil moisture, and disease signals forecast stress before it spreads.',
    icon: FaLightbulb,
  },
  {
    title: 'Risk scoring',
    text: 'Yield expectations weighted against live weather and historical baselines.',
    icon: FaChartLine,
  },
  {
    title: 'Damage detection',
    text: 'Satellite NDVI and change detection validate claims without field delays.',
    icon: FaSatellite,
  },
];

export default function AIInActionSection() {
  return (
    <section id="ai-in-action-section" className="section-padding bg-[#0a0d10]">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-label">Intelligence layer</span>
          <h2 className="section-title">AI in action</h2>
          <p className="section-subtitle mx-auto">
            Models trained on agronomic and geospatial data—so decisions stay grounded in the field.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {aiActions.map((action, index) => (
            <AnimatedSection
              key={action.title}
              delayClass={`stagger-${index + 1}`}
              className="card-surface p-8 text-center md:text-left"
            >
              <div className="w-12 h-12 mx-auto md:mx-0 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-5">
                <action.icon className="h-6 w-6 text-violet-400" aria-hidden />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{action.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{action.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
