---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API processTemplate
---

# `processTemplate`

The `processTemplate` methods use the FreeMarker template processing services in Alfresco.

**Parent topic:**[Transformation API](../references/API-JS-Transformation.md)

## `processTemplate(template)`

`processTemplate(template)` this method executes a FreeMarker template file against the node. The node is used as the context for the document or space object in the templating default model.

### Parameters

-   **template**

    The node of the template to execute as a ScriptNode object.


### Returns

Returns the transformed image node if successful, or null if the transformation failed.

## `processTemplate(template, args)`

`processTemplate(template, args)` this method executes a FreeMarker template file against the node, passing the supplied array of name/value pair arguments to the template. The node is used as the context for the document or space object in the templating default model.

### Parameters

-   **template**

    The node of the template to execute as a ScriptNode object.

-   **args**

    An associative array containing the name-value pairs of arguments to be passed to the template.


### Returns

Returns the result of the template execution as a string.

## `processTemplate(template)`

`processTemplate(template)` this method executes a FreeMarker template file against the node. The node is used as the context for the document or space object in the templating default model.

### Parameters

-   **template**

    The template to process passed as a string.


### Returns

Returns the transformed image node if successful, or null if the transformation failed.

## `processTemplate(template, args)`

`processTemplate(template, args)` this method executes a FreeMarker template file against the node, passing the supplied array of name/value pair arguments to the template. The node is used as the context for the document or space object in the templating default model.

### Parameters

-   **template**

    The template to process passed as a string.

-   **args**

    An associative array containing the name-value pairs of arguments to be passed to the template.


### Returns

Returns the result of the template execution as a string.

