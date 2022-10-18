---
title: Alfresco Enterprise Viewer Feature Matrix
---

## Introduction

OpenAnnotate is a tool that allows a user to create, share, and view annotations on a document.  The tool integrates with rendering software to convert the pages of a document into PNG images that can be viewed and annotated though any web browser, eliminating the dependency on specific client viewing applications.  This tool can run as a standalone tool, or can be launched via existing client interfaces such as TSG’s OpenContent Management Suite, OpenText (Documentum) interfaces and Alfresco interfaces.

## Purpose and Scope

This document will describe the requirements and constraints to follow in building this system. The intended audience for this document includes the application owner, the project manager, development team, and clients.

## Application Interface

The user interfaces can be accessed through Microsoft Internet Explorer 11+, Mozilla Firefox, and Google Chrome browsers.

* OpenAnnotate can be configured to interface with the following software:
* OpenContent Management Suite
* OpenText/Documentum Webtop
* OpenText/Documentum D2 (embedded or launch in new tab)
* FirstDoc
* CARA
* Alfresco Share (embedded or launch in new tab)
* Alfresco Development Framework (ADF)
* Custom application

## Functional Requirements

### Document and Annotation View

### Form Controls

Requirement ID| Requirement Text
-------- | ----
OA-DA-1 | The system shall allow a user to view a document
OA-DA-2 | The system shall display the first page of document by default
OA-DA-3 | The system shall allow a user to view the next page of a document
OA-DA-4 | The system shall allow a user to view the previous page of a document
OA-DA-5 | The system shall allow a user to scroll between pages of a document.
OA-DA-6 | The system shall allow a user to enter a document page number and display that page upon entry
OA-DA-7 | The system shall display the current page number of a document
OA-DA-8 | The system shall display the total number of pages in a document
OA-DA-9 | The system shall allow a user to zoom in to a document page
OA-DA-10 | The system shall allow a user to zoom out of a document page
OA-DA-11 | The system shall allow a user to zoom to fit the document page width to the frame
OA-DA-12 | The system shall allow a user to zoom to fit the document page height to the frame
OA-DA-13 | The system shall allow a user to view document annotations
OA-DA-14 | The system shall display all annotations that exist on the current document page
OA-DA-15 | The system shall visually indicate the location of an annotation on the document page
OA-DA-16 | The system shall allow a user to view the text/comment associated with an annotation
OA-DA-17 | The system shall allow a user to view the name of the user who created an annotation
OA-DA-18 | The system shall be configurable to allow a user to view the date and time the annotation was created or modified. Date and time will be based on server settings.
OA-DA-19 | The system shall display how long ago an annotation was created (X seconds, minutes, hours, days, etc.)
OA-DA-20 | The system shall automatically save annotations upon creation.
OA-DA-21 | The system shall allow a user to hide the text associated with an annotation
OA-DA-22 | The system shall display annotations when a document is zoomed in
OA-DA-23 | The system shall allow a user to view a summary of all annotations for a document
OA-DA-24 | The system shall allow a user to hide the summary of all annotations for a document
OA-DA-25 | The system shall display the user, text and page number for each annotation displayed in the annotation summary
OA-DA-26 | The system shall display the corresponding document page and annotation when a user clicks on an annotation from the annotation summary list
OA-DA-27 | The system shall allow the user to filter the annotations displayed in the annotation summary page.
OA-DA-28 | The system shall allow the user to filter annotations based on a text string, created by, annotation type, and annotation status.
OA-DA-29 | The system shall hide the annotations on the document when they are filtered in the annotation summary page.
OA-DA-30 | The system shall allow the user to hide all annotations when viewing the document in OpenAnnotate
OA-DA-31 | The system shall allow the user to export a summary of all annotations including replies and status values to Excel
OA-DA-32 | The system shall allow the user to view a printable summary of all annotations including replies and status values in a browser window.
OA-DA-33 | The system shall allow a user to view bookmarks in a document
OA-DA-34 | The system shall display the corresponding document page when a user clicks on a bookmark
OA-DA-35 | The system shall allow a user to hide the list of bookmarks for a document
OA-DA-36 | The system shall allow a user to view attachments embedded in the PDF file.
OA-DA-37 | The system shall allow a user to hide attachments embedded in the PDF file
OA-DA-38 | The system shall generate a thumbnail for each page of a document
OA-DA-39 | The system shall display the corresponding document page when a user clicks on a thumbnail
OA-DA-40 | The system shall allow the user to hide the thumbnail view
OA-DA-41 | The system shall allow a user to search the text within the document for a given search entry
OA-DA-42 | The system will highlight the matching text when the user executes a text search in OpenAnnotate
OA-DA-43 | The system will allow a user to navigate (jump to) to matching instances of the searched text.
OA-DA-44 | The system shall allow a user to view other users who are viewing the same document
OA-DA-45 | The system shall allow a user to view the annotations that other users have created
OA-DA-46 | The system shall allow a user to chat with other users that are viewing the same document
OA-DA-47 | The system shall maintain internal document hyperlinks
OA-DA-48 | The system shall contain the ability to display document load time information
OA-DA-49 | The system will alert the user if there are PDF widgets that it cannot display.
OA-DA-50 | OpenAnnotate interface will display in the language specified by the operating system, provided the appropriate localization file is created and installed.

