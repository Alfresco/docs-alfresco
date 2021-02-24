# Alfresco Digital Workspace

The Alfresco Digital Workspace is a new content management application built with the Alfresco Application Development Framework \(ADF\). The user interface has been streamlined making simple tasks such as uploading, downloading, searching for content, and collaborating with others much easier. You can create public, moderated, and private libraries. Access for other users to these libraries can be configured by setting permissions, at an individual or group level. Libraries can be added to your favourites list so they can be accessed easily. The search feature is powerful and includes numerous filters based on your metadata, so you can quickly find what you are looking for. The Alfresco Digital Workspace simplifies the complexity of content management and provides comprehensive extensibility features for developers, using the ADF, and allows them to easily and quickly create custom solutions for specific use cases.

The Alfresco Digital Workspace is automatically deployed as part of Alfresco Content Services using Helm charts or a Docker Compose file. You can also manually install Alfresco Content Services using standard war files and then configure the installation to include the Alfresco Digital Workspace.

See the following video for a quick introduction to the Alfresco Digital Workspace.

  

-   **[Deploying the Digital Workspace](../tasks/deploying.md)**  
There are a number of different ways to deploy the Alfresco Digital Workspace. You can deploy it using Docker images that are packaged in Helm charts or using Docker Compose. You can also install Alfresco Content Services using standard WAR files contained in the distribution zip, and then configure the installation to include the Digital Workspace.
-   **[Configuring the Digital Workspace](../concepts/configuration.md)**  
The Alfresco Digital Workspace settings are in the following file ../digital-workspace/app.config.json. You can use the file to tailor the Digital Workspace easily and without making any code changes. The file can be updated while the Digital Workspace is still running and users will see the changes once their pages are reloaded.
-   **[Developing extensions to the Digital Workspace](../concepts/developing-extensions.md)**  
The Alfresco Digital Workspace provides a comprehensive extensibility framework and allows you to customize the Navigation sidebar, Toolbar, Info drawer, Viewer, and Content metadata.
-   **[Troubleshooting and FAQs](../references/troubleshooting.md)**  
Here are the answers to some frequently asked questions.
-   **[Copyright](../reuse/copyright.md)**  

-   **[Disclaimer](../reuse/disclaimer.md)**  


