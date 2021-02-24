---
author: Alfresco Documentation
---

# Audit application

Audit Applications provide a way to create different ways of processing the same audit data. They define data producers, generators and extractors, as well as path mappings.

Data producers have no knowledge of how or whether data will be stored. Different use cases will need to store or modify inbound data independently, therefore the use cases are separated into **Audit Applications**. Each application defines how data is mapped, extracted, and recorded without affecting data required by other applications.

For example, the Records Management module records before-and-after values when specific nodes are modified, whereas the CMIS standard requires a slightly different set of data to be recorded. Additionally, each of the audit logs can be enabled and disabled independently within the same server. Usually, each Audit Application is defined in its own configuration file, but for demonstration purposes, multiple Application definitions can sometimes be defined in one configuration file.

**Parent topic:**[Audit configuration](../concepts/audit-custom-audit-config.md)

