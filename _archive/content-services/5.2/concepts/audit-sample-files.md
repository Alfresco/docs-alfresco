---
author: Alfresco Documentation
---

# How to use the auditing sample files

Auditing sample files are distributed in the ./tomcat/shared/classes/alfresco/extension/audit directory. You can enable them in order to explore auditing.

There are two sample files in ./tomcat/shared/classes/alfresco/extension/audit:

-   alfresco-audit-example-extractors.xml.sample
-   alfresco-audit-example-login.xml.sample

In order to use a sample file, remove the .sample extension. It is also assumed you have [enabled auditing](audit-enable.md). You will also need to restart the server so the examples are loaded.

Once the sample files are enabled you can check that the new example audit applications are enabled via the ReST API, see this [page](dev-api-by-language-alf-rest-manage-audit-apps-list-apps.md) for more information.

You should see that the *AuditExampleExtractors* and *AuditExample Login* applications have been enabled.

**Parent topic:**[Auditing](../concepts/audit-intro.md)

