// Clase que representa una carta
export class Card {
  // Constructor de la clase Card
  constructor(id, color, name, position = { left: "0px", top: "0px" }) {
    this.id = id; // ID único de la carta
    this.color = color; // Color de la carta
    this.name = name; // Nombre de la carta
    this.position = position; // Posición de la carta (left y top)
  }

  // Método para crear el elemento HTML de la carta
  createElement() {
    const cardElement = document.createElement("div"); // Crear el elemento contenedor de la carta
    cardElement.classList.add("carta"); // Asignar la clase CSS 'carta' al elemento
    cardElement.id = this.id; // Establecer el ID único de la carta
    cardElement.dataset.color = this.color; // Almacenar el color de la carta en el dataset
    cardElement.textContent = this.name; // Asignar el nombre de la carta al contenido de texto del elemento
    cardElement.setAttribute("draggable", "true"); // Habilitar la propiedad 'draggable' para permitir que la carta sea arrastrada
    cardElement.style.backgroundColor = this.color; // Establecer el color de fondo de la carta
    cardElement.style.position = "absolute"; // Definir la posición como 'absolute' para poder posicionarla dentro del contenedor
    cardElement.style.left = this.position.left; // Asignar la coordenada 'left' basada en la posición almacenada de la carta
    cardElement.style.top = this.position.top; // Asignar la coordenada 'top' basada en la posición almacenada de la carta
    return cardElement; // Retornar el elemento de la carta
  }
}
