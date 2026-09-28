const form =
    document.getElementById("formAnticoncepcional");

const nomeMedicamento =
    document.getElementById("nomeMedicamento");

const horario =
    document.getElementById("horario");

const nomeExibido =
    document.getElementById("nomeExibido");

const horarioExibido =
    document.getElementById("horarioExibido");

const botaoTomei =
    document.getElementById("botaoTomei");

const statusHoje =
    document.getElementById("statusHoje");

const dataHoje =
    document.getElementById("dataHoje");

const tituloMes =
    document.getElementById("tituloMes");

const calendario =
    document.getElementById("calendario");

const mesAnterior =
    document.getElementById("mesAnterior");

const proximoMes =
    document.getElementById("proximoMes");

const editarMedicamento =
    document.getElementById("editarMedicamento");


let dataVisualizada = new Date();


let registros =
    JSON.parse(
        localStorage.getItem(
            "registrosAnticoncepcional"
        )
    ) || {};


function chaveData(data) {

    const ano = data.getFullYear();

    const mes =
        String(data.getMonth() + 1)
            .padStart(2, "0");

    const dia =
        String(data.getDate())
            .padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


function carregarMedicamento() {

    const nome =
        localStorage.getItem(
            "nomeAnticoncepcional"
        );

    const hora =
        localStorage.getItem(
            "horarioAnticoncepcional"
        );

    if (nome) {

        nomeExibido.textContent = nome;

        nomeMedicamento.value = nome;

    }

    if (hora) {

        horarioExibido.textContent = hora;

        horario.value = hora;

    }

}


form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        localStorage.setItem(
            "nomeAnticoncepcional",
            nomeMedicamento.value
        );

        localStorage.setItem(
            "horarioAnticoncepcional",
            horario.value
        );

        carregarMedicamento();

        alert(
            "Anticoncepcional salvo!"
        );

    }
);


editarMedicamento.addEventListener(
    "click",
    function() {

        document
            .getElementById("configuracao")
            .scrollIntoView({
                behavior: "smooth"
            });

        nomeMedicamento.focus();

    }
);


function atualizarHoje() {

    const hoje = new Date();

    dataHoje.textContent =
        hoje.toLocaleDateString(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long"
            }
        );

    const chave =
        chaveData(hoje);

    if (registros[chave]) {

        statusHoje.textContent =
            "Dose registrada ✓";

        botaoTomei.textContent =
            "Registrado ✓";

    } else {

        statusHoje.textContent =
            "Dose ainda não registrada.";

        botaoTomei.textContent =
            "Marcar como tomado";

    }

}


botaoTomei.addEventListener(
    "click",
    function() {

        const chave =
            chaveData(new Date());

        registros[chave] =
            !registros[chave];

        if (!registros[chave]) {
            delete registros[chave];
        }

        salvarRegistros();

        atualizarHoje();

        criarCalendario();

    }
);


function salvarRegistros() {

    localStorage.setItem(
        "registrosAnticoncepcional",
        JSON.stringify(registros)
    );

}


function criarCalendario() {

    calendario.innerHTML = "";

    const ano =
        dataVisualizada.getFullYear();

    const mes =
        dataVisualizada.getMonth();

    tituloMes.textContent =
        dataVisualizada.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    const primeiroDia =
        new Date(ano, mes, 1)
            .getDay();

    const quantidadeDias =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();


    for (
        let i = 0;
        i < primeiroDia;
        i++
    ) {

        const vazio =
            document.createElement("div");

        vazio.classList.add(
            "dia-vazio"
        );

        calendario.appendChild(vazio);

    }


    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        const data =
            new Date(
                ano,
                mes,
                dia
            );

        const chave =
            chaveData(data);

        const elemento =
            document.createElement("button");

        elemento.type = "button";

        elemento.classList.add("dia");

        elemento.textContent = dia;


        if (registros[chave]) {

            elemento.classList.add(
                "tomado"
            );

            elemento.textContent = "✓";

        }


        const hoje =
            new Date();

        if (
            dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear()
        ) {

            elemento.classList.add(
                "hoje"
            );

        }


        elemento.addEventListener(
            "click",
            function() {

                registros[chave] =
                    !registros[chave];

                if (!registros[chave]) {

                    delete registros[chave];

                }

                salvarRegistros();

                criarCalendario();

                atualizarHoje();

            }
        );


        calendario.appendChild(
            elemento
        );

    }

}


mesAnterior.addEventListener(
    "click",
    function() {

        dataVisualizada.setMonth(
            dataVisualizada.getMonth() - 1
        );

        criarCalendario();

    }
);


proximoMes.addEventListener(
    "click",
    function() {

        dataVisualizada.setMonth(
            dataVisualizada.getMonth() + 1
        );

        criarCalendario();

    }
);


carregarMedicamento();

atualizarHoje();

criarCalendario();