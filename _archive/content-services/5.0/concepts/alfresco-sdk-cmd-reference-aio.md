---
author: Alfresco Documentation
---

# All-in-One \(AIO\) archetype command reference

This describes the scripts and Maven commands that can be used on an Alfresco All-in-One \(AIO\) extension project based on the AIO archetype.

The All-in-One Alfresco project contains the following modules:

-   `repo-amp`: A Repository AMP project, demonstrating sample project structure and demo component loading.
-   `repo`: An alfresco.war aggregator project, overlaying the standard Alfresco WAR with the repo-amp and any other AMPs and JARs that have been included as dependencies and configured in the overlay
-   `share-amp`: A Share AMP project, demonstrating sample project structure and demo Aikau page
-   `share`: A share.war aggregator project, overlaying the standard Share WAR with the share-amp and any other AMPs and JARs that have been included as dependencies and configured in the overlay
-   `solr-config`: Brings in the Apache Solr4 configuration files
-   `runner`: A Tomcat + H2 runner, capable of running the custom alfresco.war, custom share.war, and solr4.war in embedded mode for demo/integration-testing purposes

Scripts and commands:

|Command|Description|
|-------|-----------|
|`./run.sh and run.bat`|**Linux/Mac and Windows** scripts for running an embedded Tomcat with the customized alfresco.war \(repo-amp applied\), custom share.war \(share-amp applied\), and solr4.war. Access to Alfresco Share UI is via `http://localhost:8080/share`. Username/pwd is admin/admin. This script will also configure JVM memory and automatically setup Spring Loaded for hot reloading of classes \(it basically sets up `MAVEN_OPTS` for you\). See inside script for further details. **Warning:** This script assumes that you are developing for the Alfresco Community edition. If you use an Enterprise Edition you need to update the maven command in this script so it uses the 'enterprise' profile: `mvn install -Prun,enterprise`.

|
|`repo-amp/mvn compile alfresco:refresh-repo`|Compiles the source code for the **Repository AMP** and puts the class files and resources under repo-amp/target. Then makes a POST call to the Alfresco Repository web application \(alfresco.war\) to refresh the web script container. So any changes that was made to Web scripts should be visible after a page refresh. **Note:** This command is typically used together with the run.sh/bat script for Rapid Application Development \(RAD\). The RAD process can be described like this:

1.  Start Tomcat with current alfresco.war customization \(that is, run.sh/bat\) in console window one.
2.  From an editor change some files \(classes, web scripts, and so on\) for the Repository AMP.
3.  Execute this cmd \(that is, `mvn repo-amp/compile alfresco:refresh-repo`\) from console window two.
4.  Refresh the page / web script you are working on.
5.  Done? No -\> Go back to step 2 and start over.
6.  Finished with implementation.

|
|`share-amp/mvn compile alfresco:refresh-share`|Compiles the source code for the **Share AMP** and puts the class files and resources under share-amp/target. Then makes POST calls to the Alfresco Share web application \(share.war\) to refresh the Spring Surf web script container and clear dependency caches. So any changes that was made to web scripts, Aikau pages, Aikau widgets, dashlets, and so on, should be visible after a page refresh. **Note:** This command is typically used together with the run.sh/bat script for Rapid Application Development \(RAD\). The RAD process can be described like this:

1.  Start Tomcat with current share.war customization \(that is, run.sh/bat\) in console window one.
2.  From an editor change some files \(classes, pages, widgets, and so on\) for the Share AMP.
3.  Execute this cmd \(that is, s`hare-amp/mvn compile alfresco:refresh-share`\) from console window two.
4.  Refresh the page / web script you are working on.
5.  Done? No -\> Go back to step 2 and start over.
6.  Finished with implementation.

|
|mvn package|Runs unit tests and packages modules in their respective target directories, for example: -   all-in-one/repo-amp/target/1.0-SNAPSHOT/repo-amp-1.0-SNAPSHOT.amp
-   all-in-one/share-amp/target/1.0-SNAPSHOT/share-amp-1.0-SNAPSHOT.amp
-   all-in-one/repo/target/1.0-SNAPSHOT/repo-1.0-SNAPSHOT.war, contains repo-amp-1.0-SNAPSHOT.amp from local maven repo \(not the just packed version\)
-   all-in-one/share/target/1.0-SNAPSHOT/share-1.0-SNAPSHOT.war, contains share-amp-1.0-SNAPSHOT.amp from local maven repo \(not the just packed version\)

 **Note:** This does not apply these newly packaged AMPs to their respective WARs, use `mvn install` for that.

