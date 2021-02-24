---
author: Alfresco Documentation
---

# Share AMP archetype command reference

This describes the scripts and Maven commands that can be used on an Alfresco Share extension project based on the Share AMP archetype.

Scripts and commands:

|Command|Description|
|-------|-----------|
|`./run.sh and run.bat`|**Linux/Mac and Windows** scripts for running an embedded Tomcat with the customized share.war \(that is, with the Share AMP applied\). Access to Alfresco Share UI is via `http://localhost:8081/share`. The username/password is admin/admin. This script will also configure JVM memory and automatically setup Spring Loaded for hot reloading of classes \(it basically sets up `MAVEN_OPTS` for you\). See inside script for further details. **Warning:** This script assumes that you are developing for the Alfresco Community Edition. If you use an Enterprise Edition you need to update the maven command in this script so it uses the `enterprise` profile: `mvn integration-test -Pamp-to-war,enterprise`.

**Warning:** This script also assumes that another Tomcat is running locally on port 8080 with the Alfresco Repository \(alfresco.war\) web application deployed.

|
|`mvn compile alfresco:refresh-share`|Compiles the source code and puts the class files and resources under /target. Then makes POST calls to the Alfresco Share web application \(share.war\) to refresh the Spring Surf web script container and clear dependency caches. So any changes that was made to web scripts, Aikau pages, Aikau Widgets, Dashlets, and so on, should be visible after a page refresh. **Note:** This command is typically used together with the run.sh/bat script for Rapid Application Development \(RAD\). The RAD process can be described like this:

1.  Start Tomcat with current share.war customization \(`run.sh`/`bat`\) in console window one.
2.  From an editor change some files \(classes, pages, widgets, and so on\)
3.  Execute this cmd \(`mvn compile alfresco:refresh-share`\) from console window two.
4.  Refresh the page/web script you are working on.
5.  Done? No -\> Go back to step 2 and start over.
6.  Finished with implementation.

|
|mvn package|Runs unit tests and packages AMP in $\{project.build.directory\}/$\{project.build.finalName\}.amp.|
|mvn install|Like `mvn package` but also installs AMP in local Maven repository to be depended upon.|
|mvn test|Runs unit tests.|
|mvn install -DskipTests=true|Like mvn install but skips unit tests.|
|mvn install -Pamp-to-war|Like `run.sh` or `run.bat` but does not configure JVM memory and Spring Loaded if you have not configured it in `MAVEN_OPTS`. See [set up MAVEN\_OPTS](../tasks/alfresco-sdk-install-maven-opts.md). If you use the Enterprise edition see next command.|
|mvn install -Pamp-to-war,enterprise|Like `mvn install -Pamp-to-war` but uses Enterprise artifacts. Note you need to have [set up access to the private repository](../tasks/alfresco-sdk-tutorials-configure-maven-enterprise.md) containing the Enterprise artifacts.|

**Parent topic:**[Maven Archetypes - Command Reference](../concepts/alfresco-sdk-cmd-reference.md)

