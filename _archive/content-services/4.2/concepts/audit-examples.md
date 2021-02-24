---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Auditing examples

This section describes some auditing examples.

-   ****Audit data passed to recordAuditValues\(\):****

    ```
    Root path:
       /alfresco-api/post/NodeService/createStore
    Map:
       args/protocol = "workspace"
       args/identifier = "SpacesStore"
       result = StoreRef[workspace://SpacesStore]
    ```

    If the root path passes the initial filtration phase - there is at least one component interested in auditing the information - then the map is expanded.

-   **Expanded audit data:**

    ```
    Map:
       /alfresco-api/post/NodeService/createStore/args/protocol = "workspace"
       /alfresco-api/post/NodeService/createStore/args/identifier = "SpacesStore"
       /alfresco-api/post/NodeService/createStore/result = StoreRef[workspace://SpacesStore]
    ```

    The filtered data is then passed through the path mappings, generating a new ''Map'' of data for each application.

-   **Path-mapped audit data:**

    ```
    Map:
       /MyApp/createStore = StoreRef[workspace://SpacesStore]
    ```

    This data is then passed to any extractors and generators to produce a final ''Map'' of data that will be persisted.

-   **Persisted audit data:**

    ```
    Map:
       /MyApp/createStore/value = StoreRef[workspace://SpacesStore]
       /MyApp/createStore/rootNode = NodeRef[workspace://SpacesStore/fd123...]
    ```


**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

