---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, internationalization, I18N]
---

# Creating resource bundles supporting I18N

The Web Script Framework allows text to be placed into resource bundles, where a resource bundle exists for each supported language.

This task creates a simple web script that renders an HTML message.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the org space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the `example` space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

    4.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

5.  Create a web script description document for your I18N sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as: i18n.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
          <shortname>I18N Sample</shortname>
          <description>Internationalization Sample</description>
          <url>/i18n</url>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a default message bundle for your I18N sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: i18n.get.properties

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        greeting=Hello

        farewell=Goodbye

7.  Create a response template for your I18N sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: i18n.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        $\{msg\("greeting"\)\}. $\{msg\("farewell"\)\}

8.  Register the I18N web script with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**. A message indicates there is one additional web script.

9.  Test your response template to ensure it is rendering values from the default resource bundle by type the following in your command line: curl "http://localhost:8080/alfresco/service/i18n"

    The response is: `Hello. Goodbye.`


The web script response template uses the `msg` method to render text whose value is taken from the resource bundle associated with the required language. Resource bundles contain one or more messages, each identified by a name; this is the name passed to the `msg` method. The example refers to the messages `greeting` and `farewell`.

Each resource bundle adheres to the naming convention defined by the Web Script Framework, which are structured as follows: `<web script id>.<http method>[_<locale>].properties`

The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated Web script description document. The `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.

The optional `<locale>` identifies the language for which this resource bundle applies. If not specified, the resource bundle is treated as the fallback set of values if no other relevant resource bundle for the required language can be found.

Finally, all resource bundle file names end with `.properties`. This indicates to the Web Script Framework that the file is a resource bundle.

**Parent topic:**[Internationalization \(I18N\)](../concepts/ws-I18N.md)

