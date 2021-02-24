---
author: Alfresco Documentation
---

# Exception handling in web scripts

Great care must be taken when using exception handling within a web script. If any exception expected to be handled by the repository is handled by the web script, this can lead to inconsistency of state, and potentially corruption of the repository.

As a web script executes it will perform operations such as creating a new document in the repository. While it seems logical to handle possible exceptions, such as failure to create a document \(possibly due to permissions, or the existence of a document with the same name in the same folder\), this should be avoided at the web script level. Such exceptions will be handled appropriately by the repository. In practice you should only carry out exception handling for exceptions that you know are not handled at a lower layer of Alfresco Content Services.

**Parent topic:**[Repository-tier web scripts](../concepts/ws-overview.md)

