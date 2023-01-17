---
title: Java Management Extension (JMX) reference
---

The Java Management Extensions (JMX) framework was introduced in Java 1.5 and has found widespread acceptance in the Java developers community since its inception.

It provides an easily configurable, scalable, reliable and more or less friendly infrastructure for managing Java application either locally or remotely. The framework introduces the concept of MBeans for real-time management of applications.

This information explains the individual MBean types exported by Content Services. The heading for each MBean type provides the JMX object naming scheme, where possible. Each section lists the individual properties for the MBean type.

## Alfresco Global Properties available in a JMX client

The following is summary of the `alfresco-global.properties` that can be viewed and changed in a JMX client.

> **WARNING:** Be aware that any [changes](#editablembeans) you make to attributes/properties in the live system are written to the database. The next time that Content Services starts, these values will take precedence over any values specified in properties files, for example, `alfresco-global.properties`.

|alfresco.authentication.allowGuestLogin|Specifies whether to allow guest access.|
|authentication.chain|Specifies the authentication chain.|
|synchronization.autoCreatePeopleOnLogin|Specifies whether to create a user with default properties when a user is successfully authenticated, who does not yet exist in Content Services, and was not returned by a differential sync (if enabled with the specified property). The default is `true`. Setting this to `false` allows you to restrict Content Services to a subset of those users who could be authenticated by LDAP; only those created by synchronization are allowed to log in. You can control the set of users in this more restricted set by overriding the user query properties of the LDAP authentication subsystem|
|synchronization.import.cron|Specifies a cron expression defining when the scheduled synchronization job should run, by default at midnight every day.|
|synchronization.loggingInterval|Specifies the number of user or group entries the synchronization subsystem will process before logging progress at INFO level. If you have the following default entry in `log4j.properties`:<br><br>`log4j.logger.org.alfresco.repo.security.sync=info`. The default is `100`.|
|synchronization.syncOnStartup|Specifies whether to trigger a differential sync when the subsystem starts up. The default is `true`. This ensures that when user registries are first configured, the bulk of the synchronization work is done on server startup, rather than on the first login.|
|synchronization.syncWhenMissingPeopleLogIn|Specifies whether to trigger a differential sync when a user is successfully authenticated who does not yet exist in Content Services. The default is `true`.|
|synchronization.synchronizeChangesOnly|Specifies if the scheduled synchronization job is run in differential mode. The default is `false`, which means that the scheduled sync job is run in full mode. Regardless of this setting a differential sync can still be triggered when a user is successfully authenticated who does not yet exist in Content Services.|
|synchronization.workerThreads|Specifies the number of worker threads. For example, `2`.|
|filesystem.acl.global.defaultAccessLevel|Specifies the default access level. Directly names the access control level (None, Read or Write) that applies to requests that are not in scope of any other access control. Note that it's not valid to use the value None without defining other access controls.|
|filesystem.acl.global.domainAccessControls|Specifies the set of access controls with domain scope. This is a composite property whose value should be a comma-separated list of domain names. To define the access level for one of the listed domains, use the property `filesystem.acl.global.domainAccessControls.value.<domain>.accessType`.<br><br>The example below defines Read level access for `DOMAIN1` and Write level access for `DOMAIN2`.<br<br>`filesystem.acl.global.domainAccessControls=DOMAIN1,DOMAIN2`<br><br>`filesystem.acl.global.domainAccessControls.value.DOMAIN1.accessType=Read`<br><br>`filesystem.acl.global.domainAccessControls.value.DOMAIN2.accessType=Write`|
|filesystem.acl.global.protocolAccessControls|Specifies the set of access controls with protocol scope. This is a composite property whose value should be a comma-separated list of access control names.<br><br>To define the access level for a named access control and the set of protocols to which it applies, use the properties:<br><br>`filesystem.acl.global.protocolAccessControls.value.<Name>.accessType<br>`<br><br>`filesystem.acl.global.protocolAccessControls.value.<Name>.checkList`<br><br>Protocols can include SMB, CIFS, NFS, and FTP.<br><br>The example below defines Read level access for NFS and Write level access for CIFS and FTP.<br><br>`filesystem.acl.global.protocolAccessControls=nfs,cifs,ftp`<br><br>`filesystem.acl.global.protocolAccessControls.value.nfs.accessType=Read`<br><br>`filesystem.acl.global.protocolAccessControls.value.nfs.checkList=NFS`<br><br>`filesystem.acl.global.protocolAccessControls.value.others.accessType=Write`<br><br>`filesystem.acl.global.protocolAccessControls.value.others.checkList=CIFS`<br><br>`filesystem.acl.global.protocolAccessControls.value.others.accessType=Write`<br><br>`filesystem.acl.global.protocolAccessControls.value.others.checkList=FTP`|
|filesystem.acl.global.userAccessControls|Specifies the set of access controls with user scope. This is a composite property whose value should be a comma-separated list of user names.<br><br>To define the access level for one of the listed users, use the property `filesystem.acl.global.userAccessControls.value.<user>.accessType`.<br><br>The example below defines Read level access for user1 and Write level access for user2.<br><br>`filesystem.acl.global.userAccessControls=user1,user2`<br><br>`filesystem.acl.global.userAccessControls.value.user1.accessType=Read`<br><br>`filesystem.acl.global.userAccessControls.value.user2.accessType=Write`|
|ftp.enabled|Enables or disables the FTP server.|
|ftp.ipv6.enabled|Enables or disables the IPv6 FTP server.|
|ftp.port|Specifies the port that the FTP server listens for incoming connections on. Defaults to port 21.|
|imap.config.home.folderPath|Specifies the default locations for the IMAP mount point. For example, `Imap Home`.|
|imap.config.home.rootPath|Specifies the default location for the IMAP mount point. For example, `/${spaces.company_home.childname}`.|
|imap.config.home.store|Specifies the default location for the IMAP mount point. For example, `${spaces.store}`.|
|imap.config.ignore.extraction|Defines whether or not attachments are extracted.|
|imap.config.server.mountPoints|Specifies the list of mount points. For example, `AlfrescoIMAP`.|
|imap.server.enabled|Enables or disables the IMAP server. This is set to `false`, by default.|
|imap.server.host|Specifies the host for the IMAP server.|
|imap.server.port|Specifies the port number for the IMAP server. For example, `143`.|
|imap.config.server.mountPoints.value.AlfrescoIMAP.modeName|Specifies the `AlfrescoIMAP` mount point access mode name. For example, `MIXED`.|
|imap.config.server.mountPoints.default.rootPath|Specifies the root path for the mount point.|
|imap.config.server.mountPoints.value.AlfrescoIMAP.mountPointName|Specifies the mount point name.|
|imap.config.server.mountPoints.default.store|Specifies the default store for the mount point.|
|server.allowedusers|A comma-separated list of users who are allowed to log in. Leave empty if all users are allowed to log in.|
|server.maxusers|The maximum number of users who are allowed to log in or -1 if there is no limit.|
|server.transaction.allow-writes|A Boolean property that when `true` indicates that the repository will allow write operations (provided that the license is valid). When `false` the repository is in read-only mode.|

## JMX read-only MBeans

JMX values (Managed Bean or MBean attributes) are exposed in the Admin Console and with internal tools (JMX Dump) or 
external tools like JConsole. The read-only beans are described here with example values.

### Alfresco:Name=Authority

Object Type = `org.alfresco.enterprise.repo.management.Authority`

Exposes the number of groups and users known to the Authority Service.

| Attribute name | Example value |
| -------------- | ------------- |
| NumberOfGroups | `7`|
| NumberOfUsers | `4` |

### Alfresco:Name=BatchJobs

Object Types = `org.alfresco.enterprise.repo.management.BatchMonitor and org.alfresco.enterprise.repo.management.SyncMonitorMBean`

Exposes the settings for the last run batch job, including the start and end times, number of errors and synchronization settings. There are two types in this bean: `FeedNotifier` and `Synchronization`.

| Attribute name | Example value |
| -------------- | ------------- |
| EndTime|Format: `Thu Jul 03 00:00:00 BST 2014` |
| StartTime|Format: `Thu Jul 03 00:00:00 BST 2014` |
| LastError|blank |
| TotalErrors|blank |
| SuccessfullyProcessedEntries|blank |
| TotalResults|blank |
| ProcessName | `FeedNotifier` |
| CurrentEntryID | `Person admin` |
| LastErrorEntryID|blank |
| PercentComplete|blank |
| LastErrorMessage | `<null>` |
| LastRunOnServer | `127.0.0.1:8080` |
| SyncEndTime|Format: `Thu Jun 26 13:49:45 BST 2014` |
| SyncStartTime|Format: `Thu Jun 26 13:49:45 BST 2014` |
| SynchronizationStatus | `COMPLETE` |

### Alfresco:Name=CacheStatistics

Object Type = `org.alfresco.enterprise.repo.management.CacheStatisticsMBeanImpl`

Exposes statistics for the caches that are available. Cache name follows the pattern `org.alfresco.*TransactionalCache`. The following attributes are available for each cache:

| Attribute name | Description |
| -------------- | ----------- |
| ClearTime | The mean time, in nanoseconds, for the cache to complete clearing (that is, to empty or *drop* the entire cache contents). For example, `NaN`. |
| Clears | The number of times that the cache has been cleared (that is, emptied, or *dropped*). |
| Gets | The number of times that the cache has had a value requested from it. This includes cache hits, where the cache contains a value, but omits where the cache reports that there is no value corresponding to a particular key. |
| HitMissRatio | The hit ratio for the given cache. A value of 1.0 is the maximum indicating that every request has been honored (that is, all GET requests are *hits*). A value of `0.0` represents a cache that has never successfully returned a previously cached value (that is, all GET requests are *misses*). Expected value: numeric with decimals |
| HitTime | The mean time, in nanoseconds, for GET operations to complete, where a value has been found in the cache. Expected value: numeric with decimals. |
| Hits | The number of times that a GET request is successful. |
| MissTime | The mean time, in nanoseconds, for GET requests, where a result is not returned (a *miss*). Expected value: numeric with decimals. |
| Misses | The number of times that a GET request is not successful. |
| PutTime | The mean time, in nanoseconds, for inserting a value into the cache. Expected value: numeric with decimals. |
| Puts | The number of times a value is inserted into the cache (a PUT operation). |
| RemoveTime | The mean time, in nanoseconds, for removing a value from cache. For example, `NaN`. |
| Removes | The number of removal operations applied to the cache, where a value is successfully removed from the cache. |

| Attribute name | Example value |
| -------------- | ------------- |
| AveragePullRequestTime | `0` |
| AveragePushRequestTime | `0` |
| CurrentPullRequests | `0` |
| CurrentPushRequests | `0` |
| PullRequestFailureCount | `0` |
| PullRequestSuccessCount | `0` |
| PushRequestFailureCount | `0` |
| PushRequestSuccessCount | `0` |
| TotalPullRequestCount | `0` |
| TotalPushRequestCount | `0` |

### Alfresco:Name=Cluster

Object Types=`org.alfresco.enterprise.repo.management.ClusterAdmin and org.alfresco.enterprise.repo.management.ClusterInfo`

Exposes information about repository server clustering.

See the Repo Admin Console **Repository Services > Repository Server Clustering** for information about these attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-clustering`.

### Alfresco:Name=ConnectionPool

Object Type = `org.apache.commons.dbcp.BasicDataSource`

Allows monitoring of the Apache Commons DBCP database connection pool and its configuration.

| Attribute  | Description |
| ---------- | ----------- |
| DefaultTransactionIsolation | The JDBC code number for the transaction isolation level, corresponding to those in the `java.sql.Connection` class. The special value of `-1` indicates that the database's default transaction isolation level is in use and this is the most common setting. For the Microsoft SQL Server JDBC driver, the special value of `4096` indicates snapshot isolation. |
| DriverClassName | The fully-qualified name of the JDBC driver class, for example `org.postgresql.Driver`. |
| InitialSize | The number of connections opened when the pool is initialized, for example `10`. |
| MaxActive | The maximum number of connections in the pool, for example `40`. |
| MaxIdle | The maximum number of connections that are not in use kept open, for example `-1`. |
| MaxWait | The maximum number of milliseconds to wait for a connection to be returned before throwing an exception (when connections are unavailable) or `-1` to wait indefinitely. |
| MinEvictableIdleTimeMillis | The minimum number of milliseconds that a connection can sit idle before it is eligible for eviction, for example `1800000`. |
| MinIdle | The minimum number of connections in the pool, for example `0`. |
| NumActive | The number connections in use (useful monitoring metric), for example `2`. |
| NumIdle | The number of connections that are not in use (another useful monitoring metric), for example `8`. |
| RemoveAbandoned | A boolean that when `true` indicates that a connection is considered abandoned and eligible for removal if it has been idle longer than the `RemoveAbandonedTimeout`, for example `false`. |
| RemoveAbandonedTimeout | The time in seconds before an abandoned connection can be removed, for example `300`. |
| TestOnBorrow | A boolean that when `true` indicates that connections will be validated before being borrowed from the pool, for example `false`. |
| TestOnReturn | A boolean that when `true` indicates that connections will be validated before being returned to the pool, for example `false`. |
| TestWhileIdle | A boolean that when `true` indicates that connections will be validated while they're idle, for example `false`. |
| TimeBetweenEvictionRunsMillis | The number of milliseconds to sleep between eviction runs, when greater than zero, for example `-1`. |
| Url | The JDBC URL to the database connection, for example `jdbc:postgresql://localhost:5432/alfresco`. |
| Username | The name used to authenticate with the database, for example `alfresco`. |
| ValidationQuery | The SQL query that will be used to validate connections before returning them, for example `<null>`. |

### Alfresco:Name=ContentStore

Object Type = `org.alfresco.enterprise.repo.management.ContentStore`

Allows monitoring of each content store. When `Type=FileContentStore`, the Root attribute of the name holds the file system path to the store. Specific attributes exposed are the total space (and also free space) in the content store, in bytes, and whether the store allows write operations.

| Attribute name | Example value |
| -------------- | ------------- |
| SpaceFree | `33434923008` |
| SpaceTotal | `64422408192` |
| WriteSupported | `true` |

### Alfresco:Name=ContentTransformer

Object Type = `org.alfresco.repo.content.transform.ContentTransformer`

Exposes key information about the transformation utilities relied upon by Content Services.

There are two instances:

* `Alfresco:Name=ContentTransformer,Type=Configuration`
* `Alfresco:Name=ContentTransformer,Type=ImageMagick`

The following properties are exposed for `Type=Configuration`:

|Attribute name|Example value|
|--------------|-------------|
|ContextNames|`[ , doclib , index , webpreview , syncRule , asyncRule ]`|
|CustomePropertyNames|`content.transformer.PdfBox.extensions.pdf.txt.maxSourceSizeKBytes`|
|ExtensionsAndMimetypes|`[ 3fr - image/x-raw-hasselblad , 3g2 - video/3gpp2 , 3gp - video/3gpp , acp - application/acp , aep - application/vnd.adobe.aftereffects.project , aet - application/vnd.adobe.aftereffects.template , ai - application/illustrator , aiff - audio/x-aiff , air - application/vnd.adobe.air-application-installer-package+zip , apk - application/vnd.android.package-archive , arw - image/x-raw-sony , asf - video/x-ms-asf , asnd - audio/vnd.adobe.soundbooth , au - audio/basic , avi - video/x-msvideo , avx - video/x-rad-screenplay , bcpio - application/x-bcpio , bin - application/octet-stream , bmp - image/bmp , cdf - application/x-netcdf , cer - application/x-x509-ca-cert , cgm - image/cgm , class - application/java , cpio - application/x-cpio , cr2 - image/x-raw-canon , csh - application/x-csh , css - text/css , csv - text/csv , dita - application/dita+xml , dng - image/x-raw-adobe , doc - application/msword , docm - application/vnd.ms-word.document.macroenabled.12 , docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document , dotm - application/vnd.ms-word.template.macroenabled.12 , dotx - application/vnd.openxmlformats-officedocument.wordprocessingml.template , dvi - application/x-dvi , dwg - image/vnd.dwg , dwt - image/x-dwt , eml - message/rfc822 , eps - application/eps , etx - text/x-setext , fla - application/x-fla , flac - audio/x-flac , flv - video/x-flv , fm - application/framemaker , fxp - application/x-zip , gif - image/gif , gml - application/sgml , gtar - application/x-gtar , gzip - application/x-gzip , hdf - application/x-hdf , hqx - application/mac-binhex40 , html - text/html , ics - text/calendar , ief - image/ief , indd - application/x-indesign , jp2 - image/jp2 , jpg - image/jpeg , js - application/x-javascript , json - application/json , k25 - image/x-raw-kodak , key - application/vnd.apple.keynote , latex - application/x-latex , m4a - audio/mp4 , m4v - video/x-m4v , man - application/x-troff-man , md - text/x-markdown , me - application/x-troff-me , mif - application/x-mif , mov - video/quicktime , movie - video/x-sgi-movie , mp3 - audio/mpeg , mp4 - video/mp4 , mpeg2 - video/mpeg2 , mpg - video/mpeg , mpp - application/vnd.ms-project , mrw - image/x-raw-minolta , ms - application/x-troff-mes , msg - application/vnd.ms-outlook , mw - text/mediawiki , nef - image/x-raw-nikon , numbers - application/vnd.apple.numbers , oda - application/oda , odb - application/vnd.oasis.opendocument.database , odc - application/vnd.oasis.opendocument.chart , odf - application/vnd.oasis.opendocument.formula , odg - application/vnd.oasis.opendocument.graphics , odi - application/vnd.oasis.opendocument.image , odm - application/vnd.oasis.opendocument.text-master , odp - application/vnd.oasis.opendocument.presentation , ods - application/vnd.oasis.opendocument.spreadsheet , odt - application/vnd.oasis.opendocument.text , oga - audio/ogg , ogg - audio/vorbis , ogv - video/ogg , ogx - application/ogg , orf - image/x-raw-olympus , otg - application/vnd.oasis.opendocument.graphics-template , oth - application/vnd.oasis.opendocument.text-web , otp - application/vnd.oasis.opendocument.presentation-template , ots - application/vnd.oasis.opendocument.spreadsheet-template , ott - application/vnd.oasis.opendocument.text-template , pages - application/vnd.apple.pages , pbm - image/x-portable-bitmap , pdf - application/pdf , pef - image/x-raw-pentax , pgm - image/x-portable-graymap , pmd - application/pagemaker , png - image/png , pnm - image/x-portable-anymap , potm - application/vnd.ms-powerpoint.template.macroenabled.12 , potx - application/vnd.openxmlformats-officedocument.presentationml.template , ppam - application/vnd.ms-powerpoint.addin.macroenabled.12 , ppj - image/vnd.adobe.premiere , ppm - image/x-portable-pixmap , ppsm - application/vnd.ms-powerpoint.slideshow.macroenabled.12 , ppsx - application/vnd.openxmlformats-officedocument.presentationml.slideshow , ppt - application/vnd.ms-powerpoint , pptm - application/vnd.ms-powerpoint.presentation.macroenabled.12 , pptx - application/vnd.openxmlformats-officedocument.presentationml.presentation , prn - application/remote-printing , ps - application/postscript , psd - image/vnd.adobe.photoshop , r3d - image/x-raw-red , raf - image/x-raw-fuji , ras - image/x-cmu-raster , rgb - image/x-rgb , rss - application/rss+xml , rtf - application/rtf , rtx - text/richtext , rw2 - image/x-raw-panasonic , rwl - image/x-raw-leica , sda - application/vnd.stardivision.draw , sdc - application/vnd.stardivision.calc , sdd - application/vnd.stardivision.impress , sdp - application/vnd.stardivision.impress-packed , sds - application/vnd.stardivision.chart , sdw - application/vnd.stardivision.writer , sgl - application/vnd.stardivision.writer-global , sgml - text/sgml , sh - application/x-sh , shar - application/x-shar , sldm - application/vnd.ms-powerpoint.slide.macroenabled.12 , sldx - application/vnd.openxmlformats-officedocument.presentationml.slide , smf - application/vnd.stardivision.math , src - application/x-wais-source , stc - application/vnd.sun.xml.calc.template , sti - application/vnd.sun.xml.impress.template , stw - application/vnd.sun.xml.writer.template , sv4cpio - application/x-sv4cpio , sv4crc - application/x-sv4crc , svg - image/svg+xml , sxc - application/vnd.sun.xml.calc , sxd - application/vnd.sun.xml.draw , sxi - application/vnd.sun.xml.impress , sxw - application/vnd.sun.xml.writer , tar - application/x-tar , tcl - application/x-tcl , tex - application/x-tex , texinfo - application/x-texinfo , tiff - image/tiff , tr - application/x-troff , ts - video/mp2t , tsv - text/tab-separated-values , txt - text/plain , ustar - application/x-ustar , vsd - application/vnd.visio , wav - audio/x-wav , webm - video/webm , wma - audio/x-ms-wma , wmv - video/x-ms-wmv , wpd - application/wordperfect , wrl - x-world/x-vrml , x3f - image/x-raw-sigma , xbm - image/x-xbitmap , xdp - application/vnd.adobe.xdp+xml , xhtml - application/xhtml+xml , xlam - application/vnd.ms-excel.addin.macroenabled.12 , xls - application/vnd.ms-excel , xlsb - application/vnd.ms-excel.sheet.binary.macroenabled.12 , xlsm - application/vnd.ms-excel.sheet.macroenabled.12 , xlsx - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet , xltm - application/vnd.ms-excel.template.macroenabled.12 , xltx - application/vnd.openxmlformats-officedocument.spreadsheetml.template , xml - text/xml , xpm - image/x-xpixmap , xwd - image/x-xwindowdump , z - application/x-compress , zip - application/zip ]`|
|TestFileExtensionsAndMimetypes|`[ 3g2 - video/3gpp2 , 3gp - video/3gpp , acp - application/acp , asf - video/x-ms-asf , avi - video/x-msvideo , bmp - image/bmp , doc - application/msword , docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document , eml - message/rfc822 , eps - application/eps , flv - video/x-flv , gif - image/gif , html - text/html , jpg - image/jpeg , m4a - audio/mp4 , m4v - video/x-m4v , mov - video/quicktime , mp3 - audio/mpeg , mp4 - video/mp4 , mpg - video/mpeg , msg - application/vnd.ms-outlook , odf - application/vnd.oasis.opendocument.formula , odg - application/vnd.oasis.opendocument.graphics , odp - application/vnd.oasis.opendocument.presentation , ods - application/vnd.oasis.opendocument.spreadsheet , odt - application/vnd.oasis.opendocument.text , ogg - audio/vorbis , ogv - video/ogg , otg - application/vnd.oasis.opendocument.graphics-template , otp - application/vnd.oasis.opendocument.presentation-template , ots - application/vnd.oasis.opendocument.spreadsheet-template , ott - application/vnd.oasis.opendocument.text-template , pdf - application/pdf , png - image/png , ppt - application/vnd.ms-powerpoint , pptx - application/vnd.openxmlformats-officedocument.presentationml.presentation , sda - application/vnd.stardivision.draw , sdc - application/vnd.stardivision.calc , sdd - application/vnd.stardivision.impress , sdw - application/vnd.stardivision.writer , smf - application/vnd.stardivision.math , sxc - application/vnd.sun.xml.calc , sxd - application/vnd.sun.xml.draw , sxi - application/vnd.sun.xml.impress , sxw - application/vnd.sun.xml.writer , tar - application/x-tar , tiff - image/tiff , txt - text/plain , vsd - application/vnd.visio , webm - video/webm , wma - audio/x-ms-wma , wmv - video/x-ms-wmv , wpd - application/wordperfect , xls - application/vnd.ms-excel , xlsx - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet , xml - text/xml , zip - application/zip ]`|
|TransformerNames|`[ Archive , BinaryPassThrough , HtmlParser , ImageMagick , JodConverter , JodConverter.2Pdf , JodConverter.Html2Pdf , MediaWikiParser , OOXML , OOXMLThumbnail , Office , OutlookMsg , PdfBox , PdfBox.TextToPdf , Poi , RFC822 , StringExtracter , TextMining , TikaAuto , complex.Any.Image , complex.JodConverter.Image , complex.JodConverter.PdfBox , complex.OutlookMsg2Image , complex.PDF.Image, complex.Text.Image , complex.iWorks.Image , double.ImageMagick , iWorksQuicklooks ]`|

The following properties are exposed for `Type=ImageMagick`. `Available` indicates whether the utility is installed correctly and was found when Content Services started up, and `VersionString` indicates the version information returned by the utility:

| Attribute name | Example value |
| -------------- | ------------- |
| Available | `true` |
| VersionString | `Version: ImageMagick 6.8.6-6 2013-07-16 Q8 http://www.imagemagick.org` |

### Alfresco:Name=CustomModel

Object Type = `org.alfresco.enterprise.repo.management.CustomModelsInfoMBeanImpl`

Exposes information about the number of active aspects, models, and types.

| Attribute name | Example value |
| -------------- | ------------- |
| CustomModelsStatistics | `[]` |

### Alfresco:Name=DatabaseInformation

Object Type = `org.alfresco.enterprise.repo.management.Database`

Exposes metadata about the database itself, including database, driver and JDBC information, and the name used to authenticate with the database.

| Attribute name | Example value |
| -------------- | ------------- |
| DatabaseMajorVersion | `9` |
| DatabaseMinorVersion | `2` |
| DatabaseProductName | `PostgreSQL` |
| DatabaseProductVersion | `9.2.4`|
| DriverMajorVersion | `9` |
| DriverMinorVersion | `0` |
| DriverName | `PostgreSQL Native Driver` |
| DriverVersion | `PostgreSQL 9.0 JDBC4 (build 802)` |
| JDBCMajorVersion | `4` |
| JDBCMinorVersion | `0` |
| StoresLowerCaseIdentifiers | `true` |
| StoresLowerCaseQuotedIdentifiers | `false` |
| StoresMixedCaseIdentifiers | `false` |
| StoresMixedCaseQuotedIdentifiers | `false` |
| StoresUpperCaseIdentifiers | `false` |
| StoresUpperCaseQuotedIdentifiers | `false` |
| URL | `jdbc:postgresql://localhost:5432/alfresco` |
| UserName | `alfresco` |

### Alfresco:Name=Encryption

Object Type = `org.alfresco.enterprise.encryption.management.AlfrescoKeyStoreBean`

Exposes information about the location and backup location of encryption methods used by Content Services.

There are three types of keystore:

* `Alfresco:Name=Encryption,Type=Key Store`
* `Alfresco:Name=ContentTransformer,Type=SSL Key Store`
* `Alfresco:Name=ContentTransformer,Type=SSL Trust Store`

The following properties are exposed for `Type=Key Store`:

| Attribute name | Example value |
| -------------- | ------------- |
| BackupLocation | `C:/Alfresco/alf_data/keystore/backup-keystore` |
| Location | `C:/Alfresco/alf_data/keystore/keystore` |

The following properties are exposed for `Type=SSL Key Store`:

| Attribute name | Example value |
| -------------- | ------------- |
| BackupLocation | `<not readable>` |
| Location | `C:/Alfresco/alf_data/keystore/ssl.keystore` |

The following properties are exposed for `Type=SSL Trust Store`:

| Attribute name | Example value |
| -------------- | ------------- |
| BackupLocation | `<not readable>` |
| Location | `C:/Alfresco/alf_data/keystore/ssl.truststore` |

### Alfresco:Name=FileServerConfig

Object Type = `com.sun.proxy.$Proxy108`

Allows management and monitoring of the FTP server configured in Content Services. See the Admin Console Virtual File Systems - File Servers for information about these attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-fileservers`.

### Alfresco:Name=GlobalProperties

Object Type = `org.alfresco.enterprise.repo.management.PropertiesDynamicMBean`

Exposes the default configuration settings that are present in the alfresco-global.properties file.

|Attribute name|Example value|
|--------------|-------------|
|;|`default filesystem target configuration`|
|;Where|should the root of the web project be stored, by default `/www/avm_webapps`|
|V2.1-A.fixes.to.schema|`0`|
|activities.feed.fetchBatchSize|`150`|
|activities.feed.generator.jsonFormatOnly|`true`|
|activities.feed.max.ageMins|`44640`|
|activities.feed.max.idRange|`1000000`|
|activities.feed.max.size|`200`|
|activities.feedNotifier.batchSize|`200`|
|activities.feedNotifier.numThreads|`2`|
|alfresco.authentication.gateway.bufferSize|`2048`|
|alfresco.authentication.gateway.connectTimeout|`10000`|
|alfresco.authentication.gateway.host|blank|
|alfresco.authentication.gateway.httpConnectionStalecheck|`true`|
|alfresco.authentication.gateway.httpTcpNodelay|`true`|
|alfresco.authentication.gateway.inboundHeaders|`X-Alfresco-Authenticator-Key,X-Alfresco-Remote-User`|
|alfresco.authentication.gateway.outboundHeaders|`Authorization,key`|
|alfresco.authentication.gateway.port|`443`|
|alfresco.authentication.gateway.prefixUrl|`/publicapi`|
|alfresco.authentication.gateway.protocol|`https`|
|alfresco.authentication.gateway.readTimeout|`120000`|
|alfresco.cluster.enabled|`true`|
|alfresco.cluster.hostname|`${localname}`|
|alfresco.cluster.interface|blank|
|alfresco.cluster.max.init.retries|`50`|
|alfresco.cluster.nodetype|`"Repository server"`|
|alfresco.clusterCheck.timeout|`4000`|
|alfresco.context|`alfresco`|
|alfresco.hazelcast.autoinc.port|`false`|
|alfresco.hazelcast.configLocation|`classpath:alfresco/hazelcast/hazelcast-tcp.xml`|
|alfresco.hazelcast.ec2.accesskey|`my-access-key`|
|alfresco.hazelcast.ec2.region|`us-east-1`|
|alfresco.hazelcast.ec2.secretkey|`my-secret-key`|
|alfresco.hazelcast.ec2.securitygroup|blank|
|alfresco.hazelcast.ec2.tagkey|`type`|
|alfresco.hazelcast.ec2.tagvalue|`hz-nodes`|
|alfresco.hazelcast.mancenter.enabled|`false`|
|alfresco.hazelcast.mancenter.url|`http://localhost:8080/mancenter`|
|alfresco.hazelcast.port|`5701`|
|alfresco.hazelcast.tcp.config|`<members></members>`|
|alfresco.host|`127.0.0.1`|
|alfresco.port|`8080`|
|alfresco.protocol|`http`|
|alfresco.rmi.services.external.host|`0.0.0.0`|
|alfresco.rmi.services.port|`50500`|
|alfresco.rmi.services.retries|`4`|
|alfresco_user_store.adminpassword|`209c6174da490caeb422f3fa5a7ae634`|
|alfresco_user_store.adminusername|`admin`|
|alfresco_user_store.guestusername|`guest`|
|alfresco_user_store.store|`user://alfrescoUserStore`|
|alfresco_user_store.system_container.childname|`sys:system`|
|alfresco_user_store.user_container.childname|`sys:people`|
|audit.alfresco-access.enabled|`false`|
|audit.alfresco-access.sub-actions.enabled|`false`|
|audit.cmischangelog.enabled|`false`|
|audit.config.strict|`false`|
|audit.dod5015.enabled|`false`|
|audit.enabled|`true`|
|audit.filter.alfresco-access.default.enabled|`false`|
|audit.filter.alfresco-access.transaction.path|`~/sys:archivedItem;~/ver:;.*`|
|audit.filter.alfresco-access.transaction.type|`cm:folder;cm:content;st:site`|
|audit.filter.alfresco-access.transaction.user|`~System;~null;.*`|
|audit.tagging.enabled|`true`|
|authentication.chain|`alfrescoNtlm1:alfrescoNtlm`|
|authentication.ticket.expiryMode|`AFTER_INACTIVITY`|
|authentication.ticket.ticketsExpire|`true`|
|authentication.ticket.useSingleTicketPerUser|`true`|
|authentication.ticket.validDuration|`PT1H`|
|authority.useBridgeTable|`true`|
|bulkImport.batch.batchSize|`20`|
|bulkImport.batch.numThreads|`4`|
|cache.aclEntitySharedCache.backup-count|`1`|
|cache.aclEntitySharedCache.cluster.type|`fully-distributed`|
|cache.aclEntitySharedCache.eviction-percentage|`25`|
|cache.aclEntitySharedCache.eviction-policy|`LRU`|
|cache.aclEntitySharedCache.maxIdleSeconds|`0`|
|cache.aclEntitySharedCache.maxItems|`50000`|
|cache.aclEntitySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.aclEntitySharedCache.timeToLiveSeconds|`0`|
|cache.aclEntitySharedCache.tx.maxItems|`50000`|
|cache.aclSharedCache.backup-count|`1`|
|cache.aclSharedCache.cluster.type|`fully-distributed`|
|cache.aclSharedCache.eviction-percentage|`25`|
|cache.aclSharedCache.eviction-policy|`LRU`|
|cache.aclSharedCache.maxIdleSeconds|`0`|
|cache.aclSharedCache.maxItems|`50000`|
|cache.aclSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.aclSharedCache.timeToLiveSeconds|`0`|
|cache.aclSharedCache.tx.maxItems|`20000`|
|cache.authenticationSharedCache.backup-count|`1`|
|cache.authenticationSharedCache.cluster.type|`fully-distributed`|
|cache.authenticationSharedCache.eviction-percentage|`25`|
|cache.authenticationSharedCache.eviction-policy|`LRU`|
|cache.authenticationSharedCache.maxIdleSeconds|`0`|
|cache.authenticationSharedCache.maxItems|`5000`|
|cache.authenticationSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.authenticationSharedCache.timeToLiveSeconds|`0`|
|cache.authenticationSharedCache.tx.maxItems|`100`|
|cache.authorityEntitySharedCache.tx.maxItems|`50000`|
|cache.authoritySharedCache.backup-count|`1`|
|cache.authoritySharedCache.cluster.type|`invalidating`|
|cache.authoritySharedCache.eviction-percentage|`25`|
|cache.authoritySharedCache.eviction-policy|`LRU`|
|cache.authoritySharedCache.maxIdleSeconds|`0`|
|cache.authoritySharedCache.maxItems|`10000`|
|cache.authoritySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.authoritySharedCache.timeToLiveSeconds|`0`|
|cache.authoritySharedCache.tx.maxItems|`10000`|
|cache.authorityToChildAuthoritySharedCache.backup-count|`1`|
|cache.authorityToChildAuthoritySharedCache.cluster.type|`invalidating`|
|cache.authorityToChildAuthoritySharedCache.eviction-percentage|`25`|
|cache.authorityToChildAuthoritySharedCache.eviction-policy|`LRU`|
|cache.authorityToChildAuthoritySharedCache.maxIdleSeconds|`0`|
|cache.authorityToChildAuthoritySharedCache.maxItems|`40000`|
|cache.authorityToChildAuthoritySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.authorityToChildAuthoritySharedCache.timeToLiveSeconds|`0`|
|cache.authorityToChildAuthoritySharedCache.tx.maxItems|`40000`|
|cache.avmEntitySharedCache.backup-count|`1`|
|cache.avmEntitySharedCache.cluster.type|`fully-distributed`|
|cache.avmEntitySharedCache.eviction-percentage|`25`|
|cache.avmEntitySharedCache.eviction-policy|`LRU`|
|cache.avmEntitySharedCache.maxIdleSeconds|`0`|
|cache.avmEntitySharedCache.maxItems|`5000`|
|cache.avmEntitySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.avmEntitySharedCache.timeToLiveSeconds|`0`|
|cache.avmEntitySharedCache.tx.maxItems|`5000`|
|cache.avmNodeAspectsSharedCache.backup-count|`1`|
|cache.avmNodeAspectsSharedCache.cluster.type|`fully-distributed`|
|cache.avmNodeAspectsSharedCache.eviction-percentage|`25`|
|cache.avmNodeAspectsSharedCache.eviction-policy|`LRU`|
|cache.avmNodeAspectsSharedCache.maxIdleSeconds|`0`|
|cache.avmNodeAspectsSharedCache.maxItems|`5000`|
|cache.avmNodeAspectsSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.avmNodeAspectsSharedCache.timeToLiveSeconds|`0`|
|cache.avmNodeAspectsSharedCache.tx.maxItems|`5000`|
|cache.avmNodeSharedCache.backup-count|`1`|
|cache.avmNodeSharedCache.cluster.type|`fully-distributed`|
|cache.avmNodeSharedCache.eviction-percentage|`25`|
|cache.avmNodeSharedCache.eviction-policy|`LRU`|
|cache.avmNodeSharedCache.maxIdleSeconds|`0`|
|cache.avmNodeSharedCache.maxItems|`5000`|
|cache.avmNodeSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.avmNodeSharedCache.timeToLiveSeconds|`0`|
|cache.avmNodeSharedCache.tx.maxItems|`5000`|
|cache.avmStoreSharedCache.tx.maxItems|`1000`|
|cache.avmVersionRootEntityCache.tx.maxItems1|`100`|
|cache.avmVersionRootEntitySharedCache.backup-count|`1`|
|cache.avmVersionRootEntitySharedCache.cluster.type|`fully-distributed`|
|cache.avmVersionRootEntitySharedCache.eviction-percentage|`25`|
|cache.avmVersionRootEntitySharedCache.eviction-policy|`LRU`|
|cache.avmVersionRootEntitySharedCache.maxIdleSeconds|`0`|
|cache.avmVersionRootEntitySharedCache.maxItems|`1000`|
|cache.avmVersionRootEntitySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.avmVersionRootEntitySharedCache.timeToLiveSeconds|`0`|
|cache.cachingContentStoreCache.backup-count|`1`|
|cache.cachingContentStoreCache.cluster.type|`local`|
|cache.cachingContentStoreCache.eviction-percentage|`25`|
|cache.cachingContentStoreCache.eviction-policy|`LRU`|
|cache.cachingContentStoreCache.maxIdleSeconds|`86400`|
|cache.cachingContentStoreCache.maxItems|`5000`|
|cache.cachingContentStoreCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.cachingContentStoreCache.timeToLiveSeconds|`0`|
|cache.caveatConfigCache.backup-count|`1`|
|cache.caveatConfigCache.cluster.type|`invalidating`|
|cache.caveatConfigCache.eviction-percentage|`25`|
|cache.caveatConfigCache.eviction-policy|`LRU`|
|cache.caveatConfigCache.maxIdleSeconds|`0`|
|cache.caveatConfigCache.maxItems|`5000`|
|cache.caveatConfigCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.caveatConfigCache.timeToLiveSeconds|`0`|
|cache.caveatConfigCache.tx.maxItems|`100`|
|cache.compiledModelsSharedCache.backup-count|`1`|
|cache.compiledModelsSharedCache.cluster.type|`invalidating`|
|cache.compiledModelsSharedCache.eviction-percentage|`25`|
|cache.compiledModelsSharedCache.eviction-policy|`LRU`|
|cache.compiledModelsSharedCache.maxIdleSeconds|`0`|
|cache.compiledModelsSharedCache.maxItems|`1000`|
|cache.compiledModelsSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.compiledModelsSharedCache.timeToLiveSeconds|`0`|
|cache.contentDataSharedCache.backup-count|`1`|
|cache.contentDataSharedCache.cluster.type|`fully-distributed`|
|cache.contentDataSharedCache.eviction-percentage|`25`|
|cache.contentDataSharedCache.eviction-policy|`LRU`|
|cache.contentDataSharedCache.maxIdleSeconds|`0`|
|cache.contentDataSharedCache.maxItems|`130000`|
|cache.contentDataSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.contentDataSharedCache.timeToLiveSeconds|`0`|
|cache.contentDataSharedCache.tx.maxItems|`65000`|
|cache.contentDiskDriver.fileInfoCache.backup-count|`1`|
|cache.contentDiskDriver.fileInfoCache.cluster.type|`local`|
|cache.contentDiskDriver.fileInfoCache.eviction-percentage|`25`|
|cache.contentDiskDriver.fileInfoCache.eviction-policy|`LRU`|
|cache.contentDiskDriver.fileInfoCache.maxIdleSeconds|`0`|
|cache.contentDiskDriver.fileInfoCache.maxItems|`1000`|
|cache.contentDiskDriver.fileInfoCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.contentDiskDriver.fileInfoCache.timeToLiveSeconds|`0`|
|cache.executingActionsCache.backup-count|`1`|
|cache.executingActionsCache.cluster.type|`fully-distributed`|
|cache.executingActionsCache.eviction-percentage|`25`|
|cache.executingActionsCache.eviction-policy|`LRU`|
|cache.executingActionsCache.maxIdleSeconds|`0`|
|cache.executingActionsCache.maxItems|`1000`|
|cache.executingActionsCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.executingActionsCache.timeToLiveSeconds|`0`|
|cache.globalConfigSharedCache.backup-count|`1`|
|cache.globalConfigSharedCache.cluster.type|`invalidating`|
|cache.globalConfigSharedCache.eviction-percentage|`25`|
|cache.globalConfigSharedCache.eviction-policy|`LRU`|
|cache.globalConfigSharedCache.maxIdleSeconds|`0`|
|cache.globalConfigSharedCache.maxItems|`1000`|
|cache.globalConfigSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.globalConfigSharedCache.timeToLiveSeconds|`0`|
|cache.imapMessageSharedCache.backup-count|`1`|
|cache.imapMessageSharedCache.cluster.type|`invalidating`|
|cache.imapMessageSharedCache.eviction-percentage|`25`|
|cache.imapMessageSharedCache.eviction-policy|`LRU`|
|cache.imapMessageSharedCache.maxIdleSeconds|`0`|
|cache.imapMessageSharedCache.maxItems|`2000`|
|cache.imapMessageSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.imapMessageSharedCache.timeToLiveSeconds|`0`|
|cache.imapMessageSharedCache.tx.maxItems|`1000`|
|cache.immutableEntitySharedCache.backup-count|`1`|
|cache.immutableEntitySharedCache.cluster.type|`invalidating`|
|cache.immutableEntitySharedCache.eviction-percentage|`25`|
|cache.immutableEntitySharedCache.eviction-policy|`LRU`|
|cache.immutableEntitySharedCache.maxIdleSeconds|`0`|
|cache.immutableEntitySharedCache.maxItems|`50000`|
|cache.immutableEntitySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.immutableEntitySharedCache.timeToLiveSeconds|`0`|
|cache.immutableEntitySharedCache.tx.maxItems|`10000`|
|cache.immutableSingletonSharedCache.backup-count|`1`|
|cache.immutableSingletonSharedCache.cluster.type|`invalidating`|
|cache.immutableSingletonSharedCache.eviction-percentage|`25`|
|cache.immutableSingletonSharedCache.eviction-policy|`LRU`|
|cache.immutableSingletonSharedCache.maxIdleSeconds|`0`|
|cache.immutableSingletonSharedCache.maxItems|`12000`|
|cache.immutableSingletonSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.immutableSingletonSharedCache.timeToLiveSeconds|`0`|
|cache.immutableSingletonSharedCache.tx.maxItems|`12000`|
|cache.loadedResourceBundlesSharedCache.backup-count|`1`|
|cache.loadedResourceBundlesSharedCache.cluster.type|`fully-distributed`|
|cache.loadedResourceBundlesSharedCache.eviction-percentage|`25`|
|cache.loadedResourceBundlesSharedCache.eviction-policy|`LRU`|
|cache.loadedResourceBundlesSharedCache.maxIdleSeconds|`0`|
|cache.loadedResourceBundlesSharedCache.maxItems|`1000`|
|cache.loadedResourceBundlesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.loadedResourceBundlesSharedCache.timeToLiveSeconds|`0`|
|cache.loadedResourceBundlesSharedCache.tx.maxItems|`1000`|
|cache.messagesSharedCache.backup-count|`1`|
|cache.messagesSharedCache.cluster.type|`fully-distributed`|
|cache.messagesSharedCache.eviction-percentage|`25`|
|cache.messagesSharedCache.eviction-policy|`LRU`|
|cache.messagesSharedCache.maxIdleSeconds|`0`|
|cache.messagesSharedCache.maxItems|`1000`|
|cache.messagesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.messagesSharedCache.timeToLiveSeconds|`0`|
|cache.messagesSharedCache.tx.maxItems|`1000`|
|cache.node.allRootNodesSharedCache.backup-count|`1`|
|cache.node.allRootNodesSharedCache.cluster.type|`invalidating`|
|cache.node.allRootNodesSharedCache.eviction-percentage|`25`|
|cache.node.allRootNodesSharedCache.eviction-policy|`LRU`|
|cache.node.allRootNodesSharedCache.maxIdleSeconds|`0`|
|cache.node.allRootNodesSharedCache.maxItems|`1000`|
|cache.node.allRootNodesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.allRootNodesSharedCache.timeToLiveSeconds|`0`|
|cache.node.allRootNodesSharedCache.tx.maxItems|`500`|
|cache.node.aspectsSharedCache.backup-count|`1`|
|cache.node.aspectsSharedCache.cluster.type|`local`|
|cache.node.aspectsSharedCache.eviction-percentage|`25`|
|cache.node.aspectsSharedCache.eviction-policy|`LRU`|
|cache.node.aspectsSharedCache.maxIdleSeconds|`0`|
|cache.node.aspectsSharedCache.maxItems|`130000`|
|cache.node.aspectsSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.aspectsSharedCache.timeToLiveSeconds|`0`|
|cache.node.aspectsSharedCache.tx.maxItems|`65000`|
|cache.node.childByNameSharedCache.backup-count|`1`|
|cache.node.childByNameSharedCache.cluster.type|`local`|
|cache.node.childByNameSharedCache.eviction-percentage|`25`|
|cache.node.childByNameSharedCache.eviction-policy|`LRU`|
|cache.node.childByNameSharedCache.maxIdleSeconds|`0`|
|cache.node.childByNameSharedCache.maxItems|`130000`|
|cache.node.childByNameSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.childByNameSharedCache.timeToLiveSeconds|`0`|
|cache.node.childByNameSharedCache.tx.maxItems|`65000`|
|cache.node.nodesSharedCache.backup-count|`1`|
|cache.node.nodesSharedCache.cluster.type|`invalidating`|
|cache.node.nodesSharedCache.eviction-percentage|`25`|
|cache.node.nodesSharedCache.eviction-policy|`LRU`|
|cache.node.nodesSharedCache.maxIdleSeconds|`0`|
|cache.node.nodesSharedCache.maxItems|`250000`|
|cache.node.nodesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.nodesSharedCache.timeToLiveSeconds|`0`|
|cache.node.nodesSharedCache.tx.maxItems|`125000`|
|cache.node.parentAssocsSharedCache.backup-count|`1`|
|cache.node.parentAssocsSharedCache.cluster.type|`fully-distributed`|
|cache.node.parentAssocsSharedCache.eviction-percentage|`25`|
|cache.node.parentAssocsSharedCache.eviction-policy|`LRU`|
|cache.node.parentAssocsSharedCache.maxIdleSeconds|`0`|
|cache.node.parentAssocsSharedCache.maxItems|`130000`|
|cache.node.parentAssocsSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.parentAssocsSharedCache.timeToLiveSeconds|`0`|
|cache.node.propertiesSharedCache.backup-count|`1`|
|cache.node.propertiesSharedCache.cluster.type|`local`|
|cache.node.propertiesSharedCache.eviction-percentage|`25`|
|cache.node.propertiesSharedCache.eviction-policy|`LRU`|
|cache.node.propertiesSharedCache.maxIdleSeconds|`0`|
|cache.node.propertiesSharedCache.maxItems|`130000`|
|cache.node.propertiesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.propertiesSharedCache.timeToLiveSeconds|`0`|
|cache.node.propertiesSharedCache.tx.maxItems|`65000`|
|cache.node.rootNodesSharedCache.backup-count|`1`|
|cache.node.rootNodesSharedCache.cluster.type|`invalidating`|
|cache.node.rootNodesSharedCache.eviction-percentage|`25`|
|cache.node.rootNodesSharedCache.eviction-policy|`LRU`|
|cache.node.rootNodesSharedCache.maxIdleSeconds|`0`|
|cache.node.rootNodesSharedCache.maxItems|`1000`|
|cache.node.rootNodesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.node.rootNodesSharedCache.timeToLiveSeconds|`0`|
|cache.node.rootNodesSharedCache.tx.maxItems|`1000`|
|cache.nodeOwnerSharedCache.backup-count|`1`|
|cache.nodeOwnerSharedCache.cluster.type|`fully-distributed`|
|cache.nodeOwnerSharedCache.eviction-percentage|`25`|
|cache.nodeOwnerSharedCache.eviction-policy|`LRU`|
|cache.nodeOwnerSharedCache.maxIdleSeconds|`0`|
|cache.nodeOwnerSharedCache.maxItems|`40000`|
|cache.nodeOwnerSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.nodeOwnerSharedCache.timeToLiveSeconds|`0`|
|cache.nodeOwnerSharedCache.tx.maxItems|`40000`|
|cache.nodeRulesSharedCache.tx.maxItems|`2000`|
|cache.permissionEntitySharedCache.tx.maxItems|`50000`|
|cache.permissionsAccessSharedCache.backup-count|`1`|
|cache.permissionsAccessSharedCache.cluster.type|`fully-distributed`|
|cache.permissionsAccessSharedCache.eviction-percentage|`25`|
|cache.permissionsAccessSharedCache.eviction-policy|`LRU`|
|cache.permissionsAccessSharedCache.maxIdleSeconds|`0`|
|cache.permissionsAccessSharedCache.maxItems|`50000`|
|cache.permissionsAccessSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.permissionsAccessSharedCache.timeToLiveSeconds|`0`|
|cache.permissionsAccessSharedCache.tx.maxItems|`10000`|
|cache.personSharedCache.backup-count|`1`|
|cache.personSharedCache.cluster.type|`fully-distributed`|
|cache.personSharedCache.eviction-percentage|`25`|
|cache.personSharedCache.eviction-policy|`LRU`|
|cache.personSharedCache.maxIdleSeconds|`0`|
|cache.personSharedCache.maxItems|`1000`|
|cache.personSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.personSharedCache.timeToLiveSeconds|`0`|
|cache.personSharedCache.tx.maxItems|`1000`|
|cache.propertyUniqueContextSharedCache.backup-count|`1`|
|cache.propertyUniqueContextSharedCache.cluster.type|`invalidating`|
|cache.propertyUniqueContextSharedCache.eviction-percentage|`25`|
|cache.propertyUniqueContextSharedCache.eviction-policy|`LRU`|
|cache.propertyUniqueContextSharedCache.maxIdleSeconds|`0`|
|cache.propertyUniqueContextSharedCache.maxItems|`10000`|
|cache.propertyUniqueContextSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.propertyUniqueContextSharedCache.timeToLiveSeconds|`0`|
|cache.propertyUniqueContextSharedCache.tx.maxItems|`10000`|
|cache.propertyValueCache.backup-count|`1`|
|cache.propertyValueCache.cluster.type|`invalidating`|
|cache.propertyValueCache.eviction-percentage|`25`|
|cache.propertyValueCache.eviction-policy|`LRU`|
|cache.propertyValueCache.maxIdleSeconds|`0`|
|cache.propertyValueCache.maxItems|`10000`|
|cache.propertyValueCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.propertyValueCache.timeToLiveSeconds|`0`|
|cache.propertyValueCache.tx.maxItems|`1000`|
|cache.publicapi.webScriptsRegistryCache.backup-count|`1`|
|cache.publicapi.webScriptsRegistryCache.cluster.type|`invalidating`|
|cache.publicapi.webScriptsRegistryCache.eviction-percentage|`25`|
|cache.publicapi.webScriptsRegistryCache.eviction-policy|`LRU`|
|cache.publicapi.webScriptsRegistryCache.maxIdleSeconds|`0`|
|cache.publicapi.webScriptsRegistryCache.maxItems|`1000`|
|cache.publicapi.webScriptsRegistryCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.publicapi.webScriptsRegistryCache.timeToLiveSeconds|`0`|
|cache.readersDeniedSharedCache.backup-count|`1`|
|cache.readersDeniedSharedCache.cluster.type|`fully-distributed`|
|cache.readersDeniedSharedCache.eviction-percentage|`25`|
|cache.readersDeniedSharedCache.eviction-policy|`LRU`|
|cache.readersDeniedSharedCache.maxIdleSeconds|`0`|
|cache.readersDeniedSharedCache.maxItems|`10000`|
|cache.readersDeniedSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.readersDeniedSharedCache.timeToLiveSeconds|`0`|
|cache.readersDeniedSharedCache.tx.maxItems|`10000`|
|cache.readersSharedCache.backup-count|`1`|
|cache.readersSharedCache.cluster.type|`fully-distributed`|
|cache.readersSharedCache.eviction-percentage|`25`|
|cache.readersSharedCache.eviction-policy|`LRU`|
|cache.readersSharedCache.maxIdleSeconds|`0`|
|cache.readersSharedCache.maxItems|`10000`|
|cache.readersSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.readersSharedCache.timeToLiveSeconds|`0`|
|cache.readersSharedCache.tx.maxItems|`10000`|
|cache.remoteAlfrescoTicketService.ticketsCache.backup-count|`1`|
|cache.remoteAlfrescoTicketService.ticketsCache.cluster.type|`fully-distributed`|
|cache.remoteAlfrescoTicketService.ticketsCache.eviction-percentage|`25`|
|cache.remoteAlfrescoTicketService.ticketsCache.eviction-policy|`LRU`|
|cache.remoteAlfrescoTicketService.ticketsCache.maxIdleSeconds|`0`|
|cache.remoteAlfrescoTicketService.ticketsCache.maxItems|`1000`|
|cache.remoteAlfrescoTicketService.ticketsCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.remoteAlfrescoTicketService.ticketsCache.timeToLiveSeconds|`0`|
|cache.resourceBundleBaseNamesSharedCache.backup-count|`1`|
|cache.resourceBundleBaseNamesSharedCache.cluster.type|`fully-distributed`|
|cache.resourceBundleBaseNamesSharedCache.eviction-percentage|`25`|
|cache.resourceBundleBaseNamesSharedCache.eviction-policy|`LRU`|
|cache.resourceBundleBaseNamesSharedCache.maxIdleSeconds|`0`|
|cache.resourceBundleBaseNamesSharedCache.maxItems|`1000`|
|cache.resourceBundleBaseNamesSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.resourceBundleBaseNamesSharedCache.timeToLiveSeconds|`0`|
|cache.resourceBundleBaseNamesSharedCache.tx.maxItems|`1000`|
|cache.routingContentStoreSharedCache.backup-count|`1`|
|cache.routingContentStoreSharedCache.cluster.type|`local`|
|cache.routingContentStoreSharedCache.eviction-percentage|`25`|
|cache.routingContentStoreSharedCache.eviction-policy|`LRU`|
|cache.routingContentStoreSharedCache.maxIdleSeconds|`0`|
|cache.routingContentStoreSharedCache.maxItems|`10000`|
|cache.routingContentStoreSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.routingContentStoreSharedCache.timeToLiveSeconds|`0`|
|cache.routingContentStoreSharedCache.tx.maxItems|`10000`|
|cache.samlTrustEngineSharedCache.backup-count|`1`|
|cache.samlTrustEngineSharedCache.cluster.type|`fully-distributed`|
|cache.samlTrustEngineSharedCache.eviction-percentage|`25`|
|cache.samlTrustEngineSharedCache.eviction-policy|`LRU`|
|cache.samlTrustEngineSharedCache.maxIdleSeconds|`0`|
|cache.samlTrustEngineSharedCache.maxItems|`5000`|
|cache.samlTrustEngineSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.samlTrustEngineSharedCache.timeToLiveSeconds|`0`|
|cache.samlTrustEngineSharedCache.tx.maxItems|`5000`|
|cache.siteNodeRefSharedCache.backup-count|`1`|
|cache.siteNodeRefSharedCache.cluster.type|`fully-distributed`|
|cache.siteNodeRefSharedCache.eviction-percentage|`25`|
|cache.siteNodeRefSharedCache.eviction-policy|`LRU`|
|cache.siteNodeRefSharedCache.maxIdleSeconds|`0`|
|cache.siteNodeRefSharedCache.maxItems|`5000`|
|cache.siteNodeRefSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.siteNodeRefSharedCache.timeToLiveSeconds|`0`|
|cache.siteNodeRefSharedCache.tx.maxItems|`5000`|
|cache.siteNodeRefSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.siteNodeRefSharedCache.timeToLiveSeconds|`0`|
|cache.siteNodeRefSharedCache.tx.maxItems|`5000`|
|cache.tagscopeSummarySharedCache.backup-count|`1`|
|cache.tagscopeSummarySharedCache.cluster.type|`fully-distributed`|
|cache.tagscopeSummarySharedCache.eviction-percentage|`25`|
|cache.tagscopeSummarySharedCache.eviction-policy|`LRU`|
|cache.tagscopeSummarySharedCache.maxIdleSeconds|`0`|
|cache.tagscopeSummarySharedCache.maxItems|`1000`|
|cache.tagscopeSummarySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.tagscopeSummarySharedCache.timeToLiveSeconds|`0`|
|cache.tagscopeSummarySharedCache.tx.maxItems|`1000`|
|cache.tenantEntitySharedCache.backup-count|`1`|
|cache.tenantEntitySharedCache.cluster.type|`fully-distributed`|
|cache.tenantEntitySharedCache.eviction-percentage|`25`|
|cache.tenantEntitySharedCache.eviction-policy|`LRU`|
|cache.tenantEntitySharedCache.maxIdleSeconds|`0`|
|cache.tenantEntitySharedCache.maxItems|`1000`|
|cache.tenantEntitySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.tenantEntitySharedCache.timeToLiveSeconds|`0`|
|cache.tenantEntitySharedCache.tx.maxItems|`1000`|
|cache.ticketsCache.backup-count|`1`|
|cache.ticketsCache.cluster.type|`fully-distributed`|
|cache.ticketsCache.eviction-percentage|`25`|
|cache.ticketsCache.eviction-policy|`LRU`|
|cache.ticketsCache.maxIdleSeconds|`0`|
|cache.ticketsCache.maxItems|`1000`|
|cache.ticketsCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.ticketsCache.timeToLiveSeconds|`0`|
|cache.userToAuthoritySharedCache.backup-count|`1`|
|cache.userToAuthoritySharedCache.cluster.type|`invalidating`|
|cache.userToAuthoritySharedCache.eviction-percentage|`25`|
|cache.userToAuthoritySharedCache.eviction-policy|`LRU`|
|cache.userToAuthoritySharedCache.maxIdleSeconds|`0`|
|cache.userToAuthoritySharedCache.maxItems|`5000`|
|cache.userToAuthoritySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.userToAuthoritySharedCache.timeToLiveSeconds|`0`|
|cache.userToAuthoritySharedCache.tx.maxItems|`100`|
|cache.webScriptsRegistrySharedCache.backup-count|`1`|
|cache.webScriptsRegistrySharedCache.cluster.type|`invalidating`|
|cache.webScriptsRegistrySharedCache.eviction-percentage|`25`|
|cache.webScriptsRegistrySharedCache.eviction-policy|`LRU`|
|cache.webScriptsRegistrySharedCache.maxIdleSeconds|`0`|
|cache.webScriptsRegistrySharedCache.maxItems|`1000`|
|cache.webScriptsRegistrySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.webScriptsRegistrySharedCache.timeToLiveSeconds|`0`|
|cache.webServicesQuerySessionSharedCache.backup-count|`1`|
|cache.webServicesQuerySessionSharedCache.cluster.type|`fully-distributed`|
|cache.webServicesQuerySessionSharedCache.eviction-percentage|`25`|
|cache.webServicesQuerySessionSharedCache.eviction-policy|`LRU`|
|cache.webServicesQuerySessionSharedCache.maxIdleSeconds|`0`|
|cache.webServicesQuerySessionSharedCache.maxItems|`1000`|
|cache.webServicesQuerySessionSharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.webServicesQuerySessionSharedCache.timeToLiveSeconds|`0`|
|cache.webServicesQuerySessionSharedCache.tx.maxItems|`50`|
|cache.zoneToAuthoritySharedCache.backup-count|`1`|
|cache.zoneToAuthoritySharedCache.cluster.type|`invalidating`|
|cache.zoneToAuthoritySharedCache.eviction-percentage|`25`|
|cache.zoneToAuthoritySharedCache.eviction-policy|`LRU`|
|cache.zoneToAuthoritySharedCache.maxIdleSeconds|`0`|
|cache.zoneToAuthoritySharedCache.maxItems|`500`|
|cache.zoneToAuthoritySharedCache.merge-policy|`hz.ADD_NEW_ENTRY`|
|cache.zoneToAuthoritySharedCache.timeToLiveSeconds|`0`|
|cache.zoneToAuthoritySharedCache.tx.maxItems|`500`|
|content.metadataExtracter.default.timeoutMs|`20000`|
|create.missing.people|`${server.transaction.allow-writes}`|
|db.driver|`org.postgresql.Driver`|
|db.name|`alfresco`|
|db.password|`admin`|
|db.pool.abandoned.detect|`false`|
|db.pool.abandoned.log|`false`|
|db.pool.abandoned.time|`300`|
|db.pool.evict.idle.min|`1800000`|
|db.pool.evict.interval|`600000`|
|db.pool.evict.num.tests|`-1`|
|db.pool.evict.validate|`false`|
|db.pool.idle|`10`|
|db.pool.initial|`10`|
|db.pool.max|`100`|
|db.pool.min|`10`|
|db.pool.statements.enable|`true`|
|db.pool.statements.max|`40`|
|db.pool.validate.borrow|`true`|
|db.pool.validate.query|blank|
|db.pool.validate.return|`false`|
|db.pool.wait.max|`-1`|
|db.schema.name|blank|
|db.schema.stopAfterSchemaBootstrap|`false`|
|db.schema.update|`true`|
|db.schema.update.lockRetryCount|`24`|
|db.schema.update.lockRetryWaitSeconds|`5`|
|db.txn.isolation|`-1`|
|db.url|`jdbc:postgresql://localhost:5432/${db.name}`|
|db.username|`alfresco`|
|default.async.action.corePoolSize|`8`|
|default.async.action.maximumPoolSize|`20`|
|default.async.action.threadPriority|`1`|
|deployment.avm.name|`avm`|
|deployment.avm.rootPath|`/www/avm_webapps`|
|deployment.avm.storeNamePattern|`%storeName%-live`|
|deployment.dmr.consolidate|`true`|
|deployment.dmr.name|`alfresco`|
|deployment.filesystem.autofix|`true`|
|deployment.filesystem.datadir|`${deployment.filesystem.rootdir}/depdata`|
|deployment.filesystem.default.metadatadir|`${deployment.filesystem.metadatadir}/default`|
|deployment.filesystem.default.name|`filesystem`|
|deployment.filesystem.default.rootdir|`./www`|
|deployment.filesystem.errorOnOverwrite|`false`|
|deployment.filesystem.logdir|`${deployment.filesystem.rootdir}/deplog`|
|deployment.filesystem.metadatadir|`${deployment.filesystem.rootdir}/depmetadata`|
|deployment.filesystem.rootdir|`./wcm`|
|deployment.service.corePoolSize|`2`|
|deployment.service.maximumPoolSize|`3`|
|deployment.service.numberOfSendingThreads|`5`|
|deployment.service.targetLockRefreshTime|`60000`|
|deployment.service.targetLockTimeout|`3600000`|
|deployment.service.threadPriority|`5`|
|dir.cachedcontent|`${dir.root}/cachedcontent`|
|dir.contentstore|`${dir.root}/contentstore`|
|dir.contentstore.deleted|`${dir.root}/contentstore.deleted`|
|dir.contentstore.tenants|blank|
|dir.indexes|`${dir.root}/lucene-indexes`|
|dir.indexes.backup|`${dir.root}/backup-lucene-indexes`|
|dir.indexes.lock|`${dir.indexes}/locks`|
|dir.keystore|`${dir.root}/keystore`|
|dir.license.external|`C:/Alfresco`|
|dir.root|`C:/Alfresco/alf_data`|
|domain.name.caseSensitive|`false`|
|domain.separator|blank|
|download.cleaner.maxAgeMins|`60`|
|download.cleaner.repeatIntervalMins|`60`|
|download.cleaner.startDelayMins|`60`|
|download.maxContentSize|`2152852358`|
|encryption.bootstrap.reencrypt|`false`|
|encryption.cipherAlgorithm|`DESede/CBC/PKCS5Padding`|
|encryption.keyAlgorithm|`DESede`|
|encryption.keySpec.class|`org.alfresco.encryption.DESEDEKeyGenerator`|
|encryption.keystore.backup.keyMetaData.location|`${dir.keystore}/backup-keystore-passwords.properties`|
|encryption.keystore.backup.location|`${dir.keystore}/backup-keystore`|
|encryption.keystore.backup.provider|blank|
|encryption.keystore.backup.type|`JCEKS`|
|encryption.keystore.keyMetaData.location|`${dir.keystore}/keystore-passwords.properties`|
|encryption.keystore.location|`${dir.keystore}/keystore`|
|encryption.keystore.provider|blank|
|encryption.keystore.type|`JCEKS`|
|encryption.mac.algorithm|`HmacSHA1`|
|encryption.mac.messageTimeout|`30000`|
|encryption.reencryptor.chunkSize|`100`|
|encryption.reencryptor.numThreads|`2`|
|encryption.ssl.keystore.keyMetaData.location|`${dir.keystore}/ssl-keystore-passwords.properties`|
|encryption.ssl.keystore.location|`${dir.keystore}/ssl.keystore`|
|encryption.ssl.keystore.provider|blank|
|encryption.ssl.keystore.type|`JCEKS`|
|encryption.ssl.truststore.keyMetaData.location|`${dir.keystore}/ssl-truststore-passwords.properties`|
|encryption.ssl.truststore.location|`${dir.keystore}/ssl.truststore`|
|encryption.ssl.truststore.provider|blank|
|encryption.ssl.truststore.type|`JCEKS`|
|fileFolderService.checkHidden.enabled|`true`|
|ftp.enabled|`false`|
|ftp.port|`21`|
|fts.indexer.batchSize|`1000`|
|hibernate.jdbc.use_get_generated_keys|`false`|
|home.folder.creation.disabled|`false`|
|home.folder.creation.eager|`true`|
|home_folder_provider_synchronizer.enabled|`false`|
|home_folder_provider_synchronizer.keep_empty_parents|`false`|
|home_folder_provider_synchronizer.override_provider|blank|
|hybridworkflow.enabled|`false`|
|imap.attachments.folder.folderPath|`${spaces.imap_attachments.childname}`|
|imap.attachments.folder.rootPath|`/${spaces.company_home.childname}`|
|imap.attachments.folder.store|`${spaces.store}`|
|imap.attachments.mode|`SEPARATE`|
|imap.config.home.folderPath|`${spaces.imap_home.childname}`|
|imap.config.home.rootPath|`/${spaces.company_home.childname}`|
|imap.config.home.store|`${spaces.store}`|
|imap.config.server.mountPoints|`AlfrescoIMAP`|
|imap.config.server.mountPoints.default.modeName|`ARCHIVE`|
|imap.config.server.mountPoints.default.mountPointName|`IMAP`|
|imap.config.server.mountPoints.default.rootPath|`${protocols.rootPath}`|
|imap.config.server.mountPoints.default.store|`${spaces.store}`|
|imap.config.server.mountPoints.value.AlfrescoIMAP.modeName|`MIXED`|
|imap.config.server.mountPoints.value.AlfrescoIMAP.mountPointName|`Alfresco IMAP`|
|imap.server.attachments.extraction.enabled|`true`|
|imap.server.enabled|`false`|
|imap.server.port|`143`|
|index.backup.cronExpression|`0 0 3 * * ?`|
|index.recovery.maximumPoolSize|`5`|
|index.recovery.mode|`VALIDATE`|
|index.recovery.stopOnError|`false`|
|index.reindexMissingContent.cronExpression|`* * * * * ? 2099`|
|index.subsystem.name|`solr`|
|index.tracking.adm.cronExpression|`${index.tracking.cronExpression}`|
|index.tracking.avm.cronExpression|`${index.tracking.cronExpression}`|
|index.tracking.cronExpression|`0/5 * * * * ?`|
|index.tracking.disableInTransactionIndexing|`false`|
|index.tracking.maxRecordSetSize|`1000`|
|index.tracking.maxTxnDurationMinutes|`10`|
|index.tracking.minRecordPurgeAgeDays|`30`|
|index.tracking.purgeSize|`7200000`|
|index.tracking.reindexLagMs|`1000`|
|location.license.embedded|`/WEB-INF/alfresco/license/*.lic`|
|location.license.external|`file://${dir.license.external}/*.lic`|
|location.license.shared|`classpath*:/alfresco/extension/license/*.lic`|
|mail.service.corePoolSize|`8`|
|mail.service.maximumPoolSize|`20`|
|mbean.server.locateExistingServerIfPossible|`true`|
|monitor.rmi.service.enabled|`true`|
|monitor.rmi.service.port|`50508`|
|mybatis.useLocalCaches|`false`|
|nodes.bulkLoad.cachingThreshold|`10`|
|notification.email.siteinvite|`false`|
|opencmis.activities.enabled|`true`|
|opencmis.connector.default.objectsDefaultDepth|`100`|
|opencmis.connector.default.objectsDefaultMaxItems|`10000`|
|opencmis.connector.default.openHttpSession|`false`|
|opencmis.connector.default.rootPath|`/${spaces.company_home.childname}`|
|opencmis.connector.default.store|`${spaces.store}`|
|opencmis.connector.default.typesDefaultDepth|`-1`|
|opencmis.connector.default.typesDefaultMaxItems|`500`|
|opencmis.context.override|`false`|
|opencmis.context.value|`false`|
|opencmis.server.override|`false`|
|opencmis.server.value|blank|
|opencmis.servletpath.override|`false`|
|opencmis.servletpath.value|blank|
|orphanReaper.lockRefreshTime|`60000`|
|orphanReaper.lockTimeOut|`3600000`|
|people.search.honor.hint.useCQ|`true`|
|policy.content.update.ignoreEmpty|`true`|
|protocols.rootPath|`/${spaces.company_home.childname}`|
|protocols.storeName|`${spaces.store}`|
|publishing.root|`${publishing.root.path}/${spaces.publishing.root.childname}`|
|publishing.root.path|`/app:company_home/app:dictionary`|
|replication.enabled|`false`|
|repo.remote.endpoint|`/service`|
|repository.name|`Main Repository`|
|sample.site.disabled|`false`|
|security.anyDenyDenies|`true`|
|server.maxusers|`-1`|
|server.setup.transaction.max-retries|`40`|
|server.setup.transaction.max-retry-wait-ms|`15000`|
|server.setup.transaction.min-retry-wait-ms|`15000`|
|server.setup.transaction.wait-increment-ms|`10`|
|server.transaction.allow-writes|`true`|
|server.transaction.max-retries|`40`|
|server.transaction.max-retry-wait-ms|`2000`|
|server.transaction.min-retry-wait-ms|`100`|
|server.transaction.mode.default|`PROPAGATION_REQUIRED`|
|server.transaction.mode.readOnly|`PROPAGATION_REQUIRED, readOnly`|
|server.transaction.wait-increment-ms|`100`|
|server.web.transaction.max-duration-ms|`0`|
|share.context|`share`|
|share.host|`127.0.0.1`|
|share.port|`8080`|
|share.protocol|`http`|
|shutdown.backstop.enabled|`false`|
|shutdown.backstop.timeout|`10000`|
|solr.cmis.alternativeDictionary|`DEFAULT_DICTIONARY`|
|solr.host|`localhost`|
|solr.max.host.connections|`40`|
|solr.max.total.connections|`40`|
|solr.port|`8080`|
|solr.port.ssl|`8443`|
|solr.secureComms|`https`|
|solr.solrConnectTimeout|`5000`|
|solr.solrPassword|`solr`|
|solr.solrPingCronExpression|`0 0/5 * * * ? *`|
|solr.solrUser|`solr`|
|solr.store.mappings|`solrMappingAlfresco, solrMappingArchive`|
|solr.store.mappings.value.solrMappingAlfresco.baseUrl|`/solr/alfresco`|
|solr.store.mappings.value.solrMappingAlfresco.httpClientFactory|`solrHttpClientFactory`|
|solr.store.mappings.value.solrMappingAlfresco.identifier|`SpacesStore`|
|solr.store.mappings.value.solrMappingAlfresco.protocol|`workspace`|
|solr.store.mappings.value.solrMappingArchive.baseUrl|`/solr/archive`|
|solr.store.mappings.value.solrMappingArchive.httpClientFactory|`solrHttpClientFactory`|
|solr.store.mappings.value.solrMappingArchive.identifier|`SpacesStore`|
|solr.store.mappings.value.solrMappingArchive.protocol|`archive`|
|spaces.archive.store|`archive://SpacesStore`|
|spaces.company_home.childname|`app:company_home`|
|spaces.content_forms.childname|`app:forms`|
|spaces.dictionary.childname|`app:dictionary`|
|spaces.emailActions.childname|`app:email_actions`|
|spaces.extension_webscripts.childname|`cm:extensionwebscripts`|
|spaces.guest_home.childname|`app:guest_home`|
|spaces.imapConfig.childname|`app:imap_configs`|
|spaces.imap_attachments.childname|`cm:Imap Attachments`|
|spaces.imap_home.childname|`cm:Imap Home`|
|spaces.imap_templates.childname|`app:imap_templates`|
|spaces.inbound_transfer_records.childname|`app:inbound_transfer_records`|
|spaces.models.childname|`app:models`|
|spaces.nodetemplates.childname|`app:node_templates`|
|spaces.publishing.root.childname|`app:publishing_root`|
|spaces.rendition.rendering_actions.childname|`app:rendering_actions`|
|spaces.replication.replication_actions.childname|`app:replication_actions`|
|spaces.savedsearches.childname|`app:saved_searches`|
|spaces.scheduled_actions.childname|`cm:Scheduled Actions`|
|spaces.scripts.childname|`app:scripts`|
|spaces.searchAction.childname|`cm:search`|
|spaces.shared.childname|`app:shared`|
|spaces.sites.childname|`st:sites`|
|spaces.store|`workspace://SpacesStore`|
|spaces.templates.childname|`app:space_templates`|
|spaces.templates.content.childname|`app:content_templates`|
|spaces.templates.email.activities.childname|`cm:activities`|
|spaces.templates.email.childname|`app:email_templates`|
|spaces.templates.email.following.childname|`app:following`|
|spaces.templates.email.invite.childname|`cm:invite`|
|spaces.templates.email.invite1.childname|`app:invite_email_templates`|
|spaces.templates.email.notify.childname|`app:notify_email_templates`|
|spaces.templates.email.workflowemailnotification.childname|`cm:workflownotification`|
|spaces.templates.rss.childname|`app:rss_templates`|
|spaces.transfer_groups.childname|`app:transfer_groups`|
|spaces.transfer_temp.childname|`app:temp`|
|spaces.transfers.childname|`app:transfers`|
|spaces.user_homes.childname|`app:user_homes`|
|spaces.user_homes.regex.group_order|blank|
|spaces.user_homes.regex.key|`userName`|
|spaces.user_homes.regex.pattern|blank|
|spaces.wcm.childname|`app:wcm`|
|spaces.wcm_content_forms.childname|`app:wcm_forms`|
|spaces.wcm_deployed.childname|`cm:wcm_deployed`|
|spaces.webscripts.childname|`cm:webscripts`|
|spaces.workflow.definitions.childname|`app:workflow_defs`|
|subsystems.test.beanProp|`inst1,inst2,inst3`|
|subsystems.test.beanProp.default.anotherStringProperty|`Global Default`|
|subsystems.test.beanProp.default.longProperty|`123456789123456789`|
|subsystems.test.beanProp.value.inst2.boolProperty|`true`|
|subsystems.test.beanProp.value.inst3.anotherStringProperty|`Global Instance Default`|
|subsystems.test.simpleProp2|`true`|
|subsystems.test.simpleProp3|`Global Default3`|
|sync.checkLicenseForSyncMode|`true`|
|sync.mode|`ON_PREMISE`|
|sync.pullJob.enabled|`true`|
|sync.pushJob.enabled|`true`|
|system.acl.maxPermissionCheckTimeMillis|`10000`|
|system.acl.maxPermissionChecks|`1000`|
|system.authorities_container.childname|`sys:authorities`|
|system.bootstrap.config_check.strict|`true`|
|system.cache.disableImmutableSharedCaches|`false`|
|system.cache.disableMutableSharedCaches|`false`|
|system.cache.parentAssocs.limitFactor|`8`|
|system.cache.parentAssocs.maxSize|`130000`|
|system.certificate_container.childname|`sys:samlcertificate`|
|system.content.caching.cacheOnInbound|`true`|
|system.content.caching.contentCleanup.cronExpression|`0 0 3 * * ?`|
|system.content.caching.maxDeleteWatchCount|`1`|
|system.content.caching.maxFileSizeMB|`0`|
|system.content.caching.maxUsageMB|`4096`|
|system.content.caching.minFileAgeMillis|`60000`|
|system.content.contentUrlConverter.batchSize|`500`|
|system.content.contentUrlConverter.cronExpression|`* * * * * ? 2099`|
|system.content.contentUrlConverter.runAsScheduledJob|`false`|
|system.content.contentUrlConverter.threadCount|`2`|
|system.content.deletionFailureAction|`IGNORE`|
|system.content.eagerOrphanCleanup|`false`|
|system.content.maximumFileSizeLimit|blank|
|system.content.orphanCleanup.cronExpression|`0 0 4 * * ?`|
|system.content.orphanProtectDays|`14`|
|system.descriptor.childname|`sys:descriptor`|
|system.descriptor.current.childname|`sys:descriptor-current`|
|system.downloads_container.childname|`sys:downloads`|
|system.enableTimestampPropagation|`true`|
|system.filefolderservice.defaultListMaxResults|`5000`|
|system.hibernateMaxExecutions|`20000`|
|system.integrity.enabled|`true`|
|system.integrity.failOnViolation|`true`|
|system.integrity.maxErrorsPerTransaction|`5`|
|system.integrity.trace|`false`|
|system.maximumStringLength|`-1`|
|system.metadata-query-indexes.ignored|`true`|
|system.patch.sharedFolder.cronExpression|`0 0 0 ? 1 1 2030`|
|system.patch.sharedFolder.deferred|`false`|
|system.people_container.childname|`sys:people`|
|system.quickshare.enabled|`true`|
|system.readpermissions.bulkfetchsize|`1000`|
|system.readpermissions.optimise|`true`|
|system.remote_credentials_container.childname|`sys:remote_credentials`|
|system.store|`system://system`|
|system.syncset_definition_container.childname|`sys:syncset_definitions`|
|system.system_container.childname|`sys:system`|
|system.thumbnail.definition.default.maxPages|`-1`|
|system.thumbnail.definition.default.maxSourceSizeKBytes|`-1`|
|system.thumbnail.definition.default.pageLimit|`1`|
|system.thumbnail.definition.default.readLimitKBytes|`-1`|
|system.thumbnail.definition.default.readLimitTimeMs|`-1`|
|system.thumbnail.definition.default.timeoutMs|`-1`|
|system.thumbnail.generate|`true`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.docx|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.odp|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.ods|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.odt|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.pdf|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.pptx|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.txt|`-1`|
|system.thumbnail.mimetype.maxSourceSizeKBytes.xlsx|`-1`|
|system.thumbnail.quietPeriod|`604800`|
|system.thumbnail.quietPeriodRetriesEnabled|`true`|
|system.thumbnail.redeployStaticDefsOnStartup|`true`|
|system.thumbnail.retryCount|`2`|
|system.thumbnail.retryPeriod|`60`|
|system.usages.clearBatchSize|`0`|
|system.usages.enabled|`false`|
|system.usages.updateBatchSize|`50`|
|system.webdav.activities.enabled|`false`|
|system.webdav.renameShufflePattern|`(.*/\..*)|(.*[a-f0-9]{8}+$)|(.*\.tmp$)|(.*\.wbk$)|(.*\.bak$)|(.*\~$)|(.*backup.*\.do[ct]{1}[x]?[m]?$)`|
|system.webdav.rootPath|`${protocols.rootPath}`|
|system.webdav.servlet.enabled|`true`|
|system.webdav.storeName|`${protocols.storeName}`|
|system.webdav.url.path.prefix|blank|
|system.workflow.deployWorkflowsInTenant|`true`|
|system.workflow.deployservlet.enabled|`false`|
|system.workflow.engine.activiti.definitions.visible|`true`|
|system.workflow.engine.activiti.idblocksize|`100`|
|system.workflow.engine.activiti.taskvariableslimit|`20000`|
|system.workflow.maxAuthoritiesForPooledTasks|`500`|
|system.workflow.maxGroupReviewers|`0`|
|system.workflow.maxPooledTasks|`-1`|
|system.workflow_container.childname|`sys:workflow`|
|system.zones_container.childname|`sys:zones`|
|ticket.cleanup.cronExpression|`0 0 * * * ?`|
|transferservice.receiver.enabled|`false`|
|transferservice.receiver.lockRefreshTime|`60000`|
|transferservice.receiver.lockRetryCount|`3`|
|transferservice.receiver.lockRetryWait|`100`|
|transferservice.receiver.lockTimeOut|`300000`|
|transferservice.receiver.stagingDir|`${java.io.tmpdir}/alfresco-transfer-staging`|
|transformer.Archive.includeContents|`false`|
|trashcan.MaxSize|`1000`|
|urlshortening.bitly.api.key|`R_ca15c6c89e9b25ccd170bafd209a0d4f`|
|urlshortening.bitly.url.length|`20`|
|urlshortening.bitly.username|`brianalfresco`|
|user.name.caseSensitive|`false`|
|version.store.deprecated.lightWeightVersionStore|`workspace://lightWeightVersionStore`|
|version.store.enableAutoVersioning|`true`|
|version.store.migrateCleanupJob.batchSize|`1`|
|version.store.migrateCleanupJob.threadCount|`3`|
|version.store.migrateVersionStore.batchSize|`1`|
|version.store.migrateVersionStore.cronExpression|`* * * * * ? 2099`|
|version.store.migrateVersionStore.limitPerJobCycle|`-1`|
|version.store.migrateVersionStore.runAsScheduledJob|`false`|
|version.store.migrateVersionStore.threadCount|`3`|
|version.store.onlyUseDeprecatedV1|`false`|
|version.store.version2Store|`workspace://version2Store`|
|version.store.versionComparatorClass|blank|
|wcm.rename.max.time.milliseconds|`2000`|
|webscripts.encryptTempFiles|`false`|
|webscripts.memoryThreshold|`4194304`|
|webscripts.setMaxContentSize|`4294967296`|
|webscripts.tempDirectoryName|`WebScripts`|
|xforms.formatCaption|`true`|

>**Note:** From Content Services 5.1 onwards, the `system.workflow.engine.activiti.enabled` property is no longer available.

### Alfresco:Name=License

Object Type = `org.alfresco.enterprise.repo.management.LicenseDescriptor`

Exposes the parameters of the Content Services license.

See the Repo Admin Console **General > License** for information about these attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-license`

### Alfresco:Name=Log4jHierarchy

Object Type = `org.apache.log4j.jmx.HierarchyDynamicMBean*`

`Log4jHierarchy` is an instance of the `HierarchyDynamicMBean` class provided with log4j that allows adjustments to be made to the level of detail included in the server logs.

All read only attributes are prefixed with `logger=org.alfresco.` and the default value is the same as the attribute name, for example, `logger=org.alfresco.cmis` is the name and default value of the CMIS logger.

The editable `threshold` attribute is discussed in [JMX editable management beans](#editablembeans).

### Alfresco:Name=MetadataQueryIndexesCheck

Object Type = `org.alfresco.enterprise.repo.management.PatchCheck`

Exposes the metadata query index patch number and whether the patch has been applied:

| Attribute name | Example value |
| -------------- | ------------- |
| Applied | `true` |
| PatchId | `patch.db-V4.2-metadata-query-indexes` |

### Alfresco:Name=ModuleService

Object Type = `org.alfresco.enterprise.repo.management.ModuleService`

Allows monitoring of installed modules, listing modules that have been applied, and any missing modules:

Attribute name = `AllModules`
Example format: A composite table containing the details of all modules currently installed

```text
[ [ Attribute Name           Attribute Value
   ----------------------------------------------------
    module.description      Alfresco Docs Integration
    module.id               org.alfresco.integrations.google.docs
    module.installDate      2014-06-20T09:43:17.773+01:00
    module.installState     INSTALLED
    module.repo.version.max 999
    module.repo.version.min 4.2.0
    module.title            Alfresco Google Docs Integration
    module.version          2.0.6 ] ]
```

Attribute name = `MissingModules`
Example value = `[]`

### Alfresco:Name=PatchService

Object Type = `org.alfresco.enterprise.repo.management.PatchService`

Allows monitoring of installed patches.

Attribute name = `AppliedPatches`
Example format: A composite table containing the details of all patches currently installed

```text
[ [ Attribute Name  Attribute Value
   ----------------------------------------------------
   appliedOnDate   Fri Jun 20 09:47:59 BST 2014
   appliedToSchema 6052
   appliedToServer 4.2.1 (r63452-b50) - Enterprise
   description     Migrate old Tenant attributes
   fixesFromSchema 0
   fixesToSchema   0
   id              patch.migrateAttrTenants
   report          Not relevant to schema 6,052
   succeeded       true
   targetSchema    1
   wasExecuted     false ] ]
```

### Alfresco:Name=RepoServerMgmt

Object Type = `org.alfresco.repo.admin.RepoServerMgmt`

Exposes information about the repository server, including the maximum number of users, user and ticket counts:

| Attribute name | Example value |
| -------------- | ------------- |
| MaxUsers | `-1` |
| ReadOnly | `false` |
| TicketCountAll | `2` |
| TicketCountNonExpired | `2` |
| UserCountAll | `2` |
| UserCountNonExpired | `2` |

### Alfresco:Name=RepositoryDescriptor

Object Type = `org.alfresco.enterprise.repo.management.RepositoryDescriptor, Type=*`

Exposes metadata about the Alfresco repository.

There are three types:

* `Alfresco:Name=RepositoryDescriptor,Type=Current`: exposes information about the current repository installation.
* `Alfresco:Name=RepositoryDescriptor,Type=Initially Installed`: exposes information about the initial repository installation, before any patches or upgrades were installed.
* `Alfresco:Name=RepositoryDescriptor,Type=Server`: exposes information about the current server version, as contained in the Content Services war file. This instance should be used to determine the properties of the server.

See the Repo Admin Console **General > Repository Information** for information about these attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-repositoryinfo`.

### Alfresco:Name=RunningActions

Object Type = `org.alfresco.enterprise.repo.management.ActionsImpl`

Exposes information about any actions that are in progress, including the number and action statistics:

| Attribute name | Example value |
| -------------- | ------------- |
| ActionStatistics | `[]` |
| RunningActionCount | `0` |
| RunningActions | `[]` |

### Alfresco:Name=Runtime

Object Type = `org.alfresco.enterprise.repo.management.Runtime`

Exposes basic properties about the memory available to the JVM, including the amount of free memory and the maximum and total amount of memory in bytes.

> **Note:** A Oracle JVM exposes much more detailed information through its platform MX Beans.

| Attribute name | Example value |
| -------------- | ------------- |
| AvailableProcessors | `8` |
| AvailableProcessorsFreeMemory | `391222616` |
| MaxMemory | `778502144` |
| TotalMemory | `778502144` |

### Alfresco:Name=Schedule

Object Type = `org.alfresco.enterprise.scheduler.MonitoredRAMJobStore$MonitoredCronTrigger, Group=*, Type=*, Trigger=*`

Allows monitoring of the individual triggers, i.e. scheduled jobs, running in the Quartz scheduler. The attributes have various default settings but share the following meanings:

| Property | Description |
| -------- | ----------- |
| Group | The name of the schedule group that owns the trigger. Typically DEFAULT. |
| Type | The type of trigger, typically `MonitoredCronTrigger` or `MonitoredSimpleTrigger`. Triggers of different types have different properties. |
| Trigger | The name of the trigger itself. Must be unique within the group. |

All instances have the following properties:

| Property | Description |
| -------- | ----------- |
| CalendarName | The name of the scheduling Calendar associated with the trigger, or null if there is not one. |
| Description | An optional textual description of the trigger. |
| EndTime | The time after which the trigger will stop repeating, if set. |
| FinalFireTime | The time at which the last execution of the trigger is scheduled, if applicable. |
| Group | The name of the schedule group that owns the trigger. |
| JobGroup | The name of the schedule group that owns the job executed by the trigger. |
| JobName | The name of the job executed by the trigger. |
| MayFireAgain | A Boolean that when true indicates that it is possible for the trigger to fire again. |
| Name | The name of the trigger. |
| NextFireTime | The next time at which the trigger will fire. |
| PreviousFireTime | The previous time at which the trigger fired. |
| Priority | A numeric priority that decides which trigger is executed before another in the event of a 'tie' in their scheduled times. |
| StartTime | The time at which the trigger should start. |
| State | The current state of the trigger. |
| Volatile | A Boolean that when true indicates that the trigger won't be remembered when the JVM is restarted. |

When `Type=MonitoredCronTrigger`, the following additional properties are available:

| Property | Description |
| -------- | ----------- |
| CronExpression | A unix-like expression, using the same syntax as the cron command, that expresses when the job should be scheduled. |
| TimeZone | The name of the time zone to be used to interpret times. |

If `Type=MonitoredSimpleTrigger`, the following additional properties are available:

| Property | Description |
| -------- | ----------- |
| RepeatCount | The number of times the job should repeat, after which it'll be removed from the schedule. A value of `-1` means repeat indefinitely. |
| RepeatInterval | The time interval in milliseconds between job executions. |
| TimesTriggered | The number of times the job has been run. |

To run the database cleanup activities, schedule the `propTablesCleanupTrigger` attribute. For more information, see [Scheduling cleanup of database tables]({% link content-services/7.2/admin/db-cleanup.md %}#schedulerdbcleanup).

### Alfresco:Name=SolrIndexes

Object Type = `org.alfresco.enterprise.repo.management.SOLRIndex`

Allows monitoring of each searchable index. There are two types:

* `Alfresco:Name=SolrIndexes,Core=alfresco`: exposes information about the current index directory.
* `Alfresco:Name=SolrIndexes,Core=archive`: exposes information about the archive index directory.

| Attribute name | Example value |
| -------------- | ------------- |
| Current | `true` |
| DataDirectory | `C:\Alfresco\alf_data\solr\archive\SpacesStore\` |
| HasDeletions | `false` |
| IndexInstanceDirectory | org.apache.lucene.store.SimpleFSDirectory: org.apache.lucene.store.SimpleFSDirectory@ C:\Alfresco\alf_data\solr\archive\SpacesStore\index |
| InstanceDirectory | `C:\Alfresco\alf_data\solr\archive-SpacesStore\` |
| LastModified | Format: `Thu Sep 24 14:32:30 BST 2015` |
| MaxDocument | `940` |
| NumDocuments | `940` |
| Optimized | `true` |
| StartTime | Format: `Mon Oct 12 10:36:20 BST 2015` |
| Uptime | `364362` |
| Version | `1403253989735` |

### Alfresco:Name=SystemProperties

Object Type = `org.alfresco.enterprise.repo.management.PropertiesDynamicMBean`

Exposes all the system properties of the JVM. The set of standard system properties is documented on the Apache website.

See the Repo Admin Console **System Summary** for information about these attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-systemsummary`.

### Alfresco:Name=WorkflowInformation

Object Type = `org.alfresco.enterprise.repo.management.Workflow`

Exposes information about the workflow management interface for Activiti definitions and tasks. Only the read-only attributes for `Alfresco:Name=WorkflowInformation` are shown in this table. For information about the editable attributes, see [JMX editable management beans](#editablembeans).

| Attribute name | Example value |
| -------------- | ------------- |
| ActivitiEngineEnabled | `true`|
| ActivitiWorkflowDefinitionsVisible | `true`|
| NumberOfActivitiTaskInstances | `0`|
| NumberOfActivitiWorkflowDefinitionsDeployed | `9`|
| NumberOfActivitiWorkflowInstances | `0`|

> **Important:** The `ActivitiEngineEnabled` property is enabled by default. It is recommended that you do not change (or disable) this property via the JMX client.

## JMX editable MBeans {#editablembeans}

JMX values (Managed Bean or MBean attributes) are exposed in the Repo Admin Console and with internal tools (Alfresco JMX Dump) or external tools like JConsole. The editable management beans are described here with their default values where attributes are not already explained in the Admin Console.

The default values given are the defaults for an installer-installed instance of Content Services on Windows. These values can differ if you're using a different install method or operating system.

> **WARNING**: Be aware that any changes you make to attributes in the live system are written to the database. The next time that Content Services starts, these values will take precedence over any values specified in properties files, for example, `alfresco-global.properties`.

### Alfresco:Type=Configuration, Category=ActivitiesFeed

Object Type = `ActivitiesFeed$default`

This MBean provides information about the Activities Feed configuration, including whether the feed is enabled and how often users will receive Activities Feed emails.

See the Repo Admin Console **Repository Services - Activities Feed** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-activitiesfeed`.

### Alfresco:Type=Configuration, Category=Audit

Object Type = `Audit$default`

This MBean provides information about the audit configuration, namely which audit capabilities are enabled.

| Attribute name | Example value |
| -------------- | ------------- |
| audit.alfresco-access.enabled | `false` |
| audit.cmischangelog.enabled | `false` |
| audit.enabled | `true` |
| audit.sync.enabled | `true` |
| audit.tagging.enabled | `true` |

### Alfresco:Type=Configuration, Category=Authentication

Object Type = `Authentication$managed$alfrescoNtlm1`

This MBean provides information about the authentication configuration.

See the Admin Console Directories - Directory Management for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-directorymanagement`.

### Alfresco:Type=Configuration, Category=ContentStore

Object Type = `ContentStore$managed$encrypted` or `ContentStore$managed$unencrypted`

This MBean provides information about the type of `ContentStore` used and its configuration. For more information, see [Set up encryption properties using JMX client]({% link content-services/7.2/admin/content-stores.md %}#configencryptedcs) and [Encrypted Content Store properties]({% link content-services/7.2/admin/content-stores.md %}#encryptedcsprops).

### Alfresco:Type=Configuration, Category=Events

Object Type = `Events$default`

This MBean provides information about the type of events that are used for monitoring.

| Attribute name | Values |
| -------------- | ------ |
| alfresco.events.include | `CONTENTPUT, NODEADDED, NODEREMOVED, NODEMOVED, NODERENAMED, NODECHECKOUTCANCELLED, NODECHECKEDOUT, NODECHECKEDIN` |

### Alfresco:Type=Configuration, Category=Replication

Object Type = `Replication$default`

This MBean provides information about the replication settings between repositories, and the replication configuration.

See the Repo Admin Console **Repository Services - Replication Service** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-replicationservice`.

### Alfresco:Type=Configuration, Category=Search

Object Types=`Search$*`

This MBean provides information about the search service in use (Solr, Solr 4 or no index) and the configuration for that search.

See the Repo Admin Console **Repository Services - Search Service** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-searchservice`.

### Alfresco:Type=Configuration, Category=Subscriptions

Object Type = `Subscriptions$default`

This MBean provides information about settings for subscriptions, including whether subscriptions are enabled and any template paths.

See the Repo Admin Console **Repository Services - Subscription Service** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-subscriptionservice`.

### Alfresco:Type=Configuration, Category=Synchronization

Object Type = `Synchronization$default`

This MBean provides information about the synchronization settings in, including when to synchronize and logging intervals.

| Attribute name | Example value |
| -------------- | ------------- |
| synchronization.allowDeletions | `true` |
| synchronization.autoCreatePeopleOnLogin | `true` |
| synchronization.import.cron | `0 0 0 * * ?` |
| synchronization.loggingInterval | `100` |
| synchronization.syncOnStartup | `true` |
| synchronization.syncWhenMissingPeopleLogIn | `true` |
| synchronization.synchronizeChangesOnly | `true` |
| synchronization.workerThreads | `1` |

### Alfresco:Type=Configuration, Category=Transformers

Object Type = `Transformers$default`

This MBean provides information about the transformation service setting for converting between different file formats.

See the Repo Admin Console **Repository Services - Transformation Services** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-transformations`.

### Alfresco:Type=Configuration, Category=WebDav

Object Type = `org.alfresco.enterprise.repo.management.WebDav`

This MBean provides information about whether WebDav is enabled or disabled.

| Attribute name | Example value |
| -------------- | ------------- |
| Enabled | `true` |

### Alfresco:Type=Configuration, Category=email

Object Types=`email$inbound, email$outbound`

This MBean provides information about the inbound and outbound email configuration, including server, protocol and encoding information.

See the Repo Admin Console **Email Services - Inbound Email and Email Services - Outbound Email** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-inboundemail` and `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-outboundemail`.

### Alfresco:Type=Configuration, Category=fileServers

Object Type = `fileServers$default`

This MBean provides information about the FTP server configured.

See the Repo Admin Console **Virtual File Systems - File Servers** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-fileservers`.

### Alfresco:Type=Configuration, Category=googledocs

Object Type = `googledocs$v2`

This MBean provides information about the Google Docs configuration.

| Attribute name | Example value |
| -------------- | ------------- |
| googledocs.enabled | `true` |
| googledocs.idleThresholdSeconds | `600` |
| googledocs.version | `2.0.6-12ent` |

### Alfresco:Type=Configuration, Category=imap

Object Types=`imap$default, imap$default$imap.config.server.mountPoints$AlfrescoIMAP`

This MBean provides information about the IMAP mail and server configuration.

See the Repo Admin Console **Virtual File Systems - IMAP Service** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-imap`.

### Alfresco:Type=Configuration, Category=sysAdmin

Object Type = `sysAdmin$default`

This MBean provides information about the administration settings for the Alfresco Share.

| Attribute name | Example value |
| -------------- | ------------- |
| alfresco.context | `alfresco` |
| alfresco.host | `127.0.0.1` |
| alfresco.port | `8080` |
| alfresco.protocol | `http` |
| server.allowWrite | `true` |
| server.allowedusers | |
| server.maxusers | `-1` |
| share.context | `share` |
| share.host | `127.0.0.1` |
| share.port | `8080` |
| share.protocol | `http` |
| site.public.group | `GROUP_EVERYONE` |

### Alfresco:Type=Configuration, Category=thirdParty

Object Type = `thirdparty$default`

This MBean provides information about the third party modules configured.

### Alfresco:Name=FileServerConfig (editable)

Object Type = `com.sun.proxy$Proxy108`

This MBean allows management and monitoring of the FTP servers configured. See the Repo Admin Console **Virtual File Systems - File Servers** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-fileservers`.

### Alfresco:Name=Log4jHierarchy (editable)

Object Type = `org.apache.log4j.jmx.HierarchyDynamicMBean`

This MBean is an instance of the `HierarchyDynamicMBean` class provided with log4j that allows adjustments to be made to the level of detail included in the server logs. Not all attributes for `Alfresco:Name=Log4jHierarchy` are editable; only those that are editable are shown in this table.

| Attribute name | Example value |
| -------------- | ------------- |
| threshold | `ALL` |

Threshold is a special attribute that controls the server-wide logging threshold. It is not cluster aware. Its value must be the name of one of the log4j logging levels.

> **CAUTION:** Any messages logged with a priority lower than this threshold will be filtered from the logs. The default value is ALL, which means no messages are filtered, and the highest level of filtering is OFF which turns off logging altogether (not recommended).

You can add a new logger to `Log4jHierarchy` by selecting the **Operations > addLoggerMBean** operation in JConsole and specify the string and priority for the new logger MBean. The bean will be given an additional read-only property for that logger and a new MBean will be registered in the `#log4j:logger=*` tree, allowing management of that logger.

It is not normally necessary to use this operation, because the server pre-registers all loggers initialized during startup. However, if the logger you're interested in was not initialized at this point, you'll have to add a logger. Add the fully qualified name of the logger as an argument and if successful, the object name of the newly registered MBean for managing that logger is returned. The logger is then displayed in the attribute list of log4j loggers.

For example, if in Java class `org.alfresco.repo.admin.patch.PatchExecuter` the logger is initialized as follows:

```java
private static Log logger = LogFactory.getLog(PatchExecuter.class);
```

Then the logger name would be `org.alfresco.repo.admin.patch.PatchExecuter`.

### Alfresco:Name=Schedule (editable)

Object Type = `org.alfresco.enterprise.scheduler.MonitoredRAMJobStore$MonitoredCronTrigger`

This MBean provides information on the triggers that are configured, for example, those that are started by cron jobs or other events. You can fire a trigger by selecting the required MBean trigger and **Operations > executeNow**. The selected trigger is started.

### Alfresco:Name=WorkflowInformation (editable)

Object Type = `org.alfresco.enterprise.repo.management.Workflow`

Exposes information about the workflow management interface for Activiti definitions and tasks. The attributes for `Alfresco:Name=WorkflowInformation` are shown in this table.

| Attribute name | Example value |
| -------------- | ------------- |
| ActivitiEngineEnabled | `true` |
| ActivitiWorkflowDefinitionsVisible | `true` |
| NumberOfActivitiTaskInstances | `0` |
| NumberOfActivitiWorkflowDefinitionsDeployed | `9` |
| NumberOfActivitiWorkflowInstances | `0` |

> **Important:** The `ActivitiEngineEnabled` attribute is enabled by default. It is recommended that you do not change (or disable) this property via the JMX client.

See the Repo Admin Console **Repository Services - Process Engines** for information about these editable attributes: `http://<hostname>:<portnumber>/alfresco/service/enterprise/admin/admin-processengines`.

**log4j:logger=***

An instance of the `LoggerDynamicMBean` class provided with log4j that allows adjustments to be made to the level of detail included in the logs from an individual logger.

Not all attributes for `log4j:logger=*` are editable; only those that are editable are shown in this table.

| Attribute name | Example value |
| -------------- | ------------- |
| priority | `WARN`|

Priority is a special attribute that specifies the minimum log4j logging level of messages from this logger to include in the logs. For example, a value of ERROR would mean that messages logged at lower levels such as WARN and INFO would not be included.

You can change the priority of any log4j attribute by selecting the required MBean and **Attributes > priority**. The new value does not prevail after a shutdown. For a list of possible priority values, see [Log4j priority settings](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/Priority.html){:target="_blank"}.
