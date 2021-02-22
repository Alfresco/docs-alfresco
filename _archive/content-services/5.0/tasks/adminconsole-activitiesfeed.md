---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Activities Feed

Activities Feed emails are sent from Alfresco to all users, summarizing the activities they see in their My Activities dashlet. Users will not see these email unless the Activities Feed is enabled. Emails include activities in all sites they are a member of, and by people they are following. You can set the frequency with which these emails are sent, the maximum number of activities they contain, and the maximum age of the activities.

1.  Open the Admin Console.

2.  In the Repository Services section, click **Activities Feed**.

    You see the Activities Feed page.

3.  Set the activities properties:

    |Activities Feed property|Example setting|What is it?|
    |------------------------|---------------|-----------|
    |**Activity Feed Enabled**|Yes|This enables or disables activity notifications to users using email.|
    |**Frequency CRON Expression**|0 0 0 \* \* ?|This specifies a cron expression which defines the frequency with which users will receive Activities Feed emails. Emails are only sent if there are new activities since the last email. By default this is every 24 hours at midnight.|
    |**Maximum Number**|200|The maximum number of activities that are reported on in the Activities dashlets and Activities Feed emails.|
    |**Maximum Age \(mins\)**|44640|This is the maximum age of the activities shown in the Activities Feed emails. Activities that are older than the maximum age are not shown in the Activities dashlet. The default setting is 44640 \(a 31-day month\).|

4.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Admin Console: Repository Services](../concepts/adminconsole-reposervices.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

