document.getElementById("ticket").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre_completo = document.getElementById('nombre_completo').value.trim();
  const numero_de_telofono = document.getElementById('numero_de_telofono').value.trim();
  const mail = document.getElementById('mail').value.trim();
  const tipoEquipo = document.getElementById('tipoEquipo').value.trim();
  const descripProblema = document.getElementById('descripProblema').value.trim();
  const fechaNecesaria = document.getElementById('fechaNecesaria').value;

  if (!nombre_completo || !numero_de_telofono || !mail || !tipoEquipo || !descripProblema || !fechaNecesaria) {
    alert('Por favor, completá todos los campos.');
    return;
  }

  const datos = {
    nombre_completo,
    numero_de_telofono,
    mail,
    tipoEquipo,
    descripProblema,
    fechaNecesaria,
  };

  try {
    const respuesta = await fetch('http://localhost:3000/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    const resultado = await respuesta.json(); // Captura mensaje del backend

    if (respuesta.ok) {
      alert('¡Registro exitoso!');
      document.getElementById("ticket").reset();
      mostrarTickets();
    } else {
      console.error('Respuesta del servidor:', resultado);
      alert('Error al registrar: ' + (resultado.mensaje || 'Error desconocido'));
    }

  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    alert('Hubo un error al conectar con el servidor');
  }
});
