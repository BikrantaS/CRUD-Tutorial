// const { response } = require("express");

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

document.querySelector('table tbody').addEventListener
    ('click', function (event) {
        if (event.target.className === 'delete-row-btn') {
            deleteRowById(event.target.dataset.id);
        }

        if (event.target.className === 'edit-row-btn') {
            handleEditRow(event.target.dataset.id);
        }
    })

const updateBtn = document.querySelector("#update-row-btn");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = function () {
    const searchValue = document.querySelector("#search-input").value;

    fetch('http://localhost:5000/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

}


function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        // .then(data => console.log(data));
        .then(data => {
            if (data.success) {
                location.reload();
                //The location.reload() method reloads the current URL, like the Refresh button.
            }
        });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector("#update-row-btn").dataset.id = id;
}

updateBtn.onclick = function () {
    const updateNameInput = document.querySelector('#update-name-input');
    fetch('http://localhost:5000/update',
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: updateNameInput.dataset.id,
                name: updateNameInput.value
            })

        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
                console.log("Done")
            }

        });

}



const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}


function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');



    let tableHtml = "</tr>";
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleDateString();
            }
            tableHtml += `<td>${data[key]}</td>`;

        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        //The HTMLTableElement.insertRow() method inserts a new row (<tr>) in a given <table>, and returns a reference to the new row.
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    // console.log(data)
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td><tr>";
        return;
    }
    let tableHtml = "";
    data.forEach(function ({ id, name, date_added }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleDateString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "<tr>";
    });

    table.innerHTML = tableHtml;
    // console.log(tableHtml);
}