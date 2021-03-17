---
author: Alfresco Documentation
---

# Configuring support for Enterprise artifacts

This task demonstrates how you can configure a Maven project to use the Alfresco Enterprise artifacts, rather than the Community artifacts.

You need to have completed the previous tutorial.

In this tutorial you will create a new project that uses Enterprise artifacts. The project pom.xml file needs to be edited to add two pieces of information. Firstly, the `alfresco.groupId` and `alfresco.version` properties need to be set correctly according to the convention explained in the [overview](../concepts/dev-extensions-maven-sdk-tutorials-alfresco-enterprise.md). Secondly, you need to add some configuration that tells Maven which repository you wish to connect to in order to retrieve artifacts. You can actually reference several repositories, but it is worth noting that the Alfresco Private Repository also includes all artifacts offered by the Alfresco Public Repository. In this case it is therefore only necessary to include configuration for the private repository, rather than both the private and public repositories. In this tutorial you will perform the following:

1.  Build a new sample project using the default settings \(this will specify Community artifacts\).
2.  Modify the values for the properties `alfresco.groupId` and `alfresco.version` to specify Enterprise artifacts.
3.  Add configuration to reference the Alfresco Private Repository.
4.  Build an all in one project that uses Alfresco Enterprise Edition.

In this tutorial you will configure your project to use 4.2.0 Enterprise artifacts.

1.  In the maven\_projects directory type the following command:

    ```
    
    mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -Dfilter=org.alfresco.maven.archetype:
                        
    ```

2.  Select the `All-in-One Archetype`, which is option 2.

3.  Select the default archetype version number.

4.  For the `groupId` enter `com.alfresco.tutorials`.

5.  For the `artifactId` enter `my-enterprise-project`.

6.  Accept the default archetype version by pressing **Enter**.

7.  Accept the default Alfresco version by pressing **Enter**.

    The project will be built in the my-enterprise-project directory.

8.  Change into the my-enterprise-project project directory.

9.  Load the pom.xml file into your editor.

10. Locate the property `alfresco.groupId`. Modify it to have the value `org.alfresco`, if not already.

11. Locate the property `alfresco.version`. Modify it to have the value `4.2.0`. This specifies 4.2.0 Enterprise edition.

12. Search the file for the <repositories\> section. Find the following repository configuration:

    ```
    
        <repository>
            <id>alfresco-public</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
        </repository>                        
                            
    ```

    This configuration causes Maven to access the Alfresco public repository. Modify this section to the following:

    ```
    
                            
        <repository>
            <id>alfresco-private-repository</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/private</url>
        </repository>                        
                        
                        
    ```

    The key point to note here is that the id is the one specified in the settings.xml file, that you added in the previous tutorial. Note also the slightly different URL.

13. Save your pom.xml file.

    You are now ready to build your project.

14. This step is only required if you had previously built this project using Community artifacts, and now want to build as Enterprise. You need to make sure that the built databases are effectively cleaned from the project. You can do this by typing the following:

    ```
    
            mvn clean -Ppurge
            
    ```

    If you had previously built the project as Community and missed this step, then you will see strange behaviors. For example, the Alfresco Enterprise may be brought up in Read Only mode due to license issues. Another possibility is that when checking the About box the Community graphics would be used, whilst the information states an Enterprise build is running. To avoid this it is worth doing this step just to be on the safe side. If you have been following this tutorial exactly and had not built a Community build prior to changing the configuration, then this step is not required, as you are yet to do a build.

15. In the project directory type `mvn install`.

    This will build the project, downloading Enterprise artifacts from the Alfresco private repository as required.

16. Once you have BUILD SUCCESS you can run your project by typing `mvn install -Prun` - this selects the `run` profile.

17. Once the application is running you can point your web browser at `http://localhost:8080/share`.

    You might need to wait some time before Alfresco has fully started.

18. Log into Share using the username `admin` and password `admin`.

19. Once logged into Share your dashboard is displayed. Scroll to the bottom of the page and click on the Alfresco logo. This will display an information dialog.

20. Note that the version displayed is Alfresco Enterprise 4.2.0.

    You have successfully completed all requirements to build and run Alfresco Enterprise using the Maven Alfresco SDK.


**Parent topic:**[Maven and Alfresco Enterprise](../concepts/dev-extensions-maven-sdk-tutorials-alfresco-enterprise.md)

