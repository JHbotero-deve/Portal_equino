import { cerrarSesion, estaAutenticado, guardarSesion, login, registrar } from "./api.js";

const formLogin = document.getElementById("form-login") as HTMLFormElement | null;
const formRegistro = document.getElementById("form-registro") as HTMLFormElement | null;
const mensajeError = document.getElementById("mensaje-error") as HTMLParagraphElement | null;
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement | null;

function mostrarError(texto: string): void {
  if (!mensajeError) return;
  mensajeError.textContent = texto;
  mensajeError.classList.remove("hidden");
}

function ocultarError(): void {
  mensajeError?.classList.add("hidden");
}

document.getElementById("mostrar-registro")?.addEventListener("click", (e) => {
  e.preventDefault();
  formLogin?.classList.add("hidden");
  formRegistro?.classList.remove("hidden");
  ocultarError();
});

document.getElementById("mostrar-login")?.addEventListener("click", (e) => {
  e.preventDefault();
  formRegistro?.classList.add("hidden");
  formLogin?.classList.remove("hidden");
  ocultarError();
});

formLogin?.addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarError();

  const email = (document.getElementById("login-email") as HTMLInputElement).value;
  const password = (document.getElementById("login-password") as HTMLInputElement).value;

  try {
    const data = await login(email, password);
    guardarSesion(data);
    window.location.href = "./dashboard.html";
  } catch (error) {
    mostrarError((error as Error).message);
  }
});

formRegistro?.addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarError();

  const email = (document.getElementById("registro-email") as HTMLInputElement).value;
  const password = (document.getElementById("registro-password") as HTMLInputElement).value;
  const rolSelect = document.getElementById("registro-rol") as HTMLSelectElement | null;
  const rol = (rolSelect?.value as "admin" | "operario") ?? "operario";

  try {
    await registrar(email, password, rol);
    const data = await login(email, password);
    guardarSesion(data);
    window.location.href = "./dashboard.html";
  } catch (error) {
    mostrarError((error as Error).message);
  }
});

btnLogout?.addEventListener("click", () => {
  cerrarSesion();
  window.location.href = "./login.html";
});

const esPaginaLogin = window.location.pathname.includes("login.html");
if (!esPaginaLogin && !estaAutenticado()) {
  window.location.href = "./login.html";
}