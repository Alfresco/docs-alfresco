---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting error messages
---

# Test and familiarize after installing Alfresco in a clustered environment

You have successfully installed and configured Alfresco in a distributed/clustered environment. The aim of this section is to make sure that the features and customizations you have added, are operational.

Here are some of the tips to help you test your Alfresco customizations.

**Note:** Alfresco recommends that you create a test site for testing purpose and put all your test data in that site.

-   Check that the Alfresco application server is running.
-   Can you login to Alfresco using your user name and password. See [Logging in](../tasks/gs-login.md).
-   Check that various Alfresco components are communicating with each other.
-   For a clustered installation, check if one node is down, check if the request is forwarded to the next available node.
-   Check if clustering is working properly by running the [cluster validation tool](../tasks/adminconsole-reposerverclustering.md) in the Admin Console.
-   Check if you are using a clustering-enabled license.
-   Change the cluster-related properties in the alfresco-global.properties file, and check if all the nodes are up and running.

**Note:** After you have finished testing, remember to delete the test site or test data in order to clear your database. Alternatively, if you have made any configuration changes, it is recommended that you [Uninstall Alfresco](../tasks/uninstall-alfresco.md) and then [Reinstall Alfresco](installs-eval-intro.md) to get a clean database.

**Parent topic:**[Testing Alfresco installation](../concepts/testing-alfresco.md)

