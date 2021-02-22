---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Upgrading from Lucene to Solr 4 search

This topic describes how to upgrade from Alfresco Enterprise 4.x with the Lucene  search server to Alfresco One 5.0  with the Solr 4 search server.

 

**Note:** In this documentation, we are referring to **Solr 1.4** search subsystem as **Solr**.

1.  For versions prior to Alfresco 4.x, upgrade to Alfresco 4.x and continue to use the Lucene search subsystem as before.

2.  Install and configure Solr on Alfresco 4.x to track the repository.

    For more information, see [Installing and configuring Solr](solr4-install-config.md).

3.  Monitor progress using the `SUMMARY` report.

    ```
    [http://localhost:8080/solr/admin/cores?action=SUMMARY&wt=xml](http://localhost:8080/solr/admin/cores?action=SUMMARY&wt=xml) 
    ```

4.  When the Solr index is updated as reported by the `SUMMARY` report, enable the Solr subsystem and disable the Lucene subsystem.

5.  Follow the instructions for [upgrading from Solr to Solr 4 search](solr-solr4-migration.md).


**Parent topic:**[Upgrading search subsystems](../concepts/search-migration.md)

