#  SAP Plant Maintenance Portfolio Project (CAP + Fiori + MCP) SAP

![SAP BTP](https://img.shields.io/badge/SAP%20BTP-0092D2?style=for-the-badge&logo=sap&logoColor=white)
![SAP Fiori](https://img.shields.io/badge/SAP%20Fiori-F7B500?style=for-the-badge&logo=sap&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)


## Sobre o Projeto

Este projeto é um portfólio que simula um cenário de Manutenção de Planta (Plant Maintenance) utilizando o SAP Cloud Application Programming Model (CAP) e Fiori Elements. O objetivo é demonstrar a criação de um aplicativo full-stack moderno no ecossistema SAP BTP, com foco em processos de negócios do módulo PM.

O projeto também inclui um wrapper MCP (Model Context Protocol) para expor os dados de manutenção para agentes de IA, permitindo a interação com os dados de forma programática.

## Funcionalidades

- Visualização de Ordens de Manutenção
- Filtragem de Ordens por prioridade e status
- UI moderna com Fiori Elements
- Serviço OData V4 com CAP
- Wrapper MCP para integração com IA

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap/)
- [Conta no SAP BTP](https://www.sap.com/products/business-technology-platform.html)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/sap-pm-portfolio.git
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
cds watch
```

## Screenshots

_(Placeholder para screenshot da lista de ordens)_

_(Placeholder para screenshot do detalhe da ordem)_

## Deploy no SAP BTP

1. Build do projeto:

```bash
cds build --production
```

2. Build do MTAR:

```bash
mbt build -s . -p default -t mta_archives
```

3. Deploy para o Cloud Foundry:

```bash
cf deploy mta_archives/*.mtar
```

## Demo Online

[Link para a demo online](https://seu-link-para-a-demo.com)