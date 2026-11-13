# Nexora

Aplicación web de gestión de tareas personales y colaborativas. El repositorio
contiene un frontend y un backend independientes, de acuerdo con
**NEX-DOC-006 — Arquitectura técnica de la aplicación (v0.2)**.

## Estado

Fase de preparación técnica. El proyecto está estructurado y con las
dependencias base instaladas, pero **todavía no contiene funcionalidades ni
lógica de negocio**: no hay modelos, migraciones, endpoints, servicios ni
pantallas implementadas.

## Estructura

```
Nexona-1/
├── backend/                 # FastAPI + SQLAlchemy + Alembic + PostgreSQL
│   ├── app/
│   │   ├── core/            # configuración, seguridad y errores
│   │   ├── db/              # base declarativa y sesiones
│   │   ├── models/          # modelos ORM (pendiente)
│   │   ├── schemas/         # esquemas Pydantic (pendiente)
│   │   ├── routers/         # endpoints /api/v1 (pendiente)
│   │   ├── services/        # lógica de negocio (pendiente)
│   │   └── dependencies/    # dependencias de FastAPI (pendiente)
│   ├── alembic/             # migraciones
│   ├── tests/
│   └── requirements.txt
├── frontend/                # Next.js App Router + React + TypeScript + Tailwind
│   ├── src/
│   │   ├── app/             # rutas y layouts
│   │   ├── components/      # ui y layout
│   │   ├── features/        # auth, lists, tasks, invitations, notifications, dashboard
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── types/
│   └── public/
└── documentation/           # documentación funcional, de diseño y de datos
```

## Requisitos

- Python 3.14 o compatible con las versiones fijadas en `backend/requirements.txt`.
- Node.js 24 y npm 11 (gestionados con `package-lock.json`).
- PostgreSQL 14 o superior (solo para desarrollo futuro; esta fase no conecta
  con ninguna base de datos).

## Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env   # completar DATABASE_URL con datos locales
```

Comprobaciones:

```powershell
pytest
```

La aplicación FastAPI se importa desde `backend/app/main.py`. Los routers se
registrarán bajo el prefijo `/api/v1`.

## Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Comprobación de tipos (Next 16 genera los tipos de rutas en `.next/types`):

```powershell
npx next typegen
npx tsc --noEmit
```

## Documentación

La carpeta `documentation/` es la fuente de verdad funcional, de diseño y de
datos. No debe modificarse durante las tareas de infraestructura.

Documentos principales:

- NEX-DOC-001 v0.4 — Análisis funcional y cierre de Fase 1.
- NEX-DOC-002 v0.2 — Roadmap.
- NEX-DOC-004 v0.2 — Modelo de dominio y entidades.
- NEX-DOC-005 v0.3 — Modelo de datos (provisional).
- NEX-DOC-006 v0.2 — Arquitectura técnica.
- NEX-DOC-007 v0.5 — Diseño de interfaz y wireframes.

## Decisiones pendientes

Las decisiones técnicas pendientes están registradas en NEX-DOC-006 (AT-02 a
AT-09). No se han resuelto ni implementado en esta fase.
