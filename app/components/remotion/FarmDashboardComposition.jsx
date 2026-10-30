'use client';

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { DASHBOARD_DURATION } from './dashboardConfig';

const COLORS = {
  bg: '#0c0f12',
  panel: '#141920',
  panelBorder: 'rgba(255,255,255,0.08)',
  emerald: '#34d399',
  emeraldDim: 'rgba(52,211,153,0.15)',
  sky: '#38bdf8',
  amber: '#fbbf24',
  text: '#f4f4f5',
  muted: '#71717a',
  violet: '#a78bfa',
};

function fadeSlideIn(frame, start, duration = 20) {
  const progress = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(progress, [0, 1], [16, 0]);
  return { opacity: progress, transform: `translateY(${y}px)` };
}

function useCountUp(frame, target, delay = 0) {
  const { fps } = useVideoConfig();
  const spr = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  return Math.round(interpolate(spr, [0, 1], [0, target]));
}

function Sidebar({ frame, activeIndex }) {
  const items = ['Overview', 'Fields', 'Risk', 'Claims', 'Reports'];
  return (
    <div
      style={{
        width: 200,
        height: '100%',
        background: '#080a0c',
        borderRight: `1px solid ${COLORS.panelBorder}`,
        padding: '20px 0',
        flexShrink: 0,
      }}
    >
      <div style={{ padding: '0 20px 24px', borderBottom: `1px solid ${COLORS.panelBorder}` }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>
          Veridian<span style={{ color: COLORS.emerald }}>.</span>
        </div>
        <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 4, letterSpacing: '0.08em' }}>
          FARMER DASHBOARD
        </div>
      </div>
      <nav style={{ padding: '16px 12px' }}>
        {items.map((label, i) => {
          const active = i === activeIndex;
          const highlight = interpolate(
            frame,
            [40 + i * 12, 52 + i * 12],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          return (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                marginBottom: 4,
                borderRadius: 10,
                fontSize: 13,
                color: active ? COLORS.text : COLORS.muted,
                background: active
                  ? `rgba(52,211,153,${0.12 + highlight * 0.08})`
                  : `rgba(255,255,255,${highlight * 0.03})`,
                border: active ? `1px solid rgba(52,211,153,0.25)` : '1px solid transparent',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: active ? COLORS.emerald : 'transparent',
                  boxShadow: active ? `0 0 8px ${COLORS.emerald}` : 'none',
                }}
              />
              {label}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

function KpiCard({ title, value, suffix, delta, color, frame, delay, prefix = '' }) {
  const anim = fadeSlideIn(frame, delay, 22);
  const displayValue = useCountUp(frame, value, delay + 5);
  const formatted =
    prefix === '$' ? `$${displayValue.toLocaleString()}` : `${prefix}${displayValue}`;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: COLORS.panel,
        border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14,
        padding: '16px 18px',
        opacity: anim.opacity,
        transform: anim.transform,
      }}
    >
      <div style={{ fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, marginTop: 8, fontVariantNumeric: 'tabular-nums' }}>
        {formatted}
        {prefix !== '$' ? suffix : ''}
      </div>
      <div style={{ fontSize: 11, color, marginTop: 6 }}>{delta}</div>
    </div>
  );
}

function YieldChart({ frame }) {
  const points = [42, 48, 45, 58, 62, 55, 71, 68, 78, 82];
  const w = 420;
  const h = 120;
  const drawProgress = interpolate(frame, [90, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / 100) * h;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  const pathLength = 520;
  const dashOffset = pathLength * (1 - drawProgress);

  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14,
        padding: 18,
        flex: 1,
        ...fadeSlideIn(frame, 75, 24),
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>Yield forecast (NDVI)</span>
        <span style={{ fontSize: 11, color: COLORS.emerald }}>+12% vs last season</span>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.emerald} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COLORS.emerald} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={0}
            y1={h * t}
            x2={w}
            y2={h * t}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}
        <path
          d={`${pathD} L ${w} ${h} L 0 ${h} Z`}
          fill="url(#lineGrad)"
          opacity={drawProgress}
        />
        <path
          d={pathD}
          fill="none"
          stroke={COLORS.emerald}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  );
}

