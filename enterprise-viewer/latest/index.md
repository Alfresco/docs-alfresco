---
title: Alfresco Enterprise Viewer
---

Alfresco Enterprise Viewer (AEV), formerly OpenAnnotate,  provides high-speed and secure viewing of document, video and audio content with team collaborative annotation, redaction and other modern document capabilities for Alfresco Content Services (ACS). It features collaboration and lightweight PDF editing features.

Enterprise Viewer can be used as a standalone viewer or within applications such as the Alfresco Content Accelerator.

Enterprise Viewer is configured out of the box to allow Annotations on documents that have either their native content or a rendition in the following formats:

* PDF
* JPEG
* GIF
* PNG
* MP3
* MP4

If the documents in your repository are already available in one of the above formats, then you are all set to go! If your documents are not available in one of the above formats, it is easy to write a transformer that will render your documents into one of the above formats. The most common example of this is to configure all `.doc` or `.docx` files to be rendered into a `.pdf` when they are checked into the repository.
