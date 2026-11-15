# Informe de revisión de la documentación de Nexora

**Fecha:** 15/11/2026
**Alcance:** revisión y ampliación de la documentación existente (NEX-DOC-001 a NEX-DOC-007)
**Estado:** revisión cerrada; el registro de decisiones pendientes queda abierto
**Naturaleza:** documento de trabajo. No aprueba ningún contenido de los documentos revisados.

---

## Resumen ejecutivo

La documentación de Nexora cubre el producto con suficiente detalle, pero tenía tres problemas para servir de referencia de implementación:

1. **Faltaba el detalle funcional de listas y tareas.** NEX-DOC-001 describía requisitos y reglas, pero no los campos, las restricciones y los criterios verificables que necesita una implementación.
2. **Faltaba el detalle técnico de cuentas y sesiones.** NEX-DOC-006 proponía la arquitectura, pero no el contrato de la cookie, el flujo de validación ni los endpoints.
3. **Las inconsistencias estaban mezcladas con el contenido**, sin un registro que las separara de las decisiones cerradas.

La revisión ha ampliado los documentos **sin cambiar ninguna decisión** y ha separado explícitamente lo confirmado de lo propuesto. Se han documentado diez inconsistencias (apartado C) y veinte decisiones pendientes (apartado D). **Ninguna se ha resuelto por iniciativa de esta revisión.** Tampoco se ha creado NEX-DOC-003 ni se ha modificado NEX-DOC-002.

Cuatro decisiones deben tomarse antes de empezar a programar: la ausencia de NEX-DOC-003 (P-01), el alcance de los vencimientos (P-02), la caducidad del token de recuperación (P-09) y la aprobación del contrato HTTP (P-19).

---

## A. Alcance y método

### A.1. Documentos revisados

| Documento | Formato original | Situación encontrada |
|---|---|---|
| NEX-DOC-001 — Análisis funcional y cierre de Fase 1 | PDF (v0.4) | Completo en lo funcional; sin detalle de campos ni de criterios de listas y tareas. |
| NEX-DOC-002 — Roadmap | PDF (v0.2) | Completo. No se ha modificado. |
| NEX-DOC-003 — Flujos y pantallas | — | **No existe** en la carpeta ni en el historial del repositorio. |
| NEX-DOC-004 — Modelo de dominio y entidades | PDF (v0.2) | Completo; sin entidad de sesión y sin las cuestiones abiertas de la v0.3. |
| NEX-DOC-005 — Modelo de datos | DBML y SQL (v0.3) | Completo; sin `user_sessions`. Diagrama PNG desactualizado respecto al propio SQL. |
| NEX-DOC-006 — Arquitectura técnica | PDF (v0.2) | Completo como propuesta; sin contrato HTTP ni catálogo de endpoints. |
| NEX-DOC-007 — Diseño de interfaz y wireframes | DOCX (v0.5) | Completo; no distingue el origen de cada elemento de interfaz. |

### A.2. Criterios de intervención

- **Solo se amplía.** Se conservan íntegros los apartados, la numeración, los identificadores y el texto existentes. Los añadidos se marcan como tales («detalle v0.3», «añadido en la v0.3»).
- **Nada pasa a aprobado.** Las propuestas siguen siendo propuestas; las decisiones pendientes siguen pendientes.
- **Las versiones anteriores no se tocan.** Los PDF y el DOCX v0.5 originales quedan intactos; las versiones revisadas son archivos nuevos.
- **Se mantiene el español** y el carácter de borrador de todos los documentos.
- **No se resuelve ninguna discrepancia** entre documentos. Se registra y se deja trazada.

### A.3. Qué no se ha hecho

- No se ha creado NEX-DOC-003.
- No se ha modificado NEX-DOC-002 ni su roadmap.
- No se ha modificado ningún PDF original.
- No se ha escrito código, ni migraciones, ni esquema aplicado a una base de datos.
- No se ha hecho ningún commit ni push.
- No se ha aprobado ningún requisito, ruta, pantalla ni decisión técnica.
- No se ha tocado ningún archivo fuera de `documentation/`.

---

## B. Estado de la documentación tras la revisión

### B.1. Versiones

