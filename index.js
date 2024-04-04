//array
let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 27),
    dataCheckIn: new Date(2024, 2, 27, 19, 00)
  },
  {
    nome: "Fulano de Tal",
    email: "fulano@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 45),
    dataCheckIn: new Date(2024, 2, 26, 18, 30)
  },
  {
    nome: "Beltrano da Silva",
    email: "beltrano@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 12, 10),
    dataCheckIn: new Date(2024, 2, 28, 10, 15)
  },
  {
    nome: "Ciclano Souza",
    email: "ciclano@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 18, 55),
    dataCheckIn: new Date(2024, 2, 29, 21, 45)
  },
  {
    nome: "Ana Maria",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 8, 30),
    dataCheckIn: new Date(2024, 3, 1, 14, 20)
  },
  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14, 55),
    dataCheckIn: new Date(2024, 3, 2, 9, 45)
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 10, 40),
    dataCheckIn: new Date(2024, 3, 3, 16, 30)
  },
  {
    nome: "José Santos",
    email: "jose@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 19, 15),
    dataCheckIn: new Date(2024, 3, 4, 11, 00)
  },
  {
    nome: "Paula Lima",
    email: "paula@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 16, 20),
    dataCheckIn: new Date(2024, 3, 5, 19, 40)
  }
];

console.log(participantes);

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  //condicional  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    > Confirmar Check-In
    </button>
    `
  }
  return `
      <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}
const atualizarLista = (participantes) => { let output = ""
  // estrutura de repetição - loop
  for(let participante of participantes){
    // faça alguma coisa
    // enquanto tiver participantes nessa lista
    output = output + criarNovoParticipante(participante)
  }
  // substituir info html
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

    const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  // verificar se o participante já existe
  const participanteExiste = participantes.find((p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao ='Tem certeza que deseja fazer o check-in'
    if(confirm(mensagemConfirmacao) == false){
      return
    }

    // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
   return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  // atualizar a lista de participante
  atualizarLista(participantes)
}