# Boas vindas ao repositório do projeto Car Shop!


# Habilidades

Neste projeto, foram aplicados os seguintes aprendizados:

- conhecimento dos pilares da `Programação Orientada a Objetos`: `Herança`, `Abstração`, `Encapsulamento` e `Polimorfismo`;
- utilização de `Composição`;
- criação e utilização de `Interfaces`;
- Implementar, em `TypeScript`: `Classes`, `Instâncias`, `Atributos`, `Métodos` e `Objetos`;
- conhecimentos de `MongoDB`, `Typescript` e `POO` para criar uma API com `CRUD`.

---

## Deploy da Aplicação
Segue abaixo o link do deploy da aplicação, o mesmo foi realizado utilizando Heroku e Atlas MongoDB.
https://shop-car-001.herokuapp.com/

---

## Testes
Para rodar os testes da aplicação deve-se usar o comando npm run test:dev.


## O que foi desenvolvido

Para este projeto, foram aplicados os princípios de `POO` para a contrução de uma API com `CRUD` para gerenciar uma concessionária de veículos utilizando o banco de dados `MongoDB`.

---

# Conteudo do projeto

### Interface `Model` genérica

A interface `Model`, foi usada para fazermos nossa conexão com o banco de dados.
Ela tem as funções `create()`, `read()`, `readOne()`, `update()` e `delete()`.
Por ser genérica, nossa interface recebe um tipo `T` qualquer, e ela espera, em cada função, as seguintes especificações:
 - `create()`: recebe um objeto do tipo `T`e retorna uma Promise do tipo `T`.
 - `read()`: retorna uma Promise contendo um array de objetos do tipo `T`.
 - `readOne()`: recebe uma string e retorna uma Promise do tipo `T` ou nula.
 - `update()`: recebe uma string e um objeto do tipo `T` e retornar uma Promise do tipo `T` ou nula.
 - `delete()`: recebe uma string e retorna uma Promise do tipo `T` ou nula.

Além disso, é verificado que:
 - Existe a interface Model;
 - A interface Model possui todas as funções solicitadas;
 - A interface Model pode ser implementada com qualquer tipo;
 - A interface esta no local correto, com o nome correto e com a forma de exportação correta;

### interface `Vehicle`

A interface `Vehicle`, é usada para criarmos nossos tipos de carro, moto e caminhão.
Ela tem todos os atributos comuns de todos os veículos que listaremos aqui. São eles:
 - `model`: Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres;
 - `year`: Ano de fabricação do veículo. Deve ser maior ou igual a 1900, porém menor ou igual a 2022;
 - `color`: Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres;
 - `status`: Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional;
 - `buyValue`: Valor de compra do veículo. Deve receber apenas números inteiros;
 

### interface `Car` a partir da interface `Vehicle`

A interface `Car`, possue todos os atributos da interface `Vehicle` e, também, os atributos:
 - `doorsQty`: Quantidade de portas de um carro. Deve ser maior ou igual a 2 e menor ou igual a 4;
 - `seatsQty`: Quantidade de assentos disponíveis no carro. Deve ser maior ou igual a 2 e menor ou igual a 7;
 

### Rota para o endpoint `/cars` onde é possível cadastrar um novo carro

