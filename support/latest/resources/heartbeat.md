---
title: Heartbeat Message
---

Alfresco includes a heartbeat message within Alfresco Content Services.

The heartbeat gathers the following information and sends the encrypted data back to the Alfresco heartbeat receiver over [https://hbrx.alfresco.com](https://hbrx.alfresco.com){:target="_blank"}:

* Version and schema version
* Unique repository id
* Internal server IP (if the same repository-id appears for several server IPs, it is a cluster)
* Number of people (total, not active)
* Maximum node-id (relates to number of objects in repository)
* IP & host address of the sender from the http header
* License

Collecting this data enables us to see how customers use Alfresco Content Services and to tune our product road map accordingly. In order to turn off the Heartbeat message within Alfresco Content Services, please refer to the product documentation, Knowledge Base or submit a support case.
