---
title: Hot Fix and Regression Escalation Policy
---

Some issues are so urgent that it is not possible to wait for the issue to be resolved in a future service pack. For these situations there may be an option of a Hot Fix (HF).

Be aware that some subscription levels have a higher entitlement to make Hot Fix requests than others. For example:

* Premier - Premier customers have automatic entitlement to make HF requests.
* Enterprise - Enterprise customer issues may also be considered for a HF, if the business case indicates that the issue has significant financial or operational impact.
* Starter/Business - Starter/Business customers are not entitled to make HF requests. Alfresco reserves the right to override that policy for issues from Starter/Business customers on a case-by-case basis.

For all requests, it is imperative that a business case is described to the support engineer handling the request, whereby the criticality is clear. You must explore and exhaust all possible workarounds, code changes, and back ports with the support engineer assigned to your case before requesting the HF.

In exceptional circumstances, if there is a high degree of confidence that the identified fix does not have unwanted side effects, and that it is feasible for Engineering to complete, a request can be made to Engineering for a Hot Fix.

A Hot Fix is a full production build of the Alfresco product version that you are running, along with the requested fix. Hot fixes cannot be provided as JAR files: they are cumulative fixes of the Service Pack and any previous Hot Fixes. For example, Hot Fix 5.1.2.2 is the second Hot Fix of Service Pack 5.1.2.

Hot Fixes are provided on the understanding that as soon as a Service Pack with the fix is available, the system will be upgraded.

The reason that a HF is the exception, rather than the rule, is that Quality Assurance is restricted to the specific fix, and as such, they are far riskier than Service Packs.