### Annotating

Requirement ID| Requirement Text
-------- | ----
OA-A-1 | The system shall allow a user to create an annotation on the page(s) that are being currently displayed
OA-A-2 | The system shall capture the name of the user who created an annotation
OA-A-3 | The system shall capture the date and time the annotation was created. Date and time will be based on server settings
OA-A-4 | The system shall capture the date and time the annotation was last modified. Date and time will be based on server settings
OA-A-5 | The system shall allow a user to edit an annotation that they created
OA-A-6 | The system shall prevent a user from editing an annotation created by another user
OA-A-7 | The system shall allow a user to delete an annotation that they created
OA-A-8 | The system will delete all annotation replies, including those created by other users, when the annotation is deleted.
OA-A-9 | The system shall prevent a user from deleting an annotation created by another user
OA-A-10 | The system shall automatically save annotations  
OA-A-11 | The system shall allow a user to forcibly save the annotations created by them
OA-A-12 | The system shall allow a user to refresh the annotations created by them (only applies when collaboration mode is not enabled).
OA-A-13 | The system shall allow a user to undo the last change they created on the document
OA-A-14 | The system shall allow a user to redo the last change they created on the document
OA-A-15 | The system shall allow a user to create a sticky note annotation
OA-A-16 | The system shall allow the user to create an attachment annotation supporting the uploading of one or more documents
OA-A-17 | The system shall allow a user to create an approved stamp annotation
OA-A-18 | The “Approved” stamp includes the user’s name and date/time the stamp was added on the document.
OA-A-19 | The system shall allow a user to create an accepted stamp annotation
OA-A-20 | The system shall allow a user to create a rejected stamp annotation
OA-A-21 | The system shall allow a user to create a reviewed stamp annotation
OA-A-22 | The system shall allow a user to create a checkmark stamp annotation
OA-A-23 | The system shall allow a user to create a line annotation
OA-A-24 | The system shall allow a user to create an arrow annotation
OA-A-25 | The system shall allow a user to create an ellipse annotation
OA-A-26 | The system shall allow a user to create a rectangle annotation
OA-A-27 | The system shall allow a user to create a text box annotation, displaying the annotation comment in the text box
OA-A-28 | The system shall allow a user to create a free draw annotation
OA-A-29 | The system shall allow a user to select text from a document
OA-A-30 | The system shall allow a user to copy selected text from a document
OA-A-31 | The system shall allow a user to create a highlight annotation
OA-A-32 | The system shall allow a user to create a strikethrough annotation
OA-A-33 | The system shall allow a user to create an insert text annotation
OA-A-34 | The system shall allow a user to create an underline annotation
OA-A-35 | The system shall allow a user to create an replace text annotation
OA-A-36 | The system shall allow a user to select the color of an annotation
OA-A-37 | The system shall allow a user to specify a default color for annotations created by that user (color selection will be persisted if user opens new sessions using the same computer and browser)
OA-A-38 | The system shall allow a user to enter the comment for each annotation created
OA-A-39 | The system shall allow for words in a comment to be bolded or italicized.
OA-A-40 | The system shall allow a user to edit the comment of an annotation that they created
OA-A-41 | The system shall allow a user to reply to an annotation that they created
OA-A-42 | The system shall allow a user to reply to an annotation that another user created
OA-A-43 | The system shall allow a user to reply to a reply. Comments are limited to 3 levels deep.
OA-A-44 | The system shall allow a user to select the status of an annotation that they created
OA-A-45 | The system shall allow a user to select the status of a annotation that another user created

