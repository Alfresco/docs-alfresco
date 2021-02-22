---
author: Alfresco Documentation
audience: 
---

# Installing and configuring Media Management

The Media Management capability in Alfresco is delivered as a zip file containing AMP files, an instance of ActiveMQ, and the content services node infrastructure.

In these topics you will set up ActiveMQ, install the AMP files into an existing Alfresco instance, configure your settings and start Media Management. See [Prerequisites for using Media Management](mm-prereqs.md) for information on what you require before you start the installation.

-   **[Prerequisites for using Media Management](../concepts/mm-prereqs.md)**  
There are a number of software requirements for using Media Management.
-   **[Media Management architecture](../concepts/mm-architecture.md)**  
Media Management provides a framework for transforming and sharing content, ideally using a remote server to ensure that the Alfresco server is not overloaded.
-   **[Installing Media Management](../tasks/mm-install.md)**  
Download and install the Media Management AMP files, and add Media Management properties to your alfresco-global.properties file.
-   **[Configuring Media Management](../tasks/mm-props-config.md)**  
You can configure Media Management using the alfresco-global.properties file or by using a JMX client such as JConsole.
-   **[Starting Media Management](../tasks/mm-start.md)**  
You need to start up ActiveMQ, your content services node, the repository and Alfresco Share.
-   **[Running Media Management automatically](../concepts/mm-run-auto.md)**  
You can configure the Media Management components \(Apache ActiveMQ and content services nodes\) to suit your specific requirements.
-   **[Uninstalling Media Management](../tasks/mm-uninstall.md)**  
To uninstall Media Management, you need to use the Module Management Tool \(MMT\) and reinstate certain files.

**Parent topic:**[Alfresco Media Management](../concepts/mm-overview.md)

