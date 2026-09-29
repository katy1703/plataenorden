let tareas = JSON.parse(localStorage.getItem("tareasStudyHelp") || "[]");

function guardarTareas() {
    localStorage.setItem("tareasStudyHelp", JSON.stringify(tareas));
}

function mostrarTareas() {
    const lista = document.getElementById("listaTareas");
    if (!lista) return;
    lista.innerHTML = "";

    if (tareas.length === 0) {
        lista.innerHTML = "<p>Todavía no tenés tareas</p>";
        return;
    }

    tareas.forEach(function(tarea) {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${tarea.materia}:</strong> ${tarea.titulo} - ${formatearFecha(tarea.fecha)}
            <button onclick="cambiarEstado(${tarea.id})">${tarea.completada? "✔️" : "Pendiente"}</button>
            <button onclick="eliminarTarea(${tarea.id})">Borrar</button></p>
        `;
        lista.appendChild(div);
    });
    actualizarContadores();
}

function agregarTarea() {
    const materia = document.getElementById("materia").value;
    const titulo = document.getElementById("titulo").value;
    const fecha = document.getElementById("fecha").value;

    if (!titulo ||!fecha) {
        alert("Completá titulo y fecha");
        return;
    }

    const nueva = {
        id: Date.now(),
        materia: materia,
        titulo: titulo,
        fecha: fecha,
        completada: false
    };

    tareas.push(nueva);
    guardarTareas();
    mostrarTareas();

    document.getElementById("titulo").value = "";
}

function cambiarEstado(id) {
    tareas = tareas.map(function(t) {
        if (t.id === id) {
            t.completada =!t.completada;
        }
        return t;
    });
    guardarTareas();
    mostrarTareas();
}

function eliminarTarea(id) {
    tareas = tareas.filter(function(tarea) {
        return tarea.id!== id;
    });
    guardarTareas();
    mostrarTareas();
}

function formatearFecha(fecha) {
    const partes = fecha.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function actualizarContadores() {
    const cantidadPendientes = tareas.filter(
        tarea =>!tarea.completada
    ).length;

    const cantidadCompletadas = tareas.filter(
        tarea => tarea.completada
    ).length;

    const elPend = document.getElementById("contadorPendientes");
    const elComp = document.getElementById("contadorCompletadas");
    if (elPend) elPend.textContent = cantidadPendientes;
    if (elComp) elComp.textContent = cantidadCompletadas;
}

document.addEventListener("DOMContentLoaded", mostrarTareas);