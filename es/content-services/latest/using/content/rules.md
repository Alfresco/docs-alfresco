---
title: Folder rules
menutitle: ES Folder rules
---

En la biblioteca, puede definir reglas de carpetas para gestionar sus contenidos automáticamente. Puede poner en práctica distintas y originales soluciones para garantizar que ciertos procesos aplicables a los contenidos se realicen de forma automática, sin necesidad de intervención.

Las reglas determinan la forma en que se gestionan los contenidos que se introducen, se retiraran o se guardan en una carpeta.

Una regla de contenidos consta de tres partes:

* El evento que desencadena la regla
* Las condiciones que deben cumplir los contenidos
* La acción que ha de llevarse a cabo con los contenidos

Los eventos que pueden desencadenar una regla son:

* Se coloca un elemento de contenido en una carpeta
* Se retira un elemento de contenido de una carpeta (se mueve o se elimina)
* Se modifica un elemento de contenido de una carpeta

He aquí varios ejemplos de cómo se pueden utilizar las reglas de contenidos para automatizar tareas repetitivas:

* All files placed in the *Drafts* folder are versioned
* All files placed in the *Drafts* folder become part of a simple workflow
* All files placed in the *Completed* folder that have the tag *final* will be moved to the folder *Archived*
* All GIF files placed in the *Images* folder will be transformed to PNG files
* All presentation documents placed in the *Published* folder will be transformed to Flash and copied to the *Assets* folder

## Definir reglas para una carpeta

Utilice las reglas de carpetas para gestionar sus ficheros de forma automática. Existen dos métodos de definir reglas: crear sus propias reglas o crear un enlace a las reglas que ya se han creado para una carpeta distinta.

Cuando define una regla, solo se aplica a los nuevos contenidos añadidos a la carpeta. Los ficheros que ya estaban en la carpeta antes de definir la regla no se ven afectados. Puede aplicar manualmente las reglas de la carpeta con la acción **Ejecutar reglas**.

> **Note:** Aunque la carpeta no tenga sus propias reglas, es posible que haya heredado las reglas de una carpeta primaria. De ser así, se le notificará mediante un mensaje que aparecerá en la página Reglas.

### Creating a rule {#createrule}

Puede crear reglas para una carpeta del mismo modo que las aplica a sus mensajes de correo electrónico.

