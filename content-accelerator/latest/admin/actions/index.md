---
title: Action Configurations
---


# Download Document Export Native Content

The Download Document / Export Native Content action allows a user to download the native content or a PDF rendition of the current document being viewed in the stage.

## Configuration Options

### Available Rendition Types
The action can be configured to download either the native content or the PDF rendition of the document being viewed in the stage. This configuration applies to all document types.

### Downloaded File Name
The action can be configured to use a pattern for the downloaded file name based on object type. Each document object type may have its own pattern of its attribute and constant characters to use for the downloaded file name.



# Export folder

##Configuration##

Export folder must be configured as a folder action - it will throw an error if it is a document action.

The zip created will be the *folder name*.zip

If any child objects are subfolders or empty documents, they'll be omitted from the zip.

###Download With Tags###

When enabled (defaults to false), a user can download a folder with folder tags enabled - creating individual folders for each tag and populating each folder with any child documents that share the same tag.

If a child document lacks a tag, or Download With Tags is disabled, all docs will be at the root of the zip.



# Bulk Upload

The Bulk Upload action encompasses the functionality of the deprecated Add Documents action. Bulk Upload allows a user to select multiples files to upload, edit common properties for all documents, edit individual document properties and upload all documents. Additionally, Bulk Upload has support for scanning, generating a cover page (drop-off scanning) and MSG file parsing.

## General Configuration

The general Bulk Upload action configuration options are as follows (see below for special functionality configuration):

#### Inherit Folder Attributes

Enable this configuration option to automatically inherit attribute values from the parent folder (these can be removed individual for each document or modified as a whole from the Bulk Property Editing Page).

#### Hide File Extensions

Enable this configuration option to hide the file extensions on the `objectName` of documents from view in the Bulk Upload action.

>**Note:** This does not control whether or not file extensions are added / removed from the `objectName` of documents when they are created in the repository. That is handled by a Spring configuration property for the `AddDocumentActionExecuter`.

## Additional Functionality

The Bulk Upload action also provides additional functionality out-of-the-box. The features currently implemented are as follows:

* Set doc as new version of existing document - **must be enabled in the admin**
* Scanning - **must be enabled in the admin**
* Create Document from Template - **must be enabled in the admin**
* Generating a cover page / drop-off scanning - **must be enabled in the admin**
* Parsing MSG files for attachments (and recursively parsing attached MSG files)
* Gmail Inbox ingestion - **must be enabled in the admin**

### Extension Whitelist
By default, any file type is allowed and will be uploaded to the repository.  However, for some systems that want to prevent some file types from being allowed, the `White List Document Types` box allows an administrator to specify which types to allow.  Simply comma separate any allowed extensions.  All other file types will be rejected by Bulk Upload.

Example whitelist:

```
pdf,jpeg,jpg,png,gif,doc,docx,docm,msg,potm,potx,ppsm,ppsx,ppt,pptx,pub,xls,xlsx,xlsb,xlsm,xltm,xltx,xltx,xps,html,mp3,mp4,txt,xml,json,eml
```

### Set as new version

Enable this configuration to allow users to set an uploaded doc as a new minor version of an existing document in the folder instead of creating a new document in the folder.

### Scanning

The Bulk Upload scanning functionality allows a user to scan multiple documents and upload them.

#### Configuration Options

**License Key:** The licence key from Dynamsoft - this must be configured properly for the functionality to work as expected.

### Create Document from Template

The Bulk Upload create document from template functionality allows a user to upload a new document by using content that already exists in the repository.  See [[Create Document from Template]] for more information.

### Cover Page / Drop-off Scanning

The Bulk Upload action provides the user the ability to generate a cover page for drop-off scanning functionality.

#### Configuration Options

**Button Name:** The text to display on the button used to initiate the generation of a cover page.

**Attribute to Generate Barcode With:** The attribute to use for generating the barcode on the cover page. _A **common** string property must be used for this configuration option._

**Cover Page Title:** The title to display at the top of the generated cover page.

**Attributes to Display on Cover Page:** Enable this option to choose attributes by object type to display in a table on the generated cover page.

### Parsing MSG Files

