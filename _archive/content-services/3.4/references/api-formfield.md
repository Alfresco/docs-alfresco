---
author: [Alfresco Documentation, Alfresco Documentation]
source: Community web scripts
audience: 
category: API/Script
option: [form data api, formfield]
---

# formfield

The `formfield` object represents a single field within the form, allowing access to the field metadata and content through the following API:

-   **`name`**

    \(Read-only string\) The name of the field as defined in the form. Note that form fields may not be uniquely named.


-   **`isFile`**

    \(Read-only Boolean\) Indicates whether the field is of type `file`.


-   **`value`**

    \(Read-only string\) The value of the field as entered into the form. Fields of type `file` return the file name. File content must be retrieved through content instead.


-   **`content`**

    \(Read-only `ScriptContent`\) The value of the field as entered into the form represented as a `ScriptContent` object.


-   **`mimetype`**

    \(Read-only string\) For form fields of type `file`, the MIME type of the content; otherwise, null.


-   **`filename`**

    \(Read-only string\) For form fields of type `file`, the file name of the uploaded file; otherwise, null.


**Parent topic:**[Form Data API](../references/API-form-data.md)

