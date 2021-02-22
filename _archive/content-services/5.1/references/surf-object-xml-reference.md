---
author: Alfresco Documentation
---

# Surf object XML quick reference \(siteData\)

Surf objects are defined in XML. This document provides a quick reference guide to the most commonly used Surf objects, and how they are defined in XML.

## File locations

In the following sections you will see that two locations are specified:

-   `classpath:/alfresco/site-data`
-   `classpath:/alfresco/web-extension/site-data`

It's important to note that the `alfresco/web-extension/site-data` directory will be processed after the `alfresco/site-data` directory. Usually core Alfresco objects would be located in `alfresco/site-data` directory, and third-party overrides/extensions would be located in `alfresco/web-extension/site-data`.

-   **[Component](../references/surf-object-xml-reference-component.md)**  
Component instances describe bindings between a region and a rendering engine that is responsible for generating the component's markup. Typically the rendering engine is the Surf web script engine.
-   **[Configuration](../references/surf-object-xml-reference-configuration.md)**  
Configurastion files let your store arbitrary XML descriptions for use in your custom Surf objects. In most cases, the only time you will need to construct one of these objects is when describing site configuration. An example of a site configuration follows.
-   **[Page](../references/surf-object-xml-reference-page.md)**  
A page describes a URL-addressable destination that has been resolved and for which a view must be produced. A page aligns with the concept of a web page from the end user's point of view. Pages are often arranged into page hierarchies that constitute a web site's navigation structure.
-   **[Template instance](../references/surf-object-xml-reference-template-instance.md)**  
Template instances wrap configuration around a template file. The template file receives all the properties of the template instance and can use these properties to inform its rendering logic. This empowers a single template file to render differently based on the configuration stored in the template instance.
-   **[Template type](../references/surf-object-xml-reference-template-type.md)**  
Template types contain information that is common across many template instances of the same type. A template type defines one or more rendering processors. It maye also define properties that all template instances of the given type will receive at render time.
-   **[Theme](../references/surf-object-xml-reference-theme.md)**  
Themes capture default settings for the rendering of elements in the request. A theme is a unique identifier as well as a collection of properties and page type overrides. When a theme is selected, its properties and its page type overrides apply to the request.

**Parent topic:**[Surf Framework Guide](../concepts/surf-fwork-intro.md)

