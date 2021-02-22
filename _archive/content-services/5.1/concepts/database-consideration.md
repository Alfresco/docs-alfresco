---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Database considerations

Large repositories require some additional consideration during an upgrade, such as optimization of the database and adding optional indices to the database for metadata queries.

Two important aspects to consider when upgrading a large repository are:

1.  Transactional metadata query is a feature that requires the creation of new indices. For large repositories, this process may take a long time. See [Transactional metadata query](intrans-metadata.md) for more details.
2.  After restoring the production data of large repositories and creating the indices, refer to [Database validation - Maintenance and Tuning](zeroday-database.md) to ensure optimal performance.

    After applying the patches, check that the logs show no warnings or issues with the database. If the indices could not be created, some queries may run very slow.


**Parent topic:**[Upgrade prerequisites checklist](../concepts/upgrade-prerequisites.md)

