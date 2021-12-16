---

title: Overview of using Content Services
---

The using sections covers the basics of using Content Services and the Alfresco Share user interface.

> **Note:** If you prefer to use the Alfresco Digital Workspace instead of Alfresco Share, see the \[Digital Workspace documentation\]({% link digital-workspace/latest/index.md %}). The Digital Workspace is a content management application built using the [Alfresco Application Development Framework (ADF)](https://www.alfresco.com/abn/adf/docs/){:target="_blank"}. Digital Workspace offers a simplified experience for working with content and more comprehensive extensibility for developers.

There are also several ways to access and use content without being in Alfresco Share:

* **Microsoft Office**: Puede abrir, editar y guardar ficheros directamente desde las aplicaciones de Microsoft Office, por ejemplo, Word y Excel. This same functionality also lets you open files from Windows Explorer, as well as the option to map a network drive to Content Services.
* **Microsoft Outlook**: With Alfresco Outlook Integration you can save and file your emails to Content Services from within Microsoft Outlook. You can drag and drop emails in and out of Alfresco Share, and add properties automatically when an email is filed. Otras características disponibles son búsqueda, etiquetado, metadatos y flujos de trabajo.
* **Windows Explorer shortcuts**: There are also some shortcuts available that your Alfresco administrator can enable so you can work with files from Windows Explorer or from your desktop.

## Using Content Services from Microsoft Office

Con Alfresco Office Services (AOS) puede acceder a los contenidos directamente desde las aplicaciones de Microsoft Office.

This means that you can browse, open, and save Microsoft Office files (Word, PowerPoint, and Excel ) in Content Services without the need to access Alfresco Share through Chrome, Firefox, or another web browser.

También puede examinar contenidos desde el Explorador de Windows o asignar una unidad de red.

See \[Alfresco Office Services]({% link microsoft-office/latest/index.md %}) for more information.

## Using Content Services from Microsoft Outlook

With Alfresco Outlook Integration you can use email and repository management without leaving Microsoft Outlook.

You can directly archive emails into Alfresco Share, use the full metadata support, full search, tagging and workflow capabilities, and attach files and view archived emails in your inbox.

See \[Alfresco Outlook Integration]({% link microsoft-outlook/latest/index.md %}) for more information.

## Utilizar los accesos directos del Explorador de Windows

You can work with files without actually being in the Alfresco Share interface.

Su administrador puede asignar una unidad al repositorio para permitir el acceso al contenido mediante el Explorador de Windows o un acceso directo desde el escritorio. If you are working in this way, then there will be up to three additional files shown on each level of the Content Services file structure:

* `__CheckInOut.exe`
* `__ShowDetails.exe`
* `__Share.url`

> **Note:** The `Share.url` is only available within site folders, rather than everywhere in the repository.

You can use these files to add content to the repository, check documents in and out, view document details, and open Alfresco Share in a browser window.

> **Note:** Estas opciones solo funcionan en el entorno de Windows.

### Add a file from outside Alfresco Share

You can easily drag and drop content to the repository from outside Share.

> **Note:** This functionality is available in a Windows environment if the Content Services repository has been mapped by your administrator, so that you can access it from Windows Explorer.

1. Seleccione un fichero en el Explorador de Windows o en su escritorio.

2. Arrastre el fichero hasta la ubicación del repositorio donde quiera añadirlo.
   
   El fichero queda añadido a la ubicación seleccionada del repositorio.

### Check out files from outside Alfresco Share

You can use the `CheckInOut.exe` to check content out so that you can work on it securely.

> **Note:** The `CheckInOut.exe` is available in a Windows environment if the Content Services repository has been mapped by your administrator so that you can access it from Windows Explorer.

1. In Windows Explorer, drag a file from the mapped repository onto the `CheckInOut.exe` icon.
   
   > **Note:** There is a copy of the `CheckInOut.exe` at each level of the repository.

2. Haga clic en **Aceptar** cuando aparezca el cuadro de diálogo Ejecutar acción de desbloqueo/bloqueo.

3. Haga clic en **Aceptar** cuando aparezca un mensaje que indica que el fichero ha quedado bloqueado.
   
   Al bloquear un fichero, se crea una copia en el mismo lugar que el fichero original; esta se marca con el texto «(Copia de trabajo)» en el título. Ahora el fichero original está bloqueado: usted puede trabajar con la copia de trabajo y los demás usuarios no pueden editarlo hasta que usted lo desbloquee.

4. When you have finished working on the file and saved your changes, drag the (Working Copy) file onto the `CheckInOut.exe` icon.

5. Haga clic en **Aceptar** cuando aparezca el cuadro de diálogo Ejecutar acción de desbloqueo/bloqueo.
   
   El fichero «(Copia de trabajo)» queda eliminado y las modificaciones efectuadas cuando estaba bloqueado se aplican al fichero original.

### Ver detalles de un elemento desde una unidad asignada

You can use the `ShowDetails.exe` to view item details and properties.

> **Note:** The `ShowDetails.exe` is available in a Windows environment if the Content Services repository has been mapped by your administrator so that you can access it from Windows Explorer.

1. Seleccione un fichero del repositorio en la unidad asignada en el Explorador de Windows o en su escritorio.

2. Drag the file from the mapped repository onto the `ShowDetails.exe`.
   
   > **Note:** There is a copy of the `ShowDetails.exe` at each level of the repository.
   
   A new browser window opens showing the Alfresco Share file preview, where you can see a preview of the file and its properties.

### Open Alfresco Share in a browser window

You can use the `Share.url` to open the Share in a browser window.

The `Share.url` is a shortcut to Share. It's available in a Windows environment if the Content Services repository has been mapped by your administrator so that you can access it from Windows Explorer.

1. En Explorador de Windows, vaya a la ubicación del repositorio que desee abrir.
   
   > **Note:** The `Share.url` is only available within site folders, rather than everywhere in the repository.

2. Double-click the `Share.url`.
   
   > **Note:** There is a copy of the `Share.url` at each level of the repository.
   
   Alfresco Share will open in a browser window, showing the location where you clicked on `Share.url`.