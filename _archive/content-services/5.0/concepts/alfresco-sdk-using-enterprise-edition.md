---
author: Alfresco Documentation
---

# Using Alfresco Enterprise Edition \(Optional\)

By default the Alfresco SDK will use Alfresco Community artifacts but it can be configured to use Enterprise artifacts. This requires access credentials for the Alfresco Private Repository, and modification of several Maven configuration files.

**Important:** To obtain access to the Alfresco Enterprise repository [located here](https://artifacts.alfresco.com), please refer to this [knowledge base article](https://myalfresco.force.com/support/articles/en_US/Technical_Article/Where-can-I-find-the-repository-for-Enterprise-Maven-artifacts). If you do not have access to this portal then please contact your Alfresco technical liaison representative within your company, or [Alfresco directly](http://www.alfresco.com/company/contact).

## Accessing the Alfresco Private Repository

The first matter to consider is to ensure that you have credentials for the Alfresco Private Repository, where the Enterprise artifacts are stored. In fact the private repository also includes all public artifacts too. Once you have suitable credentials you need to add support for Alfresco private repository to your configuration. This would typically be done by adding your access credentials to the settings.xml contained in your ~/.m2 directory \(for Linux and OS X\). On Windows 7 and Vista this resolves to <root\>\\Users\\<username\> and on XP it is <root\>\\Documents and Settings\\<username\>\\.m2.

This procedure is explained in detail in the tutorial [Configuring access to the Alfresco Private Repository](../tasks/alfresco-sdk-tutorials-configure-maven-enterprise.md).

-   **[Configuring access to Alfresco Private Repository](../tasks/alfresco-sdk-tutorials-configure-maven-enterprise.md)**  
In order to be able to utilize Enterprise artifacts, it is necessary to allow Maven access to the Alfresco Private Artifacts Repository, where the Enterprise artifacts are maintained.

**Parent topic:**[Installing and configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md)

