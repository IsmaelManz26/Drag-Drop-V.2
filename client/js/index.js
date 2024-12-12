import { Deck } from "./deck.js";
import { uiDrag } from "./uiDrag.js";

document.addEventListener("DOMContentLoaded", async () => {
  const deck = new Deck(); // Crear una instancia del mazo de cartas

  try {
    // Recuperar el estado actual desde la API REST
    const response = await fetch("http://localhost:3000/api/cartas");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const cartas = await response.json();

    // Inicializar el mazo con las cartas recuperadas
    deck.initialize(cartas);
    deck.render(document.querySelector(".contenedor-cards")); // Renderiza el mazo en el contenedor de cartas

    // Inicializar la funcionalidad de arrastrar y soltar
    uiDrag.init(".contenedor", ".carta");
  } catch (error) {
    console.error("Error al cargar las cartas:", error);
    alert(
      "Hubo un error al cargar las cartas. Por favor, inténtalo de nuevo más tarde."
    );
  }
});
