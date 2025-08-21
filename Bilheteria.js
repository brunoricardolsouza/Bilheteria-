//Objetos
let objectTypeAgeFilm;
let objectChooseTicketTime;
let objectHalfPrice;
let objectChooseSnacks;
let objectPaymentMethod;

//Variavéis
let total;
let subtotal;
let finalPriceTicket;

//Classes
class User {
  constructor(name, profile, age) {
    this.name = name;
    this.profile = profile;
    this.age = age;
  }
}
class Film {
  constructor (name, type, minimumAge, hour, rawPriceTicket, shift, priceTicket, halfEntry, comboSnacks, priceSnacks, finalPriceTicket, method, paymentAdjustment, subtotal) {
    this.name = name;
    this.type = type;
    this.minimumAge = minimumAge;
    this.hour = hour
    this.rawPriceTicket = rawPriceTicket
    this.shift = shift
    this.priceTicket = priceTicket
    this.halfEntry = halfEntry
    this.comboSnacks = comboSnacks
    this.priceSnacks = priceSnacks
    this.finalPriceTicket = finalPriceTicket
    this.method = method
    this.paymentAdjustment = paymentAdjustment
    this.subtotal = subtotal
  }
}

//Instanciações 
let user = new User("", "", 0);
let film = new Film("", "", 0, 0, 0, "", 0, false, "", 0, 0, "", 0, 0);

//Boas Vindas e Identificação
user.name = getText("Insira seu nome: ")
wellcome(user.name)

//Perfil de Acesso
user.profile = typeUser();

//Seleção de Filme 
film.name = getText("Qual o nome do filme: ")
objectTypeAgeFilm = chooseTypeFilm()
film.type = objectTypeAgeFilm.type
film.minimumAge = objectTypeAgeFilm.minimumAge

//Idade e Verificação
user.age = ageUser()
validationAge(user.age, film.minimumAge)

//Horário da Sessão e Preço Base
objectChooseTicketTime = chooseTicketTime() 
film.hour = objectChooseTicketTime.hour
film.rawPriceTicket = objectChooseTicketTime.rawPriceTicket
film.shift = objectChooseTicketTime.shift

//Meia-Entrada
objectHalfPrice = halfPrice(user.age, film.rawPriceTicket)
film.priceTicket = objectHalfPrice.priceTicket
film.halfEntry = objectHalfPrice.halfEntry

//Combo de Snacks
objectChooseSnacks = chooseSnacks()
film.comboSnacks = objectChooseSnacks.combo
film.priceSnacks = objectChooseSnacks.price

//Cupom de desconto
finalPriceTicket = discountCoupon(film.shift , film.priceTicket)
film.finalPriceTicket = finalPriceTicket

//Total 
total = (film.finalPriceTicket + film.priceSnacks)

//Forma de Pagamento
objectPaymentMethod = paymentMethod(total)
film.method = objectPaymentMethod.method
film.paymentAdjustment = objectPaymentMethod.paymentAdjustment

//Pagamento
subtotal = payment(total, film.method, film.paymentAdjustment)
film.subtotal = subtotal

//Comprovante de Pagamento
proofPayment(user, film)

//Funções
function wellcome(name) {
  console.log("=== Bilheteria de Cinema ===")
  console.log(`Olá ${name}, seja bem vindo a bilheteria`)
}
function getText(message, errorMessage = "Nome é obrigatório!") {
  let input;
  do {
    input = prompt(message)
    if (input === null || input.trim() === "") {
      alert(errorMessage)
    }
  } while (input === null || input.trim() === "")
  return input;
} 

function typeUser(errorEntry = "Tipo de perfil inválido!") {
  let input;
  let choose; 
  do {
    input = prompt("1 - Cliente | 2 - Atendente\nVocê é: ")
    if (input === null) {
      alert("Você não pode cancelar essa etapa!")
      continue;
    }
    choose = input.trim()
    switch (choose) {
      case "1":
        console.log(`Perfil validado, você é um Cliente`)
        return "Cliente";
      case "2":
        console.log(`Perfil validado, você é um Atendente`)
        return "Atendente";
      default:
        alert(errorEntry)
        break;
    }
  } while (choose !== "1" && choose !== "2") 
}

