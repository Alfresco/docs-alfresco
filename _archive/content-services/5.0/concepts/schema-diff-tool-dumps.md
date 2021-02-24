---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Troubleshooting, Schema Difference Tool]
keyword: Schema Difference Tool
---

# Performing schema dumps

Schema dumps are XML representations of the database schema.

Schema dumps can take place in two situations:

1.  The dump is triggered automatically on startup due to a difference being found between the reference and actual database schema.
2.  The dump is manually triggered by using a JMX client.

Each of these scenarios is described in the following sections.

-   **[Automatic dumps](../concepts/schema-diff-tool-dumps-auto.md)**  
Schema dumps are performed automatically on Alfresco server startup, if changes in database schema are detected.
-   **[Triggering dumps by using JMX](../concepts/schema-diff-tool-dumps-jmx.md)**  
Schema dumps can also be triggered manually by using a JMX client.

**Parent topic:**[Troubleshooting schema-related problems](../concepts/schema-diff-tool-intro.md)

