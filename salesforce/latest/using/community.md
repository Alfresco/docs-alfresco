---
title: Community Sites
---

> **Note:** If you want to create a community site you must add the administrator user of Alfresco Content Services that you use as an administrator of Salesforce to the `GROUP_SALESFORCE_MODERATORS` group in Alfresco Content Services., for more see [Configure Salesforce community]({% link salesforce/latest/config/index.md %}#configure-salesforce-community)

To create a commuity site you need to peform the following:

1. Add the administrator user of Alfresco Content Services that you use as an administrator of Salesforce to the `GROUP_SALESFORCE_MODERATORS` group in Alfresco Content Services., for more see [Configure Salesforce community]({% link salesforce/latest/config/index.md %}#configure-salesforce-community).

2. See [Create an Experience Cloud Site pg. 51](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf)

3. See [Add Members to Your Experience Cloud Site pg. 54](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf)

4. [Share content externally](#share-content-externally)

## Share content externally to community members

1. Log in to Salesforce.

2. Log in as a community administrator to Alfresco Share in the Canvas app.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})

3. Click the down arrow next to **Cases** and then **New Case**.

      ![lightning-new-case]({% link salesforce/images/lightning-new-case.png %})

4. Select the required **Case Origin** and any other information required for the case. Click **Save**.

6. Click the drop down arrow next to Change Owner and select **Sharing**.

      ![create-new-lightning-page]({% link salesforce/images/lightning-sharing.png %})

7. Click the drop down arrow in the search bar and select **Public Group**.

      ![lightning-public-group]({% link salesforce/images/lightning-public-group.png %})

8. Type *all* into the search field and select **All Customer Portal Users**.

      ![lightning-portal-users]({% link salesforce/images/lightning-portal-users.png %})

9. Click the drop down arrow in the **Case Access** field and select the type of access required for this case. Click **Save**.

      ![lightning-share-access]({% link salesforce/images/lightning-share-access.png %})

10. Click the drop down arrow next to **Create** and select **Folder**.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

11. Enter the details you require for your new folder and then click **Save**.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

12. Click the **Actions** button and select **Share Externally**.

    ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

13. Select the **Salesforce community** you would like to share with and the **Users**. Click Save.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

When the community member logs in they will see the case in their **All Open Cases** list.

## Retrieve a shared case if you are a community user

1. Log in to Salesforce.

2. Log in as a community administrator to Alfresco Share in the Canvas app.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

3. Click **Cases** and then **New Case**.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

4. Select the required **Case Origin**.

   Enter any other information required for the case.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

5. Click **Save**.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

6. Click the drop down arrow next to Change Owner and select **Sharing**.

      ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})