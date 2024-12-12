import express from "express";
import cors from "cors";

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

const datos = {
  cartas: [], // Array para almacenar las cartas
};

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la REST API con Node.js y import!"); // Ruta de bienvenida
});

// Ruta para obtener todas las cartas
app.get("/api/cartas", (req, res) => {
  try {
    res.json(datos.cartas); // Enviar el array de cartas como respuesta en formato JSON
  } catch (error) {
    console.error("Error al obtener las cartas:", error);
    res.status(500).json({ error: "Error al obtener las cartas" });
  }
});

// Ruta para actualizar o agregar una carta
app.post("/api/cartas", (req, res) => {
  try {
    const newCard = req.body; // Obtener los datos de la nueva carta del cuerpo de la solicitud
    console.log(`Llega ${newCard.name}`);
    const existingCardIndex = datos.cartas.findIndex(
      (c) => c.id === newCard.id
    );
    if (existingCardIndex !== -1) {
      datos.cartas[existingCardIndex] = newCard; // Actualizar la carta existente
    } else {
      datos.cartas.push(newCard); // Agregar la nueva carta al array
    }
    res.status(201).json(newCard); // Enviar la nueva carta como respuesta en formato JSON
  } catch (error) {
    console.error("Error al actualizar o agregar la carta:", error);
    res.status(500).json({ error: "Error al actualizar o agregar la carta" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de confirmación de que el servidor está corriendo
});
