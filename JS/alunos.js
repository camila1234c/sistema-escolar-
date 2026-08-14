const alunosPadrao = [
    {
        id: 1,
        nome: "Ana Martins",
        matricula: "2026045",
        turma: "2º Ano A",
        nascimento: "2010-04-15",
        email: "",
        telefone: "",
        media: 5.4,
        frequencia: 68
    },

    {
        id: 2,
        nome: "João Pedro",
        matricula: "2026078",
        turma: "2º Ano A",
        nascimento: "2010-08-20",
        email: "",
        telefone: "",
        media: 8.7,
        frequencia: 94
    },

    {
        id: 3,
        nome: "Lucas Costa",
        matricula: "2026081",
        turma: "2º Ano B",
        nascimento: "2010-02-11",
        email: "",
        telefone: "",
        media: 7.2,
        frequencia: 88
    },

    {
        id: 4,
        nome: "Mariana Souza",
        matricula: "2026109",
        turma: "3º Ano B",
        nascimento: "2009-11-03",
        email: "",
        telefone: "",
        media: 5.9,
        frequencia: 75
    }
];


/* =====================================================
   CARREGAR ALUNOS
===================================================== */

let alunos = JSON.parse(
    localStorage.getItem("educlass_alunos")
);

if (!alunos) {
    alunos = alunosPadrao;

    localStorage.setItem(
        "educlass_alunos",
        JSON.stringify(alunos)
    );
}


/* =====================================================
   ELEMENTOS
===================================================== */

const btnNovoAluno =
    document.getElementById("btnNovoAluno");

const btnFecharFormulario =
    document.getElementById("btnFecharFormulario");

const btnCancelar =
    document.getElementById("btnCancelar");

const formularioContainer =
    document.getElementById("formularioContainer");

const formAluno =
    document.getElementById("formAluno");

const tabelaAlunos =
    document.getElementById("tabelaAlunos");

const semAlunos =
    document.getElementById("semAlunos");

const mensagem =
    document.getElementById("mensagem");

const pesquisa =
    document.getElementById("pesquisa");

const filtroTurma =
    document.getElementById("filtroTurma");


/* =====================================================
   ABRIR FORMULÁRIO
===================================================== */

btnNovoAluno.addEventListener("click", () => {

    formularioContainer.classList.add("aberto");

    formularioContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    document.getElementById("nome").focus();

});


/* =====================================================
   FECHAR FORMULÁRIO
===================================================== */

function fecharFormulario() {

    formularioContainer.classList.remove("aberto");

    limparFormulario();

}

btnFecharFormulario.addEventListener(
    "click",
    fecharFormulario
);

btnCancelar.addEventListener(
    "click",
    fecharFormulario
);


/* =====================================================
   MENSAGEM
===================================================== */

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className =
        "mensagem " + tipo;

    setTimeout(() => {

        mensagem.className = "mensagem";

    }, 4000);
}


/* =====================================================
   ERROS
===================================================== */

function mostrarErro(campo, mensagemErro) {

    const input =
        document.getElementById(campo);

    const erro =
        document.getElementById(
            "erro" +
            campo.charAt(0).toUpperCase() +
            campo.slice(1)
        );

    if (input) {
        input.classList.add("invalido");
    }

    if (erro) {
        erro.textContent = mensagemErro;
    }
}


function limparErros() {

    const campos = [
        "nome",
        "matricula",
        "turma",
        "nascimento",
        "email",
        "media",
        "frequencia"
    ];

    campos.forEach(campo => {

        const input =
            document.getElementById(campo);

        const erro =
            document.getElementById(
                "erro" +
                campo.charAt(0).toUpperCase() +
                campo.slice(1)
            );

        if (input) {
            input.classList.remove("invalido");
        }

        if (erro) {
            erro.textContent = "";
        }

    });
}


/* =====================================================
   VALIDAR FORMULÁRIO
===================================================== */

