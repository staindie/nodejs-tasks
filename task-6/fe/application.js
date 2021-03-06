(async function() {
    getDbItemsList();
})();

async function handleResponse(data,callback) {
    const result = await data.json();
    if (data.ok) {
        callback(result);
    } else {
        alert(result.sqlMessage);
    }
}

async function getDbItemsList() {
    const res = await fetch('./post-query', {
        method: 'POST',
        body: JSON.stringify({ query: 'SHOW DATABASES;' }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then( response =>  handleResponse(response, fillDbItemsList));
}

function fillDbItemsList(items) {
    const requestSelector = document.getElementById('dbSelector');
    requestSelector.innerHTML = '<option value=""></option>';
    items.forEach(function({ Database }) {
        const option = document.createElement('option');
        option.innerHTML = Database;
        option.value = Database;
        requestSelector.appendChild(option);
    });
}

function getFormData() {
    const formElement = document.forms.queryForm;
    return formData = new FormData(formElement);
}

function handleDbQuery() {
    fetch('./post-query', {
        method: 'POST',
        body: getFormData()
    })
        .then( response => handleResponse(response, fillTable));
}

function fillTable(response) {
    const tablePanel = document.getElementById('response-table');
    tablePanel.innerHTML = '';
    if (response && response.length) {
        const headerElement = document.createElement('tr');
        Object.keys(response[0]).forEach(cellKey => {
            const headerCellElement = document.createElement('th');
            headerCellElement.innerHTML = cellKey;
            headerElement.appendChild(headerCellElement);
        });
        tablePanel.appendChild(headerElement);
        response.forEach(row => {
            const rowElement = document.createElement('tr');
            Object.keys(row).forEach(cellKey => {
                const cellElement = document.createElement('td');
                cellElement.innerHTML = row[cellKey];
                rowElement.appendChild(cellElement);
            });
            tablePanel.appendChild(rowElement);
        })
    }
}
