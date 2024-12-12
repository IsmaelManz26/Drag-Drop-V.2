import { Card } from "./card.js";

// Clase que representa un mazo de cartas
export class Deck {
  // Constructor de la clase Deck
  constructor() {
    this.suits = ["oros", "copas", "espadas", "bastos"]; // Palos de las cartas
    this.colors = ["yellow", "red", "blue", "green"]; // Colores de los contenedores
    this.cards = []; // Array para almacenar las cartas
    this.containers = []; // Array para almacenar los contenedores
  }

  // Método para inicializar el mazo con las cartas recuperadas del servidor
  initialize(cartas = []) {
    this.suits.forEach((suit, index) => {
      const container = document.createElement("div"); // Crear un contenedor para cada palo
      container.classList.add("contenedor"); // Asignar la clase CSS 'contenedor' al elemento
      container.dataset.color = this.colors[index]; // Establecer el color del contenedor basado en el palo actual
      container.id = suit; // Establecer el ID del contenedor basado en el palo actual

      for (let i = 1; i <= 4; i++) {
        // Generar las cartas dentro de cada palo
        const cardData = cartas.find((c) => c.id === `${suit}${i}`) || {
          id: `${suit}${i}`,
          color: this.colors[index],
          name: `${suit.charAt(0).toUpperCase() + suit.slice(1)} ${i}`,
          position: { left: "0px", top: "0px" },
        };
        const card = new Card(
          cardData.id,
          cardData.color,
          cardData.name,
          cardData.position
        );
        this.cards.push(card); // Agregar la carta al array de cartas
        container.appendChild(card.createElement()); // Agregar la carta al contenedor
      }

      this.containers.push(container); // Agregar el contenedor al array de contenedores
    });
  }

  // Método para renderizar los contenedores en el elemento padre
  render(parentElement) {
    this.containers.forEach((container) => {
      parentElement.appendChild(container); // Agregar cada contenedor al elemento padre
    });
  }
}
