---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Restricting mobile access

You can use the Restrictable aspect to set access restrictions on content that's viewed on Alfresco Mobile apps.

1.  Click on an item in the library to view it in the Document Details page.

2.  In the **Document Actions** list click **Manage Aspects**.

    The Aspects page opens.

3.  In the **Available to Add** list click ![Add icon](../images/ico-add.png) next to the Restrictable aspect.

4.  Click **Apply changes**.

    Restrictions are now placed on the item when viewed on Alfresco Mobile.

    -   Alfresco Mobile iOS users will have a limited set of viewing options and be able to download the item, but can't copy or print the item.
    -   Alfresco Mobile Android users will have no viewing access to the item, though they can still see the version history, comments and tags, and create a task for the item.
    An additional Offline Expires After property is also added to the item properties. If a restricted item has been given an offline expiry timeout, then there is a time limit on how long users can work offline with it.

    **Note:** This option is only relevant for Alfresco Mobile iOS users, as restricted content can't be viewed at all on Alfresco Mobile Android.

    To set an offline expiry period:

5.  Click **Edit Properties** under **Document Actions**. 

6.  Enter a timeout period for the Offline Expires After option.

    This defines the maximum amount of time for which the item is available in Alfresco Mobile since the user last authenticated with the Alfresco server. Once this limit is passed the item becomes unavailable until the user next connects to the Alfresco server. It's recommended that you use full hours when setting offline expiry because, in Alfresco Mobile, part-hours are rounded up to the nearest hour.

7.  Click **Save**.


**Parent topic:**[Working with individual library items](../concepts/library-items-individual.md)

