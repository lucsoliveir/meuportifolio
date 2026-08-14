# BeWork — Site Institucional

Site institucional da **BeWork**, studio especializado em sites de alta performance, design exclusivo e alta conversão.

## 📁 Estrutura de arquivos

```
bework/
├── index.html                 # Página principal (HTML5 semântico)
├── vercel.json                 # Configuração de headers e deploy na Vercel
├── README.md                   # Este arquivo
└── assets/
    ├── css/
    │   └── style.css            # Design system completo (tokens, componentes, responsivo)
    ├── js/
    │   └── script.js             # Menu mobile, accordion, reveal on scroll, tilt 3D
    └── projects/
        ├── apex-performance.jpg  # Capa do projeto Apex Performance
        ├── alinea-studio.jpg     # Capa do projeto NailStudio
        └── pragtech.jpg          # Capa do projeto PragTech
```

## 🖼️ Portfólio: capturas reais + pop-up de pré-visualização

Cada card do portfólio (`Apex Performance`, `NailStudio` e `PragTech`) exibe a captura de tela real do site dentro de uma moldura de navegador (`browser-chrome`):

```
assets/projects/
├── apex-performance.jpg
├── alinea-studio.jpg
└── pragtech.jpg
```

**Pop-up de pré-visualização:** ao clicar em qualquer card (ou no link "Pré-visualizar"), abre um modal (`#preview-overlay` / `#preview-modal`) com a mesma captura em tamanho grande, título, descrição e um botão **"Visitar Site ao Vivo ↗"** que abre o link real do projeto em nova aba (Apex, NailStudio e PragTech).

O modal fecha ao clicar fora, no ✕, ou pressionando **Esc**, e mantém o foco preso dentro dele enquanto aberto (acessível via teclado).

### Trocar por novas capturas

1. Substitua os arquivos em `assets/projects/` (mantenha os mesmos nomes, ou ajuste os caminhos no `index.html` e no objeto `PROJECTS` em `assets/js/script.js`).
2. Recomenda-se capturas na proporção ampla (ex: 1900×920) para que o recorte `object-fit: cover` (que sempre alinha pelo topo da página) fique enquadrado corretamente tanto no card pequeno quanto no pop-up.

## 🎨 Identidade visual

| Papel | Valor |
|---|---|
| Fundo principal | `#0B0F17` |
| Superfícies / cards | `#161C28` / `#1E2638` |
| Texto principal | `#F8FAFC` |
| Texto secundário | `#94A3B8` / `#CBD5E1` |
| Accent principal (marca) | `#7C3AED` (Roxo Elétrico) |
| Accent de conversão (CTAs) | `#22C55E` (Verde Neon) + `#06B6D4` (Cyan) |
| Títulos | Sora |
| Corpo de texto | Inter |

## ⚙️ Funcionalidades implementadas

- Header fixo com `backdrop-filter` (glassmorphism) e menu hambúrguer responsivo.
- `scroll-margin-top` em todas as seções para o header fixo não cobrir os conteúdos.
- Hero com mockup 3D flutuante (glow neon + tags animadas).
- Grid de portfólio com 3 projetos, molduras de navegador (browser chrome) e hover com elevação.
- Seção de diferenciais e timeline "Como Funciona".
- Faixa marquee contínua + seção de CTA final com marca d'água "BEWORK" em baixa opacidade.
- FAQ em accordion acessível (`aria-expanded`, painéis animados).
- Botão flutuante do WhatsApp com animação de pulso.
- Reveal on scroll via `IntersectionObserver`.
- Suporte completo a `prefers-reduced-motion` (todas as animações são desativadas/reduzidas).
- Totalmente responsivo (desktop → tablet → mobile).

## 🔗 Links a personalizar antes de publicar

Busque por estes trechos no `index.html` e troque pelos dados reais da BeWork:

- Número de WhatsApp já configurado: `5521981668039`, com mensagem pré-definida "Olá! Quero fazer um orçamento de um site." em todos os botões (header, hero, CTA final e botão flutuante).
- `contato@bework.studio` → e-mail real de contato.
- Links de Instagram/LinkedIn no rodapé (atualmente `href="#"`).
- URL real de agendamento (Calendly, Google Calendar etc.) no botão "📅 Agendar Reunião" — hoje ele abre o WhatsApp por padrão.

## 🚀 Deploy (GitHub + Vercel)

1. Crie um repositório novo no GitHub e envie esta pasta:
   ```bash
   git init
   git add .
   git commit -m "BeWork site institucional"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/bework.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com), clique em **Add New → Project**.
3. Importe o repositório do GitHub.
4. Como é um projeto estático (sem build step), deixe **Framework Preset: Other**, **Build Command** e **Output Directory** em branco.
5. Clique em **Deploy** — o `vercel.json` já cuida dos headers de cache e segurança.

## ✅ Checklist pós-deploy

- [ ] Atualizar número de WhatsApp e e-mail.
- [ ] Conectar domínio próprio na Vercel.
- [ ] Configurar Meta Pixel / Google Analytics (mencionados na seção "Diferenciais").
