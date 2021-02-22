---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JavaScript API
---

# `transformDocument`

These methods use the document transformation services in Alfresco.The OpenOffice server is required for some document transformations.

**Parent topic:**[Transformation API](../references/API-JS-Transformation.md)

## `transformDocument(mimetype)`

`transformDocument(mimetype)`

This method transforms a document to a new document MIME type format.

It makes a copy of the document, changes the extension to match the new MIME type, and applies the transformation.

### Parameters

-   **mimetype**

### Returns

Returns the transformed document node if successful, or null if the transformation failed.

## `transformDocument(mimetype, destination)`

`transformDocument(mimetype, destination)`

This method transforms a document to a new document MIME type format.

It makes a copy of the document in the specified destination folder, changes the extension to match the new MIME type, and applies the transformation.

### Parameters

-   **mimetype**

-   **destination**

### Returns

Returns the transformed document node if successful, or null if the transformation failed.

