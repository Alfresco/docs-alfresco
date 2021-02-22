# Alfresco Process Services Administrator

The Administrator app can be used to inspect and manage the data for an Alfresco Process Services Process Engine \(or cluster of engines\). It also is used for cluster configuration and monitoring. It is distributed as a separate web application \(WAR file\).

Typically, there is one single Administrator application for multiple environments \(for example, development, testing, production, and so on\), which is accessed by a handful of users \(system administrators\). Generally, it is not necessary to have multiple instances of this application running.

The Process Engine is cluster-enabled so, together with the Alfresco Process Services Administrator, a user can configure and monitor a cluster \(or multiple different clusters\) through a graphical user interface. The clustered engines will use the same configuration and will report metrics and status back to the Alfresco Process Services Administrator where they are displayed.

-   **[Installing Alfresco Process Services Administrator](../topics/installing_administrator.md)**  
The Alfresco Process Services Administrator is distributed as a *WAR* \(Web Application ARchive\) file that can be dropped in any Java web container.
-   **[Using Administrator application](../topics/using_administrator_application.md)**  
Use the Administrator application to perform basic administration functions in Alfresco Process Services. For example, you can inspect the state of Process Engines, delete an app, view when an app was deployed, or monitor clusters.

**Parent topic:**[Administering](../topics/adminGuide.md)

