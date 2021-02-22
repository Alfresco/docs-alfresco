---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Restricting mobile access

You can use the Restrictable aspect to set access restrictions on content that's viewed on Alfresco Mobile apps.

1.  Click on a file to view it in the file preview screen.

2.  In the **Document Actions** list click **Manage Aspects**.

    The Aspects page opens.

3.  In the **Available to Add** list click ![Add icon](../images/ico-add.png) next to the Restrictable aspect.

4.  Click **Apply changes**.

    Restrictions are now placed on the file when viewed on Alfresco Mobile.

    -   Alfresco Mobile iOS users will have a limited set of viewing options and be able to download the file, but can't copy or print it.
    -   Alfresco Mobile Android users will have no viewing access to the file, though they can still see the version history, comments and tags, and create a task for it.
    An additional Offline Expires After property is also added to the file properties. If a restricted file has been given an offline expiry timeout, then there is a time limit on how long users can work offline with it.

    **Note:** This option is only relevant for Alfresco Mobile iOS users, as restricted content can't be viewed at all on Alfresco Mobile Android.

    To set an offline expiry period:

5.  Click **Edit Properties** under **Document Actions**. 

6.  Enter a timeout period for the Offline Expires After option.

    This defines the maximum amount of time for which the file is available in Alfresco Mobile since the user last authenticated with the Alfresco server. Once this limit is passed the file becomes unavailable until the user next connects to the Alfresco server. It's recommended that you use full hours when setting offline expiry because, in Alfresco Mobile, part-hours are rounded up to the nearest hour.

7.  Click **Save**.


**Parent topic:**[Working with content](../concepts/library-items-individual.md)

