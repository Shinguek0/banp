# Banp refractoring

Projeto de Clean Code, refatorando um projeto antigo

Grupo: ```Vinicius Albino``` e ```Vitor Minatto```

Repositorio: https://github.com/Shinguek0/banp

---

# 🛠️ Requisitos e Como Rodar o Projeto

Este projeto possui um **back-end** (rodando em Node.js + Docker) e um **front-end** (rodando com Expo).  
Além disso, o repositório já está integrado com **ESLint** e **Prettier** para manter a qualidade do código.

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (recomendado: versão 18 ou superior).
- [Docker Desktop](https://www.docker.com/) instalado e com **login no Docker Hub**.
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) para gerenciar dependências.

---

## 🐳 Como Rodar o Back-end

1. Abra o terminal e navegue até o diretório do back-end:

    ```
    cd backend
    ```

2. Inicie os serviços do Docker:

    ```
    docker compose up
    ```

    💡 **Observação:**  
    Para isso, o Docker Desktop precisa estar rodando e você deve estar logado no Docker Hub.

3. Instale as dependências do Node:

    ```
    npm install
    ```

4. Inicie o back-end em modo desenvolvimento:

    ```
    npm run start:dev
    ```

---

## 📱 Como Rodar o Front-end

1. Abra o terminal e navegue até o diretório do front-end:

    ```
    cd frontend
    ```

2. Instale as dependências:

    ```
    npm install
    ```

3. Inicie o Expo:

    ```
    npx expo start
    ```

---

## 🎨 ESLint + Prettier

Este projeto usa **ESLint** e **Prettier** para manter a padronização e qualidade do código.

- Para rodar o ESLint localmente e ver erros:

    ```
    npx eslint .
    ```

- Para rodar o Prettier e formatar o projeto:

    ```
    npx prettier --write .
    ```

---

# Suggestão de uso da interface fluente

No arquivo `front/src/app/(banp)/home.tsx` 

Poderia ser implementada uma interface fluente no trecho de codigo
``` 
// Em vez de:
Animated.timing(glowAnim, {
  toValue: 1,
  duration: GLOW_DURATION.IN,
  useNativeDriver: false
})

// Poderia ser:
AnimationBuilder.create(glowAnim)
  .to(1)
  .duration(GLOW_DURATION.IN)
  .withoutNativeDriver()
  .build()
```
---

### **1. Metodo com muitas responsabilidades**

* **Exemplo**: `src/app/(setup)/profile.tsx`
* **Princípio de Clean Code**: **Princípio da Responsabilidade Única (SRP)**
* **Ação**:

  * Dividir o arquivo em funções menores e independentes, cada uma responsável por uma tarefa específica.

---

### **2. Números Mágicos**

* **Problema**: Números mágicos dificultam a compreensão e manutenção do código.
* **Ação Sugerida**:

  * Definir uma constante nomeada:

    ```ts
    const DEFAULT_TEN_SECONDS_TIMEOUT = 10000;
    ```
  * Substituir o valor direto pelo nome da constante:

    ```ts
    const api: AxiosInstance = axios.create({
      baseURL: 'http://192.168.7.10:3000/api',
      timeout: DEFAULT_TEN_SECONDS_TIMEOUT,
      headers: { 'Content-Type': 'application/json' }
    });
    ```

---

### **3. Condicionais agrupadas em execesso**

* **Exemplo**: `src/components/Steps/index.tsx`
* **Problema**: Condicionais muito aninhadas tornam o código difícil de ler e entender.
* **Ação**:

  * Extrair a lógica de cor do gradiente para uma função separada:

    ```ts
    const getConnectorColors = (
      current: Step,
      next: Step | undefined,
      selectedStepId: string
    ): string[] => {
      const isCompletedAndNextIsCompleted = current.isCompleted && next?.isCompleted;
      const isCompletedAndNextIsSelected = current.isCompleted && next?.id === selectedStepId;
      const isSelectedAndNextIsDefault = current.id === selectedStepId && !next?.isCompleted;
      const isDefaultAndNextIsDefault = !current.isCompleted && !isSelectedAndNextIsDefault;

      if (isCompletedAndNextIsCompleted) return [theme.colors.functional.success.bg, theme.colors.functional.success.bg];
      if (isCompletedAndNextIsSelected) return [theme.colors.functional.success.bg, theme.colors.primary[300]];
      if (isSelectedAndNextIsDefault) return [theme.colors.primary[300], theme.colors.neutral[500]];
      if (isDefaultAndNextIsDefault) return [theme.colors.neutral[500], theme.colors.neutral[500]];
      return [theme.colors.primary[300], theme.colors.primary[300]];
    };
    ```
  * E dentro do JSX:

    ```tsx
    <LinearGradient
      colors={getConnectorColors({ id, icon, isCompleted }, steps[index + 1], selectedStepId)}
      start={[0, 1]}
      end={[1, 0]}
      style={styles.connector}
    />
    ```

---

### **4. Código Duplicado**

* **Problema**: Trechos repetidos dificultam manutenção
* **Ação**:

  * Identificar padrões de repetição em componentes, funções ou estruturas condicionais.
  * Extrair para funções utilitárias ou componentes reutilizáveis.

---

#### **Ferramentas**

* **Função**: Ferramenta de linting para analisa do código.
* **Benefícios**:
  * Enforce regras de estilo e boas práticas.
  * Detecta erros de lógica e código redundante.

* **Instalação**:

  ```bash
  npm install eslint --save-dev
  npx eslint --init