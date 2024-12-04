// Carregar atalhos armazenados no localStorage ao carregar a página
window.onload = function() {
    carregarAtalhos();
};

// Função para salvar atalhos no localStorage
function salvarAtalhos(atalhos) {
    localStorage.setItem('atalhos', JSON.stringify(atalhos));
}

// Função para carregar atalhos do localStorage
function carregarAtalhos() {
    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    exibirAtalhos(atalhos);
}

// Função para exibir os atalhos na lista
function exibirAtalhos(atalhos) {
    const listaAssuntos = document.getElementById('lista-assuntos');
    listaAssuntos.innerHTML = ''; // Limpar a lista antes de preencher

    atalhos.forEach(at => {
        const item = document.createElement('li');
        item.classList.add('atalho-item');
        item.innerHTML = `
            <div class="atalho-titulo">${at.titulo}</div>
            <div class="atalho-conteudo">${at.conteudo}</div>
            <div class="atalho-botoes">
                <button id="btn-editar" onclick="editarAtalho(${at.id})">Editar <i class="fa-regular fa-pen-to-square"></i></button>

                <button id="btn-excluir" onclick="excluirAtalho(${at.id})">Excluir <i class="fa-regular fa-trash-can"></i></button>

                <button id="btn-copiar" onclick="copiarConteudo(${at.id})">Copiar <i class="fa-regular fa-copy"></i></button>
            </div>
        `;
        listaAssuntos.appendChild(item);
    });
}

// Função para copiar o conteúdo do atalho
function copiarConteudo(id) {
    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    let atalho = atalhos.find(at => at.id === id);

    if (atalho) {
        navigator.clipboard.writeText(atalho.conteudo)
            .then(() => {
                alert('Conteúdo copiado para a área de transferência!');
            })
            .catch(err => {
                alert('Falha ao copiar o conteúdo: ' + err);
            });
    }
}

// Função para cadastrar um novo atalho
function cadastrarAssunto() {
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;

    if (titulo === '' || conteudo === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    const idNovoAtalho = new Date().getTime(); // Usar o timestamp como ID único

    atalhos.push({
        id: idNovoAtalho,
        titulo: titulo,
        conteudo: conteudo
    });

    salvarAtalhos(atalhos);
    exibirAtalhos(atalhos);

    // Limpar campos após cadastro
    document.getElementById('titulo').value = '';
    document.getElementById('conteudo').value = '';
}

// Função para editar um atalho
function editarAtalho(id) {
    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    let atalho = atalhos.find(at => at.id === id);

    if (atalho) {
        document.getElementById('titulo').value = atalho.titulo;
        document.getElementById('conteudo').value = atalho.conteudo;

        // Alterar o botão de cadastrar para um botão de salvar as alterações
        const btnCadastrar = document.querySelector('.btn button');
        btnCadastrar.textContent = 'Salvar Alterações';
        btnCadastrar.setAttribute('onclick', `salvarAlteracoes(${id})`);
    }
}

// Função para salvar as alterações feitas em um atalho
function salvarAlteracoes(id) {
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;

    if (titulo === '' || conteudo === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    let atalho = atalhos.find(at => at.id === id);

    if (atalho) {
        atalho.titulo = titulo;
        atalho.conteudo = conteudo;
    }

    salvarAtalhos(atalhos);
    exibirAtalhos(atalhos);

    // Limpar campos e restaurar o botão para "Cadastrar"
    document.getElementById('titulo').value = '';
    document.getElementById('conteudo').value = '';
    const btnCadastrar = document.querySelector('.btn button');
    btnCadastrar.textContent = 'Cadastrar';
    btnCadastrar.setAttribute('onclick', 'cadastrarAssunto()');
}

// Função para excluir um atalho
function excluirAtalho(id) {
    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    atalhos = atalhos.filter(at => at.id !== id);

    salvarAtalhos(atalhos);
    exibirAtalhos(atalhos);
}

// Função para filtrar os atalhos pelo título
function filtrarAssuntos() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    let atalhos = JSON.parse(localStorage.getItem('atalhos')) || [];
    atalhos = atalhos.filter(at => at.titulo.toLowerCase().includes(filtro));

    exibirAtalhos(atalhos);
}
