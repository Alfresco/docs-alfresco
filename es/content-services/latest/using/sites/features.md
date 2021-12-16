---
title: Características del sitio
menutitle: Características del sitio
---

Además de la biblioteca de documentos y el área de miembros del sitio, existen muchas otras características que pueden incluirse en un sitio.

Site managers can easily add and remove features by \[customizing a site]({% link content-services/latest/using/sites/index.md %}#customizesite)

## Calendario

El calendario del sitio permite programar y hacer un seguimiento de eventos relacionados con el sitio.

Los miembros del sitio pueden crear eventos que se mostrarán en el calendario para que puedan verlos todos los usuarios del sitio. These events also display in the Site Calendar dashlet. El calendario puede verse por días, semanas o meses. La vista Agenda muestra los eventos próximos.

### Acceder al calendario

Abra el calendario para ver los próximos eventos del sitio actual.

En el calendario puede crear eventos, así como editar y eliminar los eventos que haya creado anteriormente.

En el sitio, haga clic en **Más** y, después, en **Calendario**.

> **Note:** Los nombres de las características se pueden personalizar en cada sitio. Si el administrador del sitio las ha personalizado, es posible que el enlace no se llame **Calendario**.

    This opens the calendar which defaults to the Month view. Any events scheduled in the current month are displayed on the calendar.

### Examinar el calendario

De forma predeterminada, la vista principal muestra el mes actual en el calendario. En el panel de exploración de la izquierda hay otro calendario para navegar por los meses sin modificar la vista principal.

1. En el calendario use los botones de navegación para cambiar la vista principal
   
   a. Use the **Day**, **Week**, and **Month** buttons to change the main display to a daily, weekly, or monthly view.
   
   b. Use the Previous ![Previous]({% link content-services/images/ico-cal-left.png %}) and Next ![Next]({% link content-services/images/ico-cal-right.png %}) buttons to move forward and backward through the calendar, either a day, week, or month at a time, depending on the current view.
   
   c. Click **Agenda** to view a list of the upcoming events scheduled for this site.
   
   d. Click **Today** to display the current date.
   
        By default the Day and Week views display only the working hours. Click the ![Show working hours]({% link content-services/images/ico-cal-showall.png %}) Show all hours icon to display the full day.

2. Use el calendario del panel de navegación para desplazarse por los meses sin modificar la vista principal.
   
   a. Click ![Previous]({% link content-services/images/ico-cal-arrowleft.png %}) to display the previous month.
   
   b. Click ![Next]({% link content-services/images/ico-cal-arrowright.png %}) to display the next month.
   
   c. Click **This Month** beneath the calendar to reset it to the current month. La fecha actual y los días con eventos programados aparecen resaltados.

3. Haga clic para seleccionar una fecha en el calendario del panel de navegación y cargarla en el calendario de la vista principal.

4. Haga clic en la lista **Etiquetas** para mostrar solo los eventos asociados a esa etiqueta.
   
   Haga clic en **Mostrar todo** para ver todos los eventos.

5. Haga clic en un evento del calendario para ver todos los detalles de dicho evento.

6. Haga clic en **iCal** en el encabezado para usar la función de intercambio de datos del calendario.

### Ver un evento

El calendario muestra solamente el nombre y la hora del evento, por lo que es necesario abrir el evento para ver todos los detalles correspondientes. Una vez abierto, puede editarlo y eliminarlo.

1. En el calendario, busque el evento que desea ver de una de estas formas:
   
   * Navegue por el calendario en la vista principal.
   * Navegue por el calendario en el panel del explorador y seleccione una fecha para actualizar el calendario de la vista principal.
   * Haga clic en **Agenda** para mostrar los eventos próximos.

2. En la vista principal, haga clic en el evento que le interesa. Puede hacerlo en cualquier vista: Día, Semana, Mes o Agenda.
   
   The Event Information dialog box displays the full details of the selected event. La sección Contenido asociado indica dónde se encuentra el material relacionado con el evento, si se ha facilitado una ubicación. Haga clic en el enlace para saltar a esa carpeta de la biblioteca.
   
   Si dispone de los permisos correspondientes, puede editar y eliminar el evento desde aquí.

3. Haga clic en **Cerrar** para volver al calendario.

### Añadir un evento

Todos los miembros del sitio pueden programar eventos en el calendario del sitio. The event appears in the calendar and the Site Calendar dashlet.

1. Vaya al calendario y empiece a crear un evento siguiendo uno de los siguientes métodos:
   
   * Haga clic en **Añadir un evento**.
   * Haga clic en una fecha en el calendario del panel de exploración y, después, en **Añadir un evento**.
   * Desplácese por el calendario en la vista principal y haga clic en una fecha.
   
   > **Note:** Para crear un evento en la vista Agenda, use el botón del encabezado **Añadir un evento**.
   
   Si solo hace clic en **Añadir un evento**, las fechas de inicio y fin del evento coinciden con la fecha actual de forma predeterminada. Si indica la fecha primero, como en los otros dos métodos, las fechas de inicio y fin coinciden con la fecha seleccionada.
   
   Se abre el cuadro de diálogo **Añadir un evento**. Fields marked with an asterisk (`*`) are required.

2. Escriba un nombre para el evento en el cuadro **Qué**.

3. Escriba la ubicación del evento en el cuadro **Dónde**.

4. Describa el evento en el cuadro **Descripción**.
   
   > **Note:** Los detalles que especifique en estos tres campos aparecerán en la vista Agenda y todos los usuarios los podrán ver. En las otras vistas, solo aparecerá el nombre del evento.

5. Elija las fechas de inicio y fin del evento.
   
   De forma predeterminada, la fecha de inicio es la misma que la de fin; sin embargo, los eventos pueden durar varios días. Haga clic en el icono a la derecha del campo Fecha para mostrar un calendario y, después, vaya al mes adecuado y haga clic en una fecha para seleccionarla.

6. Indique la duración del evento:
   
   Elija **Todo el día** para programar un evento de un día completo. Cuando programa un evento para todo el día, no hace falta indicar las horas de inicio y fin. Todas las horas se dan en formato de 24 horas.

7. Si fuera necesario, añada etiquetas existentes o cree otras nuevas para el evento.

8. De manera opcional, seleccione una carpeta para indicar a los usuarios la ubicación del material relacionado con el evento:
   
   > **Note:** La sección Contenido asociado no es visible de forma predeterminada. Contact your system administrator to update `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties` and `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties` if you cannot see this feature.
   
   a. In the Related Content section, click **Browse**.
   
   b. On the Browse Folders dialog box navigate the library folder structure and select the appropriate folder.
   
   c. Click **OK**.
   
   La ruta seleccionada se muestra en la página **Añadir un evento**.

9. Haga clic en **Guardar**.

Al cerrarse el cuadro de diálogo, en el calendario aparece el nuevo evento como programado.

### Editar los detalles de un evento

Edite un evento programado para cambiar cualquiera de sus detalles, incluidas la ubicación, la fecha y la hora. También puede añadir y quitar etiquetas, y cambiar la carpeta de la biblioteca asociada con el evento.

1. En el calendario, busque el evento que desea editar y haga clic en él.

2. Haga clic en **Editar** en el cuadro de diálogo **Información del evento**.
   
   The Edit Event dialog box displays the details for the selected event.

3. Efectúe los cambios deseados y edite las etiquetas según sea necesario.
   
   Puede añadir y eliminar etiquetas existentes o crear otras nuevas.

4. Añada o cambie la carpeta de la biblioteca en la sección Contenido asociado para indicar dónde está ubicado el material relativo al evento.
   
   > **Note:** La sección Contenido asociado no es visible de forma predeterminada. Contact your system administrator to update `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/modules/create-event.get.properties` and `<configRootShare>/classes/alfresco/site-webscripts/org/alfresco/components/calendar/info.get.properties` if you cannot see this feature.

5. Haga clic en **Guardar**.
   
   Se cierra el cuadro de diálogo y el calendario muestra el evento actualizado. Sin embargo, los cambios no serán visibles en el calendario, a menos que haya cambiado el nombre o la hora del evento.

### Cambiar la fecha y la hora de un evento

Puede cambiar fácilmente el día, la hora y la duración de un evento.

1. En el calendario, busque el evento que desea editar.

2. Seleccione la vista **Día** o **Semana**.

3. Edite el evento:
   
   1. Coloque el cursor en la barra de ajuste que hay en la parte inferior del evento. Haga clic sobre la barra y arrástrela para ajustar la duración del evento.
   
   2. Coloque el cursor en cualquier punto del intervalo del evento. Haga clic sobre todo el evento y arrástrelo a una hora distinta.
   
   3. (Solo en la vista Semana). Coloque el cursor en cualquier punto del intervalo del evento. Haga clic en el evento y arrástrelo a un día y una hora distintos.

### Eliminar un evento

Cuando se cancela un evento programado, puede eliminarlo fácilmente del calendario. This also removes it from the Site Calendar dashlet.

1. En el calendario, busque el evento que desea eliminar y haga clic en él.
   
   The Event Information dialog box displays the full details of the selected event.

2. Haga clic en **Eliminar**.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

3. Haga clic en **Eliminar**.

El cuadro de diálogo se cierra y el evento se elimina del calendario.

## Wiki

La wiki permite a los usuarios del sitio crear páginas de una wiki colaborativa.

Al entrar a la wiki, la vista de página muestra la página principal de la wiki. Haga clic en **Lista de páginas wiki** para ver la lista de páginas wiki.

La lista de páginas wiki contiene un resumen de todas las páginas creadas para la wiki del sitio actual. Seleccione una página de la lista para verla en la vista de página.

En ambas vistas (Lista de páginas wiki y de página) puede crear, eliminar, ver detalles y editar una página wiki. Debe estar en la vista de página para cambiar el nombre de la página wiki.

### Acceder a la wiki

Abra la wiki para ver el contenido de esta sección correspondiente al sitio actual. En ella puede crear, eliminar, cambiar el nombre y editar las páginas wiki. La mayor parte de las acciones posibles pueden llevarse a cabo tanto desde la vista de página como desde la lista wiki.

1. En el sitio, haga clic en **Más** y, después, en **Wiki**.
   
   > **Note:** Los nombres de las características se pueden personalizar en cada sitio. Si el administrador del sitio las ha personalizado, es posible que el enlace no se llame **Wiki**.
   
   Esta operación abre la wiki, que muestra la página wiki principal del sitio. Al abrir una página wiki, las acciones que puede realizar aparecen en forma de botones (**Nueva página**, **Eliminar**, **Cambiar nombre**) y de enlaces en la esquina superior derecha del área de contenido (**Ver la página**, **Editar la página**, **Detalles**).

2. Haga clic en **Lista de páginas wiki** para ver la lista de páginas wiki.
   
   En la lista de páginas wiki se muestra un resumen de todas las páginas de la wiki del sitio actual. En esta vista, las acciones que pueden llevarse a cabo en una página wiki aparecen en forma de botones debajo del titular (en esta vista, solo está disponible la opción **Nueva página**) y de enlaces a la derecha del resumen de cada página. La mayor parte de las acciones posibles pueden llevarse a cabo tanto desde la vista de página como desde la lista wiki.
   
   > **Note:** Puede hacer clic en **Página principal** para volver a la vista anterior.

### Navegar por las páginas wiki

La función de navegación de la wiki le permite filtrar las páginas wiki y localizar fácilmente contenido específico.

La lista de páginas wiki muestra todas las páginas wiki del sitio actual en orden cronológico. La página más reciente aparece en la lista en primer lugar.

El panel de navegación situado a la izquierda de la página le permite mostrar un subconjunto del contenido wiki al seleccionar una vista específica o una etiqueta. Independientemente de la opción que use para navegar por el contenido (vista o etiqueta), en la lista wiki puede ver un resumen de las páginas que coinciden con la opción seleccionada. En el resumen se detallan:

* El nombre de la página wiki
* El usuario que la creó
* La fecha y la hora de publicación de la página
* El último usuario que la modificó
* La fecha y la hora de modificación de la página
* Una muestra del contenido
* Las etiquetas asociadas a la página

La lista **Páginas** del panel de navegación ofrece las siguientes vistas:

* **Recently Modified**: Muestra las páginas modificadas en los últimos siete días
* **All**: Muestra todas las páginas creadas en la wiki del sitio actual
* **Recently Added**: Muestra las páginas creadas en los últimos siete días
* **My Pages**: Muestra las páginas creadas por el usuario que ha iniciado sesión

La lista **Etiquetas** muestra todas las etiquetas que actualmente se asocian a una o más páginas wiki. El número que aparece después de la etiqueta indica cuántas páginas wiki se asocian a la etiqueta.

Para navegar por las páginas wiki:

1. Haga clic en **Lista de páginas wiki** en la vista de página para navegar a la lista wiki, en caso de que aún no esté abierta.

2. Seleccione una opción del panel de navegación:
   
   * En la lista **Páginas**, haga clic en una vista para mostrar todas las páginas del sitio actual que correspondan a esa selección.
   * En la lista **Etiquetas**, haga clic en la etiqueta que le interese para mostrar todas las páginas del sitio actual asociadas a ella.

3. En la lista wiki, haga clic en el título de una página wiki para mostrarla al completo.

La página wiki seleccionada aparecerá en la vista de página.

### Crear la página principal de la wiki

Al crear un nuevo sitio, la wiki de este contiene una página principal, que está vacía. Lo más probable es que elija esta como la página de presentación del sitio wiki.

1. Si la página principal aún no está abierta, vaya a la wiki y haga clic en **Página principal**.

2. Haga clic en **Editar página**.

3. Redacte el contenido para la página principal en el cuadro **Texto**.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Entre las funciones adicionales disponibles están la posibilidad de insertar y personalizar tablas, insertar la fecha y la hora actuales, y ver el editor en modo de pantalla completa. El cuadro de texto incluye otras características que le pueden resultar útiles; mantenga el cursor sobre un icono para comprobar su función.
   
   La característica **Insertar imagen de la biblioteca** muestra una lista de imágenes de la biblioteca del sitio. Haga clic en una miniatura de esta lista para insertar la imagen deseada en la posición actual del cursor en la página wiki.
   
   La característica **Insertar enlace de documento** le permite insertar un enlace a cualquier elemento de contenido de la biblioteca del sitio en el que se encuentra. Localice el elemento de la biblioteca al que desea enlazar y haga clic en Añadir. Puede seleccionar tantos elementos como desee. Haga clic en **Aceptar** para insertar enlaces a los elementos seleccionados en la posición actual del cursor.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.

4. De forma opcional, puede añadir etiquetas existentes a la página principal o crear otras nuevas.
   
   Las etiquetas recién asociadas aparecen debajo del cuadro **Texto**. Haga clic en una etiqueta para eliminarla.

5. Haga clic en **Guardar**.

En la vista de página se muestra la página principal.

### Crear una nueva página wiki

Puede crear una nueva página wiki desde la vista de página y la lista wiki.

1. En la wiki, haga clic en **Nueva página**.
   
   The Create Wiki Page page appears.

2. En **Título** escriba el título de la página.
   
   El campo **Título** no admite los siguientes caracteres especiales: `\ / . ? # and |`. Si el título contiene uno de estos caracteres, el botón **Guardar** aparece desactivado.
   
   > **Note:** El título sí puede contener un punto, siempre que este no sea el último carácter.

3. Redacte el contenido de la página wiki en el cuadro **Texto**.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Entre las funciones adicionales disponibles están la posibilidad de insertar y personalizar tablas, insertar la fecha y la hora actuales, y ver el editor en modo de pantalla completa. El cuadro de texto incluye otras características que le pueden resultar útiles; mantenga el cursor sobre un icono para comprobar su función.
   
   La característica **Insertar imagen de la biblioteca** muestra una lista de imágenes de la biblioteca del sitio. Haga clic en una miniatura de esta lista para insertar la imagen deseada en la posición actual del cursor en la página wiki.
   
   La característica **Insertar enlace de documento** le permite insertar un enlace a cualquier elemento de contenido de la biblioteca del sitio en el que se encuentra. Localice el elemento de la biblioteca al que desea enlazar y haga clic en Añadir. Puede seleccionar tantos elementos como desee. Haga clic en **Aceptar** para insertar enlaces a los elementos seleccionados en la posición actual del cursor.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.
   
   To create a link to another wiki page, type `[[Page Name]]`. Si la página especificada no existiera, se creará en ese momento de manera automática. Tenga en cuenta que la página wiki que se crea estará vacía. No aparecerá en la lista wiki hasta que cree contenido para ella.

4. De forma opcional, puede añadir etiquetas existentes a la página wiki o crear otras nuevas.
   
   Las etiquetas recién asociadas aparecen debajo del cuadro **Texto**. Haga clic en una etiqueta para eliminarla.

5. Haga clic en **Guardar**.
   
   La nueva página wiki aparece tal como la verán los usuarios.

6. Haga clic en **Lista de páginas wiki** para volver a la lista wiki.

### Editar una página wiki

Edite una página wiki para crear nuevo contenido, modificar el contenido existente y añadir etiquetas.

1. Encuentre la página wiki que desee editar en la lista wiki.

2. Haga clic en la opción **Editar** correspondiente a esa página.
   
   Si la página wiki que desea editar ya está abierta en la vista de página, solo tiene que hacer clic en **Editar la página**.
   
   El contenido de la página wiki seleccionada aparece en un cuadro de edición.

3. Haga los cambios necesarios.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Entre las funciones adicionales disponibles están la posibilidad de insertar y personalizar tablas, insertar la fecha y la hora actuales, y ver el editor en modo de pantalla completa. El cuadro de texto incluye otras características que le pueden resultar útiles; mantenga el cursor sobre un icono para comprobar su función.
   
   La característica **Insertar imagen de la biblioteca** muestra una lista de imágenes de la biblioteca del sitio. Haga clic en una miniatura de esta lista para insertar la imagen deseada en la posición actual del cursor en la página wiki.
   
   La característica **Insertar enlace de documento** le permite insertar un enlace a cualquier elemento de contenido de la biblioteca del sitio en el que se encuentra. Localice el elemento de la biblioteca al que desea enlazar y haga clic en Añadir. Puede seleccionar tantos elementos como desee. Haga clic en **Aceptar** para insertar enlaces a los elementos seleccionados en la posición actual del cursor.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.
   
   To create a link to another wiki page, type `[[Page Name]]`. Si la página especificada no existiera, se creará en ese momento de manera automática. Tenga en cuenta que la página wiki que se crea estará vacía. No aparecerá en la lista wiki hasta que cree contenido para ella.

4. Edite las etiquetas de la página wiki según sea necesario.
   
   Puede añadir y eliminar etiquetas existentes o crear otras nuevas.

5. Haga clic en **Guardar**.

En la vista de página se muestra la página wiki actualizada.

### Cambiar el nombre de una página wiki

El nombre de una página wiki puede cambiarse en la vista de página.

1. En la lista wiki, busque la página cuyo nombre desea cambiar.

2. Haga clic en el título de esa página.
   
   En la vista de página se muestra la página wiki seleccionada.

3. Haga clic en **Cambiar nombre**.
   
   The Rename page opens.

4. Escriba el nuevo nombre de la página wiki.
   
   El título de una página wiki no admite los siguientes caracteres especiales: `\ / . ? # and |`. Si el título contiene uno de estos caracteres, el botón **Guardar** aparece desactivado.
   
   > **Note:** El título sí puede contener un punto, siempre que este no sea el último carácter.

5. Haga clic en **Guardar**.

La vista de página refleja el cambio de nombre y la nueva página wiki conserva el histórico de la página original. También se crea una página con el nombre original. En ella se muestra un enlace a la página actualizada, para que los usuarios no se encuentren con enlaces rotos al utilizar la wiki.

### Eliminar una página wiki

Elimine una página wiki cuando ya no desee que aparezca en la wiki del sitio actual. Puede hacerlo tanto desde la vista de página como desde la lista wiki.

1. En la lista wiki, busque la página que desee eliminar.

2. Haga clic en la opción **Eliminar** correspondiente a esa página.
   
   > **Note:** Es recomendable ver antes la página para cerciorarse de que es la que desea eliminar. Después puede seleccionar **Eliminar** en la vista de página.
   
   Si la página wiki que desea eliminar ya está abierta en la vista de página, basta con hacer clic en **Eliminar** en esa página.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

3. Haga clic en **Eliminar** para eliminar la página wiki actual.

### Ver los detalles de una página wiki

Puede ver los detalles de una página wiki para consultar el histórico de versiones y las etiquetas asociadas a la página, así como la lista de páginas wiki vinculadas a ella. La página de detalles puede verse tanto desde la vista de página como desde la lista wiki. En ella verá las versiones anteriores de la página y podrá, incluso, restablecer una versión concreta.

1. En la lista wiki, busque la página cuyos detalles desea ver.

2. Haga clic en la opción **Detalles** correspondiente a esa página.
   
   Si la página wiki que desea ver ya está abierta en la vista de página, solo tiene que hacer clic en **Detalles** en esa página.
   
   En la vista de página se muestra el contenido de la página wiki en formato expandido; aquí se incluyen el histórico de versiones, las etiquetas y las páginas enlazadas. From here you can click **Edit Page**to make changes.

3. Utilice el **Histórico de versiones** para:
   
   * Seleccionar y ver una versión anterior de la página seleccionada en el menú **Ver la versión**.
   * Ver los detalles de las versiones anteriores en la lista **Version(es) anterior(es)**, que aparece debajo del cuadro de contenido. Haga clic en el número de versión para mostrar y ocultar los detalles.
   * Haga clic en **Restablecer** para actualizar la página actual con el contenido de la versión anterior seleccionada.

4. Haga clic en **Ver la página** para volver a la vista de página.
   
   La página wiki aparecerá en la vista de página.

## Discussion forum

El foro de discusión permite publicar contenido generado por los usuarios y relacionado con el sitio. Este contenido suele estar en forma de preguntas o comentarios organizados en discusiones encadenadas.

Los miembros de un sitio pueden crear temas nuevos, así como responder a una entrada para participar en una discusión sobre un tema específico.

### Acceder al foro de discusión

Abra el foro para ver los temas de discusión del sitio actual.

Dentro de una discusión puede crear nuevos temas, así como editar y eliminar los temas que haya creado anteriormente. También puede tomar parte en una discusión respondiendo a un tema.

1. En el sitio, haga clic en **Más** y, después, en **Foros**.
   
   > **Note:** Los nombres de las características se pueden personalizar en cada sitio. Si el administrador del sitio las ha personalizado, es posible que el enlace no se llame **Foros**.
   
   Esta acción abre el foro de discusión. Como opción predeterminada, el foro se abre en la vista **Nuevos**, donde verá una lista de los temas creados en los últimos siete días. En el resumen se detallan:
   
   * el título del tema
   * la fecha y la hora de creación del tema
   * el usuario que creó el tema
   * el número de respuestas al tema
   * Una muestra del contenido
   * las etiquetas asociadas con el tema

2. Utilice los botones de navegación **<<** y **>>** para desplazarse hacia delante y hacia atrás por las páginas de temas.

3. Haga clic en **Vista sencilla** para que se muestren solamente los datos básicos del tema: título, fecha y hora de creación, y autor.
   
   Haga clic en **Vista detallada** para ver un resumen.

### Navegar por los temas del foro

La función de navegación del foro de discusión le permite filtrar los temas del foro para poder desplazarse más fácilmente por sus contenidos.

El panel de exploración de la izquierda de la página le permite mostrar un subconjunto de los temas de discusión mediante la selección de una vista o etiqueta específica.

La lista **Temas** del panel de navegación proporciona las siguientes vistas:

* **New**: Muestra los temas creados o actualizados en los últimos siete días.
* **Most Active**: Muestra los temas con el mayor número de respuestas.
* **All**: Muestra todos los temas
* **My Topics**: Muestra los temas creados por el usuario actual.

La lista **Etiquetas** muestra las etiquetas que están asociadas actualmente con uno o más temas del foro. El número que sigue a la etiqueta indica cuántos temas del foro están asociados con esa etiqueta.

**Para navegar por los temas del foro:**

1. En la característica Foros, seleccione una opción en el panel de exploración:
   
   1. En la lista **Temas** haga clic en una vista para mostrar los temas del foro del sitio actual correspondientes a la opción seleccionada.
   
   2. En la lista **Etiquetas**, haga clic en la etiqueta que le interesa para mostrar todos los temas del sitio actual que están asociados con ella.

2. Haga clic en **Vista sencilla** para que se muestren solamente los datos básicos del tema: título, fecha y hora de creación, y autor.
   
   Haga clic en **Vista detallada** para ver un resumen.

### Ver un tema

Los temas del foro de discusión aparecen en formato de lista o vista de resumen. Ver un tema le permite ver todos los contenidos de la discusión.

Aunque puede realizar acciones en un tema desde la página principal, es recomendable abrir el tema antes de editarlo, eliminarlo o responder a él para cerciorarse de que ha seleccionado el tema correcto.

1. En la característica Foros, navegue por los temas del foro hasta encontrar el que desea ver.

2. Haga clic en el nombre del tema para abrirlo.
   
   > **Note:** Otra opción es hacer clic en **Ver**, a la derecha del tema, o en **Leer**, debajo del tema. Si en la página principal se muestra la vista sencilla, la acción **Leer** no estará disponible.
   
   Al ver el tema se muestra la totalidad del tema seleccionado, junto con las respuestas que se hayan publicado.

3. Haga clic en **Lista de temas de foros** para volver a la vista principal.

### Responder a una discusión

Responda a un tema para tomar parte en una discusión. Puede responder al tema del foro original o a cualquiera de las respuestas que se han creado para ese tema. Cada respuesta aparece anidada para indicar visualmente el flujo de la discusión.

1. En la característica Foros, haga clic en el nombre de un tema para abrirlo.
   
   La vista Tema muestra la totalidad del tema seleccionado, junto con las respuestas que se hayan publicado.

2. Haga clic en **Responder**.

3. Escriba el contenido en el recuadro **Añadir una respuesta**.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Hay otras características adicionales; para verlas, mueva el cursor sobre un icono.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.

4. Haga clic en **Crear**.

La respuesta aparece debajo y sangrada con respecto al tema o la respuesta principal.

#### Editar una respuesta

Puede editar una respuesta del mismo modo que se edita un tema del foro.

1. En la lista de temas, busque el tema que desea y haga clic en él.
   
   La vista Tema muestra la totalidad del tema seleccionado, junto con las respuestas publicadas.

2. Haga clic en **Editar**, a la derecha de la respuesta que desea modificar.
   
   La respuesta seleccionada aparece completa en un cuadro de edición.

3. Efectúe los cambios deseados en el título del tema y el contenido.

4. Haga clic en **Actualizar**.

Aparecerá la respuesta actualizada tal como la verán los usuarios. The text (Updated) appears to indicate it has been edited.

### Crear un nuevo tema

Cree un nuevo tema para empezar una conversación relacionada con el sitio actual. Todos los miembros del sitio podrán ver este contenido.

1. En la característica Foro, haga clic en **Nuevo tema**.
   
   The Create New Topic page appears.

2. Introduzca un **Título** para el tema.

3. Escriba el contenido del tema en el cuadro **Texto**.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Hay otras características adicionales; para verlas, mueva el cursor sobre un icono.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.

4. De forma opcional, puede añadir etiquetas existentes al tema o crear etiquetas nuevas.
   
   Las etiquetas recién asociadas aparecen debajo del cuadro **Texto**. Haga clic en una etiqueta para eliminarla.

5. Haga clic en **Guardar**.
   
   Aparecerá el nuevo tema tal como lo verán los usuarios.

6. Haga clic en **Lista de temas de foros** para volver a la vista principal.

### Editar un tema

Edite un tema del foro para modificar o ampliar su contenido.

Solo podrán editar un tema los administradores del sitio, los colaboradores del sitio y el usuario que lo creó.

1. En la característica Foros, haga clic en **Editar**, a la derecha del tema que desea editar.
   
   > **Note:** Es recomendable ver antes el tema para cerciorarse de que es el que desea editar. Después puede seleccionar **Editar** en la página Tema.
   
   The Edit Topic page appears displaying the selected topic.

2. Efectúe los cambios deseados en el título y los contenidos del tema.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Hay otras características adicionales; para verlas, mueva el cursor sobre un icono.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.

3. Edite las etiquetas del tema según sea necesario.
   
   Puede añadir y eliminar etiquetas existentes o crear otras nuevas.

4. Haga clic en **Guardar**.
   
   Aparecerá el tema actualizado tal como lo verán los usuarios. The text (Updated) appears after the title.

5. Haga clic en **Lista de temas de foros** para volver a la vista principal.

### Eliminar un tema

Elimine un tema para borrarlo de forma permanente del foro de discusión. Al hacerlo, se eliminan también todas las respuestas del tema.

Solo podrán eliminar un tema el administrador del sitio y el usuario que lo creó.

1. En la característica Foros, haga clic en **Eliminar**, a la derecha del tema que desea eliminar.
   
   > **Note:** Es recomendable ver antes el tema para cerciorarse de que es el que desea eliminar Después puede seleccionar **Eliminar** en la página Tema.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

2. Haga clic en **Eliminar**.

Aparecerá un mensaje que indica que se ha eliminado el tema seleccionado.

## Blog

El blog del sitio permite añadir artículos, descripciones de eventos y otro material relacionado con el sitio.

Los miembros del sitio pueden crear, editar y añadir comentarios a las entradas del blog. Las entradas pueden guardarse como borradores y, cuando estén listas, publicarse en el blog interno.

### Acceder al blog

Abra el blog para ver todas las entradas publicadas en el sitio actual. También puede ver sus propias entradas que aún no ha publicado (borradores).

En el blog, puede escribir nuevas entradas, así como editar, publicar y eliminar entradas que haya creado anteriormente. También puede añadir comentarios a las entradas de otros miembros.

1. En un sitio, haga clic en **Más** y, después, en **Blog**.
   
   > **Note:** Los nombres de las características se pueden personalizar en cada sitio. Si el administrador del sitio las ha personalizado, es posible que el enlace no se llame **Blog**.
   
   Esta acción abre el blog. De forma predeterminada, la página principal le lleva a la vista **Últimas**, donde tiene una lista de las entradas publicadas internamente que se han creado o editado en los últimos siete días. El resumen incluye los siguientes detalles (según corresponda):
   
   * El título del blog, seguido de los indicadores de estado relacionados
   * La fecha y la hora de publicación de la entrada
   * El usuario que la creó
   * Un enlace a la entrada externa
   * Una muestra del contenido
   * El número de respuestas a la entrada
   * Las etiquetas asociadas a la entrada
   
   Cuando la lista contiene más entradas de las que se pueden mostrar en una sola página, se activan los enlaces de navegación en la parte superior e inferior de la lista de elementos. El número en negrita indica la página actual. Haga clic en el número de una página para ir a ella. Use los enlaces anterior (<\<) y siguiente (>>) para moverse hacia adelante y hacia atrás por las páginas o entradas.

2. Haga clic en **Vista sencilla** para mostrar solo la información básica de las entradas del blog: título, fecha/ hora de publicación y autor.
   
   Haga clic en **Vista detallada** para ver un resumen.

### Navegar por las entradas del blog

La función de navegación del blog le permite filtrar las entradas y moverse fácilmente por el contenido del blog.

El panel de exploración situado de la sección izquierda del blog le permite mostrar un subconjunto de las entradas del blog al seleccionar una vista específica, un período de tiempo (mes) o una etiqueta.

La lista **Entradas** del panel de navegación ofrece las siguientes vistas:

* **All**: Muestra todas las entradas del blog.
* **Latest**: Muestra las entradas publicadas de manera interna creadas o editadas en los últimos siete días.
* **My Drafts**: Muestra las entradas que el usuario actual ha creado y guardado como borradores (no publicadas aún).
* **My Published**: Muestra las entradas creadas y publicadas de manera interna por el usuario actual.

La lista **Histórico** organiza las entradas por mes y año.

La lista **Etiquetas** muestra todas las etiquetas que se asocian actualmente a una o más entradas del blog. El número que aparece después de la etiqueta indica cuántas entradas del blog se asocian a dicha etiqueta.

Para examinar las entradas del blog:

1. En el blog, seleccione una opción en el panel de exploración:
   
   1. En la lista **Entradas**, haga clic en una vista para mostrar las entradas del blog del sitio actual que correspondan a esa selección.
   2. En la lista **Histórico**, haga clic en una fecha para mostrar las entradas del blog del sitio actual que se publicaron en el mes o año seleccionado.
   3. En la lista **Etiquetas**, haga clic en la etiqueta que le interese para mostrar todas las entradas del sitio actual asociadas a ella.

2. Haga clic en **Vista sencilla** para mostrar solo la información básica de las entradas del blog: título, fecha/ hora de publicación y autor.
   
   Haga clic en **Vista detallada** para ver un resumen.

### Ver una entrada del blog

Al navegar por el blog, se muestran las entradas existentes en la vista principal. Estas entradas aparecen en formato de lista o vista de resumen. Al abrir o ver una entrada, podrá ver todo su contenido.

Aunque es posible realizar acciones con una entrada desde la página principal, ver una entrada le permite confirmar que ha seleccionado la entrada correcta antes de llevar a cabo una acción irreversible, por ejemplo, eliminarla. Aunque tanto en la vista sencilla como en la detallada aparecen todos los iconos disponibles, debe ver una entrada para poder añadir comentarios.

1. Navegue por las entradas del blog para encontrar la entrada que desea ver.

2. Haga clic en el título de la entrada o en **Leer** debajo de la entrada.
   
   > **Note:** Si en la página principal aparece la vista sencilla, tendrá que hacer clic en el título de la entrada.
   
   En la vista de entrada se muestra la totalidad de la entrada del blog seleccionada, junto con todos los comentarios asociados.

3. Haga clic en **Lista de entradas en el blog** para volver a la vista principal.

### Crear una entrada en el blog

Cree una entrada en el blog para añadir información o un texto relacionado con el sitio actual.

Al crear una nueva entrada, puede guardarla en borradores o publicarla inmediatamente en el blog del sitio actual. Esto hará que esté disponible para que otros usuarios del sitio la vean y puedan comentar.

1. Haga clic en **Nueva entrada**.
   
   The Create Blog Post page appears.

2. Escriba el título de la entrada en **Título**.

3. Escriba el contenido en el cuadro **Texto**.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Hay otras características adicionales; para verlas, mueva el cursor sobre un icono.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.

4. De forma opcional, puede añadir etiquetas existentes a la entrada o crear etiquetas nuevas.
   
   Las etiquetas recién asociadas aparecen debajo del editor de texto. Haga clic en una etiqueta para eliminarla.

5. Guarde o publique la nueva entrada del blog:
   
   * Haga clic en **Guardar como borrador** para guardar la entrada sin publicarla. Esta no aparecerá en la lista de entradas.
   * Haga clic en **Publicar internamente** para publicar la entrada en el blog interno y ponerla a disposición de los demás usuarios de este sitio.
   
   La nueva entrada aparece tal como la verán los otros usuarios. The text (Draft) appears after the title if the post remains unpublished. El texto **(Publicado)** aparece después del título una vez que la entrada se haya publicado externamente.

6. Haga clic en **Lista de entradas en el blog** para volver a la vista principal.

### Editar una entrada del blog

Edite una entrada del blog para modificar su contenido o añadir información.

Solo podrán editar una entrada del blog los administradores del sitio, los colaboradores del sitio y el usuario que la creó.

1. Haga clic en **Editar** a la derecha de la entrada que desee editar.
   
   > **Note:** Puede ver la entrada primero para cerciorarse de que sea la correcta; a continuación, haga clic en **Editar** en la página de vista de la entrada.
   
   The Edit Blog Post page appears displaying the selected post.

2. Realice los cambios necesarios en el título y el contenido de la entrada.
   
   Puede usar las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente, así como insertar o editar enlaces, delimitadores de texto e imágenes. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario. Hay otras características adicionales; para verlas, mueva el cursor sobre un icono.
   
   Para cambiar el tamaño del editor de texto, haga clic en la esquina inferior derecha y arrástrelo.

3. Edite las etiquetas de la entrada según sea necesario.
   
   Puede añadir y eliminar etiquetas existentes o crear otras nuevas.

4. Haga clic en **Actualizar** para guardar las modificaciones.
   
   > **Note:** Si elige esta opción para una entrada que ya se había publicado externamente, el texto **(Sin sincronizar)** aparece después del título para indicar que la versión del blog interno no coincide con la del externo.
   
   Aparecerá la entrada actualizada tal como la verán los usuarios. The text (Updated) appears after the title.

5. Haga clic en **Lista de entradas en el blog** para volver a la vista principal.

### Eliminar una entrada del blog

Elimine una entrada del blog para borrarla del blog del sitio de forma permanente.

Al eliminar una entrada, también se eliminarán todos los comentarios relativos a ella. Solo podrán eliminar una entrada del blog los administradores del sitio y el usuario que la creó.

1. En la lista de entradas del blog, busque la entrada que desea eliminar.

2. Haga clic en **Eliminar**.
   
   > **Note:** Puede ver la entrada primero para cerciorarse de que sea la correcta; a continuación, seleccione **Eliminar** en la página de vista de la entrada.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

3. Haga clic en **Eliminar**.

Aparecerá un mensaje que indica que se ha eliminado la entrada del blog seleccionada.

### Trabajar con comentarios

Al permitir que se añadan comentarios a una entrada del blog, se hace del blog una herramienta interactiva. Si bien todos los usuarios que dispongan de acceso al sitio podrán ver las conversaciones del blog, solo podrán añadir comentarios los que sean miembros del sitio.

El número de respuestas añadidas a una entrada queda registrado y se indica en cada entrada. Tendrá que ver una entrada para añadir, ver y administrar los comentarios correspondientes.

#### Añadir un comentario a una entrada

En el blog puede añadir un comentario para responder a cualquier entrada publicada.

1. En el blog, busque la entrada sobre la que desea hacer un comentario.

2. Haga clic en el título de la entrada para verla.
   
   En la vista de entrada se muestra la totalidad de la entrada del blog seleccionada, junto con todos los comentarios asociados.

3. Haga clic en **Añadir un comentario**.

4. Introduzca su comentario en el cuadro provisto.
   
   Utilice las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario.

5. Haga clic en **Añadir un comentario**.
   
   El comentario aparecerá debajo de la entrada.

6. Haga clic en **Lista de entradas en el blog** para volver a la vista principal.

#### Editar un comentario

Edite un comentario del blog para modificar o ampliar su contenido.

Solo podrán editar un comentario los administradores del sitio, los colaboradores del sitio y el usuario que lo creó.

1. En el blog, busque la entrada a la que corresponde el comentario que desea editar.

2. Haga clic en el título de la entrada para verla.
   
   En la vista de entrada se muestra la entrada del blog seleccionada y los comentarios asociados.

3. Position your cursor over the comment you want to edit to display the available actions and then click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.
   
   Esta acción está disponible solamente cuando el usuario que ha iniciado sesión tiene permiso para editar el comentario.
   
   Aparecerá el cuadro **Editar el comentario** con el comentario seleccionado.

4. Efectúe los cambios deseados.
   
   Utilice las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario.

5. Haga clic en **Guardar**.
   
   El comentario actualizado aparecerá debajo de la entrada.

6. Haga clic en **Lista de entradas en el blog** para volver a la vista principal.

#### Eliminar un comentario

Elimine un comentario para borrarlo de forma permanente de una entrada del blog.

Solo podrán eliminar un comentario los administradores del sitio, los colaboradores del sitio y el usuario que lo creó.

1. En el blog, busque la entrada a la que corresponde el comentario que desea eliminar.

2. Haga clic en el título de la entrada para verla.
   
   En la vista de entrada se muestra la entrada del blog seleccionada y los comentarios asociados.

3. Position your cursor over the comment you want to delete to display the available actions and then click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.
   
   Esta acción está disponible solamente cuando el usuario que ha iniciado sesión tiene permiso para eliminar el comentario.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

4. Haga clic en **Eliminar**.
   
   El comentario se elimina de la página.

5. Haga clic en **Lista de entradas en el blog** para volver a la vista principal.

## Data list

El componente Listas de datos permite a los miembros del sitio crear y administrar listas de datos relacionadas con el sitio. Los usuarios pueden trabajar con sus propias listas y también contribuir a las listas creadas por otros miembros del sitio.

### Acceder al componente Listas de datos

Abra el componente Listas de datos para ver las listas creadas para el sitio actual.

En este componente puede crear nuevas listas, así como editar y eliminar las listas que haya creado anteriormente.

En el sitio, haga clic en **Más** y, después, en **Listas de datos**.

> **Note:** Los nombres de las características se pueden personalizar en cada sitio. Si el administrador del sitio las ha personalizado, es posible que el enlace no se llame **Listas de datos**.

    This opens the feature. The browsing pane displays a list of all existing data lists for the current site.

### Ver una lista

La sección **Listas** del panel de exploración muestra las listas de datos del sitio actual. Cuando haya seleccionado la lista que desea ver, puede aplicar filtros para ver elementos de lista concretos dentro de ella.

En la lista **Elementos** del panel de exploración verá las opciones siguientes para filtrar las filas que aparecen en la lista actual:

* **All**: Muestra todos los elementos de lista
* **Recently Added**: Muestra los elementos de lista creados en los últimos siete días.
* **Recently Modified**: Muestra los elementos de lista modificados en los últimos siete días.
* **Created by Me**: Muestra los elementos de lista creados por el usuario actual.

1. En el panel de exploración Listas de datos, haga clic en la lista que desea ver.
   
   La vista principal muestra la lista seleccionada al completo. Cuando la lista contiene más elementos de los que se pueden mostrar en una sola página, los enlaces de navegación de la parte superior e inferior de la lista se activan. El número en negrita indica la página actual. Haga clic en el número de una página para ir a ella. Use los enlaces anterior (<\<) y siguiente (>>) para moverse hacia adelante y hacia atrás por las páginas o elementos.

2. En la lista **Elementos**, haga clic en la vista correspondiente a los elementos de lista que quiere ver.
   
   En la vista actual solo se muestran los elementos de lista que corresponden a la selección.

3. En la tabla, haga clic en el encabezado de una columna para organizar los resultados según esa columna.

### Crear una nueva lista

Puede crear una nueva lista para el sitio actual.

1. En la característica Lista de datos, haga clic en **Nueva lista**.
   
   The New List dialog box appears.

2. Seleccione el tipo de lista que desea crear.

3. Escriba el nombre de la lista en **Título** (obligatorio) y una descripción en **Descripción** (opcional).
   
   CAUTION:
   
   No se mostrará ningún aviso si crea una lista con un título que ya existe. Revise las listas existentes para garantizar que el nombre de su lista sea único.

4. Haga clic en **Guardar**.
   
   El nombre de la nueva lista aparece en la sección **Listas** del panel de navegación.

5. Haga clic en el nombre de la lista para que se muestre en la vista principal.
   
   Las listas nuevas no contienen elementos de lista.

### Editar los detalles de la lista

Edite una lista existente para modificar su título y descripción.

Solo podrán editar una lista los administradores del sitio, los colaboradores del sitio y el usuario que la creó.

1. En el panel del explorador Listas de datos, coloque el cursor sobre la lista que desee editar para que se muestren las acciones disponibles.

2. Click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.
   
   The Edit List Details dialog box appears displaying the current list details.

3. Efectúe los cambios deseados en el título y la descripción.
   
   > **CAUTION**: No se mostrará ningún aviso si crea una lista con un título que ya existe. Revise las listas existentes para garantizar que el nombre de su lista sea único.

4. Haga clic en **Guardar**.

### Eliminar una lista

Elimine una lista para borrarla de forma permanente del sitio.

Solo podrán eliminar una lista el administrador del sitio y el usuario que la creó.

1. En el panel de exploración Listas de datos, coloque el cursor sobre la lista que desee eliminar para que se muestren las acciones disponibles.

2. Click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.
   
   Aparecerá un mensaje parar pedirle que confirme que desea eliminar la lista seleccionada.

3. Haga clic en **Eliminar**.

Aparecerá un mensaje que indica que se ha eliminado la lista seleccionada.

### Trabajar con elementos de lista

Una vez haya creado una lista, puede rellenarla con elementos de lista.

Puede añadir elementos tanto a sus propias listas como a las listas creadas por otros miembros del sitio. Para ello, puede crear nuevos elementos o duplicar elementos de lista ya existentes.

Para mantener sus listas también puede editar y eliminar elementos.

#### Crear un elemento de lista

Puede crear elementos de lista en una lista de datos ya existente.

1. Haga clic en una lista de datos en el panel de exploración Listas de datos.

2. Haga clic en **Nuevo elemento** en el encabezado.
   
   The Create New Item dialog box appears. Los campos que se muestran en esta página varían según el tipo de lista que se haya seleccionado.

3. Rellene los datos correspondientes.
   
   Los campos marcados con un asterisco (*) son obligatorios. Además de cuadros de diálogo y listas, en la página pueden aparecer los siguientes botones:
   
   * Icono Calendario: haga clic en el icono para mostrar un calendario y, a continuación, seleccione la fecha.
   * Botón **Seleccionar** (**Asignado a** y **Usuario asignado**): haga clic en **Seleccionar** y, a continuación, busque y añada el usuario o usuarios.
   * Botón **Seleccionar** (**Ficheros adjuntos**): haga clic en **Seleccionar** y navegue por la estructura de la biblioteca para localizar y añadir el elemento o elementos de contenido.

4. Haga clic en **Guardar**.
   
   El nuevo elemento aparece en la lista.

#### Editar un elemento de lista

Edite un elemento de lista existente para modificarlo.

Solo podrán editar un elemento de lista los administradores del sitio, los colaboradores del sitio, y el usuario que lo creó.

1. Haga clic en una lista de datos en el panel de exploración Listas de datos.

2. Coloque el cursor sobre el elemento de lista que desee editar para que se muestren las acciones disponibles.

3. Click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.
   
   The Edit Data Item dialog box appears displaying the details for the selected item.

4. Efectúe los cambios deseados en los detalles del elemento.

5. Haga clic en **Guardar**.
   
   El elemento actualizado aparece en la lista.

#### Duplicar un elemento de lista

Puede crear rápida y fácilmente un nuevo elemento de lista con solo duplicar uno ya existente de la misma lista. Esta acción resulta especialmente útil si los detalles de los dos elementos son similares.

1. Haga clic en una lista de datos en el panel de exploración Listas de datos.

2. Coloque el cursor sobre el elemento de lista que desee duplicar para que se muestren las acciones disponibles.

3. Click the ![Duplicate]({% link content-services/images/ico-datalist-duplicate.png %}) Edit icon.
   
   Se crea el nuevo elemento. Sus detalles son los mismos que los del elemento de lista seleccionado.

4. Edite el nuevo elemento de lista según sea necesario.

#### Eliminar un elemento de lista

Elimine un elemento de lista para borrarlo de la lista de datos actual de forma permanente.

Solo podrán eliminar un elemento de lista el administrador del sitio y el usuario que lo creó.

1. Haga clic en una lista de datos en el panel de exploración Listas de datos.

2. Coloque el cursor sobre el elemento de lista que desee eliminar para que se muestren las acciones disponibles.

3. Click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

4. Haga clic en **Eliminar**.

### Trabajar con varios elementos de lista

En el componente Listas de datos puede seleccionar varios elementos de lista para realizar rápida y fácilmente una sola tarea con los elementos seleccionados.

#### Seleccionar varios elementos de lista

Existen dos métodos para seleccionar varios elementos de lista en la lista de datos actual. Puede seleccionar tantos elementos como desee.

1. En una lista de datos, seleccione elementos de lista de una de las siguientes formas:
   
   * Marque una casilla para seleccionar el elemento de lista asociado.
   * Haga clic en **Seleccionar** en la parte superior de la lista de datos y haga clic en **Todos**.
   
   Haga clic en **Ninguno** para desmarcar los elementos de lista seleccionados. Haga clic en **Invertir la selección** para alternar el estado de las casillas entre marcadas y desmarcadas.

En la lista de datos aparecerán seleccionadas las casillas correspondientes.

#### Realizar acciones en varios elementos de lista

Una vez seleccionados los elementos de lista con los que desea trabajar, puede seleccionar la acción que desee realizar.

En la lista **Elementos seleccionados** se muestran las acciones que puede realizar en varios elementos. Estas son:

* **Duplicate**: Copia los elementos de lista seleccionados y los añade a la lista actual.
* **Delete**: Elimina los elementos de lista seleccionados.
* **Deselect All**: Desmarca todas las casillas de los elementos de lista seleccionados actualmente.

Cuando una lista de datos es más larga de una página, puede seleccionar elementos en varias páginas. Sin embargo, la acción seleccionada solo se realiza con los elementos de la página que se muestra actualmente.

1. Haga clic en una lista de datos en el panel de exploración Listas de datos.

2. Seleccione los elementos marcando la casilla que tienen al lado.

3. Haga clic en **Elementos seleccionados**.
   
   Las acciones disponibles se muestran en una lista.

4. Haga clic en la acción deseada.
   
   Haga clic en **Deseleccionar todo** para desmarcar los elementos seleccionados. Cuando selecciona esta opción no puede llevar a cabo otra acción hasta que vuelva a seleccionar los elementos de lista.

## Enlaces del sitio

El componente de enlaces permite a los usuarios del sitio recopilar una lista de enlaces web que están relacionados con el sitio o que pueden resultar de interés a los usuarios. Puede tratarse de enlaces internos que dirigen a páginas del sitio, o enlaces externos que dirigen a cualquier dirección web.

La función de comentarios permite a los miembros del sitio añadir y gestionar los comentarios de los enlaces del sitio.

### Acceder a los enlaces del sitio

Vaya al componente Enlaces del sitio para ver los enlaces web recopilados para el sitio actual.

En este componente puede crear nuevos enlaces, así como editar y eliminar los enlaces que haya creado anteriormente. Puede añadir comentarios a cualquier enlace de los que aparecen en la lista.

1. En el sitio, haga clic en **Más** y, después, en **Enlaces**.
   
   > **Note:** Los nombres de las características se pueden personalizar en cada sitio. Si el administrador del sitio las ha personalizado, es posible que el enlace no se llame **Enlaces**.
   
   Esta acción abre el componente. De forma predeterminada, la vista principal se abre en la opción **Todos los enlaces**, que muestra una lista de todos los enlaces web creados para el sitio. En el resumen se detallan:
   
   * el título del enlace
   * la URL del enlace
   * la fecha y la hora de creación del enlace
   * el usuario que creó el enlace
   * una descripción del enlace
   * las etiquetas asociadas con el enlace

2. Utilice los botones de navegación **<<** y **>>** para desplazarse hacia delante y hacia atrás por todas las páginas de enlaces.

3. Haga clic en **Vista sencilla** para que se muestren solamente los datos básicos del enlace: título y URL.
   
   Haga clic en **Vista detallada** para ver un resumen.

### Navegar por los enlaces del sitio

El panel de exploración de la vista principal permite filtrar los enlaces para facilitar la navegación.

El panel de exploración de la sección izquierda de la página permite mostrar un subconjunto de los enlaces mediante la selección de una vista o etiqueta específica.

La lista **Enlaces** del panel de navegación proporciona las siguientes opciones para navegar por los enlaces:

* **All Links**: Muestra todos los enlaces
* **My Links**: Muestra los enlaces creados por el usuario actual
* **Recently Added**: Muestra los enlaces creados en los últimos siete días

La lista **Etiquetas** muestra todas las etiquetas que están asociadas actualmente con uno o más enlaces.

Para navegar por los enlaces:

1. En la característica Enlaces, seleccione una opción en el panel de exploración:
   
   a. In the **Links** list click a view to display the links in the current site that correspond to that selection.
   
   b. In the **Tags** list click the tag you're interested in to display all links in the current site associated with that tag.

2. Haga clic en **Vista sencilla** para que se muestren solamente los datos básicos del enlace: título y URL.
   
   Haga clic en **Vista detallada** para ver un resumen.

3. Sitúe el cursor sobre un elemento de esta lista para que se muestren las acciones disponibles.

### Ver un enlace

La vista principal de la característica Enlaces muestra los enlaces existentes para el sitio. Puede elegir ver los enlaces en formato de lista o en una vista de resumen. Al ver un enlace, se mostrarán todos sus detalles y todos los comentarios que se hayan añadido.

Aunque puede realizar acciones en un enlace desde la página principal, es recomendable ver el enlace antes de editarlo o eliminarlo para cerciorarse de que ha seleccionado el enlace correcto.

1. En la característica Enlaces, navegue por los enlaces para encontrar el que desea ver.

2. Haga clic en el título del enlace para ver todos los detalles.
   
   La vista Enlace muestra la totalidad del enlace seleccionado, junto con los comentarios que se hayan añadido.

3. Haga clic en **Lista de enlaces** para volver a la vista principal.

### Crear un nuevo enlace

Cree un nuevo enlace en el sitio para proporcionar un método fácil de acceso a información que pueda interesar o resultar de utilidad a los miembros del sitio. Puede añadir cualquier dirección web interna o externa.

1. En la característica Enlaces, haga clic en **Nuevo enlace**.
   
   The Create Link page appears.

2. En **Título** indique el título y en **Descripción** añada una descripción del enlace.

3. En el recuadro **URL** escriba la dirección web del enlace que va a crear.

4. Para que el enlace se abra en la misma ventana del navegador, seleccione **Interno**.
   
   Deje esta opción en blanco si quiere que el enlace se abra en una nueva ventana o pestaña del navegador.

5. De forma opcional, puede añadir etiquetas existentes al enlace o crear otras nuevas.
   
   Aparecen las etiquetas recién asociadas. Haga clic en una etiqueta para eliminarla.

6. Haga clic en **Guardar**.
   
   Aparece el nuevo enlace.

7. Haga clic en **Lista de enlaces** para volver a la vista principal.

### Editar un enlace

Edite un enlace existente para modificarlo.

Solo podrán editar un enlace los administradores del sitio, los colaboradores del sitio y el usuario que lo creó.

1. En la característica Enlaces, navegue por los enlaces para encontrar el que desea editar.

2. Sitúe el cursor sobre el enlace para que se muestren las acciones disponibles y haga clic en **Editar**.
   
   > **Note:** Puede ver el enlace primero para cerciorarse de que sea el correcto; a continuación, seleccione **Editar** en la página de la vista Enlace.
   
   The Edit Link page appears displaying the selected link.

3. Efectúe los cambios deseados en los detalles del enlace.

4. Edite las etiquetas del enlace según sea necesario.
   
   Puede añadir y eliminar etiquetas existentes o crear otras nuevas.

5. Haga clic en **Actualizar**.
   
   En la vista Enlace se muestran los detalles actualizados.

6. Haga clic en **Lista de enlaces** para volver a la vista principal.

### Eliminar un enlace

Elimine un enlace para borrarlo de forma permanente del sitio actual. Esta acción elimina también todos los comentarios añadidos al enlace.

Solo podrán eliminar el enlace el administrador del sitio y el usuario que lo creó.

1. En la característica Enlaces, navegue por los enlaces para encontrar el que desea eliminar.
   
   Para eliminar más de un enlace, puede utilizar la característica de selección múltiple.

2. Coloque el cursor sobre el enlace para que se muestren las acciones disponibles y haga clic en **Eliminar**.
   
   > **Note:** Es recomendable ver antes el enlace para cerciorarse de que es el que desea eliminar. Después puede seleccionar **Eliminar** en la página de la vista Enlace.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

3. Haga clic en **Eliminar**.

Aparecerá un mensaje que indica que se ha eliminado el enlace seleccionado.

#### Eliminar varios enlaces

En la lista de enlaces puede eliminar varios enlaces al mismo tiempo, en lugar de hacerlo de uno en uno.

1. En la característica Enlaces, navegue por los enlaces para encontrar los que desea eliminar.

2. En la lista de enlaces, seleccione los que desea eliminar.
   
   * Marque la casilla situada a la izquierda de cada enlace que desea eliminar.
   * Haga clic en **Seleccionar** en la parte superior de la lista y, a continuación, en **Todos** para seleccionar todos los enlaces de la vista actual.
   
   Haga clic en **Ninguno** para desmarcar los elementos de lista seleccionados. Haga clic en **Invertir la selección** para alternar el estado de las casillas entre marcadas y desmarcadas.
   
   En la lista de enlaces aparecerán seleccionadas las casillas correspondientes.

3. En el encabezado, haga clic en **Elementos seleccionados** y, seguidamente, en **Eliminar**.
   
   > **Note:** Haga clic en **Deseleccionar todo** para desmarcar las casillas seleccionadas.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

4. Haga clic en **Eliminar**.

### Añadir un comentario a un enlace

En la característica Enlaces se puede añadir un comentario a un enlace.

1. Vaya a la característica Enlaces, busque el enlace sobre el que quiere hacer un comentario y haga clic en él.
   
   La vista detallada muestra el enlace seleccionado, junto con todos los comentarios relacionados con él.

2. Haga clic en **Añadir un comentario**.

3. Introduzca su comentario en el cuadro provisto.
   
   Utilice las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario.

4. Haga clic en **Añadir un comentario**.
   
   El comentario aparecerá debajo del enlace.

5. Haga clic en **Lista de enlaces** para volver a la vista principal.

#### Editar un comentario a un enlace

Se puede editar un comentario añadido a un enlace para modificar o ampliar su contenido.

Solo podrán editar un comentario los administradores y los colaboradores del sitio, o el usuario que lo creó.

1. En la característica Enlaces, busque el enlace que contiene el comentario que desea editar y haga clic en él.
   
   La vista detallada muestra el enlace seleccionado, junto con todos los comentarios relacionados con él.

2. Position your cursor over the comment you want to edit to display the available actions and then click the ![Edit]({% link content-services/images/ico-configure.png %}) Edit icon.
   
   Esta acción está disponible solamente cuando el usuario que ha iniciado sesión tiene permiso para editar el comentario.
   
   Aparecerá el cuadro **Editar el comentario** con el comentario seleccionado.

3. Efectúe los cambios deseados en el comentario.
   
   Utilice las características provistas para formatear el texto, insertar listas con viñetas o numeradas, y cambiar el color de la fuente. Para facilitar la edición, utilice utilice las opciones de deshacer, rehacer y eliminar formato según sea necesario.

4. Haga clic en **Guardar**.
   
   Aparecerá el comentario actualizado.

5. Haga clic en **Lista de enlaces** para volver a la vista principal.

#### Eliminar un comentario a un enlace

Elimine un comentario para borrarlo de forma permanente de un enlace.

Solo podrán eliminar un comentario el administrador del sitio y el usuario que lo creó.

1. En la característica Enlaces, busque el enlace que contiene el comentario que desea eliminar y haga clic en él.
   
   La vista detallada muestra el enlace seleccionado, junto con todos los comentarios relacionados con él.

2. Position your cursor over the comment you want to delete to display the available actions and then click the ![Delete]({% link content-services/images/ico-delete.png %}) Delete option.
   
   Esta acción está disponible solamente cuando el usuario que ha iniciado sesión tiene permiso para eliminar el comentario.
   
   Aparecerá un mensaje donde se le pide que confirme que desea eliminar el comentario.

3. Haga clic en **Eliminar**.
   
   El comentario se elimina de la página.

4. Haga clic en **Lista de enlaces** para volver a la vista principal.