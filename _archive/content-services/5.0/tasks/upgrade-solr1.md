---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Upgrading the Solr 1 search service

In order to upgrade to the Solr 4 search service, whilst the Solr 4 indexes are being built, you must transition from a previous version of Alfresco \(for example, Alfresco One 4.2.x\) with the Solr 1 search service to Alfresco One 5.0 with the Solr 1 search service.

1.  Install Alfresco One 5.0 with both the Solr 1 and Solr 4 search services.

2.  From your old Solr 1 installation, copy all the indexes to the new Solr 1 installation.

    1.  Copy the alf\_data/solr/workspace/SpacesStore/index directory from the old Solr 1 installation to the alf\_data/solr/workspace/SpacesStore/index directory of the new Solr 1 installation.

    2.  Copy the alf\_data/solr/archive/SpacesStore/index directory from the old Solr 1 installation to the alf\_data/solr/archive/SpacesStore/index directory of the new Solr 1 installation.

3.  Reapply the configuration changes made to the solrcore.properties file of the old Solr 1 installation to the solrcore.properties file of the new Solr 1 installation.

    1.  Reapply the changes made to the alf\_data/solr/workspace-SpacesStore/conf/solrcore.properties file from the old Solr 1 installation to the alf\_data/solr/workspace-SpacesStore/conf/solrcore.properties file of the new Solr 1 installation.

    2.  Reapply the changes made to the alf\_data/solr/archive-SpacesStore/conf/solrcore.properties file from the old Solr 1 installation to the alf\_data/solr/archive-SpacesStore/conf/solrcore.properties file of the new Solr 1 installation.

4.  Ensure that your Alfresco One 5.0 instance is set to use Solr 1 search service during this process.


To validate that your old Solr 1 indexes and configuration changes are correctly copied over to the new Solr 1 installation, follow these steps:

1.  Run Alfresco One 4.x with the old Solr 1 installation, and then run Alfresco One 5.0 with the new Solr 1 installation.
2.  Generate the SUMMARY report for both the old and the new Solr indexes.
3.  Compare the two SUMMARY reports to ensure that both have the same number of nodes, transactions, and ACLs.

**Parent topic:**[Upgrading from Solr to Solr 4 search](../tasks/solr-solr4-migration.md)

