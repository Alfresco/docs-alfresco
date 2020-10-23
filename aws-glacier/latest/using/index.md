---
title: Glacier Connector FAQ
---

Here are the answers to some frequently asked questions.

## Why can't I create an **Archive** or **Restore** rule in a Records Management site?

The **Archive** or **Restore** rule isn't available on a folder when creating a rule on a Records Management site. To move declared records from S3 to Amazon S3 Glacier, they must first be declared as Easy Access records from a collaboration site. You can then configure the **Archive** or **Restore** rule on the folder in the collaboration site.

> **Note:** The **Archive** and **Restore** action is available using the v1 REST API and is displayed as an action in the rules engine for Alfresco Content Services.

## Why can't I view the content of the Record version of a file?

When a file is 'Declared version as record' the record created has the same internal content url as the file. If the original file has been archived, the declared as version node has not been marked as archived in Alfresco Content Services. For the Record version file you won't receive the message stating the content has been archived.

> **Note:** See additional information in the [S3 Connector FAQs](https://docs.alfresco.com/s3connector/references/s3-contentstore-faq.html)(#LINK).
