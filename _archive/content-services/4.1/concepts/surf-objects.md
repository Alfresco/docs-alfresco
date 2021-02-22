---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, API/Script, Surf]
option: Surf objects
---

# Surf objects

Surf objects define website parts and describe how they fit together to build the complete web application structure.

Objects describe things like pages, page hierarchy, chrome, or components that are reused across many pages. XML files define objects that are generally short. A single Surf application will have many XML files to define its objects. When Surf starts up, it looks for all these small XML fragments and gathers them to form a complete registry of all of the objects.

Example of the XML for a Page object:

```
<?xml version='1.0' encoding='UTF-8'?>
<page>
   <id>mypage</id>
   <title>My First Page</title>
   <description>This is an example of the XML for a Page</description>
</page>
```

A Spring project generally maintains these XML files as part of its project resources. They can reside under the WEB-INF directory or inside the classpath. Alfresco users can also manage these files inside the Alfresco content application server, where XML files can be individually managed, authorized, and approved as part of a lifecycle process. Once approved, Alfresco makes these files available to the Surf application.

Here are a few examples of the various presentation objects that Surf provides:

-   **Chrome**-application borders for regions and components
-   **Components**-binds web scripts into templates and pages
-   **Content Instance**-points to pages or templates to use when rendering content types \(`cm:content` or `my:article`\)
-   **Page**-a navigable location within a site
-   **Page Type**-indirection to non-navigable locations, such as a login page
-   **Template Instance**-configuration for dynamic templates
-   **Theme**-settings that define the site experience

**Parent topic:**[Presentation content](../concepts/surf-pres-content.md)

