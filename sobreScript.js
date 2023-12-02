document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('sobre');
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
        var aparencia = document.getElementById('aparencia').value;
        var navegacao = document.getElementById('navegacao').value;
        var content = document.getElementById('content').value;
        var bug = document.getElementById('bug').value;
        var sugestao = document.getElementById('sugestao').value;
        var email = document.getElementById('email').value;

        if (email.length == 0) {
            alert('Informe seu email');
        } else {
            var formData = {
                data: data,
                aparencia: aparencia,
                navegacao: navegacao,
                content: content,
                bug: bug,
                sugestao: sugestao,
                email: email
            };

            let items = JSON.parse(localStorage.getItem('formItems')) || [];
            items.push(formData);
            localStorage.setItem('formItems', JSON.stringify(items));

            alert('Seu feedback foi cadastrado');
        }
    }

    function renderList(items) {
        list.innerHTML = '';

        const itemList = items || JSON.parse(localStorage.getItem('formItems')) || [];

        itemList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.data} - Email: ${item.email}, Bugs: ${item.bug}`;

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
            return item.email.toLowerCase().includes(searchTerm);
        });

        renderList(filteredItems);
    }

    renderList();
});