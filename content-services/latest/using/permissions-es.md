---

title: Roles de usuario y permisos
---

El rol de un usuario condiciona lo que puede y no puede hacer en un sitio. Cada rol viene con una serie de permisos predeterminados.

La siguiente sección describe dichos permisos. En general:

* **Managers** have full rights to all site content - what they have created themselves and what other site members have created.
* **Collaborators** have full rights to the site content that they own; they have rights to edit but not delete content created by other site members.
* **Contributors** have full rights to the site content that they own; they cannot edit or delete content created by other site members.
* **Consumers** have view-only rights in a site: they cannot create their own content.

> **Note:** As well as these four default roles you might also see additional roles in different places in Alfresco Share.

* **Coordinator** - has full rights to all content - what they have created themselves and what others have created.
* **Editor** - has rights to edit file properties and check files in and out; they cannot create their own content.

Your Alfresco Administrator can also add additional roles.

Site managers can \[change a site role]({% link content-services/latest/using/sites/index.md %}#changesiterole) for the site users.

Si es miembro de dos grupos de usuario con permisos diferentes, disfrutará de la suma total de los permisos de ambos grupos. Por ejemplo, si el Grupo 1 tiene permiso para ver un fichero y el Grupo 2 para verlo y editarlo, usted tendrá permiso para ver y editar este fichero.

> **Note:** El contenido de un sitio se puede definir como cualquier contenido creado en dicho sitio o añadido a él, por ejemplo, páginas wiki, entradas de blog, carpetas y elementos de biblioteca, eventos de calendario, temas de discusión y comentarios.

## Permisos de paneles de inicio

The following sections detail the user permissions for dashboards (personal and site) and dashlets.

Each user has full access to the toolbar and dashlet functionality available on the personal dashboard.

### Panel de inicio del sitio

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Invitar a usuarios al sitio| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Personalizar el panel de inicio del sitio| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Modificar los detalles del sitio| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Configurar el sitio (seleccionar componentes)| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Abandonar el sitio| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})

### Site dashlets

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| RSS Feed - Configure RSS Feed URL| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Site Data Lists - Create data list| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Site Links - Create site links| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| WebView - Configure Web View| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Wiki - Configure Wiki dashlet| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Site file type breakdown dashlet - View details| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Site contributor breakdown dashlet - View details and change date range| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})

## Permisos con respecto al contenido

En las siguientes secciones se detallan los permisos que tienen los distintos usuarios con respecto al contenido.

### Biblioteca de documentos

#### Folders and files

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| View folder / item details page| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Like / unlike| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Favorite / unfavorite| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Rename folder / item - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Rename folder / item - created by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit basic details - created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit basic details - created by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit custom properties - created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit custom properties - created by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Copiar| !\[tick image]({% link assets/img/done_24px.svg %}) *| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Move - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Move - content created by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Delete - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete - content created by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Manage permissions - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Manage permissions - content created by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Manage aspects - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Manage aspects - content created by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Change type - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Change type - content created by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Copiar la dirección URL de la página| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Añadir un comentario| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit comment - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit comment - content created by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Delete comment - content created by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete comment - content created by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})

(*) A user with the role Consumer can copy a folder or file to another site if the user performing the action has the role of Manager, Collaborator, or Contributor in the target site.

> **Tip:** Los consumidores que anteriormente hayan tenido un rol que les permitía añadir contenidos conservan sus permisos anteriores con respecto a todos los contenidos que hayan añadido.

#### Folders only

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear una carpeta| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Localizar una carpeta| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Gestionar reglas en una carpeta creada por el propio usuario| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Gestionar reglas en una carpeta creada por otro usuario| | | | !\[tick image]({% link assets/img/done_24px.svg %})

#### Files only

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear contenido| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Cargar contenido| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Descargar contenido| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Ver en el navegador| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Upload new version - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Upload new version - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Upload new version - locked by other user| | | | 
| Edit online - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit online - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit inline - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit inline - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit offline - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit offline - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Publicar| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| No publicar| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Check out to Google Docs - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Check out to Google Docs - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Check in from Google Docs - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Check in from Google Docs - created / added by other user| | | | 
| Cancel editing - locked by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Cancel editing - locked by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Ver la versión original| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Ver una copia de trabajo| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Ver en Google Docs| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Iniciar flujo de trabajo| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Localizar un fichero| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Descargar la versión anterior| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Restablecer la versión anterior| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})

