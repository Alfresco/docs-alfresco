---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Customization, Web Content Management, Deployment]
keyword: [deployment target, filesystem]
---

# Filesystem deployment target

The file system deployment target deploys web content to a local file system. By default, there is a file system deployment target built into the standalone WCM\_Deployment\_Engine called `default` and also one included in the web delivery runtime subsystem called `filesystem`.

There are two methods that are important: from where you are deploying; and, to where you are deploying.

The Alfresco user interface stores content in an AVM store with a prefix of ProjectName://www/avm\_webapps, and by default, this is followed by another folder called a webapp. By default, when you create a web project there will be a single webapp called `ROOT`. The path for `ROOT` will be ProjectName:/www/avm\_webapps/ROOT. A file in `ROOT` will have a path like ProjectName:/www/avm\_webapps/ROOT/index.htm.

The second method is to specify where you want your files to go. For example if you are using a web server like Tomcat, then your files go into <TOMCAT\_HOME\>/webapps/<webappName\>. You can then deploy all or part of this content to a file system location.

-   **[Single web project deployed to Tomcat](../tasks/wcm-single-wp-deployment.md)**  
This is an example of how to deploy content to a separate instance of Tomcat to receive your deployment.
-   **[Single web project deployed to two Tomcat webapps](../tasks/wcm-single-wp-deployment2.md)**  
This example describes how to install a test server that can be used to receive the contents of your authoring sandbox.
-   **[Filesystem deployment target properties and metadata](../concepts/wcm-targets-filesystem-props.md)**  
The following table shows the properties that can be configured on the file system deployment target.
-   **[Filesystem deployment target configuration](../concepts/wcm-targets-filesystem-config.md)**  
The following example shows a target definition for the standalone deployment engine.

**Parent topic:**[Deploying from AVM](../concepts/wcm-deployment-intro.md)

