---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Development, API, JavaScript API]
option: JS API transformImage
---

# `transformImage`

The `transformImage` methods use the image transformation services in Alfresco Content Services.

**Note:** To use these services, the ImageMagick components must be installed and working correctly. For more detailed information on ImageMagick, refer to the ImageMagick web site.

**Parent topic:**[Transformation API](../references/API-JS-Transformation.md)

## `transformImage(mimetype)`

`transformImage(mimetype)` this method transforms an image to a new image format.

### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.


### Returns

Returns the transformed image node if successful, or null if the transformation failed.

### Example

```

// transform JPEG image file to BMP        
var node = companyhome.childByNamePath("WIND_TURBINE.JPG");

var transformedNode = node.transformImage("image/bmp");  
        
```

## `transformImage(mimetype, options)`

`transformImage(mimetype, options)` this method transforms a document to a new document MIME type format. It copies the document, changes the extension to match the new MIME type, and then applies the transformation. The transformed image node is returned if successful, or null is returned if the transformation failed.

### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.

-   **options**

    Image convert command options.


### Returns

Returns the transformed image node if successful, or null if the transformation failed.

## `transformImage(mimetype, destination)`

`transformImage(mimetype, destination)` this method transforms a document to a new document MIME type format. It copies the document, changes the extension to match the new MIME type, and then applies the transformation.

### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.

-   **destination**

    The destination folder the transformed document will be output to.


### Returns

Returns the transformed image node if successful, or null if the transformation failed.

### Example

```

// transform image from JPEG to GIF and locate in destination folder
var node = companyhome.childByNamePath("WIND_TURBINE.JPG");
var destDir = companyhome.childByNamePath("TRANSFORMED_IMAGES");

var transformedNode = node.transformImage("image/gif", destDir);
        
```

## `transformImage(mimetype, options, destination)`

`transformImage(mimetype, options, destination)` this method transforms an image to a new image format, applying the supplied ImageMagick options. It copies the image document in the specified destination folder, changes the extension to match the new MIME type, and then applies the transformation.

### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.

-   **options**

    Image convert command options.

-   **destination**

    The destination folder the transformed document will be output to.


### Returns

Returns the transformed image node if successful, or null if the transformation failed.

