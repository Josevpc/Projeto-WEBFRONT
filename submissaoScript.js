document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('submission');
    const list = document.getElementById('list');
    var clearAllButton = document.getElementById('clearAll');
    var searchBar = document.getElementById('searchInput');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        addToLocalStorage();
        renderList();
        form.reset();
    });

    clearAllButton.addEventListener('click', function () {
        clearAllItems();
    });

    searchBar.addEventListener('keyup', function () {
        searchItems();
    })

    function addToLocalStorage() {
        var data = new Date().toLocaleString()
        var nome = document.getElementById('nome').value;
        var curso = document.getElementById('curso').value;
        var email = document.getElementById('contato').value;
        var tema = document.getElementById('tema').value;
        var titulo = document.getElementById('titulo-trabalho').value;
        var resumo = document.getElementById('resumo').value;

        if (nome.length == 0) {
            alert('Informe seu nome');
        } else if (email.length == 0) {
            alert('Informe um email');
        } else if (tema.length == 0) {
            alert('Informe o tema do seu trabalho');
        } else if (titulo.length == 0) {
            alert('Informe o titulo do seu trabalho');
        } else if (resumo.length == 0) {
            alert('Informe o resumo do seu trabalho');
        } else if (!titulo.length > 20) {
            alert('O título deve ter 20 caracteres no máximo');
        } else {
            var formData = {
                data: data,
                nome: nome,
                curso: curso,
                email: email,
                tema: tema,
                titulo: titulo,
                resumo: resumo
            };

            let items = JSON.parse(localStorage.getItem('formItems')) || [];
            items.push(formData);
            localStorage.setItem('formItems', JSON.stringify(items));

            alert('Seu trabalho foi cadastrado');
        }
    }

    function renderList(items) {
        list.innerHTML = '';

        const itemList = items || JSON.parse(localStorage.getItem('formItems')) || [];

        itemList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.data} - Titulo: ${item.titulo}, Autor: ${item.nome}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', function () {
                const index = itemList.indexOf(item);
                if (index !== -1) {
                    deleteItem(index);
                    renderList();
                }
            });


            listItem.appendChild(deleteButton);
            list.appendChild(listItem);
        });
    }


    function deleteItem(indexToDelete) {
        const items = JSON.parse(localStorage.getItem('formItems')) || [];

        if (indexToDelete >= 0 && indexToDelete < items.length) {
            items.splice(indexToDelete, 1);
            localStorage.setItem('formItems', JSON.stringify(items));
        }
    }

    function clearAllItems() {
        localStorage.removeItem('formItems');
        renderList();
    }

    function searchItems() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const items = JSON.parse(localStorage.getItem('formItems')) || [];

        const filteredItems = items.filter(item => {
            return item.nome.toLowerCase().includes(searchTerm);
        });

        renderList(filteredItems);
    }

    renderList();
});