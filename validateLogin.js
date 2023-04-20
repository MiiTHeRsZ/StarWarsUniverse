import React from "react";

const MENSAGEM_EMAIL = 'Digite o seu e-mail.';
const MENSAGEM_PASSWORD = 'Digite a sua senha.';

export default async function ValidateLogin(email, password, status, activity) {
    if (email.trim().length === 0) {
        alert(MENSAGEM_EMAIL);
        return;
    }

    if (password.trim().length === 0) {
        alert(MENSAGEM_PASSWORD);
        return;
    }

    activity(true);

    let usuario = {
        email: email,
        password: password,
    };

    await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then((response) => {
            if (response.status === 200) {
                response.text().then(function (result) {
                    status('Com sucesso autenticado o você foi');
                    console.log(result);
                });
            } else {
                status(`Inválido o usuário ou a senha está`);
            }
            activity(false);
        })
        .catch(() => status('Executar login possível não foi...'));
}