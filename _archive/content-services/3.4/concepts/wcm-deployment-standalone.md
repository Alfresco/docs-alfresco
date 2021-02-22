---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: deployment standalone receiver
---

# Standalone deployment receiver

The Standalone Deployment Engine consists of a small server that receives updates from an Alfresco repository and publishes them to its deployment targets. It does not have the benefits of a full repository but is a small and tightly focused server.

It is configured with a single file system deployment target, which places the contents of the deployment onto a flat file system, and is typically served up by a web or application server. For performance reasons, only the difference between the old version and the new version is sent.

The destination file server receiver has to be running with its RMI registry port and service port \(by default, 44100 and 44101, respectively\) accessible, unless you have configured it to run over another transport.

-   **[Configuring the standalone deployment receiver](../tasks/wcm-deploymenttarget-default.md)**  
This section describes how to configure the standalone deployment receiver. The configuration files needed for configuration are the deployment.properties file and the application-context.xml file.

**Parent topic:**[Deploying from AVM](../concepts/wcm-deployment-intro.md)

