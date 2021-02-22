---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Launching the Admin Console

The Admin Console runs externally to the user interface and therefore you launch the application independently. This allows you to run the Admin Console without the need to run Alfresco Share.

Ensure that the Alfresco Content Services server is running.

1.  Enter the following URL in a browser window:

    ```
    http://<your-host-name>:<alfresco-port>/alfresco/service/enterprise/admin
    ```

    Where `<your-host-name>` is the host name where you are running the Alfresco Content Services server and `<alfresco-port>` is the port number on which the server is running \(by default, the port number is `8080`\).

    An Authentication Required prompt displays, showing the IP address or name and the port number of the server.

2.  Enter your user name and password.

    Your user name and password must be for an account with administrator permissions. The default administrator user name and password is admin.

    The Admin Console displays in a browser window. The title bar shows the host name and its IP address.

    You will remain logged into the Admin Console for the duration of the browser session. If you close the browser window completely and then connect to the Admin Console using the URL, you will be prompted to enter your account details again.

    A useful starting point in the Admin Console is the [System Summary](../concepts/adminconsole-systemsummary.md) page, which gives an overview of which settings are enabled or disabled.


**Parent topic:**[Using the Admin Console](../concepts/at-adminconsole.md)

**Related information**  


[Starting and stopping Alfresco Content Services](../concepts/start-stop-intro.md)

