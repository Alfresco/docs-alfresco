---
author: Alfresco Documentation
---

# Using JRebel on the command line

JRebel can be used with the Maven Alfresco SDK to implement Test Driven Development \(TDD\).This tutorial looks at using the Maven Alfresco SDK with JRebel without an IDE.

You should first complete the tutorial to [create a simple AMP project](dev-extensions-maven-sdk-tutorials-amp-archetype.md) before attempting this tutorial, as you will need a simple AMP project to work with. If you prefer, you can create a fresh project to work with using the guidelines given in the tutorial. This tutorial will assume you have a simple AMP project created in the directory simple-module-project.

You will see how to install JRebel and then configure the Maven Alfresco SDK to use it in your Test Driven Development. In this tutorial you will see configuration for the command line.

1.  Import your simple AMP project into Eclipse if you have not already done so, using the instructions in the tutorial [Maven Alfresco SDK with Eclipse](dev-extensions-maven-sdk-eclipse.md) as your guide.

2.  There are two distributions of JRebel can that be installed at this point. You can choose to install a command line version, or a version integrated with your IDE. You will see how to run the command-line version of JRebel in this tutorial.
3.  If you do not already have JRebel installed, visit the [official website](http://zeroturnaround.com/software/jrebel/download/) and download the current stable version of JRebel. You will also need to obtain an activation key from ZeroTurnaround.

4.  Once downloaded, unzip JRebel into a suitable location, and then run bin/activate-gui.sh. In the dialog displayed, copy your activation key and then complete the registration.

5.  You now need to make an addition to your `MAVEN_OPTS` environment variable. [Modify your `MAVEN_OPTS` variable](dev-extensions-maven-sdk-maven-opts.md) to include the following additional option `-javaagent:/path/to/jrebel/jrebel.jar`.

    **Important:** You will need to modify this option so that it reflects the actual location on your specific system where the jrebel.jar file is installed to.

6.  Change into the `simple-module-project` directory and type the following command to build and run your project:

    ```
    
    
      mvn clean install -Pamp-to-war,rad                  
                        
                    
    ```

    **Attention:** Note the use of the `rad` profile, which is used for Rapid Application Development.

    **Attention:** If you have correctly installed JRebel, and configured your `MAVEN_OPTS` correctly, you will see a number of JRebel monitoring messages in the terminal window.

7.  Once the application has fully started you can log into Alfresco Explorer at `http://localhost:8080/alfresco`. This will provide validation that Alfresco is running.

8.  Load the file src/test/java/org/alfresco/demoamp/test/DemoComponentTest.java into an editor of your choice.

9.  Now you will introduce a deliberate error into the test code, and re-run the test. In the DemoComponentTest.java source code, locate the `testGetCompanyHome()` method.

10. Locate the following line of code:

    ```
    
                            
        assertEquals("Company Home", companyHomeName);                        
                            
                        
    ```

11. Change the code to the following:

    ```
    
                            
        assertEquals("Company Hotel", companyHomeName);                        
                            
                        
    ```

    This will cause the test to fail when it is re-run.

12. Run the test.

    After a short interval the test will fail.

13. Change the code back to remove the error. Save your changes.

14. Re-run the test.

    The test will run very quickly \(without any reloading of the application server\).


You have seen that the Maven Alfresco SDK integrates painlessly with JRebel. This helps to create a Test Driven Development environment, where code changes and tests can be carried out without the time-consuming necessity for application server restarts.

**Parent topic:**[Using JRebel](../concepts/dev-extensions-maven-sdk-tutorials-jrebel-intro.md)

