---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
---

# JMX editable management beans

JMX values \(Managed Bean or MBean attributes\) are exposed in the Alfresco Admin Console and with internal tools \(Alfresco JMX Dump\) or external tools like JConsole. The editable management beans are described here with example values where attributes are not already explained in the Alfresco Admin Console.

CAUTION:

Be aware that any changes you make to attributes in the live system are written to the database. The next time that Alfresco starts, these values will take precedence over any values specified in properties files, for example, `alfresco-global.properties`.

**Alfresco:Type=Configuration, Category=ActivitiesFeed, Object Type=ActivitiesFeed$default**

This MBean provides information about the Activities Feed configuration in Alfresco, including whether the feed is enabled and how often users will receive Activities Feed emails.

See the Alfresco Admin Console Repository Services - Activities Feed for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-activitiesfeed.

**Alfresco:Type=Configuration, Category=Audit, Object Type=Audit$default**

This MBean provides information about the audit configuration in Alfresco, namely which audit capabilities are enabled.

|Attribute name|Example value|
|--------------|-------------|
|audit.alfresco-access.enabled|`false`|
|audit.cmischangelog.enabled|`false`|
|audit.enabled|`true`|
|audit.sync.enabled|`true`|
|audit.tagging.enabled|`true`|
|audit.alfresco-access.enabled|`true`|

**Alfresco:Type=Configuration, Category=Authentication, Object Type=Authentication$managed$alfrescoNtlm1**

This MBean provides information about the authentication configuration in Alfresco.

See the Alfresco Admin Console Directories - Directory Management for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-directorymanagement.

**Alfresco:Type=Configuration, Category=OOoDirect, Object Type=OOoDirect$default**

This MBean provides information about the Open Office configuration in Alfresco.

|Attribute name|Example value|
|--------------|-------------|
|ooo.enabled|`false`|
|ooo.exe|C:/Alfresco/libreoffice/App/libreoffice/program/soffice.exe|
|ooo.host|`localhost`|
|ooo.port|`8100`|

**Alfresco:Type=Configuration, Category=OOoJodconverter, Object Type=OOoJodconverter$default**

This MBean provides information about JODConverter configuration, which automates conversions between office document formats in Alfresco.

|Attribute name|Example value|
|--------------|-------------|
|jodconverter.enabled|`true`|
|jodconverter.maxTasksPerProcess|`200`|
|jodconverter.officeHome|C:/Alfresco/libreoffice/App/libreoffice|
|jodconverter.portNumbers|`8100`|
|jodconverter.taskExecutionTimeout|`120000`|
|jodconverter.taskQueueTimeout|`30000`|
|jodconverter.templateProfileDir| |

**Alfresco:Type=Configuration, Category=Replication, Object Type=Replication$default**

This MBean provides information about the replication settings between repositories, and the replication configuration in Alfresco.

See the Alfresco Admin Console Repository Services - Replication Service for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-replicationservice.

**Alfresco:Type=Configuration, Category=Search, Object Types=Search$\***

This MBean provides information about the search service in use \(Solr, Lucene or no index\) and the configuration for that search in Alfresco.

See the Alfresco Admin Console Repository Services - Search Service for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-searchservice.

**Alfresco:Type=Configuration, Category=Sharepoint Protocol, Object Type=org.alfresco.module.vti.management.SPPMBean**

This MBean provides information about SharePoint, including configuration information and whether SharePoint is enabled.

|Attribute name|Example value|
|--------------|-------------|
|Enabled|`true`|
|Host|`${localname}`|
|Port|`7070`|

**Alfresco:Type=Configuration, Category=Subscriptions, Object Type=Subscriptions$default**

This MBean provides information about settings for subscriptions in Alfresco, including whether subscriptions are enabled and any template paths.

See the Alfresco Admin Console Repository Services - Subscription Service for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-subscriptionservice.

**Alfresco:Type=Configuration, Category=Synchronization, Object Type=Synchronization$default**

This MBean provides information about the synchronization settings in Alfresco, including when to synchronize and logging intervals.

