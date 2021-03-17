---
author: Alfresco Documentation
source: 
audience: 
category: Administration
keyword: [installation, uninstalling]
---

# Uninstalling Sync Service

To remove Sync Service, uninstall the Sync Service AMP file, remove the Sync Service installation, and then remove the ActiveMQ topic.

These instructions apply to both Alfresco Content Services and Alfresco One.

1.  Stop the Alfresco server.

2.  Uninstall the Sync Service, AMP file in the repository, for example using the Module Management Tool \(MMT\):

    ```
    java -jar bin/alfresco-mmt.jar ﻿uninstall alfresco-device-sync-repo-2.2.x.amp tomcat/webapps/alfresco.war
    ```

    [Uninstall an AMP file](http://docs.alfresco.com/5.0/tasks/uninstall-amp.html) provides information on how to uninstall the AMP file, and remove the AMP content from the WAR files.

3.  Delete the Tomcat webapp directory.

    For example, delete tomcat/webapps/alfresco.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4.  Review the `autoStart` properties in your alfresco-global.properties file to ensure that the events and messaging subsystems are not set to start automatically.

    Uninstalling the AMP file removes any settings applied by the Sync Service repository module, however you should review custom `autoStart` properties to check that they are set to `false`:

    ```
    events.subsystem.autoStart=false
    messaging.subsystem.autoStart=false
    ```

5.  Ensure that all system services relating to the Sync Service are stopped, disabled or removed. Disable all cron jobs, and ensure there are no active Analytics processes on your server.

    There are four system services to stop: ActiveMQ, event and messaging broker, and the Sync Service.

6.  Ensure that Alfresco Content Services is not physically connected to the Sync Service installation and that all related functions are disabled.

    You will physically remove all parts of the Sync Service installation, so you must make sure this does not affect the Alfresco Content Services installation. Most Sync Service files are installed in <installLocation\>\), which you chose during installation \(for example, <installLocation\>/sync\).

7.  Remove the Sync Service installation and database.

    Navigate to the Sync Service installation directory. Remove all Sync Service files by running the `rm -rf` command, or run this command from another directory:

    ```
    rm -rf /<installLocation>/sync
    ```

8.  Using the ActiveMQ Console, remove the ActiveMQ topic and queues matching the following names:

    ```
    Queue Consumer.*.VirtualTopic.alfresco.repo.events.nodes
    Topic VirtualTopic.alfresco.repo.events.nodes
    ```


**Parent topic:**[Installing and configuring Sync Service](../concepts/desktopsync-admin.md)

