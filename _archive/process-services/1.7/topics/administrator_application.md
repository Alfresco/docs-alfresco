# Alfresco Process Services Administrator

The Administrator app can be used to inspect and manage the data for an Alfresco Process Services Process Engine \(or cluster of engines\). It also is used for cluster configuration and monitoring. It is distributed as a separate web application \(WAR file\).

Typically, there is one single Alfresco Process Services Administrator application for multiple environments \(for example, development, testing, production, and so on\), which is accessed by a handful of users \(system administrators\). As such, it is generally not necessary to have multiple instances of this application running \(although it is certainly technically possible\).

The Process Engine is cluster-enabled in the sense that, together with the Alfresco Process Services Administrator, a user can configure and monitor a cluster \(or multiple different clusters\) through a graphical user interface. The clustered engines will use the same configuration and will report metrics and status back to the Alfresco Process Services Administrator where they are displayed.

-   **[Installing Alfresco Process Services Administrator](../topics/installing_administrator.md)**  
The Alfresco Process Services Administrator is distributed as a regular *WAR* \(Web Application ARchive\) file that can be dropped in any Java web container.
-   **[Using Administrator application](../topics/using_administrator_application.md)**  
Use the Administrator application to perform basic administration functions in Alfresco Process Services. For example, you can inspect the state of Process Engines, delete an app, view when an app was deployed, or monitor clusters.
-   **[Deploying apps](../topics/deploying_apps.md)**  
You can deploy apps in various ways in the Administrator application. For example, you can upload and publish an app model from a zip file, deploy an existing app from one cluster to another, or redeploy an existing app model to another cluster. Deploying app models to another cluster is particularly useful when your app needs to be progressed from staging to production or copied from the development environment to production. However, when any changes made to the development environment need to be carried over to production, you should select the target cluster \(the production system in this case\) in the Administrator application and redeploy your app.
-   **[Downloading an app](../topics/downloading_an_app.md)**  
 Downloading an app from the Administrator application is very simple: just select it and click **Download app**.
-   **[Deleting an app](../topics/deleting_an_app.md)**  
 To delete an app from the Administrator application, select it and click **Delete App**.

**Parent topic:**[Administering Alfresco Process Services](../topics/adminGuide.md)

