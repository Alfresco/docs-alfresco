---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JS API transformImage
---

# `transformImage`

The `transformImage` methods use the image transformation services in Alfresco.

**Note:** To use these services, the ImageMagick components must be installed and working correctly. For more detailed information on ImageMagick, please refer to the ImageMagick web site.

**Parent topic:**[Transformation API](../references/API-JS-Transformation.md)

## `transformImage(mimetype)`

`transformImage(mimetype)`

This method transforms an image to a new image format.

### Parameters

-   **mimetype**

### Returns

Returns the transformed image node if successful, or null if the transformation failed.

## `transformImage(mimetype, options)`

`transformImage(mimetype, options)`

This method transforms a document to a new document MIME type format. It copies the document, changes the extension to match the new MIME type, and then applies the transformation. The transformed image node is returned if successful, or null is returned if the transformation failed.

### Parameters

-   **mimetype**

-   **options**

### Returns

Returns the transformed image node if successful, or null if the transformation failed.

## `transformImage(mimetype, destination)`

`transformImage(mimetype, destination)`

This method transforms a document to a new document MIME type format. It copies the document, changes the extension to match the new MIME type, and then applies the transformation.

### Parameters

-   **mimetype**

-   **destination**

### Returns

Returns the transformed image node if successful, or null if the transformation failed.

## `transformImage(mimetype, options, destination)`

`transformImage(mimetype, options, destination)`

This method transforms an image to a new image format, applying the supplied ImageMagick options. It copies the image document in the specified destination folder, changes the extension to match the new MIME type, and then applies the transformation.

### Parameters

-   **mimetype**
-   **options**
-   **destination**

### Returns

Returns the transformed image node if successful, or null if the transformation failed.

