---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Creating custom metadata

You can create custom metadata for record categories, record folders, records, and non-electronic documents. Once you create custom metadata, you can't delete it.

1.  Click **Custom Metadata** in the Records Management Console.

2.  Select an option in the Object column: **Non-Electronic Document**, **Record**, **Record Category**, or **Record Folder**.

    The right column lists any custom metadata that's already been defined for the selected object.

3.  Click **New**.

    The **New Metadata** page displays.

4.  Type a name for the metadata in the **Label** field.

    This name is used as the label on the Edit Metadata page.

5.  Select a data **Type**.

    The type can be of the following values:

    |**Type**|**Description**|
    |--------|---------------|
    |**Text**|Adds a text field to the Edit Metadata page. When you select this option, you can select the **Use selection list** check box, so instead of a text field there will be a selection menu of the list created with the [List of Values tool](../concepts/rm-lov-intro.md).|
    |**Boolean**|Adds a checkbox to the Edit Metadata page.|
    |**Date**|Adds a date field to the Edit Metadata page.|

    **Note:** The **Use selection list** option is only available if a list has been created with the [List of Values tool](../concepts/rm-lov-intro.md).

6.  To configure this metadata field as a selection menu:

    1.  Select the **Use selection list** check box.

    2.  Select a list name from the menu.

7.  Select the **Mandatory Field** check box to set this metadata to be mandatory on the Edit Metadata page.

    **Note:** Mandatory metadata must be completed before a record can be set to completed.

8.  Click **Create**.


The new metadata displays in the right column of the Custom Metadata page.

**Parent topic:**[Custom metadata](../concepts/rm-custmeta-intro.md)

