---
author: Alfresco Documentation
---

# All-in-One \(AIO\) archetype command reference

This describes the scripts and Maven commands that can be used on an Alfresco All-in-One \(AIO\) extension project based on the AIO archetype.

The All-in-One Alfresco project contains the following modules:

-   `platform-jar`: A Repository JAR project, demonstrating sample project structure and demo component loading.
-   `share-jar`: A Share JAR project, demonstrating sample project structure and demo Aikau page
-   `integration-tests`: Sample integration tests

**Note**. in SDK 3.0 the running of Tomcat and the creation of alfresco.war and share.war with applied extensions are all handled by the Alfresco Maven Plugin. Previously there were separate maven projects for this.

Scripts and commands:

|Command|Description|
|-------|-----------|
|`./run.sh and run.bat`|**Linux/Mac and Windows** scripts for running an embedded Tomcat with the customized alfresco.war \(platform-jar applied\), custom share.war \(share-jar applied\), and solr4.war. Access to Alfresco Share UI is via `http://localhost:8080/share`. Username/pwd is admin/admin. This script will also configure JVM memory \(it basically sets up `MAVEN_OPTS` for you\). See inside script for further details. **Note. Spring loaded is no longer used.****Important:** This script assumes that you are developing for the Alfresco Community Edition. If you use an Alfresco Enterprise version, then you need to update the maven POM with enterprise versions and configure Alfresco Maven plugin to use entreprise mode. Note you need to [set up access to the private repository](../tasks/alfresco-sdk-tutorials-configure-maven-enterprise.md) containing the Alfresco Enterprise artifacts.

|
|`platform-jar/mvn compile alfresco:refresh-repo`|Compiles the source code for the **Repository JAR** and puts the class files and resources under platform-jar/target. Then makes a POST call to the Alfresco Repository web application \(alfresco.war\) to refresh the web script container. So any changes that was made to Web scripts should be visible after a page refresh. **Note:** This command is typically used together with the run.sh/bat script for Rapid Application Development \(RAD\). The RAD process can be described like this:

1.  Start Tomcat with current alfresco.war customization \(that is, run.sh/bat\) in console window one.
2.  From an editor change some files \(classes, web scripts, and so on\) for the Repository JAR.
3.  Execute this cmd \(that is, `mvn platform-jar/compile alfresco:refresh-repo`\) from console window two.
4.  Refresh the page / web script you are working on.
5.  Done? No -\> Go back to step 2 and start over.
6.  Finished with implementation.

|
|`share-jar/mvn compile alfresco:refresh-share`|Compiles the source code for the **Share JAR** and puts the class files and resources under share-jar/target. Then makes POST calls to the Alfresco Share web application \(share.war\) to refresh the Spring Surf web script container and clear dependency caches. So any changes that was made to web scripts, Aikau pages, Aikau widgets, dashlets, and so on, should be visible after a page refresh. **Note:** This command is typically used together with the run.sh/bat script for Rapid Application Development \(RAD\). The RAD process can be described like this:

1.  Start Tomcat with current share.war customization \(that is, run.sh/bat\) in console window one.
2.  From an editor change some files \(classes, pages, widgets, and so on\) for the Share JAR.
3.  Execute this cmd \(that is, `share-jar/mvn compile alfresco:refresh-share`\) from console window two.
4.  Refresh the page / web script you are working on.
5.  Done? No -\> Go back to step 2 and start over.
6.  Finished with implementation.

|
|mvn package|Packages modules in their respective target directories, for example: -   aio/aio-platform-jar/target/aio-platform-jar-1.0-SNAPSHOT.jar
-   aio/aio-share-jar/target/aio-share-jar-1.0-SNAPSHOT.jar

**Note:** This does not apply these newly packaged JARs to their respective WARs, use `mvn install` for that.

|
|mvn install|Runs integration tests, package JARs, and installs artifacts in local Maven repository, for example: -   .m2/repository/org/alfresco/tutorial/aio-platform-jar/1.0-SNAPSHOT/aio-platform-jar-1.0-SNAPSHOT.jar
-   .m2/repository/org/alfresco/tutorial/aio-share-jar/1.0-SNAPSHOT/aio-share-jar-1.0-SNAPSHOT.jar
-   .m2/repository/org/alfresco/tutorial/integration-tests-platform/1.0-SNAPSHOT/integration-tests-platform-1.0-SNAPSHOT.war, contains the aio-platform-jar-1.0-SNAPSHOT.jar
-   .m2/repository/org/alfresco/tutorial/integration-tests-share/1.0-SNAPSHOT/integration-tests-share-1.0-SNAPSHOT.war, contains the aio-share-jar-1.0-SNAPSHOT.jar

Where these artifacts can be accessed by other local projects that depend on them.|
|mvn install -DskipTests=true|Like `mvn install` but skips tests.|
|mvn install alfresco:run|Like `run.sh or run.bat` but does not configure JVM memory if you have not configured it in `MAVEN_OPTS`, see [set up MAVEN\_OPTS](../tasks/alfresco-sdk-install-maven-opts.md). If you use Alfresco One, see the next command.|

**Parent topic:**[Introduction to Maven archetypes](../concepts/sdk-archetypes.md)