| Documento | Versión previa | Versión revisada | Archivo nuevo | Estado |
|---|---|---|---|---|
| NEX-DOC-001 | 0.4 | **0.5** | `NEXORA — Análisis funcional y cierre de Fase 1 v0.5.docx` | Borrador para aprobación |
| NEX-DOC-002 | 0.2 | 0.2 | — (sin cambios) | Sin cambios |
| NEX-DOC-003 | — | — | — | **Ausente** |
| NEX-DOC-004 | 0.2 | **0.3** | `NEXORA — Modelo de dominio y entidades v0.3.docx` | Borrador para revisión |
| NEX-DOC-005 | 0.3 | **0.4** | `NEXORA_NEX-DOC-005_v0.4_provisional.dbml` y `.sql` | Provisional |
| NEX-DOC-006 | 0.2 | **0.3** | `NEXORA — Arquitectura técnica de la aplicación v0.3.docx` | Borrador para revisión |
| NEX-DOC-007 | 0.5 | **0.6** | `NEX-DOC-007_Diseno_interfaz_wireframes_v0.6.docx` | Borrador para revisión |

### B.2. Qué añade cada versión

**NEX-DOC-001 v0.5**
- Apartados 4.1 a 4.7: creación de listas personales y compartidas, diferencias, propiedad, invitación y expulsión, eliminación y nota de terminología.
- Apartados 5.8 a 5.12: campos de la tarea, cambio de estado, responsables, diferencia entre creador y responsable, y permisos de los participantes.
- Criterios de aceptación CA-15 a CA-24.
- Tres filas nuevas en el apartado 16 (expulsión, conversión de listas y caducidad del token de recuperación).

**NEX-DOC-004 v0.3**
- Apartado 1.1: nota de terminología «lista personal / lista privada».
- Apartado 5.10: entidad técnica `UserSession`.
- Apartado 10.3: cuestiones abiertas DOM-I a DOM-M.
- Apartado 13.2: control de cambios de la versión.

**NEX-DOC-005 v0.4**
- Tabla `user_sessions` con índice único sobre el hash, índice por usuario e índice por expiración.
- Notas de integración para el alta de sesión, la validación y la revocación.
- La función `validate_list_type_change` y el resto de restricciones y disparadores se conservan **sin cambios**.

**NEX-DOC-006 v0.3**
- Apartados 2.1, 3.1, 4.1 y 4.2: capas y recorrido de una petición.
- Apartados 5.1 a 5.4: convenciones REST, estructura de error y catálogo de endpoints con doble estado.
- Apartados 6.8 a 6.10: validación de sesión, contrato de la cookie y recuperación de contraseña.
- Apartados 7.1 y 7.2: orden de comprobación y permisos por recurso.
- Apartados 8.1 y 8.2: transacciones y restricciones.
- Apartados 9.1, 11.4, 12.1 y 16: vencimientos, matriz de pruebas, configuración y control de cambios.
- AT-10 y AT-11.

**NEX-DOC-007 v0.6**
- Apartado 25: origen de los elementos de interfaz (Figma, prototipo HTML, especificación textual).
- Apartado 26: búsqueda, filtros y orden, separando material de diseño y requisito.
- Apartado 27: terminología de interfaz.
- Apartado 28: trazabilidad de flujos y pantallas.
- Apartado 29: interacciones que solo existen en el prototipo.
- Apartado 30: pendientes de validación del diseño.

### B.3. Desfase detectado fuera del alcance

El `README.md` del repositorio cita **«NEX-DOC-006 — Arquitectura técnica de la aplicación (v0.2)»** y describe la carpeta `documentation/` sin versiones. Tras esta revisión, la referencia correcta es la v0.3. El README no se ha modificado porque queda fuera del alcance acordado; se registra aquí para corregirlo cuando se cierre la revisión.

---

## C. Inconsistencias detectadas

Ninguna se ha resuelto. La columna «Tratamiento» indica únicamente dónde queda registrada.

