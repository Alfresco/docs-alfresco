---
author: Alfresco Documentation
---

# Selecting an archetype

Review the brief description of each archetype, what the archetype implements, and suggestions of when the archetype should be used.

-   [alfresco-allinone-archetype](sdk-archetypes-intro.md#allinone)
-   [alfresco-platform-jar-archetype](sdk-archetypes-intro.md#platform-jar)
-   [alfresco-share-jar-archetype](sdk-archetypes-intro.md#share-jar)
-   [activiti-jar-archetype](sdk-archetypes-intro.md#activiti-jar) \(for use with SDK 2.2 only\)
-   [alfresco-amp-archetype](sdk-archetypes-intro.md#alfresco-amp) \(for use with SDK 2.2 only\)
-   [share-amp-archetype](sdk-archetypes-intro.md#share-amp) \(for use with SDK 2.2 only\)

![](../images/hr.png)

**org.alfresco.maven.archetype:alfresco-allinone-archetype**

This archetype allows a developer to implement the **All-In-One project** on Alfresco Content Services. The All-In-One project \(also called AIO\) is provided in this and previous versions of Alfresco SDK, but in SDK 3 it has been reorganized and enhanced.

The All-In-One archetype allows a developer to create a multi-module project on Alfresco Content Services. The All-In-One project mainly includes a module for the core repository in Alfresco Content Services and a module for the Share client. This includes:

-   ACS Repository WAR overlay \(and AMP\) 
-   Alfresco Share WAR overlay \(and AMP\)
-   Apache Solr configuration
-   An embedded Apache Tomcat runner

An optional AMP module is maintained, as the previous unique way to deploy custom source code and resources into Alfresco. If you are not confident with AMPs, you can use the WAR overlays using JARs. From Alfresco SDK 3, JAR is the recommended artifact type and the default.

The project created using the All-In-One Maven archetype includes some sample code \(by default\) to show you how to develop with the Alfresco Content Services Repository and the Alfresco Share client. The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The All-In-One project is recommended to be used if you have to develop a customization of the Alfresco Content Services Repository together with customizations on Alfresco Share client. If your plan to develop a project on the Alfresco Content Services Repository only, use the Platform JAR Maven archetype. If you plan to develop a project on the Alfresco Share client only, use the Share JAR Maven archetype.

For more information about the All-In-One project, see [All-In-One project structure](sdk-projects-aio.md).

[back to top](sdk-archetypes-intro.md#)

![](../images/hr.png)

**org.alfresco.maven.archetype:alfresco-platform-jar-archetype**

This archetype allows a developer to implement the **Platform JAR project** on Alfresco Content Services. The Platform JAR project is new to SDK 3, and has been introduced to solve some problems related to the using Alfresco Module Packages \(AMPs\). Before SDK 3, AMPs were considered as the unique way to deploy custom source code and resources into Alfresco.

The Platform JAR Maven archetype allows a developer to create a module on Alfresco Content Services, in particular on the Repository side, and includes:

-   ACS Repository WAR overlay \(and AMP\)
-   Apache Solr configuration
-   An embedded Apache Tomcat runner

An optional AMP module is maintained. If you are not confident with AMPs, you can use the WAR overlays using JARs. From Alfresco SDK 3, JAR is the recommended artifact type and the default.

The project created using the Platform JAR Maven archetype includes some sample code \(by default\) to show you how to develop with the Alfresco Content Services Repository. The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The Platform JAR project is recommended to be used if you have to develop a customization of the Alfresco Content Services Repository. If you also plan to develop a customization of the Alfresco Share client, use the All-In-One Maven archetype instead.

For more information about the Platform JAR project, see [Platform JAR project structure](sdk-projects-platform-jar.md).

[back to top](sdk-archetypes-intro.md#)

![](../images/hr.png)

**org.alfresco.maven.archetype:alfresco-share-jar-archetype**

This archetype allows a developer to implement the **Share JAR project** on an Alfresco Share client. The Share JAR project is new to SDK 3, and has been introduced to solve some problems related to using Alfresco Module Packages \(AMPs\). Before SDK 3, AMPs were considered as the unique way to deploy custom source code and resources into Alfresco.

The Share JAR Maven archetype allows a developer to create a module on an Alfresco Share client, and includes:

-   Alfresco Share WAR overlay \(and AMP\)
-   An embedded Apache Tomcat runner

An optional AMP module is maintained. If you are not confident with AMPs, you can use the WAR overlays using JARs. From Alfresco SDK 3, JAR is the recommended artifact type and the default.

The project created using the Share JAR Maven archetype includes some sample code \(by default\) to show you how to develop with the Alfresco Share client. The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The Share JAR project is recommended to be used if you have to develop a customization of the Alfresco Share client. If you also plan to develop a customization of the Alfresco Content Services Repository, use the All-In-One Maven archetype instead.

For more information about the Share JAR project, see [Share JAR project structure](sdk-projects-share-jar.md).

[back to top](sdk-archetypes-intro.md#)

![](../images/hr.png)

**org.alfresco.maven.archetype:activiti-jar-archetype** \(for use with SDK 2.2 only\)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is still listed.

[back to top](sdk-archetypes-intro.md#)

![](../images/hr.png)

**org.alfresco.maven.archetype:alfresco-amp-archetype** \(for use with SDK 2.2 only\)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is still listed.

[back to top](sdk-archetypes-intro.md#)

![](../images/hr.png)

**org.alfresco.maven.archetype:share-amp-archetype** \(for use with SDK 2.2 only\)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is still listed.

[back to top](sdk-archetypes-intro.md#)

**Parent topic:**[Introduction to Maven archetypes](../concepts/sdk-archetypes.md)

