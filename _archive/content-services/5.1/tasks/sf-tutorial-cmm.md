---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# 1. Setting up claims management

To set up the claims framework, you need to create a custom content model, then create a folder structure for your content.

You need a custom content model to specify the metadata that the claims solution requires. You need to be in the ALFRESCO\_MODEL\_ADMINISTRATORS group to create a content model. For detailed information about Alfresco Model Manager, see [Content modeling with Model Manager](../concepts/admintools-cmm-intro.md).

1.  Download the [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial) from the smartfolders-master/tutorial directory.

    You can download a zip of the Smart Folders master directory [here](https://github.com/vhemmert/smartfolders/archive/master.zip).

2.  In Alfresco, select Admin Tools and Model Manager.

    The Model Manager page is displayed.

3.  Click **Import Model** and browse to smartfolders-master/tutorials in your Downloads directory to import claims\_example.zip, and click **Import**.

    You'll see the `claims_example` model and namespace, with a status of Inactive.

4.  Select Actions and Activate to set the status to Active.

    Click `claims_example` to see the Custom Types and Aspects that are defined for the model.

5.  Click Sites and Create Site. Create a new site called Smart Folders, and Save.

6.  Select Document Library and create a new folder for the tutorial called Smart Folders Tutorial.

7.  In the Smart Folders Tutorial folder, create a folder called Claims Application, and sub folders called Claims and Policies. You should see this structure:

    -   Smart Folders Tutorial/Claims Application
    -   Smart Folders Tutorial/Claims Application/Claims
    -   Smart Folders Tutorial/Claims Application/Policies

You are now ready to configure your claim.

**Parent topic:**[Smart Folders tutorial](../tasks/sf-tutorial.md)

