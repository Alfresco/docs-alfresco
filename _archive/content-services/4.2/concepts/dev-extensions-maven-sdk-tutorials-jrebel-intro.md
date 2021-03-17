---
author: Alfresco Documentation
---

# Using JRebel

Using JRebel for Test Driven Development \(TDD\)

One of the problems with developing Java applications for Alfresco is that very often it is necessary to restart the application server after making changes to Java source code. This slows down the development time considerably. One solution to this is to use a "hot deploy" technology such as JRebel.

[JRebel](http://www.zeroturnaround.com) allows you to change code and hot deploy it, without having to restart the Application Server \(such as Tomcat\).

This significantly reduces development time, as code changes can be "hot deployed", without the need for application server restarts. This allows a Test Driven Development approach, as changes can be made to code, tests run, and the changes verified, without the need for time-consuming restarts.

There are two versions of this tutorial, the first looks at using JRebel where you prefer a command line approach to building and running your project. The second looks at using JRebel with the Eclipse IDE. Note that you can actually use JRebel in both scenarios, so you can use the Maven Alfresco SDK and JRebel both on the command line and in Eclipse with the same project.

-   **[Using JRebel on the command line](../tasks/dev-extensions-maven-sdk-tutorials-jrebel-tdd.md)**  
JRebel can be used with the Maven Alfresco SDK to implement Test Driven Development \(TDD\).
-   **[Using JRebel in Eclipse](../tasks/dev-extensions-maven-sdk-tutorials-jrebel-tdd-eclipse.md)**  
JRebel can be used with the Maven Alfresco SDK and Eclipse to implement Test Driven Development \(TDD\).

**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

