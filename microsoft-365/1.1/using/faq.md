---
title: FAQs
---

If you have any problems working with the Microsoft 365 Connector have a look through the list to see if there is a way to resolve your issue.

## What is Microsoft 365?

Microsoft 365 (formerly Office 365) is Microsoft’s subscription-based cloud platform that includes popular Office Online apps like Word, Excel and PowerPoint.

## What are the benefits of integrations into cloud office suites like Microsoft 365?

Office is the de facto productivity suite for most enterprises. Native integration between the Alfresco and Microsoft platforms enhances collaboration, allows users to seamlessly use everyday tools to get work done, and ultimately ensure that important business content is stored in a secure and compliant way in Alfresco.

## Why is it important to follow a ‘single source of truth’ strategy for content storage?

Content sprawl across multiple repositories and business systems is a challenge many organizations face today. Alfresco is an enterprise-class content management system that provides integrations into other business applications so that you avoid creating content silos (such as storing content permanently in Microsoft OneDrive).

## What are the supported Microsoft Office Online xml formats?

The supported Microsoft Office Online xml formats are `docx`, `xlsx`, and `pptx` (Word, Excel, and PowerPoint).

> **Note**: Options to Edit Online will not be available for other file formats, such as `doc`, `xls`, or `ppt`.

## What Microsoft services are being used for the Microsoft 365 connector?

The integration uses Microsoft OneDrive as well as Microsoft Graph API for files.

## What should I expect to see in my Microsoft OneDrive account?

You will see a Microsoft 365 connector folder in your Apps folder, under My files. The folder name may vary depending on the name your Administrator chose when registering the Application.

Documents you edit will appear in date stamped folders. These date stamped folders are used to store a temporary copy of the document you are editing. All edits you make are being made to this temporary copy. You should not open or manage this temporary copy of the document.

Once you finish making edits and save edits back to Alfresco, or discard edits, this temporary copy is deleted in OneDrive and put in the Recycle Bin.

> **Note**: Items deleted to the Recycle Bin are not automatically permanently deleted. We recommend manually deleting files in the Recycle Bin regularly.

## Why am I unable to edit a file in Office Online?

File names that contain special characters such as `# “ %` are unable to open in Office Online. When attempting to edit such files errors will appear in the Console and the file will not open in Office Online.

## Why am I unable to see my edits in the document preview of Digital Workspace?

Document previews in the Digital Workspace are not updating with the latest version of a document through Firefox browsers. Once you re-login into the Digital Workspace, they will see the latest document previews.

## Why do I see a 400 invalid request message from the API?

You may see this error message if there is a leading space in the Application’s display name. Ensure there is no leading space in the Application’s registered display name.

## Why do I see a 400 error message from the API?

You will see this error message if the Office Online content model is not activated. Ensure the `alfresco-ooi-content-model.xml` is deployed and activated.

## Why do I receive a CORS error message from `https://microsoftonline.com`?

You may receive the following error message:

"Access to XMLHttpRequest at `https://login.microsoftonline.com/common/v2.0/oauth2/token` from origin `yourApp.com` has been blocked by CORS policy: No `Access-Control-Allow-Origin` header is present on the requested resource."

This message indicates you have incorrectly selected Web when [registering your single-page application (SPA)]({% link microsoft-365/1.1/install/index.md %}#register-a-single-page-application-spa), instead of correctly selecting Single-page application SPA.
