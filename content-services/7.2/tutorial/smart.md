---
title: Configure Smart Folders tutorial
---

In this seven-step tutorial you'll create a simple claims management solution.

You can use Smart Folders for any purpose where you want to bring together files from across an organization, and apply metadata across a set of files. A good case study is an insurance claim, where you might want to bring together information for one customer, that relates to a claim and a specific policy.

> **Note:** You will need system administrator rights to perform the activities in this tutorial.

In the tutorial, you will:

1. Import a custom content model and create a Claims Application folder where your Smart Folder structure will live
2. Enable Smart Folders and the Type-based Smart Folder, and import the `clex_claimFolder.json` Smart Folders Template
3. Create a rule to automatically apply the aspects for your Smart Folder structure
4. Create a new claim
5. Add some supporting files to your claim
6. Apply a System Smart Folder to your Claims Application folder, to see how you can use different Smart Folder Templates together
7. Link your claim to related policy files

See [Plan and implement Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}#plan) and [Type-based, System, and Custom Smart Folders]({% link content-services/7.2/config/smart-folders/index.md %}#sf-type) for more information about the Smart Folders workflow and types.

The diagram shows the final folder structure that you will create during this tutorial: ![Smart Folder structure that you've created, including claims and policy folders]({% link content-services/images/sf-tutorial.png %})

For background information on Smart Folder Templates, see [What's a Smart Folder?]({% link content-services/7.2/config/smart-folders/index.md %}#sf-whatis)

### Step 1: Set up claims management {#sf-tutorial-1}

To set up the claims framework, you need to create a custom content model, then create a folder structure for your content.

You need a custom content model to specify the metadata that the claims solution requires. You need to be in the ALFRESCO\_MODEL\_ADMINISTRATORS group to create a content model. For detailed information about Model Manager, see [Content modeling with Model Manager]({% link content-services/7.2/config/models.md %}).

1. Download the [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} from the `smartfolders-master/tutorial` directory.

    You can download a zip of the Smart Folders master directory [here](https://github.com/vhemmert/smartfolders/archive/master.zip){:target="_blank"}.

2. In Alfresco Share, select **Admin Tools** and **Model Manager** to display the Model Manager page.

3. Click **Import Model** and browse to `smartfolders-master/tutorials` in your `Downloads` directory to `import claims_example.zip`, and click **Import**.

    You'll see the `claims_example` model and namespace, with a status of Inactive.

4. Select **Actions** and **Activate** to set the status to Active.

    Click `claims_example` to see the Custom Types and Aspects that are defined for the model.

5. Click **Sites** and **Create Site**. Create a new site called **Smart Folders**, and click **Save**.

6. Select **Document Library** and create a new folder for the tutorial called **Smart Folders Tutorial**.

7. In the Smart Folders Tutorial folder, create a folder called **Claims Application**, and sub folders called **Claims and Policies**. You should see this structure:

    * Smart Folders Tutorial/Claims Application
    * Smart Folders Tutorial/Claims Application/Claims
    * Smart Folders Tutorial/Claims Application/Policies

You're now ready to configure your claim.

### Step 2: Configure claims management {#sf-tutorial-2}

To configure the claims framework, add the sample template to the Data Dictionary and enable the claims aspect.

The example data model that you imported in the previous task contains the `clex:claimFolder` aspect. This aspect defines the metadata for a claim, and also marks a folder as being used to contain claim information. Make sure that you've downloaded the [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} before proceeding with this task.

1. Stop Alfresco Content Services, and edit your `alfresco-global.properties` file to specify the following settings:

    ```bash
    smart.folders.enabled=true
    smart.folders.config.type.templates.qname.filter=clex:claimFolder
    ```

    The `smart.folders.config.type.templates.qname.filter` property specifies the custom type or aspect of the contents of the Smart Folder Template.

2. Restart Content Services.

3. Browse to smartfolders-master/tutorials in your Downloads directory, and locate the `clex_claimFolder.json` file.

    This is the Smart Folder Template.

    This file matches the `clex:claimFolder` aspect, so that any folder type with the `clex:claimFolder` aspect applied to it should use the `clex_claimFolder.json` Smart Folder Template for its folder structure.

    Adding this aspect and Smart Folder Template means that you're using Type-based Smart Folders.

4. In Alfresco Share, click Repository then Data Dictionary, and copy `clex_claimFolder.json` into the Smart Folder Templates folder.

    You'll see the default `smartFoldersExample.json` Smart Folder Template is already in this folder.

    > **Note:** You need system administrator rights to upload this file.

You're now ready to create a new claim.

### Step 3: (Optional) Create a rule to define your Smart Folder structure {#sf-tutorial-3}

You can create a simple folder rule to add an aspect automatically to your folder structure.

To simplify the creation of a claim folder, you can create a folder rule to add the clex:claimFolder aspect automatically to any new claim folder.

1. Upload the `addAspect_claimsFolder.js` file from `smartfolders-master/tutorials` in your Downloads directory to the **Repository > Data Dictionary > Scripts** directory in Alfresco Content Services.

    This file provides additional function that is not available in the standard aspect and property settings.

2. Click the site Document Library and drill down to the **Smart Folders Tutorial > Claims Application** folder.

    It's important that you create the rule for the **Claims** folder so that all sub folders will have the aspect that marks them as a claim.

3. Click the **Claims** folder and from the menu, click **More** then **Manage Rules**, and **Create Rules**.

4. Give the rule a name (`Add Claims Folder aspect`) and a description (`Adds clex:claimFolder aspect and converts folder to a claim structure`). Use the following options for the remaining fields:

    * Select **Define Rule When:** and **Items are created or enter this folder**
    * Check **If all criteria are met:** and select **Content of type or sub-type is folder**
    * Select **Perform Action:** and **Execute script**, and select the `addAspect_claimsFolder.js` file
    
    > **Note:** Make sure that these options are not selected:
    >
    > * Rule applies to subfolders
    > * Run rule in background

5. When you're done, click **Create**.

### Step 4: Create a new claim {#sf-tutorial-4}

You can create a new claim structure using the Smart Folder Template, and edit a new claim.

1. Click the site Document Library and drill down to the **Smart Folders Tutorial > Claims Application > Claims** folder.

2. Create a new folder called `Insurance Claim`.

3. If you didn't set up a [rule](#sf-tutorial-3) to add the aspect:

    1. Hover over the **Insurance Claim** folder and select **More** then **Manage Aspects**.

    2. In the **Select Aspects** window, add the Claim Folder (`clex:claimFolder`) aspect, and click **Save** .

4. Hover over the **Insurance Claim** folder, select **Edit Properties** and **All Properties**.

    You'll see a new section called **Claim Details** that's been populated from the Claim Folder aspect.

    Claim Number, Policy Number, Claim Type, Claim Status, Handling Administrator, and Claim Date fields are visible. Specify a unique claim number (and other data) in these fields, which are propagated to any file in this folder. A list of numbers is provided for testing.

5. Select the default numbers, a claim type of Accident Insurance and note the claim number. Click **Save** .

6. Return to Document Library. You'll see the new Smart Folders are shown as sub folders of the `Insurance Claim` folder.

    Smart Folders are identified by this icon: ![Folder with a magnifying glass representing a Smart Folder]({% link content-services/images/sf.png %})

You can now add some files to your claim.

### Step 5: Add new claim files {#sf-tutorial-5}

Add some files for the new claim.

You can add any files you like to the site Document Library for your claim. For convenience, an image (in JPG format) and a claim form (in PDF format) are provided in: [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"}.

1. Click the site Document Library and drill down to the **Smart Folders Tutorial > Claims Application > Claims > Insurance Claim** folder.

2. Drag and drop any image (or the image from [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} into the **Assessments** folder.

    Look in the **Assessments/Images** folder. The image you added is shown there. The image property defines that it must be filed in the **Images** folder.

3. Hover over the image and click **Edit Properties** then **All Properties** to view the Claim Details.

    The image has inherited the Claim Number that you set up when you create the folder, and it has inherited the Assessment file type, because this is the folder where the file was dragged to. The file status is set to `Draft` by default.

    1. Change the Document Type to Correspondence. The image is viewable in the **Correspondence Smart Folder**.

    2. Change the Document Status to `In Review`. The image is viewable in the **Review processes/2_In Review** Smart Folder.

        You can look at the `clex_claimFolder.json` file contents to understand the search criteria being applied to each folder. See [Smart Folder Template syntax](#sf-syntax) for more guidance on understanding and creating your own templates.

4. Add a claim form (you can use the form from [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} to the Forms Smart Folder.

5. Hover over the claim form and click **Edit Properties** then **All Properties** to view the Claim Details.

    The form has inherited the Claim Number that you set up when you create the folder, and it has inherited the Claim Form file type, because this is the folder where the file was dragged to. The file status is set to none by default.

You've set up a claim structure, and learned how to configure it with a template, create a new claim folder, and populate it with content.

### Step 6: Apply multiple templates {#sf-tutorial-6}

You can use multiple Smart Folder Templates at the same time, to help you find your content more easily.

You can add System or Custom Smart Folders to your structure to use alongside the Type-based Smart Folders that you've already applied.

1. In Alfresco Share, click Repository and Data Dictionary, and copy `claimsApplication.json` from [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} into the Data Dictionary/Smart Folder Templates folder.

    You'll see the `smartFoldersExample.json` sample file (and any other templates you've added) already in this folder.

2. Select the `claimsApplication.json` file. In Document Actions select **Change Type** and select `Smart Folder Template` as the new type, and OK.

3. Click the site Document Library and drill down to the Smart Folders Tutorial folder.

4. Hover over the `Claims Application` folder and from the menu select **More** then **Manage Aspects**. Add the System Smart Folder (`smf:systemConfigSmartFolder`) aspect, and click **Save** .

    Adding this aspect allows you to select a Smart Folder Template that is in the Data Dictionary/Smart Folder Templates directory.

    Alternatively, select the Custom Smart Folder (`smf:custom-ConfigSmartFolder`) and select a template from anywhere in your repository.

    > **Note:** You can add a single template only to a folder. If you select both the System Smart Folder (`smf:systemConfigSmartFolder`) and Custom Smart Folder (`smf:customConfigSmartFolder`) aspects, the system aspect overrides the custom aspect.

5. Hover over the Claims Application folder and from the menu select **Edit Properties** and **All Properties**.

6. In the Smart Folder Template field, select the `claimsApplication.json` Smart Folder Template.

    If you need to navigate to the template, it lives in **Repository > Data Dictionary > Smart Folder Templates**.

7. In the site Document Library, click the **Claims Application** folder.

    You'll see the new folder hierarchy displayed, showing **Claims by type**, **My open claims**, and **Policy documents**. These Smart Folders are displayed in addition to the Smart Folders we set up under the **Claims Application** folder.

### Step 7: Add policy files and review the final claim structure {#sf-tutorial-7}

You can add files relating to the policy and review the Smart Folder structure that you've created for managing claims.

We've already created a new claim in previous steps, and built up the Smart Folder structure as part of the tutorial. In a real life scenario, the policy files would be created first, and the claim files linked to them afterwards. You can add any files you like to the Document Library for your policy. For convenience, a Terms and Conditions file and a policy file (in PDF format) are provided in the zip package: [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"}.

1. Click the site Document Library and drill down to the **Smart Folders Tutorial > Claims Application > Policies** folder.

    You created a new Accident Insurance claim in the previous steps, and now you're going to add some policy files to the Accident Insurance type.

2. Drill down to the **Policy Documents > Accident Insurance** folder.

    1. Drag and drop a Terms and Conditions file into the Terms & Conditions Smart Folder.

        See [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} for an example file.

    2. Drag and drop a Policy file into the Insurance Contracts Smart Folder.

        See [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial){:target="_blank"} for an example file.

    3. Edit the properties of the Policy file.

        Hover over the policy file, and from the menu click **Edit Properties** and **All Properties**. You'll see a **Policy Details** section, where you can set the Document Type, Policy Number and Insurance Class. If you specify a certain policy number, this must be specified in any subsequent claims that you create in the Claims folder.

3. Try creating a new folder in **Claims**, with a unique claim number, unique policy number (relating to your new policy file) and insurance class (Accident Insurance, in this case).

    The diagram shows the final folder structure that you've set up for your claims management:

    ![Smart Folder structure including claims and policy folders]({% link content-services/images/sf-tutorial.png %})
