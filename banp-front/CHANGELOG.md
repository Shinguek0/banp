# 📦 Projeto BANP - CHANGELOG.md

---

## 📁 home.tsx

- Extração de componentes para melhorar a organização e reutilização:
  - `UserProfile`: encapsula a renderização dos perfis dos usuários.
  - `ActionButtons`: lida com os botões de like/dislike e suas animações.
- Criação de hooks personalizados para isolar e reutilizar lógica:
  - `useAuth`: gerenciamento de autenticação e recuperação do token.
  - `useRecommendations`: lógica de busca e navegação entre recomendações.
  - `useGlowAnimation`: encapsula a lógica de animação de glow para o perfil em destaque.
- Implementação de animações com `MotiView` e `AnimatePresence` para transições suaves entre perfis.
- Introdução do componente `ActionButton` para evitar repetição de código nos botões de ação.
- Inclusão do componente `NoContent` para lidar com o estado em que não há recomendações disponíveis.

---

## 📁 logout.tsx

- Criação do componente de logout com redirecionamento para a tela de login ao remover o token de autenticação.
- Extração da rota de redirecionamento (`SIGN_IN_ROUTE`) para uma constante reutilizável.
- Renomeação da função `signOut` para `performSignOut` para melhor expressividade.

---

## 📁 match.tsx

- Criação de hooks personalizados para encapsular lógica específica:
  - `useMatches`: gerencia o estado da lista de matches e busca inicial.
  - `useSearch`: lida com a lógica da busca por usuários.
  - `useClipboard`: fornece funcionalidade para copiar o ID do usuário.
- Extração de componentes para melhorar a modularização:
  - `MatchItem`: renderiza individualmente cada match na lista.
  - `SearchHeader`: barra de busca reutilizável com botão de voltar.
  - `EmptyState`: componente para exibir quando não houver resultados.
  - `PageHeader`: encapsula o cabeçalho da tela.
- Uso de `FlashList` para melhor performance ao exibir listas grandes.
- Extração de mensagens de erro e textos fixos para constantes (`APP_TEXT`), promovendo reutilização e facilitando tradução.
- Adição de animações com `MotiView` para melhorar a experiência do usuário.
- Refatoração da renderização da lista com uma função nomeada (`renderMatchItem`) para melhorar legibilidade.

---

## 📁 index.tsx

- Criação de hooks personalizados para organizar lógica de carregamento de fontes e navegação:
  - `useFontLoader`: verifica se as fontes estão prontas.
  - `useNavigation`: encapsula a navegação para outras rotas.
- Extração de componentes visuais para facilitar reutilização:
  - `LogoSection`: exibe a logo do app.
  - `MainContent`: renderiza o conteúdo principal com título e subtítulo.
  - `BackgroundOverlay`: aplica o gradiente e sobreposição de imagem.
  - `ContentSection`: organiza a seção de botões.
- Extração de textos e rotas para constantes (`APP_TEXT`, `ROUTES`) para facilitar manutenção e tradução.
- Criação de constantes visuais como `LOGO_SIZE` e `GRADIENT_COLORS` para promover consistência.

### Improved

- Organização geral do arquivo, separando melhor responsabilidades visuais e de navegação.

---

## 📁 signin.tsx

- Extração da lógica de navegação para uma função separada (`navigateAfterSignIn`), melhorando a clareza do fluxo.
- Uso de constantes para rotas e textos fixos (`ROUTES`, `APP_TEXT`) para facilitar futuras alterações.
- Padronização do tamanho da logo com uma constante (`LOGO_SIZE`).
- Inclusão de verificação de token de autenticação com `useAuth`, redirecionando caso o usuário já esteja logado.

### Improved

- Separação clara entre lógica de apresentação e lógica de autenticação.

---

## 📁 signup.tsx

- Isolamento da lógica de validação dos campos em uma função (`handleValidation`) para melhorar a legibilidade.
- Utilização de `useAuth` para gerenciar autenticação e cadastro.
- Extração de textos fixos e rotas para constantes (`APP_TEXT`, `LOGO_SIZE`, `MARGIN_BOTTOM`) para promover consistência.
- Uso de `ref` para avançar o foco entre campos, melhorando a experiência do usuário.

### Improved

- Validação simplificada e reaproveitamento de lógica com constantes reutilizáveis.

---

## 📁 profile.tsx

- Agrupamento de estados relacionados ao formulário em um único estado (`profileData`) para facilitar manipulação.
- Criação de funções nomeadas para cada etapa da submissão de dados:
  - `handleProfileSubmit`, `handleGameSubmit`, `handleQuizSubmit`.
- Inclusão de `useCallback` para otimizar renderizações.
- Utilização de `async/await` com `try/catch` para manipular erros nas requisições.
- Uso de `KeyboardAvoidingView` e `ScrollView` para melhor experiência em dispositivos móveis.
- Extração de constantes como `IMAGE_SIZE`, `SPACING` e `TEXT` para padronizar estilos e mensagens.
- Organização da renderização em função separada (`renderStep()`) para maior clareza e modularidade.

---
