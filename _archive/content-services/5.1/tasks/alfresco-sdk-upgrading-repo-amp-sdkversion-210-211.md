---
author: Alfresco Documentation
---

# Upgrading a Repository AMP project from SDK 2.1.0 to 2.1.1

These instructions will walk through what is needed when upgrading a Repository AMP project from using SDK version 2.1.0 to using SDK version 2.1.1.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have a Repository AMP project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-amp-archetype.md) from the Repository AMP 2.1.1 SDK archetype and move the code and other changes over to it from the SDK 2.1.0 project, but this method is not covered in this article.

**Note:** In the following instructions the `REPO_AMP_PROJECT_PATH` variable denotes the path to where you have your Repository AMP project folder. So, for example, if your Repository AMP project was generated in the C:\\alfresco-extensions\\acme-repo-amp directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.1.1.

    In the IDE, open up the \{REPO\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.1.1</version>
    </parent> 
    ```

2.  Update the commented out Alf Data location value.

    In the same project file update the property `alfresco.data.location` as follows:

    ```
    <properties>
        <!-- The following are default values for data location, Alfresco Community version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.0.1)
          <alfresco.version>5.0.d</alfresco.version>
          <alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> -->
    ```

3.  Update version numbers and add a comment to the demo component bean definition.

    In the \{REPO\_AMP\_PROJECT\_PATH\}/src/main/amp/config/alfresco/module/repo-amp/context/service-context.xml project file update as follows:

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


Your Repository AMP project should now be fully updated to use the 2.1.1 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.1.0 to 2.1.1](../concepts/alfresco-sdk-upgrading-sdkversion-210-211.md)

