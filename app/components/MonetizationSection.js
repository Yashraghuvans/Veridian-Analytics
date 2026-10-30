import { FaCreditCard, FaHandshake, FaRedoAlt, FaStore } from 'react-icons/fa';
import AnimatedSection from './AnimatedSection';
import Link from 'next/link';

const monetizationMethods = [
  {
    text: 'Freemium for farmers—core protection free, advanced analytics on premium tiers.',
    icon: FaCreditCard,
  },
  {
    text: 'API licensing for insurers and agencies needing verified risk and claims data.',
    icon: FaStore,
  },
  {
    text: 'Partnerships with agri-tech platforms for embedded insurance products.',
    icon: FaHandshake,
  },
  {
    text: 'Roadmap: yield-based credit scores and microloans tied to verified performance.',
    icon: FaRedoAlt,
  },
];

export default function MonetizationSection() {
  return (
    <section id="monetization-section" className="section-padding bg-[#0a0d10]">
      <div className="section-container">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-label">Sustainability</span>
          <h2 className="section-title">Built to scale responsibly</h2>
          <p className="section-subtitle mx-auto">
            Revenue models that keep smallholders covered while funding continuous innovation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
          {monetizationMethods.map((method, index) => (
            <AnimatedSection
              key={method.text}
              delayClass={`stagger-${index + 1}`}
              className="card-surface p-6 md:p-8 flex gap-4 items-start"
            >
              <method.icon className="h-5 w-5 text-emerald-400 mt-1 flex-shrink-0" aria-hidden />
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{method.text}</p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <div className="card-surface p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
              Ready to protect your next season?
            </h3>
            <p className="text-zinc-500 text-sm mb-8">
              Browse plans tailored to drought, flood, pests, and multi-peril coverage.
            </p>
            <Link href="/insurances" className="btn-primary">
              Browse insurance plans
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
