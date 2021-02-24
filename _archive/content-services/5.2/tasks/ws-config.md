---
author: Alfresco Documentation
---

# Configuring a web script

When developing a web script, you can implement capabilities that provide flexibility in how they behave. The Web Script Framework supports this by allowing each web script to carry a configuration file, which the web script can interrogate to alter its behavior.

This task demonstrates how to create a web script whose response is driven by a configuration file.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click on the Repository link in the Share header.

3.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

4.  Create a web script description document for your configuration sample:

    1.  In the Create menu, select XML.

    2.  Enter the name for the web script in the **Name** field as:

        ```
        configuration.get.desc.xml
        ```

    3.  Type the following in the content box:

        ```
        
        <webscript>
          <shortname>Configuration Sample</shortname>
          <description>Response driven from configuration</description>
          <url>/config</url>
          <authentication>user</authentication>
        </webscript>
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Create a configuration file for your configuration sample:

    1.  In the Create menu, select **XML**.

    2.  Enter the name in the **Name** field:

        ```
        configuration.get.config.xml
        ```

    3.  Type the following in the content box:

        ```
        
        <greeting>
          <text>Hello</text>
          <repeat>3</repeat>
        </greeting>
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

6.  Create a controller script for your configuration sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the **Name** field:

        ```
        configuration.get.js
        ```

    3.  Type the following in the content box:

        ```
        
        var greeting = new XML(config.script); 
        model.repeat = parseInt(greeting.repeat);
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

7.  Create a response template for your configuration sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the **Name** field, such as:

        ```
        configuration.get.html.ftl
        ```

    3.  Type the following in the content box:

        ```
        
        <#list 1..repeat as i>
            ${config.script.greeting.text}
        </#list>
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

8.  Register the web script with Alfresco Content Services.

    1.  In a web browser, create a new tab.

    2.  In the newly created tab, enter the URL: `http://localhost:8080/alfresco/service/index`

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**. The number of web scripts available will increment.

    The configuration file name `configuration.get.config.xml` adheres to the naming convention defined by the Web Script Framework. Configuration file names are structured as:

    ```
    <web script id>.<http method>.config.xml
    ```

    The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document. The `<http method>` specifies which HTTP method initiates the web script and must be the same as the associated web script description document.

    Finally, all configuration file names must end with `.config.xml`, which indicates to the Web Script Framework that the file is a configuration file.

    Configuration is expressed as any valid XML. In your sample, you specify the greeting text to render and the number of times to repeat the greeting. Controller scripts access the configuration XML through the root object named `config.script`. Additionally, E4X, a JavaScript XML API, is used to traverse the XML structure and extract values.

    ```
    ...
    var greeting = new XML(config.script); 
    model.repeat = greeting.repeat; 
    ... 
    ```

    Your sample extracts the number of times to repeat the greeting from the configuration XML and places the value into the Web script model with the name `repeat`.

9.  Test your configuration sample by typing the following in your command line:

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

**Parent topic:**[Web Script tutorials](../tasks/ws-tutorials.md)

