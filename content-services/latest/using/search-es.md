---

title: Búsqueda
---

Puede usar el cuadro de búsqueda de la barra de herramientas para buscar ficheros, sitios y personas.

Empiece a escribir en el cuadro de búsqueda y se mostrará una lista de coincidencias con ficheros, sitios y personas.

If you're in a site you can click **Search all content** or **Search in ***sitename***** to search all sites or just the site you're in. Private sites that you're not a member of, and their files, aren't shown.

A continuación tiene una lista con algunos de los muchos [consejos para realizar una búsqueda](#searchtips) disponibles:

* Type `*` to complete a word if you don't know the full word you're searching for. For example, both `*resco` and `alf*` will show results for `alfresco`.
* To search for items that contain only one of several words, use `OR` and surround your search with brackets, for example, `(big OR red)`. If you don't use brackets, search results are returned containing both `big` and `red`.

Se muestran los cinco ficheros, sitios o personas más relevantes; si desea ver más resultados, haga clic en **Más**.

Tiene dos opciones:

* Hacer clic en uno de los resultados para acceder a él directamente.
* Pulsar Entrar (con el cursor en el cuadro de búsqueda) para ver todos los [resultados de la búsqueda](#searchresults) de todos los ficheros que se han encontrado.

> **Note:** Las páginas wiki y las entradas de blog se muestran debajo, junto con otros ficheros. No se muestra una vista previa para eventos de calendario, enlaces web a sitios relacionados, temas de discusiones, listas de datos ni elementos de lista. Para buscarlos, debe pulsar Entrar.

## Search results {#searchresults}

Si pulsa Entrar en el cuadro de búsqueda, se mostrarán todos los ficheros y carpetas encontrados durante la búsqueda.

Ahora podrá hacer lo siguiente:

* Haga clic en la miniatura de un resultado para ver una vista previa.

* Haga clic en el nombre de un resultado para abrirlo.

* Hacer clic en una o varias opciones de filtro para activarlas y desactivarlas, y restringir así los resultados de la búsqueda.

* Mantener el cursor sobre un resultado, hacer clic en **Acciones** y seleccionar una opción del menú.

* Seleccione varios resultados y haga clic en **Elementos seleccionados** para elegir una opción entre las acciones que se muestran.
  
  > **Tip:** Las principales acciones de fichero están disponibles aquí, pero puede encontrar más opciones al previsualizar el fichero.
  
  Puede eliminar un fichero de este modo, pero los resultados no se actualizarán hasta que realice una nueva búsqueda

> **Note:** Haga clic en el menú **Buscar en** para ampliar la búsqueda a todos los sitios o limitarla al sitio donde se encuentra.

If you're a \[Search Manager]({% link content-services/latest/using/permissions.md %}#searchmanager) super user then you'll have an additional **Search Manager** option you can click where you can create new search filters.

Además del cuadro de búsqueda de la barra de herramientas, hay funciones adicionales de búsqueda avanzada para buscar [personas](#peoplefinder), [sitios](#sitefinder) y [contenido](#advancedsearch).

> **Tip:** If a file is a Microsoft Office, PDF, or other text-based file type (not an image or video) then you can also click !\[Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) on the file preview to search for text in the file.

## Search tips {#searchtips}

Hay varias formas de hacer una búsqueda más específica.

> **Note:** File and folder names have additional search support for product names, product codes, camel case word extraction, general file naming conventions and more.

| To search for| Enter the search criteria| This searches
|----------|----------|----------
| la palabra *plátano* en cualquier ubicación donde aparezca| `banana`<br><br>or<br><br>`=banana`| nombres, títulos, descripciones y contenido.
| la expresión exacta piel *de plátano* en cualquier ubicación donde aparezca| `banana peel`| nombres, títulos, descripciones y contenido.
| las palabras *plátano*, piel y *resbaladiza* donde aparezcan juntas sin importar el orden o la posición en que lo hagan| `banana AND peel AND slippery`| nombres, títulos, descripciones y contenido.
| contenido donde aparezca cualquiera de las palabras *plátano*, piel y *resbaladiza*| `banana peel slippery` <br><br>or<br><br>`banana OR peel OR slippery`| nombres, títulos, descripciones y contenido.
| la palabra *plátano* cuando aparezca en un título| `title:banana`| títulos
| la palabra *plátano* cuando aparezca en un nombre| `name:banana`| nombres de carpetas y elementos de contenido de la biblioteca, títulos de páginas wiki
| la palabra *plátano* cuando aparezca en la descripción| `description:banana`| descripciones de carpetas y elementos de contenido de la biblioteca, descripciones de listas de datos
| la palabra *plátano* cuando aparezca en el contenido de un sitio| `TEXT:banana`| páginas wiki, entradas de blog, elementos de contenido y elementos y respuestas de discusiones
| contenido creado el 26 de septiembre de 2011| `created:"2011-09-26"`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido, eventos, enlaces, temas de discusiones y listas de datos Puede buscar por año o, incluso, por mes y día para hacerlo más específico.
| contenido creado entre el 26 y el 30 de septiembre de 2011| `created:["2011-09-26" to "2011-09-30"]`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido, eventos, enlaces, temas de discusiones y listas de datos Puede buscar por año o, incluso, por mes y día para hacerlo más específico.
| cualquier contenido modificado el 26 de septiembre de 2011| `modified:"2011-09-26"`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido, eventos, enlaces, temas de discusiones y listas de datos Puede buscar por año o, incluso, por mes y día para hacerlo más específico.
| cualquier contenido modificado entre el 26 y el 30 de septiembre de 2011| `modified:["2011-09-26" to "2011-09-30"]`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido, eventos, enlaces, temas de discusiones y listas de datos Puede buscar por año o, incluso, por mes y día para hacerlo más específico.
| cualquier contenido creado por un usuario concreto| `creator:<username>`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido, eventos, enlaces, temas de discusiones y listas de datos
| cualquier contenido modificado por un usuario concreto| `modifier:<username>`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido, eventos, enlaces, temas de discusiones y listas de datos
| any content containing the letter sequence *use*. Entre los resultados habrá referencias a *cargar*, *descargar*, *cargador*, etc.| `TEXT:*use*`| páginas wiki, entradas de blog, carpetas de la biblioteca, elementos de contenido y temas de discusiones

## Using the Site Finder {#sitefinder}

Para buscar sitios, puede utilizar el cuadro de búsqueda de la barra de herramientas o el Buscador de sitios, que proporciona información más detallada sobre el sitio.

Desde los resultados de búsqueda puede navegar a un sitio y hacerse miembro, así como eliminar el sitio (solo administradores).

1. Abra el menú **Sitios** y haga clic en  **Buscador de sitios**.

2. Escriba el nombre completo de un sitio, o parte de él, en el cuadro de búsqueda.
   
   > **Tip:** Deje en blanco el cuadro de búsqueda para que se muestren todos los sitios a los que tiene permiso de acceso.
   
   The search looks for sites starting with your search criteria, so entering the search criteria `awe` won't find the site *Project Awesome*. If you add `*`, so your search criteria is `*awe`, then you will find the site.

3. Haga clic en **Buscar**.
   
   Se mostrará una lista de sitios que coinciden con sus criterios de búsqueda. Esta lista incluye sitios públicos, sitios moderados, sitios que ha creado y sitios privados de los que es miembro. A la derecha de un sitio, las acciones **Unirse** y **Solicitar unirse** indican que no es miembro de ese sitio; la acción **Abandonar** indica que es miembro del sitio.

## Using the People Finder {#peoplefinder}

Para buscar usuarios, puede utilizar el cuadro de búsqueda de la barra de herramientas o el Buscador de personas, que proporciona información más detallada sobre el usuario.

Cuando encuentre al usuario que busca puede utilizar la opción Seguir/Dejar de seguir. También puede ver su perfil de usuario.

1. En la barra de herramientas, haga clic en **Personas**.

2. Escriba un nombre completo o parte de un nombre en el cuadro de búsqueda.
   
   Tiene que escribir, como mínimo, un carácter. La búsqueda no distingue entre mayúsculas y minúsculas.
   
   The search looks for user names starting with your search criteria, so entering the search criteria 1 won't find the user User1. If you add `*`, so your search criteria is `*1`, then you will find the user.
   
   **Note:** Consulte los consejos de búsqueda que aparecen en la página Buscador de personas para llevar a cabo búsquedas más complejas.

3. Haga clic en **Buscar**.

4. En la lista de resultados, haga clic en el nombre de un usuario para mostrar su perfil de usuario.

### Revisar un perfil de usuario

Cuando busca un usuario, puede ver los detalles de su perfil.

Los detalles del perfil están organizados en varias páginas:

* **Info**: Muestra los datos personales del usuario, incluidos los datos de contacto, detalles de la empresa y una foto.
* **Sites**: Lista de sitios a los que pertenece el usuario.
* **Contenido**: Muestra dos listas con detalles de la actividad reciente del usuario en el sitio. La lista **Añadidos recientemente** muestra los tres últimos elementos de contenido que ha añadido el usuario a un sitio, por ejemplo, páginas wiki, entradas del blog, contenidos de la biblioteca o discusiones. La lista **Modificados recientemente** muestra los tres últimos elementos de contenido que ha editado el usuario.
* **Following (#)**: Displays a list of people the user is following.The number to the right of the page label indicates how many people are currently being followed by this user. Si el usuario ha marcado su lista como privada, esta página no aparecerá en su perfil.

## Using the Advanced Search {#advancedsearch}

Use el cuadro de búsqueda de la barra de herramientas para acceder a la búsqueda avanzada.

1. Click !\[Advanced Search icon]({% link content-services/images/advanced-search-icon.png %}) in the search box then click **Advanced Search**.
   
   Se mostrará la pantalla Búsqueda avanzada.

2. Elija un tipo de búsqueda:
   
   * **Contenido**: para buscar cualquier tipo de contenido
   * **Carpetas**: para buscar todas las carpetas y contenedores, por ejemplo, carpetas de la biblioteca o listas de datos

3. Introduzca sus criterios de búsqueda.
   
   Si dese buscar por fecha de modificación, haga clic en el icono Calendario para seleccionar una fecha.
   
   Para buscar en función del usuario que hizo las últimas modificaciones al contenido, escriba el nombre de usuario correcto en el campo **Modificador**.
   
   **Tip:** You can type `*` to complete a word if you don't know the full word you're searching for. For example, both `*resco` and `alf*` will show results for `alfresco`.

4. Haga clic en **Buscar**.
   
   Se mostrarán todos los ficheros y carpetas devueltos por la búsqueda. Ahora podrá hacer lo siguiente:
   
   * Hacer clic en un resultado para abrirlo.
   * Hacer clic en una o varias opciones de filtro para activarlas y desactivarlas, y restringir así los resultados de la búsqueda.
   * Mantener el cursor sobre un resultado, hacer clic en **Acciones** y seleccionar una opción del menú.
   
   > **Tip:** Puede eliminar un fichero de este modo, pero los resultados no se actualizarán hasta que realice una nueva búsqueda