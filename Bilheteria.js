//Variavéis
let typeFilm = "";
let minimumAge = 0;
let rawPriceTicket;
let priceTicket;
let cardDiscount = "";
let valueSnacks;
let nameSnacks;
let valueCupom = 0;
let total;
let paymentMethod;
let subtotal = 0;
let shiftFilm;
let discountMethod;
let nameCupom;

//Boas Vindas & Identificação
let nameUser = prompt("Insira seu nome: ");
while (nameUser === null || nameUser.trim() === "") {
  alert("Nome é obrigatório!")
  nameUser = prompt("Insira o seu nome: ")
}
console.log("=== Bilheteria de Cinema ===")
console.log("Olá "+ nameUser +", seja bem vindo a bilheteria!")

//Perfil de Acesso
let profileUser = prompt("Você é : 1 - Cliente | 2 - Atendente");
while (profileUser !== "1" && profileUser !== "2") {
  alert("Opção invalida, escolha 1 ou 2!")
  profileUser = prompt("Você é : 1 - Cliente | 2 - Atendente")
}
console.log("Perfil valido!")
let profileLogin = true;

//Seleção do Filme
let nameFilm = prompt("Insira o nome do filme: ");
while (nameFilm === null || nameFilm.trim() === "") {
  alert("Nome do filme é obrigatório!")
  nameFilm = prompt("Insira o nome do filme: ")
}
let chooseFilm = Number(prompt("Qual tipo de filme? (1-Ação|2-Terror|3-Outros): "));
while (chooseFilm < 1 || chooseFilm > 3 || isNaN(chooseFilm)) {
  alert("Opção invalida!")
  chooseFilm = prompt("Qual tipo de filme? (1-Ação|2-Terror|3-Outros): ")
}
switch (chooseFilm) {
  case 1:
    typeFilm = "Ação"
    minimumAge = 18
    break;
  case 2:
    typeFilm = "Terror"
    minimumAge = 16
    break;
  default:
    typeFilm = "Outro"
    minimumAge = 0
    break;
}
console.log("o nome do filme é: "+ nameFilm +", e seu genero é: "+ typeFilm)

//Validação de Idade
let ageUser = Number(prompt("Insira a sua idade: "))
while (ageUser < 0 || ageUser > 120 || isNaN(ageUser)) {
  alert("Idade invalida!")
  ageUser = prompt("Insira a sua idade: ")
}
if (ageUser >= minimumAge) {
  console.log("Você tem idade para assistir ao filme!")
} else {
  console.log("Você não tem idade para assistir ao filme!")
}

//Horario e Preço Ingresso
alert("=== Tabela preço ingressos ===\nMadrugada [00h-05h] = 16 R$\nManha        [06h-12h] = 18 R$\nTarde          [13h-17h] = 22 R$\nNoite          [18h-23h] = 28 R$")


let entryTime = Number(prompt("Escolha o horario você deseja assistir: "))
while (entryTime < 0 || entryTime > 24 || isNaN(entryTime)) {
  alert("Horario inexistente!")
  entryTime = Number(prompt("Escolha o horario você deseja assistir: "))
}

if (entryTime > 0 && entryTime <= 6) {
  rawPriceTicket = 16
  shiftFilm = "Madrugada"
} else if (entryTime > 6 && entryTime <= 12) {
  rawPriceTicket = 18
  shiftFilm = "Manhã"
} else if (entryTime > 12 && entryTime <= 17) {
  rawPriceTicket = 22
  shiftFilm = "Tarde"
} else {
  rawPriceTicket = 28
  shiftFilm = "Noite"
}

//Verificação Meia-Entrada
if (ageUser > 12 && ageUser < 60) {
  cardDiscount = prompt("Possui carteirinha de meia entrada? [S/N]: ").toUpperCase()
  while (cardDiscount === null || cardDiscount.trim() === "" || (cardDiscount.trim() !== "S" && cardDiscount.trim() !=="N")) {
    alert("Resposta incorreta!")
    cardDiscount = prompt("Possui carteirinha de meia entrada? [S/N]: ").toUpperCase()
 }
}

if (ageUser <= 12 || ageUser >= 60 || cardDiscount === "S"){
  priceTicket = (rawPriceTicket/2)
} else {
  priceTicket = rawPriceTicket
}

