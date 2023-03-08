---
title: Salesforce Community
---

Support for Salesforce Community allows external Salesforce Community Members to store and access documents in Alfresco. To provide access and share documents with external Salesforce Community Members, internal Salesforce users need to perform a series of actions.
Before you begin, ensure your internal Salesforce users have been added to the `GROUP_SALESFORCE_MODERATORS` group in Alfresco Content Services, for more see [Configure Salesforce Community]({% link salesforce/latest/config/index.md %}#configure-a-salesforce-community).
This documentation describes a Salesforce Case object, however any standard or custom object can be shared externally with Community Members.

> **Note:** Support for Salesforce Community is only available when using Alfresco Cloud (PaaS).

## Lightning Experience

1. See [Create an Experience Cloud Site pg. 51](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

2. See [Add Members to Your Experience Cloud Site pg. 54](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

3. [Share content externally to Community Members Lightning Experience](#share-content-externally-to-community-members-lightning-experience)

## Share content externally to Community Members Lightning Experience

1. Log in to Salesforce.

2. Log in as an administrator to Alfresco Share in the Canvas app.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})

3. Click the down arrow next to **Cases** and then **New Case**.

      ![lightning-create-case]({% link salesforce/images/lightning-create-case.png %})

4. Select the required **Case Origin** and any other information needed for the case. Click **Save**.

      ![lightning-new-case]({% link salesforce/images/lightning-new-case.png %})

5. Click the drop down arrow next to **Change Owner** and select **Sharing**.

      ![create-new-lightning-page]({% link salesforce/images/lightning-sharing.png %})

6. Click the drop down arrow in the search bar and select **Public Group**.

      ![lightning-public-group]({% link salesforce/images/lightning-public-group.png %})

7. Type *all* into the search field and select **All Customer Portal Users**.

      ![lightning-portal-users]({% link salesforce/images/lightning-portal-users.png %})

8. Click the **Case Access** field and select the type of access required for this case. Click **Save**.

      ![lightning-share-access]({% link salesforce/images/lightning-share-access.png %})

9. Click the **Create** drop down list and select **Folder**.

      ![lightning-create-folder]({% link salesforce/images/lightning-create-folder.png %})

10. Enter the details you require for your new folder and then click **Create**.

      ![lightning-details-folder]({% link salesforce/images/lightning-details-folder.png %})

11. Click the **Actions** drop down list and select **Share Externally**.

    ![lightning-share-externally]({% link salesforce/images/lightning-share-externally.png %})

12. Select the **Salesforce Community Name** you would like to share with and the **Users**. Click **Save**.

      ![lightning-externally-select]({% link salesforce/images/lightning-externally-select.png %})

You will see a **Salesforce Community Member Access** message. The result of the performed actions is that when the Community Member logs into Salesforce they will see the case in their **All Open Cases** list.

## Salesforce Classic

1. See [Create an Experience Cloud Site pg. 51](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

2. See [Add Members to Your Experience Cloud Site pg. 54](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

3. [Share content externally to Community Members Salesforce Classic](#share-content-externally-to-community-members-salesforce-classic)

## Share content externally to Community Members Salesforce Classic

1. Log in to Salesforce.

2. Click **Alfresco Repository** and Log in as an administrator to Alfresco Share in the Canvas app.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})

3. Click **Cases** and click the **Create New** drop down list and then select **Case**.

      ![classic-create-case]({% link salesforce/images/classic-create-case.png %})

4. Select the required **Case Origin** and any other information needed for the case. Click **Save**.

      ![classic-new-case]({% link salesforce/images/classic-new-case.png %})

5. Click the **Sharing** button above the case.

      ![classic-sharing]({% link salesforce/images/classic-sharing.png %})

6. Click the **Add** button.

      ![classic-sharing-add]({% link salesforce/images/classic-sharing-add.png %})

7. Search **Public Groups** and add **All Customer Portal Users** to the **Share With** column. Click **Save**.

      ![classic-sharing-groups]({% link salesforce/images/classic-sharing-groups.png %})

8. Click the **Create** drop down list and select **Folder**.

      ![classic-create-folder]({% link salesforce/images/classic-create-folder.png %})

9. Enter a name for the folder and click **Create**.

      ![classic-name-folder]({% link salesforce/images/classic-name-folder.png %})

10. Click the **Actions** button and select **Share Externally**.

      ![classic-share-externally]({% link salesforce/images/classic-share-externally.png %})

11. Select the **Salesforce Community Name** you would like to share with and the **Users**. Click **Save**.

      ![lightning-externally-select]({% link salesforce/images/lightning-externally-select.png %})

You will see a **Salesforce Community Member Access** message. The result of the performed actions is that when the Community Member logs into Salesforce they will see the case in their **All Open Cases** list.

## Community Member accessing shared content

1. Log in to Salesforce Community.

2. Click the **My Open Cases** drop down list and then select **All Open Cases**.

      ![lightning-open-cases]({% link salesforce/images/lightning-open-cases.png %})

3. Click the link of the case number that has been shared with you to open it.

      ![lightning-all-new]({% link salesforce/images/lightning-all-cases.png %})

4. Log in as a Community Member to access the case and documents linked to the case.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})

  Community Members can download and view documents linked to the case. They can also upload documents to the case that will get stored in Alfresco.
  
## Community Visualforce Page Configuration and Setup

To expose the connector in a Salesforce Community (Digital Workspace) we need to add a visualforce page for the connector. 
Visualforce Page must be added to your Salesforce organization using the following template:

```xml
<apex:page docType="html-5.0" standardController="<Object API Name>">
 <apex:canvasApp id="AlfrescoConnector" applicationName="<Connected APP API Name>" width="100%" height="450px" scrolling="auto" parameters="{'community':'simple'}"/>  
</apex:page>
```

The connector is tied to a Standard or Custom Salesforce object. 

Insert your Object API Name as the value of the `standardController` attribute. For Example : Case or Opportunity

The `id` attribute is required and can be set to any non-empty, non-null value.

The `applicationName` attribute must be set to the API Name of the connected app created for the connector during the initial setup.

The `width`, `height`, and `scrolling` attributes can be set to values that meet the use case.

The most important attribute is the `parameters` attribute.  The value must be set to `{'community':'simple'}`.Without this value, the connector will surface the standard connector view. 

The Visualforce page will need to have the appropriate profiles added for it to be visible to the correct community users.

**Example 1:**

```xml
<apex:page docType="html-5.0" standardController="Case">
  <apex:canvasApp id="AlfCanvas3" applicationName="ACS_Salesforce" width="100%" height="450px" scrolling="auto" parameters="{'community':'simple'}"/>
</apex:page>
```

Add the new Visualforce Page to the desired record detail in your Salesforce Community.
