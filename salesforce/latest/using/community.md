---
title: Community Sites
---

To create a commuity site and retrieve a shared case as a community member you need to peform a series of steps. This can be done using either the [Lightning Experience](#lightning-experience) or [Salesforce Classic](#salesforce-classic).

> **Note:** Before you begin ensure you have added the administrator user of Alfresco Content Services that you use as an administrator of Salesforce to the `GROUP_SALESFORCE_MODERATORS` group in Alfresco Content Services, for more see [Configure a Salesforce Community Site]({% link salesforce/latest/config/index.md %}#configure-salesforce-community-site).

## Lightning experience

To create a commuity site you need to peform the following:

1. See [Create an Experience Cloud Site pg. 51](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

2. See [Add Members to Your Experience Cloud Site pg. 54](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

3. [Share content externally to community members Lightning Experience](#share-content-externally-to-community-members-lightning-experience)

## Share content externally to community members Lightning Experience

1. Log in to Salesforce.

2. Log in as a community administrator to Alfresco Share in the Canvas app.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})

3. Click the down arrow next to **Cases** and then **New Case**.

      ![lightning-create-case]({% link salesforce/images/lightning-create-case.png %})

4. Select the required **Case Origin** and any other information needed for the case. Click **Save**.

      ![lightning-new-case]({% link salesforce/images/lightning-new-case.png %})

6. Click the drop down arrow next to Change Owner and select **Sharing**.

      ![create-new-lightning-page]({% link salesforce/images/lightning-sharing.png %})

7. Click the drop down arrow in the search bar and select **Public Group**.

      ![lightning-public-group]({% link salesforce/images/lightning-public-group.png %})

8. Type *all* into the search field and select **All Customer Portal Users**.

      ![lightning-portal-users]({% link salesforce/images/lightning-portal-users.png %})

9. Click the drop down arrow in the **Case Access** field and select the type of access required for this case. Click **Save**.

      ![lightning-share-access]({% link salesforce/images/lightning-share-access.png %})

10. Click the drop down arrow next to **Create** and select **Folder**.

      ![lightning-create-folder]({% link salesforce/images/lightning-create-folder.png %})

11. Enter the details you require for your new folder and then click **Save**.

      ![lightning-details-folder]({% link salesforce/images/lightning-details-folder.png %})

12. Click the **Actions** button and select **Share Externally**.

    ![lightning-share-externally]({% link salesforce/images/lightning-share-externally.png %})

13. Select the **Salesforce Community Name** you would like to share with and the **Users**. Click **Save**.

      ![lightning-externally-select]({% link salesforce/images/lightning-externally-select.png %})

You will see a **Successfully Shared Accounts Externally** message. The result of the performed actions is when the community member logs into Salesforce they will see the case in their **All Open Cases** list.

## Salesforce Classic

To create a commuity site you need to peform the following:

1. See [Create an Experience Cloud Site pg. 51](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

2. See [Add Members to Your Experience Cloud Site pg. 54](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/communities.pdf){:target="_blank"}

3. [Share content externally to community members Salesforce Classic](#share-content-externally-to-community-members-salesforce-classic)

## Share content externally to community members Salesforce Classic

1. Log in to Salesforce.

2. Click **Alfresco Repository** and log in as a community administrator to Alfresco Share in the Canvas app.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})

3. Click **Cases** and click the **Create New** drop down list and then select **Case**.

      ![classic-create-case]({% link salesforce/images/classic-create-case.png %})

4. Select the required **Case Origin** and any other information needed for the case. Click **Save**.

      ![classic-new-case]({% link salesforce/images/classic-new-case.png %})

6. Click the **Sharing** button above the case.

      ![classic-sharing]({% link salesforce/images/classic-sharing.png %})

7. Click the **Add** button.

      ![classic-sharing-add]({% link salesforce/images/classic-sharing-add.png %})

8. Search **Public Groups** and add All Customer Portal Users to the **Share With** column. Click **Save**.

      ![classic-sharing-groups]({% link salesforce/images/classic-sharing-groups.png %})

9. Click the **Create** drop down list and select **Folder**.

      ![classic-create-folder]({% link salesforce/images/classic-create-folder.png %})

10. Enter a name for the folder and click **Create**.

      ![classic-name-folder]({% link salesforce/images/classic-name-folder.png %})

11. Click the **Actions** button and select **Share Externally**.

      ![classic-share-externally]({% link salesforce/images/classic-share-externally.png %})

12. Click the **Actions** button and select **Share Externally**.

    ![classic-share-name]({% link salesforce/images/classic-share-name.png %})

13. Select the **Salesforce Community Name** you would like to share with and the **Users**. Click **Save**.

      ![lightning-externally-select]({% link salesforce/images/lightning-externally-select.png %})

You will see a **Successfully Shared Accounts Externally** message. The result of the performed actions is when the community member logs into Salesforce they will see the case in their **All Open Cases** list.

## Retrieve a shared case if you are a community user

1. Log in to Salesforce Community.

2. Click the **My Open Cases** drop down list and then select **All Open Cases**.

      ![lightning-open-cases]({% link salesforce/images/lightning-open-cases.png %})

3. Click the link of the case number that has been shared with you to open it.

      ![lightning-all-new]({% link salesforce/images/lightning-all-cases.png %})

4. Log in as a Community member.

      ![lightning-alfresco-tab]({% link salesforce/images/lightning-alfresco-tab.png %})
