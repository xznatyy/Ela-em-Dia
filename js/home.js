async function carregarUsuario() {

    try {

        const resposta = await fetch("/api/me");

        if (!resposta.ok) {

            window.location.href = "index.html";
            return;
        }

        const resultado = await resposta.json();

        const nomeCompleto = resultado.usuario.nome;

        const primeiroNome = nomeCompleto.split(" ")[0];

        document.getElementById(
            "boasVindas"
        ).textContent = `Olá, ${primeiroNome}! 🌷`;

    } catch (erro) {

        console.error(
            "Erro ao carregar usuário:",
            erro
        );

    }

}

carregarUsuario();
// ANTICONCEPCIONAL

const horarioAnticoncepcional =
    localStorage.getItem("horarioAnticoncepcional");

const ultimaDose =
    localStorage.getItem("ultimaDose");

const homeAnticoncepcional =
    document.getElementById("homeAnticoncepcional");

const homeStatusDose =
    document.getElementById("homeStatusDose");

if (horarioAnticoncepcional) {
    homeAnticoncepcional.textContent =
        horarioAnticoncepcional;
}

const hoje =
    new Date().toLocaleDateString("pt-BR");

if (ultimaDose === hoje) {
    homeStatusDose.textContent =
        "Dose de hoje registrada ✓";
}


// AGENDA

const compromissos =
    JSON.parse(
        localStorage.getItem("compromissos")
    ) || [];

const homeAgenda =
    document.getElementById("homeAgenda");

const homeDataAgenda =
    document.getElementById("homeDataAgenda");

if (compromissos.length > 0) {

    const hojeData = new Date();

    hojeData.setHours(0, 0, 0, 0);

    const futuros =
        compromissos
            .filter(function(compromisso) {

                const dataCompromisso =
                    new Date(
                        compromisso.data +
                        "T00:00:00"
                    );

                return dataCompromisso >= hojeData;

            })
            .sort(function(a, b) {

                return new Date(
                    a.data + "T" + a.hora
                ) -
                new Date(
                    b.data + "T" + b.hora
                );

            });

    if (futuros.length > 0) {

        const proximo = futuros[0];

        const dataFormatada =
            new Date(
                proximo.data + "T00:00:00"
            ).toLocaleDateString("pt-BR");

        homeAgenda.textContent =
            proximo.titulo;

        homeDataAgenda.textContent =
            dataFormatada +
            " às " +
            proximo.hora;

    }
}


// SINTOMAS

const registrosSintomas =
    JSON.parse(
        localStorage.getItem("registrosSintomas")
    ) || [];

const homeSintomas =
    document.getElementById("homeSintomas");

if (registrosSintomas.length > 0) {

    const ultimoRegistro =
        registrosSintomas[
            registrosSintomas.length - 1
        ];

    if (ultimoRegistro.sintomas.length > 0) {

        homeSintomas.textContent =
            ultimoRegistro.sintomas.join(", ");

    } else {

        homeSintomas.textContent =
            "Sem sintomas registrados";

    }

}

const proximaMenstruacao =
    localStorage.getItem(
        "proximaMenstruacaoEstimada"
    );

const homeCiclo =
    document.getElementById("homeCiclo");

if (proximaMenstruacao) {

    homeCiclo.textContent =
        proximaMenstruacao;

}