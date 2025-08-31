# Guia Técnico do Projeto de Simulação SAP PM

## 1. Decisões de Arquitetura

A arquitetura deste projeto foi projetada para ser moderna, escalável e alinhada com as melhores práticas do ecossistema SAP BTP.

- **SAP CAP (Cloud Application Programming Model):** Escolhido como o framework principal para o desenvolvimento do backend. O CAP acelera o desenvolvimento de serviços OData e a criação de modelos de dados de forma eficiente e padronizada.
- **Fiori Elements:** Utilizado para a criação da interface do usuário. Fiori Elements permite a geração de UIs a partir de anotações no serviço OData, reduzindo a necessidade de código de UI customizado e garantindo a consistência com o design system da SAP.
- **SQLite (Desenvolvimento) / SAP HANA Cloud (Produção):** O projeto utiliza SQLite para o desenvolvimento local, facilitando a configuração e a prototipação rápida. Para produção, a recomendação é utilizar o SAP HANA Cloud para garantir a escalabilidade e a performance.
- **MCP (Model Context Protocol) Wrapper:** Um wrapper Node.js foi criado para expor os dados de manutenção através de um protocolo simplificado para agentes de IA. Isso desacopla a complexidade do OData e fornece uma API RESTful de fácil consumo.

## 2. Modelagem de Dados com CDS

O modelo de dados foi definido utilizando Core Data Services (CDS) no arquivo `db/schema.cds`.

- **Entidades:** A entidade principal é a `Orders`, que representa as ordens de manutenção. Ela contém campos como `ID`, `descr`, `priority`, `status`, etc.
- **Aspects:** O aspect `cuid` é utilizado para adicionar campos de controle padrão (criado em, criado por, modificado em, modificado por) às entidades.
- **Anotações:** Anotações de UI são utilizadas para enriquecer o modelo de dados com informações para a renderização do Fiori Elements. Por exemplo, `@UI.lineItem` e `@UI.selectionFields`.

## 3. Configuração do Fiori Elements

A aplicação Fiori Elements está localizada em `app/sap-pm-maintenance`. A configuração principal é feita através de anotações no arquivo `app/sap-pm-maintenance/annotations.cds` e no `manifest.json`.

- **Anotações:** As anotações definem a aparência e o comportamento da UI. Por exemplo, a anotação `@UI.lineItem` define as colunas que aparecem na lista de ordens.
- **`manifest.json`:** O `manifest.json` define as rotas, os serviços OData e outras configurações da aplicação Fiori.

## 4. Benefícios da Integração com MCP

A integração com o MCP (Model Context Protocol) através do wrapper Node.js (`mcp-wrapper/server.js`) oferece os seguintes benefícios:

- **Simplicidade:** Fornece uma API RESTful simples e intuitiva para o consumo de dados por agentes de IA, abstraindo a complexidade do protocolo OData.
- **Flexibilidade:** Permite a fácil integração com diferentes plataformas de IA e a criação de cenários de automação e análise de dados.
- **Desacoplamento:** O wrapper atua como uma camada de desacoplamento entre o serviço OData e os consumidores de dados, permitindo que o serviço OData evolua sem impactar os agentes de IA.

## 5. Possibilidades de Melhorias Futuras

- **Integração com SAP Workflow Management:** Adicionar um fluxo de aprovação para as ordens de manutenção.
- **Análise de Dados com SAP Analytics Cloud:** Criar dashboards e relatórios para analisar os dados de manutenção.
- **Integração com Machine Learning:** Utilizar algoritmos de machine learning para prever falhas de equipamentos e otimizar o planejamento da manutenção.
- **Expandir o modelo de dados:** Adicionar mais entidades como Equipamentos, Pontos de Medida, etc.

## 6. Estrutura do Código e Padrões Utilizados

O projeto segue a estrutura padrão de um projeto CAP:

- **`app/`:** Contém as aplicações Fiori Elements.
- **`db/`:** Contém o modelo de dados CDS.
- **`srv/`:** Contém a lógica de serviço e os handlers customizados.
- **`mcp-wrapper/`:** Contém o wrapper Node.js para o MCP.

Os padrões de código utilizados incluem:

- **Service Handlers:** Lógica de negócio customizada é implementada nos service handlers em `srv/service.js`.
- **Anotações de UI:** A aparência e o comportamento da UI são definidos através de anotações nos arquivos CDS.
- **RESTful API:** O wrapper MCP expõe uma API RESTful para o consumo de dados.
