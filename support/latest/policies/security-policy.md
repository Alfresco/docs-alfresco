---
title: Security Policy
---

Describes how Alfresco will respond and fix security issues, depending on the issue severity. This policy applies to the Alfresco Enterprise built products, such as, Alfresco Content Services, Alfresco Process Services, and the Alfresco built Add-ons modules.

## Security incident response

When a security issue is discovered, Alfresco will:

* Direct the security incident to the appropriate Alfresco product subject matter expert and Alfresco Security Architect for evaluation of the incident's scope and severity.
* Make one or more product fixes available, if appropriate.
* Inform customers and partners

The version(s) where a particular security issue is resolved will depend on the severity of the issue, and may include:

* A Service Pack release for the last major version
* A Hot Fix to the last major versions
* Hot Fixes for older maintained versions

## Severity Levels

Alfresco classifies security issues according to a severity level of High, Medium, Low. If warranted, a security issue may be re-classified and the customer and/or partner will be notified as appropriate.

### Severity Level: High

A security issue is High if the vulnerability was discovered externally, is known about externally or is being actively exploited and one or more of the following is true:

* Customer data can be compromised
* The server running the application can be compromised
* A Denial of Service (DoS) can be caused, rendering the system unavailable .

### Severity Level: Medium

A security issue is Medium if either of the following are true:

* The issue would otherwise be High severity but the issue was discovered internally and/or is not believed to be known externally
* The issue is a less serious vulnerability such as a XSS or CSRF.

### Severity Level: Low

'Low' refers to trivial vulnerabilities which only pose a marginal or insignificant risk.

## Fix Versions

The severity of the issue and the Product Support Status determines which versions will be fixed.

For support status of your version please refer to the [Alfresco Product Support Status](https://www.alfresco.com/services/subscription/technical-support/product-support-status){:target="_blank"} page.

For definitions and glossary please refer to the [Product Support Lifecycle]({% link support/latest/policies/product-lifecycle.md) page.

Follows the fix version policy Alfresco Software will apply for security issues:

* **High** severity issues will be addressed for all versions of Alfresco in "Full Support" or "Limited Support" status.
* **Medium** severity issues will be addressed for Alfresco versions in "Full Support" status.
* **Low** severity issues will be addressed in the next service pack on each Alfresco version in "Full Support" status.

## Release of Security Notifications

Alfresco notifies customers and partners in the following manner:

* For **High** severity issues, Alfresco releases the version containing the fix and then sends a security alert email to all customers and partners. And then, publishes a security alert on the Alfresco Support Portal with details of the issue and of the fixed versions. Full details of the vulnerability and attack vector will be publicly released but only after customers and partners have been given reasonable time to install the fixed version.
* For **Medium** severity issues, Alfresco releases the version containing the fix and publishes a security alert on the Alfresco Support Portal with details of the issue and of the fixed versions.
* For **Low** severity issues, the fix is documented as part of the release notes for the service pack which includes the fix.

## Reporting a security issue to Alfresco

Please report all security issues by logging a support case via the [Support Portal](https://support.alfresco.com){:target="_blank"} or by sending an email to [security@alfresco.com](mailto:security@alfresco.com) to ensure that the information does not enter the public domain prematurely.
