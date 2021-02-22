---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Creating and publishing PDF content

Out-of-the-box and defined configurations make the process of creating and publishing PDF content simple. Upon upload, Microsoft Office \(or Open Office equivalent\) content is automatically converted to PDF format, along with a thumbnail image. Editing the item metadata enables you to provide a title and description that will appear when published. Publishing simply involves adding the web asset to the desired asset collection.

This task assumes you are in the Document Library page component of the Quick Start site and that the **Show Folders** feature is enabled.

1.  Navigate to **Alfresco Quick Start \> Quick Start Editorial \> root \> publications**.

2.  Upload an office file or Open Office equivalent from your computer to this section:

    1.  Click **Upload**.

    2.  Browse your computer to locate and upload the desired file.

    3.  Click **Upload File\(s\)** to upload the selected file.

        An indicator informs you of the upload progress. When 100% displays for the file, you can proceed.

    4.  Click **OK**.

    When the selected content is uploaded to Share, a PDF version of the content is automatically created with the same name. This functionality is in place for all sections of the **Quick Start Editorial** branch of the library.

    In addition to this, the following rendition is configured for the **publications** section: `application/pdf=ws:mediumPublicationThumbnail`. When a PDF document is created from an uploaded content item, this rendition configuration creates a medium thumbnail of the PDF that can be used on the web page. This thumbnail does not appear in the Document Library as a separate item but is available in the background for use by the template.

    As the **research-reports** and **white-papers** subsections are configured to inherit the parent renditions, a medium thumbnail will be created for content uploaded and converted to PDFs in these locations as well.

3.  Locate the PDF version of the uploaded content and click **Edit Metadata** in the associated action list.

4.  Provide a title and description.

    This is the information that will appear on the web page.

5.  Click **Submit**.

6.  Navigate to **Alfresco Quick Start \> Quick Start Editorial \> root \> publications \> collections**.

7.  Locate the folder **section.articles** and click **Edit Metadata** in the associated action list.

8.  Click **Select** and add the PDF version of the uploaded content as a web asset.

9.  Click **Submit**.

    In the Quick Start website, navigate to the Publications landing page to view a thumbnail of the uploaded content. Refresh the page if the changes are not immediately visible.


**Parent topic:**[Publications](../concepts/qs-publications.md)

