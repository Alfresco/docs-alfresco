---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Customization]
keyword: [knowledge base, developing]
---

# Customizing Alfresco Share \(basic\)

This section demonstrates how to extend Alfresco Share to implement custom dashlets and pages. It walks through the configuration of each of these into an Alfresco Share project site and looks at how to define new site presets and make them available to your users.

This section builds on the foundation work in [Getting started](kb-about.md#), which works with the repository-side pieces required to provide a Knowledge Base content model and services. It provides a RESTful interface as a web script so that external applications can retrieve information from your Knowledge Base.

This section looks at one such external application, Alfresco Share, and shows how to extend it to introduce Knowledge Base functionality into collaborative projects.

-   **[Building custom dashlets](../concepts/kb-dashlet.md)**  
The site dashboard displays when users arrive to a site, and contains dashlets. A dashlet offers a quick view into the content or activities of the site. You can use the out-of-the-box dashlets or add your own custom dashlets.
-   **[Configuring custom site pages](../concepts/custom-site-about.md)**  
Alfresco Share comes with several site pages out of the box. When Alfresco Share starts up, it looks to its own configuration file to determine which site pages have been set up and how to identify them.
-   **[Stopping the Alfresco server](../tasks/alfresco-stop.md)**  
This section describes how to stop the Alfresco server.
-   **[Adding the custom dashlet code](../tasks/kb-code-dashlet-add.md)**  
Adding code for the custom dashlet to Alfresco Share makes it available to plug into a site dashboard.
-   **[Adding the custom site page code](../tasks/kb-code-site-add.md)**  
Adding a custom site page in Alfresco Share involves adding a web script, Surf objects, components for your custom page, and a template instance.
-   **[Adding the common library code](../tasks/kb-code-library.md)**  
Define common JavaScript functions for your custom Knowledge Base by adding a common server-side JavaScript library for use by custom dashlets and custom pages.
-   **[Configuring a custom site preset](../tasks/kb-code-site-preset.md)**  
This describes the process for setting up the new site preset. It involves adding the preset, making it available from the Create Site wizard, and adding message bundles for I18N support.
-   **[Adding a custom message bundle](../tasks/kb-code-bundle.md)**  
A custom message bundle defines text values for the default locale.
-   **[Overriding the message bundle bootstrap component](../tasks/kb-code-bootstrap.md)**  
To include a custom message bundle along with the Alfresco Share message bundles to support I18N with a new site preset, override the Spring bean responsible for doing so.
-   **[Adding files to the Tomcat ROOT web application](../tasks/kb-code-tomcat.md)**  
The custom dashlet and custom page components have browser-side dependencies the browser must resolve. You can modify the share.war file, but a better option is to put them in an alternate web application; in this case, the ROOT web application under Tomcat.
-   **[Starting the Alfresco server](../tasks/alfresco-start.md)**  
The server must be running before you can use Alfresco Share or Alfresco Explorer. When you install Alfresco using the setup wizard, the server is automatically installed and started as a service.
-   **[Creating a new Alfresco Share site](../tasks/kb-share-site-create.md)**  
This describes how to create a simple collaboration site in Alfresco Share and configure it to use your new site page.
-   **[Adding a custom dashlet to your site](../tasks/kb-dashlet-add.md)**  
Adding the dashlet to the site dashboard makes the custom Knowledge Base dashlet available for users to instantly see what is happening in the Knowledge Base when they arrive to the site.
-   **[Adding a custom page to a Share site](../tasks/kb-page-add.md)**  
Site managers can configure additional pages for sites and remove unwanted pages.
-   **[Creating a Knowledge Base site](../tasks/kb-site-create.md)**  
Try out your new site preset by creating a new Knowledge Base Share site.

**Parent topic:**[Building a custom Knowledge Base application](../concepts/kb-getting-started-overview.md)

