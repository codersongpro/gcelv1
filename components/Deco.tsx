// 슬라이드의 장 표지 장식: 가는 연결선, 원형 노드, Google 4색 포인트
export function NodeDeco() {
  return (
    <svg className="node-deco" viewBox="0 0 180 120" aria-hidden>
      <path d="M10 20 H90 Q100 20 100 30 V90 Q100 100 110 100 H175" fill="none" stroke="#202124" strokeWidth="1.5" />
      <circle cx="100" cy="58" r="6" fill="#fff" stroke="#4285F4" strokeWidth="3" />
      <circle cx="10" cy="20" r="5" fill="#FBBC04" />
      <rect x="132" y="78" width="30" height="30" rx="6" transform="rotate(45 147 93)" fill="#fff" stroke="#202124" strokeWidth="1.5" />
      <path d="M147 84 l7 9 -7 9 -7 -9z" fill="#EA4335" />
      <circle cx="175" cy="100" r="5" fill="#34A853" />
    </svg>
  );
}

export function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 460 345" role="img" aria-label="새 학기를 준비하는 교실 일러스트">
      <rect x="30" y="70" width="250" height="180" rx="20" fill="#fff" stroke="#202124" strokeWidth="2" />
      <rect x="50" y="95" width="80" height="100" rx="8" fill="#FEF7E0" stroke="#FBBC04" strokeWidth="2" />
      <rect x="146" y="95" width="114" height="14" rx="7" fill="#E8F0FE" />
      <rect x="146" y="119" width="90" height="14" rx="7" fill="#E8F0FE" />
      <rect x="146" y="143" width="104" height="14" rx="7" fill="#E6F4EA" />
      <circle cx="90" cy="222" r="10" fill="#34A853" />
      <circle cx="120" cy="222" r="10" fill="#FBBC04" />
      <circle cx="150" cy="222" r="10" fill="#EA4335" />
      <circle cx="355" cy="95" r="44" fill="#4285F4" />
      <circle cx="355" cy="95" r="26" fill="#fff" opacity="0.35" />
      <path d="M385 128 l40 40" stroke="#202124" strokeWidth="10" strokeLinecap="round" />
      <circle cx="380" cy="250" r="34" fill="#fff" stroke="#EA4335" strokeWidth="3" />
      <path d="M362 250 l12 12 24 -26" fill="none" stroke="#EA4335" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 300 H220 Q235 300 235 315 V345" fill="none" stroke="#202124" strokeWidth="1.5" />
      <circle cx="235" cy="320" r="7" fill="#fff" stroke="#FBBC04" strokeWidth="3" />
      <rect x="300" y="300" width="160" height="22" rx="4" fill="#FBBC04" />
      {[...Array(9)].map((_, i) => <rect key={i} x={308 + i * 17} y="300" width="2" height={i % 2 ? 8 : 13} fill="#202124" />)}
      <path d="M40 30 l30 -18 30 18" fill="none" stroke="#34A853" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
