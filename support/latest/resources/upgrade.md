---
title: Upgrade Advice
---

Alfresco customers and partners who have an active contract are eligible for all Version, Release and Service Pack upgrades. Periodic communications are used to notify all customers and partners, along with updates to Hyland Community product pages.

Technical Support is often asked for advice on what is likely to change between Alfresco Content Services (ECM) versions and also what preparation must be completed before upgrading your Alfresco Content Services (ECM) solution. Based on the type of upgrade you are doing, here are the recommendations that we make before applying changes in production.

|Upgrade Type|Code Changes|*Backup|*Testing Cycle|*Reindex|*Database Changes|
|------------|------------|------|---------|-------|------------|
|Version Upgrade|Major changes, enhancements, and fixes|Full|Full|Possible|Probable|
|Release Upgrade|Minor changes, enhancements, and fixes|Full|Full|Unusual|Probable|
|Service Pack|Fixes|Full|Custom code or extensions only|Unusual|Unusual|
|Hot Fix|Single Fixes|Full|Full (Alfresco QA test single fix only)|Unusual|Unusual|

> **Note:** For Alfresco Content Services, if you are upgrading more than two releases (3.1 to 3.4, or 3.4 to 4.2 for example), please contact Hyland. For Alfresco Content Services, the advice on service pack upgrades only applies if you are upgrading from the base release (4.1 to 4.1.2 for example). If you are upgrading from a previous release as well (4.0 to 4.1.2 for example), follow the advice for the Release upgrade.

This assumes you have:

* Reviewed the release notes and supported platform documentation
* Ensured that your full backup works
* Tested the upgrade on a test system against a restored backup of your production system
* Checked the extensions included with the release and re-applied your changes if the sample file was modified
* Allowed sufficient time to complete the upgrade
