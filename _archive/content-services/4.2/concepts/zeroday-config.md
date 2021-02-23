---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Day Zero configuration

This section describes the configuration changes that will improve Alfresco reliability, stability and performance when used for anything other than single user evaluation purposes.

-   **[Disabling Alfresco features](../concepts/maincomponents-disable.md)**  
You can disable common product components if you do not require them for your Alfresco instance. This summary gives the example property settings for disabling the main components.
-   **[Default port numbers and services](../concepts/port-number-defaults.md)**  
This summary gives you a list of the port numbers relevant to the services that Alfresco runs, and where to change them.
-   **[Repository system configuration files](../concepts/configfiles-repository.md)**  
The Alfresco system configuration files are in the application WAR file. When the server starts, the files expand to `<configRoot>`.
-   **[Tuning the JVM](../concepts/jvm-tuning.md)**  
The hardware requirements for the Alfresco repository and Share are variable and depend on the number of concurrent users that access the system. You can tune the memory and garbage collection parameters for the JVM to be appropriate for your situation.
-   **[Calculate the memory needed for Solr nodes](../concepts/solrnodes-memory.md)**  
Solr can have high memory requirements. You can use a formula to calculate the memory needed for the Alfresco internal data structures used in Solr for PATH queries and read permission enforcement.
-   **[Advanced database configuration properties](../concepts/db-config-properties.md)**  
As an administrator, you need to edit some advanced properties to customize your database configuration. Many properties, however, do not need to be edited.
-   **[Modifying the global properties file](../tasks/global-props-config.md)**  
This section describes the steps for modifying the alfresco-global.properties file.

**Parent topic:**[Alfresco Day Zero Configuration Guide](../concepts/zeroday-overview.md)

