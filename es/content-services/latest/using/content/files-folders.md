---

title: Ficheros y carpetas
---

Una vez añadidos los ficheros a un sitio, los miembros del sitio pueden verlos y trabajar con ellos. Además de añadir más ficheros, los miembros pueden ver, descargar, editar y eliminar ficheros.

## Editar ficheros

Existen varias formas de editar los contenidos. Estas opciones están disponibles cuando resulten adecuadas para un tipo de fichero.

La acción **Editar fuera de línea** le permite descargar un fichero para editarlo en el equipo. Al hacerlo, el fichero queda bloqueado en la biblioteca para evitar que otros usuarios lo modifiquen al mismo tiempo. Esta acción está disponible para todos los ficheros.

La acción **Editar en Microsoft Office** le permite editar un fichero en el programa de MS Office correspondiente. The file is locked in Alfresco Share while it's being edited. Esta acción está disponible para ficheros de Microsoft Office 2003 y versiones posteriores.

The **Edit in Alfresco Share** action lets you edit plain text, HTML, or XML files directly in the document library. It's available for these file types, which can all be created with the **Create** feature in the library.

La acción **Editar en Google Docs** le permite trabajar con ficheros en Google Docs. The file is locked in Alfresco Share while it's being edited. Está disponible para documentos, presentaciones y hojas de cálculo de formatos compatibles.

También puede editar las propiedades de un fichero o cargar versiones nuevas de un fichero existente.

### Editar ficheros fuera de línea

Cuando se edita un fichero fuera de línea, este se descarga en el equipo local y se bloquea en la biblioteca para que otros usuarios no puedan sobrescribirlo mientras se efectúan los cambios fuera de línea.

1. Sitúe el cursor sobre un fichero y haga clic en **Más** y, a continuación, en **Editar fuera de línea**.
   
   Los mensajes que verá después varían de un navegador a otro.

2. Siga las instrucciones de la pantalla. Cuando se le pida que abra o guarde el fichero, guárdelo en su equipo.
   
   > **Note:** Según la configuración de su navegador, es posible que el fichero se guarde automáticamente en una ubicación predeterminada de su equipo.
   
   El fichero queda añadido a la vista **Que estoy editando** (en el lado izquierdo de la biblioteca). El fichero original estará aún en su ubicación original de la biblioteca. Un icono indica a los usuarios que alguien tiene bloqueado el fichero para editarlo.

3. Ahora puede abrir y editar la versión que ha descargado.
   
   When you're done, click **Upload New Version** to upload the edited version to Alfresco Share.
   
   Puede hacer clic en **Cancelar edición** para desbloquear el fichero sin efectuar cambios.

### Editing files in Alfresco Share

You can edit plain text, HTML, and XML files directly in Alfresco Share.

> **Note:** This action is also available for files configured with the `Inline Editable` aspect.

1. Hover over a file and click **More** then **Edit in\*\*\*\*Alfresco Share**.
   
   The Edit Content page appears.

2. Edite los detalles y el contenido del fichero según sea necesario.
   
   El campo **Nombre** no admite los siguientes caracteres especiales: `* " < > \ / . ? : and |`. Si el nombre contiene un carácter no permitido, el botón **Guardar** estará desactivado.
   
   > **Note:** El nombre sí puede contener un punto, siempre que este no sea el último carácter. This lets you add an extension (for example, `.txt`, `.html`, or `.xml`).

3. Haga clic en **Guardar**.

### Editar ficheros en Microsoft Office

You can edit Microsoft Office files directly from Alfresco Share. When you're editing a file it's locked in Share until you finish editing it.

> **Note:** Si trabaja con Mac, compruebe que haya actualizado su sistema con el último número de versión menor de Microsoft Office. Si tiene instalada una versión anterior, es posible que tenga dificultades para abrir los documentos.

1. Sitúe el cursor sobre un fichero y haga clic en **Más** y, seguidamente en **Editar en Microsoft Office**.
   
   Un mensaje le pedirá que confirme que el contenido es de confianza.
   
   El fichero se abre en una ventana distinta. In Share the file will be shown as locked.
   
   > **Note:** You might get a further request to enter your Share login details and **Enable Editing**.

