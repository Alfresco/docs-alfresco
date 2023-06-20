---
title: Limitations
---
This section describes some general limitations of Alfresco Content Accelerator, such as CMIS Mode, Folder Terms Action, and Folder Redact Action.

## CMIS Mode

CMIS Mode is experimental and should not be enabled from Application Config options. It may be removed in a future release.

## Folder Terms Action

* Documents must have Full Text searchable content.
* Images are not considered for the folder terms action. This action currently is not meant to scale to acting upon a large number of documents.
* Limited to searching for a maximum of 10-20 terms.  This actual number can be higher or lower based on server resources.
* Term picklists cannot be dependent upon dynamic input.
* Term results do not update automatically when new documents are added to the folder or existing documents are modified.  To see any updates, the user must manually refresh the data in the action UI using the provided **reindex** button.

## Folder Redact Action

* Only PDFs or documents with a PDF rendition are possible to redact.
* Only OCR’d PDFs are available to be redacted as part of this action.
* Folders must contain less than 50 redactable documents.  Actual number may vary based on environmental factors, but the action currently is not meant to scale to acting upon a large number of documents.

## Send Combined Collection Email

Action is experimental but can be configured and supported by Hyland Services.
