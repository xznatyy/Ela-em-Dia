console.log("cadastro.js carregou");
const formCadastro =
    document.getElementById("formCadastro");

formCadastro.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const nome =
            document.getElementById("nome").value;

        const dataNascimento =
            document.getElementById("dataNascimento").value;

        const email =
            document.getElementById("email").value;

        const senha =
            document.getElementById("senha").value;

        try {

            const resposta = await fetch(
                "/api/cadastro",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nome,
                        dataNascimento,
                        email,
                        senha
                    })
                }
            );

            const resultado =
                await resposta.json();

            if (!resposta.ok) {

                alert(resultado.mensagem);
                return;

            }

            alert("Conta criada com sucesso! 🌿");

            window.location.href =
                "index.html";

        } catch (erro) {

            console.error(erro);

            alert(
                "Não foi possível conectar ao servidor."
            );

        }

    }
);