2. Ahora puede editar el fichero.
   
   The minor version number in Share is updated each time you save the file. Están disponibles todas las funciones de Microsoft Office.

3. Cuando termine, guarde y cierre el fichero.

### Editar ficheros en Google Docs

La acción **Editar en Google Docs** está disponible para todos los ficheros que se puedan editar en Google Docs. Son compatibles todos los formatos comunes de documentos, hojas de cálculo y presentaciones.

Files you edit are temporarily stored in Google Docs, then removed from Google Docs once they've been checked back in to Alfresco Share.

1. Mantenga el cursor sobre el fichero, haga clic en **Más** y, después, en **Editar en Google Docs**.
   
   If prompted, authorize Share to access your Google Docs account. If you have a Google Username in your Alfresco Share profile then it will be used as the default account.
   
   > **Note:** Si el navegador le solicita permiso para ver elementos emergentes de Google Docs, déselo. Si usa Safari, no podrá utilizar Google Docs hasta que haya habilitado todos los elementos emergentes en la configuración, así que, por motivos de seguridad, se recomienda usar otro navegador. Si ya ha bloqueado el fichero para editarlo y ahora desea volver a trabajar en él, elija la acción **Continuar edición en Google Docs**.
   
   El fichero se abre en Google Docs en una nueva pestaña del navegador. It's locked in Share so that other users can't edit it while you're working on it. El fichero sigue bloqueado hasta que descarte o guarde los cambios.

2. Edite el contenido.

3. Cuando haya terminado, cierre la pestaña del navegador de Google Docs.
   
   In Alfresco Share you'll see the file displays the !\[Geolocation metadata icon]({% link content-services/images/ico-googledocs.png %}) icon to show that it's open in Google Docs.

4. In Alfresco Share, click **More** then **Check In Google Doc**.
   
   También puede seleccionar **Continuar edición en Google Docs** para seguir editando y **Cancelar edición en Google Docs** para descartar la sesión de edición y los cambios realizados.

5. On the Version Information dialog box, indicate if the revision is major or minor, then add any information that might be relevant to the updates you made.

