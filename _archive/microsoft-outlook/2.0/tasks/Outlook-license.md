---
author: Alfresco Documentation
source: 
audience: 
---

# Installing server and client licenses in Alfresco Share

Use Alfresco Share Admin Tools to install your Alfresco Outlook Integration server and client licenses.

Ensure that you have applied the Alfresco Outlook Server AMP files. See [Installing Alfresco Outlook Integration](Outlook-amp_v2.md) for more information. You also need your client and server license files.

1.  Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    In the left Tools panel, scroll down and under Email Client there are the following options for configuration:

    -   **Email Integration Settings**
    -   **Email Access Tokens**
    -   **Email Licenses**
    -   **Email System Info**
2.  Select Email Licenses and click the **Edit** button.

3.  Open the server license file in a text editor, and copy and paste the contents into the Server License field.

4.  \(Optional\) Open the client license file in a text editor, and copy and paste the contents into the Outlook Client License field.

    Alternatively, specify the client license in Microsoft Outlook in Alfresco Client \> Configure \> License.

    **Note:** Note that there is no Lotus Notes capability, so you do not need to add information in the Lotus Notes Client License field.

5.  Click **Save**.

    The server license status, number of current users, maximum users, product version and other information is displayed. Check that the license status is valid.

    **Note:** If you added a client license, the license key is displayed, with a message to check the **Alfresco Client \> Configure \> License** tab in Microsoft Outlook \(do this check after you have installed Alfresco Outlook Client\).


**Parent topic:**[Installing Alfresco Outlook Integration](../tasks/Outlook-amp_v2.md)

