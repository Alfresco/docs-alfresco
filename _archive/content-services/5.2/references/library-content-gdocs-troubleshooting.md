---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Google Docs FAQs

If you have any problems working with files in Google Docs, have a look through the list to see if there is a way to resolve your issue.

-   [An error is shown when using Google Docs in Internet Explorer \(IE\)](library-content-gdocs-troubleshooting.md#1)
-   [Is the Share button now available in Google Docs?](library-content-gdocs-troubleshooting.md#2)
-   [A blank screen or a warning that you need permission to access an item is displayed](library-content-gdocs-troubleshooting.md#3)
-   [Your document will be "downgraded"](library-content-gdocs-troubleshooting.md#4)
-   [Documents discarded or saved to Alfresco Share are still visible in Google Drive](library-content-gdocs-troubleshooting.md#5)
-   [The Edit in Google Docs option doesn't display](library-content-gdocs-troubleshooting.md#6)
-   [Google Docs spreadsheets appear to be truncated](library-content-gdocs-troubleshooting.md#7)
-   [Why wasn't the Document Title updated after I checked the document back in?](library-content-gdocs-troubleshooting.md#8)
-   [Messages saying "something went wrong... please reload" and "sorry the file does not exist"](library-content-gdocs-troubleshooting.md#9)

**An error is shown when using Google Docs in Internet Explorer \(IE\)**

Google Drive/Google Editor only support the two most recent versions of IE \(11 & 10\). All other versions will see a message indicating that their browser is outdated. \(The same applies to Safari \(not supported on Windows\), Firefox, and Google Chrome – only the last two versions are supported.\)

[back to top](library-content-gdocs-troubleshooting.md#)

**Is the Share button now available in Google Docs?**

The Share button is fully functional.

[back to top](library-content-gdocs-troubleshooting.md#)

**A blank screen or a warning that you need permission to access an item is displayed**

There maybe a conflict between the Google OAuth credentials set on your Alfresco Share account and those you have attempted to open the document with or that you are currently signed into Google with. Sign out of your Google account and sign back into the original account used to edit the document.

[back to top](library-content-gdocs-troubleshooting.md#)

**Your document will be "downgraded"**

When you try to edit a document that can be imported into Google Docs but Google does not allow you to export it in the same format, you see a message to indicate that your document will be downgraded. This should read "upgraded" rather than downgraded.

[back to top](library-content-gdocs-troubleshooting.md#)

**Documents discarded or saved to Alfresco Share are still visible in Google Drive**

Improvements have been made by Google so that this should no longer be an issue.

[back to top](library-content-gdocs-troubleshooting.md#)

**The Edit in Google Docs option is not available**

In some circumstances, the **Edit in Google Docs** option is not available. For example, when trying to edit documents or spreadsheets larger than 2MB and presentations larger than 50MB, or the file type is not supported for editing. You will not see the option when you do not have write permission to the document. The **Edit in Google Docs** option is also not available when using IE8.

[back to top](library-content-gdocs-troubleshooting.md#)

**Google Docs spreadsheets appear to be truncated**

When creating a spreadsheet in Google Docs, and then saving it to Alfresco Share, when editing it again in Google, the rows and columns may appear to be truncated. The spreadsheet is still fully functional and you can add new rows and columns in Google Docs. If you open the document in Excel, you will see that there are no truncation issues.

The issue is caused by Google optimizing the file internals to a minimum so that it can be transferred as a smaller file size.

[back to top](library-content-gdocs-troubleshooting.md#)

**Why wasn't the Document Title updated after I checked the document back in?**

There is a lag between the save time of the title and when it is available through the Google API. So, if you quickly save the document after changing the title, this may result in the title not being updated in Alfresco Share when you check the document back in.

[back to top](library-content-gdocs-troubleshooting.md#)

**Messages saying "something went wrong... please reload" and "sorry the file does not exist"**

When you edit or view a Google Doc from Alfresco Share, it's temporarily stored in Google Docs. If it's checked in or the editing is cancelled from in Share, then this temporary version is removed from Google Drive and is no longer available. The file can be accessed from Share.

[back to top](library-content-gdocs-troubleshooting.md#)

**Parent topic:**[Editing files in Google Docs](../tasks/library-edit-content-googledocs.md)

