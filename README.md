# AML Airlines

Este é um sistema feito em Node.js, utilizando Typescript para simular o sistema
de uma companhia aérea, a AML. Todos os testes unitários deste sistema foram feitos em JEST.JS

## Autores

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) Arthur Ramos](https://github.com/arthur6890)

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) Otavio Meira](https://github.com/otavioml)

## Documentação da API

#### Cria um novo voo

```http
  POST /flight/create
```

| Parâmetro     | Tipo           | Descrição                                                                                    |
| :------------ | :------------- | :------------------------------------------------------------------------------------------- | --- |
| `id`          | `string`       | **Obrigatório**. O ID do voo                                                                 |
| `pilot`       | `string`       | **Obrigatório**. Nome do piloto do voo                                                       |
| `origin`      | `ILocalizacao` | **Obrigatório**. Origem do voo usando os padrões da classe Localizacao                       |
| `destination` | `ILocalizacao` | **Obrigatório**. Destino do voo usando os padrões da classe Localizacao                      |     |
| `departure`   | `Date`         | **Obrigatório**. Data e horário de partida do voo                                            |
| `arrival`     | `Date`         | Previsão de data e horario de chegada do voo                                                 |
| `ocupation`   | `number`       | Ocupação do voo                                                                              |
| `status`      | `Status`       | **Obrigatório**. Status do voo seguindo o padrão de Status (CONFIRMADO, PENDENTE, CANCELADO) |

#### Lista os voos registrados

```http
  GET /flight/list
```

#### Retorna um voo pelo ID

```http
  GET /flight/get/:id
```

| Parâmetro | Tipo     | Descrição                    |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do voo |

#### Atualiza o status de um voo

```http
  PATCH /flight/changeStatus/:id
```

| Parâmetro | Tipo     | Descrição                    |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do voo |

#### Cria uma nova pessoa

```http
  POST /person/create
```

| Parâmetro | Tipo      | Descrição                              |
| :-------- | :-------- | :------------------------------------- |
| `person`  | `IPessoa` | **Obrigatório**. Informações da pessoa |

#### Lista grupo de pessoas

```http
  GET /person/list
```

| Parâmetro      | Tipo            | Descrição                              |
| :------------- | :-------------- | :------------------------------------- |
| `personFilter` | `IFilterPessoa` | **Obrigatório**. Informações da Pessoa |

#### Cria uma Aeronave

```http
  POST /plane/create
```

| Parâmetro           | Tipo     | Descrição                                      |
| :------------------ | :------- | :--------------------------------------------- |
| `id`                | `string` | **Obrigatório**. Id do voo                     |
| `model`             | `string` | **Obrigatório**. Modelo do avião               |
| `seatQuantity`      | `number` | **Obrigatório**. Quantidade de assentos no voo |
| `yearOfManufacture` | `number` | **Obrigatório**. Ano de fabricação do voo      |
