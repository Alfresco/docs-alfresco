---
title: Integrations
---

## REST API

* Authentication
  * [Normal login](#normal-login)
  * [External login](#external-login)

### Normal login

Endpoint to perform a log in operation using the provided parameters. Redirects to viewer.htm after successful authentication.

* **URL**  
`/login.htm`  
* **Method**  
`POST`  
* **Required Parameters**
  * `username`: {String} the username to use for logging in
  * `password`: {String} the password to use for logging in (not encrypted)
* **Optional Parameters**
  * `docbase`: {String} the docbase to log in to.
  * `docId`: {String} the document id that should be passed to viewer.htm after a successful log in
  * `docIdList`: {String} a list of document ids (comma separated) to attach to the viewer.htm after a successful login
  * `parentId`: {String} the parent id of the document to view in the viewer.htm after a successful login.
  * `mode`: {String} the mode that AEV should open into. Either **openviewer, pageSelect, readOnly, edit, signature, annotation, redact** or **false** (default) for unspecified (which will launch the viewer in annotation mode).
  * `redactionMode`: {Boolean} set to **true** if we are redacting the document as a copy (defaults to **false**).
  * `useLocalStorageForRedaction`: {Boolean} set to **true** if we should saved the unredacted document id and redacted document id in the local storage. `redactionMode` must be set to **true** for this to be used. (defaults to **false**).
  * `pageSelectMode`: {Boolean} set to **true** if we want to open AEV up in page selected mode (defauled to **false**).
  * `pageSelectButtonLabel`: {String} what the button label will be named in the currently selected pages notification in pageSelectMode. `pageSelectMode` must be set to **true** for this to be used.
  * `pageSelectEventName`: {String} the name of the event that will happen when the currently selected pages notification button is clicked. `pageSelectMode` must be set to **true** for this to be used.
  * `emptyPageSelectionValid`: {Boolean} set to **true** if it is valid to select no pages (defaults to **false**).
  * `startupSearch`: {String} the search term that the user wants to search on when first loading the document.
  * `currentPage`: {Integer} the page that the user should be jumped to when they first open the document.
  * `viewerTitle`: {String} the title that the viewer page will display after successful login.
  * `viewerMessage`: {String} a message that the viewer page will display after successful login.
  * `redirectedToOV`: {Boolean} set to **true** if the user is being redirected to OpenViewer because of permissions (defaults to **false**).
* **Success Response**
  * Code: 200
  * User will be routed to the viewer.htm page within AEV.
* **Sample Call**

    Expected result - the admin will login successfully and be redirected to the AEV viewer with the document supplied as the `docId` parameter open to page 5 and with 3 documents showing in the document list sidebar.

    ```text
    https://{server}/OpenAnnotate/login.htm
    ```

* **Form-data body**
  * `username`: admin
  * `password`: admin
  * `docId`: workspace://SpacesStore/c47ef310-e731-427c-afc0-af8821c40890
  * `docIdList`: workspace://SpacesStore/64e76092-4b32-4291-aa78-7b6ede902bab,workspace://SpacesStore/5d09828e-7efd-4387-8a44-0c83c8fb8a0f,workspace://SpacesStore/97a859af-4b38-479e-bbc5-5f945a8e551
  * `currentPage`: 5

### External login

Endpoint to login from an external source with a username. The endpoint expects a valid ticket to be provided. If a valid ticket is not provided, the user will be redirected to the login screen to generate a new, valid ticket.  This endpoint is most commonly used through an iframe of a parent application that is embedding AEV, like the Alfresco Content Accelerator.

* **URL**  
`/login/external*`  
* **Method**  
`GET`  
* **Required Parameters**
  * `ticket` : {String} Ticket from the current session.
  * `username`: {String} the username to use for logging in
* **Optional Parameters**
  * `docbase`: {String} the docbase to log in to.
  * `docId`: {String} the document id that should be passed to viewer.htm after a successful log in
  * `docIdList`: {String} a list of document ids (comma separated) to attach to the viewer.htm after a successful login
  * `parentId`: {String} the parent id of the document to view in the viewer.htm after a successful login.
  * `mode`: {String} the mode that AEV should open into. Either **openviewer, pageSelect, readOnly, edit, signature, annotation, redact** or **false** (default) for unspecified (which will launch the viewer in annotation mode).
  * `redactionMode`: {Boolean} set to **true** if we are redacting the document as a copy (defaults to **false**).
  * `useLocalStorageForRedaction`: {Boolean} set to **true** if we should saved the unredacted document id and redacted document id in the local storage. `redactionMode` must be set to **true** for this to be used. (defaults to **false**).
  * `pageSelectButtonLabel`: {String} what the button label will be named in the currently selected pages notification in pageSelectMode.
  * `pageSelectEventName`: {String} the name of the event that will happen when the currently selected pages notification button is clicked.
  * `emptyPageSelectionValid`: {Boolean} set to **true** if it is valid to select no pages (defaults to **false**).
  * `startupSearch`: {String} the search term that the user wants to search on when first loading the document.
  * `startupPage`: {Integer} the page that the user should be jumped to when they first open the document.
  * `viewerTitle`: {String} the title that the viewer page will display after successful login.
  * `viewerMessage`: {String} a message that the viewer page will display after successful login.
  * `redirectedToOV`: {Boolean} set to **true** if the user is being redirected to OpenViewer because of permissions (defaults to **false**).
* **Success Response**
  * Code: 200
  * User will be routed to the viewer.htm page within AEV.
* **Sample Call**

    Expected result: the admin will be successfully authenticated and be redirected to the AEV viewer with the document supplied as the `docId` parameter open.

    ```text
    https://{server}/OpenAnnotate/login/external.htm?username=admin&ticket=TICKET_6dd55060d45cc05957b16da3becd9938f9414b9e&docId=workspace://SpacesStore/c47ef310-e731-427c-afc0-af8821c40890
    ```

## Features

* [Document list sidebar view](#document-list-sidebar-view)
* [Startup search](#startup-search)

### Document list sidebar view

The purpose of this feature is to allow a user to easily navigate between documents in AEV by displaying a list of documents in a sidebar tab. In order for this tab to show up, the `viewer.htm` request must contain the `docIdList` parameter with a comma separated list of document ids.

#### Example

Document ID List Parameter (Alfresco):

```text
docIdList=workspace://SpacesStore/d7de806c-9aa6-4b14-8ff2-95b902d33d5d,workspace://SpacesStore/0ed0e588-8c70-42ad-8e77-2211e4bdd9ce,workspace://SpacesStore/0f39c66d-f414-4a06-861e-c91a3ff12335
```

Document ID List Parameter (Documentum):

```text
docIdList=090130da806908e9,090130da806908e2,090130da806908e5
```

Full request:  

```text
https://{server}/OpenAnnotate/viewer.htm?docId=workspace://SpacesStore/fbe65690-62b2-4275-8655-f9f08778c12a&username=admin&docIdList=workspace://SpacesStore/d7de806c-9aa6-4b14-8ff2-95b902d33d5d,workspace://SpacesStore/0ed0e588-8c70-42ad-8e77-2211e4bdd9ce,workspace://SpacesStore/0f39c66d-f414-4a06-861e-c91a3ff12335
```

Expected Result: the admin will be redirected to the AEV viewer with the document supplied as the `docId` parameter and with 3 documents showing in the document list sidebar.

#### Configuration

**Sidebar**

By default, the document list view is enabled in the left sidebar. This can be changed by adding/removing `documentList` from the `leftSidebarModules` or `rightSidebarModules` in the `defaults.properties` file.

**Popup Notification**

When one or more invalid document ids have been passed in (causing the call to `/openContentObjects` to fail), a popup notification will be displayed in the bottom right-hand corner of the viewer by default. This can be changed by adding/removing `displayDocumentListFailed` from the `enabledPopupNotifications` configurable in the `default.properties` file.

### Startup search

The purpose of this feature is search for a term when AEV initially loads. This will allow for results to appear highlighted in the document and in the search results tab on first load.

#### Example: Startup

Startup  Search Parameter:

`startupSearch=termToSearchOn`

Full request:  

```text
https://{server}/OpenAnnotate/viewer.htm?docId=workspace://SpacesStore/fbe65690-62b2-4275-8655-f9f08778c12a&username=admin&startupSearch=termToSearchOn
```

Expected Result: Once the page loads, any matches on the term to search are highlighted in the document and search results tab.