### Calendario

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Ver un evento| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Crear un nuevo evento| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit event - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit event - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete event - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete event - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})

### Wiki

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear una nueva página| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit page - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit page - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Rename page - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Rename page - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete page - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete page - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Editar la página principal| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Cambiar el nombre de la página principal| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Eliminar la página principal| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Ver detalles de la página| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Ver la versión anterior de la página| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})

### Foros

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear un nuevo tema| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit topic - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit topic - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Delete topic - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete topic - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Ver discusiones| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Añadir una respuesta| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit reply - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit reply - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})

### Blog

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear una nueva entrada| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit post - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit post - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Ver una entrada del blog| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Publish post externally - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Publish post externally - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Update external post - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Update external post - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Remove external post - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Remove external post - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Crear un comentario| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit comment - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})

### Enlaces

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear un nuevo enlace| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit link - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit link - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete link - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete link - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Ver detalles del enlace| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Crear un comentario| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit comment - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit comment - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Delete comment - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete comment - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})

### Listas de datos

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Crear una lista| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit list - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit list - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete list - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete list - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Add list item - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Add list item - created / added by other user| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit list item - created / added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Edit list item - created / added by other user| | | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Duplicate list item - created / added by other self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Duplicate list item -created / added by other user| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete list item - created /added by self| | !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})| !\[tick image]({% link assets/img/done_24px.svg %})
| Delete list item - created / added by other user| | | | !\[tick image]({% link assets/img/done_24px.svg %})

## Permisos de miembros

En las siguientes secciones se detallan los permisos de los miembros del sitio.

| Permission| Consumidor| Contribuidor| Colaborador| Administrador
|----------|:----------:|:----------:|:----------:|:----------:
| Cambiar el rol de un usuario| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Eliminar un usuario del sitio| | | | !\[tick image]({% link assets/img/done_24px.svg %})
| Cancelar una invitación| | | | !\[tick image]({% link assets/img/done_24px.svg %})

## Usuarios avanzados

Alfresco Share power users have additional options that aren't available to standard users.

These options are made available when your Alfresco administrator gives you advanced permissions by signing you up to a power user group.

Las opciones adicionales disponibles actualmente son:

* Administrador de sitios
* Gestor de búsquedas

Si dispone de los siguientes permisos, podrá acceder al Administrador de sitios mediante un enlace adicional situado en la barra de herramientas, y al Gestor de búsquedas desde la pantalla Resultados de la búsqueda.

* Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups.
* Search Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `ALFRESCO_SEARCH_ADMINISTRATORS` permissions groups.

### Administrador de sitios

El Administrador de sitios se usa para mantener los sitios. Permite controlar la visibilidad de todos los sitios, así como eliminarlos o convertirse en su administrador.

> **Note:** Sites Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `SITES_ADMINISTRATORS` permissions groups. If you are in the `ALFRESCO_ADMINISTRATORS` group, you can access the Site Manager through the **Admin Tools** on the toolbar. If you are a member of `SITE_ADMINISTRATORS` group, you'll have an additional **Sites Manager** option on the toolbar.

En Administrador de sitios se muestran los nombres y estados de los sitios creados, independientemente de la configuración de visibilidad. En el menú **Visibilidad** puede cambiar la visibilidad de un sitio. Puede, por ejemplo, marcarlo como **Público**, **Moderado** o **Privado**. Todos los cambios de visibilidad que haga se aplican en el momento.

En el menú **Acciones** hay dos opciones:

* **Delete Site**: You can delete any of the sites in the **Site Manager** list by selecting **Delete Site** from the **Actions** menu. Al hacerlo, se eliminan tanto los detalles del sitio como su contenido.
* **Become Site Manager**: The I'm a Site Manager column shows the sites where you have the Site Manager permission. Si todavía no es administrador de un sitio, seleccione **Convertirse en Administrador de sitio** en el menú **Acciones**.

### Search Manager {#searchmanager}

El Gestor de búsquedas le permite ver los detalles de los filtros de búsqueda existentes y crear otros nuevos.

> **Note:** Search Manager is available to users in the `ALFRESCO_ADMINISTRATORS` and `ALFRESCO_SEARCH_ADMINISTRATORS` permissions groups.

Al Gestor de búsquedas se accede desde la pantalla de resultados de la búsqueda. Escriba una consulta en el cuadro de búsqueda y pulse Entrar. Después, vaya a la pantalla de resultados de la búsqueda y haga clic en **Gestor de búsquedas**.

