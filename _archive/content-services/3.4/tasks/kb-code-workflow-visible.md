---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Enabling a custom workflow

This configures Alfresco Share so that a previously defined workflow process appears for end users to select and launch the workflow.

1.  Copy the file workflow.get.html.ftl to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\modules\\documentlibrary

    **Note:**

    This includes additional reference to custom workflow.

    workflow.get.html.ftl

    ```
    <#assign el=args.htmlid>
    <script type="text/javascript">//<![CDATA[
     Alfresco.util.ComponentManager.get("${el}").setMessages(${messages});
    //]]></script>
    <div id="${el}-dialog" class="workflow">
    <div id="${el}-title" class="hd"></div>
    <div class="bd">
    <form id="${el}-form" action="" method="post">
    <input type="hidden" name="date" id="${el}-date" value="" />
    <div class="yui-g">
    <h2>${msg("header.type")}</h2>
    </div>
    <div class="field">
    <select id="${el}-type" name="type" tabindex="0">
    <option value="wf:review" selected="selected">Review &amp; Approve</option>
    <option value="wf:articleapproval">KB Article Review &amp; Approve</option>
    <option value="wf:adhoc">Adhoc Task</option>
    </select>
    </div>
    <div class="yui-g">
    <h2>${msg("header.people")}</h2>
    </div>
    <div class="yui-ge field">
    <div class="yui-u first">
    <div id="${el}-peoplefinder"></div>
    </div>
    <div class="yui-u">
    <div id="${el}-peopleselected" class="people-selected"></div>
    </div>
    </div>
    <div class="yui-g">
    <h2>${msg("header.date")}</h2>
    </div>
    <div class="field">
    <input id="${el}-dueDate-checkbox" name="-" type="checkbox" value="${msg("label.due-date.none")}" tabindex="0"/>&nbsp;
    <span id="${el}-dueDate"><label for="${el}-dueDate-checkbox">${msg("label.due-date.none")}</label></span>
    </div>
    <div id="${el}-calendarOverlay" class="calendar-overlay">
    <div class="bd">
    <div id="${el}-calendar" class="calendar"></div>
    </div>
    </div>
    <div class="yui-g">
    <h2>${msg("header.comment")}</h2>
    </div>
    <div class="field">
    <textarea id="${el}-comment" name="description" rows="3" tabindex="0"></textarea>
    <span>${msg("label.comment.max-length")}</span>
    </div>
    <div class="bdft">
    <input type="button" id="${el}-ok" value="${msg("button.assign")}" tabindex="0" />
    <input type="button" id="${el}-cancel" value="${msg("button.cancel")}" tabindex="0" />
    </div>
    </form>
    </div>
    </div>
    ```


**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

