# Plan de Restauración de Diseño "Esmeralda Profesional"

Este plan tiene como objetivo devolver a GAVAC su identidad visual original basada en verde esmeralda, pero con una ejecución técnica impecable para que los estilos carguen correctamente.

## User Review Required

> [!IMPORTANT]
> **FLUJO DE TRABAJO**: Realizaré los cambios **solo localmente**. No se hará ningún commit ni push hasta que tú confirmes que el diseño en tu navegador es el correcto.

> [!NOTE]
> Abandonaremos el fondo oscuro y el efecto de cristal. Volveremos a una interfaz de fondo claro, limpia y corporativa, optimizando la carga de Tailwind CSS para que el diseño no se "rompa".

## Proposed Changes

### 🎨 Estética "Esmeralda Profesional"
- **Fondo**: Blanco hueso / Gris muy claro (`#f8fafc`).
- **Acentuación**: Verde Esmeralda intenso (`#065f46`) para encabezados, botones principales y elementos de marca.
- **Tipografía**: Fuente **Inter** (Google Fonts) para una lectura clara y moderna.

### 🛠️ Correcciones Técnicas
- **Carga de Estilos**: Asegurar que los CDNs de Tailwind y Google Fonts estén en el `head` de forma prioritaria.
- **Rutas de Scripts**: Usar rutas relativas `./dist/...` que son más seguras para ejecución local.

### Pantallas a Modificar
1.  **Login (`index.html`)**: Volver al diseño de tarjeta blanca limpia sobre fondo claro/esmeralda sutil.
2.  **Dashboard (`ganado/index.html`)**: Mantener la estructura de dashboard pero con colores claros, eliminando el sidebar oscuro.

## Verification Plan

### Manual Verification
1.  Aplicar cambios en `index.html`.
2.  Pedir al usuario que refresque `http://localhost:5434`.
3.  Ajustar según feedback.
4.  Repetir para `ganado/index.html`.
5.  **Solo tras aprobación final**, realizar el commit.