| ID | Inconsistencia | Dónde se detecta | Tratamiento en esta revisión | Estado |
|---|---|---|---|---|
| I-01 | NEX-DOC-003 no existe, pero tres documentos lo citan como referencia de flujos y pantallas. | 004 (documentos relacionados y criterio de validación), 006 (§14), 007 (control del documento) | No se crea. Se declara la limitación en 004 §12 y 007 §28. Registrada como P-01. | Abierta |
| I-02 | Los vencimientos se calculan «al consultar, sin proceso programado» (D-23), pero 006 §9 afirma que requieren un mecanismo periódico. | 001 §5.4 y D-23; 006 §9 y AT-06 | Se mantiene D-23 como regla funcional confirmada; 006 §9.1 registra la discrepancia sin elegir. AT-06 sigue «Pendiente». | Abierta |
| I-03 | «Lista privada» y «lista personal» se usan como sinónimos sin declararlo. | 001 §4 y RN-03; 004 §3.2; 005 (`personal`); 007 («Personales») | Nota de terminología en 001 §4.7 y 004 §1.1; recomendación de «lista personal». | Recomendación, no decisión |
| I-04 | El rechazo de invitaciones está en la regla RN-05 (CONFIRMADO) y en RF-12 (PROPUESTA), pero WF-013 lo excluye expresamente. | 001 §18; 004 §3.4; 007 WF-013 | 007 §30 lo registra; no se añade la acción al diseño. Registrada como P-04. | Abierta |
| I-05 | Se citan guiones de flujo con prefijo SCR-xx, pero no existe catálogo que los numere. | 001 y 004 (referencias a 003); 007 (usa WF-xx) | 007 §28: solo se usa WF-xx; no se inventa numeración. Registrada como P-05. | Abierta (bloqueada por I-01) |
| I-06 | La conversión de lista personal en compartida figura como CONFIRMADA en 001 §4, como Deseable en RF-16 y como pospuesta en 004 §9. | 001 §4, RN-03, RF-16, §16; 004 §9 | 001 §16 la registra como pendiente; 004 §9 añade una nota y la cuestión DOM-K; 007 no la representa. | Abierta |
| I-07 | El correo de asignación es Imprescindible (RF-34), pero 006 §10 lo condiciona a «disponibilidad de tiempo». | 001 RF-34 y D-18; 006 §10 | Se conserva el texto de 006 sin rebajar el requisito. Registrada como P-07. | Abierta |
| I-08 | El SQL permite convertir una lista compartida en personal si no quedan miembros, invitaciones ni asignaciones; 001 solo confirma la conversión inversa y declara la vuelta atrás fuera del MVP. | 005 (`validate_list_type_change`); 001 §4; 004 §9 | La función se conserva sin cambios; 006 §8.2 advierte que protege integridad y no aprueba la conversión. Registrada como P-08. | Abierta |
| I-09 | El token de recuperación debe caducar «en poco tiempo», sin valor concreto. | 001 CA-03 y RN-24; 004 DOM-J; 006 §6.10 | No se fija. Registrada como P-09 y DOM-J. | Abierta |
| I-10 | La expulsión de participantes es Imprescindible (RF-14) y D-20 la sitúa en E4, mientras que el roadmap (002 v0.2) mantiene la gestión de participantes en la épica Deseable E8. | 001 RF-14, D-20 y §16; 002 v0.2 | 001 §4.5 separa la regla confirmada de su prioridad; 006 §5.4 deja la ruta fuera del catálogo del MVP; 002 no se modifica. Registrada como P-20. | Abierta |

---

## D. Registro de decisiones pendientes

Este registro es el único lugar donde se numeran las decisiones abiertas. Los documentos revisados las describen con texto, sin usar estos códigos, para no confundirlas con identificadores ya existentes (RF, CA, RN, D, DOM, AT, WF).

