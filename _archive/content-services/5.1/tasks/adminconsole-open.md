---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Launching the Admin Console

The Admin Console runs externally to the Alfresco user interface and therefore you launch the application independently. This allows you to run the Admin Console without the need to run Alfresco Share.

Ensure that the Alfresco server is running.

1.  Enter the following URL in a browser window:

    ```
    http://<your-host-name>:<alfresco-port>/alfresco/service/enterprise/admin
    ```

    Where `<your-host-name>` is the host name where you are running the Alfresco server and `<alfresco-port>` is the port number on which the Alfresco server is running \(by default, the port number is `8080`\).

    An Authentication Required prompt displays, showing the IP address or name and the port number of the Alfresco server.

2.  Enter your Alfresco user name and password.

    Your user name and password must be for an account with administrator permissions. The default administrator user name is admin.

    The Admin Console displays in a browser window. The title bar shows the host name and its IP address.

    You will remain logged into the Admin Console for the duration of the browser session. If you close the browser window completely and then connect to the Admin Console using the URL, you will be prompted to enter your Alfresco account details again.

    A useful starting point in the Admin Console is the [System Summary](../concepts/adminconsole-systemsummary-community.md) page, which gives an overview of the which settings are enabled or disabled.


**Parent topic:**[Using the Admin Console](../concepts/at-adminconsole.md)

**Related information**  


[Starting and stopping Alfresco](../concepts/start-stop-intro.md)

