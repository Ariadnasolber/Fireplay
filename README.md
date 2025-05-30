# Fireplay

Fireplay es una tienda online de videojuegos desarrollada como práctica final de los módulos M7, M8 y M9. Esta aplicación está construida con tecnologías modernas del entorno web actual, y tiene como objetivo simular una experiencia completa de compra, navegación y gestión de videojuegos, incluyendo autenticación, favoritos, carrito y más.

## Tecnologías utilizadas

- Next.js 15 (App Router + Server Components)
- React 19
- Tailwind CSS 4
- Firebase (Authentication + Firestore)
- LocalStorage y Cookies
- RAWG API (para catálogo de juegos)
- Vite (modo integrado en Next.js)
- PWA (Progressive Web App)

## Funcionalidades principales

- Registro e inicio de sesión con Firebase Auth
- Catálogo de juegos desde la API externa RAWG
- Buscador y filtros dinámicos
- Páginas de detalle y ficha técnica de juegos
- Carrito de compra (Firestore o LocalStorage)
- Gestión de juegos favoritos por usuario
- Formulario de contacto funcional
- Panel privado de usuario con datos e historial
- Diseño responsive completo
- Aplicación instalable como PWA
- Animaciones modernas y confirmaciones tipo modal/toast

## Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/Ariadnasolber/fireplay.git
cd fireplay
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales de Firebase:

```env
NEXT_PUBLIC_API_KEY=...
NEXT_PUBLIC_AUTH_DOMAIN=...
NEXT_PUBLIC_PROJECT_ID=...
NEXT_PUBLIC_STORAGE_BUCKET=...
NEXT_PUBLIC_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_APP_ID=...
NEXT_PUBLIC_MEASUREMENT_ID=...
```

4. Inicia el entorno de desarrollo:

```bash
pnpm dev
```

## Despliegue en Vercel

El proyecto está desplegado en Vercel y puede visitarse en el siguiente enlace:

[https://fireplay.vercel.app](https://fireplay.vercel.app)

## Licencia

Este proyecto es parte de una práctica educativa y no tiene fines comerciales.
