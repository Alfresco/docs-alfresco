---
title: Adding optional indexes to a database
---
When you are upgrading the database, you can add optional indexes in order to support the metadata query feature. This information lets you know the likely duration of the upgrade and how to do it incrementally.

For large repositories, creating the database indexes to support the transactional metadata query can take some time. To check how long it will take, you can add the first index to the database and note the time taken. The full upgrade is estimated to take less than 10 times this value. However, this can vary depending on the structure of the data, the database, and the size of the repository.

The [SQL patch script](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/dbscripts/upgrade/4.2/org.hibernate.dialect.Dialect/metadata-query-indexes.sql) can be run in parts, adding one index at a time. The patch is marked complete by the statement that inserts into alf\_applied\_patch. The patch can be marked as unapplied using the SQL delete statement.
