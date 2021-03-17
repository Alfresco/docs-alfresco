---
author: Alfresco Documentation
---

# jsonUtils

A root object for parsing JSON.

The `jsonUtils` object provides the ability to programmatically traverse JSON documents, where the root of the document is either a JSON array or a JSON object.

JSONUtils methods

-   **toJSONString \(object\)**

    Converts a JavaScript native object and converts it to the corresponding JSON string.

-   **toJSONObject\(object\)**

    Converts a given JavaScript native object to an org.json.simple.JSONObject Java object. This is a specialized method only used by routines that will later expect a JSONObject.

-   **toObject\(jsonString\)**

    Takes a JSON string and converts it to a native JavaScript object.

-   **toObject\(jsonObject\)**

    Takes a JSON object and converts it to a native JavaScript object.

-   **encodeJSONString\(value\)**

    Encodes a JSON string value.


**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