function validarFormulario() {

    limparErros();

    let valido = true;

    const nome =
        document.getElementById("nome").value.trim();

    const matricula =
        document.getElementById("matricula").value.trim();

    const turma =
        document.getElementById("turma").value;

    const nascimento =
        document.getElementById("nascimento").value;

    const email =
        document.getElementById("email").value.trim();

    const media =
        document.getElementById("media").value;

    const frequencia =
        document.getElementById("frequencia").value;


    /* NOME */

    if (nome.length < 3) {

        mostrarErro(
            "nome",
            "Digite o nome completo do aluno."
        );

        valido = false;

    }


    /* MATRÍCULA */

    if (!/^[0-9]{4,15}$/.test(matricula)) {

        mostrarErro(
            "matricula",
            "A matrícula deve conter apenas números."
        );

        valido = false;

    } else {

        const existe =
            alunos.some(
                aluno => aluno.matricula === matricula
            );

        if (existe) {

            mostrarErro(
                "matricula",
                "Essa matrícula já está cadastrada."
            );

            valido = false;
        }
    }


    /* TURMA */

    if (!turma) {

        mostrarErro(
            "turma",
            "Selecione uma turma."
        );

        valido = false;

    }


    /* DATA */

    if (!nascimento) {

        mostrarErro(
            "nascimento",
            "Informe a data de nascimento."
        );

        valido = false;

    } else {

        const dataNascimento =
            new Date(nascimento);

        const hoje =
            new Date();

        if (dataNascimento > hoje) {

            mostrarErro(
                "nascimento",
                "A data não pode ser futura."
            );

            valido = false;
        }
    }


    /* E-MAIL */

    if (email !== "") {

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValido) {

            mostrarErro(
                "email",
                "Digite um e-mail válido."
            );

            valido = false;
        }
    }


    /* MÉDIA */

    if (media !== "") {

        const numeroMedia =
            Number(media);

        if (
            isNaN(numeroMedia) ||
            numeroMedia < 0 ||
            numeroMedia > 10
        ) {

            mostrarErro(
                "media",
                "A média deve estar entre 0 e 10."
            );

            valido = false;
        }
    }


    /* FREQUÊNCIA */

    if (frequencia !== "") {

        const numeroFrequencia =
            Number(frequencia);

        if (
            isNaN(numeroFrequencia) ||
            numeroFrequencia < 0 ||
            numeroFrequencia > 100
        ) {

            mostrarErro(
                "frequencia",
                "A frequência deve estar entre 0 e 100%."
            );

            valido = false;
        }
    }


    return valido;
}


/* =====================================================
   SALVAR ALUNO
===================================================== */

formAluno.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (!validarFormulario()) {

            mostrarMensagem(
                "Verifique os campos destacados e corrija os erros.",
                "erro-geral"
            );

            return;
        }


        const novoAluno = {

            id: Date.now(),

            nome:
                document
                    .getElementById("nome")
                    .value
                    .trim(),

            matricula:
                document
                    .getElementById("matricula")
                    .value
                    .trim(),

            turma:
                document
                    .getElementById("turma")
                    .value,

            nascimento:
                document
                    .getElementById("nascimento")
                    .value,

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),

            telefone:
                document
                    .getElementById("telefone")
                    .value
                    .trim(),

            media:
                document
                    .getElementById("media")
                    .value === ""
                    ? 0
                    : Number(
                        document
                            .getElementById("media")
                            .value
                    ),

            frequencia:
                document
                    .getElementById("frequencia")
                    .value === ""
                    ? 0
                    : Number(
                        document
                            .getElementById("frequencia")
                            .value
                    )
        };


        alunos.push(novoAluno);


        localStorage.setItem(
            "educlass_alunos",
            JSON.stringify(alunos)
        );


        renderizarAlunos();


        mostrarMensagem(
            "Aluno cadastrado com sucesso!",
            "sucesso"
        );


        limparFormulario();

        formularioContainer.classList.remove(
            "aberto"
        );

    }
);


/* =====================================================
   LIMPAR FORMULÁRIO
===================================================== */

function limparFormulario() {

    formAluno.reset();

    limparErros();

}


/* =====================================================
   SITUAÇÃO
===================================================== */

function obterSituacao(aluno) {

    const media =
        Number(aluno.media);

    const frequencia =
        Number(aluno.frequencia);


    if (
        media >= 6 &&
        frequencia >= 75
    ) {

        return {
            texto: "Aprovado",
            classe: "aprovado"
        };

    }


    if (
        media >= 5 ||
        frequencia >= 75
    ) {

        return {
            texto: "Atenção",
            classe: "atencao"
        };

    }


    return {
        texto: "Reprovado",
        classe: "reprovado"
    };
}


/* =====================================================
   INICIAIS DO ALUNO
===================================================== */

function obterIniciais(nome) {

    const partes =
        nome
            .trim()
            .split(" ")
            .filter(Boolean);

    if (partes.length === 1) {

        return partes[0]
            .substring(0, 2)
            .toUpperCase();

    }

    return (
        partes[0][0] +
        partes[partes.length - 1][0]
    ).toUpperCase();
}


/* =====================================================
   RENDERIZAR TABELA
===================================================== */

