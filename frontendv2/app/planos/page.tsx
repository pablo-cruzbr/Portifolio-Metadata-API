"use client";

const WHATSAPP_NUMBER = "5511972523448";

function whatsappLink(plan: string) {
  const msg = encodeURIComponent(`Olá Pablo! Tenho interesse no ${plan}. Podemos conversar?`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

const plans = [
  {
    id: "premium",
    emoji: "🔥",
    badge: null,
    name: "Plano Premium",
    subtitle: "Criação + Suporte Mensal",
    setup: "R$ 600",
    setupLabel: "taxa de criação",
    monthly: "R$ 250",
    monthlyLabel: "/mês",
    highlight: false,
    features: [
      { label: "Criação da Landing Page", value: "Inclusa" },
      { label: "Hospedagem", value: "Inclusa — servidor profissional sem renovação manual" },
      { label: "Suporte Ativo", value: "Site 100% no ar + até 2 alterações de texto ou imagem/mês" },
      { label: "Segurança", value: "Backup mensal dos arquivos" },
    ],
  },
  {
    id: "business",
    emoji: "🚀",
    badge: null,
    name: "Plano Business Full",
    subtitle: "Gestão e Evolução",
    setup: "R$ 400",
    setupLabel: "taxa de criação facilitada",
    monthly: "R$ 300",
    monthlyLabel: "/mês",
    highlight: false,
    features: [
      { label: "Criação da Landing Page", value: "Inclusa" },
      { label: "Hospedagem", value: "Inclusa com certificado SSL" },
      { label: "Suporte VIP", value: "Alterações ilimitadas de textos e fotos + novos botões e formulários" },
      { label: "Relatório Mensal", value: "Dados de acesso da página todo mês" },
    ],
  },
  {
    id: "scale",
    emoji: "💎",
    badge: "Mais Vantajoso",
    name: "Plano Scale",
    subtitle: "Página + Sistema de Gestão",
    setup: "R$ 300",
    setupLabel: "taxa de criação reduzida",
    monthly: "R$ 450",
    monthlyLabel: "/mês",
    highlight: true,
    features: [
      { label: "Criação da Landing Page", value: "Inclusa" },
      { label: "Integração Total", value: "Conexão direta com o Software de Gestão" },
      { label: "O que o sistema faz", value: "Captura automática de leads, controle de vendas e relatórios em tempo real" },
      { label: "Hospedagem e Suporte", value: "Inclusos para a página e para o software, com atualizações de segurança" },
    ],
  },
];

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-[#050709] text-white">
      {/* Hero da página */}
      <section className="pt-32 pb-16 text-center px-6">
        <p className="text-[11px] font-mono uppercase tracking-widest text-cyan-500 mb-4">
          // serviços disponíveis
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          Escolha o plano{" "}
          <span className="text-cyan-400">ideal para você</span>
        </h1>
        <p className="mt-5 text-[#8B90A0] max-w-xl mx-auto text-[15px] leading-relaxed">
          Landing pages profissionais com hospedagem, suporte e evolução contínua.
          Tudo gerenciado por mim — você foca no seu negócio.
        </p>
      </section>

      {/* Cards dos planos */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-[#0A0C12] shadow-lg shadow-cyan-500/10"
                  : "border-white/10 bg-[#0A0C12] hover:border-white/20"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-cyan-500 text-black text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <span className="text-2xl">{plan.emoji}</span>
                <h2 className="mt-3 text-xl font-bold text-white">{plan.name}</h2>
                <p className="text-[12px] text-[#8B90A0] uppercase tracking-widest mt-1">{plan.subtitle}</p>
              </div>

              {/* Preço */}
              <div className="mb-8 pb-8 border-b border-white/[0.07]">
                <div className="flex items-end gap-1.5">
                  <span className="text-4xl font-bold text-white">{plan.setup}</span>
                  <span className="text-[#8B90A0] text-sm mb-1">{plan.setupLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`text-2xl font-semibold ${plan.highlight ? "text-cyan-400" : "text-white"}`}>
                    {plan.monthly}
                  </span>
                  <span className="text-[#8B90A0] text-sm">{plan.monthlyLabel}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-4 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex gap-3">
                    <span className="mt-0.5 w-4 h-4 shrink-0 flex items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/30">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-white/70 uppercase tracking-wide">{f.label}</p>
                      <p className="text-[13px] text-[#D7D9E0] mt-0.5 leading-relaxed">{f.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={whatsappLink(`${plan.name} ${plan.emoji}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.highlight
                    ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/30"
                    : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                }`}
              >
                <WhatsAppIcon />
                Falar pelo WhatsApp
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA geral no rodapé da página */}
      <section className="pb-24 px-6 text-center">
        <p className="text-[#8B90A0] text-sm">
          Dúvidas sobre qual plano escolher?{" "}
          <a
            href={whatsappLink("um de seus planos")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            Me chama no WhatsApp
          </a>{" "}
          e a gente conversa.
        </p>
      </section>
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
