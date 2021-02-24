---
author: Alfresco Documentation
---

# Maven Alfresco SDK with Eclipse

The Maven Alfresco SDK is designed to work well with Eclipse. This support includes the ability to import existing Maven projects into Eclipse.

This task assumes you have Maven and Eclipse installed, and you have carried out the procedure documented in [Maven Alfresco SDK Quick Start](dev-extensions-maven-sdk-quick-start.md).

You will see here how to import an existing Maven project into Eclipse.

1.  In Eclipse, from the main menu select **File** \> **Import** \> **Maven** \> **Existing Maven Projects**.

2.  Click **Next**.

3.  Navigate to the directory where your Maven projects are located. For example, the maven\_projects.

4.  Click **Next**.

    The projects to be imported will be listed.

5.  Select a project or projects as required and click Next.

6.  The **Setup Maven plugin connectors** dialog will be displayed. The `alfresco-maven-plugin:1.11:set-version` plugin will display an error. You can fix this later \(it is not a significant error\).

7.  Click **Finish**.

    The selected projects will be imported.

8.  You can now fix the plugin errors identified previously. Right-click on the error and select **Quick Fix**.

9.  Select **Permanently mark goal set-version in pom.xml as ignored in Eclipse build** then click **Finish**.

10. Select your pom.xml location and click **OK**.

11. You may see another error “Project configuration is not up-to-date with pom.xml”. To fix this right-click on the project with the error and select **Maven** \> **Update Project**, ensure the project is selected and then click **OK**.


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