**Note:** Los resultados de la búsqueda filtrados se pueden añadir a los marcadores para poder acceder a ellos rápida y fácilmente.

Todos los filtros existentes (incluidos los predeterminados) se muestran junto con sus detalles en el mismo orden en que aparecen en la pantalla de resultados de la búsqueda. You can change the order by using the !\[arrows]({% link content-services/images/arrows.png %}) buttons to move filters up or down the order.

Haga clic en **Crear nuevo filtro** para [crear nuevos filtros de búsqueda](#createnewsearchfilter).

Most of the filter details are can be edited by hovering over them and clicking the !\[Configure icon]({% link content-services/images/ico-configure.png %}) icon that displays:

* **Filter ID**: Identificador de filtro único. Haga clic en él para editar los detalles.
* **Filter Name**: El nombre del filtro que se muestra en la pantalla de resultados de la búsqueda. Los filtros predeterminados muestran la clave de mensaje internacionalizado en vez del nombre del filtro que aparece en la pantalla de resultados de la búsqueda.
* **Filter Property**: La propiedad o el campo en que se basa el filtro.
* **Filter Type**: Cómo se muestra el filtro en la pantalla de resultados de la búsqueda. La opción predeterminada es **Filtro simple**.
* **Show with Search Results**: Indica si se muestra el filtro en la pantalla de resultados de la búsqueda. Los filtros con esta opción desactivada no se muestran. Los filtros predeterminados no se pueden eliminar y tienen que estar desactivados si se quieren ocultar.
* **Default Filter**: Indica si el filtro es predeterminado o personalizado. Los predeterminados vienen predefinidos y no se pueden eliminar. Los puede ocultar si desactiva la opción **Mostrar con resultados de búsqueda**.
* **Filter Availability**: El sitio o sitios donde está disponible el filtro.

#### Creating new search filters {#createnewsearchfilter}

En el Gestor de búsquedas encontrará una gran variedad de opciones para crear fácilmente sus propios filtros personalizados.

1. Acceda al **Gestor de búsquedas** desde la pantalla de resultados de la búsqueda y haga clic en **Crear nuevo filtro**.
   
   > **Tip:** También puede hacer clic en un ID de filtro existente para editarlo.

2. En **ID de filtro** escriba un identificador único para el nuevo filtro de búsqueda.

3. Introduzca un nombre en **Nombre de filtro**. Este es el nombre del filtro que se muestra en la pantalla de resultados de la búsqueda. Para los filtros predeterminados, lo que se muestra aquí no corresponde con lo que se muestra en la pantalla de resultados de la búsqueda.
   
   > **Note:** No puede seleccionar un filtro personalizado como opción de **Filtro predeterminado.**

4. La opción **Mostrar con resultados de búsqueda** está seleccionada de forma predeterminada. Anule la selección si no desea que el filtro aparezca en la pantalla de resultados de la búsqueda.

5. Seleccione una propiedad con la que filtrar en la lista desplegable **Propiedad de filtro**.

6. Seleccione un tipo en **Tipo de filtro**. Así se muestra el filtro en la pantalla de resultados de la búsqueda. La opción predeterminada es **Filtro simple**, que es una casilla de verificación.

7. En **Clasificar por** seleccione el orden en que aparecen los resultados del filtro en la página de resultados de la búsqueda.

8. En **Número de filtros** seleccione cuántos filtros se muestran de forma predeterminada en la pantalla de resultados de la búsqueda.

9. En **Longitud de filtro mínima** seleccione la longitud del filtro. Esto ayuda a excluir palabras cortas como «y» o «a» de los resultados del filtro.

10. En **Resultados requeridos mínimos** seleccione el número mínimo de coincidencias que debe tener un resultado del filtro para aparecer en la pantalla de resultados de la búsqueda.

11. Seleccione la disponibilidad del filtro:
    
    * **En todos los sitios**: se muestra en todos los sitios.
    * **Sitios seleccionados**: solo se muestra en los sitios seleccionados. Click !\[add]({% link content-services/images/ico-add.png %}) to add a site then select it from the list and click !\[tick]({% link content-services/images/ico-tick.png %}) to confirm. Click !\[add]({% link content-services/images/ico-add.png %}) to add more sites if required.

12. Haga clic en **Guardar**.