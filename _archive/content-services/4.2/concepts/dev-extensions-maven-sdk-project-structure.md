---
author: Alfresco Documentation
---

# Project structure

When you create an instance of an archetype, a pre-defined directory structure is created for you, containing important files such as your project's pom.xml file, and directories such as src/main/java to contain source code.

The main parts of the project structure created with the Maven Alfresco SDK simple AMP archetype are as follows:

|File/directory|Description|
|--------------|-----------|
|pom.xml|This file tells Maven all it needs to know about your project. This includes information such as the archetype version and the Alfresco version the project uses. These values can be modified by hand if required.|
|src/main/java|This is where you organize your own packages and source code. The code gets packaged into a JAR file. When the AMP is applied to the Alfresco WAR file, the JAR will get placed in the directory WEB-INF/lib.|
|src/test|The code and resources in this directory relate to the running of unit tests. The unit tests are located in src/test/java. Resources used by the source files are located in src/test/resources. In src/test/local/properties is an alfresco-global.properties file. This file is used to configure Alfresco while running unit tests.|
|src/main/amp|The remainder of the project is located here. The AMP structure is documented in [the module documentation](dev-extensions-modules-intro.md). The structure contains important files such as the module.properties file, which contains information about AMP such as its ID, version, dependencies, and minimum and maximum versions of Alfresco required to run it.|

**Parent topic:**[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)

