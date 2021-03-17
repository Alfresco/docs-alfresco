# Using Administrator application

Use the Administrator application to perform basic administration functions in Alfresco Process Services. For example, you can inspect the state of Process Engines, delete an app, view when an app was deployed, or monitor clusters.

The Administrator application has the following tabs:

-   **Apps** - Use for deleting apps, redeploying an app to another cluster, and downloading apps.

-   **Deployments** - View the current deployment and its content such as process definitions, deploy time, tenant information and so on.

-   **Definitions** - View process definitions and their related instances.

-   **Instances** - View running or completed process instances for each process definition. You can also see related information for each process definition, such as, tasks, variables, subprocesses, jobs, decision tables, and forms information. In addition, you can download binary process data for troubleshooting process issues.

-   **Tasks** - View tasks information and perform actions on them, such as edit, assign/claim, delegate, complete tasks. In addition, you can view task forms, sub tasks, variables, and identity links for a particular task.

-   **Jobs** - View the current job details based on its Process Instance ID, due date, and Job Id. Exceptions are displayed if the jobs failed to execute \(For example, if a mail server could not be reached\).

-   **Monitoring** - Enables you to monitor the cluster information.

-   **Configuration** - Add and configure cluster information. See [Cluster configuration and monitoring](cluster_configuration_and_monitoring.md) for more information.


-   **[Deploying apps](../topics/deploying_apps.md)**  
You can deploy apps in various ways in the Administrator application. For example, you can upload and publish an app model from a zip file, deploy an existing app from one cluster to another, or redeploy an existing app model to another cluster. Deploying app models to another cluster is particularly useful when your app needs to be progressed from staging to production or copied from the development environment to production. However, when any changes made to the development environment need to be carried over to production, you should select the target cluster \(the production system in this case\) in the Administrator application and redeploy your app.
-   **[Downloading binary process data files](../tasks/admin-app-binary-download.md)**  
Sometimes, you may experience an issue with a process and you need to resolve the problem. The Administrator app gives you the option to download the binary process data for use in troubleshooting and investigating process issues.
-   **[Read-only access to the Administrator app](../tasks/admin-app-read-only.md)**  
You may have users in your organization who assist when debugging problems and need to access the information in the Administrator app, but who don't need to make changes. You can give these users permission for read-only access to the Administrator app. This ensures that these users are able to contribute to issue trouble shooting without accidentally breaking any operational processes.

**Parent topic:**[Alfresco Process Services Administrator](../topics/administrator_application.md)

