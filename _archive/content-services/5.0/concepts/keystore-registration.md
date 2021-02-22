---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Keystore key registration

The keystore keys are registered with the repository to ensure that they are not accidentally changed.

During bootstrap and JMX keystore reload and re-encryption operations, the repository checks if the main keystore's keys and the metadata key have changed. If they have changed, the repository throws an exception.

**Parent topic:**[Managing Alfresco keystores](../concepts/alf-keystores.md)

