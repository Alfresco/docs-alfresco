---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: user
---

# Smart spaces and scripting

Using rules and scripting let you wire custom business logic into a space in the Alfresco repository without the need for any Java code, compilers, or server restarts.

You can tell your spaces how to behave when certain things occur to them or within them. For example, you could tell your spaces to perform specific actions when content is placed within, such as launch workflows, automatically tag content, or fire off emails to notify collaborators of updates and activities.

Alfresco provides out-of-the-box event handling for interactions with spaces and content, and fires events when interactions occur between a user or the environment and a piece of content. These events are like signals that your custom code or scripts can listen for and then react accordingly.

**Aspects** let you catch these signals and act on them, providing a code-level interface for intercepting the events and triggering a repository action as a response. This means that you could write custom aspects to wire in behavior behind your content spaces. You can write custom handlers along with unit and integration tests. When you do not need as much rigor, Alfresco provides simple user interface tools for applying business logic behind your spaces.

**Rules** let you describe actions that trigger when one or more conditions are met. For example, if a rule has a single condition for the content item’s `mimetype` property to equal `application/word`, the rule will only trigger for Microsoft Word documents. When a rule triggers, it fires off one or more repository actions that you configure.

For example, you may tell the rule to copy the content item to another place in the repository, or have it transform the content into another MIME type, such as PDF. Many repository actions are available out of the box or you can add your own.

You can also create scriptable actions using server-side JavaScript. You can write your own JavaScript files and have them do anything you want to your content. You can define JavaScript files in one of two places:

-   A file in the application classpath
-   Content in the Data Dictionary



**Parent topic:**[Configuring Alfresco Explorer extensions](../concepts/kb-explorer-ext.md)