6. Haga clic en **Aceptar**.
   
   This saves the file to Alfresco Share and unlocks the file.
   
   > **Note:** Para obtener más información sobre cómo trabajar con Google Docs, consulte [Preguntas frecuentes sobre Google Docs](#googledocsfaq).

### Compartir ficheros de Google Docs

Puede compartir ficheros de Google Docs mientras los edita para que varios usuarios puedan trabajar en un documento al mismo tiempo.

1. Mantenga el cursor sobre un fichero, haga clic en **Más** y en **Editar en Google Docs**, o bien seleccione esta opción en la pantalla de vista previa del fichero.
   
   If prompted, authorize Alfresco Share to access your Google Docs account.
   
   > **Note:** Si ya ha bloqueado el fichero para editarlo y ahora desea volver a trabajar en él, haga clic en la acción **Continuar edición en Google Docs**.
   
   El fichero se abre en Google Docs y It will be locked in Share so that other users can't edit it while you're working on it. El fichero sigue bloqueado hasta que descarte o guarde los cambios.

2. Haga clic en **Compartir**.

3. En el cuadro de texto debajo de la opción para añadir personas, escriba las direcciones de correo electrónico de las personas con quienes desea compartirlo. Puede añadir una persona, una lista de correo o elegir entre sus contactos.

4. Elija el nivel de acceso en el menú junto a cada colaborador: **Puede ver**, **Puede comentar** o **Puede editar**.

5. Haga clic en **Hecho**.
   
   Todos los usuarios con los que haya compartido el documento recibirán un correo electrónico con un enlace al fichero. Al hacer clic en el enlace, podrán ver y editar el fichero mientras usted trabaja en él. When you save the file back to Share or discard the changes they won't be able to edit it any further until you repeat the steps above.

6. When you've finished your editing close the Google Drive tabs and in your Share editing session click **Save to Alfresco Share**.

### Google Docs FAQs {#googledocsfaq}

Si encuentra algún problema al trabajar con ficheros en Google Docs, busque la solución en la lista siguiente.

| Question| Solution
|----------|----------
| Se muestra un mensaje de error al usar Google Docs en Internet Explorer (IE)| Google Drive y Google Editor solo son compatibles con las dos últimas versiones de IE (11 y 10). Con las demás versiones aparecerá un mensaje para indicar que el navegador está obsoleto. (Lo mismo ocurre con Safari —que no es compatible con Windows—, Firefox y Google Chrome: las dos últimas versiones son las únicas compatibles).
| ¿Está ya disponible en Google Docs el botón de Share?| Sí. El botón de Share ya está plenamente operativo.
| Aparece una pantalla en blanco o un aviso de que necesito permiso para acceder a un elemento| There maybe a conflict between the Google OAuth credentials set on your Alfresco Share account and those you have attempted to open the document with or that you are currently signed into Google with. Cierre sesión en su cuenta de Google y vuelva a iniciarla en la cuenta original con la que editó el documento.
| El documento se «degradará»| Si intenta editar un documento que se puede importar a Google Docs, pero Google no le permite exportarlo en el mismo formato, aparecerá un mensaje avisándole de que el documento se degradará. Debería decir «mejorado» en vez de degradado.
| Documents discarded or saved to Alfresco Share are still visible in Google Drive| Google ha implantado mejoras, por lo que esto ya no debería ser un problema.
| La opción Editar en Google Docs no está disponible| In some circumstances, the **dit in Google Docs** option is not available. Por ejemplo, si intenta editar documentos u hojas de cálculo con un tamaño superior a 2 MB y presentaciones superiores a 50 MB, o si el tipo de fichero no es compatible con su edición en Google Docs. Tampoco verá esta opción si no tiene permisos de escritura para editar el documento. La opción **Editar en Google Docs** tampoco está disponible en IE8.
| Las hojas de cálculo de Google Docs parecen estar truncadas| When creating a spreadsheet in Google Docs, and then saving it to Alfresco Share, when editing it again in Google, the rows and columns may appear to be truncated. Sin embargo, la hoja de cálculo funciona perfectamente y puede seguir añadiendo nuevas filas y columnas en Google Docs. Si abre el documento en Excel, verá que no hay nada truncado. El problema se origina cuando Google trata de optimizar los datos internos del fichero a su mínima expresión para que este se pueda transferir como un fichero de menor tamaño.
| ¿Por qué no se ha actualizado el título del documento después de desbloquearlo desde Google Docs?| Desde que se guarda el título hasta que está disponible a través de la API de Google, hay un retraso. So, if you quickly save the document after changing the title, this may result in the title not being updated in Alfresco Share when you check the document back in.
| Aparecen avisos de que se ha producido un error y es necesario volver a cargar el fichero o de que el fichero no existe| When you edit or view a Google Doc from Alfresco Share, it's temporarily stored in Google Docs. If it's checked in or the editing is cancelled from in Share, then this temporary version is removed from Google Drive and is no longer available. The file can be accessed from Share.

### Editar las propiedades de ficheros y carpetas

Edite los detalles básicos de una carpeta o fichero para modificar el nombre, la descripción y las etiquetas. These properties are also referred to as *metadata*.

> **Note:** If the selected folder or file has the `Classifiable` aspect applied, there will be an additional **Categories** option available.

1. Mantenga el cursor sobre un fichero o carpeta, y haga clic en **Editar propiedades**.
   
   The Edit Properties dialog box displays the basic metadata for the item. El enlace **Todas las propiedades**, en la esquina superior derecha, mostrará el conjunto completo de propiedades que está disponible para el elemento.

2. Modifique los detalles según sea necesario.
   
   El campo **Nombre** no admite los siguientes caracteres especiales: `* " < > \ / ? : and |`.
   
   > **Note:** El nombre sí puede contener un punto, siempre que este no sea el último carácter.

3. Haga clic en **Seleccionar** debajo de **Etiquetas** para editar las asociaciones a etiquetas. Puede añadir y eliminar etiquetas existentes, así como crear otras nuevas.
   
   On the Select page the left column lists the tags being used in this network. En la columna derecha se muestran las etiquetas ya asociadas a la carpeta o elemento.
   
   1. **Crear una nueva etiqueta:** Type the tag name and click the !\[Create Tag icon]({% link content-services/images/ico-create-tag.png %}) Create new item icon (or press ENTER). Cree etiquetas de una en una. La etiqueta puede ser una sola palabra o una cadena de palabras.
   
   2. **Añadir una etiqueta existente:** Find a tag in the left column and click the !\[Add Tag icon]({% link content-services/images/ico-add-tag.png %}) Add icon to associate it with the current folder or item.
   
   3. **Eliminar una etiqueta existente:** Find a tag in the right column and click the !\[Remove Tag icon]({% link content-services/images/ico-remove-tag.png %}) Remove icon.
   
   4. Haga clic en **Aceptar** para guardar las modificaciones.
   
   > > **Note:** Puede añadir, editar y eliminar etiquetas si mantiene el cursor sobre las etiquetas existentes o la descripción **Sin etiquetas** en la biblioteca de documentos.

### Cargar nuevas versiones

Puede cargar contenido desde su equipo para actualizar un fichero.

Al hacer esto con un fichero que tiene bloqueado, se actualiza el contenido y se elimina el bloqueo al mismo tiempo. Puede hacer lo mismo con un fichero que no esté bloqueado para actualizarlo sin necesidad de descargarlo a su equipo.

1. Busque el fichero que desea actualizar.
   
   > **Note:** La vista **Que estoy editando** muestra los ficheros que tiene bloqueados para editarlos.

2. Sitúe el cursor sobre el fichero y haga clic en **Más** y, a continuación, en **Cargar nueva versión**.

3. Click **Select files to upload** on the Update File dialog box.

4. Busque y seleccione en su equipo el fichero que desea cargar.
   
   > **Note:** Si selecciona un fichero con otro nombre o de otro tipo, será este el que aparezca. Puede continuar como en el paso siguiente, cancelar o elegir cargar otro fichero. Si decide continuar, se usará el nombre o tipo del fichero cargado.

5. Indique si la revisión es mayor o menor.

6. En el recuadro **Comentarios**, añada la información que corresponda a la actualización.

7. Haga clic en **Cargar**.

8. Cuando la barra de progreso indique que ha finalizado la actualización, haga clic en **Aceptar**.
   
   Al actualizar un fichero bloqueado, este se desbloquea y desaparece de la vista **Que estoy editando**.

## Descargar ficheros

You can quickly download files from Alfresco Share so that you have a local copy.

> **Important:** When you select a locked file you're actually downloading the last version that was added to Share, which might be out of date. The user who locked it for editing might have a more recent version of it outside Share.

1. Sitúe el puntero sobre un fichero o carpeta y haga clic en **Descargar** / **Descargar como zip**.
   
   Aparecerá un mensaje donde se le pide que abra o guarde el fichero. Según la configuración de su navegador, es posible que el fichero se guarde automáticamente en una ubicación predeterminada de su equipo.
   
   > **Note:** Download as Zip cannot create zip files larger than 4GB.

2. Guarde el fichero en su equipo.
   
   > **Note:** También puede seleccionar varios ficheros o carpetas, y hacer clic en **Descargar como zip** en el menú **Elementos seleccionados**. Si el fichero es un documento de Microsoft Office, PDF u otro programa de texto (es decir, no se trata de una imagen o un vídeo), también podrá elegir la opción **Descargar** para descargarlo en su formato original o en versión PDF en la pantalla de vista previa.

## Ficheros compartidos

You can easily share an file - even with people who don't have an Alfresco Share account. Al hacer clic en la acción **Compartir**, se genera una dirección URL que puede enviarse por correo electrónico o publicarse en las redes sociales.

Todas las personas con acceso a la URL pueden ver el fichero. Those with an Share account have the option of signing in; those without an account can create one.

Esta opción está disponible en la vista detallada de la biblioteca de documentos y en la pantalla de vista previa del fichero. In the Document Library graphical views click !\[Information icon]({% link content-services/images/ico-information.png %}) to see the option.

1. En la sección **Biblioteca de documentos**, busque el fichero que quiere compartir.
   
   Solo puede compartir ficheros, no carpetas.

2. Click !\[Share icon]({% link content-services/images/ico-share.png %}) **Share**.
   
   Aparecerá una ventana con la URL del fichero.
   
   > **Note:** La acción **Ver** le permite previsualizar el fichero para asegurarse de que es el que quiere compartir.

3. Haga clic en el icono que represente cómo desea compartir el enlace.
   
   > **Note:** También puede copiar el enlace y pegarlo donde quiera; por ejemplo, en un mensaje de correo electrónico o un documento.
   
   Al seleccionar la opción de cómo se desea compartir el fichero, aparece la página correspondiente.

4. Rellene los datos que se soliciten y comparta el enlace.
   
   * **Email**: el asunto y el cuerpo del correo electrónico ya están completados. Añada un destinatario, edite el mensaje según considere necesario y envíelo.
   * **Facebook**: escriba un comentario para publicar con el enlace y seleccione cómo desea compartirlo. Haga clic en **Compartir enlace**.
   * **Twitter**: edite el mensaje según dese y haga clic en **Compartir usando Twitter**.
   * **Google+**: escriba un comentario para publicar con el enlace y elija con quién desea compartirlo. Haga clic en **Compartir**.
   
   > **Note:** If an file is a Microsoft Office, PDF, or other text-based file type (not an image or video) then you can also click !\[Advanced Search icon]({% link content-services/images/ico-link.png %}) on the file preview to share a link to the item, and even select to **Link to current page**.

Cuando ya no quiera que esté disponible un fichero compartido públicamente, puede invalidar el enlace. Una vez hecho esto, si alguien intenta acceder al fichero, ya no podrá ver la página pública.

1. Busque el fichero que había compartido.

2. Haga clic en **Compartido**. Aparecerá la ventana con la URL del elemento.

3. Haga clic en **No compartir**.

## Applying aspects {#applyaspects}

Puede utilizar los aspectos para añadir funciones, propiedades u opciones adicionales a los ficheros. Alfresco Share provides you with a list of default aspects.

For a detailed list of aspects available and what they do, see \[About aspects]({% link content-services/latest/config/repository.md %}#about-aspects).

1. Seleccione un fichero para verlo en la pantalla de vista previa.

2. En la lista **Acciones sobre el documento**, haga clic en **Gestionar los aspectos**.

3. In the **Available to Add** list click !\[Add icon]({% link content-services/images/ico-add.png %}) next to the aspects you want to add to the file.
   
   Click !\[Delete icon]({% link content-services/images/ico-delete.png %}) to remove any existing aspects from the **Currently Selected** list.

4. Haga clic en **Aplicar las modificaciones**.
   
   Se aplicarán al fichero los aspectos seleccionados. Las propiedades adicionales añadidas al fichero se muestran en la pantalla de vista previa. Puede editar estas propiedades mediante la opción **Editar propiedades** en **Acciones sobre el documento**.

## Administrar permisos de ficheros y carpetas

Puede invalidar los permisos predeterminados del sitio para el contenido que añada a la biblioteca de documentos. Esto le permite controlar lo que ven y hacen con su contenido otros miembros del sitio.

En los sitios, cada usuario tiene asignado un rol: administrador, colaborador, contribuidor o consumidor; cada rol viene con una serie de permisos predeterminados. This controls the actions site members can \[perform in the site]({% link content-services/latest/using/permissions.md %}).

> **Note:** In Content Services 6.2.2 and above changing permissions on a node with no explicit permissions (i.e. all permissions are inherited from a parent) has a time limit for the ACL propagation on children. This is needed for large node-trees where changes cannot be performed synchronously in one transaction due to resource limitations. In these cases the updates to the nodes will be scheduled for asynchronous processing which will be used for all changes that could not be completed within the set time limit. The limit can be configured by changing the `system.fixedACLs.maxTransactionTime` property in the `\tomcat\shared\classes\alfresco-global.properties` file. The processing is handled by the `fixedACLsUpdater` job which can be scheduled to run by changing a CRON expression in the property: `system.fixedACLsUpdater.cronExpression`.

La característica Administrar permisos va más allá de los permisos del sitio: le permite invalidar el rol que un usuario tiene en un sitio y para un elemento de contenido o carpeta específicos. Esto quiere decir que puede conceder o retirar permisos a los miembros del sitio para acceder a contenido específico, independientemente del nivel de permisos que tengan con respecto a otros contenidos de la biblioteca.

Ello resulta muy práctico a la hora de ocultar y restringir contenido solo a un grupo concreto de miembros del sitio.

> **Note:** No olvide proteger su contenido; si permite que otra persona acceda a un fichero o carpeta, dicha persona verá la ruta de navegación completa, incluso si no tiene acceso a la carpeta primaria.

!\[Local permissions privacy]({% link content-services/images/local-permissions-privacy.png %})

> **Note:** No dé permisos a usuarios que no sean miembros del sitio; esto puede causar problemas con la biblioteca de documentos.

1. Mantenga el cursor sobre un fichero o carpeta de la biblioteca, haga clic en **Más** y, a continuación, en **Administrar permisos**.

2. Administre los permisos heredados:
   
   * !\[Inherit Permissions On]({% link content-services/images/ico-enabled-on.png %}) **Inherit Permissions** shows that permissions are being inherited from the parent folder. Haga clic en este botón para ignorar los permisos heredados.
   * !\[Inherit Permissions Off]({% link content-services/images/ico-enabled-off.png %}) **Inherit Permissions** shows that permissions are not being inherited from the parent folder.Click this button to inherit the permissions.

3. Administre los permisos locales:
   
   1. Haga clic en **Añadir un usuario**.
   
   2. Busque el usuario para el que desea definir los permisos.
   
   3. Haga clic en **Buscar** o pulse ENTRAR.
      
      La búsqueda le devuelve una lista de usuarios.
   
   4. Haga clic en **Añadir** para incluir a un usuario en la tabla Permisos establecidos localmente. El usuario recibe el rol de consumidor.
   
   5. Modifique el rol según sea necesario.
   
   6. Repita este paso para añadir a más usuarios y configurar los permisos para el contenido.
      
      > **Note:** Para revocar los permisos de un usuario, haga clic en **Eliminar** en la columna Acciones.

4. Haga clic en **Guardar**.

## Convertirse en propietario de contenidos

Puede tomar posesión de ficheros y carpetas que pertenecen a otros usuarios.

Es algo que tendrá que hacer si el propietario de un fichero o carpeta ya no trabaja en la empresa y usted necesita hacerse responsable de dicho fichero o carpeta.

> **Note:** You need to be a Site Manager or have permission to delete a file or folder to become its owner, see \[User roles and permissions]({% link content-services/latest/using/permissions.md %}).

1. Haga clic en un fichero para abrir la vista previa.
   
   > **Note:** Para tomar posesión de una carpeta, mantenga el puntero sobre ella y seleccione **Ver los detalles**.

2. Haga clic en **Convertirse en propietario** y seleccione **Aceptar**.
   
   Ya tiene plenos derechos de propiedad sobre el fichero o carpeta.

## Changing the content type {#changetype}

Puede cambiar el valor predeterminado del tipo del contenido de un fichero y asignarle uno más específico.

You can only change the content type if your Alfresco administrator has configured content type properties so that you can enhance a file by giving it a type (for example, changing a standard document to a policy document).

1. Haga clic en un fichero para verlo en la pantalla de vista previa.

2. En la lista **Acciones sobre el documento** haga clic en **Cambiar tipo**.
   
   The Change Type dialog box appears.

3. Seleccione el tipo deseado.
   
   > **Note:** The **New Type** list is empty until types are defined by an Alfresco administrator.

4. Haga clic en **Aceptar**.
   
   Cuando se le asigna una propiedad de tipo a un fichero, esta aparece tanto en la pantalla de vista previa como en la pantalla Editar propiedades.

## Replicated content

Content Services administrators can configure Content Services systems so that content is replicated across multiple repositories. Los ficheros y carpetas creados como parte de un trabajo de replicación llevan el icono **Transferido desde otro repositorio** en la lista de ficheros.

Este icono indica que se trata de contenidos replicados, que no son originales. El contenido puede ser de solo lectura, según la configuración de la transferencia.

El contenido marcado con este icono muestra también la acción **Ver en repositorio de origen**. Select this action to display the file preview screen for the related *original* content file or folder.