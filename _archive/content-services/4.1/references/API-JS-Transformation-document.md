---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
keyword: transformDocument
---

# `transformDocument`

These methods use the document transformation services in Alfresco.

The OpenOffice server is required for some document transformations.

**Parent topic:**[Transformation API](../references/API-JS-Transformation.md)

## `transformDocument(mimetype)`

`transformDocument(mimetype)` this method transforms a document to a new document MIME type format. It makes a copy of the document, changes the extension to match the new MIME type, and applies the transformation.

### Parameters

-   **mimetype**

    The mimetype of the new document.


### Returns

Returns the transformed document node if successful, or null if the transformation failed.

### Example

```


// transform document type to HTML
var node = companyhome.childByNamePath("TEST_1.TXT");

var transformedNode = node.transformDocument("text/html");
        
        
```

## `transformDocument(mimetype, destination)`

`transformDocument(mimetype, destination)` this method transforms a document to a new document MIME type format. It makes a copy of the document in the specified destination folder, changes the extension to match the new MIME type, and applies the transformation.

### Parameters

-   **mimetype**

    The mimetype of the new document.


-   **destination**

    The destination folder in which the new document will be placed.


### Returns

Returns the transformed document node if successful, or null if the transformation failed.

### Example

```

// transform document and place new document in destination folder
var node = companyhome.childByNamePath("TEST_1.TXT");
var destDir = companyhome.childByNamePath("TRANSFORMED_DOCS");

var transformedNode = node.transformDocument("text/xml", destDir);
        
```

