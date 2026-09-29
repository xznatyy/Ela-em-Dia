const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


// ==============================
// CONFIGURAÇÕES
// ==============================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "ela-em-dia-chave-secreta",
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);


// Arquivos HTML, CSS, JS, imagens...
app.use(
    express.static(
        path.join(__dirname)
    )
);


// ==============================
// BANCO DE DADOS
// ==============================

const banco = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10
});


async function testarBanco() {

    try {

        const conexao =
            await banco.getConnection();

        console.log(
            "Banco de dados conectado ✓"
        );

        conexao.release();

    } catch (erro) {

        console.error(
            "Erro ao conectar ao banco:",
            erro.message
        );

    }

}

testarBanco();


// ==============================
// TESTE
// ==============================

app.get("/api/teste", function (req, res) {

    res.json({
        mensagem: "Ela em Dia funcionando!"
    });

});


// ==============================
// CADASTRO
// ==============================

app.post("/api/cadastro", async function (req, res) {

    try {

        const {
            nome,
            dataNascimento,
            email,
            senha
        } = req.body;


        if (
            !nome ||
            !dataNascimento ||
            !email ||
            !senha
        ) {

            return res.status(400).json({
                mensagem:
                    "Preencha todos os campos."
            });

        }


        if (senha.length < 8) {

            return res.status(400).json({
                mensagem:
                    "A senha deve ter pelo menos 8 caracteres."
            });

        }


        const [usuarios] =
            await banco.execute(
                `
                SELECT id
                FROM usuarios
                WHERE email = ?
                `,
                [email]
            );


        if (usuarios.length > 0) {

            return res.status(409).json({
                mensagem:
                    "Este e-mail já está cadastrado."
            });

        }


        const senhaHash =
            await bcrypt.hash(
                senha,
                12
            );


        const [resultado] =
            await banco.execute(
                `
                INSERT INTO usuarios
                (
                    nome,
                    data_nascimento,
                    email,
                    senha_hash
                )
                VALUES (?, ?, ?, ?)
                `,
                [
                    nome,
                    dataNascimento,
                    email,
                    senhaHash
                ]
            );


        return res.status(201).json({
            mensagem:
                "Conta criada com sucesso!",

            usuarioId:
                resultado.insertId
        });


    } catch (erro) {

        console.error(
            "Erro no cadastro:",
            erro
        );

        return res.status(500).json({
            mensagem:
                "Erro ao criar a conta."
        });

    }

});


// ==============================
// LOGIN
// ==============================
console.log("Rota de login carregada ✓");
app.post("/api/login", async function (req, res) {

    try {

        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Informe seu e-mail e sua senha."
            });
        }

        const [usuarios] = await banco.execute(
            `
            SELECT
                id,
                nome,
                email,
                senha_hash
            FROM usuarios
            WHERE email = ?
            `,
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }

        const usuario = usuarios[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });
        }

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        return res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {

        console.error("Erro no login:", erro);

        return res.status(500).json({
            mensagem: "Erro ao realizar login."
        });
    }

});

app.listen(PORT, function () {
    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );
});