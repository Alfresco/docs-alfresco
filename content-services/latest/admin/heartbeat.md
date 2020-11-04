---
title: Heartbeat feature
---

Content Services can send a 'heartbeat' to Alfresco. The heartbeat contains anonymous information that can help 
Alfresco to understand product usage and to better meet the needs of your organization. Our aim is to use the anonymous 
information to help us make decisions about product development so that our investment benefits as many users as possible.

## Disable the Heartbeat

The Heartbeat feature is set with the following property:

```text
heartbeat.enabled=true
```

The property setting is `true` by default.

If you are using Content Services it is not possible to change the value of the `heartbeat.enabled` property because 
the default license supersedes the property. If you are unable to share this anonymous data with us you can request a 
license from Alfresco Support with Heartbeat already disabled. Contact [Alfresco Support](mailto:support@alfresco.com) 
for more information.

**What is sent?**

The anonymous data transmitted by the repository includes the Content Services version number, number of items in the 
repository, the size of a cluster, and the number of active users. Information about feature usage including content 
models, workflows, Smart Folders, and APIs are also sent. Other products will also share anonymous data necessary for 
Alfresco to understand their usage.

To see the data being sent to Alfresco, see the following logs:

```text
log4j.logger.org.alfresco.heartbeat.datasender.internal.HBDataConsumer=DEBUG
```
