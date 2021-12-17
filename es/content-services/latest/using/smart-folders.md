---
title: Smart Folders
menutitle: ES Smart Folders
---

A Smart Folder is a way of grouping files from different locations in Alfresco Share into a single folder, so that you can quickly find similar files.

Al abrir el contenido de una carpeta inteligente, se ejecuta una búsqueda y se muestran los resultados. It is “smart”, because there is no physical folder to represent it in the repository.

For example, a Smart Folder called My video files might be created to contain all files that I created that have a video format. Every time I open the My video files folder, the search runs, and all my video files are available in that folder, wherever in the repository I have created them.

Es posible que el usuario ni se dé cuenta de que está utilizando carpetas inteligentes. If you see this icon, ![Folder with a magnifying glass representing a Smart Folder]({% link content-services/images/sf.png %}), then the folder is smart. Además, cada vez que se cargan ficheros en estas carpetas, estos se clasifican automáticamente.

The diagram shows a physical file system, and how a Smart Folder structure is created to contain files relevant to a particular customer:![Smart folder mapping]({% link content-services/images/sf-mapping.png %})

Las acciones que pueden realizarse con las carpetas inteligentes son limitadas:

* **Añadir/Crear**: puede añadir ficheros a una carpeta inteligente. El fichero se coloca en una carpeta física de conformidad con la regla de organización.
* **Actualizar**: puede actualizar los ficheros de una carpeta inteligente. Es posible que, al actualizar una propiedad, se elimine un fichero de la carpeta inteligente actual (porque ya no cumple con los criterios de la consulta).
* **Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy** actions for files are not supported.

The Smart Folder itself can't be edited in Content Services, except through the Smart Folder Template. For more information about Smart Folder Templates, see [Applying a Smart Folder Template](#applysmartfoldertemplate).

El administrador del sistema crea las plantillas y los usuarios pueden cargarlas, por ejemplo, para establecer una estructura para una reclamación, para archivar por separado los ficheros PDF de los de vídeo y audio, o bien, simplemente, para personalizar la estructura de carpetas por usuario.

Para obtener más información, vea los vídeos: \[Smart Folders videos]({% link content-services/latest/tutorial/video/content.md%}#smart-folder-overview)

Los administradores del sistema y los analistas de negocio pueden encontrar más información en \[Configuring Smart Folders]({% link content-services/latest/config/smart-folders/index.md %}).

> **Nota:** Todos los vídeos y etiquetas en las imágenes están en inglés.

## Applying a Smart Folder Template {#applysmartfoldertemplate}

Puede usar los aspectos para aplicar una estructura de carpetas inteligentes a una carpeta física.

1. In a site, select Document Library.

2. Click Create, then Folder to create a new folder. Enter the folder name and Save.

   Alternativamente, seleccione una carpeta física existente. Una carpeta física es una carpeta creada por un usuario: ![Physical folder icon]({% link content-services/images/folder.png %})

3. Hover over the folder and from the menu, select More, then Manage Aspects.

4. In the Select Aspects window, add one or more of the predefined Smart Folder aspects (System Smart Folder or Custom Smart Folder depending on the templates added by your organization), and Save.

   Ask your business analyst or system administrator whether System or Custom Smart Folders are set up for your organization.

5. Hover again over the new folder and from the menu, select Edit Properties, and All Properties. Select the Smart Folder Template that you want, and Save.

   If your system administrator has created templates for your organization, you can find these by drilling down to `Data Dictionary/Smart Folder Templates`.

   Los administradores del sistema pueden obtener más información sobre las plantillas aquí: \[Enabling Smart Folders]({% link content-services/latest/config/smart-folders/index.md %}).

   La carpeta física que eligió contiene ahora una estructura de carpetas inteligentes, en la que se incluyen ficheros que cumplen los criterios de búsqueda de la plantilla de carpetas inteligentes. For example, if you apply the standard smartFoldersExample.json template, you have a number of folders:

   * Mi Contenido: todos los ficheros del repositorio que contienen:
   * Todo el contenido del sitio (documentos y ficheros multimedia, archivados en función del tipo)
   * El contenido de esta carpeta (documentos y ficheros multimedia, archivados en función del tipo)
   * Contribuciones
   * Mi contenido modificado por otros usuarios
   * Espacio personal de usuario
   * Etiquetado como «confidencial»

   Las carpetas contienen ficheros en función de los ficheros que el usuario tiene en su sitio. For example, if you have created audio files in the site, you will see these if you drill down to All site `content/Multimedia Files/Audio content` and any specific to this physical folder in `This folder's content/Multimedia Files/Audio content`. Any of your files that are marked as Confidential in the metadata appear in the `Tagged 'Confidential'` folder.

## Preguntas frecuentes sobre las carpetas inteligentes

Si encuentra algún problema al trabajar con las carpetas inteligentes, pruebe estas recomendaciones.

### ¿Cuáles son las características principales de las carpetas inteligentes?

Con las carpetas inteligentes puede:

* Encontrar contenido en función de su naturaleza, no de su ubicación.
* Definir las búsquedas almacenadas en una plantilla y mostrarlas en un árbol jerárquico de carpetas.
* Ejecutar una búsqueda al abrir una carpeta de modo que los resultados se muestren como si se tratase del «contenido de la carpeta».
* Federar contenido distribuido por todo el repositorio en una sola vista o carpeta inteligente.
* Generar una o varias taxonomías operadas por metadatos para crear un árbol de carpetas que permita que cualquier carpeta o fichero pueda aparecer en todas las carpetas pertinentes al contexto de negocio sin necesidad de organizarlos previamente.
* Clasificar nuevos ficheros de manera automática y hacer que se hereden o se asignen metadatos al propio fichero.
* Replicar fácilmente las estructuras de las carpetas inteligentes.
* Apply to existing content without the need to restart Content Services

### ¿Puedo eliminar un fichero de una carpeta inteligente?

No. Esta opción no está disponible. Debe eliminar el fichero de su ubicación física o editar las propiedades para que deje de cumplir los requisitos de organización de la carpeta inteligente.

### ¿Puedo crear una nueva carpeta o fichero dentro de una carpeta inteligente?

Puede crear un nuevo fichero, pero no una nueva carpeta. El fichero se coloca en una carpeta física de conformidad con la regla de organización.

### ¿Puedo actualizar un fichero en una carpeta inteligente?

Sí, pero si cambia las propiedades del fichero, es posible que este quede fuera de la carpeta inteligente.

### ¿Puedo mover o copiar un fichero de una carpeta inteligente?

No. Dado que el fichero no vive físicamente en esa carpeta, no puede moverse ni copiarse.

### ¿Por qué no puedo marcar una carpeta inteligente como Me gusta o Favorito?

Hay ciertas acciones de carpeta que no se pueden realizar en las carpetas inteligentes. Por ejemplo, las opciones Favorito, Me gusta y Comentario no están disponibles (puesto que la carpeta no existe físicamente).

Otras acciones que tampoco están disponibles son Eliminar, Mover a, Copiar a, Cargar y Crear.

### ¿Por qué no aparece un nuevo fichero en una carpeta inteligente?

Un fichero necesita unos segundos hasta que aparece en la carpeta inteligente. Esto ocurre a menudo cuando el índice no está actualizado. Si tiene problemas, póngase en contacto con el administrador del sistema.
