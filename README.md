
# RAPP Airlines

Este é um sistema feito em Node.js, utilizando Typescript para simular o sistema
de uma companhia aérea, a RAPP.



## Autores

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) Arthur Ramos](https://github.com/arthur6890)

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) Rafael Neves](https://github.com/faelneves)

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) João Victor Valgas](https://github.com/arthur6890)

[![image](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) Philippe lucas](https://github.com/phillippelucas)



## Documentação da API

#### Cria um novo voo

```http
  POST /flight/create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. O ID do voo |
| `pilot` | `string` | **Obrigatório**. Nome do piloto do voo |
| `origin` | `ILocalizacao` | **Obrigatório**. Origem do voo usando os padrões da classe Localizacao |
| `destination` | `ILocalizacao` | **Obrigatório**. Destino do voo usando os padrões da classe Localizacao | |
| `departure` | `Date` |**Obrigatório**. Data e horário de partida do voo |
| `arrival` | `Date` |Previsão de data e horario de chegada do voo  |
| `ocupation` | `number` | Ocupação do voo |
| `status` | `Status` | **Obrigatório**. Status do voo seguindo o padrão de Status (CONFIRMADO, PENDENTE, CANCELADO) |

#### Lista os voos registrados

```http
  GET /flight/list
```

#### Retorna um voo pelo ID

```http
  GET /flight/get/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. O ID do voo |

#### Atualiza o status de um voo

```http
  PATCH /flight/changeStatus/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. O ID do voo |


#### Cria uma nova pessoa

```http
  POST /person/create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `person` | `IPessoa` | **Obrigatório**. Informações da pessoa |


#### Lista grupo de pessoas

```http
  GET /person/list
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `personFilter` | `IFilterPessoa` | **Obrigatório**. Informações da Pessoa|

#### Cria uma Aeronave

```http
  POST /plane/create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id do voo|
| `model` | `string` | **Obrigatório**. Modelo do avião|
| `seatQuantity` | `number` | **Obrigatório**. Quantidade de assentos no voo|
| `yearOfManufacture` | `number` | **Obrigatório**. Ano de fabricação do voo|


## Documentação
Foram feitos 3 commits afim de reduzir as 3 funções mais complexas.
Segue abaixo link para os commits

[Commit 1 - Refatoração na função `filterFlight`](https://github.com/faelneves/compania_aerea/commit/65f11a097afafc7b34de93abd81d1454f3821a55)

[Commit 2 - Refatoração na função `createPerson`](https://github.com/faelneves/compania_aerea/commit/bd2785e2a89e8d94ec58c80051b28bdf42afea5f)

[Commit 3 - Refatoração na função `createFlight`](https://github.com/faelneves/compania_aerea/commit/41f58bfd08ea63fea66c5fc379f4cd729349f302)


## Contribuindo

Temos também o relatório da versão sem refatorações e da versão após as refatorações

Veja `relatório.html` para saber relatório antes da refatorações, e `relatorioDepoisDeRefatorar.html` para alterações depois das refatorações

