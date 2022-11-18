---
title: Audit Log Extension Point
---

Alfresco provides the ability to audit activity in the repository. What to audit log can be customized.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

The Audit service can be used to keep a record (log) of all operations performed in the repository. The audit information 
is stored in a database in a form that is designed to be simple for third-party reporting tools to consume. 
The service allows auditing of virtually any system event, including metadata changes.

By default auditing is turned off but it can easily be turned on with a property configuration. There is a default 
Audit Application available out-of-the-box that logs the usual create, read, update, and delete operations by the users. 
It is also possible to control what events that are written to the Audit log by creating new Audit Applications.

Further information can be found in the [Auditing Guide]({% link content-services/7.2/admin/audit.md %}).

Sometimes it is necessary to implement a custom audit application. Let's define a custom audit application that logs 
Alfresco Share site operations. However, before doing anything around the new audit application we need to make sure that 
the overall audit functionality in Alfresco is enabled, this is done in `alfresco-global.properties`:

```text
audit.enabled=true
audit.alfresco-access.enabled=true
audit.alfresco-access.sub-actions.enabled=false
```

The first property `audit.enabled` controls the audit functionality in Alfresco. We have also enabled the out-of-the-box 
audit application called `alfresco-access` as we can use it to produce the audit data we need in the site access audit 
application. The `alfresco-access` application will produce high-level audit data such as:

* Logins (success and failure)
* Create, Read, Update, and Delete on nodes
* Updates to metadata/property
* Adding and Removing aspects
* Reading and Updating content
* Check in, Check out, and Cancel check-out
* Versioning of content nodes

A custom audit application is defined in XML and in a file located in the `alfresco/extension/audit` directory. Name the 
file according to what the audit application does, such as `share-site-audit-app.xml`:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<Audit
        xmlns="http://www.alfresco.org/repo/audit/model/3.2"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd"
        >
    <DataExtractors>
        <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
        <DataExtractor name="nodeName" registeredName="auditModel.extractor.nodeName"/>
        <DataExtractor name="nodeType" registeredName="auditModel.extractor.nodeType"/>

        <!-- Custom data extractor -->
        <DataExtractor name="siteName" class="org.alfresco.tutorial.audit.dataextractor.SiteNameDataExtractor"/>
    </DataExtractors>

    <PathMappings>
        <PathMap source="/alfresco-access" target="/share-site-access"/>
    </PathMappings>

    <Application name="ShareSiteAccess" key="share-site-access">
        <RecordValue key="access" dataExtractor="simpleValue" dataSource="/share-site-access/transaction/action"
                     dataTrigger="/share-site-access/transaction/action"/>
        <RecordValue key="nodepath" dataExtractor="simpleValue" dataSource="/share-site-access/transaction/path"
                     dataTrigger="/share-site-access/transaction/path"/>
        <RecordValue key="nodename" dataExtractor="nodeName" dataSource="/share-site-access/transaction/node"
                     dataTrigger="/share-site-access/transaction/node"/>
        <RecordValue key="nodetype" dataExtractor="nodeType" dataSource="/share-site-access/transaction/node"
                     dataTrigger="/share-site-access/transaction/node"/>
        <RecordValue key="site" dataExtractor="siteName" dataSource="/share-site-access/transaction/path"
                     dataTrigger="/share-site-access/transaction/path"/>
    </Application>
</Audit>
```

The audit configuration file starts with a definition of the Data Extractors that we will be using in our audit application. 
These components are present to take input data, such as a `NodeRef` object, and provide output data, such as a node name. 
For further information about Data Extractors [see this page]({% link content-services/7.2/admin/audit.md %}#dataextractor).

One example of an extractor is the `NodeNameDataExtractor`, which basically extracts the value of `cm:name` for the node. 
We define it as an extractor for our audit application by using the registered name (i.e. Spring bean id) 
`auditModel.extractor.nodeName`.

Sometimes a data extractor might not be available for what we want to audit log. In our case we want to keep the 
Alfresco Share site identifier (that is, site short name) in the audit log, and there is no out-of-the-box extractor 
for this data. In these cases we can implement a custom data extractor.

The `siteName` data extractor is a custom data extractor that is implemented with the 
`org.alfresco.tutorial.audit.dataextractor.SiteNameDataExtractor` class as follows:

```java
public class SiteNameDataExtractor extends AbstractDataExtractor {
   /**
     * @return true if this extractor can do anything with the data
     */
    @Override
    public boolean isSupported(Serializable data) {
        return (data != null && data instanceof String);
    }

