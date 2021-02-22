---
author: Alfresco Documentation
---

# Configuring Smart Folders

Smart Folders organize your content so that you can store files across your organization, but view them based on information requirement, not location.

Stored searches are shown in a folder tree, so that when a user opens a folder, a query is run and the results are displayed in a list. Files are also automatically classified when they are uploaded.

Smart Folders are installed as a core part of Alfresco, so there is no separate AMP file to install or upgrade. The Smart Folders function is disabled by default, and can be enabled in your alfresco-global.properties file by specifying `smart.folders.enabled=true`.

Folders are differentiated by icon:

-   Physical folder: ![Physical folder icon](../images/folder.png)
-   Smart folder: ![Folder with a magnifying glass representing a Smart Folder](../images/sf.png)

Using Smart Folders in this way helps you to manage your information; for example, where you have a number of sources of information, in a variety of folders. Content that might be related to, but not directly involved in your work is also retrieved, depending on the search criteria.

The Smart Folder structure is created by associating a Smart Folder Template with an Alfresco physical folder. Multiple Smart Folder structures can be defined in a single template. For every Smart Folder, the template defines a folder name, search, and filing criteria, along with other properties. New templates are typically defined and added by business analysts, and created by administrators.

The folder structure can be personalised by user, for example, if you create a folder called My Files, you can populate it with files relevant to each user.

Take a look at the videos to learn more: [Smart Folders videos](../topics/smart-video-tutorials.md)

-   **[What is a Smart Folder?](../concepts/sf-whatis.md)**  
Use this information to understand the structure of Smart Folders.
-   **[Prerequisites for using Smart Folders](../concepts/sf-prereqs.md)**  
There are a number of prerequisites for using Smart Folders in Alfresco.
-   **[Planning and implementing Smart Folders](../concepts/sf-config-workflow.md)**  
Consider the business requirements for creating Smart Folders in Alfresco.
-   **[Enabling Smart Folders](../tasks/sf-config-examples.md)**  
As an admin user, you must enable Smart Folders, and specify a Smart Folder Template for use.
-   **[Smart Folders tutorial](../tasks/sf-tutorial.md)**  
In this seven-step tutorial you will create a simple claims management solution.
-   **[Type-based, System, and Custom Smart Folders](../concepts/sf-folder.md)**  
There are three ways to attach Smart Folders to physical folders.
-   **[Metadata inheritance](../concepts/sf-metadata-inheritance.md)**  
You can set files and folders to inherit metadata using Smart Folders in Alfresco.
-   **[Smart Folder Template syntax](../concepts/sf-ref-template-guidance.md)**  
You can build your own Smart Folder Template using these guidelines.
-   **[Smart Folders global properties settings](../concepts/sf-ref-global-props.md)**  
Use this information to understand the full list of alfresco-global.properties settings available for Smart Folders.
-   **[Best practices when using Smart Folders](../concepts/sf-best-practice.md)**  
There are a number of best practices when using Smart Folders in Alfresco.
-   **[Smart Folders technical FAQs](../references/sf-tech-faqs.md)**  
 If you have any technical problems with Smart Folders, try these suggestions to resolve your issue.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

