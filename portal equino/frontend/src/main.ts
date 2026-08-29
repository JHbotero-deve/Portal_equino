import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold text-green-700 mb-4">Gestión Ganadera</h1>
      <p class="text-gray-600 mb-6">Base sólida lista para Oscar, Jorge y Elian.</p>
      <button id="btn-test" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        Verificar Servidor
      </button>
      <div id="status" class="mt-4 text-sm text-center"></div>
    </div>
  </div>
`

document.querySelector('#btn-test')?.addEventListener('click', async () => {
  try {
    const res = await fetch('/api');
    const text = await res.text();
    document.querySelector('#status')!.innerHTML = \`<span class="text-green-600 font-semibold">\${text}</span>\`;
  } catch (err) {
    document.querySelector('#status')!.innerHTML = '<span class="text-red-600 font-semibold">Error al conectar con backend</span>';
  }
})