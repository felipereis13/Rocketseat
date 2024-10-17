const { select, input, checkbox } = require("@inquirer/prompts")

let mensagem = "Bem-vindo ao App de Metas."
let meta = {
  value: "tomar 3L de água por dia",
  checked: false,
}
let metas = [meta]
// 35:14
const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " })

  if (meta.length == 0) {
    mensagem = ("A meta não pode ser vazia.")
    return
  }
  metas.push({ value: meta, checked: false })
  mensagem = "Meta cadastrada com sucesso!"
}
const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmarcar eo ENTER para finalizar. ",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => {
    m.checked = false
  })

  if (respostas.length == 0) {
    mensagem = ("Nenhuma meta selecionada!")
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })
    meta.checked = true
  })
  mensagem = ("Meta(s) marcarda(s) como concluidas(s)")
}
const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if (realizadas.length == 0) {
    mensagem = ("Não existe metas relizadas! :(")
    return
  }

  await select({
    message: "Metas Realizadas = " + realizadas.length,
    choices: [...realizadas],
  })
}
const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true
  })

  if (abertas.length == 0) {
    mensagem = ("Não existe metas abertas! :)")
    return
  }

  await select({
    message: "Metas Abertas = " + abertas.length,
    choices: [...abertas],
  })
}
const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false }
  })
  const itensADeletar = await checkbox({
    message: "Selecione item para deletar ",
    choices: [...metasDesmarcadas],
    instructions: false,
  })
  if(itensADeletar.length == 0) {
    mensagem = ("Nenhum item a deletar!")
    return
  }

  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })
  })
    mensagem = ("Meta(s) deletada(s) com sucesso!")
}

const mostrarMensagem = () => {
  console.clear();
  if(mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}

const start = async () => {
  while (true) {
    mostrarMensagem()

    const opcao = await select({
      message: "menu >",
      choices: [
        {
          name: "cadastrar metas",
          value: "cadastrar",
        },
        {
          name: "listar metas",
          value: "listar",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Deletar Metas",
          value: "deletar",
        },
        {
          name: "sair",
          value: "sair",
        },
      ],
    })

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta()
        break
      case "listar":
        await listarMetas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "deletar":
        await deletarMetas()
        break
      case "sair":
        console.log("Até a proxima!")
        return
    }
  }
}

start()