The Bulk Upload action provides support for parsing MSG files - for more information see the [Drag and Drop Outlook MSG Files wiki page](https://github.com/tsgrp/hpi/wiki/Drag-and-Drop-Outlook-MSG-Files).

#### Configuration Options

**Email Relation Type:** In order for parsed attachments to be properly associated with the parent email repository object, the email relation type **_must_** be specified. Choose the appropriate relation type selection. If the repository is Alfreso then you would choose (`hpi:emailed`).

### Ingest from Gmail

The Bulk Upload action provides support for pulling in emails/threads and their attachments directly from a user's gmail inbox. **This assumes the user's repo email is their gmail account email**.

#### Enabling Gmail API
1. Go to [https://console.developers.google.com/](https://console.developers.google.com/)
1. Click the ‘Create Project’ button
1. Give it whatever name you want and click the ‘Create’ button
1. Once it has been created, you should be taken to the Project Overview page. In the lefthand column, click on Credentials, and then click the 'OAuth consent screen' tab
1. Fill out Product name. This will be shown to the user when they authenticate when importing docs from their gmail. You can fill out the other sections if you want, but it is not necessary.
1. Save your changes
1. Go to the Library by clicking the menu item on the left.  
1. Under Google Apps APIs, click on Gmail API
1. Click the 'Enable' button at the top
1. Once the API has been enabled, an option will appear to create a new Client ID. 
1. When creating the client ID:
  - Make sure Web application is selected
  - In the Authorized JavaScript origins section, put in the url for that is hosting ACA. For example, if ACA was accessed by http://www.mysite.com/hpi, you would use http://www.mysite.com.  Note that multiple domains can be entered here if you have multiple HPIs that you would like to access the Gmail API.
1. Click Create Client ID
1. Copy the Client ID
1. In the bulk upload config, paste the Client ID from 14 into the 'Gmail Client Id' textbox

Note that you can always get back to your Client ID by going to the Credentials section.

#### Configuration Options
**Gmail Client Id:** The client id from registering the application with Google. See above for instructions


### Enabling Upload From Box

#### Box Application
1. Create an application in Box or use an existing one
1. Go to https://app.box.com/developers/console to view existing apps or create a new one
![Img Txt]({% link content-accelerator/images/BulkUpload-Box-Apps.png %})
1. When asked what type of app you are building, choose `Partner Integration`
1. Within an application, under the configuration tab, we can see the Client ID that we will need to use in the bulk upload admin (picture below)
1. Below the client ID will also be the redirect URI that will need to redirect back to ACA    
(ex. https://localhost:8080/hpi/dummy/path)
![Img Txt]({% link content-accelerator/images/BulkUpload-Box-ClientID.png %})

#### Bulk Upload Config
1. Select Bulk Upload Action
1. Set 'Enable Cloud Integration' slider to Yes
1. Choose 'Box' from dropdown selecting which application to integrate with (Box is the only one at the moment)
1. Set Client ID (Explained above)
1. Set Link Type to 'direct'
1. Choose whether to allow a user to select multiple documents to upload
![Img Txt]({% link content-accelerator/images/BulkUpload-Box-Config.png %})


#### Bulk Upload View
1. When configured, Box upload will be a button next to the other upload buttons
![Img Txt]({% link content-accelerator/images/BulkUpload-Box-Upload.png %})




# Configuring Scanning in Bulk Upload

Follow the steps on this page to setup Scanning paper documents into ACA. Currently, this functionality is set using HTML5 and Dynamic Web TWAIN (DWT) Version 12.3.1.


## Install Scanner Drivers
You must have a TWAIN-compliant scanner plugged into your machine with the proper drivers installed in order to scan documents. 

For TSGers, talk to Tony about getting the portable Ambir bar scanner and software.

## Install Dynamic Web TWAIN
Run the `DynamicWebTWAINHTML5Edition.exe` installation file.  There's nothing too tricky here - simple install.

Assuming ACA is already configured to use DWT, you should now be able to scan documents using the Bulk Upload action.  If DWT has not been setup, follow the steps below.

## Setup ACA
The Bulk Upload must be setup with the product key for DWT.  Follow these steps:

1. Edit the Bulk Import (ACA 2.2+) action
1. In the Advanced Properties section, change the "Allow Documents from Scanner" slider to "Yes"
1. Paste the product key (see below) from Dynamsoft into the textbox that pops up
1. Save the config

## Dynamsoft License Information
- For TSGers, our demo servers have a NFR (Not for Resale) license.  **DO NOT GIVE OUT** this license key.
- If you're evaluating ACA, go to https://www.dynamsoft.com/ to get a 30 day trial license.

### Obtaining a Product Key
The product key needed for DWT in the ACA admin can be [generated here](https://www.dynamsoft.com/Secure/WebTWAIN_ProductKeyGen.aspx).

## Common Errors
### Dynamic Web Twain is not installed
If you attempt to use OpenCapture in ACA but have not yet installed the DWT HTML5 component, a Dynamsoft alert will appear and prompt you to download the software. If the download link does not work, you need to manually install it using the steps above. If the message still appears after installation, please follow this link http://developer.dynamsoft.com/dwt/why-is-the-browser-prompting-me-to-install-the-scanning-service-repeatedly

### Product Key is not Accepted
If the product key is not correct, a DWT prompt will appear and the component will not load.  Navigate to the appropriate Bulk Import action config and enter the corrent code ensuring there are no spaces. If the problem persists:

- Log out of ACA and clear your browser cache.
- Debug ACA and verify the key is being read in correctly to the the scanner initialization. If the key is correct, consider contacting Dynamsoft Support. 




# Send Email

Send Email is a Folder and Stage action that sends email to recipients. When sending an email, only the email body is included in the email. The copy stored in the docbase includes any content from the To:, Cc:, Bcc:, Subject, and body fields.

An email may be sent with an optional attachment from the parent folder's children, so long as the child is a document. 

## Configuration

### Max Subject Length

The maximum number of characters allowed in the subject line of an email. If left blank, the default maximum is ten (10) characters.

### Email Storage Location

The subfolder of all correspondence sent from the parent folder. If left blank, all correspondence will be stored in the parent folder.
  
### Email Object Type

This is the object type for Send Email. The default object type is *HPIEmailMessage*. It can be overridden with a custom object type.

### Email Relationship

Is the relationship between an email and its attachments. For example, in a related objects view, it would show the attachments of an email and vice versa. For Alfresco repositories, select the "hpi:emailed (alfresco)" option.

### Folder Tags

You can optionally add a tag to the email object after it's created, typically set to 'Correspondence'.  Usually, this is set when the folder is displayed using [Folder Tags](https://github.com/tsgrp/hpi/wiki/Related-Objects#folder-tags).  If this is the case, you will typically want to set the Email Storage Location to empty.  This way, the email will be stored in the parent folder, but displayed in a 'Correspondence' tag in the folder.

>**Note:** If you have both the folder and document action configured for send email, you will want to have the same tags in both configurations.

### Folder Notes Integration ###

Users can toggle attaching a folder note in addition to the rest of their email (default is Off). When a user turns on Folder Notes Integration, they must configure a chained action for Send Email to fire Folder Notes. Just like regular folder notes, a note requires a Note Object Type (defaults to *hpi_note*) and a Note Type (defaults to *Correspondence*). When Folder Notes Integration is enabled, a second editor will appear under the email body called Folder Note. If the note is sent without any content, the email's subject line will be substituted. The note that is created will be linked to the email being sent.




# View All Documents Refined Search

## Overview
This feature allows the user to perform an additional search on a container from the View All Documents action. In some situations, such as a long-tail insurance claim, the total number of documents in a given container may exceed the repository's search result limit. The "Refined Search" feature gives the user more control over what documents from the container are returned to View All Documents by allowing providing more specific search criteria. This feature can still be used when that limit has not been reached by the initial view all documents query.

## Refined Search in View All Documents
### Configuration
To enable this feature, go to Admin -> Stage -> (desired trac) -> Folder Actions -> View All Documents. Scroll to Additional Configurations and turn the "Enable Additional Searching" switch to "ON". Once active, this feature uses the View All Documents search configuration and the configured query type. This feature allows the user to select one document object type to perform the refined search on. The object types available are selected from the search config's attribute search. The displayed form for each object type can be set in the attribute search config. **Additional Searching is not supported for the getChildren query type and does not support searching on folder object types**

### Refined Search in Action
#### Performing a Search
* Navigate to any container that belongs to the configured trac. 
* Find the search icon button to the right of the search result controls. 
* Click on search icon to open the Refined Search slide out pane. 
* At the top of the view is a drop down to select document type you would like to search against. The form below matches what is configured for that object type. Populating form fields with the values you wish to search on. 
* To search, click the search button at the top of the view. 
* To empty out the current form, click the reset button located next to the search button.
#### Handling the Refined Search Results
After searching, the pane will off the screen. The displayed results are those of the additional search. Notice the search button is now displayed as active and text appears to the right of the search results message. All text and facet filtering, as well as pagination functionality, is still active for the user to use. Clicking on the search icon again will allow you to perform a new search independent of the previous search. Clicking on the reset search message runs the initial view all documents search before any additional searching was performed. 