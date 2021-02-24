---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Search query examples

Use these examples to see how the Insert Field and Insert Date options work.

-   **Finding folders/records due for cut off before 1st Jan 2010**

    `dispositionActionName:cutoff and dispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding records due for transfer before 1st Jan 2010**

    `dispositionActionName:transfer and dispositionActionAsOf:[MIN TO "2010-01-01"]`

-   **Finding categories or folders with a monthly cycling date**

    `vitalRecordReviewPeriod::month`

    **Note:** Ensure that you've selected the component in the**Results options** section.


**Parent topic:**[Creating a search](../tasks/rm-search-create.md)

