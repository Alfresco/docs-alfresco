---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Troubleshooting, Schema Difference Tool]
keyword: Schema Difference Tool
---

# Performing schema validation

.

As for schema dumps, schema validation can happen either due to a schema change during repository startup, or triggered manually via JMX. Schema validation is performed in two steps:

1.  Differencing
2.  Validation

Each of these steps are described in the following sections.

-   **[Differencing](../concepts/schema-diff-tool-validation-differencing.md)**  
Differencing produces similar information to that obtained by using the Unix tool `diff` against a known 'good' reference schema dump and a potentially problematic target schema dump.
-   **[Validation](../concepts/schema-diff-tool-validation-validation.md)**  
The Schema Difference Tool can use schema reference XML files to perform validation in addition to that performed by simple differencing.

**Parent topic:**[Troubleshooting schema-related problems](../concepts/schema-diff-tool-intro.md)