   /**
     * Extract the site name / id
     * 
     * @param in a string containing the site id
     * @return the site id
     * @throws Throwable
     */
    @Override
    public Serializable extractData(Serializable in) throws Throwable {
       String path = (String) in;
   
       String siteName = "";
       if (path.contains("st:sites")) {
          siteName = StringUtils.substringBetween(path, "/st:sites/", "/");
   
          if (logger.isDebugEnabled()) {
             logger.debug("Extracted site name: " + siteName);
          }
       }
   
       // If content is not in a site, or if it is surf config for user dashboard
       if (StringUtils.isBlank(siteName) || StringUtils.equals(siteName, "cm:surf-config")) {
          // The default site name for content not associated with sites.
          siteName = "<no-site>";
       }
   
       return siteName;
   }
}
```

The data extractor class should extend the `org.alfresco.repo.audit.extractor.AbstractDataExtractor` base class and 
implement the `isSupported` and `extractData` methods. This class is registered directly as a Data Extractor in the 
above audit application configuration, if we needed to use a public Java API service, such as the `NodeService`, then 
we could register the data extractor as a Spring bean in the same way as the out-of-the-box data extractors.

After we have defined the data extractors we need to define the audit paths that we want to record data for. An audit 
path basically tells you what data producer and operation that should be mapped to our custom audit application. In our 
case we just want to map all operations produced by the `alfresco-access` data producer to our application, so the path 
mapping is simply `<PathMap source="/alfresco-access" target="/share-site-access"/>`.

The last thing we define is the actual audit application and what values we want to record in the log. For this we need 
to know a bit about what the complete audit paths look like that the `alfresco-access` application is producing. We can 
see this by turning on debug log with:

```text
log4j.logger.org.alfresco.repo.audit.inbound=DEBUG
```

Starting up Alfresco with the audit log turned on we will see logs such as:

```text
Inbound audit values:
	/alfresco-access/transaction/type=cm:content
	/alfresco-access/transaction/path=/app:company_home/st:sites/cm:alfresco-kb/cm:documentLibrary/cm:MyFolder2/cm:some.txt
	/alfresco-access/transaction/action=readContent
	/alfresco-access/transaction/sub-actions=readContent updateNodeProperties addNodeAspect
	/alfresco-access/transaction/properties/add/cm:lastThumbnailModification=[pdf:1455014546353]
	/alfresco-access/transaction/node=workspace://SpacesStore/ab10b6e6-2399-4d25-9ea8-a4282acc62c5
	/alfresco-access/transaction/aspects/add/cm:thumbnailModification=null
	/alfresco-access/transaction/properties/add=cm:lastThumbnailModification=[pdf:1455014546353]
	/alfresco-access/transaction/aspects/add/rn:renditioned=null
	/alfresco-access/transaction/user=admin
	/alfresco-access/transaction/aspects/add=[{http://www.alfresco.org/model/rendition/1.0}renditioned, {http://www.alfresco.org/model/content/1.0}thumbnailModification]                  
```

So we can see that everything is under the `/transaction` path and we can use that to define what values we want to log, 
such as for example:

```xml
<RecordValue key="access" dataExtractor="simpleValue" dataSource="/share-site-access/transaction/action" dataTrigger="/share-site-access/transaction/action"/>
```

Before we start this up and add content to a site we need to configure some filters so we don't get audit logging for 
everything in the repository:

```text
# Capture only site data, and ignore stuff done by system user
audit.filter.alfresco-access.default.enabled=true
audit.filter.alfresco-access.default.user=~System;~null;.*
audit.filter.alfresco-access.default.path=/app:company_home/st:sites/.*
audit.filter.alfresco-access.transaction.user=~System;~null;.*
audit.filter.alfresco-access.transaction.path=/app:company_home/st:sites/.*
audit.filter.alfresco-access.transaction.action=
audit.filter.alfresco-access.transaction.type=
```

The `".default."` values are overridden by the more specific `".transaction."` values. Here we filter out anything not 
in a site or created by `System` or `null` user. We also reset the `action` and `type` so we get logs for custom types.

If we run the system now and create a text file in a site we should see audit logs such as the following when using 
the `http://localhost:8080/alfresco/service/api/audit/query/ShareSiteAccess?verbose=true&limit=0` Web Script:

```json
{
   id: 7,
   application: "ShareSiteAccess",
   user: "admin",
   time: "2016-02-09T14:45:59.019Z",
   values: {
      /share-site-access/nodename: "someplain.txt",
      /share-site-access/site: "cm:alfresco-kb",
      /share-site-access/access: "CREATE",
      /share-site-access/nodepath: "/app:company_home/st:sites/cm:alfresco-kb/cm:documentLibrary/cm:MyFolder/cm:someplain.txt",
      /share-site-access/nodetype: "{http://www.alfresco.org/model/content/1.0}content"
   }
},
{
   id: 9,
   application: "ShareSiteAccess",
   user: "admin",
   time: "2016-02-09T14:46:02.664Z",
   values: {
      /share-site-access/nodename: "pdf",
      /share-site-access/site: "cm:alfresco-kb",
      /share-site-access/access: "CREATE",
      /share-site-access/nodepath: "/app:company_home/st:sites/cm:alfresco-kb/cm:documentLibrary/cm:MyFolder/cm:someplain.txt/cm:pdf",
      /share-site-access/nodetype: "{http://www.alfresco.org/model/content/1.0}thumbnail"
   }
},
{
   id: 11,
   application: "ShareSiteAccess",
   user: "admin",
   time: "2016-02-09T14:46:02.685Z",
   values: {
      /share-site-access/nodename: "someplain.txt",
      /share-site-access/site: "cm:alfresco-kb",
      /share-site-access/access: "readContent",
      /share-site-access/nodepath: "/app:company_home/st:sites/cm:alfresco-kb/cm:documentLibrary/cm:MyFolder/cm:someplain.txt",
      /share-site-access/nodetype: "{http://www.alfresco.org/model/content/1.0}content"
   }
},
```

We can see in the log that username and date and time is recorded automatically for us, we don't need to specify 
`<RecordValue` element for them in the audit application configuration.

Defining a custom audit application can be really useful as you can control exactly what data that goes into the log. 
And it is also possible to create scheduled jobs to extract the data and send it somewhere else for processing or archiving, 
followed by a clean-up of the log in Alfresco.

Beside the `alfresco-access` data producer we also have the `alfresco-api` data producer that operates on a more fine 
grained level, giving you an opportunity to audit log access to some part of the public API for example. Running with 
debug gives us an idea of what data it produces and the paths for it:

```text
Inbound audit values:
   /alfresco-api/pre/NodeService/getProperty/args/nodeRef=workspace://SpacesStore/2382808a-10d2-4316-bdf3-ec80439d74c4
   /alfresco-api/pre/NodeService/getProperty/args/qname={http://www.alfresco.org/model/content/1.0}modified

Inbound audit values:
   /alfresco-api/post/NodeService/getAspects/args/nodeRef=workspace://SpacesStore/2382808a-10d2-4316-bdf3-ec80439d74c4
   /alfresco-api/post/NodeService/getAspects/result=[{http://www.alfresco.org/model/rendition/1.0}hiddenRendition, {http://www.alfresco.org/model/content/1.0}indexControl, {http://www.alfresco.org/model/content/1.0}auditable, {http://www.alfresco.org/model/system/1.0}referenceable, {http://www.alfresco.org/model/system/1.0}localized]
   /alfresco-api/post/NodeService/getAspects/no-error=null
```

It is also possible to query the audit log based on a timestamp range. Let's say for example that you would like to see 
all audit logs between 2016-08-24 07:00:00 and 2016-08-24 07:59:59. To achieve this we first need to convert the date 
and time to timestamps (i.e. long values). There are a few websites that offer help with this, one is 
[EpochConverter](https://www.epochconverter.com/){:target="_blank"}. After conversion we have 1472018400000 and 1472021999000 
(It is important to select the correct timezone when converting, in this case it is GMT+1:00). Note that the milliseconds 
part need to be included. The query will then for example look like this for the out-of-the-box audit application:
`http://localhost:8080/alfresco/service/api/audit/query/alfresco-access?verbose=true&fromTime=1472018400000&toTime=1472021999000`.

## Deployment - App Server

* `{INSTALL_PATH}/tomcat/shared/classes/alfresco/extension/audit` - audit application configuration files
* `{INSTALL_PATH}/tomcat/shared/classes/alfresco/alfresco-global.properties` - enable auditing

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/resources/alfresco/extension/audit` - audit application configuration files
* `aio/platform-jar/src/main/java/{custom package path}` - data extractor implementations
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/alfresco-global.properties` - enable audit log and filter configurations

## More Information

* [Auditing Alfresco]({% link content-services/7.2/admin/audit.md %})

## Sample Code

* [Sample audit log implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-audit-app-repo){:target="_blank"}

## Tutorials

* [Audit API Hints and Tricks](https://www.youtube.com/watch?v=_aP_JYTwZ6Y){:target="_blank"} - Alfresco DevCon presentation by Mehdi Belmekki.
* [Audit and Reporting with Alfresco and NoSQL](https://www.slideshare.net/zaiziltd/scale-audit-reporting-with-a-nosql-architecture){:target="_blank"} - Alfresco Summit presentation by Zaizi
* [Audit tutorials]({% link content-services/7.2/admin/audit.md %}#audittutorials)
