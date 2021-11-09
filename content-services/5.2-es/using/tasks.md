---
title: Tareas y flujos de trabajo
---

Las tareas y los flujos de trabajo le ayudan a llevar cuenta de las actividades que tienen por hacer usted y otros usuarios. Puede crear una tarea o un flujo de trabajo independiente, o puede adjuntarle un fichero.

Un flujo de trabajo es un proceso que controla una tarea específica, como la revisión de un documento. Al crear un flujo de trabajo, cada tarea se puede asignar a una o más personas. Workflow creators can select to automatically send a notification email to users that are assigned a task as part of the workflow, but whether an email is sent or not the task will be visible in the users My Tasks dashlet.

Una vez completadas todas las tareas exigidas por el flujo de trabajo, el estado del flujo de trabajo pasará de activo a completado. Llegados a este punto, podrá borrar el flujo de trabajo si lo desea.

Cada usuario gestiona sus propias tareas, y la persona que ha creado el flujo de trabajo está a cargo de la gestión del mismo.

Puede iniciar flujos de trabajo desde varios lugares:

* Mantenga el puntero sobre un fichero de la biblioteca y haga clic en **Más** y, a continuación, en **Iniciar flujo de trabajo**
* Haga clic en **Tareas** en la barra de herramientas, seleccione cualquier opción y haga clic en **Iniciar flujo de trabajo**
* Click **Start Workflow** on the My Tasks dashlet

## Iniciar un flujo de trabajo

Puede asignar un flujo de trabajo directamente a uno o más ficheros. Al iniciar un flujo de trabajo, se genera una tarea de flujo de trabajo, por ejemplo, una revisión.

1. Mantenga el cursor sobre un fichero, haga clic en **Más** y, a continuación, en **Iniciar flujo de trabajo**.
   
   > **Note:** Puede iniciar un flujo de trabajo para varios ficheros de la biblioteca si los selecciona y elije **Iniciar flujo de trabajo** en el menú **Elementos seleccionados**.
   
   > **Note:** También puede iniciar un flujo de trabajo si hace clic en la opción **Tareas** de la barra de herramientas, selecciona una opción y hace clic en **Iniciar flujo de trabajo**. **Start Workflow** is also available on the My Tasks personal dashlet.
   
   The Start Workflow page opens.

2. Seleccione un flujo de trabajo de la lista **Flujo de trabajo**.
   
   A continuación se muestran los flujos de trabajo preconfigurados que están disponibles:
   
   * **New Task**: Asígnese una tarea nueva o asígnesela a otro usuario.
   * **Review and Approve (group review)**: Organice la revisión y aprobación de contenido, y asigne el flujo de trabajo a un solo grupo.
   * **Review and Approve (one or more reviewers)**: Solicite la aprobación de los ficheros de uno o más usuarios.
   * **Review and Approve (pooled review)**: Organice la revisión y aprobación de contenido y asigne el flujo de trabajo a varios usuarios. Solo un usuario puede tener posesión de la tarea en un momento dado; una vez completada, debe devolverla al grupo para que otro usuario asociado a ella se la pueda adjudicar.
   * **Review and Approve (single reviewer)**: Organice la revisión y aprobación de contenido, y asigne el flujo de trabajo a un solo usuario.
   
   El formulario de flujo de trabajo correspondiente se muestra en la sección en la que escribe los detalles de la tarea de flujo de trabajo que se está iniciando. Los campos requeridos están marcados con un asterisco (*).
   
   > **Note:** Your Alfresco administrator might have set up additional workflows for you to choose from.

3. Introduzca los detalles del flujo de trabajo en la sección General.
   
   1. In the **Message** field describe the task requirements, such as Please review the attached content. This should clearly explain to the user what they are expected to do. This text displays in the My Tasks dashlet for the workflow task.
   2. Introduzca una fecha para la tarea en **Vencimiento**.
   3. En **Prioridad** especifique la prioridad que tiene la tarea.

4. Seleccione el usuario, usuarios o grupo a los que desea asignar la tarea generada por el flujo de trabajo.
   
   Puede asignar la tarea a un usuario o a un grupo de usuarios según el tipo de flujo de trabajo seleccionado.
   
   1. En la sección Usuario asignado, haga clic en **Seleccionar** y escriba una parte o todo el nombre de un usuario.
   2. Haga clic en **Buscar**.
   3. Haga clic en el icono + para elegir un usuario.
      > **Note:** Puede elegir varios usuarios para la tarea **Enviar documentos para revisar**.
   4. Haga clic en **Aceptar**.
   5. Si ha asignado la tarea a más de una persona, complete el campo **Porcentaje de aprobación requerido**. Indique el porcentaje de revisores que tiene que aprobar la tarea para que se pueda marcar como finalizada.

