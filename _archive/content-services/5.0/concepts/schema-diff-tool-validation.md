---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Troubleshooting, Schema Difference Tool]
keyword: Schema Difference Tool
---

# Performing schema validation

Schema validation of schema dumps can happen either due to a schema change during repository startup, or can be triggered manually by using JMX.

Schema validation is performed with differencing and validation.

-   **[Differencing](../concepts/schema-diff-tool-validation-differencing.md)**  
Differencing produces similar information to that obtained by using the Unix tool `diff` against a known 'good' reference schema dump and a potentially problematic target schema dump.
-   **[Validation](../concepts/schema-diff-tool-validation-validation.md)**  
The Schema Difference tool can use schema reference XML files to perform validation in addition to that performed by simple differencing.

**Parent topic:**[Troubleshooting schema-related problems](../concepts/schema-diff-tool-intro.md)

