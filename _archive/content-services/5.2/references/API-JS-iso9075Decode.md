---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: iso9075Decode
---

# `ISO9075Decode`

`ISO9075Decode(string value)` is a helper to decode a ISO9075-encoded string for Lucene PATH statements.

## Parameters

-   **string**

    The string to decode.


## Returns

Returns a decoded string.

## Example

The following code:

```

var rawString = "//test:123 DIR/FILE.TXT @";    
var encodedString = search.ISO9075Encode(rawString);
var decodedString = search.ISO9075Decode(encodedString);        
      
```

Would result in the following strings:

```

rawString: //test:123 DIR/FILE.TXT @
encodedString: _x002f__x002f_test_x003a_123_x0020_DIR_x002f_FILE.TXT_x0020__x0040_
decodedString: //test:123 DIR/FILE.TXT @    
      
```

The following code:

```

var rawString = "@cm\:name:\"banana\"";    
var encodedString = search.ISO9075Encode(rawString);
var decodedString = search.ISO9075Decode(encodedString);
      
```

Would result in the following strings:

```

rawString: @cm:name:"banana"
encodedString: _x0040_cm_x003a_name_x003a__x0022_banana_x0022_
decodedString: @cm:name:"banana"        
      
```

**Parent topic:**[Search API](../references/API-JS-Search.md)

