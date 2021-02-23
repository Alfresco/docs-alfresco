---
author: Alfresco Documentation
---

# Using JRebel in Eclipse

JRebel can be used with the Maven Alfresco SDK and Eclipse to implement Test Driven Development \(TDD\).

You should complete the tutorial to [create a simple AMP project](dev-extensions-maven-sdk-tutorials-amp-archetype.md) before attempting this tutorial, as you will need a simple AMP project to work with. If you prefer, you can create a fresh project to work with using the guidelines given in the tutorial. This tutorial will assume you have a simple AMP project created in the directory simple-module-project.

You will see how to install JRebel in Eclipse and then configure the Maven Alfresco SDK to use it in your Test Driven Development. You will see configuration for IDE-based execution of your project. This tutorial assumes you will be using Eclipse as your IDE.

1.  Import your simple AMP project into Eclipse if you have not already done so, using the instructions in the tutorial [Maven Alfresco SDK with Eclipse](dev-extensions-maven-sdk-eclipse.md) as your guide.

2.  You now need to make sure JRebel for Eclipse is installed. For instructions on how to do that review the [Eclipse tutorial](http://manuals.zeroturnaround.com/jrebel/ide/eclipse.html) at the ZeroTurnaround site.

    **Attention:** JRebel is most conveniently installed via the Eclipse Market Place.

    At this point you have JRebel installed and a suitable license activated.

3.  In Eclipse you need to connect JRebel to your project. Open the JRebel Config Center by selecting **Window** \> **Open Perspective** \> **Other** \> **JRebel Config Center** from the Eclipse main menu.

4.  In the Projects panel select the checkbox for `simple-module-project`.

    **Attention:** You will also have to enable the JRebel JAR for the Run Configuration associated with your project, if you are going to be running your project in Eclipse. You will see how to do this shortly.

    You have now made JRebel in Eclipse aware of your project.

5.  Switch back to your default perspective \(most likely Java EE\).

6.  Create a Run Configuration for your project. From the Eclipse main menu select **Run** \> **Run Configurations...**

7.  Locate **Maven Build** in the left panel and click it. Click the **Create New Launch Configuration** icon, which is located at the top left of the dialog.

    The right-hand side of the dialog will be populated with a multi-tab panel.

8.  For the **Name** text field enter `MAVEN RAD` for the profile name.

9.  Click in the **Browse Workspace...** button and select your project \(`simple-module-project`\).

10. In the **Goals** text field enter `clean install`.

    This will cause the Maven goals `clean` and `install` to be executed when you run the launch configuration.

11. In the **Profiles** text field enter `amp-to-war, rad`.

    This will cause the `amp-to-war` and `rad` profiles to be executed when the launch profile is run. Note that the `rad` profile stands for Rapid Application Development, and is the key profile that will allow you to make best use of JRebel in your project.

12. Click **Apply**.

13. Click the **JRE** tab. You now need to copy the following JVM options into the **VM arguments** box:

    ```
    
                
        -Xms1024m -Xmx4096m -XX:PermSize=1024m            
                
            
    ```

    **Note:** These options will ensure that your project will not crash with `PermGen space` exceptions.

14. Click **Apply**.

15. Click the **JRebel** tab to the right of the panel. You will see two check boxes. Ensure that the Enable JRebel agent check box is selected.

    **Important:** Without this step, JRebel will not be activated for this configuration.

16. Click **Apply**.

17. Click **Run** to run the configuration.

18. Once the application has fully started you can log into Alfresco Explorer at `http://localhost:8080/alfresco`. This will provide validation that Alfresco is running.

19. Now switch back to Eclipse. In the Package Explorer expand the `simple-module-project` and expand `src/test/java` to locate the file DemoComponentTest.java.

20. Right-click DemoComponentTest.java and select **Run As** \> **JUnit Test**.

    In the Eclipse Console tab you will see a number of JRebel monitoring messages as the context loads, but this is only required the first time your test runs.

21. Switch to the JUnit tab to see the results of running the test.

    The test should show green, indicating it ran successfully.

22. For convenience, drag the JUnit tab so that it is continually viewable - underneath the Package Explorer is a convenient location.

23. Now you will introduce a deliberate error into the test code, and re-run the test. In the DemoComponentTest.java source code, locate the `testGetCompanyHome()` method.

24. Locate the following line of code:

    ```
    
                            
        assertEquals("Company Home", companyHomeName);                        
                   
                        
    ```

25. Change the code to the following:

    ```
    
                            
        assertEquals("Company Hotel", companyHomeName);                        
                            
                        
    ```

    This will cause the test to fail when it is re-run.

26. Right-click DemoComponentTest.java and select **Run As** \> **JUnit Test**.

    After a short interval the test will fail.

27. Change the code back to remove the error. Save your changes.

28. Re-run the test.

    The test will run very quickly \(without any reloading of the application server\).


You have seen that the Maven Alfresco SDK integrates painlessly with JRebel. This, combined with an IDE such as Eclipse, helps to to create a Test Driven Development environment, where code changes and tests can be carried out without the time-consuming necessity for application server restarts.

**Parent topic:**[Using JRebel](../concepts/dev-extensions-maven-sdk-tutorials-jrebel-intro.md)

