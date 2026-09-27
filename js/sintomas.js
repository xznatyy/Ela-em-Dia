const form = document.getElementById("formSintomas");

const dor = document.getElementById("dor");
const nivelDor = document.getElementById("nivelDor");

const listaSintomas =
    document.getElementById("listaSintomas");

const mensagem =
    document.getElementById("mensagem");

let registros =
    JSON.parse(localStorage.getItem("registrosSintomas")) || [];

dor.addEventListener("input", function() {

    nivelDor.textContent = dor.value;

});

function mostrarRegistros() {

    listaSintomas.innerHTML = "";

    if (registros.length === 0) {

        listaSintomas.innerHTML =
            "<p>Nenhum registro realizado.</p>";

        return;
    }

    registros
        .slice()
        .reverse()
        .forEach(function(registro) {

            const div = document.createElement("div");

            div.classList.add("registro-sintoma");

            div.innerHTML = `
                <p><strong>${registro.data}</strong></p>

                <p>
                    Sintomas:
                    ${registro.sintomas.length
                        ? registro.sintomas.join(", ")
                        : "Nenhum"}
                </p>

                <p>
                    Humor:
                    ${registro.humor || "Não informado"}
                </p>

                <p>
                    Desconforto:
                    ${registro.dor}/10
                </p>

                ${
                    registro.observacao
                    ? `<p>Observação: ${registro.observacao}</p>`
                    : ""
                }
            `;

            listaSintomas.appendChild(div);

        });

}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const selecionados =
        document.querySelectorAll(
            '.opcoes input[type="checkbox"]:checked'
        );

    const sintomas =
        Array.from(selecionados)
            .map(function(item) {
                return item.value;
            });

    const humor =
        document.getElementById("humor").value;

    const observacao =
        document.getElementById("observacao").value;

    const data =
        new Date().toLocaleDateString("pt-BR");

    const registro = {
        data,
        sintomas,
        humor,
        dor: dor.value,
        observacao
    };

    registros.push(registro);

    localStorage.setItem(
        "registrosSintomas",
        JSON.stringify(registros)
    );

    form.reset();

    nivelDor.textContent = "0";

    mensagem.textContent =
        "Registro salvo com sucesso ✓";

    mostrarRegistros();

});

mostrarRegistros();