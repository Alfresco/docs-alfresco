---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: AWE
---

# Alfresco Web Editor

The Alfresco Web Editor is a Spring Surf-based web application that provides in-context editing capabilities for Alfresco repository content. The editor provides a mechanism for non-technical users to make edits to Alfresco content directly within a web page.

The Alfresco Web Editor uses the Forms Service default template.

The Alfresco Web Editor is packaged as a stand-alone WAR file so that it can be deployed to web applications that are in the sample instance, or remote, to the Alfresco server. When it is deployed, an Alfresco banner displays in your deployed web pages showing the Alfresco Web Editor tab and it identifies the editable content. By default, it assumes that you have JavaScript enabled but it can also run without JavaScript.

-   **[Alfresco Web Editor deployment](../concepts/awe-deploy-overview.md)**  
The simplest way to deploy the Alfresco Web Editor \(AWE\) is to use the pre-built WAR \(awe.war\) file and to deploy it in the same application server instance of your web application.
-   **[Configuring Alfresco Web Editor](../concepts/awe-config.md)**  
The following Web Editor components must be configured:
-   **[Sample web application using Alfresco Web Editor](../concepts/awe-sample-unsupported.md)**  
A sample customer WAR file is available in the Alfresco Web Editor distribution. It demonstrates how a customer may use Alfresco Web Editor in a very simple JSP-based web application. This sample must not be used in a production environment and is not supported.

**Parent topic:**[Installing and configuring Alfresco WCM](../concepts/WCM-intro.md)