|Attribute name|Example value|
|--------------|-------------|
|synchronization.allowDeletions|`true`|
|synchronization.autoCreatePeopleOnLogin|`true`|
|synchronization.import.cron|`0 0 0 * * ?`|
|synchronization.loggingInterval|`100`|
|synchronization.syncOnStartup|`true`|
|synchronization.syncWhenMissingPeopleLogIn|`true`|
|synchronization.synchronizeChangesOnly|`true`|
|synchronization.workerThreads|`1`|

**Alfresco:Type=Configuration, Category=Transformers, Object Type=Transformers$default**

This MBean provides information about the transformation service setting for converting between different file formats.

See the Alfresco Admin Console Repository Services - Transformation Services for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-transformations.

**Alfresco:Type=Configuration, Category=WebDav, Object Type=org.alfresco.enterprise.repo.management.WebDav**

This MBean provides information about whether WebDav is enabled or disabled for Alfresco.

|Attribute name|Example value|
|--------------|-------------|
|Enabled|`true`|

**Alfresco:Type=Configuration, Category=email, Object Types=email$inbound, email$outbound**

This MBean provides information about the inbound and outbound email configuration in Alfresco, including server, protocol and encoding information.

See the Alfresco Admin Console Email Services - Inbound Email and Email Services - Outbound Email for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-inboundemail and http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-outboundemail.

**Alfresco:Type=Configuration, Category=fileServers, Object Type=fileServers$default**

This MBean provides information about the CIFS, FTP and NFS servers configured in Alfresco.

See the Alfresco Admin Console Virtual File Systems - File Servers for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-fileservers.

**Alfresco:Type=Configuration, Category=googledocs, Object Type=googledocs$v2**

This MBean provides information about the GoogleDocs configuration in Alfresco.

|Attribute name|Example value|
|--------------|-------------|
|googledocs.enabled|`true`|
|googledocs.idleThresholdSeconds|`600`|
|googledocs.version|`2.0.6-12ent`|

**Alfresco:Type=Configuration, Category=imap, Object Types=imap$default, imap$default$imap.config.server.mountPoints$AlfrescoIMAP**

This MBean provides information about the IMAP mail and server configuration in Alfresco.

See the Alfresco Admin Console Virtual File Systems - IMAP Service for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-imap.

**Alfresco:Type=Configuration, Category=sysAdmin, Object Type=sysAdmin$default**

This MBean provides information about the admin settings for the Alfresco Share and Explorer interfaces.

|Attribute name|Example value|
|--------------|-------------|
|alfresco.context|`alfresco`|
|alfresco.host|`127.0.0.1`|
|alfresco.port|`8080`|
|alfresco.protocol|`http`|
|server.allowWrite|`true`|
|server.allowedusers|
|server.maxusers|`-1`|
|share.context|`share`|
|share.host|`127.0.0.1`|
|share.port|`8080`|
|share.protocol|`http`|
|site.public.group|`GROUP_EVERYONE`|

**Alfresco:Type=Configuration, Category=thirdParty, Object Type=thirdparty$default**

This MBean provides information about the third party modules configured in Alfresco.

|Attribute name|Example value|
|--------------|-------------|
|img.coders|C:\\Alfresco\\imagemagick\\modules\\coders|
|img.config|C:\\Alfresco\\imagemagick\\config|
|img.dyn|C:\\Alfresco\\imagemagick/lib|
|img.exe|C:\\Alfresco\\imagemagick\\convert.exe|
|img.gslib|C:\\Alfresco\\imagemagick\\lib|
|img.root|C:\\Alfresco\\imagemagick|
|swf.encoder.params|`-s poly2bitmap -s subpixels=72`|
|swf.exe|`swf.exe`|

**Alfresco:Name=FileServerConfig, Object Type=com.sun.proxy$Proxy108**

This MBean allows management and monitoring of the CIFS, FTP and NFS servers configured in Alfresco. See the Alfresco Admin Console Virtual File Systems - File Servers for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-fileservers.