| ID | Tema | Descripción | Registrada en | Qué falta |
|---|---|---|---|---|
| P-01 | NEX-DOC-003 ausente | El documento de flujos y pantallas no está en la carpeta ni en el historial. | 004 §12; 007 §28 | Recuperarlo o reelaborarlo. Bloquea la trazabilidad de flujos. |
| P-02 | Vencimientos | D-23 (cálculo al consultar) frente a 006 §9 (mecanismo periódico). | 001 §5.4, D-23; 006 §9.1, AT-06 | Decidir si existe proceso programado y cerrar AT-06. |
| P-03 | Terminología | «Lista privada» y «lista personal» designan el mismo concepto. | 001 §4.7; 004 §1.1; 007 §27 | Aprobar «lista personal» como término único. |
| P-04 | Rechazo de invitación | RN-05 y RF-12 lo contemplan; WF-013 no lo representa. | 007 §30 | Decidir si se añade al diseño. |
| P-05 | Identificadores de flujos | Se citan flujos SCR-xx sin catálogo disponible. | 007 §28 | Establecer la correspondencia cuando exista 003. |
| P-06 | Conversión personal → compartida | CONFIRMADA en 001 §4, Deseable en RF-16, pospuesta en 004 §9. | 001 §16; 004 §9 y DOM-K | Decidir prioridad, requisitos y si entra en el MVP. |
| P-07 | Correo de asignación | RF-34 lo hace Imprescindible; 006 §10 lo condiciona a disponibilidad. | 006 §10 | Confirmar si es obligatorio en el MVP. |
| P-08 | Conversión compartida → personal | El SQL la permite con condiciones; 001 no la prevé. | 005 SQL; 006 §8.2 | Decidir si se prohíbe en la aplicación o se documenta como no soportada. |
| P-09 | Caducidad del token de recuperación | «En poco tiempo», sin valor concreto. | 001 CA-03 y RN-24; 004 DOM-J; 006 §6.10 | Fijar el valor antes de implementar E1. |
| P-10 | Periodo del dashboard | 001 §9 define periodos; D-24 dice que el MVP no tiene periodo. | 001 §9 y D-24 | Aclarar la redacción: el MVP no ofrece selector de periodo. |
| P-11 | Reconstrucción de tablas de 001 | Cuatro tablas se reconstruyeron por pérdida de celdas en el PDF. | 001, notas de revisión (apartado E) | Revisar y confirmar la reconstrucción. |
| P-12 | Entrega de NEX-DOC-001 | Coexisten un PDF antiguo con sufijo «(2)» y el DOCX v0.5. | Inventario (apartado F.3) | Decidir cuál es la referencia y archivar el resto. |
| P-13 | Validación de WF-003, WF-004 y WF-005 | Creadas y revisadas visualmente, sin aceptación explícita. | 007 §22 y §30 | Aceptación explícita. |
| P-14 | Buscadores y filtros | Presentes en el prototipo; sin requisito funcional asociado. | 007 §26 | Decidir si entran en el MVP. |
| P-15 | Nombre de la cookie | `nexora_session` es una propuesta. | 006 §6.6, §6.9 y AT-10 | Aprobar el nombre definitivo. |
| P-16 | Duplicidad RF-04 / RF-36 | Dos requisitos describen el mismo interruptor con estados distintos. | 001 §11; 006 §5.3 | Unificar en un solo requisito. |
| P-17 | Edición de listas | No hay requisito para cambiar nombre o descripción. | 006 §5.4 | Decidir si forma parte del MVP y con qué requisito. |
| P-18 | Interacciones del prototipo | Navegación, marcar como leído y calendario son demostraciones. | 007 §29 | Validar qué comportamientos son requisito. |
| P-19 | Contrato HTTP | Ninguna ruta del catálogo está aprobada. | 006 §5.3 y AT-11 | Aprobar el catálogo antes de implementar. |
| P-20 | Expulsión de participantes | Regla confirmada; prioridad y épica en conflicto con el roadmap. | 001 §16; 006 §5.4 | Resolver antes de planificar E4. No se modifica 002. |

---

## E. Fragmentos reconstruidos y limitaciones

### E.1. Por qué hay fragmentos reconstruidos

Los documentos originales son PDF generados desde un procesador de textos. La extracción de texto perdió la estructura de varias tablas: las celdas se aplanaron y el orden de lectura se alteró. En lugar de inventar contenido, cada tabla afectada se reconstruyó **a partir de la prosa del mismo documento** y se marcó con una nota de revisión visible.

### E.2. Tablas reconstruidas en NEX-DOC-001

