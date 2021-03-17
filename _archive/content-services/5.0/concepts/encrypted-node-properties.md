---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Encrypted Node Properties

Data encryption in Alfresco uses secret keys which are stored in the Alfresco Java keystore.

Alfresco provides a type `d:encrypted` that can be used to store sensitive property values in the database in a sealed encrypted format.

-   **[Using encrypted node properties](../concepts/using-data-encryption.md)**  
Node properties can be encrypted in the repository by setting their type to `d:encrypted` in the model.
-   **[Changing encrypted properties keystore keys and re-encryption](../concepts/key-store-keys-reencryption.md)**  
 During bootstrap, the repository checks whether the keys in the main encrypted properties keystore have been changed in order to detect any accidental keystore changes.

**Parent topic:**[Managing Alfresco keystores](../concepts/alf-keystores.md)

