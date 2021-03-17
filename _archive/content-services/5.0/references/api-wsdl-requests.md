---
author: Alfresco Documentation
---

# requests

The `requests` element represents a collection of request types for the web script. The `requests` element is optional.

The `requests` element has the following child elements:

-   **`request`**

    Denotes a request.


The `request` element has the following attributes:

-   **`type`**

    This attribute specifies the request type.


`requests` element example:

```

  <format default="cmisacl">argument</format>
  **<requests\>
    <request type="cmis.acl"/\>
  </requests\>**
  <responses>
    <response type="cmis.acl"/>
  </responses>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

