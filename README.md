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
└── frontend/                # Next.js App Router + React + TypeScript + Tailwind
    ├── src/
    │   ├── app/             # rutas y layouts
    │   ├── components/      # ui y layout
    │   ├── features/        # auth, lists, tasks, invitations, notifications, dashboard
    │   ├── hooks/
    │   ├── services/
    │   ├── lib/
    │   └── types/
    └── public/
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

Este repositorio no contiene documentación (petición de la profesora). Toda la documentación del proyecto está en la carpeta independiente **Nexora-Documentation**: requisitos, flujos, dominio, diseño, decisiones y la documentación técnica de frontend (`10-frontend/`) y backend (`11-backend/`). El `.gitignore` excluye `docs/` y `documentation/`.

## Decisiones pendientes

Las decisiones técnicas pendientes están registradas en NEX-DOC-006 (AT-02 a
AT-09). No se han resuelto ni implementado en esta fase.
