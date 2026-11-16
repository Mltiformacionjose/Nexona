# Decisión: versión definitiva de PostgreSQL

- **Fecha:** 2026-11-16
- **Fase:** BE-02 — Seleccionar y preparar la versión definitiva de PostgreSQL
- **Estado:** aceptada
- **Alcance:** entorno local de desarrollo y pruebas

## 1. Contexto

El backend de Nexora usa SQLAlchemy 2 con el driver Psycopg 3 y Alembic. La fase
BE-01 dejó verificada la conectividad contra el PostgreSQL instalado en el
equipo, pero sin fijar una versión objetivo.

En el equipo había dos instalaciones:

| Clúster | Versión | Estado al inicio de BE-02 |
| --- | --- | --- |
| 14 | 14.24 | Servicio `postgresql-14` en ejecución, puerto 5432 |
| 18 | 18.6 | Clúster inicializado y detenido, sin servicio, sin bases de usuario |

## 2. Compatibilidad comprobada

| Componente | Veredicto | Evidencia |
| --- | --- | --- |
| PostgreSQL 14 | No apta | El comunicado oficial del 2026-11-12 declara la 14.25 como última versión: «This is the final release of PostgreSQL 14. PostgreSQL 14 is now end-of-life». La instalación local era la 14.24 y quedaba sin 52 correcciones de seguridad. |
| PostgreSQL 18 | Apta | Versión mayor actual; soporte hasta el 2030-11-14 según la política oficial de versiones. Última menor disponible: 18.7 (2026-11-12). |
| PostgreSQL 19 | No apta todavía | Solo RC 2; la disponibilidad general estaba prevista para el 2026-11-19. |
| SQLAlchemy 2.1.8 | Apta | La tabla oficial de dialectos admite PostgreSQL 9.6 o superior; la documentación incluye comportamiento específico para PostgreSQL 18. |
| Psycopg 3.3.9 | Apta | Añade soporte de libpq de PostgreSQL 18 y de Python 3.14; el wheel instalado incluye libpq 18.4. |
| Alembic 1.20.1 | Apta | No depende de la versión del servidor. |

La documentación del proyecto no fija una versión concreta: el README indica
«PostgreSQL 14 o superior», por lo que PostgreSQL 18 no contradice ningún
documento aprobado.

## 3. Decisión

Se adopta **PostgreSQL 18** como versión definitiva del proyecto.

En el equipo se usa la instalación existente **18.6**. La actualización a la
menor 18.7 es recomendable por sus correcciones de seguridad, pero requiere
ejecutar el instalador oficial; al no contener bases de usuario, puede
aplicarse sin migración de datos ni `pg_upgrade`.

## 4. Configuración local resultante

| Elemento | Valor |
| --- | --- |
| Clúster | PostgreSQL 18.6 (`C:\Program Files\PostgreSQL\18\data`) |
| Puerto | 5433 |
| `listen_addresses` | `localhost` (solo 127.0.0.1 y ::1) |
| Autenticación | `scram-sha-256` (sin cambios respecto a la instalación) |
| Rol de aplicación | `nexora`, con LOGIN y sin SUPERUSER, CREATEDB, CREATEROLE ni REPLICATION |
| Bases | `nexora_dev` y `nexora_test`, propiedad de `nexora` |
| Tablas | Ninguna: BE-02 no crea esquema ni migraciones |

La contraseña del rol `nexora` se generó de forma aleatoria y solo se guarda en
`backend/.env`, que está excluido de Git.

El clúster 14 conserva su configuración original, su servicio y el puerto 5432.
No se modificó su `pg_hba.conf` ni su `postgresql.conf`.

## 5. Alternativas descartadas

- **Mantener PostgreSQL 14:** sin parches de seguridad desde el 2026-11-12.
- **PostgreSQL 17:** soportada hasta 2029, pero exigía una instalación nueva sin
  ventaja frente a la 18 ya presente.
- **PostgreSQL 19:** todavía en release candidate.
- **Migrar el clúster 14 al puerto 5433:** habría afectado a bases ajenas a
  Nexora (`oido_cocina`, `oido_cocina_demo`, `oido_cocina_test`,
  `oido_cocina_verify`), que deben permanecer intactas.
- **`pg_upgrade` desde el clúster 14:** innecesario; las bases de Nexora estaban
  vacías y las demás bases no forman parte de este proyecto.

## 6. Consecuencias

- `backend/.env` apunta a `localhost:5433`.
- El clúster 18 no tiene servicio de Windows registrado: no arranca con el
  sistema y debe iniciarse manualmente antes de usar el backend.
- El clúster 14 sigue en ejecución en el puerto 5432 para el resto de bases
  locales; se recomienda actualizarlo o retirarlo cuando deje de usarse.
- BE-01 se conserva sin cambios: mismas pruebas, misma arquitectura síncrona.

## 7. Pendiente

- Actualizar los binarios de 18.6 a 18.7.
- Decidir si se registra el clúster 18 como servicio de Windows.
- Actualizar el README, que todavía describe la fase sin conexión a base de
  datos y cita PostgreSQL 14.
