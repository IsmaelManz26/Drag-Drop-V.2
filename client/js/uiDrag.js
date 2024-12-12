export const uiDrag = {
  // Método para inicializar la funcionalidad de arrastrar y soltar
  init: (containerSelector, cardSelector) => {
    // Seleccionar todos los contenedores y agregar eventos
    document.querySelectorAll(containerSelector).forEach((container) => {
      // Agregar evento 'drop' a cada contenedor
      container.addEventListener("drop", async (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado

        // Obtener datos de la carta arrastrada
        const data = JSON.parse(event.dataTransfer.getData("text"));
        const draggedElement = document.getElementById(data.id);

        // Verificar que el color del contenedor coincida con el color de la carta
        if (event.target.dataset.color !== draggedElement.dataset.color) {
          return;
        }

        // Calcular la nueva posición de la carta
        const left = event.offsetX - draggedElement.offsetWidth / 2 + "px";
        const top = event.offsetY - draggedElement.offsetHeight / 2 + "px";

        // Actualizar la posición de la carta
        draggedElement.style.position = "absolute";
        draggedElement.style.left = left;
        draggedElement.style.top = top;
        draggedElement.style.backgroundColor = draggedElement.dataset.color;

        // Mover la carta al nuevo contenedor si es necesario
        if (!event.target.contains(draggedElement)) {
          event.target.appendChild(draggedElement);
        }

        // Rehabilitar el arrastre de todas las cartas
        document.querySelectorAll(cardSelector).forEach((card) => {
          card.setAttribute("draggable", "true");
        });

        try {
          // Actualizar el estado en la API REST
          const response = await fetch("http://localhost:3000/api/cartas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: draggedElement.id,
              color: draggedElement.dataset.color,
              name: draggedElement.textContent,
              position: { left, top },
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error al actualizar la carta:", error);
          alert(
            "Hubo un error al actualizar la carta. Por favor, inténtalo de nuevo."
          );
        }
      });

      // Agregar evento 'dragover' a cada contenedor
      container.addEventListener("dragover", (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado para permitir el evento de soltado
      });
    });

    // Seleccionar todas las cartas y agregar eventos
    document.querySelectorAll(cardSelector).forEach((card) => {
      // Agregar evento 'dragstart' a cada carta
      card.addEventListener("dragstart", (event) => {
        // Deshabilitar el arrastre de todas las cartas excepto la que se está arrastrando
        document.querySelectorAll(cardSelector).forEach((otherCard) => {
          if (otherCard !== event.target) {
            otherCard.setAttribute("draggable", "false");
          }
        });

        // Preparar los datos para la transferencia
        const sendData = {
          id: event.target.id,
          color: event.target.dataset.color,
        };
        event.dataTransfer.setData("text", JSON.stringify(sendData));
      });
    });
  },
};