function RiskBars({ frame }) {
  const risks = [
    { label: 'Drought', pct: 72, color: COLORS.amber },
    { label: 'Flood', pct: 28, color: COLORS.sky },
    { label: 'Pest', pct: 41, color: COLORS.violet },
  ];
  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14,
        padding: 18,
        width: 280,
        ...fadeSlideIn(frame, 85, 24),
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 14 }}>
        Peril exposure
      </div>
      {risks.map((r, i) => {
        const barW = interpolate(
          frame,
          [100 + i * 15, 140 + i * 15],
          [0, r.pct],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        );
        return (
          <div key={r.label} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>
              <span>{r.label}</span>
              <span style={{ color: COLORS.text }}>{Math.round(barW)}%</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99 }}>
              <div
                style={{
                  width: `${barW}%`,
                  height: '100%',
                  borderRadius: 99,
                  background: r.color,
                  boxShadow: `0 0 12px ${r.color}55`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FieldMap({ frame }) {
  const pulse = interpolate(frame % 90, [0, 45, 90], [0.4, 1, 0.4]);
  const scanY = interpolate(frame, [0, DASHBOARD_DURATION], [0, 100], {
    extrapolateRight: 'extend',
  });
  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14,
        padding: 18,
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        ...fadeSlideIn(frame, 95, 24),
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 12 }}>
        Plot 7A · Satellite health
      </div>
      <div
        style={{
          height: 140,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #1a2e1a 0%, #0f1f14 50%, #1a2520 100%)',
          position: 'relative',
          border: `1px solid ${COLORS.panelBorder}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${scanY % 100}%`,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.emerald}, transparent)`,
            opacity: 0.7,
          }}
        />
        {[
          { top: '25%', left: '30%', size: 48 },
          { top: '45%', left: '55%', size: 36 },
          { top: '60%', left: '22%', size: 28 },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              border: `2px solid ${COLORS.emerald}`,
              background: COLORS.emeraldDim,
              boxShadow: `0 0 ${20 * pulse}px ${COLORS.emerald}66`,
              transform: `scale(${0.9 + pulse * 0.1})`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            fontSize: 10,
            color: COLORS.muted,
            fontFamily: 'monospace',
          }}
        >
          NDVI 0.78 · Updated 4m ago
        </div>
      </div>
    </div>
  );
}

function ClaimTimeline({ frame }) {
  const progress = interpolate(frame, [200, 320], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const steps = ['Detected', 'Verified', 'Approved', 'Paid'];
  const activeStep = Math.min(3, Math.floor(progress / 34));

  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14,
        padding: 18,
        ...fadeSlideIn(frame, 190, 24),
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>Claim #VA-2841</span>
        <span
          style={{
            fontSize: 10,
            padding: '4px 10px',
            borderRadius: 99,
            background: COLORS.emeraldDim,
            color: COLORS.emerald,
            border: `1px solid rgba(52,211,153,0.3)`,
          }}
        >
          Auto-processing
        </span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 16 }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: 99,
            background: `linear-gradient(90deg, ${COLORS.emerald}, ${COLORS.sky})`,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((step, i) => (
          <div key={step} style={{ textAlign: 'center', flex: 1 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                margin: '0 auto 6px',
                background: i <= activeStep ? COLORS.emerald : 'rgba(255,255,255,0.15)',
                boxShadow: i === activeStep ? `0 0 10px ${COLORS.emerald}` : 'none',
              }}
            />
            <div style={{ fontSize: 10, color: i <= activeStep ? COLORS.text : COLORS.muted }}>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed({ frame }) {
  const events = [
    { t: '09:14', msg: 'Rainfall index crossed trigger on Plot 7A', type: 'warn' },
    { t: '09:02', msg: 'Premium recalculated · −4% adjustment', type: 'ok' },
    { t: '08:41', msg: 'Satellite pass complete · NDVI refreshed', type: 'ok' },
  ];
  return (
    <div
      style={{
        background: COLORS.panel,
        border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 14,
        padding: 18,
        height: '100%',
        ...fadeSlideIn(frame, 210, 24),
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 12 }}>Live activity</div>
      {events.map((ev, i) => {
        const show = interpolate(frame, [220 + i * 18, 235 + i * 18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={ev.t}
            style={{
              opacity: show,
              transform: `translateX(${interpolate(show, [0, 1], [-8, 0])}px)`,
              padding: '10px 0',
              borderBottom: i < events.length - 1 ? `1px solid ${COLORS.panelBorder}` : 'none',
              display: 'flex',
              gap: 10,
              fontSize: 11,
            }}
          >
            <span style={{ color: COLORS.muted, fontFamily: 'monospace', flexShrink: 0 }}>{ev.t}</span>
            <span style={{ color: ev.type === 'warn' ? COLORS.amber : COLORS.muted }}>{ev.msg}</span>
          </div>
        );
      })}
    </div>
  );
}

function Toast({ frame }) {
  const show = interpolate(frame, [330, 345, 400, 415], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const x = interpolate(show, [0, 1], [40, 0]);
  if (frame < 330 || frame > 415) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 72,
        right: 28,
        opacity: show,
        transform: `translateX(${x}px)`,
        background: '#1a2129',
        border: `1px solid rgba(52,211,153,0.35)`,
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
        maxWidth: 280,
        zIndex: 20,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.emerald }}>Payout initiated</div>
      <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>
        $4,280 credited · Drought Resilience Plan
      </div>
    </div>
  );
}

function Header({ frame }) {
  const anim = fadeSlideIn(frame, 15, 20);
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: `1px solid ${COLORS.panelBorder}`,
        opacity: anim.opacity,
        transform: anim.transform,
      }}
    >
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.text }}>Green Valley Cooperative</div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>
          Kharif 2026 · 142 acres enrolled
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            fontSize: 11,
            padding: '6px 12px',
            borderRadius: 8,
            background: 'rgba(56,189,248,0.12)',
            color: COLORS.sky,
            border: '1px solid rgba(56,189,248,0.25)',
          }}
        >
          Rain next 48h: 12mm
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: COLORS.emeraldDim,
            border: `1px solid rgba(52,211,153,0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.emerald,
          }}
        >
          RK
        </div>
      </div>
    </header>
  );
}

