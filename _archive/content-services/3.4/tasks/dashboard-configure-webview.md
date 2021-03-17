---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Configuring the Web View personal dashlet

You can configure the Web View personal dashlet to display any website on your dashboard. View the website within the dashlet or click the dashlet title to open the website in a separate window.

To perform this task, you must first configure your personal dashboard to display the Web View personal dashlet. By default, this dashlet displays the website www.alfresco.com.

1.  Click **My Dashboard** on the toolbar if your personal dashboard is not already displayed.

2.  On the Web View dashlet, click **Configure**.

    The Configure Web View Dashlet page opens.

3.  In the **Link Title** field, type the text you want to appear in the dashlet header.

    If you do not specify a title, the dashlet header will display the URL.

4.  In the **URL** field, type the link of the website you want to display within the dashlet.

    **Important:** Ensure the URL entered does not contain the JavaScript code `if(self.parent.frames.length!=0)self.parent.location=document.location;`. This, or similar, code causes the referenced website to open directly in the browser, rather than in the Web View dashlet. This will lead to problems viewing the current dashboard \(personal or site\).

5.  Click **OK**.


The Configure Web View Dashlet page closes and the Web View dashlet displays the website for the URL specified.

**Parent topic:**[Your personal dashboard](../concepts/dashboard-use.md)

**Related information**  


[Customizing your personal dashboard](dashboard-customize.md)

