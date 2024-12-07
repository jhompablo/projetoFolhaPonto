const scriptURL = 'https://script.google.com/macros/s/AKfycbw6skkZd1gg-Si_LHaEYtT69nyYvaY7hd-jgkH1ei0pEGV8b1aMGTCNX5lFXoH9eR4F/exec';


function dataAtualizada() {
    const dataExpediente = document.querySelector('input[name="data"]');
    const horario = document.querySelector('input[name="time"]');
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano}`;

    dataExpediente.value = dataFormatada;
    horario.value = `${horas}:${minutos}`;
}

function horaAtual() {
    const hora = document.querySelector('input[name="time"]');
    const dataAtual = new Date();
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');

    return hora.value = `${horas}:${minutos}`;
    
}

/*
async function submitForm(data) {
    const modal = document.querySelector('.modal');
    const modal_content = document.querySelector('.modal .content');

    // Constrói a URL com os parâmetros de consulta
    const urlWithParams = `${scriptURL}?${data.toString()}`;

    try {
        const response = await fetch(scriptURL, {
            method: 'POST', // Método POST
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: data,
            mode: 'no-cors',
            cache: 'no-cache',
            redirect: 'follow'
        });

        console.log(response.text())

        if (!response.ok) {
            throw new Error('Conexão não foi bem sucedida');
        }

        const responseText = await response.text(); // Lê a resposta
        modal_content.innerHTML = responseText; // Usa a resposta
        modal.classList.add('modal_show');
    } catch (error) {
        modal_content.innerHTML = error.message; // Exibe erro
    } finally {
        modal.classList.add('modal_show'); // Mostra modal
    }
}
*/




function submitForm(data) {
    const modal = document.querySelector('.modal');
    const modal_content = document.querySelector('.modal .content');


    fetch(scriptURL, {
        method: 'POST', // Método POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length,
            'Host': 'script.google.com' 
        },
        body: data,
        mode: 'no-cors',
        cache: 'no-cache',
        redirect: 'follow'
    }).then(response => {
        console.log(response)
        console.log(response.text())
        if (response != 200) {
            throw new Error('Conexão não foi bem sucedida');
        }
        return response.text(); // Retorna a resposta como texto

    }).then(responseText => {
        modal_content.innerHTML = responseText; // Usa a resposta
        modal.classList.add('modal_show');
    }).catch(error => {
        modal_content.innerHTML = error.message; // Exibe erro
    }).finally(() => {
        modal.classList.add('modal_show'); // Mostra modal
    });
}





/*
async function submitForm(data) {
    const modal = document.querySelector('.modal');
    const modal_content = document.querySelector('.modal .content');
    
    const urlWithParams = `${scriptURL}?${data.toString()}`;


    try {
        const response = await fetch(scriptURL, {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
                'Content-Length': data.length,
                'Host': 'script.google.com'
            },
            body: data,
            cache: 'no-cache',
            mode: 'no-cors',
        });

        console.log(response)

        
        if(response.ok){
            const responseText = await response.text();
            modal_content.innerHTML = responseText;
            modal.classList.add('modal_show');
        }else{
            throw new Error('Conexão não foi bem sucedida');
        }
    }catch(error) {
       modal_content.innerHTML = error.message;
    }finally{
        modal.classList.add('modal_show');
    }

}
*/



function onSubmit(event, btnSubmit) {
    event.preventDefault();

    const nome = document.querySelector('select[name="nome"]').value;
    const dataEntrada = document.querySelector('input[name="data"]').value;
    const hora = document.querySelector('input[name="time"]').value;
    const modal = document.querySelector('.modal');
    const modal_content = document.querySelector('.modal .content');
    const select = document.querySelector('select');
    const indexName = select.options[select.selectedIndex];
    const user_id = indexName.getAttribute('data-id'); 

    if(nome === 'Selecione') {
        modal_content.innerHTML = 'Favor selecione um nome';
        modal.classList.add('modal_show');
        return false;
    }

    // modal_content.innerHTML = indexName.getAttribute('data-id')
    // modal.classList.add('modal_show');

    const data = new URLSearchParams();
    data.append('nome', nome);
    data.append('data', dataEntrada);
    data.append('hora', hora);
    data.append('userId', user_id);
    data.append('btnSubmit', btnSubmit);

    submitForm(data);

}


document.addEventListener('DOMContentLoaded', () => {
    dataAtualizada();
    setInterval(dataAtualizada, 60000);

    const btnEntrada = document.getElementById('submit-entrada');
    const btnIntervalo = document.getElementById('submit-intervalo');
    const btnRetorno = document.getElementById('submit-retorno');
    const btnSaida = document.getElementById('submit-saida');    
    const btnConfirm = document.querySelector('.modal button');
    const modal = document.querySelector('.modal');


    btnEntrada.addEventListener('click', ev => onSubmit(ev, 'entrada'));
    btnIntervalo.addEventListener('click', ev => onSubmit(ev, 'intervalo'));
    btnRetorno.addEventListener('click', ev => onSubmit(ev, 'retorno'));
    btnSaida.addEventListener('click', ev => onSubmit(ev, 'saida'));

    btnConfirm.addEventListener('click', ev => modal.classList.remove('modal_show'))

});
