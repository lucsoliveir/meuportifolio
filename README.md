# BeWork — Site (versão pronta para deploy)

Este pacote contém a versão **standalone** do site: um único `index.html` com todo o CSS, JavaScript e as imagens do portfólio já embutidos dentro dele. Não existe pasta `assets/` nem nenhum outro arquivo do qual ele dependa — por isso não tem como o estilo "sumir" por causa de um caminho de pasta que não subiu no deploy.

## Como publicar na Vercel

**Opção A — Arrastar e soltar (mais rápido):**
1. Entre em [vercel.com](https://vercel.com) e faça login.
2. Clique em **Add New → Project**.
3. Escolha a opção de enviar arquivos/pasta manualmente (ou arraste esta pasta extraída do zip direto para a área de upload).
4. Deixe **Framework Preset: Other**, sem build command. Clique em **Deploy**.

**Opção B — Via GitHub:**
1. Suba o conteúdo deste zip (`index.html` e `vercel.json`) para um repositório novo no GitHub.
2. Na Vercel, **Add New → Project → Import** o repositório.
3. Framework: Other, sem build command. Deploy.

## Por que isso resolve o problema

O site "sem estilo" que apareceu antes acontecia porque o navegador carregava o `index.html`, mas não conseguia encontrar o `assets/css/style.css` (o CSS ficou de fora do deploy, por isso a página aparecia toda branca/sem formatação). Nesta versão, o CSS e o JS estão dentro do próprio HTML — não tem arquivo separado pra "sumir".

## Importante: editar o conteúdo depois

Como tudo está em um arquivo só, ele é ótimo para publicar sem erros, mas **mais difícil de editar** (é um HTML grande com CSS/JS misturados). Se no futuro você quiser trocar textos, cores ou trocar as imagens do portfólio com mais facilidade, me avise que eu gero de novo a versão "separada em pastas" (mais organizada para edição) — só é preciso ter cuidado extra na hora do deploy para garantir que a pasta `assets/` suba junto.

## Links a personalizar

Antes de divulgar, procure e substitua no `index.html`:
- `https://wa.me/5500000000000` → seu WhatsApp real.
- `contato@bework.studio` → seu e-mail real.
- URL do botão "📅 Agendar Reunião" (hoje abre o WhatsApp por padrão).
