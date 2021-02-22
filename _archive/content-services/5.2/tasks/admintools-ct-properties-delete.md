---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Deleting a property for custom types or aspects

The delete action on a property depends on the status of the model, whether or not the property has been applied to a file, and whether the property has been used.

**Prerequisites for deleting a property for custom types and aspects:**

|**For aspects**|-   If the model is inactive, you can simply delete the property by clicking **Delete** from the **Actions** drop-down list for the relevant property.
-   If the model is active and the aspect has been applied to a file in Share, but the property has not been used, you can delete the property by clicking **Delete** from the **Actions** drop-down list for the relevant property. The aspect will still be applied to the file but the deleted property will no longer be visible on the **Edit Properties** page in Alfresco Share.
-   If the property has been used, including in the version history or content in the archive store, then it cannot be removed. An admin should create a new aspect with the desired properties, then create a script to: add it to the content which has the old aspect, migrate data between the old and new aspect, and remove the old aspect.

 **Note:** When deleting a property, remember to update the Layout Designer and delete any search filter that you may have created for that property.

|
|**For custom types**|-   If the model is inactive, you can simply delete the property by clicking **Delete** from the **Actions** drop-down list for the relevant property.
-   If the model is active, you can delete the property if it was created after the type was applied to a file. Once the property is applied to a file, it cannot be deleted using the Model Manager. In this case, you need to delete the file from Share and then permanently delete the file from the Share trashcan.
-   If a model's custom type is applied to a file, then the associated properties:
    -   can be deleted, if the user does not edit or save the properties via the **Edit Properties** option in Share.
    -   cannot be deleted, if the property is created with the default value and then the type is applied to a file on Share.
    -   can be deleted, if the property is created for a type which is already applied to the file.

|

1.  Click **Admin Tools**, and then click **Model Manager**.

    The **Model Manager** page is displayed.

2.  Click the relevant model from the **Custom Models** list.

    The selected model page appears. This page shows the existing custom types and aspects associated with the selected model.

3.  To delete a property, perform the following action:

    -   Under the **Custom Types** list, click the type whose property you want to delete.

        The property page relevant to the selected type is displayed. This is of the format `model name:custom type name`.

    -   Under the **Aspects** list, click the aspect whose property you want to delete.

        The property page relevant to the selected aspect is displayed. This is of the format `model name:aspect name`.

4.  For the property you want to delete, click **Delete** from the **Actions** drop-down list.

    The **Delete Property** window appears.

5.  Click **Delete**.


**Parent topic:**[Managing custom types, aspects, and properties](../concepts/admintools-using-cmm.md)

