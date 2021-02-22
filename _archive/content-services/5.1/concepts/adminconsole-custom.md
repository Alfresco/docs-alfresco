---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Customizing the Alfresco Admin Console

The Alfresco Admin Console displays the most common Alfresco administration activities. You can customize the Admin Console to show different options, properties, and layout, or you can create completely new pages.

The Admin Console is composed of default administration pages. Each Admin Console page is a simple web script component built from a library of useful functions and macros that are imported into each Admin Console web script.

The JavaScript library functions do the background work for the Admin Console, retrieving the JMX MBean properties and then transferring them to flexible FreeMarker macros. The FreeMarker macros render the appropriate control for a JMX property automatically and consistently.

If no additional processing logic is required, the web script library functions automatically persist them back to the correct property.

JMX form-style pages are simple to build. Example pages that you can create include: Thread Dump, Active Sessions, Log4J settings, and Test Transforms.

-   **[Alfresco Admin Console Example page](../concepts/adminconsole-custom-example.md)**  
When you customize the Alfresco Admin Console, you can use the example page as a starting point.

**Parent topic:**[Using the Admin Console](../concepts/at-adminconsole.md)

**Related information**  


[Web Scripts](ws-overview.md)

[Launching the Admin Console](../tasks/adminconsole-open.md)

