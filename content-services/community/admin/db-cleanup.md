---
title: Database table cleanup
---

When Auditing entries or AttributeService entries are being deleted, Alfresco does not actually delete all of the associated data. The structures of the `alf_prop_*` tables are designed to heavily reuse individual textual or numerical data elements, much to the point that cascade deletion upon removal of audit entries or attributes is no longer possible as the same values could be referenced in other elements.

Since Alfresco 4.1.9, 4.2.2 (Enterprise) and 5.0 (Community), Alfresco has included a default job to clean up dangling data in `alf_prop_*` tables. This CRON job is disabled by default and must be re-configured to be able to run.
