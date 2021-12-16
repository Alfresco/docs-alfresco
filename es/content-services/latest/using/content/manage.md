---
title: Manage content
menutitle: 
---

Content can be added, viewed and organized easily in Alfresco Share.

## Añadir contenido

Para crear los contenidos de un sitio, se crea una estructura de carpetas organizada y después se añaden los contenidos.

There are two ways to add content to Alfresco Share: create new content or upload existing content from your computer.

Existen distintas opciones disponibles según vaya a añadir ficheros o carpetas.

## Añadir carpetas

You can add folders from outside Alfresco Share and create new folders within a site.

Existen tres formas de añadir carpetas:

* Hacer clic en Crear en la biblioteca de documentos; consulte [Crear carpetas](#createfolders)
* Arrastrar y soltar carpetas desde su equipo; consulte [Arrastrar y soltar carpetas](#dragdropfolders)
* Crear carpetas a partir de plantillas; consulte [Crear carpetas a partir de una plantilla](#createfoldersfromtemplate)

### Creating folders {#createfolders}

La sección **Biblioteca** del panel de exploración muestra la estructura de ficheros del sitio actual. Un sitio nuevo contiene una sola carpeta llamada Documentos. Añada aquí las nuevas carpetas.

1. Elija dónde desea añadir una carpeta, bien mediante el panel de exploración o haciendo clic en las distintas carpetas de la lista de ficheros.

2. Haga clic en **Crear** y, seguidamente, en **Carpeta**.

3. Introduzca un nombre para la carpeta.
   
   El nombre de la carpeta no puede contener los siguientes caracteres especiales: `* " < > \ / . ? : and |`. Si el nombre contiene un carácter no permitido, el botón **Guardar** estará desactivado.
   
   > **Note:** The folder name can include a period as long as it is not the last character.

4. Añada un título y una descripción para la carpeta.

5. Haga clic en **Guardar**.

Verá la carpeta nueva en el panel de exploración.

### Drag and drop folders {#dragdropfolders}

You can drag and drop folders straight from your computer into Alfresco Share.

> **Note:** La funcionalidad de arrastrar y soltar no es compatible con todos los navegadores; se recomienda usar Google Chrome o Firefox.

Al soltar una carpeta, también se añaden las subcarpetas y los ficheros que esta contenga. Esto significa que puede añadir grupos enteros de ficheros y carpetas sin que cambie su estructura.

Si la estructura de carpetas contiene carpetas vacías, estas también se crean.

> **Note:** Los ficheros thumbs.db, desktop.ini y DS_Store no se cargan, aunque estén dentro de una de las carpetas que haya arrastrado y soltado.

1. Elija dónde desea añadir una carpeta, bien mediante el panel de exploración o haciendo clic en las distintas carpetas de la lista de ficheros.

2. Haga clic en la carpeta en el Explorador de Windows, en   
Finder de Apple o en su escritorio. Mantenga apretado el botón del ratón mientras arrastra la carpeta y libérelo para soltarla.
   
   Puede arrastrar y soltar carpetas en el nivel en que se encuentra o directamente en otra carpeta. Cuando los ficheros estén colocados sobre la carpeta donde los quiere soltar, aparecerá una flecha. No puede arrastrar y soltar contenido directamente en carpetas en las vistas de tabla, de audio o de elementos multimedia.
   
   No puede cargar carpetas cuyos nombres contengan los siguientes caracteres especiales: `* " < > \ / . ? : and |`.
   
   > **Note:** The folder name can include a period as long as it is not the last character.
   
   If you drop files or folders into a location where there's already a file or folder with that name, then they'll be added as another file with `-1` added to their filename.

### Creating folders from a template {#createfoldersfromtemplate}

Además de crear carpetas desde cero, también puede hacerlo a partir una plantilla.

> **Note:** Templates are only available if your Alfresco administrator has set some up for you.

1. Elija dónde desea añadir la carpeta.
   
   En la lista de elementos se muestra el contenido actual de la carpeta seleccionada. La carpeta que cree se añadirá aquí.

2. Haga clic en **Crear** y, a continuación, en **Crear carpeta a partir de plantilla**.
   
   Aparecerá una lista de todas las plantillas disponibles.

3. Seleccione la plantilla.
   
   Se añadirá una nueva carpeta basada en esa plantilla a la biblioteca de documentos. Si la plantilla tiene contenidos y subcarpetas, estos se replicarán en la carpeta nueva.

## Añadir ficheros

You can add both existing files from outside Alfresco Share and create new files within a site.

Utilice la opción **Cargar** para cargar ficheros existentes desde su equipo a la biblioteca.

También puede arrastrar y soltar uno o más ficheros en la vista de biblioteca, incluso en una carpeta concreta.

> **Tip:** En **Vista detallada** puede arrastrar y soltar ficheros en el nivel actual de la biblioteca o directamente en una carpeta. Cuando los ficheros estén colocados correctamente sobre la carpeta donde los quiere soltar, aparecerá una flecha. En todas las demás vistas, puede soltar los ficheros tan solo en el nivel actual de la biblioteca. De modo que, si desea soltarlos en una carpeta específica, tendrá que tener abierta esa carpeta en la vista de biblioteca.

El menú **Crear** proporciona opciones para crear distintos tipos de contenidos directamente en la biblioteca: documentos de texto plano, HTML y XML, así como tres tipos de contenidos de Google Docs (documentos, hojas de cálculo y presentaciones). También puede crear contenidos a partir de una plantilla.

### Cargar ficheros

Adding files from your computer to Alfresco Share is simple. Puede cargar uno o varios ficheros al mismo tiempo.

You can upload files in two ways: drag and drop files from your computer directly into the library, or click ![Upload icon]({% link content-services/images/upload-icon.png %}){:height="18px" width="18px"} **Upload**. Cuando arrastra y suelta un fichero, el destino seleccionado aparece resaltado en azul.

> **Tip:** Puede arrastrar y soltar ficheros en el nivel de la biblioteca en el que se encuentra o directamente en una carpeta. Cuando los ficheros estén colocados correctamente sobre la carpeta donde los quiere soltar, aparecerá una flecha. No puede arrastrar y soltar contenido directamente en carpetas en las vistas de tabla, de audio o de elementos multimedia.

> **Note:** Internet Explorer 8 y 9 no son compatibles con la funcionalidad de arrastrar y soltar. Si usa uno de estos navegadores, debe hacer clic en **Cargar** para añadir contenido.

1. Seleccione la carpeta de la biblioteca de documentos donde desee añadir el contenido.
   
   Al seleccionar una carpeta en el panel de exploración, en la lista de elementos se mostrará el contenido actual de la carpeta. Cuando use la acción **Cargar**, el fichero o ficheros que seleccione se añadirán aquí.

2. Click ![Upload icon]({% link content-services/images/upload-icon.png %}){:height="18px" width="18px"} **Upload**.

3. Click **Select files to upload** on the Upload Files dialog box.

4. Localice y seleccione los ficheros que desee cargar desde su equipo.

En la biblioteca de documentos se mostrarán los contenidos cargados.

En el vídeo se muestra cómo añadir contenido.

### Crear ficheros

With the **Create** feature you can create plain text, HTML, and XML files directly in Alfresco Share.

También puede [crear contenido de Google Docs](#creategoogledocsfiles) y [crear contenido a partir de una plantilla](#createfilefromtemplate).

1. Seleccione la carpeta donde desea añadir el contenido.
   
   En la lista de ficheros se muestran los contenidos actuales de la carpeta seleccionada. El contenido que cree se añadirá aquí.

2. Haga clic en **Crear** y seleccione el tipo de fichero que desea crear.
   
   > **Note:** Para crear contenido a partir de una plantilla, haga clic en **Crear documento a partir de plantilla** y seleccione una plantilla de la lista que el administrador ha puesto a su disposición. Se crea un nuevo fichero con el mismo nombre que el de la plantilla. Puede cambiar el nombre del nuevo fichero y editar el contenido predeterminado. No hace falta hacer nada más.

3. Escriba un nombre para el contenido en **Nombre**.
   
   El campo **Nombre** no admite los siguientes caracteres especiales: `* " < > \ / . ? : and |`. Si el nombre contiene uno de estos caracteres, el botón **Crear** aparece desactivado.
   
   > **Note:** El nombre sí puede contener un punto, siempre que este no sea el último carácter. This allows you to add an extension (for example, .txt, .html, or .xml) if you want, though it's not required.

4. Añada un título y una descripción para el fichero.

5. Añada el contenido del fichero en el cuadro **Contenido**.
   
   Con los documentos HTML, puede usar las opciones de formato adicionales; con los documentos XML, puede incluir las etiquetas XML requeridas. Con los documentos HTML, también puede arrastrar la esquina inferior derecha para cambiar el tamaño del editor de texto.

6. Haga clic en **Crear**.

The file is saved to Alfresco Share and displayed in the file preview screen.

### Creating Google Docs files {#creategoogledocsfiles}

You can easily create Google Docs documents, spreadsheets, and presentations from Alfresco Share.

Files you edit are temporarily stored in Google Docs, then removed from Google Docs once they've been checked back in to Share.

1. Seleccione la carpeta donde desea añadir el contenido.
   
   En la lista de ficheros se muestran los contenidos actuales de la carpeta seleccionada. El contenido que cree se añadirá aquí. Puede crear nuevas carpetas cuando las necesite.

2. Haga clic en **Crear** y seleccione el tipo de fichero de Google Docs que desea crear.
   
   > **Important:** The first time you access Google Docs you have to authorize Share to use your account. If you have a Google Username in your Alfresco Share profile then it will be used as the default account. Una vez que haya introducido los datos necesarios, verá un mensaje para confirmar que se ha concedido la autorización.
   
   Share stores your Google Docs account information. You will need to authorize Share each session, but you won't have to re-enter your credentials each time.
   
   Si el navegador le solicita permiso para ver elementos emergentes de Google Docs, déselo. Si usa Safari, no podrá utilizar Google Docs hasta que haya habilitado todos los elementos emergentes en la configuración, así que, por motivos de seguridad, se recomienda usar otro navegador.
   
   Google Docs se abre con todas las funciones estándar disponibles, incluidos el menú, la barra de herramientas y las funciones para comentar y compartir.

3. Haga clic en el título predeterminado para cambiar el nombre del fichero. On the Rename Document dialog box, enter a name and click **OK**.
   
   > **Note:** You can also rename the file in the Share.

4. Cree el contenido.
   
   El fichero se guarda en Google Docs y permanece bloqueado en Alfresco hasta que lo desbloquee.

5. Cuando haya terminado, cierre la pestaña del navegador de Google Docs.
   
   In Share you'll see the file displays the ![Geolocation metadata icon]({% link content-services/images/ico-googledocs.png %}){:height="18px" width="18px"} icon to show that it's open in Google Docs.

6. In Share, click **More** then **Check In Google Doc**.

En este vídeo se muestra cómo crear contenido.

### Creating files from a template {#createfilefromtemplate}

Además de crear ficheros desde cero, también puede hacerlo a partir de una plantilla.

> **Note:** Templates are only available if your Alfresco administrator has \[set some up for you]({% link content-services/latest/admin/templates.md %}).

1. Seleccione la carpeta donde desea añadir el contenido.
   
   En la lista de ficheros se muestran los contenidos actuales de la carpeta seleccionada. Los ficheros que cree se añadirán aquí.

2. Haga clic en **Crear** y, a continuación, en **Crear documento a partir de plantilla**.
   
   Aparecerá una lista de todas las plantillas disponibles.

3. Seleccione la plantilla.
   
   Se añadirá un nuevo fichero basado en esa plantilla a la biblioteca de documentos.

## Ver contenidos

Para ver más detenidamente una carpeta o un fichero sin descargarlos, puede utilizar la pantalla de vista previa de ficheros. En ella podrá ver más detalles, obtener una vista previa y acceder a las funciones de redes sociales, acciones e histórico de versiones.

### Ver los detalles de una carpeta

Abra la página de detalles de una carpeta para ver cómodamente toda la información y las acciones juntas en un solo lugar.

1. Sitúe el cursor sobre una carpeta de la lista de ficheros en la biblioteca de documentos.
   
   > **Note:** Asegúrese de no haber seleccionado **Ocultar carpetas** en el menú Opciones.

2. Click ![View Details icon]({% link content-services/images/view-folder-detail-icon.png %}) **View Details**.
   
   En la página Detalles de carpeta se muestra toda la información sobre la carpeta, incluidos los permisos y las propiedades. Esta página incluye características de redes sociales y acciones de carpetas.

Haga clic en la carpeta de la barra de navegación de la parte superior de la pantalla para volver a la lista de elementos correspondiente a esa carpeta.

### Ver un fichero

Puede previsualizar ficheros haciendo clic en la miniatura o en su nombre en la biblioteca de documentos. Todos los detalles y las acciones del fichero están disponibles en esta pantalla.

The preview screen is split into four sections.

#### Información y opciones

La información incluye la ubicación y el nombre del fichero, el número de versión y el usuario que hizo las últimas modificaciones, así como la fecha y la hora en las que se hicieron. An icon to the left of these shows the file type.Above this info is a link to return to the document library.

Con estas opciones, puede:

* Click ![Like icon]({% link content-services/images/ico-download.png %}) to download a file.
* Click ![Like icon]({% link content-services/images/like-icon.png %}) to like a file. vuelva a hacer clic para cancelar la acción.
* Click ![Favorite icon]({% link content-services/images/favorite-icon.png %}) to favorite a file. vuelva a hacer clic para eliminarlo de favoritos.
* Click ![Comment icon]({% link content-services/images/comment-icon.png %}) to comment on a file. Una vez que haya escrito el texto, haga clic en **Añadir un comentario**.
* Click ![Share icon]({% link content-services/images/ico-share.png %}) to share a file. Puede copiar el enlace o, si lo prefiere, compartirlo directamente en las redes sociales.

#### Vista previa

Las opciones de vista previa dependen del tipo de fichero.

Si se trata de un vídeo, tendrá controles de reproducción de vídeo.

En el caso de un fichero de Microsoft Office, PDF o algún otro tipo de fichero de texto (no una imagen o un vídeo), podrá acercar y alejar la vista, hacer clic en **Maximizar** para agrandar la vista previa y desplazarse las distintas páginas del fichero.

> **Note:** The zoom level and current page number are saved for the next time you preview this item.

También puede:

* **Download** ![Like icon]({% link content-services/images/ico-download.png %}) the file in its original format or as a PDF.
* Click ![Advanced Search icon]({% link content-services/images/ico-link.png %}) to share a link to the file, and even select to **Link to current page**.
* Click ![Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) to search for text within the file.

#### Comentarios

Los comentarios aparecen debajo de la vista previa. Esta sección permite añadir un comentario, así como editar y eliminar los que haya añadido anteriormente.

> **Note:** No podrá añadir comentarios si tiene el nivel de permiso de Consumidor para el sitio.

La lista de comentarios muestra los diez más recientes. Haga clic en anterior (<\<) y siguiente (>>) para ver más comentarios.

#### Lista de acciones y detalles

Las acciones y los detalles se agrupan en secciones que puede expandir y contraer.

> **Note:** Las opciones de visualización se guardan para la próxima vez que previsualice el fichero.

* **Acciones sobre el documento**: todas las acciones disponibles para el fichero.
* **Etiquetas**: las etiquetas asociadas al elemento. Click ![Configure icon]({% link content-services/images/ico-configure.png %}) to display the Edit Properties page. En esta página, haga clic en **Seleccionar** debajo de **Etiquetas** para editar las etiquetas. Puede añadir y eliminar etiquetas existentes, así como crear otras nuevas.
* **Compartir**: seleccione y copie el enlace para compartirlo con otras personas.
* **Properties** - Click ![Configure icon]({% link content-services/images/ico-configure.png %}) to edit the properties of the file.
* **Permissions** - Click ![Permissions icon]({% link content-services/images/ico-manage-permissions.png %}) to edit the permissions for this file.
* **Flujos de trabajo**: muestra las tareas en las que está incluido este fichero. Se muestran, además, el tipo de tarea y la foto de perfil del usuario que la inició. Click ![Tasks icon]({% link content-services/images/ico-workflow.png %}) to start a new task for this file, and click a task description to view the task.
* **Histórico de versiones**: muestra las versiones anteriores. Click ![Upload version icon]({% link content-services/images/ico-version-upload.png %}) to upload a new version, ![Replace version icon]({% link content-services/images/ico-version-revert.png %}) to replace the current version with a previous version, ![Download icon]({% link content-services/images/ico-version-download.png %}) to download a previous version, or ![Version properties icon]({% link content-services/images/ico-version-properties.png %}) to view previous version properties.

### View a file in a browser

While the preview feature lets you view a file in Alfresco Share, you also have the option of viewing it in your default browser.

1. Sitúe el cursor sobre un fichero de la biblioteca de documentos.

2. Haga clic en **Ver en el navegador**.
   
   Se abre una nueva ventana del navegador y se muestra el fichero seleccionado. For some file types, such as Microsoft Office documents, Share launches the file in its associated program.

### Ver un fichero en Google Maps

When a file has geolocation data attached to it you can view the file location on Google Maps directly from Alfresco Share.

1. Hover over a file that has the Geolocation Metadata available icon ![Geolocation metadata icon]({% link content-services/images/geographic-icon.png %}).

2. Haga clic en **Más** y, seguidamente, en **Ver en Google Maps**.
   
   La ubicación asociada con el fichero se mostrará en Google Maps, junto con una vista previa del fichero y un resumen de los datos de geolocalización.

## Organizar contenidos

Al haber distintos usuarios creando carpetas y añadiendo ficheros, necesita tenerlo todo bien organizado. Alfresco Share has multiple features available to help you keep content labelled, organized, and filed correctly.

### Arrastrar y soltar contenido

La función de arrastrar y soltar le permite mover fácilmente contenido de un lugar a otro de la biblioteca.

> **Note:** No se puede arrastrar y soltar contenido en las vistas de tabla, de audio o de elementos multimedia.

1. En la biblioteca, haga clic en la miniatura del fichero o carpeta que desee mover. No suelte el botón del ratón.
   
   Cuando mueve una carpeta, se mueve también todo su contenido.

2. Arrastre el elemento de contenido a la ubicación que desee, que puede ser una carpeta del panel de exploración o la barra de navegación, u otra carpeta de la biblioteca.
   
   > **Note:** La carpeta de destino debe ser visible antes de empezar a mover el elemento. Al situar el cursor sobre la carpeta, esta quedará resaltada.
   
   La carpeta de destino aparece resaltada en la vista en árbol o en la barra de navegación.

3. Suelte el botón del ratón para mover el elemento de contenido.
   
   > **Important:** Para mover varios ficheros o carpetas a la vez, o para mover contenido a la biblioteca de otro sitio, utilice la acción **Mover a**.
   
   Para cargar una nueva versión de un fichero existente tiene que utilizar la opción **Cargar nueva versión**. If you drag and drop a file that has the same name as a file already in the drop location, it'll be added as a new file with `-1` appended to the file name.

## Mover contenido

Puede mover elementos de contenido y ponerlos en otra ubicación de la biblioteca actual o en la biblioteca de otro sitio.

1. Mantenga el cursor sobre un fichero o carpeta de la biblioteca, haga clic en **Más** y, seguidamente, en **Mover a**.
   
   Cuando mueve una carpeta, se mueve también todo su contenido.

2. Mantenga el cursor sobre un fichero o carpeta, y haga clic en **Más** y, después, en **Mover a**
   
   Cuando mueve una carpeta, se mueve también todo su contenido.
   
   > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Elija el sitio y la carpeta donde desea colocar el contenido.
   
   > **Note:** Solo podrá mover contenido a sitios en los que tiene permiso de acceso.

4. Haga clic en **Mover**.

Puede mover varios ficheros o carpetas al mismo tiempo seleccionándolos y utilizando la opción **Mover a** del menú **Elementos seleccionados**.

## Copiar contenido

Puede copiar contenido de una ubicación a otra, dentro de un mismo sitio o entre distintos sitios.

1. Busque el fichero o la carpeta que desea copiar.
   
   Al copiar una carpeta, se copia también su contenido.

2. Sitúe el cursor sobre un fichero o carpeta, y haga clic en **Copiar a**.
   
   > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.
   
   > **Note:** Solo se copia la versión actual. El histórico de versiones y los comentarios no se copian junto con el contenido.

3. Elija el sitio y la carpeta donde desea colocar la copia del contenido.
   
   > **Note:** Solo podrá copiar contenidos en sitios en los que tenga permiso de acceso.

4. Haga clic en **Copiar**.
   
   Se crea una copia del contenido. Esta copia se considera un fichero nuevo, por lo que aparece como la versión 1.0 con su nombre de usuario como creador.

Puede mover varios elementos al mismo tiempo seleccionándolos y utilizando la opción **Mover a** del menú **Elementos seleccionados**.

## Crear enlaces al contenido

Puede crear enlaces entre los elementos de contenido de distintas ubicaciones de Alfresco, dentro de un mismo sitio y entre distintos sitios. Es parecido a copiar contenidos, pero en lugar de crear una nueva copia, se crea un enlace al fichero ya existente.

1. Busque el fichero o la carpeta al que desea crear un enlace.

2. Sitúe el cursor sobre un fichero o carpeta, y haga clic en **Copiar a**.
   
   > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Elija el sitio y la carpeta donde desea crear un enlace al contenido.
   
   > **Note:** Solo podrá crear enlaces en sitios en los que tiene permiso de acceso.

4. Haga clic en **Crear enlace**.
   
   Se crea un enlace al contenido. Links to other content have "Link to" added to their name and are represented by the ![Linked file]({% link content-services/images/ico-copied-file.png %}) and ![Linked Folder]({% link content-services/images/ico-copied-folder.png %}) icons.

Cuando haga clic en un fichero o carpeta enlazados, o seleccione **Localizar elemento enlazado**, el fichero o carpeta original se mostrará en su sitio original.

You can hover over a link and select **Delete Link** to remove it.

> **Note:** If you're using something other than Alfresco Share to access content, for example Alfresco Desktop Sync, then linked files might not be visible.

## Descomprimir contenido

You can unzip `.zip` and `.acp` files to add their contents to a folder in Alfresco Share.

Esto quiere decir que no es necesario descargar un fichero zip para ver su contenido. Puede cargar rápidamente varios ficheros en un mismo fichero zip y después descomprimirlos en la ubicación que desee.

1. Haga clic en un fichero zip o acp para abrir la vista previa de ficheros.

2. Haga clic en **Descomprimir en**.

3. Elija el sitio y la carpeta donde desea descomprimir los ficheros.
   
   > **Note:** Solo podrá descomprimir ficheros en sitios para los que tiene permiso de acceso.

4. Haga clic en **Descomprimir**.
   
   Se descomprimen los ficheros y podrá verlos en la carpeta en la que decidió colocarlos. El fichero zip sigue estando disponible en su ubicación original.
   
   > **Note:** Si tiene un fichero zip que contiene miles de ficheros, puede tardarse más de 10 segundos en descomprimirlos. De ser así, es posible que vea un mensaje que le indica que la operación de descompresión no ha podido completarse. This message is issued because Share has not had confirmation that the unzip operation has completed within 10 seconds. Compruebe la carpeta de destino de los ficheros descomprimidos para comprobar si la operación de descompresión se ha realizado correctamente.
   
   > **Note:** Alfresco administrators can also use the \[Bulk Import tool]({% link content-services/latest/admin/import-transfer.md %}) to import multiple files.

## Cambiar el nombre del contenido

Puede cambiar rápidamente el nombre de los ficheros y las carpetas.

1. Busque el fichero o la carpeta cuyo nombre desee cambiar.

2. Hover your cursor over the content name to display the ![Configure icon]({% link content-services/images/ico-configure.png %}) edit icon.
   
   > **Note:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Haga clic en este icono para entrar al modo de edición.

4. Cambie el nombre y haga clic en **Guardar** (o pulse ENTRAR).
   
   > **Note:** No cambie ni borre la extensión del fichero.
   
   El nombre actualizado aparece en la lista de ficheros.
   
   > **Note:** También puede cambiar el nombre de un fichero o carpeta editando sus propiedades.

## Tagging and categorizing content {#tagcategorizecontent}

Puede etiquetar y categorizar los elementos de contenido que sean similares o guarden alguna relación para que sea más fácil encontrarlos.

Al hacer clic en una categoría o etiqueta del panel de exploración se muestra todo el contenido asociado a esa etiqueta o categoría.

Las etiquetas no están estructuradas y resultan útiles en las búsquedas, mientras que las categorías ayudan a organizar el contenido.

Las etiquetas y las categorías son una forma de indexación social; cuando se crean, ambas están disponibles en todos los sitios y todos los usuarios pueden utilizarlas.

### Etiquetas

Cualquier usuario puede crear una etiqueta y utilizarla para etiquetar el contenido. Se pueden etiquetar:

* Ficheros y carpetas
* Páginas wiki
* Entradas del blog
* Temas de discusión
* Eventos de calendario
* Enlaces del sitio

El contenido puede etiquetarse directamente cuando se crea, pero también es posible añadir etiquetas y eliminarlas del contenido existente. Puede crear sus propias etiquetas o seleccionarlas de una lista de etiquetas que ya estén en uso en el sitio.

En la sección **Biblioteca de documentos**, puede gestionar las etiquetas desde la lista de elementos o editando las propiedades del contenido. En todas las demás características del sitio, como las páginas wiki o los blogs, puede gestionar las etiquetas en la sección Etiquetas cuando cree o edite contenido. Siga estos pasos:

* **Add a new tag**: Escriba una etiqueta en el campo correspondiente y, después, haga clic en **Añadir**. Para crear varias etiquetas al mismo tiempo, separe cada etiqueta con un espacio. Si desea añadir una etiqueta de varias palabras, póngalas entre comillas (por ejemplo, "material en borrador").
* **Add an existing tag**: Haga clic en **Elegir entre las etiquetas más frecuentes del sitio** para ver las etiquetas que ya están en uso en el sitio actual y haga clic en la que desee utilizar.
* **Remove a tag**: In the list of associated tags, click ![Delete button]({% link content-services/images/ico-delete.png %}) to remove an existing tag.

> **Note:** Las listas de datos no se pueden etiquetar.

También puede buscar contenidos utilizando las etiquetas como términos de búsqueda.

### Categorías

A diferencia de las etiquetas, que no están jerarquizadas y las puede crear cualquier usuario, las categorías las debe gestionar un administrador.

Un ejemplo de categorías sería tener regiones como categorías de nivel superior, seguidas de las subcategorías África, Asia, Europa, América Latina, América del Norte y Oceanía y, finalmente, los países individuales en un tercer nivel.

Las categorías solo se pueden asociar a los elementos de la biblioteca y las carpetas. Content needs to be enabled for categorizing before you can add it to a category, see \[Managing Aspects]({% link content-services/latest/using/content/files-folders.md %}#applyaspects).

### Etiquetar contenido

Para encontrar el contenido con más facilidad, se pueden crear y gestionar etiquetas para los ficheros y carpetas de la biblioteca de documentos.

1. En la biblioteca, busque el contenido que desea etiquetar.

2. Hover your cursor over a tag to display the ![Tag icon]({% link content-services/images/ico-configure.png %}) tag icon, or if the content has no tags hover your cursor over the label **No Tags**.
   
   > **Note:** In some views this option isn't available or you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}) information icon.

3. Click ![Tag icon]({% link content-services/images/ico-configure.png %}).

4. Cree y gestione las etiquetas:
   
   * **Crear una nueva etiqueta:** Escriba el nombre de la etiqueta; puede constar de una o más palabras. Pulse ENTRAR.
     > **Note:** Es posible que aparezca una lista de posibles coincidencias mientras escribe. Se trata de etiquetas que ya se han utilizado en este sitio. Puede seleccionar una etiqueta de esta lista y añadirla.
   * **Editar una etiqueta existente:** Haga clic en una etiqueta para entrar en el modo de edición. Cambie el nombre de la etiqueta y pulse ENTRAR.
   * **Quitar una etiqueta:** Haga clic en la **X** que aparece a la derecha de la etiqueta para eliminarla.

5. Haga clic en **Guardar**.

### Categorizar el contenido

Puede clasificar los ficheros y las carpetas para agruparlos en categorías de contenido predefinidas.

1. Sitúe el cursor sobre el contenido que desee categorizar.
   
   > **Note:** Solo puede categorizar los contenidos que tengan la etiqueta **Sin categorías** o que muestren las categorías existentes. See \[Managing Aspects]({% link content-services/latest/using/content/files-folders.md %}#applyaspects) for more details on enabling content to be categorizable with the classifiable aspect.

2. Haga clic en **Editar propiedades**.

3. Haga clic en la opción **Seleccionar** de Categorías.
   
   Se muestran las categorías disponibles. Puede hacer clic en una categoría para mostrar las subcategorías correspondientes. Las categorías están disponibles para utilizarlas en todos los sitios y para todos los usuarios.

4. Haga clic en el signo **+** al lado de cada categoría que desee añadir. Puede clasificar los ficheros por categorías primarias y subcategorías.

5. Haga clic en **Aceptar** y, seguidamente, en **Guardar**.

Cuando haga clic en una categoría en la biblioteca de documentos o en el panel de exploración, todos los contenidos de esa categoría se mostrarán en la biblioteca de documentos. Al hacer clic en una etiqueta, bien junto al contenido en la biblioteca de documentos o en el panel de exploración, todos los contenidos con esa etiqueta se mostrarán en la biblioteca de documentos.

También puede buscar contenidos utilizando las etiquetas como términos de búsqueda.

### Añadir contenido a favoritos

Utilice la acción **Favorito** para señalar los elementos de contenido de la biblioteca a los que accede con frecuencia. This adds the file or folder to the **My Favorites** view in the explorer panel where you can easily find it.

Puede marcar como favoritos tanto ficheros como carpetas.

> **Tip:** In some views this option isn't available or you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}){:height="18px" width="18px"} information icon.

1. En la biblioteca, busque los elementos de contenido que desea marcar como favoritos.

2. Click ![Favorite icon]({% link content-services/images/favorite-icon.png %}){:height="18px" width="18px"} **Favorite**.
   
   Verá que cambia el icono.
   
   > **Note:** Haga clic otra vez en el icono **Favorito** si desea eliminar el contenido de su lista de favoritos.

### Localizar elementos y carpetas

Al filtrar los elementos de contenido de la biblioteca desde la vistas de exploración **Documentos** o **Etiquetas**, no es posible saber en qué ubicación de la estructura de carpetas de la biblioteca se encuentra un fichero o carpeta concretos. Las acciones **Localizar un fichero** y **Localizar carpeta** permiten dicha ubicación dentro de la estructura de la biblioteca.

Esta opción solo está disponible si en el panel de exploración se ha seleccionado la vista **Etiquetas** o una de las vistas **Documentos** (Todos los documentos, Que estoy editando, Que otros están editando, Modificados recientemente, Añadidos recientemente o Mis Favoritos).

1. Sitúe el cursor sobre un fichero o carpeta para que se muestren las acciones disponibles.
   
   > **Tip:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}){:height="18px" width="18px"} information icon.

2. Dependiendo del tipo de contenido que haya seleccionado, haga clic en **Localizar un fichero** o en **Localizar carpeta**.

La vista se actualiza para mostrar el fichero o carpeta en su ubicación de la biblioteca.

### Hacer una selección múltiple de contenido

Puede realizar una sola acción en varios elementos de contenido a la vez. Puede seleccionar cuantos ficheros o carpetas desee en la misma vista.

1. Seleccione el contenido en la biblioteca de documentos. Puede hacerlo de dos formas:
   
   * Marque la casilla de cada fichero y carpeta que desee seleccionar.
   * Abra el menú **Seleccionar** y haga clic en una opción: **Documentos**, **Carpetas** o **Todo**.
   
   En el menú Seleccionar, haga clic en **Ninguno** para borrar la selección; haga clic en **Invertir la selección** para alternar entre casillas marcadas y desmarcadas.

2. Abra el menú **Elementos seleccionados** y haga clic en la acción que desee llevar a cabo.

## Eliminar contenido

Si desea borrar contenido de la biblioteca de un sitio, puede eliminar dicho contenido.

1. Sitúe el cursor sobre un fichero o carpeta de la biblioteca y haga clic en **Más** y, a continuación, en **Eliminar documento** o **Eliminar carpeta**.
   
   Al eliminar una carpeta, se eliminan también todos los elementos que contiene, incluidos los contenidos creados por otros usuarios, aunque el usuario que realice la eliminación no tenga permiso para eliminarlos directamente.
   
   > **Tip:** In some views you'll need to click the ![Information icon]({% link content-services/images/ico-information.png %}){:height="18px" width="18px"} information icon.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

2. Haga clic en **Eliminar**.

El contenido se traslada a la papelera, desde donde podrá recuperarlo o eliminarlo de forma permanente.

> **Note:** If the file has been \[declared as a record]({% link governance-services/latest/using/easy-access-records.md %}#declaring-a-file-as-a-record) then the record is still available in the \[Records Management site]({% link governance-services/latest/using/overview.md %}).

### Recuperar contenido eliminado

Si necesita recuperar algún elemento de contenido que haya eliminado, puede hacerlo desde la papelera.

1. Abra el menú de usuario de la barra de tareas y haga clic en **Mi Perfil**; a continuación, seleccione la pestaña **Papelera**.
   
   > **Tip:** Todos los contenidos que ha eliminado aparecen aquí en forma de lista. Puede introducir el nombre del contenido en el recuadro de búsqueda y hacer clic en **Buscar** para buscar contenidos específicos.

2. Haga clic en la opción **Recuperar**, que aparece al lado del elemento, para recuperarlo.

Los elementos seleccionados se restauran a la ubicación desde la que se eliminaron. También puede recuperar varios elementos seleccionándolos y haciendo clic en **Elementos seleccionados** y, a continuación, en **Recuperar**.

### Vaciar la papelera

Al borrar cualquier elemento de contenido, este se traslada a la papelera. Si vacía la papelera, se borrarán todos los elementos de contenido de forma permanente.

> **Important:** Una vez vaciada la papelera, los elementos de contenido habrán desaparecido para siempre y no podrán recuperarse.

1. Abra el menú de usuario de la barra de tareas y haga clic en **Mi Perfil**; a continuación, seleccione la pestaña **Papelera**.
   
   > **Tip:** Todos los contenidos que ha eliminado aparecen aquí en forma de lista. Puede introducir el nombre del contenido en el recuadro de búsqueda y hacer clic en **Buscar** para buscar contenidos específicos.

2. Haga clic en **Vaciar** y, seguidamente, en **Aceptar**.
   
   Como opción predeterminada solo se borran 1000 elementos cada vez.

El contenido queda eliminado de forma permanente. También puede eliminar de forma permanente elementos concretos haciendo clic en la opción **Eliminar** que aparece a su lado, o bien, eliminar varios elementos a la vez seleccionándolos y haciendo clic en **Elementos seleccionados** y, a continuación, en **Eliminar**.

## Social features for content

En Alfresco puede utilizar varias funciones similares a las de las redes sociales para indicar que le gusta un contenido, añadirlo a sus favoritos o dejar un comentario en ficheros y carpetas.

These social features are available in the file preview screen, in the Site Content dashlet, and in several of the Document Library views. You can select to view just favorite files in several of your user and site dashlets.

* Click ![Like icon]({% link content-services/images/like-icon.png %}) to like an file/folder. vuelva a hacer clic para cancelar la acción.
* Click ![Favorite icon]({% link content-services/images/favorite-icon.png %}) to favorite an file/folder. vuelva a hacer clic para eliminarlo de favoritos.
* Click ![Comment icon]({% link content-services/images/comment-icon.png %}) **Comment** to comment on an file/folder. Cuando haya escrito el comentario, haga clic en **Añadir**.

> **Note:** No podrá añadir comentarios si su nivel de permisos del sitio es Consumidor. Speak to your Alfresco administrator if you need to change your permission level.

### Gestionar sus comentarios

Añadir comentarios a los contenidos es un método muy práctico de ofrecer opiniones y sugerencias. Puede editar y eliminar cualquier comentario que haya añadido.

No podrá añadir comentarios si su nivel de permisos del sitio es Consumidor. Speak to your Alfresco administrator if you need to change your permission level.

Tan solo los administradores de un sitio pueden editar y eliminar los comentarios de otros usuarios.

#### Añadir un comentario

Puede añadir comentarios a carpetas y ficheros concretos para facilitar información o notas a otros usuarios.

Puede hacer comentarios tanto en los ficheros como en las carpetas. This feature is available in a file preview screen, in the Site Content dashlet, and in several of the Document Library views.

> **Note:** No podrá añadir comentarios si su nivel de permisos del sitio es Consumidor. Póngase en contacto con el administrador si necesita cambiar su nivel de permisos.

1. Busque el contenido (fichero o carpeta) en el que desee dejar un comentario.

2. Haga clic en **Comentario**.
   
   Se abre el cuadro de comentarios de la pantalla de vista previa de ficheros.

3. Escriba su comentario.
   
   El cuadro de texto cuenta con características que le ayudan con la edición y permiten formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente.

4. Haga clic en **Añadir un comentario**.
   
   Su comentario aparecerá al principio de la lista. Tiene la opción de editar los comentarios que ha dejado, y los administradores del sitio pueden editar todos los comentarios.

#### Editar un comentario

Puede editar un comentario para cambiar su contenido.

1. Busque el contenido (fichero o carpeta) en el que ha dejado un comentario, y haga clic para abrirlo en la pantalla de vista previa de ficheros.

2. Click the ![Edit Comment icon]({% link content-services/images/ico-configure.png %}) edit comment icon for the comment you want to edit.
   
   Este icono solo está disponible para el usuario que creó el comentario y para los administradores del sitio. En la lista de comentarios aparecen los diez últimos comentarios que se han añadido.

3. Edite el comentario.

4. Haga clic en **Guardar**.
   
   El nombre de usuario y la foto de perfil que aparecen junto al comentario indican quién es el usuario que lo añadió. Estos datos no se actualizan con los del usuario que actualice un comentario.

#### Eliminar un comentario

Los usuarios pueden eliminar sus propios comentarios, y los administradores pueden borrar los de cualquier usuario.

1. Busque el contenido (fichero o carpeta) en el que ha dejado un comentario, y haga clic para abrirlo en la pantalla de vista previa de ficheros.

2. Click the ![Delete icon]({% link content-services/images/ico-delete.png %}) Delete Comment icon for the comment you want to delete.
   
   Este icono solo está disponible para el usuario que creó el comentario y para los administradores del sitio. En la lista de comentarios aparecen los diez últimos comentarios que se han añadido.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario seleccionado.

3. Haga clic en **Eliminar**.