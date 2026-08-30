import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="bg-green-700 px-6 py-4">
          <h1 class="text-3xl font-bold text-white">🐎 Portal Equino - Dashboard</h1>
          <p class="text-green-100">Panel de Control: Módulo de Ganado (Base Sólida)</p>
        </div>

        <div class="p-6 space-y-8">
          <!-- Estado del Servidor -->
          <section>
            <h2 class="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">🌐 Conectividad</h2>
            <div class="flex items-center gap-4">
              <button id="btn-test" class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition">
                Verificar Backend
              </button>
              <div id="status" class="text-sm font-medium"></div>
            </div>
          </section>

          <!-- Simulación de Módulo de Oscar -->
          <section class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 class="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              🐄 Módulo Ganado (Oscar)
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Formulario para simular Registro -->
              <div>
                <h3 class="text-sm font-bold text-gray-600 uppercase mb-2">Simular Registro</h3>
                <div class="space-y-3">
                   <input type="text" id="token" placeholder="Pegar Token JWT aquí" class="w-full border rounded px-3 py-2 text-sm" />
                   <input type="text" id="nombre" placeholder="Nombre del Animal" class="w-full border rounded px-3 py-2 text-sm" />
                   <input type="text" id="tipo" placeholder="Tipo (Ej: Equino, Vacuno)" class="w-full border rounded px-3 py-2 text-sm" />
                   <button id="btn-registrar" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Probar Registrar
                   </button>
                </div>
              </div>

              <!-- Lista de Resultados -->
              <div>
                <h3 class="text-sm font-bold text-gray-600 uppercase mb-2">Vista de Datos</h3>
                <button id="btn-listar" class="w-full bg-gray-200 text-gray-800 py-2 rounded mb-3 hover:bg-gray-300 transition">
                  Listar Animales
                </button>
                <pre id="ganado-list" class="bg-black text-green-400 p-3 rounded text-xs overflow-auto max-h-48">Esperando consulta...</pre>
              </div>
            </div>
          </section>

          <footer class="text-center text-gray-400 text-xs">
            Equipamiento Técnico: Oscar (Ganado) | Jorge (Seguridad) | Juan (Auth) | Elian (UI)
          </footer>
        </div>
      </div>
    </div>
  </div>
`

// Lógica de Prueba de Servidor
document.querySelector('#btn-test')?.addEventListener('click', async () => {
  const status = document.querySelector('#status')!
  try {
    const res = await fetch('/api');
    const text = await res.text();
    status.innerHTML = `<span class="text-green-600">✅ Servidor Online: ${text}</span>`;
  } catch (err) {
    status.innerHTML = '<span class="text-red-600">❌ Error de conexión</span>';
  }
})

// Lógica para Listar Ganado (Usa el Token)
document.querySelector('#btn-listar')?.addEventListener('click', async () => {
  const output = document.querySelector('#ganado-list')!
  const token = (document.querySelector('#token') as HTMLInputElement).value

  if (!token) {
    output.innerText = "Error: Se requiere Token JWT para listar."
    return
  }

  try {
    const res = await fetch('/api/ganado', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    output.innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    output.innerText = "Error al obtener datos."
  }
})

// Lógica para Registrar (Usa el Token)
document.querySelector('#btn-registrar')?.addEventListener('click', async () => {
  const output = document.querySelector('#ganado-list')!
  const token = (document.querySelector('#token') as HTMLInputElement).value
  const nombre = (document.querySelector('#nombre') as HTMLInputElement).value
  const tipo = (document.querySelector('#tipo') as HTMLInputElement).value

  if (!token) {
    alert("Copia el token generado en el login de Juan para probar el módulo de Oscar.");
    return
  }

  try {
    const res = await fetch('/api/ganado/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, tipo, peso: 0 })
    });
    const data = await res.json();
    output.innerText = "RESULTADO REGISTRO:\n" + JSON.stringify(data, null, 2);
  } catch (err) {
    output.innerText = "Error en el registro.";
  }
})
