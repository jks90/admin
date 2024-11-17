# Admin


admin/
├── app/
│   ├── dashboard/
│   │   └── [page.tsx](app/dashboard/page.tsx)
│   ├── components/
│   │   ├── [auth-form.tsx](app/components/auth-form.tsx)
│   │   ├── [control-panel.tsx](app/components/control-panel.tsx)
│   │   └── ui/
│   │       ├── [button.tsx](app/components/ui/button.tsx)
│   │       ├── [input.tsx](app/components/ui/input.tsx)
│   │       ├── [label.tsx](app/components/ui/label.tsx)
│   │       ├── [card.tsx](app/components/ui/card.tsx)
│   │       └── [tabs.tsx](app/components/ui/tabs.tsx)
│   ├── lib/
│   │   └── [auth.ts](app/lib/auth.ts)
│   ├── [layout.tsx](app/layout.tsx)
│   ├── [page.tsx](app/page.tsx)
│   └── [globals.css](app/globals.css)
├── public/
│   └── (archivos estáticos si los hay)
├── [.dockerignore](.dockerignore)
├── [Dockerfile](Dockerfile)
├── [middleware.ts](middleware.ts)  <-- Nuevo archivo de configuración de rutas
├── [next.config.js](next.config.mjs)
├── [package.json](package.json)
├── [README.md](README.md)
└── [tsconfig.json](tsconfig.json)


## Docker

```bash

docker build -t juankanh/admin:0.1.0 .
docker run -p 3000:3000 juankanh/admin:0.1.0

```