|
|mvn install|Like `mvn package` but also installs artifacts in local Maven repository, for example: -   .m2/repository/com/acme/repo-amp/1.0-SNAPSHOT/repo-amp-1.0-SNAPSHOT.amp
-   .m2/repository/com/acme/share-amp/1.0-SNAPSHOT/share-amp-1.0-SNAPSHOT.amp
-   .m2/repository/com/acme/repo/1.0-SNAPSHOT/repo-1.0-SNAPSHOT.war, contains the repo-amp-1.0-SNAPSHOT.amp
-   .m2/repository/com/acme/share/1.0-SNAPSHOT/share-1.0-SNAPSHOT.war, contains the share-amp-1.0-SNAPSHOT.amp

Where these artifacts can be accessed by other local projects that depend on them.|
|mvn install -DskipTests=true|Like mvn install but skips unit tests.|
|mvn install -Prun|Like `run.sh or run.bat` but does not configure JVM memory and Spring Loaded if you have not configured it in `MAVEN_OPTS`, see [set up MAVEN\_OPTS](../tasks/alfresco-sdk-install-maven-opts.md). If you use the Enterprise edition, see the next command.|
|mvn install -Prun,enterprise|Like `mvn install -Prun` but uses Enterprise artifacts. Note you need to have [set up access to the private repository](../tasks/alfresco-sdk-tutorials-configure-maven-enterprise.md) containing the Enterprise artifacts.|
|mvn clean install -Prun,regression-testing|Runs regression testing of the Alfresco Share UI \(share.war\). Uses the Alfresco internal Selenium Page Object \(PO\) based tests. This is very useful when you have developed a lot of customizations for the Share UI and you want to make sure you have not broken any standard Share UI functionality. Typically run this from a CI server \(or better a Selenium-Grid\) to test for regression of the standard Alfresco Share UI. **Important:** The Selenium WebDriver is configured to use FireFox \(FF\) by default, so you need to have FF installed for the regression tests to be able to run. Use version 35 or newer.

 **Important:** It is also highly recommended that the workstation that is running the regression tests is not being worked on at the same time as the tests are running, as that can affect the outcome of the tests.

 **Warning:** This command assumes that you are developing for the Alfresco Community Edition. If you use an Enterprise Edition you need to update the maven command so it uses the 'enterprise' profile and the Enterprise `share-po` library: `mvn clean install -Prun,enterprise,regression-testing`. Also, make sure that you have installed an enterprise license in the `repo` project, otherwise the system will be in read-only mode and loads of tests will not pass.

|
|mvn clean install -Prun,functional-testing|Runs functional testing of the Alfresco Share UI customizations that you have developed, such as pages and Dashlets. For information about how to write these tests, see the example test called share-amp/src/test/java/\{package-path\}/demoamp/DemoPageTestIT and its Page Object class called share-amp/src/test/java/\{package-path\}/demoamp/po/DemoPage.java. **Important:** The Selenium WebDriver is configured to use FireFox \(FF\) by default, so you need to have FF installed for the functional tests to be able to run. Use version 35 or newer.

 **Important:** It is also highly recommended that the workstation that is running the functional tests is not being worked on at the same time as the tests are running, as that can affect the outcome of the tests.

 **Warning:** This command assumes that you are developing for the Alfresco Community Edition. If you use an Enterprise Edition you need to update the maven command so it uses the 'enterprise' profile and the Enterprise `share-po` library: `mvn clean install -Prun,enterprise,functional-testing`.

|
|mvn clean -Ppurge|Removes H2 database \(with metadata\), alf\_data \(with content files and index files\), and log files. Useful to purge the development repo \(by default self contained in $\{project.basedir\}/alf\_data\_dev. **Note:** This is an important command to use if you change significant settings in your project. For example, if you change the Alfresco Edition from Community to Enterprise. It is important to purge databases and other data that might otherwise be persisted.

**Warning:** The `purge` profile cannot be used together with the `run` profile.

|

**Parent topic:**[Maven Archetypes - Command Reference](../concepts/alfresco-sdk-cmd-reference.md)

