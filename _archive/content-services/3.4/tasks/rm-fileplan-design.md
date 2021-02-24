---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Records Management
---

# Designing the File Plan

The structure of the File Plan hierarchy reflects business functions and comprises the following predefined levels:

-   **Record series**

    A record series is container that holds record categories.

-   **Record category**

    The record category contains the retention and disposition instructions for its folders and records.

-   **Record folder**

    A record folder is created within a record category and it inherits the attributes of the record category.

    The record folder is also considered to be under the control of the record category. Once the record folder is created, and a disposition schedule is defined, restrictions apply. A record folder can be open or closed. A closed record folder cannot accept records for filing.

-   **Record**

    A record is a document under the control of records management, which is filed in a record folder.

-   **Vital record**

    A vital record is considered to be essential to the operation of an organization. A vital record must be reviewed on a periodic basis, which is defined in the review schedule. The review schedule is defined on the record category or folder.

    Just as record folders appear to exist even though they are really no more than aggregations of records, so higher levels of the File Plan hierarchy seem to exist, though they are no more than aggregations of record folders and/or higher levels.


Each user is given a role that may or may not grant them permission to create the elements of the File Plan structure. You can file records and create the structure within the File Plan level in which you have permission.

To manage the File Plan, you need to:

1.  Design the File Plan structure using the record series, record category, and record folder hierarchy.

2.  Upload electronic files and specify the location of non-electronic physical files.

3.  Declare files as records.


-   **[Creating the File Plan](../tasks/rm-fileplan-create.md)**  
The next step in the scenario is to create the File Plan structure.
-   **[Browsing the File Plan](../tasks/rm-gs-fileplan-browse.md)**  
There are several ways that you can navigate the File Plan and browse the items within each level.

**Parent topic:**[Getting Started with Records Management](../concepts/rm-gs-intro.md)

