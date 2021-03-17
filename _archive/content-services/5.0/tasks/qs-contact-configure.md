---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Specifying the notification recipient

By default, tasks arising from the creation of a website comment are assigned to the administrative user. If desired, you can configure the website to specify the user who is to receive these notifications. You can do this for both the Editorial and the Live website.

To see the desired result of this setting, your installation of Share must have more than the default administrative user. Refer to the Share user help for details on creating a new user.

1.  Navigate to **Alfresco Quick Start**.

2.  Click **Edit Metadata** in the action list for the folder **Quick Start Editorial**.

    The Site Configuration field contains the entry `isEditorial=true`, which indicates that the Alfresco Web Editor is to be shown on the website. This field accepts multiple entries.

3.  In the Site Configuration field, add feedbackAssignee.Contact Request=user, where user is the user name of the person you want to receive the notifications.

    **Note:** Separate multiple entries in this field with a comma.

4.  Click **Submit**.


The next time you submit a form on the Contact page of the website, the resulting task will be assigned to the user specified in the Site Configuration field.

**Parent topic:**[Responding to contact page submissions](../tasks/qs-contact-respond.md)

