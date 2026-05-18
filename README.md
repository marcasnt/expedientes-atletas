# FENIFISC - Formulario de Inscripcion del Atleta

Aplicacion web desarrollada en React + TypeScript + Vite para la digitalizacion del formulario fisico de inscripcion de atletas de la Federacion Nicaragüense de Fisicoculturismo (FENIFISC).

## Caracteristicas

- Formulario digital con apariencia identica al documento fisico original
- Campos de foto estilo carnet
- Carga de fotos de Cedula (frente y reverso) y Pasaporte
- Impresion optimizada en tamano carta (Letter)
- Exportacion a PDF de alta calidad
- Exportacion a Excel estructurado
- Diseno responsive para edicion, pero formato fijo para impresion
- Calculo automatico de edad desde fecha de nacimiento

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- jsPDF + html2canvas (export PDF)
- SheetJS / xlsx (export Excel)
- react-hook-form (logica de formulario)

## Instalacion Local

```bash
cd fenifisc-inscripcion-atletas
npm install
npm run dev
```

Abre tu navegador en `http://localhost:5173`

## Construccion para produccion

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

---

# GUIA DE DESPLIEGUE EN GITHUB PAGES + DOMINIO PERSONALIZADO

## Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesion.
2. Crea un nuevo repositorio llamado `fenifisc-inscripcion-atletas` (o el nombre que prefieras).
3. **NO** inicialices con README, .gitignore ni license (ya tenemos los archivos).

## Paso 2: Subir el codigo al repositorio

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
git init
git add .
git commit -m "Initial commit: FENIFISC formulario de inscripcion"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/fenifisc-inscripcion-atletas.git
git push -u origin main
```

Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

## Paso 3: Configurar GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings** > **Pages**.
2. En **Source**, selecciona **GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` ya esta incluido en el proyecto y se ejecutara automaticamente al hacer push.

## Paso 4: Configurar el subdominio en FENIFISC.COM

El archivo `public/CNAME` contiene:

```
inscripcion.fenifisc.com
```

Esto indica a GitHub Pages que quieres usar ese subdominio.

Ahora debes configurar el DNS de tu dominio `fenifisc.com`:

### Opcion A: Usando Cloudflare (Recomendado)

1. Inicia sesion en tu cuenta de Cloudflare y selecciona el dominio `fenifisc.com`.
2. Ve a la seccion **DNS** > **Records**.
3. Crea un registro **CNAME** con los siguientes datos:
   - **Type:** CNAME
   - **Name:** `inscripcion`
   - **Target:** `TU_USUARIO.github.io` (reemplaza con tu usuario)
   - **TTL:** Auto
   - **Proxy status:** DNS only (nube gris) o Proxied (nube naranja) - ambos funcionan.
4. Guarda.

### Opcion B: Usando cPanel / otro proveedor DNS

1. Accede al administrador DNS de tu hosting donde esta `fenifisc.com`.
2. Crea un registro **CNAME**:
   - **Host/Name:** `inscripcion`
   - **Points to / Value:** `TU_USUARIO.github.io`
   - **TTL:** 3600 (o el valor por defecto)
3. Guarda.

> **Nota:** Si quieres usar el dominio raiz `fenifisc.com` en lugar de un subdominio, necesitas crear registros **A** apuntando a las IPs de GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) y un registro **AAAA** para IPv6. Para subdominios, CNAME es mas sencillo.

## Paso 5: Verificar HTTPS

1. Una vez propagado el DNS (puede tardar de 5 minutos a 24 horas), ve a **Settings** > **Pages** en tu repositorio de GitHub.
2. GitHub detectara el dominio personalizado.
3. Marca la opcion **Enforce HTTPS** para que el sitio se sirva con SSL gratuito.

## Paso 6: Prueba final

Visita: `https://inscripcion.fenifisc.com`

Si ves el formulario, todo esta funcionando correctamente.

---

# Estructura del proyecto

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions para deploy automatico
├── public/
│   └── CNAME                    # Archivo para dominio personalizado
├── src/
│   ├── components/
│   │   ├── CampoFoto.tsx        # Componente reutilizable para subir fotos
│   │   ├── FormularioInscripcion.tsx  # Componente principal
│   │   ├── SeccionDatosGenerales.tsx
│   │   ├── SeccionInformacionDeportiva.tsx
│   │   ├── SeccionContactoEmergencia.tsx
│   │   ├── SeccionFotosDocumentos.tsx
│   │   └── SeccionFirmas.tsx
│   ├── hooks/
│   │   └── useFormulario.ts     # Logica de estado del formulario
│   ├── types/
│   │   └── formulario.ts        # Tipos TypeScript
│   ├── utils/
│   │   ├── exportarPDF.ts       # Funcion exportar a PDF
│   │   └── exportarExcel.ts     # Funcion exportar a Excel
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Notas importantes

- El formulario guarda las imagenes en **Base64** dentro del estado de React. No se envian a ningun servidor externo.
- Para produccion con backend, considera almacenar las imagenes en un servicio de almacenamiento (AWS S3, Cloudinary, etc.) y solo guardar las URLs en la base de datos.
- El tamano del formulario esta optimizado para **Carta (Letter, 8.5 x 11 pulgadas)**.
- El archivo `vite.config.ts` tiene `base: '/'` que funciona tanto para dominio personalizado como para GitHub Pages con CNAME.

## Licencia

Propietario - FENIFISC
