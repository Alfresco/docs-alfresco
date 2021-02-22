---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Testing an Alfresco upgrade

Testing an upgrade checks that Alfresco is successfully upgraded and is working as expected after the upgrade.

**Test and familiarize after upgrading Alfresco**

You have successfully upgraded Alfresco. Now test that the core features and functionalities of Alfresco that you intend to use work as expected.

Here are some of the tips to help you familiarize yourself with Alfresco.

**Note:** Alfresco recommends that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check if the roles users had in the previous Alfresco version are still valid in the new upgraded Alfresco.
-   Check if your data or document in the previous Alfresco version are available in the new upgraded Alfresco.

**Test the Alfresco server after customizing an upgrade**

There are a number of tests that you can perform in Alfresco after customizing an upgrade.

-   Make sure that the Alfresco server is up and running.
-   Make sure that the errors in the alfresco.log file. are checked and understood.

**Test and familiarize after upgrading and configuring Alfresco**

You have successfully upgraded and configured Alfresco. Now make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your Alfresco customizations.

**Note:** Alfresco recommends that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check if the users or groups created previously, still exist.
-   Check if all the dashboards created previously, still exist.
-   Check if the folders in the document library that were created prior to the upgrade, still exist.

**Test and familiarize after upgrading Alfresco in a cluster**

You have successfully upgraded and configured Alfresco in a distributed/clustered environment. Now make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your Alfresco customizations.

**Note:** Alfresco recommends that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check that various Alfresco components are communicating with each other.
-   For a clustered upgrade, check if one node is down, check if the request is forwarded to the next available node.

**Test and familiarize after upgrading and configuring Alfresco in a cluster**

You have successfully upgraded and configured Alfresco in a distributed/clustered environment. Now make sure that the features and customizations you have added are operational.

Here are some of the tips to help you test your Alfresco customizations.

**Note:** Alfresco recommends that you create one or two test sites for testing purpose and put all your test data in those sites. After finishing the tests, you can delete the test sites in order to clear your database.

-   Check if the users or groups created previously, still exist.
-   Check if all the dashboards created previously, still exist.
-   Check if the folders in the document library that were created prior to the upgrade, still exist.
-   Check if clustering is working properly by running the [cluster validation tool](../tasks/adminconsole-reposerverclustering.md) in the Admin Console.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

