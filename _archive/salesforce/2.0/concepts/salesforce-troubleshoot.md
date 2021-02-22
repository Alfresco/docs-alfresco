---
audience: 
---

# Troubleshooting problems with Alfresco and Salesforce

Use this information to troubleshoot common issues when connecting Alfresco to Salesforce.

-   [Associated document not available](salesforce-troubleshoot.md#1)
-   [Error when trying to configure Alfresco to Salesforce connection](salesforce-troubleshoot.md#2)
-   [All Salesforce record folders created with a 15- or 18-character Salesforce Record ID](salesforce-troubleshoot.md#3)
-   [Alfresco does not start in Salesforce](salesforce-troubleshoot.md#4)
-   [Problems loading Site to Object Mapping and Metadata Mapping in Alfresco Setup](salesforce-troubleshoot.md#5)
-   ["Unable to resolve the server's DNS address" message in Salesforce](salesforce-troubleshoot.md#7)
-   ["Error rendering Force.com Canvas application" message in Salesforce](salesforce-troubleshoot.md#8)
-   [Alfresco connection error when accessing Salesforce content](salesforce-troubleshoot.md#9)
-   [HTTP Status 404 or Service Unavailable message](salesforce-troubleshoot.md#10)
-   [Edit Offline problems with Apple Safari](salesforce-troubleshoot.md#11)
-   [Unable to load the Alfresco Content Connector in Salesforce using Firefox](salesforce-troubleshoot.md#12)
-   [Comments made outside site show @@NULL@@ in My Activities dashlet](salesforce-troubleshoot.md#13)
-   [Using the Canvas App Component directly in the Lightning UI](salesforce-troubleshoot.md#14)

![](../images/hr.png)

**Associated document not available**

There is a known issue with associating \(linking\) a document. If you associate a document in Alfresco, and then download and edit the source document offline, the associated document is not available.

If you cancel the Edit Offline action, the associated document is available.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Error when trying to configure Alfresco to Salesforce connection**

When you configure Alfresco in Salesforce, in the Salesforce Alfresco Setup tab, you configure both Site to Object Mapping and Metadata Mapping. When you first set this up, you should see the Alfresco login screen.

If you see a grey Salesforce box in either of these sections instead of the Alfresco login screen, this is because you have a browser error, which is caused by a self signed certificate not being approved by the browser.

You should also check that your Salesforce and Alfresco instances are on a shared network or otherwise accessible to one another to share information.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**All Salesforce record folders created with a 15- or 18-character Salesforce Record ID**

There is a known problem if the Alfresco connected app definition in Salesforce has been configured with the wrong lifecycle class. If the lifecycle class is not set to AlfrescoCanvasLifeCycleHandler, all record folders in Salesforce are created with IDs that are 15 or 18 characters in length.

Edit the Alfresco connected app definition, as specified in [3. Configuring your app in Salesforce](../tasks/salesforce-ent-configure.md) and ensure that the lifecycle class is set to AlfrescoCanvasLifeCycleHandler.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Alfresco does not start in Salesforce**

If you are having problems starting Alfresco in Salesforce, it might be because you have not configured Chatter. Here is a sample error message if Chatter is not enabled:

```
GET request for "https://na30.salesforce.com/services/data/v23.0/chatter/users/me" resulted in 403 (Forbidden); invoking error handler 
```

Make sure that you have Chatter enabled. To do this, access the Chatter Settings page, enter Chatter in the Quick Find box in Salesforce and select Chatter Settings.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Problems loading Site to Object Mapping and Metadata Mapping in Alfresco Setup**

If you are having problems with Site to Object Mapping and Metadata Mapping, check your level of Java. If you are running with Java 7, you might see this message:

```
org.springframework.social.salesforce.api.SalesforceRequestException: TLS 1.0 has been disabled in this organization. 
Please use TLS 1.1 or higher when connecting to Salesforce using https.
```

Salesforce requires access to the API using TLS 1.1 or 1.2. You can enable TLS 1.1 and 1.2 in Java 7 using JVM parameters, but they are enabled by default with Java 8. See [Diagnosing TLS, SSL, and HTTPS](https://blogs.oracle.com/java-platform-group/entry/diagnosing_tls_ssl_and_https) and [JDK 8 will use TLS 1.2 as default](https://blogs.oracle.com/java-platform-group/entry/java_8_will_use_tls) for more information.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**"Unable to resolve the server's DNS address" message in Salesforce**

If you see the following message in Salesforce:

```
Unable to resolve the server's DNS address
```

then Alfresco is unavailable. Check whether Alfresco is behind a firewall, or whether your Virtual Private Network \(VPN\) connection has dropped, as both these situations can cause this error.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**"Error rendering Force.com Canvas application" message in Salesforce**

If you see the following message in Salesforce:

```
Oops, there was as error rendering Force.com Canvas application [Alfresco_Salesforce_Connector]
```

check whether a connected app definition exists for Alfresco, and that the API Name property in the Alfresco Setup page has been defined with the correct value. The values in the Alfresco connected app definition and API Name must match. See [3. Configuring your app in Salesforce](../tasks/salesforce-ent-configure.md#) for more guidance.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Alfresco connection error when accessing Salesforce content**

If you see the following message in Alfresco when you try to access Salesforce content:

```
Something's wrong with this page...
We may have hit an error or something might have been removed or deleted, so check that the URL is correct.
Alternatively you might not have permission to view the page (it could be on a private site) or there could
have been an internal error. Try checking with your Alfresco administrator.
```

check that the correct Share URL is specified in the Canvas App URL in Salesforce. See [3. Configuring your app in Salesforce](../tasks/salesforce-ent-configure.md#) for more guidance.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**HTTP Status 404 or Service Unavailable message**

If you see an HTTP Status 404 message, The server refused the connection, or a Service Unavailable message, check that the correct Share URL is specified in the Canvas App URL in Salesforce, and that Alfresco is running. See [3. Configuring your app in Salesforce](../tasks/salesforce-ent-configure.md#) for more guidance.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Edit Offline problems with Apple Safari**

If you are using Apple Safari, you might encounter problems when using the Edit Offline action. The following message is displayed:

```
We couldn't load the data. 
Try refreshing your screen, or check with your Alfresco Administrator that the server is running.
```

This is caused by an OS X browser problem. To resolve this problem, use a different browser with the Edit Offline action.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Unable to load the Alfresco Content Connector in Salesforce using Firefox**

Firefox has introduced a new feature called [Tracking Protection](https://support.mozilla.org/en-US/kb/tracking-protection-pbm?as=u&utm_source=inproduct), designed to identify and block website trackers. Tracking Protection is enabled by default for private Firefox browsing sessions.

To resolve this issue, disable the Tracking Protection in the Firefox browser settings. Alternatively, use a different browser, such as Chrome or Internet Explorer.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Comments made outside a site in Alfresco show @@NULL@@ in My Activities dashlet**

This is a known issue with Alfresco One 5.0.4 and Alfresco One 5.1.1. If comments are added to a document outside of a site \(including My Files, Shared Files, and Repository\) or through the Alfresco Content Connector in Salesforce, it results in an activity entry that a comment was added, updated, or deleted in a site with the name of @@NULL@@@.

[back to top](salesforce-troubleshoot.md#)

![](../images/hr.png)

**Using the Canvas App Component directly in the Lightning UI**

The Canvas app is not correctly configured if you attempt to:

-   Access the App in Salesforce and it opens it in a new Salesforce tab; or
-   Drag and drop a document into the App, which then automatically downloads the document or opens it directly in the browser.

To resolve this issue, remove the canvas app from the Classic UI page layout and follow the instructions to [set up the App for use in Lightning](../tasks/salesforce-ent-add-app.md).

[back to top](salesforce-troubleshoot.md#)

**Parent topic:**[Alfresco Content Connector for Salesforce](../concepts/salesforce-ent-overview.md)

