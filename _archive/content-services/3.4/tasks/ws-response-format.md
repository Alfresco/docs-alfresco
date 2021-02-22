---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Web Scripts
option: JSON
---

# Returning a JSON response format

While a web script that returns HTML \(such as the Hello World sample web script\) is fine for rendering a user interface, it is not so good for a data web script that needs to returns a format that is machine-readable, such as JSON. \(JSON, short for JavaScript Object Notation, is a lightweight data interchange format, often used for transmitting structured data over a network connection.\)

A web script may offer multiple response formats where each format is supported by its own response template. Clients that invoke the web script either rely on the default response format or can explicitly ask for a specific response format.

Add another response format to the Hello User web script that returns the greeting in JSON format.

1.  Log in to Alfresco Explorer.

    1.  Type http://localhost:8080/alfresco in the web browser.

    2.  If prompted, log in with the user name admin and password admin.

    3.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

2.  Create a new web script response template to render the Hello User greeting in JSON.

    1.  In the Create menu, click **Create Content**.

    2.  Enter hellouser.get.json.ftl as the template name in the **Name** field.

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type \{greeting: "hello", user: "$\{person.properties.userName\}"\} in the Enter Content box.

    6.  Click **Next**.

    7.  Click **Finish**.

    8.  Click **OK**.

3.  Re-register the Hello User web script with Alfresco.

    1.  Type http://localhost:8080/alfresco/service/index in the web browser.

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    A message indicates there is one additional web script.

4.  Finally, type curl –uadmin:admin "http://localhost:8080/alfresco/service/hellouser.json" in the web browser to test the web script.

    The message \{greeting: "hello", user: "admin"\} displays indicating your web script is working.


**Parent topic:**[Creating a Hello User web script with authentication](../tasks/ws-hello-user-create.md)

**Related information**  


[Creating a Hello World web script](ws-hello-world-create.md)

