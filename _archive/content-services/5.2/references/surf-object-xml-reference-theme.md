---
author: Alfresco Documentation
---

# Theme

Themes capture default settings for the rendering of elements in the request. A theme is a unique identifier as well as a collection of properties and page type overrides. When a theme is selected, its properties and its page type overrides apply to the request.

A theme captures default settings for the rendering framework. Different themes can have different rendering behaviors.

## File locations

In the following sections you will see that two locations are specified:

-   `classpath:/alfresco/site-data/themes`
-   `classpath:/alfresco/web-extension/site-data/themes`

## Definition

```

          
<theme>
  <!-- Optional page type overrides -->
  <page-types>
    <page-type>
      <id>PAGE_TYPE_ID</id>
      <page-id>PAGE_ID</page-id>
    </page-type>
  </page-types>
</theme>
          
        
```

## Properties

-   `<page-types>` - one or more optional overrides that assign page instances to be used when Surf asks for a Page of a particular type. Using this mechanism, themes can swap out different default Pages to significantly affect the look and feel.

## Example

The following file defines a theme that overrides the login page type to include a different default page. When this theme is used, Surf will render back the `default-login-page` Page when the `login` page type is requested.

```

          
classpath:/alfresco/web-extension/site-data/themes/default.xml

<?xml version="1.0" encoding="utf-8"?>
<theme>
  <id>default</id>
  <page-types>
    <page-type>
      <id>login</id>
      <page-id>default-login-page</page-id>
    </page-type>
  </page-types>
</theme>
          
        
```

**Parent topic:**[Surf object XML quick reference \(siteData\)](../references/surf-object-xml-reference.md)

