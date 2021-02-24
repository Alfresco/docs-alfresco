---
author: Alfresco Documentation
---

# Creating a Surf project

A Surf project can be created most conveniently using the Alfresco SDK 2.0.

The Alfresco SDK, based on Maven, provides a simple way to create a fresh Surf project that you can work with and extend.

You need to have Maven installed. The version required is 3.2.2+. As Maven is a Java program, you will also need to have Java installed.

Surf projects require a number of configuration files and boiler plate code. The project directory hierarchy for a typical Surf project can also be quite daunting. To alleviate this problem, it is recommended that you create a Surf project using the Alfresco SDK. This will create a project structure for you, and populate all the required configuration files for you. Each of the files in the archetype are clearly documented. The Surf project archetype provides a convenient starting point for your own Surf projects.

1.  In the terminal run the following command:

    mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public-snapshots/archetype-catalog.xml

2.  Choose the Surf project archetype \(`spring-surf-archetype`\).

3.  When prompted for `groupId` enter `com.alfresco.tutorials`, or other suitable package name you would prefer.

4.  When prompted for `artifactId` enter a suitable project name such as `simple-surf-project`.

5.  If prompted for a `packageId` accept the default.

6.  The project will be created.

7.  Change into the directory created for you based on the artifactId. In this case it will be `simple-surf-project`.

8.  You can now build the project with the following command:

    ```
    
                            
        mvn install                    
                            
                        
    ```

9.  You can now run the project with the following command:

    ```
    
                            
        mvn jetty:run                    
                            
                        
    ```

10. Once the server has booted up you can point your web browser at `http://localhost:8080/` to see the Surf web site.

11. You can type a URL such as the following to further test the web site: `http://localhost:8080/page/home/welcome/tony`

12. You can now explore the project more conveniently by importing the project into an IDE such as Eclipse.
13. In Eclipse, select File, Import, and then select Existing Maven Project.

14. Browse to the simple-surf-project directory.

15. Click **Finish** to import the project into Eclipse.

    Now that the project is imported into Eclipse, you can use the Package Explorer to explore the directory hierarchy and files. Note that all the basic configuration files you need are present and heavily commented. You can use this project as the starting point for your own projects.


**Parent topic:**[Surf tutorials](../concepts/surf-tutorials.md)

