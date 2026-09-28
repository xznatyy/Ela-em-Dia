const CACHE_NAME = "ela-em-dia-v1";

const arquivos = [
    "./",
    "./index.html",
    "./cadastro.html",
    "./home.html",
    "./ciclo.html",
    "./anticoncepcional.html",
    "./agenda.html",
    "./sintomas.html",
    "./minha-saude.html",

    "./css/global.css",
    "./css/login.css",
    "./css/cadastro.css",
    "./css/home.css",
    "./css/ciclo.css",
    "./css/anticoncepcional.css",
    "./css/agenda.css",
    "./css/sintomas.css",
    "./css/minha-saude.css",

    "./js/login.js",
    "./js/home.js",
    "./js/ciclo.js",
    "./js/anticoncepcional.js",
    "./js/agenda.js",
    "./js/sintomas.js",
    "./js/minha-saude.js",
    "./js/menu.js",
    "./js/tema.js"
];

self.addEventListener("install", function(event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(arquivos);
            })
    );

});

self.addEventListener("fetch", function(event) {

    event.respondWith(
        caches.match(event.request)
            .then(function(resposta) {

                return resposta || fetch(event.request);

            })
    );

});