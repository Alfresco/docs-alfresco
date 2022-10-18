---
title: Welcome to the Alfresco Enterprise Viewer wiki!
---

Welcome to the Alfresco Enterprise Viewer wiki!  
(Formerly OpenAnnotate)

Alfresco Enterprise Viewer (AEV) provides high-speed and secure viewing of document, video and audio content with team collaborative annotation, redaction and other modern document capabilities for Alfresco Content Services (ACS). It features collaboration and lightweight PDF editing features. While AEV has been productized on Alfresco ACS, it has the unique ability to connect to different repositories through services work product including, but not limited to, Documentum and Hyland Flex (NoSQL).

Alfresco Enterprise Viewer can be utilized as a standalone viewer or can be utilized within applications such as the Alfresco Content Accelerator.

Alfresco Enterprise Viewer is configured out of the box to allow Annotations on documents that have either their native content or a rendition in the following formats:

- PDF
- JPEG
- GIF
- PNG
- MP3
- MP4
- TIFF (when using the ImageMagick transformer)

If the documents in your repository are already available in one of the above formats, then you are all set to go! If your documents are not available in one of the above formats, it is easy to write a transformer that will render your documents into one of the above formats. The most common example of this is in a Documentum or Alfresco repository to configure all .doc or .docx files to be rendered into a pdf when they are checked into the repository.
<!--The following diagram shows a simple representation of how Alfresco Content Services and the Sync Service interact with the Desktop Sync clients. See [Sync Service architecture]({% link sync-service/latest/admin/index.md %}) for more.

![Simple architecture for Sync Service]({% link sync-service/images/sync-simple-arch.png %}) -->