5. Si ha creado la tarea desde una lista de acciones de fichero, la tarea ya está asociada al elemento. Puede añadir otros ficheros.
   
   > **Note:** Puede enlazar una tarea a contenido desde cualquier sitio de la red actual, siempre que tenga permisos de acceso.
   
   1. Haga clic en **Añadir**, seleccione un sitio y navegue a los ficheros que desee añadir.
      
      El botón situado encima de la lista indica su ubicación actual. Haga clic en él para mostrar la ruta completa; haga clic en una entrada para volver a ese punto de la ruta. Haga clic en la flecha arriba para volver al nivel anterior.
   
   2. Haga clic en el icono + **Añadir** para añadir un fichero a la tarea.
   
   3. Cuando haya terminado, haga clic en **Aceptar**.
      
      El fichero o ficheros se añadirán a la tarea. Puede seleccionar las siguientes opciones:
      
      * **Ver más acciones**, a la derecha de un fichero de esta lista, para mostrarlo en la pantalla de vista previa. La tarea se cancelará y deberá empezar de nuevo.
      * **Eliminar** para borrar un fichero de la tarea.
      * **Eliminar todo** para borrar todos los ficheros de la tarea.

6. Puede marcar la casilla de verificación **Enviar notificaciones de correo electrónico** para que, cada vez que se asigne una tarea a un usuario, este reciba un mensaje de correo electrónico de forma automática.
   
   Tasks will still appear in the users My Tasks dashlet. El mensaje se envía a la dirección de correo electrónico que aparece en el perfil del usuario. Si no se ha proporcionado una dirección, no se enviará el mensaje de correo electrónico.
   
   > **Note:** Para tareas agrupadas y de grupo, todos los miembros del grupo seleccionado recibirán la notificación por correo electrónico.

7. Haga clic en **Iniciar flujo de trabajo**.
   
   Se creará la tarea de flujo de trabajo. En la lista de ficheros, un icono a la izquierda de estos indica que son parte de un flujo de trabajo activo.

## Ver flujos de trabajo iniciados por el usuario

Puede ver los detalles completos de todos los flujos de trabajo que ha iniciado.

1. Haga clic en **Tareas** y en **Flujos de trabajo que he iniciado**.
   
   En la página Flujos de trabajo que he iniciado se muestran los flujos de trabajo creados por el usuario. Puede usar los filtros del panel de navegación para ver un grupo específico de flujos de trabajo.

2. Mantenga el cursor sobre el flujo de trabajo que desee ver y haga clic en **Ver historial**.
   
   > **Note:** Si lo prefiere, también puede hacer clic en el título del flujo de trabajo.
   
   En la página Detalles se muestra toda la información relacionada con el flujo de trabajo.
   
   * En la parte superior de la página, haga clic en **Ver las tareas actuales** para saltar a la sección Tareas actuales, donde se muestran las tareas generadas por el flujo de trabajo seleccionado. From here you can view ![view task]({% link content-services/images/ico-view-task.png %}) or edit ![configure]({% link content-services/images/ico-configure.png %}) a task.
   * Haga clic en el enlace de la sección Tarea completada más recientemente para ver los detalles de la última tarea completada dentro de este flujo de trabajo. Esta tarea aparece también en la sección Histórico.
   * Puede ver las tareas completadas en la sección Histórico. Haga clic en una tarea para ver sus detalles.
   * Haga clic en un elemento de la lista Elementos para verlo en la pantalla de vista previa. Haga clic en el botón Atrás de su navegador para volver a la página Detalles del flujo de trabajo.
   * Si inició el flujo de trabajo, puede hacer clic en **Cancelar flujo de trabajo** para anular un flujo de trabajo activo o en **Eliminar flujo de trabajo** para borrar un flujo de trabajo completado.

3. Haga clic en **Flujos de trabajo que he iniciado** para volver a la lista de flujos de trabajo.

## Cancelar un flujo de trabajo activo

Puede cancelar un flujo de trabajo activo si ya no lo necesita. Al cancelarlo, eliminará todas las tareas relativas al flujo de trabajo.

1. En la página Flujos de trabajo que he iniciado, asegúrese de haber seleccionado la vista de flujos activos en el panel de exploración.

2. Sitúe el cursor sobre el flujo de trabajo que desea cancelar y haga clic en **Cancelar flujo de trabajo**.
   
   Aparecerá un mensaje donde se le pide que confirme la acción.

3. Haga clic en **Sí**.
   
   Se cancela el flujo seleccionado y se elimina de la lista de flujos de trabajo. Se eliminan todas las tareas relativas al flujo de trabajo, lo que las borra de la vista de tareas activas de la página Mis Tareas. They are also removed from the My Tasks dashlet.

## Eliminar un flujo de trabajo completado

Una vez haya terminado con un flujo de trabajo, puede eliminarlo para borrarlo de la lista de flujos de trabajo. Se eliminarán también todas las tareas asociadas con el flujo de trabajo.

1. En la página Flujos de trabajo que he iniciado, seleccione la vista de flujos completados en el panel de exploración.

2. Sitúe el cursor sobre un flujo de trabajo y haga clic en **Eliminar flujo de trabajo**.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

3. Haga clic en **Sí**.
   
   Se elimina el flujo seleccionado y se borra de la lista de flujos de trabajos. Se eliminan todas las tareas relativas al flujo de trabajo, lo que las borra de la vista de tareas completadas de la página Mis Tareas. They are also removed from the My Tasks dashlet.