| Apartado | Tabla | Fuente de la reconstrucción |
|---|---|---|
| 3.3 | Matriz de permisos en listas compartidas | Apartados 3.2, 4 y 18 (RN-04, RN-06, RN-07, RN-08). |
| 7 | Eventos y destinatarios de las notificaciones | El propio texto del apartado 7, que se conservaba completo. |
| 10 | Columna de actor de los casos de uso | Los roles definidos en los apartados 3.2 y 4. |
| 14.1 | Listas de niveles Imprescindible, Deseable y Posterior | La columna «Prior.» de la tabla del apartado 11. |

No se añadió ni se retiró ningún permiso, evento, actor ni prioridad en la reconstrucción. Cada tabla lleva su nota de revisión en el documento, y estas notas deben revisarse y confirmarse (P-11).

### E.3. Otros documentos

- **NEX-DOC-004 y NEX-DOC-006:** se reconstruyeron sus tablas a partir de su propia prosa (entidades, relaciones, atributos y decisiones). No se introdujo contenido de otras fuentes.
- **NEX-DOC-007:** es el único original editable. Se ha ampliado en su propio formato, conservando estilos, contenido y estructura; los apartados 1 a 24 no se han modificado.
- **NEX-DOC-005:** el DBML y el SQL se han generado a partir de la v0.3 con una única tabla nueva, sin reescribir el resto.

### E.4. Limitaciones conocidas

- El **diagrama PNG** del modelo de datos sigue siendo el de la v0.3 y no muestra `user_sessions`. No se ha regenerado porque no hay herramienta de diagramas en el repositorio.
- El **prototipo HTML** no se ha modificado. Las comprobaciones de interfaz se han hecho sobre su código.
- No ha sido posible **ejecutar el SQL** contra PostgreSQL, por las restricciones del encargo. La revisión del SQL es estática.
- No existe **NEX-DOC-003**, de modo que la correspondencia entre flujos y pantallas no se puede verificar.

---

## F. Verificaciones realizadas

### F.1. Contenido de los documentos

| Verificación | Resultado |
|---|---|
| NEX-DOC-001 conserva RF-01 a RF-40 | Correcto (40 identificadores) |
| NEX-DOC-001 conserva CA-01 a CA-14 y añade CA-15 a CA-24 | Correcto (24 identificadores) |
| NEX-DOC-001 conserva RN-01 a RN-27 | Correcto (27 identificadores) |
| NEX-DOC-001 conserva D-01 a D-24 | Correcto (24 identificadores) |
| NEX-DOC-001 conserva CU-01 a CU-16 y sus 18 apartados | Correcto |
| NEX-DOC-004 conserva DOM-A a DOM-H y añade DOM-I a DOM-M | Correcto |
| NEX-DOC-004 conserva las 15 reglas de integridad | Correcto |
| NEX-DOC-006 conserva AT-01 a AT-09 y añade AT-10 y AT-11 | Correcto (11 identificadores) |
| **AT-02 sigue en «Pendiente de validación»** | Correcto |
| AT-06 sigue en «Pendiente» | Correcto |
| NEX-DOC-006 declara que ninguna ruta está confirmada | Correcto |
| La expulsión no aparece en el catálogo del MVP de NEX-DOC-006 | Correcto (solo en la tabla de operaciones excluidas) |
| NEX-DOC-007 conserva WF-001 a WF-013 y añade los apartados 25 a 30 | Correcto |
| NEX-DOC-007 distingue Figma, prototipo HTML y especificación textual | Correcto |
| NEX-DOC-007 no presenta búsqueda ni filtros como requisito confirmado | Correcto |
| Ningún documento contiene el estado «Aprobado» | Correcto |

### F.2. Modelo de datos

| Verificación | Resultado |
|---|---|
| Tablas en SQL | 10 (las 9 de la v0.3 más `user_sessions`) |
| Tablas en DBML | 10, coincidentes con el SQL |
| Relaciones en DBML | 18 (17 de la v0.3 más la de sesiones) |
| Claves foráneas en SQL | 18 (17 de la v0.3 más la de sesiones) |
| `validate_list_type_change` idéntica a la v0.3 | Correcto |
| Resto de funciones y disparadores sin cambios | Correcto |
| Índices únicos parciales intactos | Correcto |
| Ninguna línea eliminada respecto a la v0.3 | Correcto (solo hay adiciones) |

