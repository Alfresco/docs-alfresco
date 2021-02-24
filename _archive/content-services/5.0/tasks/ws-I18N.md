---
author: Alfresco Documentation
---

# Creating resource bundles supporting i18n

The Web Script Framework allows text to be placed into resource bundles, where a resource bundle exists for each supported language.

This task creates a simple web script that renders an HTML message.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a web script description document for your i18n sample:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field: `i18n.get.desc.xml`

    3.  Type the following in the content box:

        ```
        <webscript>
          <shortname>I18n Sample</shortname>
          <description>Internationalization Sample</description>
          <url>/i18n</url>
        </webscript>
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

4.  Create a default message bundle for your i18n sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field: `i18n.get.properties`

    3.  Type the following in the content box:

        ```
        greeting=Hello
        farewell=Goodbye
        ```

    4.  Click **Create**.

5.  Create a response template for your i18n sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field: `i18n.get.html.ftl`

    3.  Type the following in the content box:

        ```
        ${msg("greeting")}. ${msg("farewell")}
        ```

    4.  Click **Create**.

    5.  Navigate back to org/example using the breadcrumb trail.

6.  Register the i18n web script with Alfresco.

    1.  In a web browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click **Refresh Web Scripts**. A message indicates there is one additional web script.

7.  Test your response template to ensure it is rendering values from the default resource bundle by type the following in your command line: `curl "http://localhost:8080/alfresco/service/i18n"`

    The response is: `Hello. Goodbye.`


The web script response template uses the `msg` method to render text whose value is taken from the resource bundle associated with the required language. Resource bundles contain one or more messages, each identified by a name; this is the name passed to the `msg` method. The example refers to the messages `greeting` and `farewell`.

Each resource bundle adheres to the naming convention defined by the Web Script Framework, which are structured as follows: `<web script id>.<http method>[_<locale>].properties`

The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated Web script description document. The `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.

The optional `<locale>` identifies the language for which this resource bundle applies. If not specified, the resource bundle is treated as the fallback set of values if no other relevant resource bundle for the required language can be found.

Finally, all resource bundle file names end with `.properties`. This indicates to the Web Script Framework that the file is a resource bundle.

**Parent topic:**[Internationalization \(i18n\)](../concepts/ws-I18N.md)

