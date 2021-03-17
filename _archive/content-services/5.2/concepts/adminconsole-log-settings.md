---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Log Settings

Use this tool to make changes to the log file in runtime and view the tail log.

Rather than making changes to the log file directly and restarting your server so they take effect, you can use this tool to make changes in runtime. These changes will persist until the server is shut down or restarted, at which point any changes will be lost.

Packages that are currently configured are displayed for services such as Tomcat and Java libraries.

You can:

-   Add a package to the log. Just enter the package name, select a log setting and click **Add**.
-   Change the setting for any packages in the log.
-   Click **Tail Log** to see the tail log. This can be useful if you don't have access to the console that you're running the repository on. You can select the refresh interval, switch off auto refresh, and download the log as a text file.

    **Note:** The default tail log is limited to 25,000 characters.


**Parent topic:**[Support Tools](../concepts/monitoring-intro.md)

**Related information**  


[Launching the Admin Console](../tasks/adminconsole-open.md)