A rota recebe uma requisição `POST` para cadastrar um veículo do tipo carro:
 - A rota retorna erro `400` caso a requisição receba um objeto vazio;
 - A rota retorna erro `400` ao tentar criar um carro com quantidade de assentos inferior a 2;
 - A rota retorna erro `400` ao tentar criar um carro com quantidade de portas inferior a 2;
 - A rota retorna erro `400` ao tentar criar um carro sem `model`, `year`, `color`, `status` e `buyValue`;
 - A rota retorna erro `400` ao tentar criar um carro sem `doorsQty` e `seatsQty`;
 - Não é possível criar um carro se os atributos estiverem com tipos errados;
 - É possível criar um carro se todos os parametros forem passados corretamente;
 - A API responde com status http `201` e o seguinte body:
 ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
 ```

### Rota para o endpoint `/cars` onde é possível listar todos os carros registrados

A rota recebe uma requisição `GET` para receber todos os veículos do tipo carro registrados no banco de dados. Será verificado que:
 - Lista os carros com sucesso;
 - Retorna uma lista vazia se não houver carros;

### Rota para o endpoint `/cars/id` onde é possível listar um único carro através do seu id

A rota recebe uma requisição `GET` para receber determinado veículo do tipo carro que possua o `id` passado como parâmetro na rota :
 - Lista um carro com sucesso através do id;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;


### Rota para o endpoint `/cars/id`, onde é possível atualizar o registro de um carro através do seu id

A rota recebe uma requisição `PUT` para atualizar determinado veículo do tipo carro que possua o `id` passado como parâmetro na rota:
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - É disparado o erro `400` caso o `body` esteja incompleto;
 - Será verificado que um carro é atualizado com sucesso;
 - A API responde com status http `200` e o seguinte body:
 ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Fiat Uno",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 4,
    doorsQty: 4
 ```

### Rota para o endpoint `/cars/id` para excluir os registros de um carro

A rota recebe uma requisição `DELETE` para excluirr determinado veículo do tipo carro que possua o `id` passado como parâmetro na rota:
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - Será verificado que um carro é removido com sucesso;
 - A API responde com status http `204` sem body;


### Rota para o endpoint `/motorcycles` onde é possível cadastrar uma nova moto

Arota recebe uma requisição `POST` para cadastrar um veículo do tipo moto:
 - A rota retorna erro `400` caso a requisição receba um objeto vazio;
 - A rota retorna erro `400` ao tentar criar uma moto com `category` diferente de `Street`, `Custom` ou `Trail`;
 - A rota retorna erro `400` ao tentar criar uma moto com `category` diferente de `string`;
 - A rota retorna erro `400` ao tentar criar uma moto com `engineCapacity` menor ou igual a zero;
 - A rota retorna erro `400` ao tentar criar uma moto com `engineCapacity` maior que 2500;
 - A rota retorna erro `400` ao tentar criar um moto sem `model`, `year`, `color` e `buyValue`;
 - A rota retorna erro `400` ao tentar criar um moto sem `category` e `engineCapacity`;
 - Não é possível criar uma moto se os atributos estiverem com tipos errados;
 - É possível criar uma moto se todos os parametros forem passados corretamente;
 - A API responde com status http `201` e o seguinte body:
 ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
 ```

### Rota para o endpoint `/motorcycles` onde seja é possivel listar todas as motos registradas

A rota recebe uma requisição `GET` para receber todos os veículos do tipo moto registrados no banco de dados:
 - É possível listar as motos com sucesso;
 - Retorna uma lista vazia se não houver motos;

### Rota para o endpoint `/motorcycles/id` onde é possível listar uma única moto através do seu id

A rota recebe uma requisição `GET` para receber determinado veículo do tipo moto que possua o `id` passado como parâmetro na rota:
 - É possível listar uma moto com sucesso através do id;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;

### Rota para o endpoint `/motorcycles/id`, onde é possível atualizar o registro de uma moto através do seu id

A rota recebe uma requisição `PUT` para atualizar determinado veículo do tipo moto que possua o `id` passado como parâmetro na rota:
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - É disparado o erro `400` caso o `body` esteja incompleto;
 - Será verificado que uma moto é atualizada com sucesso;
 - Sua API deve responder com status http `200` e o seguinte body:
 ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "black",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
 ```

### Rota para o endpoint `/motorcycles/id` para excluir os registros de uma moto

A rota recebe uma requisição `DELETE` para excluir determinado veículo do tipo moto que possua o `id` passado como parâmetro na rota:
 - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres mas é inválido;
 - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
 - Será verificado que uma moto é removida com sucesso;
 - A API responde com status http `204` sem body;

