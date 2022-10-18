---
title: Alfresco Enterprise Viewer Traceability
---

The Traceability Matrix below verifies that all requirements have been covered by associating the requirement to individual test cases to demonstrate testing. The test scripts are and test script results are stored within TSG's internal Subversion instance.

## Document and Annotation View

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-DA-1 | The system shall allow a user to view a document | STS007
OA-DA-2 | The system shall display the first page of document by default | STS007
OA-DA-3 | The system shall allow a user to view the next page of a document | STS005
OA-DA-4 | The system shall allow a user to view the previous page of a document | STS005
OA-DA-5 | The system shall allow a user to scroll between pages of a document | STS005
OA-DA-6 | The system shall allow a user to enter a document page number and display that page upon entry | STS005
OA-DA-7 | The system shall display the current page number of a document | STS005
OA-DA-8 | The system shall display the total number of pages in a document | STS007
OA-DA-9 | The system shall allow a user to zoom in to a document page | STS006
OA-DA-10 | The system shall allow a user to zoom out of a document page | STS006
OA-DA-11 | The system shall allow a user to zoom to fit the document page width to the frame | STS006
OA-DA-12 | The system shall allow a user to zoom to fit the document page height to the frame | STS006
OA-DA-13 | The system shall allow a user to view document annotations | STS008
OA-DA-14 | The system shall display all annotations that exist on the current document page | STS008
OA-DA-15 | The system shall visually indicate the location of an annotation on the document page | STS008
OA-DA-16 | The system shall allow a user to view the text/comment associated with an annotation | STS008
OA-DA-17 | The system shall allow a user to view the name of the user who created an annotation | STS008
OA-DA-18 | The system shall be configurable to allow a user to view the date and time the annotation was created or modified. Date and time will be based on server settings | STS008
OA-DA-19 | The system shall display how long ago an annotation was created (X seconds, minutes, hours, days, etc.) | STS008
OA-DA-20 | The system shall automatically save annotations upon creation | STS008
OA-DA-21 | The system shall allow a user to hide the text associated with an annotation | STS008
OA-DA-22 | The system shall display annotations when a document is zoomed in | STS006
OA-DA-23 | The system shall allow a user to view a summary of all annotations for a document | STS007
OA-DA-24 | The system shall allow a user to hide the summary of all annotations for a document | STS013
OA-DA-25 | The system shall display the user, text and page number for each annotation displayed in the annotation summary | STS013
OA-DA-26 | The system shall display the corresponding document page and annotation when a user clicks on an annotation from the annotation summary list | STS013
OA-DA-27 | The system shall allow the user to filter the annotations displayed in the annotation summary page | STS013
OA-DA-28 | The system shall allow the user to filter annotations based on a text string, created by, annotation type, and annotation status | STS013
OA-DA-29 | The system shall hide the annotations on the document when they are filtered in the annotation summary page | STS013
OA-DA-30 | The system shall allow the user to hide all annotations when viewing the document in OpenAnnotate | STS013
OA-DA-31 | The system shall allow the user to export a summary of all annotations including replies and status values to Excel | STS013
OA-DA-32 | The system shall allow the user to view a printable summary of all annotations including replies and status values in a browser window | STS013
OA-DA-33 | The system shall allow a user to view bookmarks in a document | STS019
OA-DA-34 | The system shall display the corresponding document page when a user clicks on a bookmark | STS019
OA-DA-35 | The system shall allow a user to hide the list of bookmarks for a document | STS019
OA-DA-36 | The system shall allow a user to view attachments embedded in the PDF file | STS021
OA-DA-37 | The system shall allow a user to hide attachments embedded in the PDF file | STS021
OA-DA-38 | The system shall generate a thumbnail for each page of a document | STS005
OA-DA-39 | The system shall display the corresponding document page when a user clicks on a thumbnail | STS005
OA-DA-40 | The system shall allow the user to hide the thumbnail view | STS005
OA-DA-41 | The system shall allow a user to search the text within the document for a given search entry | STS004
OA-DA-42 | The system will highlight the matching text when the user executes a text search in OpenAnnotate | STS004
OA-DA-43 | The system will allow a user to navigate (jump to) to matching instances of the searched text | STS004
OA-DA-44 | The system shall allow a user to view other users who are viewing the same document | STS018
OA-DA-45 | The system shall allow a user to view the annotations that other users have created | STS018
OA-DA-46 | The system shall allow a user to chat with other users that are viewing the same document | STS018
OA-DA-47 | The system shall maintain internal document hyperlinks | STS005
OA-DA-48 | The system shall contain the ability to display document load time information | STS005
OA-DA-49 | The system will alert the user if there are annotation widgets that OpenAnnotate does not support | STS002
OA-DA-50 | The system will display unsupported annotation types (i.e. cloud) as a sticky note | STS002
OA-DA-51 | OpenAnnotate interface will display in the language specified by the operating system, provided the appropriate localization file is created and installed | STS001

