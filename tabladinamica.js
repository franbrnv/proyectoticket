async function mostrarTickets() {
  try {
    const response = await fetch('http://localhost:3000/api/tickets');
    if (!response.ok) {
      throw new Error('Error al obtener los tickets');
    }
    const tickets = await response.json();
    const tabla = document.getElementById('tablaTickets');
    tabla.innerHTML = ''; // Limpiar la tabla antes de mostrar los nuevos datos

    tickets.forEach(ticket => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${ticket.id}</td>
        <td>${ticket.nombre_completo}</td>
        <td>${ticket.numero_de_telofono}</td>
        <td>${ticket.mail}</td>
        <td>${ticket.tipoEquipo}</td>
        <td>${ticket.descripProblema}</td>
        <td>${ticket.fechaNecesaria}</td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al mostrar los tickets:', error);
  }
    
}