const formAgenda = document.getElementById("formAgenda");
const listaCompromissos = document.getElementById("listaCompromissos");

let compromissos =
    JSON.parse(localStorage.getItem("compromissos")) || [];

function mostrarCompromissos() {

    listaCompromissos.innerHTML = "";

    if (compromissos.length === 0) {

        listaCompromissos.innerHTML =
            "<p>Nenhum compromisso cadastrado.</p>";

        return;
    }

    compromissos.forEach(function(compromisso, index) {

        const div = document.createElement("div");

        div.classList.add("compromisso");

        const dataFormatada =
            new Date(compromisso.data + "T00:00:00")
                .toLocaleDateString("pt-BR");

        div.innerHTML = `
            <h4>${compromisso.tipo}</h4>

            <p>
                <strong>${compromisso.titulo}</strong>
            </p>

            <p>
                📅 ${dataFormatada}
            </p>

            <p>
                🕐 ${compromisso.hora}
            </p>

            ${
                compromisso.local
                ? `<p>📍 ${compromisso.local}</p>`
                : ""
            }

            ${
                compromisso.observacao
                ? `<p>${compromisso.observacao}</p>`
                : ""
            }

            <button
                class="botao-excluir"
                onclick="excluirCompromisso(${index})"
            >
                Excluir
            </button>
        `;

        listaCompromissos.appendChild(div);

    });

}

formAgenda.addEventListener("submit", function(event) {

    event.preventDefault();

    const tipo =
        document.getElementById("tipo").value;

    const titulo =
        document.getElementById("tituloCompromisso").value;

    const data =
        document.getElementById("data").value;

    const hora =
        document.getElementById("hora").value;

    const local =
        document.getElementById("local").value;

    const observacao =
        document.getElementById("observacao").value;

    const novoCompromisso = {
        tipo,
        titulo,
        data,
        hora,
        local,
        observacao
    };

    compromissos.push(novoCompromisso);

    localStorage.setItem(
        "compromissos",
        JSON.stringify(compromissos)
    );

    formAgenda.reset();

    mostrarCompromissos();

});

function excluirCompromisso(index) {

    compromissos.splice(index, 1);

    localStorage.setItem(
        "compromissos",
        JSON.stringify(compromissos)
    );

    mostrarCompromissos();

}

mostrarCompromissos();