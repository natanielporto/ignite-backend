# Cadastro de carros

**REQUISITOS FUNCIONAIS**
Deve ser possível cadastrar um novo carro

**REGRAS DE NEGÓCIOS**
Não deve ser possível cadastrar um carro com uma placa já existente
O carro deve ser cadastrado com disponibilidade por padrão
O responsável pelo cadastro deve ser um usuário administrador

-------------------------------------------------------------------

# Listagem de carros

**REQUISITOS FUNCIONAIS**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros pelo nome da categoria
Deve ser possível listar todos os carros pelo nome da marca
Deve ser possível listar todos os carros pelo nome do carro

**REGRAS DE NEGÓCIOS**
O usuário não precisa estar logado no sistema para ver a lista

--------------------------------------------------------------------

# Cadastro de especificação no carro

**REQUISITOS FUNCIONAIS**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**REGRAS DE NEGÓCIOS**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
O responsável pelo cadastro deve ser um usuário administrador

--------------------------------------------------------------------

# Cadastro de especificação no carro

**REQUISITOS FUNCIONAIS**
Deve ser possível cadastrar a imagem do carro

**REQUISITOS NÃO FUNCIONAIS**
Utilizar o multer para upload de arquivos

**REGRAS DE NEGÓCIOS**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O responsável pelo cadastro deve ser um usuário administrador

--------------------------------------------------------------------

# Aluguel de carro

**REQUISITOS FUNCIONAIS**
Deve ser possível cadastrar um aluguel

**REGRAS DE NEGÓCIOS**
O aluguel deve ter duração mínima de 24h
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro


