---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Web Script, API/Script]
keyword: [Form Data API, ]
---

# Form Data API

The Form Data API provides direct access to form fields submitted through the `multipart/form-data` content type. When requests of this type are posted to a web script, the Web Script Framework supplies the root object named `formdata` to the controller script of the web script.

-   **[formdata](../references/api-formdata.md)**  
`formdata` is the root object that represents the submitted form, which comprises one or more form fields.
-   **[formfield](../references/api-formfield.md)**  
The `formfield` object represents a single field within the form, allowing access to the field metadata and content through the following API:

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

