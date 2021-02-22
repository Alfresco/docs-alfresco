---
author: Alfresco Documentation
---

# How to check audit status

It is useful to check the current audit status of an Alfresco Content Services installation. You can do this via the AuditService Java API, but this can also be done via the ReST API, which can be accessed via a command line client such as **Curl**.

You can check the status of auditing conveniently from the command line by using a tool such as `curl` to access the Audit Applications ReST endpoint.

For more information about `curl` and where to find it see this [page](dev-api-by-language-alf-rest-install-http-call-tool.md).

To check the global status of auditing, such as what audit applications that are enabled, see this [page](dev-api-by-language-alf-rest-manage-audit-apps-list-apps.md).

While this does return the global status of the auditing framework, audit data will only be generated if the `audit.alfresco-access.enabled` property is `true`.

Auditing can also be globally enabled or disabled for Audit applications, see this [page](dev-api-by-language-alf-rest-manage-audit-apps-enable-disable-app.md) for more info.

## Using JMX to control auditing

A JMX client can be used to access global properties. The properties can be modified using the JMX client. A server restart will be required for changes to properties to take effect.

**Parent topic:**[Auditing](../concepts/audit-intro.md)

