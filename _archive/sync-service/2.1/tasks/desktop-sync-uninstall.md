---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Uninstalling Desktop Sync

To remove Desktop Sync, uninstall the Desktop Sync AMP file, remove the synchronization service installation, and then remove ActiveMQ topic.

1.  Stop the Alfresco server.

2.  Uninstall the Desktop Sync AMP file in the Alfresco repository, for example using the Module Management Tool \(MMT\):

    ```
    java -jar bin/alfresco-mmt.jar ﻿uninstall alfresco-device-sync-repo-2.0-SNAPSHOT.amp tomcat/webapps/alfresco.war
    ```

    [Uninstall an AMP file](http://docs.alfresco.com/5.0/tasks/uninstall-amp.html) provides information on how to uninstall the AMP file, and remove the AMP content from the WAR files.

3.  Delete the Tomcat webapp directory.

    For example, delete tomcat/webapps/alfresco.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4.  Review the `autoStart` properties in your alfresco-global.properties file to ensure that the events and messaging subsystems are not set to start automatically.

    Uninstalling the AMP file removes any settings applied by the Desktop Sync repository module, however you should review custom `autoStart` properties to check that they are set to `false`:

    ```
    events.subsystem.autoStart=false
    messaging.subsystem.autoStart=false
    ```

5.  Ensure that all system services relating to Desktop Sync are stopped, disabled or removed. Disable all cron jobs, and ensure there are no active Analytics processes on your server.

    There are four system services to stop: ActiveMQ, event and messaging broker, and the Desktop Sync synchronization service.

6.  Ensure that Alfresco is not physically connected to the Desktop Sync installation and that all related functions are disabled.

    You will physically remove all parts of the Desktop Sync installation from your infrastructure, so you must make sure this does not affect the Alfresco installation. Most Desktop Sync files are installed in a single directory, which you chose when you installed Desktop Sync; for example, opt/sync.

7.  Remove the synchronization service installation and database.

    Navigate to the Desktop Sync installation directory. Remove all Alfresco Analytics files by running the `rm -rf` command, or run this command from another directory as follows:

    ```
    rm -rf /opt/sync
    ```

8.  Using the ActiveMQ Console, remove the ActiveMQ topic and queues matching the following names:

    ```
    Queue Consumer.*.VirtualTopic.alfresco.repo.events.nodes
    Topic VirtualTopic.alfresco.repo.events.nodes
    ```


**Parent topic:**[Installing and configuring Desktop Sync](../concepts/desktopsync-admin.md)

