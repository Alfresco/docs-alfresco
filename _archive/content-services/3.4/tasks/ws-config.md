---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, configuration]
---

# Configuring web scripts

When developing a web script, you can implement capabilities that provide flexibility in how they behave. The Web Script Framework supports this by allowing each web script to carry a configuration file, which the web script can interrogate to alter its behavior.

This task demonstrates how to create a web script whose response is driven by a configuration file.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the **org** space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the **example** space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

    4.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

5.  Create a web script description document for your configuration sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as: configuration.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
          <shortname>Configuration Sample</shortname>
          <description>Response driven from configuration</description>
          <url>/config</url>
          <authentication>user</authentication>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a configuration file for your configuration sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: configuration.get.config.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <greeting\>
          <text\>Hello</text\>
          <repeat\>3</repeat\>
        </greeting\>
        ```

7.  Create a controller script for your configuration sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: configuration.get.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        var greeting = new XML\(config.script\); 
        model.repeat = parseInt\(greeting.repeat\);
        ```

8.  Create a response template for your configuration sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: configuration.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <\#list 1..repeat as i\>
          $\{config.script.greeting.text\}
        </\#list\>
        ```

9.  Register the web script with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    The configuration file name `configuration.get.config.xml` adheres to the naming convention defined by the Web Script Framework. Configuration file names are structured as:

    `<web script id>.<http method>.config.xml`

    The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document. The `<http method>` specifies which HTTP method initiates the web script and must be the same as the associated web script description document. Finally, all configuration file names must end with `.config.xml`, which indicates to the Web Script Framework that the file is a configuration file.

    Configuration is expressed as any valid XML. In your sample, you specify the greeting text to render and the number of times to repeat the greeting. Controller scripts access the configuration XML through the root object named `config.script`. Additionally, E4X, a JavaScript XML API, is used to traverse the XML structure and extract values.

    ```
    ... 
    var greeting = new XML(config.script); 
    model.repeat = greeting.repeat; 
    ... 
    ```

    Your sample extracts the number of times to repeat the greeting from the configuration XML and places the value into the Web script model with the name `repeat`.

10. Test your configuration sample by typing the following in your command line:

    ```
    curl -uadmin:admin "http://localhost:8080/alfresco/service/config"
    ```

    The response is:

    ```
    Hello 
    Hello 
    Hello
    ```


You have altered the configuration by modifying the configuration XML file, or by creating a new configuration file of the same name in a web script location that comes earlier in the Web Script Framework search path.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

