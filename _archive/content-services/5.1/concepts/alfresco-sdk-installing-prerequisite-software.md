---
author: Alfresco Documentation
---

# Installing and configuring software

Use this information to install and configure the software on which the SDK depends.

You'll need to download and install the following tools and libraries, if you don't already have them:

1.  The Oracle Java Software Development Kit \(JDK\) version 8
2.  Apache Maven 3.2.5+
3.  Spring Loaded \(**Note**. only works with the [Share AMP archetype](alfresco-sdk-archetypes-share-amp.md) at the moment\).

-   **[Install Spring Loaded](../tasks/alfresco-sdk-install-spring-loaded.md)**  
The Alfresco SDK's Rapid Application Development \(RAD\) features uses Spring Loaded.
-   **[Install JDK](../tasks/alfresco-sdk-install-java.md)**  
The Alfresco SDK is based on Maven, which requires the JDK to be installed. This topic steps you through installing the JDK and verifying its installation.
-   **[Setting JAVA\_HOME](../tasks/alfresco-sdk-install-java-home.md)**  
Before using the Alfresco SDK, you need to set your `JAVA_HOME` environment variable to a suitable value, using the correct mechanism for your operating system.
-   **[Install Maven](../tasks/alfresco-sdk-install-maven.md)**  
The Alfresco SDK is now based around Maven \(formerly it used Ant\). To use the Alfresco SDK you need to have Maven installed.
-   **[Setting MAVEN\_OPTS & M2\_HOME](../tasks/alfresco-sdk-install-maven-opts.md)**  
Before using the Alfresco SDK, you need to set your `MAVEN_OPTS` and `M2_HOME` environment variables to suitable values using the correct mechanism for your operating system.
-   **[Using Alfresco One \(Enterprise\) \(Optional\)](../concepts/alfresco-sdk-using-enterprise-edition.md)**  
By default the Alfresco SDK will use Alfresco Community Edition artifacts but it can be configured to use Alfresco One \(Enterprise\) artifacts. This requires access credentials for the Alfresco Private Repository, and modification of several Maven configuration files.
-   **[Verify install](../tasks/alfresco-sdk-install-verify-install.md)**  
Before proceeding to use the Alfresco SDK, you should do one final check of your system to ensure you have the prerequisites correctly installed.

**Parent topic:**[Getting Started with the Alfresco SDK](../concepts/alfresco-sdk-getting-started.md)

