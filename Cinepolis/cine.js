// Datos iniciales: 20 asientos disponibles
const seats = Array(20).fill(null);

// Elementos del DOM
const seatNumberInput = document.getElementById('seatNumber');
const personNameInput = document.getElementById('personName');
const reserveButton = document.getElementById('reserveButton');
const seatTable = document.getElementById('seatTable');

// Renderizar la tabla de asientos
function renderSeats() {
    seatTable.innerHTML = '';
    seats.forEach((seat, index) => {
        const row = document.createElement('tr');

        // Crear celdas
        const seatCell = document.createElement('td');
        seatCell.textContent = index + 1;

        const statusCell = document.createElement('td');
        statusCell.textContent = seat ? seat : 'Disponible';
        statusCell.className = seat ? 'occupied' : 'available';

        const actionsCell = document.createElement('td');

        // Botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('action-button', 'edit');
        editButton.onclick = () => editReservation(index);

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('action-button', 'delete');
        deleteButton.onclick = () => cancelReservation(index);

        if (seat) {
            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        }

        row.appendChild(seatCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        seatTable.appendChild(row);
    });
}

// Reservar un asiento
function reserveSeat() {
    const seatNumber = parseInt(seatNumberInput.value);
    const personName = personNameInput.value.trim();

    if (isNaN(seatNumber) || seatNumber < 1 || seatNumber > 20) {
        alert('Por favor, ingresa un número de asiento válido (1-20).');
        return;
    }
    if (personName === '') {
        alert('Por favor, ingresa el nombre del cliente.');
        return;
    }

    if (seats[seatNumber - 1]) {
        alert(`El asiento ${seatNumber} ya está ocupado. Elige otro asiento.`);
    } else {
        seats[seatNumber - 1] = personName;
        renderSeats();
        clearInputs();
    }
}

// Editar una reservación
function editReservation(index) {
    const newName = prompt('Ingresa el nuevo nombre para la reservación:', seats[index]);
    if (newName !== null && newName.trim() !== '') {
        seats[index] = newName.trim();
        renderSeats();
    }
}

// Cancelar una reservación
function cancelReservation(index) {
    const confirmation = confirm(`¿Estás seguro de que deseas cancelar la reservación para el asiento ${index + 1}?`);
    if (confirmation) {
        seats[index] = null;
        renderSeats();
    }
}

// Limpiar entradas
function clearInputs() {
    seatNumberInput.value = '';
    personNameInput.value = '';
}

// Eventos
reserveButton.addEventListener('click', reserveSeat);

// Inicializar la tabla al cargar la página
renderSeats();