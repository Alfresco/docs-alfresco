---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# content

The `content` object provides the following properties.

|`id`|The ID of the content object.|
|`typeId`|The type ID of the content object.|
|`properties`|An associative array of properties about the object.|

The following properties are metadata fields about the object:

|`timestamp`|The time \(long\) when the object was loaded.|
|`endpointId`|The ID of the endpoint from which the object was loaded.|
|`isLoaded`|Whether the object successfully loaded.|
|`statusCode`|Status code from the attempt to load the object.|
|`statusMessage`|Status message from the attempt to load the object.|

The following properties contain the payload of the document itself:

|`text`|The content of the selected object as text.|
|`xml`|The content of the selected object as XML.|

For example, you can work with metadata about the currently selected object as follows:

```
var id = content.id;
var typeId = content.typeId;
var endpointId = content.endpointId;
var timestamp = content.timestamp;
var isLoaded = content.isLoaded;
var statusCode = content.statusCode;
var statusMessage = content.statusMessage;
var modifiedDate = content.properties["cm:modified"];
```

You can also write components that work with the data of the object. This is particularly useful if you are dispatching from XML of Web Form based objects:

```
var text = content.text;
var xml = context.xml;

// parse the xml and load properties into our model
var e4x = new XML(content.xml);
model.productName = e4x.*::name.toString();
model.productDescription = e4x.*::description.toString();
```

Where the XML could be the following:

```
<pr:product xmlns:alf="http://www.alfresco.org"
            xmlns:chiba="http://chiba.sourceforge.net/xforms"
            xmlns:ev="http://www.w3.org/2001/xml-events"
            xmlns:pr="http://www.alfresco.org/alfresco/pr"
            xmlns:xf="http://www.w3.org/2002/xforms"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:xs="http://www.w3.org/2001/XMLSchema"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

   <pr:name>Demo Product 1</pr:name>
   <pr:description>Demo Product 1</pr:description>

</pr:product>
```

**Note:** The `content` object is available only if an object ID is provided as part of the page URL.

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

