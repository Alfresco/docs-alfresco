---
author: Alfresco Documentation
---

# Returning a JSON response format

While a web script that returns HTML \(such as the Hello World sample web script\) is fine for rendering a user interface, it is not so good for a data web script that needs to returns a format that is machine-readable, such as JSON. \(JSON, short for JavaScript Object Notation, is a lightweight data interchange format, often used for transmitting structured data over a network connection.\)

A web script can offer multiple response formats where each format is supported by its own response template. Clients that invoke the web script either rely on the default response format or can explicitly ask for a specific response format.

Add another response format to the Hello User web script that returns the greeting in JSON format.

1.  Log in to Alfresco Share.

    1.  Type `http://localhost:8080/share` in the web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click the Repository link in the Share header.

    4.  Navigate to **Data Dictionary \> Web Scripts Extensions**.

2.  Create a new web script response template to render the Hello User greeting in JSON.

    1.  In the Create menu, select Plain Text.

    2.  Enter `hellouser.get.json.ftl` as the template name in the **Name** field.

    3.  Type the following in the Enter Content box.

        ```
        {greeting: "hello", user: "${person.properties.userName}"}
        ```

    4.  Click **Create**.

    5.  Navigate back to the Web Scripts Extensions folder by clicking on it in the bread crumb trail.

3.  Re-register the Hello User web script with Alfresco Content Services.

    1.  Open a new browser tab.

    2.  In the new tab, navigate to `http://localhost:8080/alfresco/service/index` in the web browser.

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

    A message indicates there is *no* additional web script \(just a response format has been added\).

4.  Finally, type the following on the command line to test the web script.

    ```
    curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser.json"
    ```

    The message \{greeting: "hello", user: "admin"\} displays indicating your web script is working.


**Parent topic:**[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

**Related information**  


[Creating a Hello World web script](ws-hello-world-create.md)

[Creating a Hello User web script](ws-hello-user-create.md)

