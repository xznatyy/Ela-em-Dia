const formSaude = document.getElementById("formSaude");

const tipoSanguineo = document.getElementById("tipoSanguineo");
const alergias = document.getElementById("alergias");
const medicamentos = document.getElementById("medicamentos");
const historico = document.getElementById("historico");

const mensagem = document.getElementById("mensagem");

const dadosSalvos =
    JSON.parse(localStorage.getItem("minhaSaude"));

if (dadosSalvos) {

    tipoSanguineo.value =
        dadosSalvos.tipoSanguineo || "";

    alergias.value =
        dadosSalvos.alergias || "";

    medicamentos.value =
        dadosSalvos.medicamentos || "";

    historico.value =
        dadosSalvos.historico || "";
}

formSaude.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = {

        tipoSanguineo: tipoSanguineo.value,

        alergias: alergias.value,

        medicamentos: medicamentos.value,

        historico: historico.value

    };

    localStorage.setItem(
        "minhaSaude",
        JSON.stringify(dados)
    );

    mensagem.textContent =
        "Informações salvas com sucesso ✓";

});