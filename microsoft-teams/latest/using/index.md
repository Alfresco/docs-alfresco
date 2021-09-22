---
title: Using the Collaboration Connector for Teams
---

The Collaboration Connector for Teams enable users within the Microsoft Teams Client to search for content in
Alfresco Content Services and share a preview link. The link can be sent to a Teams chat or channel. The link will open
in Alfresco Digital Workspace.

## Search for documents
Files such as Word, Excel and PowerPoint documents that are stored in the Alfresco Content Services repository 
can be searched for from a MS Teams client.

1. Make sure the Collaboration Connector for Teams application is available in the Teams client chat. Click on the 
   Messaging extensions **(...)** button at the bottom of the screen, you should see a dialog with the app installed:

   ![MS Teams Integration App]({% link microsoft-teams/images/ms-teams-integ-app-in-msg-extensions.png %}){:height="250px" width="200px"}

   If the "Alfresco for Teams" app is not available contact an Administrator to have it installed globally for all users.
   Or install it manually as described [here]({% link microsoft-teams/latest/install/index.md %}#create-teams-integ-app-manifest) 
   and [here]({% link microsoft-teams/latest/install/index.md %}#test-app)

2. Click on the "Alfresco for Teams" app and it should appear in your chat:

   ![MS Teams Integration App Search]({% link microsoft-teams/images/ms-teams-integ-app-search-dialog.png %}){:height="250px" width="200px"}

3. Now, enter a search text to and hit Enter to search for content in Content Services repository: 

   ![MS Teams Integration App Search Result]({% link microsoft-teams/images/ms-teams-integ-app-search-dialog-result.png %}){:height="250px" width="200px"}

4. Once you have the document you want to share

## Share a document

Files such as Word, Excel and PowerPoint documents that are stored in Alfresco can be shared with colleagues.

1. In the Digital Workspace right click on the file you want to share.

2. Select **Edit in `<document-type>` Online**, for example `Edit in PowerPoint Online`.

3. You will be prompted to sign into Microsoft Online to open the document in a new browser tab.

    > **Note:** The document will be locked in the Digital Workspace. A padlock icon against the document will indicate this.

4. Click the **Share** button at the top right of the window in the Office document.

5. Click **People in `<your-organization>` with the link can edit** and select the **Allow editing** checkbox followed by **Apply**.

6. Enter the name or email address of who you want to share the document with and click **Send**.

    The collaborator will receive an email that contains a link to the document. Once the collaborator clicks the **Open** button in the email they then login using their Microsoft Online credentials. The collaborator will then have the document opened in Office Online.

