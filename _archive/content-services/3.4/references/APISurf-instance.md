---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# instance

When rendering a page, the `instance` object will represent the current page model object.

When rendering a template, the `instance` object will represent the current template model object. The parent `page` object will also be available as usual if the template is running within the context of a page.

When rendering a component, the `instance` object will represent the current component model object. The parent `template` and `page` objects will also be available as usual if the component is running within the context of a template and page.

The `instance` object provides the following properties:

|`object`|The currently executing object \(page, template, or component\).|
|`id`|The ID of the currently executing object.|
|`htmlId`|The page-unique HTML ID for the currently executing object.|
|`properties`|An associative array of properties about the currently rendering object.|

The `instance` object provides the following methods:

## `getParameterNames()`

Returns a String\[\] of the names of the request parameters.

## `getParameter(String name)`

Returns the parameter value for the given parameter name.

## `getParameters()`

Returns an associative Array of the request parameter name/value pairs.

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

