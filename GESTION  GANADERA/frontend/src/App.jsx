import { useEffect, useState } from "react";
import { checkHealth } from "./services/api";
function App() {
  const [message, setMessage] = useState(
    "Verificando conexion con backend..."
  );
  useEffect(() => {
    checkHealth()
      .then((data) => {
        setMessage("Backend conectado");
        console.log(data);
      })
      .catch(() => {
        setMessage("Error de conexion con backend");
      });
  }, []);
  return (
    <div>
      <h1>SecureDesk ADSO</h1>
      <p>{message}</p>
    </div>
  );
}
export default App;