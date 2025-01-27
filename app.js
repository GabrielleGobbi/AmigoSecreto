// Lista para armazenar os participantes
let participantes = [];

// Função para adicionar um participante
function adicionarAmigo() {
    const inputNome = document.getElementById('amigo');
    const nome = inputNome.value.trim();

    // Verificar se o nome é válido e não está duplicado
    if (nome === '') {
        alert('Por favor, insira um nome válido!');
        return;
    }

    if (participantes.includes(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    // Adicionar nome à lista e atualizar a interface
    participantes.push(nome);
    atualizarLista();
    inputNome.value = ''; // Limpar o campo de entrada
}

// Função para remover um participante
function removerAmigo(nome) {
    participantes = participantes.filter(participante => participante !== nome);
    atualizarLista();
}

// Função para atualizar a lista de participantes exibida
function atualizarLista() {
    const listaElement = document.getElementById('listaAmigos');
    listaElement.innerHTML = ''; // Limpar a lista atual

    participantes.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.className = 'button-add'; // Reutilizando estilo dos botões
        botaoRemover.onclick = () => removerAmigo(nome);

        li.appendChild(botaoRemover);
        listaElement.appendChild(li);
    });
}

// Função para realizar o sorteio
function sortearAmigo() {
    if (participantes.length < 2) {
        alert('É necessário pelo menos 2 participantes para realizar o sorteio!');
        return;
    }

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = ''; // Limpar resultados anteriores

    const participantesDisponiveis = [...participantes];
    const sorteio = {};

    const embaralhados = embaralhar([...participantes]);

    for (let i = 0; i < participantes.length; i++) {
        const participante = participantes[i];

        const amigo = embaralhados.find(p => p !== participante && !Object.values(sorteio).includes(p));

        if (!amigo) {
            alert('Erro no sorteio. Por favor, tente novamente.');
            return;
        }

        sorteio[participante] = amigo;
        embaralhados.splice(embaralhados.indexOf(amigo), 1);
    }

    for (const [participante, amigo] of Object.entries(sorteio)) {
        const li = document.createElement('li');
        li.textContent = `${participante} tirou ${amigo}`;
        resultadoElement.appendChild(li);
    }

    alert('Sorteio realizado com sucesso! Confira os resultados abaixo.');
}

// Função para embaralhar um array (Fisher-Yates Shuffle)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para reiniciar o jogo
function reiniciar() {
    participantes = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    alert('Jogo reiniciado! Adicione novos participantes para começar.');
}

// Adicionar evento de tecla Enter no campo de entrada
document.getElementById('amigo').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});
