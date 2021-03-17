---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Adding optional indexes to database

This topic provides an overview on upgrading the database by adding optional indexes in oder to support metadata query feature. It also provides information on how long the upgrade may take \(duration of upgrade\) and how to do it incrementally.

For large repositories, creating the database indexes to support the transactional metadata query may take some time. To check how long it will take, you can add the first index to the database and note the time taken. The full upgrade is estimated to take less than 10 times this value. However, this may vary depending on the structure of the data, the database, and the size of the repository.

The SQL patch script in <config\>/alfresco/dbscripts/upgrade/4.2/org.hibernate.dialect.Dialect/metadata-query-indexes.sql can be run in parts, adding one index at a time. The patch is marked complete by the statement that inserts into alf\_applied\_patch. The patch can be marked as unapplied using the SQL delete statement.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

