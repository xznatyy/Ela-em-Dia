const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value;

    try {

        const resposta = await fetch("/api/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })
        });


        const texto = await resposta.text();

        console.log("STATUS:", resposta.status);
        console.log("RESPOSTA DO SERVIDOR:", texto);


        let resultado;

        try {

            resultado = JSON.parse(texto);

        } catch {

            alert(
                "O servidor respondeu de forma inesperada. Veja o Console."
            );

            return;
        }


        if (!resposta.ok) {

            alert(resultado.mensagem);

            return;
        }


        alert("Login realizado com sucesso!");

        window.location.href = "home.html";


    } catch (erro) {

        console.error("Erro ao fazer login:", erro);

        alert(
            "Não foi possível conectar ao servidor."
        );

    }

});