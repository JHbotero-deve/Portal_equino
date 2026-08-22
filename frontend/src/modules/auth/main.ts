import { registrar, login } from "./api.js";

const form = document.getElementById("loginForm") as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const toggleLink = document.getElementById("toggleMode") as HTMLAnchorElement;
const messageBox = document.getElementById("loginMessage") as HTMLDivElement;

let modoRegistro = false;

function mostrarMensaje(texto: string, tipo: "error" | "exito") {
  messageBox.textContent = texto;
  messageBox.classList.remove("hidden", "text-red-600", "text-emerald-700");
  messageBox.classList.add(tipo === "error" ? "text-red-600" : "text-emerald-700");
}

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  modoRegistro = !modoRegistro;
  submitBtn.textContent = modoRegistro ? "Registrarme" : "Iniciar Sesión";
  toggleLink.textContent = modoRegistro
    ? "¿Ya tienes cuenta? Inicia sesión"
    : "¿No tienes cuenta? Regístrate";
  messageBox.classList.add("hidden");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageBox.classList.add("hidden");
  submitBtn.disabled = true;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    if (modoRegistro) {
      await registrar({ email, password });
      mostrarMensaje("✅ Cuenta creada. Ahora inicia sesión.", "exito");
      modoRegistro = false;
      submitBtn.textContent = "Iniciar Sesión";
      toggleLink.textContent = "¿No tienes cuenta? Regístrate";
    } else {
      const resultado = await login({ email, password });
      localStorage.setItem("gavac_token", resultado.access_token);
      localStorage.setItem("gavac_usuario", JSON.stringify(resultado.usuario));
      mostrarMensaje("✅ Sesión iniciada. Redirigiendo...", "exito");
      setTimeout(() => {
        window.location.href = "/ganado";
      }, 800);
    }
  } catch (err: any) {
    mostrarMensaje(`⚠️ ${err.message}`, "error");
  } finally {
    submitBtn.disabled = false;
  }
});