# FC Clean Architecture

## Rodando os Testes

### Pré-requisitos

- Node.js >= 14
- npm

### Instalação

```bash
npm install
```

### Executar todos os testes

```bash
npm test
```

### Executar apenas os testes da entidade Customer

```bash
npx jest src/domain/customer/entity/customer.spec.ts
```

### Executar apenas os testes da entidade Product

```bash
npx jest src/domain/product/entity/product.spec.ts
```

### Executar todos os testes de domínio

```bash
npx jest src/domain
```

