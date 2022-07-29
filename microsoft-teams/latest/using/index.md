---
title: Using the Collaboration Connector for Teams
---

The Collaboration Connector for Teams enable users within the Microsoft Teams Client to search for content in
Alfresco Content Services and share a preview link. The link can be sent to a Teams chat or channel. The link will open
in Alfresco Digital Workspace.

## Enable the Alfresco for Teams app

The first thing you need to do before you can use the Collaboration Connector for Teams integration in your 
MS Teams client is to add the *Alfresco for Teams* app.

>**Note:** You only need to do this once. You then pin the app, so it is always available in the Teams client.

1. Click on the Messaging extensions **(...)** button at the bottom of the screen, you should see a dialog with the 
   app installed:

   ![MS Teams Integration App]({% link microsoft-teams/images/ms-teams-integ-app-in-msg-extensions.png %}){:height="250px" width="200px"}

   If the "Alfresco for Teams" app is not available contact an Administrator to have it installed globally for all users.
   Or install it manually as described [here]({% link microsoft-teams/latest/install/index.md %}#create-teams-integ-app-manifest)
   and [here]({% link microsoft-teams/latest/install/index.md %}#test-app)

2. Right-click on the **Alfresco for Teams** app, so a popup menu appears:

   ![MS Teams Integration App Search]({% link microsoft-teams/images/ms-teams-integ-app-popup-menu.png %}){:height="250px" width="200px"}

3. Select the **Pin** menu item, this permanently adds the app to the bottom toolbar:

   ![MS Teams Integration App Search Result]({% link microsoft-teams/images/ms-teams-integ-app-bottom-toolbar.png %}){:height="25px" width="200px"}

4. You can now start using the **Alfresco for Teams** app by clicking on it in the bottom toolbar.

## Search for documents

Files such as Word, Excel and PowerPoint documents that are stored in the Alfresco Content Services repository 
can be searched for from a MS Teams client.

1. Click on the **Alfresco for Teams** icon in the bottom toolbar, the app appears:

   ![MS Teams Integration App Search]({% link microsoft-teams/images/ms-teams-integ-app-search-dialog.png %}){:height="250px" width="200px"}

2. If you are not logged into the Alfresco repository, a **sign in** link will appear:

   ![MS Teams Integration App SignIn Link]({% link microsoft-teams/images/ms-teams-integ-app-signin-link.png %}){:height="250px" width="200px"}

3. Click the **sign in** link and then specify your Alfresco username and password:

   ![MS Teams Integration App SignIn Dialog]({% link microsoft-teams/images/ms-teams-integ-app-signin-dialog.png %}){:height="400px" width="600px"}

4. Open the app again and you will see a successfully signed in message, you can now search the repository.

      ![Signed in]({% link microsoft-teams/images/signed-in.png %})

## Share a document

When you have a search result you can share files from it with the other members of a chat.

1. Click on the search result item you want to share:

   ![MS Teams Integration App Search Result item]({% link microsoft-teams/images/ms-teams-integ-app-search-dialog-result-item.png %}){:height="250px" width="200px"}

2. It appears in the chat, click **submit** to share it with the other members:

   ![MS Teams Integration App Search Result item share]({% link microsoft-teams/images/ms-teams-integ-app-search-dialog-result-item-share.png %}){:height="300px" width="600px"}

3. Once submitted it looks like this for the other members:

   ![MS Teams Integration App Search Result item shared]({% link microsoft-teams/images/ms-teams-integ-app-search-dialog-result-item-shared.png %}){:height="300px" width="600px"}

4. Members can open the doc in Alfresco Digital Workspace by clicking on **View in Alfresco**:

   ![MS Teams Integration App Doc View in ADW]({% link microsoft-teams/images/ms-teams-integ-app-doc-view-adw.png %}){:height="400px" width="600px"}

## Unfurl ADW public shared links

You can share Alfresco Digital Workspace links within the Teams client. Your colleagues can preview the contents of the link within the Teams client without having to navigate away to the Digital Workspace, or they can click and navigate away from Teams to see the contents of the link in the Digital Workspace.

1. Send a public shared link to a colleague in the Teams client.

   You will see a preview of the link in the **Type a new message** pane because the link will unfurl.

     ![Add Share URL]({% link microsoft-teams/images/add-share-url.png %}){:height="300px" width="600px"}

2. Your colleague will see the link and its unfurled contents in the chat window.

     ![Share URL Chat window]({% link microsoft-teams/images/chat-window.png %}){:height="300px" width="600px"}

3. If they click the **Preview** button they are shown a preview of the contents of the link within the Teams chat window.

   ![Preview window]({% link microsoft-teams/images/preview-window.png %}){:height="300px" width="600px"}