//Combos de Snacks
alert("=== Combos de Snacks ===\n 1 - Combo Pequeno 15 R$\n 2 - Combo Médio 24 R$\n 3 - Combo Grande 30 R$\n 4 - Combo Familia 38 R$")

let comboSnacks = Number(prompt("Qual combo deseja comprar: "))
while (comboSnacks < 1 || comboSnacks > 4 || isNaN(comboSnacks)) {
  alert("Combo inexistente!")
  comboSnacks = Number(prompt("Qual combo deseja comprar: "))
}

switch (comboSnacks) {
  case 1:
    nameSnacks = "Combo Pequeno"
    valueSnacks = 15
    break;
  case 2:
    nameSnacks = "Combo Médio"
    valueSnacks = 24
    break;
  case 3:
    nameSnacks = "Combo Grande"
    valueSnacks = 30
    break;
  default:
    nameSnacks = "Combo Familia"
    valueSnacks = 38
    break;
}
//Total Ingresso + Comida
total = (priceTicket + valueSnacks)
//Cupom de Desconto
let haveCupom = prompt("Você tem cupom de desconto? [S/N]: ").toUpperCase()
while (haveCupom === null || haveCupom.trim() === "" || (haveCupom.trim() !== "S" && haveCupom.trim() !== "N")) {
  alert("Opção invalida!")
  haveCupom = prompt("Você tem cupom de desconto? [S/N]: ").toUpperCase()
}
if (haveCupom === "S") {
  nameCupom = prompt("Insira o cupom: ").toUpperCase()
  while (nameCupom === null || nameCupom.trim() === "" || (nameCupom.trim() !== "NOITE10" && nameCupom.trim() !== "FILME5")) {
    alert("Cupom inexistente!")
    nameCupom = prompt("Insira o cupom: ").toUpperCase()
  }
  if (nameCupom.trim() === "NOITE10" && shiftFilm === "Noite") {
    alert("Cupom aceito!")
    valueCupom = (total * 0.10)
  } else if (nameCupom.trim() === "NOITE10" && shiftFilm !== "Noite") {
    alert("Cupom só é válido à noite!")
    valueCupom = 0
  } else if (nameCupom.trim() === "FILME5") {
    alert("Cupom aceito!")
    valueCupom = 5
  }
} 

//Forma de Pagamento
alert("=== Forma de pagamento ===\n 1 - Dinheiro\n 2 - Débito\n 3 - Crédito\n 4 - Outro")

let paymentOption = Number(prompt("Qual forma de pagamento: "))
while (paymentOption < 1 || paymentOption > 4 || isNaN(paymentOption)) {
  alert("Forma de pagamento inexistente!")
  paymentOption = Number(prompt("Qual forma de pagamento: "))
}
switch (paymentOption) {
  case 1:
    paymentMethod = "Dinheiro"
    discountMethod = 0.95
    break;
  case 2:
    paymentMethod = "Débito"
    discountMethod = 1.00
    break;
  case 3:
    paymentMethod = "Crédito"
    discountMethod = 1.03
    break;
  case 4:
    paymentMethod = "Débito"
    discountMethod = 1.00
    break;
}

//Calculo total
subtotal = ((total - valueCupom) * discountMethod)
console.log("=== Pagamento ===")
console.log("Total -> "+ total.toFixed(2))
console.log("Sub-Total -> "+ subtotal.toFixed(2))

let acceptPayment = prompt("Deseja prosseguir para o pagamento? [S/N]: ").toUpperCase()
while (acceptPayment.trim() !== "S" && acceptPayment.trim() !== "N") {
  alert("Opção invalida!")
  acceptPayment = prompt("Deseja efetuar o pagamento? [S/N]: ").toUpperCase()
}
profileLogin = false
if (acceptPayment === "S") {
  console.log("=== Nota Fiscal ===")
  console.log("Nome: "+ nameUser)
  console.log("Filme: "+ nameFilm)
  console.log("Preço do ingresso: "+ priceTicket.toFixed(2))
  console.log("Preço do Combo: "+ valueSnacks.toFixed(2))
  console.log("Total -> "+ total.toFixed(2))
  console.log("-------------------")
  console.log("Cupom de: -" + valueCupom.toFixed(2))
  console.log("Forma de pag: "+ paymentMethod)
  console.log("Desc/Acres do pag: "+ discountMethod.toFixed(2))
  console.log("Sub-Total -> "+ subtotal.toFixed(2))
  console.log("-------------------")
  console.log("Obrigado pela compra, bom filme!")
}