function chooseTypeFilm (errorEntry = "Opção invalida!") {
  let input;
  let choose;
  do {
    input = prompt("1 - Ação | 2 - Terror | 3 - Outros \nQual tipo de filme? ")
    if (input === null) {
      alert("O tipo de filme não pode ficar vazio, escolha de 1 a 3!")
      continue;
    }
    choose = input.trim()
    switch(choose) {
      case "1":
        return { type: "Ação", minimumAge: 18 };
      case "2":
        return { type: "Terror", minimumAge: 16 };
      case "3":
        return { type: "Outros", minimumAge: 0 };
      default:
        alert(errorEntry)
        break;
    }
  } while (true)
}

function ageUser (errorEntry = "Idade validada deve ser entre 0 e 120!") {
  let input;
  let age;
  do {
    input = prompt("Insira a sua idade: ")
    if (input === null) {
      alert("Idade não pode ser vazia!")
      continue;
    }
    age = Number(input)

    if (isNaN(age) || age < 0 || age > 120) {
      alert(errorEntry)
      continue;
    } else {
      return age;
    }
  } while (isNaN(age) || age < 0 || age > 120)
}

function validationAge (age, minimumAge) {
  if (age >= minimumAge) {
    console.log(`Você atende aos requisitos de idade!`)
  } else {
    console.log(`Você não atende aos requisitos de idade! você tem ${age} anos e a idade minima de ${minimumAge} anos`)
  }
}

function chooseTicketTime (errorEntry = "Horário invalido! Deve ser entre 0h e 24h!") {
  let input;
  let choose;
  do {
    input = prompt("Insira o horário do ingresso: ")
    if (input === null) {
      alert("Horário não pode ser vazio, escolha um horario entre 0h e 24!")
      continue;
    }
    choose = Number(input)
    if (isNaN(choose) || choose < 0 || choose >= 24) {
      alert(errorEntry)
    } else if (choose >= 0 && choose <= 6) {
      return { hour: choose, rawPriceTicket: 16, shift: "Madrugada"}
    } else if (choose > 6 && choose <= 12) {
      return { hour: choose, rawPriceTicket: 18, shift: "Manhã"}
    } else if (choose > 12 && choose <= 18) {
      return { hour: choose, rawPriceTicket: 22, shift: "Tarde"}
    } else if (choose > 18 && choose < 24) {
      return { hour: choose, rawPriceTicket: 28, shift: "Noite"}
    }
  } while (true)
}

function halfPrice(age, rawPriceTicket) { 
  let cardDiscount;
  let priceTicket;
  if (age > 12 && age < 60) {
    do {
      let input = prompt("Você tem carteirinha de desconto? [S/N]: ")
      if (input === null) {
        return {priceTicket: rawPriceTicket, halfEntry: false};
      }
      cardDiscount = input.trim().toUpperCase()
      switch (cardDiscount) {
        case "S":
          priceTicket = rawPriceTicket/2
          return {priceTicket: priceTicket, halfEntry: true};
        case "N":
          return {priceTicket: rawPriceTicket, halfEntry: false};
          default:
          alert("Valor invalido! Escolha S ou N!")
      }
    } while (true)
  } else {
    priceTicket = rawPriceTicket/2
    return {priceTicket: priceTicket, halfEntry: true};
  }
}

