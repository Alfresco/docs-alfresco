---
author: Alfresco Documentation
---

# Remote debugging with Eclipse

It is possible to start an application ready for remote debugging by using the Maven `mvnDebug` command. Eclipse or other IDE can then connect to the running application for remote debugging.

Sometimes it is necessary to remote debug an application. For example if you want to debug an application running on Linux, but where the developer platform is Windows. The command `mvnDebug` can be used to start the application in remote debugging mode, where it will listen on port 8000 for a remote debugger.

1.  Change into the Maven project directory.

2.  Run `mvnDebug` rather than the `mvn` command.

    The Maven project will start and listen for a remote debugger on port 8000.

3.  In Eclipse, select **Run** \> **Debug Configurations** from the main menu.

4.  Select **Maven Build** and click the **New** icon on the top left of the dialog.

5.  Give the `Debug Configuration` a suitable name.

6.  For **Goals** enter `clean install`.

7.  For **Profile** enter `amp-to-war`.

8.  In the **Main** tab ensure that **Debug Output** is selected.

9.  Click **Apply**.

10. On the **JRE** tab add the following VM arguments: `-Xms1024m -Xmx4096m -XX:PermSize=1024m` to avoid `PermGen` exceptions.

11. Click **Apply**.

12. Click **Debug** to run the Debug Configuration.

13. In Eclipse, click the **Debug** perspective.


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

