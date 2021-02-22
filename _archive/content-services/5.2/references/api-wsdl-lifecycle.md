---
author: Alfresco Documentation
---

# lifecycle

The `lifecycle` element allows a web script developer to indicate the development status of a web script. Typically, web scripts start out in a draft state while being developed or tested, are promoted to production quality for widespread use, and finally retired at the end of their life. The `lifecycle` element is optional.

The `lifecycle` element can have the following values:

-   **`none`**

    Indicates this web script is not part of a lifecycle


-   **`sample`**

    Indicates this web script is a sample and is not intended for production use


-   **`draft`**

    Indicates this web script might be incomplete, experimental, or still subject to change


-   **`public_api`**

    Indicates this web script is part of a public API and should be stable and well tested


-   **`draft_public_api`**

    Indicates this web script is intended to become part of the public API but is incomplete or still subject to change


-   **`deprecated`**

    Indicates this web script should be avoided; it might be removed in future versions of the product


-   **`internal`**

    Indicates this web script is for Alfresco Content Services use only; it should not be relied upon between versions and is likely to change


The `lifecycle` element has no attributes.

`Lifecycle` option example:

```

<webscript>
<shortname>Example Lifecycle Usage</shortname>
<url>/lifecycle</url>
**<lifecycle\>sample</lifecycle\>**
</webscript>

```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