function chooseSnacks() {
  let input;
  let choose;
  do {
    input = prompt("=== Combos de Snacks ===\n 1 - Combo Pequeno 15 R$\n 2 - Combo Médio 24 R$\n 3 - Combo Grande 30 R$\n 4 - Combo Família 38 R$\n===================\nEscolha seu combo snack: ")
    if (input === null) {
      return {combo: "Nenhum", price: 0};
    }
    choose = input.trim()
    switch(choose) {
      case "1":
        return {combo: "Pequeno", price: 15};
      case "2":
        return {combo: "Médio", price: 24};
      case "3":
        return {combo: "Grande", price: 30};
      case "4":
        return {combo: "Família", price: 38};
      default:
        alert("Combo invalido, escolha de 1 a 4!")
    }
  } while (true)
}

function discountCoupon(shift, priceTicket) {
  let input;
  let haveCoupon;
  let finalPriceTicket = 0;
  do {
      input = prompt("Você tem cupom de desconto? [S/N]: ")
      if (input === null) {
        console.log("Operação cancelada!")
        return priceTicket;
      }
      haveCoupon = input.trim().toUpperCase()
      switch (haveCoupon) { 
        case "S": {
            let inputName = prompt("Insira seu cupom: ")
            if (inputName === null) {
              console.log("Operação cancelada!")
              return priceTicket;
            } 
            const nameCoupon = inputName.trim().toUpperCase()
      
            if (nameCoupon === "NOITE10" && shift === "Noite") {
              finalPriceTicket = (priceTicket - (priceTicket * 0.10))
            } else if (nameCoupon === "FILME5") {
              finalPriceTicket = (priceTicket - 5)
            } else {
                finalPriceTicket = priceTicket
              console.log(`Cupom inexistente!`)
              }
            }
          return finalPriceTicket;
        case "N":
          return priceTicket;
        default:
          alert("Valor invalido! Escolha S ou N!")
          continue;
      }
    } while (true)
} 

function paymentMethod(total) {
  let input;
  let choose;
  do {
    let value = 0;
    input = prompt("=== Forma de Pagamento ===\n 1 - Dinheiro \n 2 - Débito\n 3 - Crédito \n 4 - Outro")
    if (input === null) {
      alert("Escolha uma forma de pagamento, de 1 a 4!")
      continue;
    }
    choose = input.trim().toUpperCase()
    switch (choose) {
      case "1":
        value = total*0.05
        return {method: "Dinheiro", paymentAdjustment: value}
      case "2":
        value = 0
        return {method: "Débito", paymentAdjustment: 0}
      case "3":
        value = total*0.03
        return {method: "Crédito", paymentAdjustment: value}
      case "4":
        value = 0
        return {method: "Outros", paymentAdjustment: value}
      default:
        alert("Forma de pagamento inexistente!")
        break;
    }
  } while (true)
}

function payment(total, method, paymentAdjustment) {
  let subtotal = 0
  if (method === "Dinheiro") {
    subtotal = (total - paymentAdjustment)
  } else if (method === "Crédito") {
    subtotal = (total + paymentAdjustment)
  } else {
    subtotal = total
  }
  return subtotal;
}

function proofPayment(userInstance, filmInstance) {
  console.log("=== Comprovante de Pagamento ===");
  console.log(`--- Informações Usuário ---`)
  console.log(`Usuário: ${userInstance.name}`);
  console.log(`Idade: ${userInstance.age}`);
  console.log(`Perfil: ${userInstance.profile}`);
  console.log(`--- Informações Filme ---`)
  console.log(`Filme: ${filmInstance.name}`);
  console.log(`Sessão: ${filmInstance.hour}h (${filmInstance.shift})`);
  console.log(`Ingresso: R$ ${filmInstance.finalPriceTicket.toFixed(2)}`);
  console.log(`Combo: ${filmInstance.comboSnacks} - R$ ${filmInstance.priceSnacks}`);
  console.log(`Método de pagamento: ${filmInstance.method}`);
  console.log(`Desconto/Acréscimo: R$ ${filmInstance.paymentAdjustment.toFixed(2)}`);
  console.log(`Total a pagar: R$ ${filmInstance.subtotal.toFixed(2)}`);
}

