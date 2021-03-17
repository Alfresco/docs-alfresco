---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Records Management
---

# Search query examples

This section provides you with some example search queries that are common in the Records Management environment and shows how to specify the query syntax.

-   **Finding folders due for cutoff before 1st Jan 2010**

    `recordSearchDispositionActionName:cutoff and recordSearchDispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding records due for transfer before 1st Jan 2010**

    `recordSearchDispositionActionName:transfer and recordSearchDispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding categories or folders with a monthly cycling date**

    `recordSearchVitalRecordReviewPeriod:month`

-   **Finding records due for cutoff before 1st Jan 2010**

    `recordSearchDispositionActionName:cutoff and recordSearchDispositionActionAsOf:[MIN TO "2010-01-01"]`


**Parent topic:**[Searching for records](../tasks/rm-gs-search.md)

