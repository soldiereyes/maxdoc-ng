# MaxDoc - Frontend

## Descrição do Projeto

O frontend do MaxDoc é uma aplicação desenvolvida com **Angular** para o gerenciamento de documentos. A interface permite criar, visualizar, editar, excluir, e gerenciar versões de documentos, além de alterar suas fases.

## Tecnologias Utilizadas

- Angular 15+
- Angular Material
- TypeScript
- HTML5 e CSS3

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/maxdoc-ng.git
   cd maxdoc-ng
   
2. Instale as Dependências do Projeto
Use node 18!

  ```bash
      npm install
```

3. Execute o Projeto
   ```bash
   ng serve


## Integração com o Backend

Certifique-se de que o backend está em execução no endereço: http://localhost:8080. A aplicação está configurada para consumir os endpoints diretamente deste endereço.


## Funcionalidades

- Listagem de Documentos: Exibe todos os documentos cadastrados em uma tabela interativa.
- Adicionar Documento: Abre um diálogo para cadastrar novos documentos.
- Editar Documento: Permite alterar os campos de documentos na fase Minuta.
- Excluir Documento: Remove documentos do sistema.
- Alterar Fase: Oferece um menu para transitar entre as fases Minuta, Revisão, e Finalizado.
- Criar Nova Versão: Gera uma nova versão para documentos na fase Vigente.


## Endpoints Consumidos

- GET /api/documents: Exibe todos os documentos na tabela.
- POST /api/documents: Adiciona um novo documento.
- PATCH /api/documents/{id}/phase: Altera a fase de um documento.
- POST /api/documents/{id}/new-version: Cria uma nova versão de um documento.
- DELETE /api/documents/{id}: Exclui um documento.
