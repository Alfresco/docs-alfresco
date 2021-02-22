---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# 5. Adding new claim files

Add some files for the new claim.

You can add any files you like to the site Document Library for your claim. For convenience, an image \(in JPG format\) and a claim form \(in PDF format\) are provided in: [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial).

1.  Click the site Document Library and drill down to the Smart Folders Tutorial/Claims Application/Claims/Insurance Claim folder.

2.  Drag and drop any image \(or the image from [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial)\) into the Assessments folder.

    Look in the Assessments/Images folder. The image you added is shown there. The image property defines that it must be filed in the Images folder.

3.  Hover over the image and click Edit Properties then All Properties to view the Claim Details.

    The image has inherited the Claim Number that you set up when you create the folder, and it has inherited the Assessment file type, because this is the folder where the file was dragged to. The file status is set to Draft by default.

    1.  Change the Document Type to Correspondence. The image is viewable in the Correspondence Smart Folder.

    2.  Change the Document Status to In Review. The image is viewable in the Review processes/2\_In Review Smart Folder.

        You can look at the `clex_claimFolder.json` file contents to understand the search criteria being applied to each folder. See [Smart Folder Template syntax](../concepts/sf-ref-template-guidance.md) for more guidance on understanding and creating your own templates.

4.  Add a claim form \(you can use the form from [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial)\) to the Forms Smart Folder.

5.  Hover over the claim form and click Edit Properties then All Properties to view the Claim Details.

    The form has inherited the Claim Number that you set up when you create the folder, and it has inherited the Claim Form file type, because this is the folder where the file was dragged to. The file status is set to none by default.


You have set up a claim structure, and learned how to configure it with a template, create a new claim folder, and populate it with content.

**Parent topic:**[Smart Folders tutorial](../tasks/sf-tutorial.md)

