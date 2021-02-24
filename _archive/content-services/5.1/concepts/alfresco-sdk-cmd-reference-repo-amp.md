---
author: Alfresco Documentation
---

# Repository AMP archetype command reference

This describes the scripts and Maven commands that can be used on an Alfresco Repository extension project based on the Repository AMP archetype.

Scripts and commands:

|Command|Description|
|-------|-----------|
|`./run.sh and run.bat`|**Linux/Mac and Windows** scripts for running an embedded Tomcat with the customized alfresco.war \(that is, with the Repo AMP applied\) and the flat file database H2. Access to Alfresco UI is via `http://localhost:8080/alfresco`. The username/password is admin/admin. This script will also configure JVM memory \(it basically sets up `MAVEN_OPTS` for you\). See inside the script for further details. **Note. Spring loaded is no longer used.****Important:** This script assumes that you are developing for Alfresco Community Edition. If you use Alfresco One you need to update the maven command in this script so it uses the `enterprise` profile: `mvn integration-test -Pamp-to-war,enterprise`.

|
|`mvn compile alfresco:refresh-repo`|Compiles the source code and puts the class files and resources under /target. Then makes a POST call to the Alfresco Repository web application \(alfresco.war\) to refresh the web script container. So any changes that were made to web scripts should be visible after a page refresh. **Note:** This command is typically used together with the `run.sh`/`bat script` for Rapid Application Development \(RAD\). The RAD process can be described like this:

1.  Start Tomcat with current alfresco.war customization \(`run.sh`/`bat`\) in console window one.
2.  From an editor, change some files \(classes, web scripts, and so on\).
3.  Execute this cmd \(`mvn compile alfresco:refresh-repo`\) from console window two.
4.  Refresh the page/web script that you are working on.
5.  Done? No -\> Go back to step 2 and start over.
6.  Finished with implementation.

|
|mvn package|Runs unit tests and packages AMP in $\{project.build.directory\}/$\{project.build.finalName\}.amp.|
|mvn install|Like `mvn package` but also installs AMP in local Maven repository to be depended upon.|
|mvn test|Runs unit tests.|
|mvn install -DskipTests=true|Like `mvn install` but skips unit tests.|
|mvn install -Pamp-to-war|Like `run.sh` or `run.bat` but does not configure JVM memory if you have not configured it in `MAVEN_OPTS`. See [set up MAVEN\_OPTS](../tasks/alfresco-sdk-install-maven-opts.md). If you use Alfresco One see the next command.|
|mvn install -Pamp-to-war,enterprise|Like `mvn install -Pamp-to-war` but uses Alfresco One \(Enterprise\) artifacts. Note you need to have [set up access to the private repository](../tasks/alfresco-sdk-tutorials-configure-maven-enterprise.md) containing the Alfresco One artifacts.|
|mvn clean -Ppurge|Removes H2 database \(with metadata\), alf\_data \(with content files and index files\), and log files. Useful to purge the development repo \(by default self contained in $\{project.basedir\}/alf\_data\_dev\). **Note:** This is an important command to use if you change significant settings in your project. For example, if you change Alfresco Community Edition to Alfresco One. It is important to purge databases and other data that might otherwise be persisted.

**Important:** The `purge` profile cannot be used together with the `amp-to-war` profile.

|

**Parent topic:**[Maven Archetypes - Command Reference](../concepts/alfresco-sdk-cmd-reference.md)

