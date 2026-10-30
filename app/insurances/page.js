'use client';

import Link from 'next/link';
import {
  FaShieldAlt,
  FaSeedling,
  FaWater,
  FaCloud,
  FaChartBar,
  FaFire,
  FaSnowflake,
  FaBug,
  FaLeaf,
} from 'react-icons/fa';
import AppHeader from '../components/AppHeader';
import AnimatedSection from '../components/AnimatedSection';

const dummyInsurances = [
  {
    id: 'plan-1',
    name: 'Drought Resilience Plan',
    description: 'Covers crop losses due to insufficient rainfall for extended periods.',
    price: '$50/acre',
    icon: FaWater,
  },
  {
    id: 'plan-2',
    name: 'Flood Protection Plan',
    description: 'Protects against crop damage from excessive rainfall and flooding.',
    price: '$45/acre',
    icon: FaSeedling,
  },
  {
    id: 'plan-3',
    name: 'Pest & Disease Safeguard',
    description: 'Cover for yield loss from major pest infestations or disease outbreaks.',
    price: '$35/acre',
    icon: FaShieldAlt,
  },
  {
    id: 'plan-4',
    name: 'Hailstorm Guard',
    description: 'Protection against physical crop damage from hailstorms.',
    price: '$20/acre',
    icon: FaCloud,
  },
  {
    id: 'plan-5',
    name: 'Heatwave Protection',
    description: 'Covers losses from extreme heat affecting yield and quality.',
    price: '$30/acre',
    icon: FaFire,
  },
  {
    id: 'plan-6',
    name: 'Cold Snap Shield',
    description: 'Protects crops from unexpected frost during the growing season.',
    price: '$28/acre',
    icon: FaSnowflake,
  },
  {
    id: 'plan-7',
    name: 'Multi-Peril Crop Insurance',
    description: 'Drought, flood, pests, and diseases in one comprehensive package.',
    price: '$60/acre',
    icon: FaShieldAlt,
  },
  {
    id: 'plan-8',
    name: 'Livestock Loss Cover',
    description: 'Insurance for livestock loss due to disease, weather, or accidents.',
    price: '$40/animal',
    icon: FaLeaf,
  },
  {
    id: 'plan-9',
    name: 'Market Price Guarantee',
    description: 'Protects against sudden drops in market prices for enrolled crops.',
    price: '$15/acre',
    icon: FaChartBar,
  },
  {
    id: 'plan-10',
    name: 'Insect Outbreak Cover',
    description: 'Losses from severe insect outbreaks beyond standard control.',
    price: '$25/acre',
    icon: FaBug,
  },
];

export default function InsurancesPage() {
  return (
    <div className="min-h-screen bg-[#0c0f12]">
      <AppHeader backHref="/login" backLabel="Sign in" />
      <div className="section-padding pt-10 md:pt-14">
        <div className="section-container">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <span className="section-label">Coverage catalog</span>
            <h1 className="section-title">Insurance plans</h1>
            <p className="section-subtitle mx-auto">
              Choose protection aligned to your crops, region, and risk profile.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {dummyInsurances.map((plan, index) => (
              <AnimatedSection
                key={plan.id}
                delayClass={`stagger-${Math.min((index % 5) + 1, 5)}`}
                className="card-surface p-6 md:p-8 flex flex-col items-center text-center h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
                  <plan.icon className="h-7 w-7 text-emerald-400" aria-hidden />
                </div>
                <h2 className="text-lg font-medium text-white mb-2">{plan.name}</h2>
                <p className="text-sm text-zinc-500 mb-6 flex-grow leading-relaxed">
                  {plan.description}
                </p>
                <p className="text-2xl font-semibold text-emerald-400 mb-6 tabular-nums">
                  {plan.price}
                </p>
                <Link href={`/insurances/${plan.id}`} className="btn-secondary w-full text-center">
                  View details
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
