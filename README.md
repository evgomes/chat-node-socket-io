# Realtime Chat

Aplicação simples de chat desenvolvida em Node.js, utilizando Socket.IO para funcionalidade de troca de mensagens em tempo real.

Foi desenvolvida como estudo de Node.js e tecnologias relacionadas para aplicações web.

![Chat](https://raw.githubusercontent.com/evgomes/chat-node-socket-io/master/images/chat.png "Chat")

## Principais tecnologias utilizadas
- [Express.js](https://expressjs.com/pt-br/) (framework para desenvolvimento web com Node.js);
- [Handlebars.js](https://handlebarsjs.com/) (view engine para desenvolver a camada de front-end);
- [Socket.IO](https://socket.io/) (funcionalidades de tempo real do chat);
- [Mongoose](https://mongoosejs.com/) (ORM para utilização com MongoDB);
- [Bootstrap](https://getbootstrap.com/) (framework CSS);
- [Axios](https://github.com/axios/axios) (requisições HTTP);
- [Moment.js](https://momentjs.com/) (manipulação de datas).

## Como testar

Como pré-requisitos, é necessário instalar o [Node.js](https://nodejs.org/en/download/) na última versão LTS, bem como o [MongoDB](https://www.mongodb.com/), para gravar os dados de usuários no banco de dados.

Com essas aplicações instaladas, abra o terminal ou prompt de comando (dependendo do sistema operacional utilizado) na pasta da aplicação. Em seguida, execute os seguintes comandos, em sequência:

```
npm install
npm run start
```

**Observação:** pode ser necessário utilizar `sudo` para instalar as dependências caso esteja usando Linux ou MacOS.

Após executar esses comandos, navegue  para `http://localhost:3000/`para visualizar a tela inicial da aplicação.

## Limitações

Como a aplicação foi desenvolvida com o intuito de apresentar as capacidades do Node.JS a novos desenvolvedores, a aplicação possui um escopo bem limitado, contendo apenas o básico para funcionamento do chat.

Algumas bibliotecas são importadas de CDNs diretamente nas views ou foram incluídas manualmente na pasta do projeto. Podem haver bugs de utilização e de segurança, então utilize a aplicação apenas para fins educativos.

Futuramente será desenvolvida uma nova versão corrigindo todos esses problemas utilizando um framework front-end adequado, bem como será adotada uma arquitetura melhor para a aplicação, possivelmente desenvolvida utilizando TDD.
