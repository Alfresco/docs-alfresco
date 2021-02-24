---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Configuring the Web View dashlet

Configure the Web View dashlet to display any website.

To perform this task your personal dashboard to display must be configured to display the Web View dashlet.

1.  Click the Configure icon on the Web View dashlet header.

2.  In the **Link Title** field type the text you want to appear in the dashlet header.

    If you don't specify a title the dashlet header displays the URL of the website you specify.

3.  In the **URL** field type the link to the website you want to display in this dashlet.

    **Important:** Ensure the URL entered does not contain the JavaScript code `if(self.parent.frames.length!=0)self.parent.location=document.location;`. This or similar code causes the referenced website to open directly in the browser rather than in the Web View dashlet. This will lead to problems viewing the current dashboard \(personal or site\).

4.  Click **OK**.


The Web View dashlet displays the website for the URL specified.

**Parent topic:**[Web View dashlet](../tasks/dashlet-webview.md)

