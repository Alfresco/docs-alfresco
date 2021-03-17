---
author: Alfresco Documentation
---

# Maven and Alfresco Enterprise

By default the Maven Alfresco SDK will use Alfresco Community artifacts, however, it can be configured to use Enterprise artifacts. This requires access credentials for the Alfresco Private Repository, and the modification of several Maven configuration files.

**Attention:** To obtain access to the Alfresco Enterprise repository, please refer to this [knowledge base article](https://myalfresco.force.com/support/articles/en_US/Technical_Article/Where-can-I-find-the-repository-for-Enterprise-Maven-artifacts). If you do not have access to this portal then please contact your Alfresco technical liaison representative within your company, or [Alfresco directly](http://www.alfresco.com/company/contact).

The examples you have so far looked at have downloaded and used Community versions of the Alfresco artifacts. However, it is possible to use the Maven Alfresco SDK with Enterprise artifacts. These artifacts are stored in a private repository, and only Enterprise customers have access to this repository.

There are four main considerations if you want to use Enterprise artifacts:

1.  You must ensure that you have access credentials for the Alfresco Private Repository.
2.  You must configure Maven to include support for the Alfresco Private Repository server, typically through editing the settings.xml file in the .m2 directory in your home directory.
3.  In your project you must edit the pom.xml file to ensure that the values for the properties `alfresco.groupId` and `alfresco.version` are set correctly according to the information that follows.
4.  You must also edit your pom.xml file to reference the Alfresco Private Repository that you created credentials for in \(typically\) the settings.xml file in your .m2 directory.
5.  You need to add compile-time dependencies to the pom.xml file to ensure that dependencies are correctly loaded.

## Accessing the Alfresco Private Repository

The first matter to consider is to ensure that you have credentials for the Alfresco Private Repository, where the Enterprise artifacts are stored. In fact the private repository also includes all public artifacts too. Once you have suitable credentials you need to add support for Alfresco private repository to your configuration. This would typically be done by adding your access credentials to the settings.xml contained in your ~/.m2 directory \(for Linux and OS X\). On Windows this would be located in ... . This procedure is explained in detail in the tutorial [Configuring access to the Alfresco Private Repository](../tasks/dev-extensions-maven-sdk-tutorials-configure-maven-enterprise.md).

## Setting alfresco.groupId and alfresco.version values to select edition

There is a convention that you need to be aware of that determines which edition of the Alfresco artifacts is used, Community or Enterprise. However this convention is different depending on whether you are referring to Alfresco versions prior to 4.2, or 4.2 and above.

For Alfresco versions *prior* to 4.2 the edition of the artifact used is determined by the value of the `alfresco.groupId` property. For Community the `alfresco.groupId` property value used is `org.alfresco`, and for Enterprise the `alfresco.groupId` property value used is `org.alfresco.enterprise`.

This is summarized in the following table:

|Edition|`alfresco.groupId`|Example|
|-------|------------------|-------|
|Community|org.alfresco|org.alfresco:artifact-id:4.1.2|
|Enterprise|org.alfresco.enterprise|org.alfresco.enterprise:artifact-id:4.1.2|

For 4.2 and above, the version numbering alone indicates whether the Enterprise or Community artifacts will be used. Version numbers that use an *alpha* character in the third position indicate Community, for example, `4.2.e`. Version numbers that consist of a *numeric* character in the third position indicate Enterprise, for example `4.2.0`. The value for property `alfresco.groupId` is `org.alfresco` in both cases.

This is summarized in the following table:

|Edition|`alfresco.groupId`|`alfresco.version`|Example|
|-------|------------------|------------------|-------|
|Community|org.alfresco|4.2.e|org.alfresco:artifact-id:4.2.e|
|Enterprise|org.alfresco|4.2.0|org.alfresco:artifact-id:4.2.0|

It is important that the POM \(pom.xml\) is edited correctly to reflect the edition of Alfresco artifacts required. This procedure is covered in more detail in the tutorial [Configuring \(your project to\) support Enterprise artifacts](../tasks/dev-extensions-maven-sdk-tutorials-alfresco-enterprise-artifacts.md).

## Adding compile-time dependencies

Add the following dependencies to the pom.xml:

```

        
<dependency> 
  <groupId>${alfresco.groupId}</groupId> 
  <artifactId>alfresco-enterprise-repository</artifactId> 
  <version>${alfresco.version}</version> 
  <scope>test</scope> 
</dependency> 
<dependency> 
  <groupId>${alfresco.groupId}</groupId> 
  <artifactId>alfresco-enterprise-repository</artifactId> 
  <version>${alfresco.version}</version> 
  <classifier>config</classifier> 
  <scope>test</scope> 
</dependency>         
        
      
```

**Attention:** These dependencies should be added to the <dependencies\> element and not the <dependencyManagement\><dependencies\> element.

-   **[Configuring access to Alfresco Private Repository](../tasks/dev-extensions-maven-sdk-tutorials-configure-maven-enterprise.md)**  
In order to be able to utilize Enterprise artifacts, it is necessary to allow Maven access to the Alfresco Private Repository, where the Enterprise artifacts are maintained.
-   **[Configuring support for Enterprise artifacts](../tasks/dev-extensions-maven-sdk-tutorials-alfresco-enterprise-artifacts.md)**  
This task demonstrates how you can configure a Maven project to use the Alfresco Enterprise artifacts, rather than the Community artifacts.

**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

