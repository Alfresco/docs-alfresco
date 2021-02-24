# Using the Share Connector demo

Follow these steps to start creating and running processes in Alfresco Share.

**Note:** The LDAP demo server installed with the demo includes four fixed users. The password for each user is password. The following four users are set up so you can try out various groups and user scenarios.

-   *jluc* is a tenant manager in Process Services, a user in Alfresco Content Services, and in the groups engineering and marketing.

-   *kirk* is a tenant admin in Process Services, a user in Alfresco Content Services, and in the group engineering.

-   *wesley* is a user in Process Services and a user in Alfresco Content Services. He is not a member of any group.

-   *admin* is an admin in Process Services and an admin in Alfresco Content Services. This is the only user who has the ability to deploy process definitions from Alfresco Process Services to Share.


1.  Go to the installed Alfresco Share system at [http://localhost:8090/share](http://localhost:8090/share) and login with the following user credentials:

    *userid*: admin

    *password*: password

    Share Connector installs a demo LDAP system which provides several fixed userid/password pairs. The admin user Id provides permissions to start tasks and processes on Share, and to create and deploy processes and apps on the embedded Alfresco Process Services. On your personal dashboard, click the **Tools** icon on the top-right and add the **My Activiti Tasks** dashlet.

    This dashlet is now displayed as well as the original My Tasks dashlet. Use the new dashlet to control processes and tasks inside Alfresco Share.

2.  Go to [http://localhost:8080/activiti-app/](http://localhost:8080/activiti-app/), and log in with the userid *admin* and the password *password*.

    In the embedded app, you can create process definitions and deploy them to Alfresco Share.


-   **[Starting a workflow on a file](../topics/starting_a_workflow_on_a_file.md)**  
In your site’s document library in Alfresco Share, you can start a workflow on one or more files. The following steps describe how to initiate a workflow using one of the pre-defined processes on two files.
-   **[Starting a workflow in Alfresco Share](../topics/starting_a_workflow_in_alfresco_share.md)**  
This tutorial walks you through the steps required to run your first process as a workflow from Alfresco Share using the **My Activiti Tasks** dashlet.
-   **[Creating rules](../topics/creating_rules.md)**  
You can create rules to manage folders in a process. There are two ways to create rules in the Share Connector:

**Parent topic:**[Installing Share Connector](../topics/installing_share_connector.md)

