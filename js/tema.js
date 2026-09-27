document.addEventListener("DOMContentLoaded", function () {

    const temaBotao = document.getElementById("temaBotao");

    const temaSalvo = localStorage.getItem("tema") || "claro";

    if (temaSalvo === "escuro") {
        document.documentElement.setAttribute("data-theme", "dark");

        if (temaBotao) {
            temaBotao.textContent = "☀️";
        }

    } else {
        document.documentElement.setAttribute("data-theme", "light");

        if (temaBotao) {
            temaBotao.textContent = "🌙";
        }
    }

    if (temaBotao) {

        temaBotao.addEventListener("click", function () {

            const temaAtual =
                document.documentElement.getAttribute("data-theme");

            if (temaAtual === "dark") {

                document.documentElement.setAttribute(
                    "data-theme",
                    "light"
                );

                localStorage.setItem("tema", "claro");

                temaBotao.textContent = "🌙";

            } else {

                document.documentElement.setAttribute(
                    "data-theme",
                    "dark"
                );

                localStorage.setItem("tema", "escuro");

                temaBotao.textContent = "☀️";
            }

        });

    }

});