**Alfresco:Name=Log4jHierarchy, Object Type=org.apache.log4j.jmx.HierarchyDynamicMBean**

This MBean is an instance of the HierarchyDynamicMBean class provided with log4j that allows adjustments to be made to the level of detail included in the Alfresco server logs. Not all attributes for Alfresco:Name=Log4jHierarchy are editable; only those that are editable are shown in this table.

|Attribute name|Example value|
|--------------|-------------|
|threshold|`ALL`|

Threshold is a special attribute that controls the server-wide logging threshold. It is not cluster aware. Its value must be the name of one of the log4j logging levels.

CAUTION:

Any messages logged with a priority lower than this threshold will be filtered from the logs. The default value is ALL, which means no messages are filtered, and the highest level of filtering is OFF which turns off logging altogether \(not recommended\).

You can add a new logger to Log4jHierarchy by selecting the Operations \> addLoggerMBean operation in JConsole and specify the string and priority for the new logger MBean. The bean will be given an additional read-only property for that logger and a new MBean will be registered in the `#log4j:logger=*` tree, allowing management of that logger.

It is not normally necessary to use this operation, because the Alfresco server pre-registers all loggers initialized during startup. However, if the logger you are interested in was not initialized at this point, you will have to add a logger. Add the fully qualified name of the logger as an argument and if successful, the object name of the newly registered MBean for managing that logger is returned. The logger is then displayed in the attribute list of log4j loggers.

For example, if in Java class `org.alfresco.repo.admin.patch.PatchExecuter` the logger is initialized as follows:

```
private static Log logger = LogFactory.getLog(PatchExecuter.class); 
```

Then the logger name would be `org.alfresco.repo.admin.patch.PatchExecuter`.

**Alfresco:Name=Schedule**

This MBean provides information on the triggers that are configured for Alfresco, for example, those that are started by cron jobs or other events. You can fire a trigger by selecting the required MBean trigger and Operations \> executeNow. The selected trigger is started.

**Alfresco:Name=VirtServerRegistry, Object Type=org.alfresco.mbeans.VirtServerRegistry**

This MBean provides information on the virtual server registry, for example, information about the virtual server and credentials. This information is used directly by the Alfresco Virtualization Server. Not all attributes for Alfresco:Name=VirtServerRegistry are editable; only those that are editable are shown in this table.

|Attribute name|Example value|
|--------------|-------------|
|PasswordFile|C:\\Alfresco\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco/alfresco-jmxrmi.password|
|AccessFile|C:\\Alfresco\\tomcat\\webapps\\alfresco\\WEB-INF\\classes\\alfresco/alfresco-jmxrmi.access|
|ApplicationContext|`<not readable>`|

**Alfresco:Name=WorkflowInformation, Object Type=org.alfresco.enterprise.repo.management.Workflow**

This MBean provides information on the workflow management interface, for example, JBPM and Activiti definitions and tasks. Not all attributes for Alfresco:Name=WorkflowInformation are editable; only those that are editable are shown in this table.

See the Alfresco Admin Console Repository Services - Process Engines for information about these editable attributes: http://<hostname\>:<portnumber\>/alfresco/service/enterprise/admin/admin-processengines.

**log4j:logger=\***

An instance of the LoggerDynamicMBean class provided with log4j that allows adjustments to be made to the level of detail included in the logs from an individual logger.

Not all attributes for log4j:logger=\* are editable; only those that are editable are shown in this table.

|Attribute name|Example value|
|--------------|-------------|
|priority|`WARN`|

Priority is a special attribute that specifies the minimum log4j logging level of messages from this logger to include in the logs. For example, a value of ERROR would mean that messages logged at lower levels such as WARN and INFO would not be included.

You can change the priority of any log4j attribute by selecting the required MBean and Attributes \> priority. The new value does not prevail after a shutdown of Alfresco. For a list of possible priority values, see [Log4j priority settings](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/Priority.html).

**Parent topic:**[JMX bean categories reference](../concepts/jmx-reference.md)

