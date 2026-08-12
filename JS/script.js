

        let tipoUsuario = "aluno";


        function selecionarTipo(tipo) {

            tipoUsuario = tipo;

            const btnAluno =
                document.getElementById("btnAluno");

            const btnProfessor =
                document.getElementById("btnProfessor");

            const titulo =
                document.getElementById("tituloLogin");

            const descricao =
                document.getElementById("descricaoLogin");

            const botao =
                document.getElementById("loginButton");


            btnAluno.classList.remove("active");

            btnProfessor.classList.remove("active");


            if (tipo === "aluno") {

                btnAluno.classList.add("active");

                titulo.innerText = "Login do aluno";

                descricao.innerText =
                    "Entre com seus dados para acessar sua área.";

                botao.innerText =
                    "Entrar como aluno";

            } else {

                btnProfessor.classList.add("active");

                titulo.innerText = "Login do professor";

                descricao.innerText =
                    "Entre com seus dados para acessar sua área.";

                botao.innerText =
                    "Entrar como professor";

            }

        }


        function mostrarSenha() {

            const senha =
                document.getElementById("senha");

            if (senha.type === "password") {

                senha.type = "text";

            } else {

                senha.type = "password";

            }

        }


        document
            .getElementById("loginForm")
            .addEventListener("submit", function(event) {

                event.preventDefault();

                const email =
                    document.getElementById("email").value;

                const senha =
                    document.getElementById("senha").value;


                if (!email.includes("@")) {

                    alert(
                        "E-mail inválido! Digite um e-mail válido, como aluno@email.com"
                    );

                    return;

                }


                if (senha.length < 6) {

                    alert(
                        "A senha deve possuir pelo menos 6 caracteres."
                    );

                    return;

                }


                if (tipoUsuario === "aluno") {

                    window.location.href = "index.html";

                } else {

                    window.location.href = "index.html";

                }

            });
