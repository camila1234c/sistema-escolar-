const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    const emailError = document.getElementById("emailError");
    const senhaError = document.getElementById("senhaError");

   
    emailError.textContent = "";
    senhaError.textContent = "";

    let valido = true;

   
    if (email.value.trim() === "") {
        emailError.textContent = "Preencha o campo de e-mail.";
        valido = false;
    }

    
    else if (!email.validity.valid) {
        emailError.textContent = "Digite um e-mail válido, com @.";
        valido = false;
    }

    // Verifica senha vazia
    if (senha.value.trim() === "") {
        senhaError.textContent = "Preencha o campo de senha.";
        valido = false;
    }

    // Verifica tamanho da senha
    else if (senha.value.length < 6) {
        senhaError.textContent = "A senha deve ter pelo menos 6 caracteres.";
        valido = false;
    }

    else if (senha.value.length > 20) {
        senhaError.textContent = "A senha deve ter no máximo 20 caracteres.";
        valido = false;
    }

    // Se tudo estiver correto
    if (valido) {
        window.location.href = "paginicial.html";
    }
});
