---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Admin Console: Repository Services

The Repository Services section on the Admin Console contains pages for setting the Activities feed, the clustering tool, setting which workflow engine is in use, enabling replication, enabling and setting the search service, and controlling the Subscription and Transformation services.

**Note:** The repository Admin Console is for managing individual repository servers and must not be accessed through a load balancer.

-   **[Activities Feed](../tasks/adminconsole-activitiesfeed.md)**  
Activities Feed emails are sent from Alfresco to all users, summarizing the activities they see in their My Activities dashlet. Users will not see these email unless the Activities Feed is enabled. Emails include activities in all sites they are a member of, and by people they are following. You can set the frequency with which these emails are sent, the maximum number of activities they contain, and the maximum age of the activities.
-   **[Admin Console: Repository server clustering](../tasks/adminconsole-reposerverclustering.md)**  
This topic describes how to manage members of a cluster using the Admin Console.
-   **[Admin Console: Enabling workflow process engines](../tasks/adminconsole-processengines.md)**  
Alfresco workflows run on an embedded Activiti workflow engine.
-   **[Admin Console: Working with the replication service](../concepts/adminconsole-replication-config.md)**  
The **Replication Service** page in Admin Console displays the settings to enable or disable the replication service and to control permissions.
-   **[Working with the Search Service](../concepts/adminconsole-searchservice.md)**  
The Search Service page in Admin Console enables you to manage and monitor the search service you want to use in Alfresco.
-   **[Admin Console: Enabling the subscription service](../tasks/adminconsole-subscriptionservice.md)**  
The Subscriptions page allows you to enable or disable the Follow feature for users to follow each other in Share. Alfresco users can keep track of other users activities by choosing to follow them. When users are being followed, the person\(s\) following them will receive activity notifications. The Subscription Service is the underlying service used to manage and generate activity notifications. You can use this page to enable/disable the Subscription Service and the follow feature on a system wide basis.
-   **[Admin Console: Transformation services](../tasks/adminconsole-transformationservices.md)**  
Transformation services let you convert content between different file formats. The JODConverter installation \(part of OpenOffice.org\) is used by Alfresco for document transformations, such as a text file to PDF. The ImageMagick installation is used for image transformations, and it is recommended that you do not change any settings.

**Parent topic:**[Using the Admin Console](../concepts/at-adminconsole.md)

