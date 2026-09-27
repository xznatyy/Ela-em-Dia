const formCiclo = document.getElementById("formCiclo");

const proximaMenstruacao =
    document.getElementById("proximaMenstruacao");

const mediaCiclo =
    document.getElementById("mediaCiclo");

const mediaMenstruacao =
    document.getElementById("mediaMenstruacao");

const historicoCiclos =
    document.getElementById("historicoCiclos");


let ciclos =
    JSON.parse(localStorage.getItem("ciclosMenstruais")) || [];


function calcularDias(data1, data2) {

    const inicio = new Date(data1 + "T00:00:00");
    const fim = new Date(data2 + "T00:00:00");

    const diferenca =
        fim.getTime() - inicio.getTime();

    return Math.round(
        diferenca / (1000 * 60 * 60 * 24)
    );
}


function atualizarResumo() {

    if (ciclos.length === 0) {

        proximaMenstruacao.textContent =
            "Dados insuficientes";

        mediaCiclo.textContent =
            "Dados insuficientes";

        mediaMenstruacao.textContent =
            "Dados insuficientes";

        return;
    }


    const ciclosOrdenados =
        [...ciclos].sort(function(a, b) {
            return new Date(a.inicio) -
                   new Date(b.inicio);
        });


    // MÉDIA DA MENSTRUAÇÃO

    const duracoesMenstruacao = [];

    ciclosOrdenados.forEach(function(ciclo) {

        if (ciclo.fim) {

            const dias =
                calcularDias(
                    ciclo.inicio,
                    ciclo.fim
                ) + 1;

            if (dias > 0) {
                duracoesMenstruacao.push(dias);
            }

        }

    });


    if (duracoesMenstruacao.length > 0) {

        const soma =
            duracoesMenstruacao.reduce(
                function(total, dias) {
                    return total + dias;
                },
                0
            );

        const media =
            Math.round(
                soma /
                duracoesMenstruacao.length
            );

        mediaMenstruacao.textContent =
            media + " dias";

    } else {

        mediaMenstruacao.textContent =
            "Dados insuficientes";

    }


    // MÉDIA DO CICLO

    if (ciclosOrdenados.length >= 2) {

        const duracoesCiclo = [];

        for (
            let i = 1;
            i < ciclosOrdenados.length;
            i++
        ) {

            const dias =
                calcularDias(
                    ciclosOrdenados[i - 1].inicio,
                    ciclosOrdenados[i].inicio
                );

            if (dias > 0) {
                duracoesCiclo.push(dias);
            }

        }


        const soma =
            duracoesCiclo.reduce(
                function(total, dias) {
                    return total + dias;
                },
                0
            );

        const media =
            Math.round(
                soma / duracoesCiclo.length
            );


        mediaCiclo.textContent =
            media + " dias";


        // PRÓXIMA MENSTRUAÇÃO

        const ultimoCiclo =
            ciclosOrdenados[
                ciclosOrdenados.length - 1
            ];

        const proxima =
            new Date(
                ultimoCiclo.inicio +
                "T00:00:00"
            );

        proxima.setDate(
            proxima.getDate() + media
        );


        const dataFormatada =
            proxima.toLocaleDateString(
                "pt-BR"
            );

        proximaMenstruacao.textContent =
            dataFormatada;


        localStorage.setItem(
            "proximaMenstruacaoEstimada",
            dataFormatada
        );

    } else {

        mediaCiclo.textContent =
            "Registre pelo menos 2 ciclos";

        proximaMenstruacao.textContent =
            "Registre pelo menos 2 ciclos";

    }

}


function mostrarHistorico() {

    historicoCiclos.innerHTML = "";

    if (ciclos.length === 0) {

        historicoCiclos.innerHTML =
            "<p>Nenhum ciclo registrado.</p>";

        return;
    }


    [...ciclos]
        .reverse()
        .forEach(function(ciclo, index) {

            const div =
                document.createElement("div");

            div.classList.add("ciclo-item");


            const inicio =
                new Date(
                    ciclo.inicio +
                    "T00:00:00"
                ).toLocaleDateString("pt-BR");


            let fim = "Não informado";

            if (ciclo.fim) {

                fim =
                    new Date(
                        ciclo.fim +
                        "T00:00:00"
                    ).toLocaleDateString("pt-BR");

            }


            div.innerHTML = `
                <p>
                    <strong>Início:</strong>
                    ${inicio}
                </p>

                <p>
                    <strong>Fim:</strong>
                    ${fim}
                </p>

                <p>
                    <strong>Fluxo:</strong>
                    ${ciclo.fluxo || "Não informado"}
                </p>

                ${
                    ciclo.observacao
                    ? `
                    <p>
                        <strong>Observação:</strong>
                        ${ciclo.observacao}
                    </p>
                    `
                    : ""
                }
            `;

            historicoCiclos.appendChild(div);

        });

}


formCiclo.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const inicio =
            document.getElementById("inicio").value;

        const fim =
            document.getElementById("fim").value;

        const fluxo =
            document.getElementById("fluxo").value;

        const observacao =
            document.getElementById("observacao").value;


        if (fim && fim < inicio) {

            alert(
                "A data de término não pode ser anterior à data de início."
            );

            return;

        }


        const novoCiclo = {
            inicio,
            fim,
            fluxo,
            observacao
        };


        ciclos.push(novoCiclo);


        localStorage.setItem(
            "ciclosMenstruais",
            JSON.stringify(ciclos)
        );


        formCiclo.reset();

        atualizarResumo();
        mostrarHistorico();

    }
);


atualizarResumo();
mostrarHistorico();