## Ver tareas y flujos de trabajo

Puede ver los detalles de una tarea individual o del flujo de trabajo que la inició.

1. Haga clic en **Tareas** y en **Flujos de trabajo que he iniciado**.
   
   > **Note:** You can also view and edit tasks from the My Tasks dashlet.

2. En la página Mis Tareas, mantenga el cursor sobre una tarea y haga clic en una acción:
   
   * **Ver tarea**: muestra los detalles de la tarea.
   * **Ver flujo de trabajo**: muestra los detalles del flujo de trabajo.
   
   > **Note:** An icon (![pooled]({% link content-services/images/im-pooled.png %})) indicates a pooled task. Las tareas agrupadas que se pueden solicitar aparecen marcadas como **Sin asignar**.

3. Haga clic en las opciones **Detalles de la tarea** y **Detalles de flujo de trabajo** para moverse entre las dos vistas de página.
   
   En la página Detalles de la tarea se muestra toda la información con relación a ella.
   
   * En la lista Elementos, haga clic en un elemento para previsualizarlo en la biblioteca. Haga clic en el botón Atrás de su navegador para volver a la página Detalles de la tarea.
   * Haga clic en **Editar** para editar la tarea.
   
   En la página Detalles de flujo de trabajo se muestra la información del flujo de trabajo que generó esta tarea.
   
   * Haga clic en **Ver diagrama de proceso** para obtener una representación gráfica del flujo de trabajo. Un borde rojo resalta el estado actual del flujo de trabajo. Haga clic en cualquier parte del gráfico para cerrarlo.
   * En la parte superior de la página, haga clic en **Ver las tareas actuales** para saltar a la sección Tareas actuales, donde se muestran las tareas generadas por el flujo de trabajo seleccionado. From here you can view ![view task]({% link content-services/images/ico-view-task.png %}) or edit ![configure]({% link content-services/images/ico-configure.png %}) a task.
   * Haga clic en el enlace de la sección Tarea completada más recientemente para ver los detalles de la última tarea completada dentro de este flujo de trabajo. Esta tarea aparece también en la sección Histórico.
   * Puede ver las tareas completadas en la sección Histórico. Haga clic en una tarea para ver los detalles correspondientes.
   * Haga clic en un elemento de la lista Elementos para verlo en la pantalla de vista previa. Haga clic en el botón Atrás de su navegador para volver a la página Detalles del flujo de trabajo.
   * Si inició el flujo de trabajo personalmente, puede hacer clic en **Cancelar flujo de trabajo** para anular un flujo de trabajo activo.

## Gestionar tareas

Tasks assigned to you appear in two places: the My Tasks personal dashlet and the My Tasks page. Todas las tareas permanecen asignadas hasta que se completan o se asignan a otra persona.

1. Haga clic en **Tareas** y, después, en **Mis Tareas**.

2. Mantenga el cursor sobre una tarea y haga clic en **Editar tarea**.
   
   La página Editar tarea se abre con los detalles de la tarea seleccionada. Las acciones disponibles en esta página dependen del tipo de tarea.
   
   > **Note:** You can also access this page from the My Tasks dashlet: click the **Edit Task** icon.

3. Puede gestionar la tarea seleccionada de una o varias de las siguientes formas:
   
   * **Actualizar**: si la tarea está en curso, pero aún no la ha terminado, puede cambiar el estado de la tarea y añadir un comentario para indicar su progreso. No olvide hacer clic en **Guardar y cerrar**. La tarea permanece asignada a su nombre.
   * **Reasignar**: haga clic en **Reasignar** y use el campo de búsqueda disponible para buscar un usuario. Haga clic en **Seleccionar** a la derecha del nombre de un usuario para reasignar la tarea a dicho usuario.
   * **Aprobar o rechazar**: una vez que haya completado una tarea, puede actualizar su estado, añadir un comentario acerca del trabajo realizado y hacer clic en **Aprobar** o **Rechazar**. La tarea vuelve al usuario que inició el flujo de trabajo y desaparece de su lista de tareas.
   * **Pedir**: haga clic en **Pedir** para hacerse cargo de una tarea agrupada. Esta acción solo está disponible para las tareas agrupadas que todavía no se han asignado.
   * **Liberada para el grupo**: haga clic en **Liberada para el grupo** si desea devolver una tarea al grupo. La tarea aparecerá en la lista con el estado Sin asignar para que otro usuario la pueda solicitar. Esta acción solo está disponible para tareas agrupadas que están asignadas a su nombre en ese momento.
   * **Añadir**: haga clic en **Añadir** debajo de la lista de ficheros para localizar y seleccionar los ficheros que desea añadir a la tarea. Esta acción solo está disponible para tareas especiales.
   * **Tarea hecha**: una vez completada una tarea, esta vuelve al usuario que inició el flujo de trabajo asociado. Haga clic en **Tarea hecha** para completar la tarea. Esta desaparecerá de su lista de tareas.
   
   Cuando finalice la acción seleccionada, se le redirigirá a la pantalla adecuada.