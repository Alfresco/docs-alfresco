---
author: Alfresco Documentation
---

# Upgrading a Share AMP project from SDK 2.1.0 to 2.1.1

These instructions will walk through what is needed when upgrading a Share AMP project from using SDK version 2.1.0 to using SDK version 2.1.1.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have a Share AMP project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-share-amp-archetype.md) from the Share AMP 2.1.1 SDK archetype and move the code and other changes over to it from the SDK 2.1.0 project, but this method is not covered in this article.

**Note:** In the following instructions the `SHARE_AMP_PROJECT_PATH` variable denotes the path to where you have your Share AMP project folder. So, for example, if your Share AMP project was generated in the C:\\alfresco-extensions\\acme-share-amp directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.1.1.

    In the IDE, open up the \{SHARE\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.1.1</version>
    </parent>
    ```


Your Share AMP project should now be fully updated to use the 2.1.1 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.1.0 to 2.1.1](../concepts/alfresco-sdk-upgrading-sdkversion-210-211.md)