> **Note:** If a folder already has rules applied to it (indicated by the ![rules\]({% link content-services/images/rules-icon.png %}) icon) you can add new rules to it by [adding a set of rules](#addtosetofrules).

1. Mantenga el cursor sobre una carpeta a la que no se le hayan aplicado reglas, haga clic en **Más** y, después, en **Gestionar reglas**.

2. Haga clic en **Crear reglas**.

3. Escriba un nombre y una descripción (opcional) para la regla.

4. Seleccione cuándo se aplicará la regla:
   
   * **Se crean o entran elementos en esta carpeta**: esta regla se aplicará al contenido que se añada a la carpeta; incluye todos los elementos que se copien, creen o carguen en la carpeta.
   * **Se actualizan elementos**: la regla se aplicará cuando se modifique un elemento de esta carpeta.
   * **Se eliminan o salen elementos de esta carpeta**: esta regla se aplicará al contenido que se elimine o se saque de la carpeta.
   
   > **Note:** Una regla puede tener más de un evento, condición y acción. Haga clic en + o - para añadir o eliminar filas.

5. Seleccione si la regla se aplicará **Si se cumplen todos los criterios** o **A menos que se cumplan todos los criterios**, o en ambos casos.
   
   A continuación tiene tres ejemplos de condiciones que podría usar para aplicar una regla:
   
   * La regla se aplica si el título del elemento contiene la palabra «urgente» (**Si se cumplen todos los criterios**)
   * La regla se aplica si el título del elemento no contiene la palabra «urgente» (**A menos que se cumplan todos los criterios**)
   * La regla se aplica si el título del elemento contiene la palabra «urgente», a menos que el elemento se creara antes de una fecha concreta (**Si se cumplen todos los criterios** y **A menos que se cumplan todos los criterios**)

6. Seleccione los criterios relativos al contenido al que se aplicará la regla y recuerde que puede usar los iconos + y - para añadir y eliminar criterios adicionales.
   
   > **Note:** Si selecciona **Mostrar más** en el menú de criterios, verá otras propiedades entre las que elegir. Use the folders on the Select property page to search properties, then select a property on the right of the page. Al seleccionar **Mostrar en el menú**, se muestra la propiedad en todas las listas de condiciones para la regla actual.

7. Seleccione la [acción de regla](#ruleactions) que desea que se ejecute cuando se cumplan las condiciones.
   
   Una vez que haya seleccionado una acción, debe elegir otras opciones; por ejemplo, si selecciona copiar o mover elementos, haga clic en **Seleccionar** para especificar dónde desea que se copie o se mueva el contenido.
   
   > **Note:** La opción **Copiar** solo copia elementos de la carpeta, no el contenido de las subcarpetas. Seleccione la opción adicional **Copia profunda** si desea que se copien también las subcarpetas y su contenido. The ![missing info]({% link content-services/images/im-missinginfo.png %}) icon indicates where any required information is missing from your condition or action.

8. Seleccione las opciones adicionales:
   
   * **Deshabilitar regla**: la regla se desactiva.
   * **Regla que se aplica a las subcarpetas**: la regla se aplica a la carpeta y a todas sus subcarpetas.
   * **Ejecutar regla en segundo plano**: le permite seguir trabajando mientras la regla se está ejecutando. También puede seleccionar una acción que se ejecutará si se produjera un error al aplicar la regla. These actions are set up by your Alfresco administrator.

9. Haga clic en **Crear** o en **Crear y crear otra** para guardar esta regla y empezar a crear una nueva.

### Rule actions {#ruleactions}

When you're setting up a rule in Alfresco Share there are lots of default actions available.

Estas acciones se llevarán a cabo en los ficheros que cumplan los criterios del evento y las condiciones especificadas.

Las acciones no se aplican a los ficheros de las subcarpetas, a menos que se marque la opción **Regla que se aplica a las subcarpetas** antes de crear una regla.

> **Note:** Additional rule actions are available with modules such as Alfresco Records Management, or if they've been set up by your Alfresco administrator.

| Acción| Efecto de la acción
|----------|----------
| **Ejecutar script**| Runs a custom JavaScript script from the Data Dictionary/Scripts folder. There are a number of sample scripts available. The list can vary depending on how Content Services is configured for your organization.
| **Copiar**| Crea copias de ficheros en la ubicación que elija. Seleccione la opción adicional **Copia profunda** si desea que se copien también las subcarpetas y su contenido.
| **Mover**| Mueve los ficheros y subcarpetas a la ubicación que elija.
| **Desbloquear**| Se desbloquearán los ficheros que estén bloqueados en ese momento. Por ejemplo, se desbloquearán antes de poder moverlos a otra carpeta. Seleccione **Opciones** para indicar si se desbloquearán como versión menor o mayor.
| **Bloquear**| Bloquea los ficheros de manera automática con una copia de trabajo creada en la ubicación que elija.
| **Enlace a categoría**| Enlaza ficheros o carpetas a la categoría que elija, como por ejemplo una región o una clasificación. See \[Tagging and categorizing content]({% link content-services/latest/using/content/manage.md %}#tagcategorizecontent) for more information.
| **Añadir aspecto**| Adds a property aspect to files, to give it additional behaviors or properties. See \[About Aspects]({% link content-services/latest/config/repository.md %}#about-aspects) for more information.
| **Quitar aspecto**| Elimina un aspecto de propiedad de los ficheros para retirarles funciones o propiedades. See \[About Aspects]({% link content-services/latest/config/repository.md %}#about-aspects) for more information.
| **Añadir Flujo de trabajo sencillo**| Añade ficheros a un flujo de trabajo. De forma predeterminada, hay una tarea de aprobación. También puede hacer clic para añadir o rechazar una tarea. Puede hacer clic en **Aprobar** y **Rechazar** para cambiar el nombre de los pasos y para seleccionar una ubicación a la que copiar y mover los ficheros aprobados y rechazados. See [Tasks and workflows](#createsimpleworkflow) for more information.
| **Enviar email**| Puede elegir que se envíen notificaciones por correo electrónico cuando se añaden ficheros o subcarpetas. Haga clic en **Mensaje** para seleccionar los destinatarios y añadir su mensaje.
| **Transformar y copiar contenidos**| Añade copias de ficheros a otra ubicación en el formato que se especifique. Por ejemplo, puede generar una copia de un documento de Word en formato PDF en una carpeta distinta.
| **Transformar y copiar imagen**| Añade copias de ficheros de imágenes a otra ubicación en el formato que se especifique. Por ejemplo, puede generar una copia de un fichero GIF en formato PNG en una carpeta distinta.
| **Extraer campos de metadatos comunes**| Los metadatos incrustados se extraen de los ficheros y se añaden a las propiedades de estos. Esta opción es compatible con las propiedades de los documentos de Microsoft Office, LibreOffice y varios formatos más.
| **Importar**| Los ficheros ZIP y ACP se desempaquetan de manera automática. Seleccione la ubicación donde desea guardar los ficheros desempaquetados.
| **Especializar tipo**| Cuando corresponda, cambia el tipo de contenido de un fichero. Por ejemplo, convierte un fichero estándar en un documento de póliza y añade los metadatos adecuados para ese tipo de contenido. See \[Changing the content type]({% link content-services/latest/using/content/files-folders.md %}#changetype) for more information.
| **Incrementar el contador**| Incrementa de manera automática el valor de una propiedad de número (entero). This will generally only be used by Alfresco administrators.
| **Establecer el valor de la propiedad**| Selecciona una propiedad y establece un valor predeterminado. En los ficheros con esa propiedad, se cambiará el valor de la misma al especificado.
| **Incruste las propiedades como metadatos en el contenido**| Incrusta las propiedades de fichero como metadatos directamente en el fichero binario. La información de esos ficheros puede ayudar con búsquedas y flujos de trabajo.
| **Start Process**| You can use this action to create a folder rule in Share that triggers an Alfresco Process Services process. See \[Configuring the APS Action\]({% link content-services/latest/config/action.md %}) and [Start Process action details](#startprocessactiondetails) for more information.

### Crear un enlace a un conjunto de reglas ya existente

La opción **Enlace a un conjunto de reglas** le permite reutilizar un conjunto de reglas que ya se ha definido para una carpeta distinta.

> **Note:** If a folder already has linked rules applied (rules are indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) you can link to new rules by [linking to a different rule set](#linktodifferentruleset).

1. Mantenga el cursor sobre una carpeta a la que no se le hayan aplicado reglas, haga clic en **Más** y, después, en **Gestionar reglas**.

2. Haga clic en **Enlace a un conjunto de reglas**.

3. Busque la carpeta que desea utilizar.
   
   Seleccione el sitio y, a continuación, una carpeta. Verifique las reglas que aparecen en la lista para cerciorarse de que las vincula a la carpeta .
   
   > **Note:** Las ubicaciones para las que no tiene permiso estarán desactivadas.

4. Haga clic en **Enlazar**.
   
   > **Note:** Puede hacer clic en **Ver el conjunto de reglas** para ver los detalles de las reglas o **Modificar** para seleccionar una regla distinta a la que crear un enlace.

5. Haga clic en **Hecho**.

### Creating a simple workflow {#createsimpleworkflow}

Puede configurar reglas para ejecutar un flujo de trabajo sencillo que conste de pasos de revisión y de aprobación. De este modo, cuando se coloque un elemento en una carpeta a la que se le haya aplicado una regla, se dispondrá de acciones adicionales para dicho elemento.

Las reglas que configure dictarán las acciones del usuario y el flujo del contenido entre las distintas carpetas. Si desea crear un flujo de trabajo más complejo, puede crear reglas para otras carpetas y mover el contenido entre varias ubicaciones.

Por ejemplo, puede configurar las reglas correspondientes para crear un flujo de trabajo sencillo que gestione el contenido de la siguiente forma:

* Users can approve content added to the **Drafts** folder.
* On approval, the content is moved to a **Pending Approval** folder.
* Los jefes de equipo pueden aprobar el contenido de esta carpeta.
* On approval, the content is moved to the **Published** folder. If the content is rejected it's moved back to **Drafts**.

> **Note:** Al crear una regla para una carpeta, la regla se aplica a todos los elementos de contenido que se añadan a dicha carpeta después de crear la regla. Los elementos de contenido que estaban en la carpeta antes de la creación de la regla no se ven afectados por ella. No obstante, puede usar la acción **Ejecutar reglas** para garantizar que las nuevas reglas se apliquen al contenido existente.

1. Mantenga el cursor sobre una carpeta a la que no se le hayan aplicado reglas, haga clic en **Más** y, después, en **Gestionar reglas**.

2. Haga clic en **Crear reglas**.

3. Escriba un nombre y una descripción (opcional) para la regla.

4. Seleccione cuándo se aplicará la regla:
   
   * **Se crean o entran elementos en esta carpeta**: esta regla se aplicará al contenido que se añada a la carpeta; incluye todos los elementos que se copien, creen o carguen en la carpeta.
   * **Se actualizan elementos**: la regla se aplicará cuando se modifique un elemento de esta carpeta.
   * **Se eliminan o salen elementos de esta carpeta**: esta regla se aplicará al contenido que se elimine o se saque de la carpeta.
   
   > **Note:** Una regla puede tener más de un evento, condición y acción. Haga clic en + o - para añadir o eliminar filas.

5. Seleccione si la regla se aplicará **Si se cumplen todos los criterios** o **A menos que se cumplan todos los criterios**, o en ambos casos.
   
   A continuación tiene tres ejemplos de condiciones que podría usar para aplicar una regla:
   
   * La regla se aplica si el título del elemento contiene la palabra «urgente» (**Si se cumplen todos los criterios**)
   * La regla se aplica si el título del elemento no contiene la palabra «urgente» (**A menos que se cumplan todos los criterios**)
   * La regla se aplica si el título del elemento contiene la palabra «urgente», a menos que el elemento se creara antes de una fecha concreta (**Si se cumplen todos los criterios** y **A menos que se cumplan todos los criterios**)

6. Seleccione los criterios relativos al contenido al que se aplicará la regla y recuerde que puede usar los iconos + y - para añadir y eliminar criterios adicionales.
   
   > **Note:** Si selecciona **Mostrar más** en el menú de criterios, verá otras propiedades entre las que elegir. Use the folders on the Select property page to search properties, then select a property on the right of the page. Al seleccionar **Mostrar en el menú**, se muestra la propiedad en todas las listas de condiciones para la regla actual.

7. Seleccione la acción **Añadir Flujo de trabajo sencillo**.

8. Si desea incluir un paso de aprobación en el flujo de trabajo, haga clic en **Aprobar** e indique los detalles necesarios.
   
   1. Introduzca una etiqueta de acción.
      
      Esta se mostrará como opción adicional disponible para el contenido pertinente. Si no cambia la etiqueta, la opción **Aprobar** aparecerá como disponible para los elementos pertinentes de la carpeta.
   
   2. Seleccione las opciones **Copiar** o **Mover**, y haga clic en **Seleccionar** para indicar dónde se copiará o adónde se moverá el contenido aprobado.
   
   3. Haga clic en **Aceptar**.

9. Para incluir un paso de rechazo en el flujo de trabajo, seleccione la casilla de verificación y marque **Rechazar**. A continuación, indique los detalles necesarios.
   
   1. Introduzca una etiqueta de acción.
      
      Esta se mostrará como opción adicional disponible para el contenido pertinente. Si no cambia la etiqueta, la opción **Rechazar** aparecerá como disponible para los elementos pertinentes de la carpeta.
   
   2. Seleccione las opciones **Copiar** o **Mover**, y haga clic en **Seleccionar** para indicar dónde se copiará o adónde se moverá el contenido rechazado.
   
   3. Haga clic en **Aceptar**.

10. Seleccione las opciones adicionales:
    
    * **Deshabilitar regla**: la regla se desactiva.
    * **Regla que se aplica a las subcarpetas**: la regla se aplica a la carpeta y a todas sus subcarpetas.
    * **Ejecutar regla en segundo plano**: le permite seguir trabajando mientras la regla se está ejecutando. También puede seleccionar una acción que se ejecutará si se produjera un error al aplicar la regla. These actions are set up by your Alfresco administrator.

11. Haga clic en **Crear** o en **Crear y crear otra** para guardar esta regla y empezar a crear una nueva.

In the **Document Library** the symbol ![simple workflow]({% link content-services/images/im-rules-simpleworkflow.png %}) to the left of an item indicates that a simple workflow has been applied to it. Las acciones de aprobar y rechazar (con sus etiquetas definidas) aparecen en la lista de acciones para estos elementos.

### Start Process action details {#startprocessactiondetails}

The Start Process action allows you to create a folder rule in Alfresco Share that triggers an Alfresco Process Services process. To access the Perform Action section of the rule definition, select **Start Process** and then click the **Options** button.

![Start Process Options fields]({% link content-services/images/aps-action.png %})

* **Process definition**: Select the process model from Process Services that you want to use from the drop down list. The drop down list will include the Process Services review processes and any other custom ones that have been created in the Process Services apps that you have access to.
* **Process name**: Enter a custom name you want to give for the process instance when the rule triggers.
* **Additional form fields**: The drop down list displays the mandatory fields contained in the Start form that is attached to the process. You can select Additional form fields and define values for them.
* **Value**: Enter the desired values for the additional form fields that you selected. Values must be provided for any mandatory fields in the Start Form of the selected process. Values for other fields in the Start form are optional.

Important notes on the usage of the Start Process action:

* To create a rule using the Start Process action in Content Services you must also be a user in Process Services.
* To perform content actions in a folder that has a Process Services action rule defined, a user must be a Content Services and Process Services user.
* The Start Process action is designed to work with "Create" events only. It cannot be used for "Update" events.
* When creating a rule for Start Process action, the criteria for “Content of type or sub-type” must be set to “Content”.
* Assignees assigned to an action must be Process Services users.
* When designing Process Services processes to be triggered from Content Services, the process definition should have a Start form that contains an Attach File field named 'content'.
* Process Services processes which are triggered from a Process Services action, and their related Tasks, can only be managed through Process Services related interfaces and not through Alfresco Share.

## Trabajar con un conjunto de reglas

Puede ver y mantener fácilmente las reglas individuales que integran un conjunto de reglas. Puede añadir, editar y eliminar reglas, así como desactivar una regla y cambiar el orden de ejecución. También puede ejecutar las reglas manualmente.

Puede crear un gran número de reglas para contar con un conjunto de reglas exhaustivo y, después, aplicar distintas reglas a las carpetas.

Al seleccionar la acción **Gestionar reglas** para una carpeta con reglas definidas, la página Reglas quedará dividida en dos.

En el lado izquierdo de la página se muestra una lista de las reglas que integran el conjunto de reglas. Si la carpeta hereda alguna regla de una carpeta primaria, dichas reglas aparecerán aquí también. Las reglas se ejecutan en el orden en que aparecen en la lista. Las reglas heredadas siempre se ejecutan primero.

La marca de verificación a la izquierda de una regla quiere decir que está activa.

Al seleccionar una regla concreta en esta lista, aparecen sus detalles en el lado derecho de la página.

See \[Troubleshooting rules and actions]({% link content-services/latest/admin/troubleshoot.md %}#troubleshoot-rules-and-actions) for information about resolving problems with rules.

### Adding to a set of rules {#addtosetofrules}

Un conjunto de reglas puede incluir tantas reglas individuales como se desee; además, es posible añadir nuevas reglas a una carpeta según sea necesario.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Haga clic en **Nueva regla**.
   
   On the New Rule page you can add a new rule to a set of rules in exactly the same way as the first time you created a rule, see [creating a rule](#createrule).

Cuando haya creado la última regla, vuelva a la página Reglas. Las reglas nuevas que se han creado se añaden al final del conjunto de reglas.

### Editar una regla

Es posible que necesite revisar sus reglas de vez en cuando y efectuar cambios para mantenerlas al día. Si ya no desea utilizar una regla específica, pero es posible que vuelva a utilizarla en el futuro, puede desactivarla.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. En el lado izquierdo de la página, haga clic en la regla que desee editar.
   
   > **Note:** La regla aparecerá en el resumen de reglas del lado derecho de la página. En esta ubicación no es posible editar reglas enlazadas ni heredadas; ello solo es posible en la carpeta en la que se crearon.

3. Haga clic en **Editar**.

4. Efectúe los cambios que desee. Puede editar cualquiera de los detalles de la regla: nombre, descripción, definición de la regla y opciones.

5. Haga clic en **Guardar**.

### Eliminar una regla

Cuando una carpeta tiene aplicada una regla que ya no es necesaria, puede eliminar dicha regla.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. En el lado izquierdo de la página, haga clic en la regla que desee eliminar.
   
   Si es posible que pueda querer volver a utilizar la regla más adelante, quizás prefiera desactivarla; para ello, edite la regla.
   
   > **Note:** En esta ubicación no es posible eliminar reglas enlazadas ni heredadas; ello solo es posible en la carpeta en la que se crearon.

3. Haga clic en **Eliminar**.

4. Cuando se le pida que confirme la eliminación, haga clic en **Eliminar**.

### Reordenar las reglas del conjunto de reglas

Como parte del proceso de gestión de un conjunto de reglas, puede elegir su orden de ejecución. Si una carpeta tiene reglas heredadas, se aplicarán siempre primero en el orden en que aparecen en la lista. Las reglas que estén marcadas como inactivas se omiten.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. En el lado izquierdo de la página, arrastre las reglas a la posición que desea que ocupen en la lista y suéltelas.
   
   > **Note:** En esta ubicación no es posible reordenar reglas enlazadas ni heredadas; ello solo es posible en la carpeta en la que se crearon. Haga clic en **Restablecer** para devolver el conjunto de reglas al último orden guardado.

3. Haga clic en **Guardar**.

### Desactivar reglas heredadas

Si una carpeta hereda reglas de una carpeta primaria, estas se pueden activar y desactivar fácilmente según sea necesario.

Activar y desactivar reglas heredadas es una función aplicable a nivel de carpeta individual y no afectará a las demás carpetas.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and then **Manage Rules**.
   
   Si un fichero tiene reglas heredadas, se mostrarán en el lado izquierdo de la página.

2. Haga clic en **Heredar reglas**.
   
   Las reglas heredadas se desactivarán para esa carpeta y aparecerá la opción **No heredar reglas**. Puede hacer clic en **No heredar reglas** para volver a activar las reglas para esa carpeta.

### Ejecutar reglas manualmente

Cuando se crea o se edita un conjunto de reglas, las reglas no se aplican automáticamente a los elementos que ya están presentes en la carpeta. Puede ejecutar las reglas manualmente en cualquier momento para aplicarlas a todo el contenido. Solo se verán afectados los elementos que cumplan las condiciones especificadas.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Haga clic en **Ejecutar reglas**.

3. Elija cómo desea ejecutar las reglas:
   
   * **Ejecutar reglas para esta carpeta**
   * **Ejecutar reglas para esta carpeta y sus subcarpetas**
   
   Cuando se hayan ejecutado las reglas, se mostrará un mensaje.

## Trabajar con reglas enlazadas

Cuando una carpeta tiene reglas enlazadas, se dispone de menos opciones de edición que cuando tiene su propio conjunto de reglas. Si lo prefiere, puede enlazarla con un conjunto de reglas distinto o romper el vínculo completamente.

Cuando selecciona la acción **Gestionar reglas** para una carpeta con reglas enlazadas, en la página Reglas se muestra el nombre y la ruta de la carpeta a cuyo conjunto de reglas se hace referencia.

> **Note:** También es posible que la carpeta herede reglas de una carpeta primaria. De ser así, se le notificará mediante un mensaje.

Los cambios que deseen hacerse en el conjunto de reglas deben llevarse a cabo en la carpeta en la que se definieron las reglas en un principio. Es fácil llegar a la página Reglas correspondiente a la carpeta de origen: basta con hacer clic en **Ver el conjunto de reglas**.

### Linking to a different rule set {#linktodifferentruleset}

Si desea cambiar las reglas a las que está vinculada una carpeta, puede crear un enlace a un conjunto de reglas distinto.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Haga clic en **Modificar**.
   
   > **Note:** Esta opción solo se muestra si la carpeta tiene reglas enlazadas.

3. Seleccione el sitio y, a continuación, una carpeta.
   
   Solo podrá seleccionar ubicaciones para las que tiene permiso de acceso.

4. Haga clic en **Enlazar**.
   
   Esta operación rompe el enlace con el conjunto de reglas original y vincula la carpeta con el nuevo conjunto de reglas.

5. Haga clic en **Hecho**.

### Desvincular un conjunto de reglas

Si ya no necesita las reglas, puede desvincularlas con tan solo hacer clic. Esta operación dejará la carpeta exenta de reglas.

1. Hover over a folder with rules applied (indicated by the ![rules]({% link content-services/images/rules-icon.png %}) icon) and click **More** then **Manage Rules**.

2. Haga clic en **Desvincular**.
   
   > **Note:** Esta opción solo se muestra si la carpeta tiene reglas enlazadas.
   
   Se ha roto el enlace entre la carpeta actual y las reglas.