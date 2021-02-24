---
author: Alfresco Documentation
---

# Creating a Share project with Eclipse

The integration between the Maven Alfresco SDK and Eclipse allows you to create new projects conveniently from within the IDE. This tutorial focuses on creating a Share customization project from within the Eclipse IDE.

You need to have Eclipse installed, as well as the [Maven Alfresco SDK pre-requisites](../concepts/dev-extensions-maven-sdk-requirements.md).

When delivering Share tier customizations it is important to understand that these customizations need to be deployed in the share.war file, not the alfresco.war file as is done for repository tier customizations. Additionally, a Share project will have certain dependencies, such as the Spring Framework.

1.  In, Eclipse, select **File** \> **Other** \> **Maven** \> **New Maven Project** from the main menu, and click **Next**.

2.  Clear **default Workspace location** checkbox.

3.  Click **Browse** and navigate to the maven\_projects directory, then click **Next**.

    The Select an Archetype dialog will appear.

4.  Click the **Configure...** button, this loads up a Preferences dialog.

5.  Click the **Add Remote Catalog...** button, the Remote Archetype Catalog is displayed.

6.  In the Remote Archetype Catalog dialog enter https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml into the **Catalog File** field and Alfresco Archetypes into the **Description** field.

7.  In the Remote Archetype Catalog dialog click **OK**.

8.  In the Preferences dialog click **OK** to close the dialog.

9.  In the New Maven Project dialog, from the **Catalog** drop-down menu select Alfresco Archetypes.

    This will cause a list of archetypes to be displayed in the dialog.

10. In the **Filter** box enter org.alfresco.maven.archetype.

    The Alfresco All-in-One and the Alfresco AMP archetypes will be listed.

11. Select the Alfresco AMP archetype in the filtered list, then click **Next**.

12. For `groupId` enter `com.alfresco.tutorials`.

13. For the `artifactId` enter `share-eclipse-project`.

14. Change the property `alfresco_target_amp_client_war` from `alfresco` to `share` and click **Finish**.

    The new project will be created.

15. Check that `alfresco.client.war` has been correctly set to share by loading your project pom.xml file into the editor. Search for `alfresco.client.war` and check its value is `share`.

    **Attention:** If you would like to see a graphical view of the pom.xml file, rather than the raw XML, you can right-click on the pom.xml file and select **Open with POM Editor**. This will give you a graphical representation of the POM file in the IDE.

16. In the Eclipse Package Explorer, right-click on the newly created project and select **Run As** \> **Maven install**.

    This will run the Maven build process. You will see progress reported in the Console window. Once `BUILD SUCCESS` has been reported you can run your project.

17. Right-click the project in the Package Explorer and select **Maven Build...**. This will allow you set set up a Run Configuration.

18. Enter a unique name for the Run Configuration such as `share-eclipse-project-run`.

19. For **Goal** enter `integration-test`.

20. For **Profile** enter `amp-to-war`.

21. Click **Add...** to add a new parameter name and value. You will enter a parameter name of `maven.tomcat.port` with a value of `8081`.

    This causes Share to listen on the 8081 port. To fully use Share \(to be able to log in and so on, you will also need a repository project running at the same time, and this will be on port 8080 by default.\)

22. Click the **JRE** tab. You need to set some memory options for the JRE so that you don't get Out of Memory errors when running your application.

23. In the VM arguments box enter `-Xms1024m -Xmx4096m -XX:PermSize=1024m`.

24. Click the **Run** button.

    Your project will now run.

25. In order for Share to work you need an Alfresco repository running. You can run one from the command line using a previously created project such as the [Quick Start](dev-extensions-maven-sdk-quick-start.md) project.

26. Once both servers have fully started you can point your web browser at `http://localhost:8081/share` and login using username `admin`, password `admin`.

    This has tested out your setup. You can now make any required changes and additions to your project in the Eclipse IDE, and build and run your project as required.


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

