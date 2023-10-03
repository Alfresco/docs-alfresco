---
title: Alfresco Document Transformation Engine
---

The Document Transformation Engine is a stable, fast, and scalable solution for high-quality transformations of Microsoft Office documents (Word, Excel, and PowerPoint only) to PDF. It is an enterprise alternative to LibreOffice. It is an Alfresco Content Services module that is enabled with a license key.

The engine features an open architecture and offers the following features:

* **High quality**: The Document Transformation Engine uses genuine Microsoft Office software to transform Word, Excel, and PowerPoint documents to PDF. This guarantees the handling of the supported file types and pixel-perfect transformations, and it corrects previous layout issues in the Share preview feature.

    The Document Transformation Engine can also be used to convert emails to PDFs. This is a useful feature in conjunction with the Outlook Plugin.

* **Scalable**: The Document Transformation Engine communicates with Alfresco Content Services using an HTTP REST API, which means that you can scale up by adding multiple instances of the engine and connecting them through a standard HTTP Network Load Balancer.

* **Stable**: If Microsoft Office can open and transform your document, then so can the Document Transformation Engine. Robust error handling will take care of corrupt and encrypted documents. A Web Console shows you a detailed report if there is a problem during transformation, allowing you to correct documents.

* **Fast**: The Document Transformation Engine is two to three times faster when transforming multi-megabyte Office documents when compared with LibreOffice on the same hardware.

* **Extensible format support**: The Document Transformation Engine supports the transformation of MS Office formats.