export function FarmDashboardComposition() {
  const frame = useCurrentFrame();
  const shell = fadeSlideIn(frame, 0, 25);
  const activeNav = Math.min(4, Math.floor(interpolate(frame, [60, 240], [0, 4], { extrapolateRight: 'clamp' })));

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        opacity: shell.opacity,
      }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar frame={frame} activeIndex={activeNav} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Header frame={frame} />
          <div style={{ flex: 1, padding: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <KpiCard
                frame={frame}
                delay={50}
                title="Protected acres"
                value={142}
                suffix=""
                delta="↑ 8 acres this month"
                color={COLORS.emerald}
              />
              <KpiCard
                frame={frame}
                delay={58}
                title="Risk score"
                value={34}
                suffix="/100"
                delta="Low exposure zone"
                color={COLORS.sky}
              />
              <KpiCard
                frame={frame}
                delay={66}
                title="Open claims"
                value={2}
                suffix=""
                delta="1 auto-approved today"
                color={COLORS.amber}
              />
              <KpiCard
                frame={frame}
                delay={74}
                title="Est. payout"
                value={4280}
                prefix="$"
                suffix=""
                delta="Pending · Plot 7A"
                color={COLORS.emerald}
              />
            </div>

            <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <YieldChart frame={frame} />
                <div style={{ display: 'flex', gap: 16, flex: 1 }}>
                  <FieldMap frame={frame} />
                  <RiskBars frame={frame} />
                </div>
              </div>
              <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <ClaimTimeline frame={frame} />
                <div style={{ flex: 1, minHeight: 0 }}>
                  <ActivityFeed frame={frame} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast frame={frame} />

      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10,
          color: COLORS.muted,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0.6,
        }}
      >
        Demo data · Remotion preview
      </div>
    </AbsoluteFill>
  );
}
