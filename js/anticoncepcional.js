const form = document.getElementById("formAnticoncepcional");

const nomeMedicamento = document.getElementById("nomeMedicamento");
const horario = document.getElementById("horario");

const horarioExibido = document.getElementById("horarioExibido");
const botaoTomei = document.getElementById("botaoTomei");
const statusDose = document.getElementById("statusDose");

const horarioSalvo = localStorage.getItem("horarioAnticoncepcional");
const nomeSalvo = localStorage.getItem("nomeAnticoncepcional");

if (horarioSalvo) {
    horarioExibido.textContent = horarioSalvo;
}

if (nomeSalvo) {
    nomeMedicamento.value = nomeSalvo;
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    localStorage.setItem(
        "nomeAnticoncepcional",
        nomeMedicamento.value
    );

    localStorage.setItem(
        "horarioAnticoncepcional",
        horario.value
    );

    horarioExibido.textContent = horario.value;

    alert("Anticoncepcional salvo!");

});

botaoTomei.addEventListener("click", function() {

    const hoje = new Date().toLocaleDateString("pt-BR");

    localStorage.setItem("ultimaDose", hoje);

    statusDose.textContent =
        "Dose de hoje registrada ✓";

});

const ultimaDose = localStorage.getItem("ultimaDose");

const hoje = new Date().toLocaleDateString("pt-BR");

if (ultimaDose === hoje) {
    statusDose.textContent =
        "Dose de hoje registrada ✓";
}