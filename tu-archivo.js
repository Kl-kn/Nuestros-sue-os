// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZIp7_jz6QnR9ODqW2p0GeiHp8tXkMwVI",
  authDomain: "nuestros-deseos.firebaseapp.com",
  projectId: "nuestros-deseos",
  storageBucket: "nuestros-deseos.appspot.com",
  messagingSenderId: "8248024069",
  appId: "1:8248024069:web:d882fb44772a4274a4e0cc",
  measurementId: "G-KEM14M8NSG"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Referencia a la colección en Firestore
const sueñosRef = collection(db, "sueños");

// Función para agregar un sueño
const agregarSueño = async () => {
  const input = document.getElementById("sueñoInput");
  const sueño = input.value;

  if (sueño.trim() !== "") {
    try {
      await addDoc(sueñosRef, { texto: sueño });
      input.value = ""; // Limpiar el input después de agregar el sueño
      console.log("Sueño agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el sueño: ", error);
    }
  }
};

// Función para eliminar un sueño
const eliminarSueño = async (id) => {
  const sueñoDoc = doc(db, "sueños", id);
  try {
    await deleteDoc(sueñoDoc);
    console.log("Sueño eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el sueño: ", error);
  }
};

// Escuchar cambios en la colección y actualizar la lista
onSnapshot(sueñosRef, (snapshot) => {
  const lista = document.getElementById("sueñosLista");
  lista.innerHTML = ""; // Limpiar la lista antes de actualizar

  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.classList.add('sueño-item');
    li.textContent = doc.data().texto;

    // Crear botón de eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("boton-eliminar");
    btnEliminar.onclick = () => eliminarSueño(doc.id);  // Llamar a eliminarSueño con el ID del documento

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
});

// Agregar evento al botón para guardar los sueños
document.getElementById("agregarBtn").addEventListener("click", agregarSueño);
