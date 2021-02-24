---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Search query examples

This section provides search examples of how to specify the search syntax.

-   **Finding folders/records due for cutoff before 1st Jan 2010**

    `dispositionActionName:cutoff and dispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding records due for transfer before 1st Jan 2010**

    `dispositionActionName:transfer and dispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding categories or folders with a monthly cycling date**

    `vitalRecordReviewPeriod::month`

    **Note:** Ensure that you have selected the component in the**Results options** section.


**Parent topic:**[Creating a search](../tasks/rm-search-create.md)

