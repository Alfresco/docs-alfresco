---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Issues to consider before using Encrypted Content Store

This topic outlines issues you should consider before using Encrypted Content Store.

-   Because encryption is done at the content store level and not just for a few files in the repository, you must make sure whether encryption is needed at the content store level or not.
-   Once you make the decision to use Encrypted Content Store, it is irrevocable. This is because when a document is written to the Encrypted Content Store, it is encrypted. If you decide to revert to an unencrypted content store, the content cannot be decrypted.
-   The Encrypted content store is a wrapper around the File content store, and it is not supported to use the Encrypted content store in any other configuration, such as with the Content Store Selector or an Aggregating content store. Such configurations are likely to expose encrypted content in an unencrypted store, such as in the version history or when the content is deleted.
-   Encrypted Content Store is separately licensed and requires that you receive a license key from Alfresco.
-   Multi-tenancy is not supported by Encrypted Content Store.

**Parent topic:**[Encrypted Content Store](../concepts/encrypted-cs-home.md)

