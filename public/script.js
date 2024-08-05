const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

// Function to display users in the table
function displayUsers(users) {
    userTable.innerHTML = ''; // Clear the table
    users.forEach(user => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
    });
}

// Fetch users from the server
async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();
    displayUsers(users);
}

// Add a new user
userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;

    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, username }),
    });

    if (response.ok) {
        fetchUsers(); // Refresh the user list
        userForm.reset();
    }
});

// Edit a user
async function editUser(id) {
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');
    const username = prompt('Enter new username:');
    if (name && email && username) {
        const response = await fetch(`/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, username }),
        });

        if (response.ok) {
            fetchUsers(); // Refresh the user list
        }
    }
}

// Delete a user
async function deleteUser(id) {
    const response = await fetch(`/users/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchUsers(); // Refresh the user list
    }
}

// Initial fetch to populate the user list
fetchUsers();
