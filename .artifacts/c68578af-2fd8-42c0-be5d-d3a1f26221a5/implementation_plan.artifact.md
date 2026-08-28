# Plan de Rediseño Premium para GAVAC

Este plan transformará la interfaz básica de GAVAC en una aplicación moderna, con diseño "Senior UI", utilizando técnicas avanzadas de Tailwind CSS y principios de experiencia de usuario (UX).

## User Review Required

> [!IMPORTANT]
> El rediseño se centrará en los archivos HTML principales. No afectará la lógica del backend ni de la base de datos Supabase, pero hará que la aplicación se sienta mucho más profesional.

> [!NOTE]
> Utilizaremos la librería **Lucide Icons** y **Animate.css** (vía CDN) para añadir interactividad visual sin aumentar la complejidad del código.

## Proposed Changes

### Identidad Visual
- **Paleta de Colores**: Verde Esmeralda (#065f46), Pizarra Profunda (#0f172a) y acentos en Oro Mate para elementos de estatus.
- **Tipografía**: Optimización del uso de **Inter** con jerarquías claras.

### Pantalla de Login (index.html)
- **Fondo Dinámico**: Sustitución del fondo plano por un degradado radial con malla de ruido sutil.
- **Card Premium**: Efecto de cristal esmerilado (glassmorphism) con borde degradado.
- **Micro-interacciones**: Transiciones suaves al alternar entre login y registro.

### Gestión de Ganado (ganado/index.html)
- **Layout de Dashboard**: Implementación de una barra lateral (sidebar) colapsable o navegación superior moderna.
- **Tablas de Datos**: Estilo de tarjetas para dispositivos móviles y tablas con filas cebra sutiles y estados de hover.
- **Botones de Acción**: Iconografía clara y estados de carga animados.

## Verification Plan

### Manual Verification
1. Abrir `http://localhost:5434` (o el puerto configurado).
2. Verificar la nueva estética del login: debe sentirse como una aplicación corporativa moderna.
3. Probar la navegación al panel de ganado y asegurar que la tabla sea legible y estéticamente agradable.
4. Confirmar que los iconos se carguen correctamente.
