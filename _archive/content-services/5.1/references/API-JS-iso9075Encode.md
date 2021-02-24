---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: iso9075Encode
---

# `ISO9075Encode`

`ISO9075Encode(string value)` is a helper to encode a value into ISO9075-encoded format for Lucene PATH statements.

## Parameters

-   **string**

    The string to encode. Characters within the string that need to be encoded to ISO9075 will take the format \_xDDDD\_, where DDDD is the hex value of the character.


## Returns

Returns a ISO9075 encoded string.

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

