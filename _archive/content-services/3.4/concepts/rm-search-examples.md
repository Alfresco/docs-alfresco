---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: User Help
option: Records Management
---

# Search query examples

This section provides search examples and how to specify the query syntax.

-   **Finding folders due for cutoff before 1st Jan 2010**

    `dispositionActionName:cutoff and dispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding records due for transfer before 1st Jan 2010**

    `dispositionActionName:transfer and dispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding categories or folders with a monthly cycling date**

    `vitalRecordReviewPeriod::month`

-   **Finding records due for cutoff before 1st Jan 2010**

    `dispositionActionName:cutoff and dispositionActionAsOf:[MIN TO "2010-01-01"]`

    **Note:** Ensure that you have selected the component in the**Results options** area.


**Parent topic:**[Searching records](../concepts/rm-search.md)

