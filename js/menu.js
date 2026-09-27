const menuBotao = document.getElementById("menuBotao");
const menuNav = document.getElementById("menuNav");

if (menuBotao && menuNav) {

    menuBotao.addEventListener("click", function() {

        menuNav.classList.toggle("aberto");

        if (menuNav.classList.contains("aberto")) {
            menuBotao.textContent = "✕";
        } else {
            menuBotao.textContent = "☰";
        }

    });


    const linksMenu = menuNav.querySelectorAll("a");

    linksMenu.forEach(function(link) {

        link.addEventListener("click", function() {

            menuNav.classList.remove("aberto");

            menuBotao.textContent = "☰";

        });

    });

}