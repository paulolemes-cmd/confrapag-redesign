import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

interface Segment {
  name: string;
  desc: string;
}

interface RingConfig {
  label: string;
  iR: number;
  oR: number;
  gap: number;
  colors: string[];
  tColor: string;
  fontSize: number;
  fontWeight: string;
  segs: Segment[];
}

const RINGS: RingConfig[] = [
  {
    label: 'Plataformas\nProprietárias',
    iR: 80, oR: 152, gap: 5,
    colors: ['#10104F', '#192878', '#10104F', '#192878', '#10104F'],
    tColor: '#11EF61', fontSize: 9, fontWeight: '800',
    segs: [
      { name: 'ConfraHub',    desc: 'Hub central de gestão unificada de licenciados e White Labels, integrando todas as ferramentas da plataforma em um único ambiente.' },
      { name: 'ConfraSystem', desc: 'Sistema de backoffice com gestão operacional completa: cadastros, relatórios, conciliação e controle total de ECs e terminais.' },
      { name: 'ConfraSplit',  desc: 'Motor proprietário de split de pagamentos com liquidação automática e precisa entre múltiplos recebedores — base do modelo de subadquirência.' },
      { name: 'ConfraPix',   desc: 'Solução completa de PIX integrada: cash-in, cash-out e pagamentos digitais conectados à infraestrutura WeQi e ao BACEN.' },
      { name: 'Pulse',       desc: 'Portal 360° do licenciado: metas, comissões, performance de terminais, campanhas e visão completa do negócio em tempo real.' },
    ],
  },
  {
    label: 'Infraestrutura\nTecnológica',
    iR: 157, oR: 238, gap: 5,
    colors: ['#1AAE5C', '#12923E', '#1AAE5C', '#12923E'],
    tColor: '#fff', fontSize: 10, fontWeight: '700',
    segs: [
      { name: 'WeQi',                  desc: 'Parceiro tecnológico exclusivo. Infraestrutura 100% em nuvem (AWS + Cloudflare) para captura, processamento e liquidação — sem estrutura física.' },
      { name: 'Adquirência\nMulti-Bandeira', desc: 'Múltiplos adquirentes e bandeiras homologadas (ADIQ, Celcoin). API única com ISO 8583, EMV, Dual Message e Single Message para todos os terminais.' },
      { name: 'BaaS · Celcoin',        desc: 'Banking as a Service via Celcoin: contas digitais, PIX, emissão de cartões e produtos financeiros embarcados. Celcoin homologada na Núclea como Instituição de Domicílio, Emissora e Liquidante.' },
      { name: 'Subadquirência',        desc: 'Infraestrutura completa para subadquirentes com split de recebíveis implantado, dupla portabilidade multi-fornecedor e canal proprietário de vendas.' },
    ],
  },
  {
    label: 'Operações\ndo Canal',
    iR: 243, oR: 320, gap: 5,
    colors: ['#0FA89E', '#0C887F', '#0FA89E', '#0C887F'],
    tColor: '#fff', fontSize: 10, fontWeight: '700',
    segs: [
      { name: 'BackOffice\nUnificado',      desc: 'Central de operações com gestão de chamados, suporte técnico e operacional integrado para todo o canal — um único ponto de contato para LAs e WLs.' },
      { name: 'Logística\nCentralizada',    desc: 'Gestão centralizada de terminais POS em todo o Brasil: manutenção, troca, suprimentos (chips), desassociação e logística reversa.' },
      { name: 'Tecnologia\n& Suporte WeQi', desc: 'API de transação e conciliação assertiva: dados direto do terminal conciliados com a liquidação. Resolução de problemas em todos os modelos de terminais.' },
      { name: 'Comercial\nPróximo',         desc: 'Time dedicado de relacionamento com licenciados e WLs: blindagem comercial, prevenção ao descredenciamento e inteligência de vendas por carteira.' },
    ],
  },
  {
    label: 'Estratégia\nde Crescimento',
    iR: 325, oR: 398, gap: 5,
    colors: ['#1080CC', '#0C63A3', '#1080CC', '#0C63A3'],
    tColor: '#fff', fontSize: 10, fontWeight: '700',
    segs: [
      { name: 'Controladoria\n& Financeiro', desc: 'Controladoria e financeiro unificados: tarifas, comissões, repasses e inteligência financeira em único banco de dados — informações estratégicas para toda a marca.' },
      { name: 'Marketing\nEstratégico',      desc: 'Campanhas padronizadas, geração de leads contínua, apresentações semanais do modelo e distribuição de oportunidades comerciais para toda a rede.' },
      { name: 'Plano de\nCarreira',          desc: 'Estrutura de evolução dos licenciados dentro do ecossistema Confrapag: metas, reconhecimento e trilha de crescimento profissional e financeiro.' },
      { name: 'Expansão\nValidada',          desc: 'Modelo de expansão testado: onboarding de ECs e LAs com KYC unificado e ativação comercial acelerada — independência completa no canal, sem descredenciamento abrupto.' },
    ],
  },
  {
    label: 'Comunidade\n& Educação',
    iR: 403, oR: 492, gap: 4,
    colors: ['#0B3D8A', '#092F6B', '#0B3D8A', '#092F6B', '#0B3D8A', '#092F6B', '#0B3D8A'],
    tColor: '#11EF61', fontSize: 9, fontWeight: '700',
    segs: [
      { name: 'Universidade\nConfrapag', desc: 'Transferência de know-how escalável com conteúdos dinâmicos, cursos e capacitação completa distribuída em todo o Brasil — tudo que o licenciado precisa para crescer.' },
      { name: 'Convenção\nAnual',        desc: 'Maior evento do canal: reconhecimento dos melhores licenciados, estratégia, networking e lançamentos para toda a rede associada.' },
      { name: 'Confra+',                 desc: 'Programa de benefícios e vantagens exclusivas para licenciados Confrapag de alto desempenho.' },
      { name: 'Paulo Por Aí',            desc: 'Presença do CEO em visitas regionais por todo o Brasil, fortalecendo a cultura e o relacionamento direto com cada licenciado.' },
      { name: 'Regionais',               desc: 'Eventos regionais de conexão, capacitação e alinhamento estratégico distribuídos pelo Brasil — proximidade com a rede local.' },
      { name: 'Comunicados',             desc: 'Canal oficial de comunicação com a rede: atualizações regulatórias, avisos comerciais e novidades em tempo real.' },
      { name: 'Lives\nSemanais',         desc: 'Lives semanais com conteúdo estratégico, apresentação de produtos, cases de sucesso e atualização contínua para toda a rede.' },
    ],
  },
];

