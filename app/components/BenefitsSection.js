import { FaBuilding, FaUniversity, FaUsers } from 'react-icons/fa';
import AnimatedSection from './AnimatedSection';

const benefits = [
  {
    key: 'farmers',
    title: 'Farmers',
    icon: FaUsers,
    accent: 'text-emerald-400',
    items: [
      'Stable income when seasons fail',
      'Faster, transparent payouts',
      'Personalized risk assessment',
      'Actionable climate insights',
    ],
  },
  {
    key: 'governments',
    title: 'Governments',
    icon: FaBuilding,
    accent: 'text-sky-400',
    items: [
      'Rapid disaster response',
      'Lower administrative overhead',
      'Stronger food security',
      'Evidence-based policy',
    ],
  },
  {
    key: 'insurers',
    title: 'Insurers',
    icon: FaUniversity,
    accent: 'text-amber-400',
    items: [
      'Accurate risk pricing',
      'Automated claims workflow',
      'Reduced fraud exposure',
      'New rural market access',
    ],
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits-section" className="section-padding">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-label">Stakeholders</span>
          <h2 className="section-title">Benefits for everyone</h2>
          <p className="section-subtitle mx-auto">
            A shared data layer aligns incentives across farmers, public programs, and carriers.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((group, index) => (
            <AnimatedSection
              key={group.key}
              delayClass={`stagger-${index + 1}`}
              className="card-surface p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <group.icon className={`h-6 w-6 ${group.accent}`} aria-hidden />
                <h3 className="text-xl font-medium text-white">{group.title}</h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-zinc-400">
                    <span className="mt-2 h-1 w-1 rounded-full bg-emerald-500/60 flex-shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
