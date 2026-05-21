import { Link } from 'react-router-dom';

const cards = [
  {
    to: '/mandala',
    internal: true,
    title: 'Mandala do Ecossistema Confrapag',
    sub: 'Visualização interativa do modelo de negócio — D3.js',
  },
  {
    to: '/prototipo-v1.html',
    internal: false,
    title: 'Protótipo V1 — Versão inicial',
    sub: 'confrapag-redesign-prototype.html',
  },
  {
    to: '/prototipo-v2.html',
    internal: false,
    title: 'Protótipo V2 — Versão refinada',
    sub: 'Confrapag_Site_Redesign_Prototipo.html',
  },
];

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Inter,sans-serif',
      maxWidth: 600,
      margin: '60px auto',
      padding: '0 20px',
      color: '#10104F',
    }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Confrapag — Sugestão de Redesign</h1>
      <p style={{ color: '#555', marginBottom: 32 }}>Protótipos para revisão da equipe de desenvolvimento.</p>

      {cards.map((c) =>
        c.internal ? (
          <Link
            key={c.to}
            to={c.to}
            style={cardStyle}
            onMouseEnter={e => applyHover(e, true)}
            onMouseLeave={e => applyHover(e, false)}
          >
            {c.title}
            <small style={{ color: '#888', fontWeight: 400, display: 'block', marginTop: 4 }}>{c.sub}</small>
          </Link>
        ) : (
          <a
            key={c.to}
            href={c.to}
            target="_blank"
            rel="noreferrer"
            style={cardStyle}
            onMouseEnter={e => applyHover(e, true)}
            onMouseLeave={e => applyHover(e, false)}
          >
            {c.title}
            <small style={{ color: '#888', fontWeight: 400, display: 'block', marginTop: 4 }}>{c.sub}</small>
          </a>
        )
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  display: 'block',
  padding: '16px 20px',
  marginBottom: 12,
  background: '#f4f6ff',
  border: '2px solid #10104F',
  borderRadius: 8,
  color: '#10104F',
  textDecoration: 'none',
  fontWeight: 700,
  transition: 'background .15s, color .15s',
};

function applyHover(e: React.MouseEvent<HTMLElement>, on: boolean) {
  const el = e.currentTarget as HTMLElement;
  el.style.background = on ? '#10104F' : '#f4f6ff';
  el.style.color = on ? '#11EF61' : '#10104F';
}