### Document Transformation

Requirement ID| Requirement Text
-------- | ----
OA-T-1 | The system shall automatically transform a PDF document into PNG images
OA-T-2 | The system shall automatically create a PNG image of each document page
OA-T-3 | The system shall automatically create a PNG thumbnail image of each document page
OA-T-4 | The system shall provide a visual indication that the system is processing while the document is being transformed
OA-T-5 | The system shall display an error message to the user if a document fails to render within a configured timeout period

### Document Export & Offline Annotations

Requirement ID| Requirement Text
-------- | ----
OA-E-1 | The system shall allow the user to download a document and its annotations in a PDF format
OA-E-2 | The system shall allow the user to print a document and its PDF renditions
OA-E-3 | The system shall allow the user to download the native content (without annotations), if OpenAnnotate has access to the native content file
OA-E-4 | The system shall allow the user to download/export the PDF rendition for offline annotating.
OA-E-5 | The system shall not prevent other users from adding annotations (online or offline) when a user has a document exported for offline annotations
OA-E-6 | The system shall allow a user to upload a document that was annotated offline
OA-E-7 | When uploading an offline annotated document, the system shall replace all annotations previously created by that user
OA-E-8 | The system shall not modify annotations created or modified by other users when uploading a document that was annotated offline

### Image Editing

Requirement ID| Requirement Text
-------- | ----
OA-IE-1 | The system shall allow the user to rotate a page clockwise
OA-IE-2 | The system shall allow the user to rotate a page counter- clockwise
OA-IE-3 | The system shall allow the user to reorder pages in a document.
OA-IE-4 | The system shall allow the user to save the document edits (page rotation and reorder), provided the user has the appropriate permissions.
OA-IE-5 | The system shall allow the user to create a document section consisting of a subset of pages
OA-IE-6 | The system shall prompt the user to enter a section name and page range when creating a document section
OA-IE-7 | The system shall allow the user to view a document section
OA-IE-8 | The system shall create a bookmark for each document section, once the document sectioning is saved.
OA-IE-9 | The system shall allow the user to reorder the document sections.
OA-IE-10 | The system shall allow a user to edit the document sectioning
OA-IE-11 | The system shall allow the user to delete the sections created for a document
OA-IE-12 | The system shall indicate the pages that are not included in a document section

### Redaction

Requirement ID| Requirement Text
-------- | ----
OA-RED-1 | The system shall allow the user to redact image and text.
OA-RED-2 | The system shall remove the redacted text from the document’s full-text index
OA-RED-3 | The system shall be configurable to create a copy of the redacted document or replace the original content file.
OA-RED-4 | The system shall be configurable to provide suggested redactions based on a pattern match (i.e. Social Security Number).

### Integrations

Requirement ID| Requirement Text
-------- | ----
OA-I-1 | The system shall have the ability to retrieve document annotations from Documentum
OA-I-2 | The system shall have the ability save document annotations to Documentum
OA-I-3 | The system shall display supported annotation types originally created through any tool that creates XFDF/FDF annotations such as Adobe and Documentum PDF Annotation Services
OA-I-4 | The system shall support the viewing of embedded annotations that exist in the document (not as annotation existing in the repository).
OA-I-5 | The system shall have the ability to retrieve document annotations from Alfresco
OA-I-6 | The system shall have the ability save document annotations to Alfresco
OA-I-7 | The system shall have the ability to retrieve document annotations from Hadoop
OA-I-8 | The system shall have the ability save document annotations to Hadoop
OA-I-9 | The system shall have the ability to retrieve document annotations from DynamoDB
OA-I-10 | The system shall have the ability save document annotations to DynamoDB
OA-I-11 | The system shall allow a user to launch a document in OpenAnnotate from OpenContent Management Suite
OA-I-12 | The system shall allow a user to launch a document in OpenAnnotate from Documentum Webtop
OA-I-13 | The system shall allow a user to launch a document in OpenAnnotate from FirstDoc
OA-I-14 | The system shall allow a user to launch a document in OpenAnnotate from CARA
OA-I-15 | The system shall allow a user to launch a document in OpenAnnotate from D2
OA-I-16 | The system shall allow a user to launch a document in OpenAnnotate from Alfresco Share
OA-I-17 | The system shall allow for integration with Workshare Compare, which is a third-party tool that displays a redline between the document currently being annotated and its previous version within OpenAnnotate.
