---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [CMIS, Services, API/Script]
keyword: [CMIS, services]
---

# CMIS services

CMIS provides services that you can access using SOAP or AtomPub, depending on your preferred architectural style.

CMIS services include the following:

-   **Repository services** let you discover available repositories, get the capabilities of these repositories, and provide basic Data Dictionary information of what types are available in the repository.
-   **Navigation services** let you navigate the repository by accessing the folder tree and traversing the folder/child hierarchy. You can use these services to get both children and parents of an object.
-   **Object services** provide the basic CRUD \(Create, Read, Update, Delete\) and Control services on any object, including document, folder, policy, and relationship objects. For document objects, this includes setting and getting of properties, policies, and content streams. Object services retrieve objects by path or object ID. Applications may also discover what actions users are allowed to perform.
-   **Multi-filing services** let you establish the hierarchy by adding or removing an object to or from a folder.
-   **Discovery services** provide Query and Change services, and a means of paging the results of the query.
-   **Change services** let you discover what content has changed since the last time checked, as specified by a special token. You can use Change services for external search indexing and replication services.
-   **Versioning services** control concurrent operation of the Object services by providing Check In and Check Out services. Version services also provide version histories for objects that are versioned.
-   **Relationship services** let you create, manage, and access relationships or associations between objects as well as allow an application to traverse those associations.
-   **Policy services** apply policies on document objects. Policies are free-form objects and can be used by implementations for security, record, or control policies.
-   **ACL services** let you create, manage, and access Access Control Lists to control who can perform certain operations on an object.

**Parent topic:**[Building applications with Content Management Interoperability Services \(CMIS\)](../concepts/cmis-about.md)