## Annotating

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-A-1 | The system shall allow a user to create an annotation on the page(s) that are being currently displayed | STS008
OA-A-2 | The system shall capture the name of the user who created an annotation | STS008
OA-A-3 | The system shall capture the date and time the annotation was created. Date and time will be based on server settings | STS008
OA-A-4 | The system shall capture the date and time the annotation was last modified. Date and time will be based on server settings | STS008
OA-A-5 | The system shall allow a user to edit an annotation that they created | STS008
OA-A-6 | The system shall prevent a user from editing an annotation created by another user | STS008
OA-A-7 | The system shall allow a user to delete an annotation that they created | STS008
OA-A-8 | The system will delete all annotation replies, including those created by other users, when the annotation is deleted | STS008
OA-A-9 | The system shall prevent a user from deleting an annotation created by another user | STS008
OA-A-10 | The system shall automatically save annotations | STS008
OA-A-11 | The system shall allow a user to forcibly save the annotations created by them | STS008
OA-A-12 | The system shall allow a user to refresh the annotations created by them (only applies when collaboration mode is not enabled) | STS008
OA-A-13 | The system shall allow a user to undo the last change they created on the document | STS008
OA-A-14 | The system shall allow a user to redo the last change they created on the document | STS008
OA-A-15 | The system shall allow a user to create a sticky note annotation | STS008
OA-A-16 | The system shall allow the user to create an attachment annotation supporting the uploading of one or more documents | STS008
OA-A-17 | The system shall allow a user to create an approved stamp annotation | STS011
OA-A-18 | The “Approved” stamp includes the user’s name and date/time the stamp was added on the document | STS011
OA-A-19 | The system shall allow a user to create an accepted stamp annotation | STS011
OA-A-20 | The system shall allow a user to create a rejected stamp annotation | STS011
OA-A-21 | The system shall allow a user to create a reviewed stamp annotation | STS011
OA-A-22 | The system shall allow a user to create a checkmark stamp annotation | STS011
OA-A-23 | The system shall allow a user to create a line annotation | STS010
OA-A-24 | The system shall allow a user to create an arrow annotation | STS010
OA-A-25 | The system shall allow a user to create an ellipse annotation | STS010
OA-A-26 | The system shall allow a user to create a rectangle annotation | STS010
OA-A-27 | The system shall allow a user to create a text box annotation, displaying the annotation comment in the text box | STS010
OA-A-28 | The system shall allow a user to create a free draw annotation | STS010
OA-A-29 | The system shall allow a user to select text from a document | STS009
OA-A-30 | The system shall allow a user to copy selected text from a document | STS009
OA-A-31 | The system shall allow a user to create a highlight annotation | STS009
OA-A-32 | The system shall allow a user to create a strikethrough annotation | STS009
OA-A-33 | The system shall allow a user to create an insert text annotation | STS009
OA-A-34 | The system shall allow a user to create an underline annotation | STS009
OA-A-35 | The system shall allow a user to create an replace text annotation | STS009
OA-A-36 | The system shall allow a user to select the color of an annotation | STS012
OA-A-37 | The system shall allow a user to specify a default color for annotations created by that user (color selection will be persisted if user opens new sessions using the same computer and browser) | STS012
OA-A-38 | The system shall allow a user to enter the comment for each annotation created | STS008
OA-A-39 | The system shall allow for words in a comment to be bolded or italicized | STS008
OA-A-40 | The system shall allow a user to edit the comment of an annotation that they created | STS008
OA-A-41 | The system shall allow a user to reply to an annotation that they created | STS013
OA-A-42 | The system shall allow a user to reply to an annotation that another user created | STS013
OA-A-43 | The system shall allow a user to reply to a reply. Comments are limited to 3 levels deep | STS013
OA-A-44 | The system shall allow a user to select the status of an annotation that they created | STS008
OA-A-45 | The system shall allow a user to select the status of a annotation that another user created | STS008