const LEGEND = [
  { color: '#10104F', label: 'Plataformas Proprietárias' },
  { color: '#1AAE5C', label: 'Infraestrutura Tecnológica' },
  { color: '#0FA89E', label: 'Operações do Canal' },
  { color: '#1080CC', label: 'Estratégia de Crescimento' },
  { color: '#0B3D8A', label: 'Comunidade & Educação' },
];

export default function Mandala() {
  const chartRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const tipNameRef = useRef<HTMLDivElement>(null);
  const tipRingRef = useRef<HTMLDivElement>(null);
  const tipDescRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartRef.current;
    if (!container || !tipRef.current || !tipNameRef.current || !tipRingRef.current || !tipDescRef.current) return;

    const tip = tipRef.current!;
    const tipName = tipNameRef.current!;
    const tipRing = tipRingRef.current!;
    const tipDesc = tipDescRef.current!;

    d3.select(container).selectAll('*').remove();

    const W = 960, H = 960, CX = W / 2, CY = H / 2;

    const svg = d3.select(container).append('svg')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width', '100%')
      .style('max-height', '92vh');

    const defs = svg.append('defs');

    const bgGrad = defs.append('radialGradient').attr('id', 'bgg');
    bgGrad.append('stop').attr('offset', '0%').attr('stop-color', '#D8E4FF').attr('stop-opacity', '0.6');
    bgGrad.append('stop').attr('offset', '100%').attr('stop-color', '#F0F4FF').attr('stop-opacity', '0');
    svg.append('circle').attr('cx', CX).attr('cy', CY).attr('r', 510).attr('fill', 'url(#bgg)');

    const G = svg.append('g').attr('transform', `translate(${CX},${CY})`);

    function showTip(evt: MouseEvent, seg: Segment, ringLabel: string) {
      tipName.textContent = seg.name.replace(/\n/g, ' ');
      tipRing.textContent = ringLabel.replace(/\n/g, ' ');
      tipDesc.textContent = seg.desc;
      tip.style.display = 'block';
      positionTip(evt);
    }

    function positionTip(evt: MouseEvent) {
      const x = evt.clientX + 18, y = evt.clientY - 12;
      const tipW = 308;
      tip.style.left = (x + tipW > window.innerWidth ? x - tipW - 36 : x) + 'px';
      tip.style.top = Math.max(8, y) + 'px';
    }

    function hideTip() { tip.style.display = 'none'; }

    svg.on('mousemove', (evt: MouseEvent) => { if (tip.style.display === 'block') positionTip(evt); });

    RINGS.forEach((ring) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pie = (d3.pie() as any).value(1).padAngle(0.028).sort(null)(ring.segs);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arc = (d3.arc() as any).innerRadius(ring.iR).outerRadius(ring.oR).cornerRadius(5);
      const rg = G.append('g');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pie.forEach((d: any, i: number) => {
        rg.append('g').attr('class', 'seg')
          .append('path')
          .attr('d', arc(d))
          .attr('fill', ring.colors[i % ring.colors.length])
          .attr('stroke', 'rgba(240,244,255,0.7)')
          .attr('stroke-width', 1.5)
          .style('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))')
          .style('cursor', 'pointer')
          .on('mousemove', (evt: MouseEvent) => showTip(evt, d.data, ring.label))
          .on('mouseleave', hideTip);
      });

      const lh = ring.fontSize + 2;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pie.forEach((d: any) => {
        const mid = (d.startAngle + d.endAngle) / 2;
        const [bx, by] = arc.centroid(d);
        const rotateDeg = (mid * 180 / Math.PI) - 90;
        const flip = mid > Math.PI ? 180 : 0;
        const finalRot = rotateDeg + flip;

        const tg = G.append('g')
          .attr('transform', `translate(${bx},${by}) rotate(${finalRot})`)
          .attr('pointer-events', 'none');

        const lines = d.data.name.split('\n');
        const totalH = (lines.length - 1) * lh;

        lines.forEach((line: string, li: number) => {
          tg.append('text')
            .attr('x', 0)
            .attr('y', -totalH / 2 + li * lh)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', ring.tColor)
            .attr('font-size', ring.fontSize)
            .attr('font-weight', ring.fontWeight)
            .attr('font-family', 'Inter,sans-serif')
            .attr('letter-spacing', '0.2px')
            .text(line);
        });
      });
    });

    RINGS.forEach(r => {
      G.append('circle').attr('r', r.iR - 2).attr('fill', 'none').attr('stroke', 'rgba(240,244,255,0.9)').attr('stroke-width', 5);
      G.append('circle').attr('r', r.oR + 2).attr('fill', 'none').attr('stroke', 'rgba(240,244,255,0.9)').attr('stroke-width', 5);
    });

    const cR = 78;
    const cGrad = defs.append('radialGradient').attr('id', 'cg').attr('cx', '38%').attr('cy', '32%');
    cGrad.append('stop').attr('offset', '0%').attr('stop-color', '#2235A8');
    cGrad.append('stop').attr('offset', '100%').attr('stop-color', '#0A0E3F');

    G.append('circle').attr('r', cR + 6).attr('fill', 'rgba(17,239,97,0.12)').style('filter', 'blur(6px)');
    G.append('circle').attr('r', cR).attr('fill', 'url(#cg)').attr('stroke', '#11EF61').attr('stroke-width', '1.5').style('filter', 'drop-shadow(0 4px 20px rgba(16,16,79,0.45))');
    G.append('circle').attr('r', cR - 12).attr('fill', 'none').attr('stroke', 'rgba(17,239,97,0.35)').attr('stroke-width', '1').attr('stroke-dasharray', '4,4');

    const centerLines = [
      { text: 'CONFRAPAG',           y: -20, size: 13,  weight: '900', color: '#11EF61',                  spacing: '2px' },
      { text: 'Ecossistema de',      y: -3,  size: 8.5, weight: '500', color: 'rgba(255,255,255,0.75)',    spacing: '0.3px' },
      { text: 'Meios de Pagamentos', y: 9,   size: 8.5, weight: '500', color: 'rgba(255,255,255,0.75)',    spacing: '0.3px' },
      { text: 'Brasil',              y: 28,  size: 9,   weight: '700', color: '#17BFB9',                   spacing: '1px' },
    ];
    centerLines.forEach(l => {
      G.append('text')
        .attr('x', 0).attr('y', l.y)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .attr('fill', l.color).attr('font-size', l.size).attr('font-weight', l.weight)
        .attr('font-family', 'Inter,sans-serif').attr('letter-spacing', l.spacing)
        .text(l.text);
    });

    RINGS.forEach((ring) => {
      const midR = (ring.iR + ring.oR) / 2;
      const label = ring.label.replace(/\n/g, ' ');
      const badgeY = -midR;
      const bw = label.length * 4.8 + 12;
      const bh = 13;

      G.append('rect')
        .attr('x', -bw / 2).attr('y', badgeY - bh / 2)
        .attr('width', bw).attr('height', bh)
        .attr('rx', 6).attr('ry', 6)
        .attr('fill', 'rgba(240,244,255,0.88)')
        .attr('stroke', 'rgba(200,210,240,0.7)').attr('stroke-width', '1')
        .attr('pointer-events', 'none');

      G.append('text')
        .attr('x', 0).attr('y', badgeY)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .attr('fill', '#10104F').attr('font-size', '7').attr('font-weight', '800')
        .attr('font-family', 'Inter,sans-serif').attr('letter-spacing', '0.8px')
        .attr('pointer-events', 'none')
        .text(label.toUpperCase());
    });

    G.style('opacity', '0')
      .style('transform-origin', 'center center')
      .style('transform', 'scale(0.88)')
      .transition().duration(900).ease(d3.easeCubicOut)
      .style('opacity', '1')
      .style('transform', 'scale(1)');

    return () => {
      d3.select(container).selectAll('*').remove();
    };
  }, []);

  return (
    <div style={{
      fontFamily: 'Inter,sans-serif',
      background: 'linear-gradient(160deg,#EEF2FF 0%,#F5F8FF 50%,#EAF9F8 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '28px 16px 48px',
    }}>
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: 16, fontSize: 13, color: '#10104F', textDecoration: 'none', fontWeight: 600 }}>
        ← Voltar
      </Link>

      <div style={{ fontSize: 21, fontWeight: 900, color: '#10104F', textAlign: 'center', marginBottom: 5, letterSpacing: '-0.4px', lineHeight: 1.2 }}>
        O Ecossistema do Maior Canal Independente de Meios de Pagamentos do Brasil
      </div>
      <div style={{ fontSize: 13, color: '#7788AA', textAlign: 'center', marginBottom: 20, fontWeight: 500 }}>
        Passe o mouse sobre cada segmento para ver a descrição completa · Confrapag · 2026
      </div>

      <div ref={chartRef} style={{ width: '100%', maxWidth: 960 }} />

      {/* Tooltip — updated via DOM refs, not React state */}
      <div ref={tipRef} style={{
        position: 'fixed',
        display: 'none',
        background: '#0D1240',
        color: '#fff',
        borderRadius: 12,
        padding: '15px 18px',
        maxWidth: 290,
        fontSize: 13,
        lineHeight: 1.6,
        zIndex: 999,
        boxShadow: '0 12px 40px rgba(0,0,0,.28)',
        pointerEvents: 'none',
        border: '1px solid rgba(255,255,255,.08)',
      }}>
        <div ref={tipNameRef} style={{ fontSize: 15, fontWeight: 800, color: '#11EF61', marginBottom: 6, lineHeight: 1.25 }} />
        <div ref={tipRingRef} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', color: '#17BFB9', textTransform: 'uppercase', marginBottom: 8 }} />
        <div ref={tipDescRef} style={{ fontSize: 12.5, color: '#D0D8F0', lineHeight: 1.55 }} />
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
        {LEGEND.map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, color: '#445' }}>
            <div style={{ width: 13, height: 13, borderRadius: 3, background: l.color, flexShrink: 0 }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
