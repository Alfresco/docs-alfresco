---
author: Alfresco Documentation
---

# Page

A page describes a URL-addressable destination that has been resolved and for which a view must be produced. A page aligns with the concept of a web page from the end user's point of view. Pages are often arranged into page hierarchies that constitute a web site's navigation structure.

Pages can specify whether they require user authentication before rendering. Unauthenticated users will not be able to render the page.

Pages also have optional types that allow them to be dispatched by page type rather than Page ID. Pages have one or more template instances associated with them. This allows them to render distinctly for different intended output formats \(for example, HTML, PDF, or wireless\).

## Locations

-   `classpath:/alfresco/site-data/pages`
-   `classpath:/alfresco/web-extension/site-data/pages`

## Defnition

```

          
<page>
  <!-- Optional authentication setting -->
  <authentication>none | user</authentication>

  <!-- Optional page type ID (otherwise assumes generic) -->
  <page-type-id>PAGE_TYPE_ID</page-type-id>
  
  <!-- Use this to associate a default template -->
  <template-instance>TEMPLATE_ID</template-instance>
  
  <!-- Use this to associate a template to this page for a given format -->
  <template-instance format="FORMAT_ID">TEMPLATE_ID</template-instance>
</page>
          
        
```

## Properties

-   `<template-instance>` - The IDs of one or more template instances that will be used to render this Page when requested for a give FORMAT\_ID. If the format attribute is not supplied, it is assumed to have the value `default`.

## Optional properties

-   `<authentication>` - the level of authentication required in order for the end user to access this page. Valid authentication values are `none` or `user` \(defaults to none\).
-   `<page-type-id>` - the ID of the page type of this page.

## Example - page with authentication

The following file defines a page called "products". Only authenticated users are allowed to access the page. When the page is asked to render in the default format, it looks to the template instance with the ID `landing1`. When the page is asked to render in the print format, it looks to the template instance with the ID landing1-print.

Were you to set up the `landing1-print` template, you would be able to request the print format for this page using the following URL:

`http://localhost:8080/webapp/page/products?f=print`

```

          
classpath:/alfresco/web-extension/site-data/pages/products.xml

<?xml version="1.0" encoding="utf-8"?>
<page>
  <id>products</id>
  <title>Products Page Title</title>
  <description>Products Page Description</description>
  <authentication>user</authentication>
  <template-instance>landing1</template-instance>
  <template-instance format="print">landing1-print</template-instance>
</page>
          
        
```

**Parent topic:**[Surf object XML quick reference \(siteData\)](../references/surf-object-xml-reference.md)

