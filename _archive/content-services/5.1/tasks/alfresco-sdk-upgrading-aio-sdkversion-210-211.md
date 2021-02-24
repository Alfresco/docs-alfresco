---
author: Alfresco Documentation
---

# Upgrading an All-in-One \(AIO\) project from SDK 2.1.0 to 2.1.1

These instructions will walk through what is needed when upgrading an AIO project from using SDK version 2.1.0 to using SDK version 2.1.1.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have an All-in-One project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-all-in-one-archetype.md) from the AIO 2.1.1 SDK archetype and move the code and other changes over to it from the SDK 2.1.0 project, but this method is not covered in this article.

**Note:** In the following instructions the `AIO_PROJECT_PATH` variable denotes the path to where you have your All-in-One top project folder. So, for example, if your All-in-One project was generated in the C:\\alfresco-extensions\\acme-poc directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.1.1.

    In the IDE, open up the \{AIO\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.1.1</version>
    </parent> 
    ```

2.  Update the commented out Alf Data location value.

    In the same parent project file update the property `alfresco.data.location` as follows:

    ```
    <properties>
        <!-- The following are default values for data location, Alfresco Community version, and Records Management Module version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.0.1)
          <alfresco.version>5.0.d</alfresco.version>
          <alfresco.rm.version>2.3</alfresco.rm.version>
          <alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> -->
    ```

3.  Add test scope for Selenium dependency in Share AMP.

    In the \{AIO\_PROJECT\_PATH\}/share-amp/pom.xml project file scroll down to the following `dependency`. Then add `<scope>test</scope>`:

    ```
    <dependency>
       <groupId>org.seleniumhq.selenium</groupId>
       <artifactId>selenium-java</artifactId>
       <version>2.45.0-alfresco</version>
       <scope>test</scope>
    </dependency>
    ```

4.  Update version numbers and add a comment to the demo component bean definition in the Repo AMP.

    In the \{AIO\_PROJECT\_PATH\}/repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/service-context.xml project file update as follows:

    ```
      <!-- A simple module component that will be executed once.
            Note. this module component will only be executed once, and then there will be an entry for it in the Repo.
            So doing for example $ mvn clean install -Prun twice will only execute this component the first time.
            You need to remove /alf_data_dev for it to be executed again. -->
        <bean ...
            <property name="sinceVersion" value="1.0" />
            <property name="appliesFromVersion" value="1.0" />
            ...
        </bean>
    ```

5.  Add property for module log level to repo project.

    In the \{AIO\_PROJECT\_PATH\}/repo/pom.xml project file add the following `properties` section:

    ```
    <properties>
            <!-- During development we set log root level to Debug,
                this will be applicable to the log configuration in
                repo/src/main/resources/alfresco/extension/dev-log4j.properties,
                such as DemoComponent logging. -->
            <app.log.root.level>DEBUG</app.log.root.level>
        </properties>
    ```

6.  Configure module logging in repo project.

    In the \{AIO\_PROJECT\_PATH\}/repo/src/main/resources/alfresco/extension/dev-log4j.properties log configuration file add the following line:

    ```
    log4j.logger.org.alfresco.demoamp.DemoComponent=${app.log.root.level}
    ```

7.  In the runner project update the properties section.

    Update and add properties as follows in the \{AIO\_PROJECT\_PATH\}/runner/pom.xml project file :

    ```
    <properties>
        <alfresco.solr.dir>${alfresco.data.location}/solr4</alfresco.solr.dir>
        <alfresco.solr.home.dir>${alfresco.solr.dir}/config</alfresco.solr.home.dir>
        <alfresco.solr.data.dir>${alfresco.solr.dir}/data</alfresco.solr.data.dir>
    </properties>
    ```

8.  In the Repo tomcat context file add a comment about resource loading

    In the \{AIO\_PROJECT\_PATH\}/runner/tomcat/context-repo.xml file add comments as follows:

    ```
       <Resources className="org.apache.naming.resources.VirtualDirContext"
                   extraResourcePaths="/=${project.parent.basedir}/repo-amp/target/repo-amp/web" />
        <!-- IMPORTANT! The extraResourcePaths string need to be on one continues line, so if we add another Repo AMP,
                        it would look something like this:
        <Resources className="org.apache.naming.resources.VirtualDirContext"
                   extraResourcePaths="/=${project.parent.basedir}/repo-amp/target/repo-amp/web,/=${project.parent.basedir}/component-a-repo/target/component-a-repo/web" />
        -->
    ```

9.  In the Share tomcat context file add a comment about resource loading

    In the \{AIO\_PROJECT\_PATH\}/runner/tomcat/context-share.xml file add comments as follows:

    ```
       <Resources className="org.apache.naming.resources.VirtualDirContext"
                   extraResourcePaths="/=${project.parent.basedir}/share-amp/target/share-amp/web" />
        <!-- IMPORTANT! The extraResourcePaths string need to be on one continues line, so if we add another Share AMP,
                        it would look something like this:
        <Resources className="org.apache.naming.resources.VirtualDirContext"
                   extraResourcePaths="/=${project.parent.basedir}/share-amp/target/share-amp/web,/=${project.parent.basedir}/component-a-share/target/component-a-share/web" />
                   -->
    ```

10. In the Solr tomcat context file update all paths

    In the \{AIO\_PROJECT\_PATH\}/runner/tomcat/context-solr.xml file update the environment property values as follows:

    ```
    <Context>
        <Environment name="solr/home"        type="java.lang.String" value="${alfresco.solr.home.dir}/" override="true"/>
        <Environment name="solr/model/dir"   type="java.lang.String" value="${alfresco.solr.home.dir}/alfrescoModels/" override="true"/>
        <Environment name="solr/content/dir" type="java.lang.String" value="${alfresco.solr.data.dir}/content/" override="true"/>
    ```

11. In the Solr Configuration project update the properties section

    Open up the \{AIO\_PROJECT\_PATH\}/solr-config/pom.xml project file. Update the `properties` sections as follows:

    ```
    <properties>
            <alfresco.solr.dir>${alfresco.data.location}/solr4</alfresco.solr.dir>
            <alfresco.solr.home.dir>${alfresco.solr.dir}/config</alfresco.solr.home.dir>
            <alfresco.solr.data.dir>${alfresco.solr.dir}/data</alfresco.solr.data.dir>
        </properties> 
    ```


Your All-in-One project should now be fully updated to use the 2.1.1 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.1.0 to 2.1.1](../concepts/alfresco-sdk-upgrading-sdkversion-210-211.md)

