---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Development, JavaScript, API/Script]
keyword: [JavaScript API, Scripting, ScriptContent API, write]
---

# `write`

`write(content)` this method copies the content from the specified `ScriptContent`.

**Parent topic:**[ScriptContentData API](../references/API-JS-ScriptContentData.md)

## `write(content)`

Sets the content stream from another content object.

### Parameters

-   **content**

    The source ScriptContentData object.


### Example

```

var sourceFilename = "TEST_FILE_1.TXT";
var destFilename = "TEST_FILE_2.TXT";

var sourceNode = companyhome.childByNamePath(sourceFilename);
var destNode = companyhome.childByNamePath(destFilename);

sourceNode.content = "This is the SOURCE node content!";
destNode.properties.content.write(sourceNode.properties.content);        
        
```

## `write(content, applyMimetype, guessEncoding)`

Sets the content stream from another content object.

### Parameters

-   **content**

    The source ScriptContentData object.

-   **applyMimetype**

    If set to true, the mimetype will be set from the mimetype of the source ScriptContentData object. If false, the mimetype of the target is unchanged.

-   **guessEncoding**

    If true the method will attempt to determine the encoding from the source content stream. If false, the encoding as set in the source content object will be used.


### Example

```

// use mimetype and encoding from source node
destNode.properties.content.write(sourceNode.properties.content, true, false);        
        
```

## `write(inputStream)`

Sets the content stream from a source inputStream.

### Parameters

-   **inputStream**

    The source inputStream.


### Example

```

// use source node content stream
destNode.properties.content.write(sourceNode.properties.content.getInputStream());
        
```