function renderizarAlunos() {

    const termo =
        pesquisa.value
            .toLowerCase()
            .trim();

    const turmaSelecionada =
        filtroTurma.value;


    const alunosFiltrados =
        alunos.filter(aluno => {

            const correspondePesquisa =
                aluno.nome
                    .toLowerCase()
                    .includes(termo) ||

                aluno.matricula
                    .toLowerCase()
                    .includes(termo);


            const correspondeTurma =
                !turmaSelecionada ||
                aluno.turma === turmaSelecionada;


            return (
                correspondePesquisa &&
                correspondeTurma
            );

        });


    tabelaAlunos.innerHTML = "";


    if (alunosFiltrados.length === 0) {

        semAlunos.style.display = "block";

        return;

    }


    semAlunos.style.display = "none";


    alunosFiltrados.forEach(aluno => {

        const situacao =
            obterSituacao(aluno);


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>

                <div class="aluno-info">

                    <div class="aluno-avatar">
                        ${obterIniciais(aluno.nome)}
                    </div>

                    <span class="aluno-nome">
                        ${escaparHTML(aluno.nome)}
                    </span>

                </div>

            </td>


            <td>
                ${escaparHTML(aluno.matricula)}
            </td>


            <td>
                ${escaparHTML(aluno.turma)}
            </td>


            <td>
                ${Number(aluno.media).toFixed(1)}
            </td>


            <td>
                ${Number(aluno.frequencia)}%
            </td>


            <td>

                <span class="status ${situacao.classe}">
                    ${situacao.texto}
                </span>

            </td>


            <td>

                <div class="acoes">

                    <button
                        class="btn-acao"
                        title="Visualizar aluno"
                        onclick="visualizarAluno(${aluno.id})"
                    >
                        👁
                    </button>


                    <button
                        class="btn-acao excluir"
                        title="Excluir aluno"
                        onclick="excluirAluno(${aluno.id})"
                    >
                        🗑
                    </button>

                </div>

            </td>

        `;


        tabelaAlunos.appendChild(tr);

    });

}


/* =====================================================
   VISUALIZAR ALUNO
===================================================== */

function visualizarAluno(id) {

    const aluno =
        alunos.find(
            item => item.id === id
        );

    if (!aluno) return;


    alert(
        "ALUNO\n\n" +

        "Nome: " +
        aluno.nome +

        "\nMatrícula: " +
        aluno.matricula +

        "\nTurma: " +
        aluno.turma +

        "\nData de nascimento: " +
        formatarData(aluno.nascimento) +

        "\nE-mail: " +
        (aluno.email || "Não informado") +

        "\nTelefone: " +
        (aluno.telefone || "Não informado") +

        "\nMédia: " +
        Number(aluno.media).toFixed(1) +

        "\nFrequência: " +
        aluno.frequencia +
        "%"
    );

}


/* =====================================================
   EXCLUIR ALUNO
===================================================== */

function excluirAluno(id) {

    const aluno =
        alunos.find(
            item => item.id === id
        );

    if (!aluno) return;


    const confirmar =
        confirm(
            `Deseja realmente excluir o aluno "${aluno.nome}"?`
        );


    if (!confirmar) return;


    alunos =
        alunos.filter(
            item => item.id !== id
        );


    localStorage.setItem(
        "educlass_alunos",
        JSON.stringify(alunos)
    );


    renderizarAlunos();


    mostrarMensagem(
        "Aluno excluído com sucesso.",
        "sucesso"
    );

}


/* =====================================================
   FORMATAR DATA
===================================================== */

function formatarData(data) {

    if (!data) {
        return "Não informado";
    }

    const partes =
        data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );
}



function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}



pesquisa.addEventListener(
    "input",
    renderizarAlunos
);



filtroTurma.addEventListener(
    "change",
    renderizarAlunos
);



document
    .getElementById("telefone")
    .addEventListener(
        "input",
        function() {

            let valor =
                this.value.replace(
                    /\D/g,
                    ""
                );

            if (valor.length > 11) {
                valor = valor.substring(0, 11);
            }


            if (valor.length > 6) {

                this.value =
                    "(" +
                    valor.substring(0, 2) +
                    ") " +
                    valor.substring(2, 7) +
                    "-" +
                    valor.substring(7);

            } else if (valor.length > 2) {

                this.value =
                    "(" +
                    valor.substring(0, 2) +
                    ") " +
                    valor.substring(2);

            } else {

                this.value = valor;

            }

        }
    );


renderizarAlunos();