## Document Transformation

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-T-1 | The system shall automatically transform a PDF document into PNG images | STS005
OA-T-2 | The system shall automatically create a PNG image of each document page | STS005
OA-T-3 | The system shall automatically create a PNG thumbnail image of each document page | STS005
OA-T-4 | The system shall provide a visual indication that the system is processing while the document is being transformed | STS002
OA-T-5 | The system shall display an error message to the user if a document fails to render due to having too many pages | STS002

## Document Export & Offline Annotations

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-E-1 | The system shall allow the user to download a document and its annotations in a PDF format | STS007
OA-E-2 | The system shall allow the user to print a document and its PDF renditions | STS007
OA-E-3 | The system shall allow the user to download the native content (without annotations), if OpenAnnotate has access to the native content file | STS007
OA-E-4 | The system shall allow the user to download/export the PDF rendition for offline annotating | STS007
OA-E-5 | The system shall not prevent other users from adding annotations (online or offline) when a user has a document exported for offline annotations | STS007
OA-E-6 | The system shall allow a user to upload a document that was annotated offline | STS007
OA-E-7 | When uploading an offline annotated document, the system shall replace all annotations previously created by that user | STS007
OA-E-8 | The system shall not modify annotations created or modified by other users when uploading a document that was annotated offline | STS007

## Image Editing

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-IE-1 | The system shall allow the user to rotate a page clockwise | STS016
OA-IE-2 | The system shall allow the user to rotate a page counter- clockwise | STS016
OA-IE-3 | The system shall allow the user to reorder pages in a document | STS016
OA-IE-4 | The system shall allow the user to save the document edits (page rotation and reorder), provided the user has the appropriate permissions | STS016
OA-IE-5 | The system shall allow the user to create a document section consisting of a subset of pages | STS016
OA-IE-6 | The system shall prompt the user to enter a section name and page range when creating a document section | STS016
OA-IE-7 | The system shall allow the user to view a document section | STS016
OA-IE-8 | The system shall create a bookmark for each document section, once the document sectioning is saved | STS016
OA-IE-9 | The system shall allow the user to reorder the document sections | STS016
OA-IE-10 | The system shall allow a user to edit the document sectioning | STS016
OA-IE-11 | The system shall allow the user to delete the sections created for a document | STS016
OA-IE-12 | The system shall indicate the pages that are not included in a document section | STS016

## Redaction

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-RED-1 | The system shall allow the user to redact image and text | STS015
OA-RED-2 | The system shall remove the redacted text from the document’s full-text index | STS015
OA-RED-3 | The system shall be configurable to create a copy of the redacted document or replace the original content file | STS015
OA-RED-4 | The system shall be configurable to provide suggested redactions based on a pattern match (i.e. Social Security Number) | STS015

## Integrations

Requirement ID | Requirement Description | Test Script Mapping
-------|-------|-------|
OA-I-1 | The system shall have the ability to retrieve document annotations from Documentum | STS023
OA-I-2 | The system shall have the ability save document annotations to Documentum | STS023
OA-I-3 | The system shall display supported annotation types originally created through any tool that creates XFDF/FDF annotations such as Adobe and Documentum PDF Annotation Services | STS023
OA-I-4 | The system shall support the viewing of embedded annotations that exist in the document (not as annotation existing in the repository) | STS023
OA-I-5 | The system shall have the ability to retrieve document annotations from Alfresco | STS023
OA-I-6 | The system shall have the ability save document annotations to Alfresco | STS023
OA-I-7 | The system shall have the ability to retrieve document annotations from Hadoop | STS023
OA-I-8 | The system shall have the ability save document annotations to Hadoop | STS023
OA-I-9 | The system shall have the ability to retrieve document annotations from DynamoDB | STS023
OA-I-10 | The system shall have the ability save document annotations to DynamoDB | STS023
OA-I-11 | The system shall allow a user to launch a document in OpenAnnotate from OpenContent Management Suite | STS023
OA-I-12 | The system shall allow a user to launch a document in OpenAnnotate from Documentum Webtop | STS023
OA-I-13 | The system shall allow a user to launch a document in OpenAnnotate from FirstDoc | Tested at Client Sites
OA-I-14 | The system shall allow a user to launch a document in OpenAnnotate from CARA | Tested at Client Sites
OA-I-15 | The system shall allow a user to launch a document in OpenAnnotate from D2 | STS023
OA-I-16 | The system shall allow a user to launch a document in OpenAnnotate from Alfresco Share | STS023
OA-I-17 | For Documentum backends, the system shall allow for integration with Workshare Compare, which is a third-party tool that displays a redline between the document currently being annotated and its previous version within OpenAnnotate | STS023