### F.3. Inventario final de `documentation/`

```
documentation/
├── NEXORA — Análisis funcional y cierre de Fase 1 (2).pdf          (original, intacto)
├── NEXORA — Análisis funcional y cierre de Fase 1 v0.5.docx        (nuevo)
├── NEXORA — Arquitectura técnica de la aplicación.pdf              (original, intacto)
├── NEXORA — Arquitectura técnica de la aplicación v0.3.docx        (nuevo)
├── NEXORA — Modelo de dominio y entidades.pdf                      (original, intacto)
├── NEXORA — Modelo de dominio y entidades v0.3.docx                (nuevo)
├── NEXORA — Roadmap.pdf                                            (original, intacto)
├── INFORME_REVISION_DOCUMENTACION_2026-11-15.md                    (este informe)
├── Diseño/
│   ├── NEX-DOC-007_Diseno_interfaz_wireframes_v0.5.docx            (original, intacto)
│   ├── NEX-DOC-007_Diseno_interfaz_wireframes_v0.6.docx            (nuevo)
│   └── prototype.html                                              (sin cambios)
└── Modelo De Datos/
    ├── Modelo De Datos Provisional.png                             (sin cambios; v0.3)
    ├── NEXORA_NEX-DOC-005_v0.3_provisional.dbml                    (original, intacto)
    ├── NEXORA_NEX-DOC-005_v0.3_provisional.sql                     (original, intacto)
    ├── NEXORA_NEX-DOC-005_v0.4_provisional.dbml                    (nuevo)
    └── NEXORA_NEX-DOC-005_v0.4_provisional.sql                     (nuevo)
```

### F.4. Cambios en el repositorio

Todos los cambios son adiciones dentro de `documentation/`. No hay archivos modificados fuera de esa carpeta, ni eliminaciones, ni commits.

---

## G. Recomendaciones y próximos pasos

### G.1. Antes de escribir código

1. **Recuperar o reelaborar NEX-DOC-003 (P-01).** Sin él, la trazabilidad entre flujos y pantallas queda incompleta y el criterio de validación de NEX-DOC-004 no se puede cumplir.
2. **Cerrar P-02 (vencimientos).** Es la única discrepancia que afecta directamente a la arquitectura: determina si hace falta un proceso programado.
3. **Fijar P-09 (caducidad del token de recuperación).** Es un parámetro obligatorio de E1 y hoy no tiene valor.
4. **Aprobar el contrato HTTP (P-19).** El catálogo de NEX-DOC-006 §5.3 es una propuesta completa; aprobarlo o corregirlo evita rehacer endpoints.
5. **Resolver P-08 (conversión compartida → personal).** El SQL actual la permite con condiciones y la aplicación no la contempla.

### G.2. Antes de planificar la colaboración

6. **Resolver P-20 (expulsión).** La regla funcional está clara, pero la épica no. Conviene decidirlo antes de tocar el roadmap, no después.
7. **Decidir P-06 (conversión personal → compartida).** Hoy aparece como confirmada, deseable y pospuesta según el documento que se lea.

### G.3. Antes de dar la documentación por cerrada

8. **Confirmar la reconstrucción de NEX-DOC-001 (P-11).** Las cuatro tablas reconstruidas son correctas según la prosa del propio documento, pero deben revisarse expresamente.
9. **Unificar RF-04 y RF-36 (P-16)** y decidir la edición de listas (P-17).
10. **Aclarar el periodo del dashboard (P-10).** La redacción actual permite dos lecturas.
11. **Actualizar `README.md`** con la versión 0.3 de NEX-DOC-006 (B.3).
12. **Decidir qué copia de NEX-DOC-001 es la de referencia (P-12)** y archivar la que no lo sea.

### G.4. Criterio para la siguiente revisión

No conviene abrir nuevas versiones numeradas hasta cerrar el registro P. Cada decisión que se cierre deberá:

- actualizar el documento donde vive el contenido, no solo este informe;
- retirar la fila correspondiente del apartado D;
- anotar el cambio en el control de versiones del documento afectado;
- mantener la regla de que nada pasa a «Aprobado» sin una decisión explícita.

---

*Fin del informe.*
