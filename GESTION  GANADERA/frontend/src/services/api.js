export async function checkHealth() {
 const response = await fetch(
 "http://localhost:3000/health"
 );
 if (!response.ok) {
 throw new Error(
 "No fue posible conectar con el backend"
 );
 }
 return response.json();
}