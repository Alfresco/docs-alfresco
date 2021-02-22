---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: WCM
option: WCM
---

# Using Web Content Management \(WCM\)

Alfresco Web Content Management \(WCM\) is a content management system for your websites and web applications. It allows you to create, develop, and maintain your source code all within one repository.

**Note:** You can use the **Search topics** button to narrow the search scope to just this topic, or to this topic and its subtopics.

-   Click the **Search topics** button ![Search Topics icon](../topics/../images/e_quick_search_multi.gif) in the **Contents** toolbar.
-   Select **Search selected topic** or **Search selected topic and all subtopics** from the menu. A search window appears.
-   Enter your search query in the search window and click **OK**. The search results are listed in the **Search Results** view.

Alfresco WCM extends the capabilities of Alfresco Explorer by providing the following features.

## XML content authoring

WCM adds support for XForms, enabling Content Publishers to create reusable XML content from a simple browser-based form.

In creating a web form, Web Developers upload and register XML Schema \(XSDs\) within a central forms library \(the Web Forms space\) in the Alfresco Data Dictionary. Web Developers and Content Managers can then subscribe individual web projects \(websites or web applications\) to use one or more forms from this library to create and edit content.

Once a web form is associated with and configured for a web project, the Create New Content Wizard utilizes the form, allowing Content Publishers to walk through a step-by-step process for creating XML content.

## Sandboxes

To support the creation and editing of web content, Alfresco provides a Sandbox development model. For any website or web application \(referred to as a web project\), users have their own spaces, called sandboxes, where they can make changes to web content. In the sandbox, a user can add, edit, and delete both folders and files.

Alfresco tracks all content modifications made within a user's sandbox. These changes are maintained independently from changes made by other users working within their own sandboxes.

In this way, large teams of users can work independently on changes to the website without affecting the work of other users. Web developers can modify source code, web designers can change the look and feel of the site, and Content Publishers can create and modify content. All these activities can be done in parallel, in their own separate virtual staging environments \(sandboxes\), without risk of interfering with the changes made by other users.

## Virtualization and in-context preview

Core to sandboxes is the concept of virtualization and in-context preview. Virtualization means that each user, in their own sandbox, has a complete view of their own current, approved, and checked-in content. Each user can see only the contents of their own sandbox and modifications made within a sandbox are visible only to that sandbox’s user.

When previewing any content item \(modified or unmodified\) in a sandbox, Alfresco provides a complete virtual view of the website. This is called in-context preview. This virtual view shows how the site would look if all changes in the sandbox were committed to the live site.

This enables each user to test all changes that they plan to post to the website:

-   Web developers can ensure that code changes to JSP, class files, or JARs are working properly.
-   Web designers can test changes to CSS files.
-   Content Publishers can verify that their XML generates the correct HTML pages.

Sandboxed development, virtualization, and in-context preview allow large, diverse web teams to easily collaborate on changes to the website with reduced risk and higher overall quality.

## Content staging, promotion, workflow, and snapshots

Changes made within a user sandbox, either individual content or entire change sets, can be promoted from that sandbox to the Staging Sandbox using a Submit action.

Submitted changes are routed via workflow to one or more users for review and approval, either serially or in parallel, using Alfresco’s out-of-the-box sample editorial review workflow or any custom-built WCM workflow.

Once content is approved, it is routed to the Staging Sandbox where a snapshot is automatically taken to provide an archive of the current version of the site. This snapshot is maintained over time to provide an audit trail and rollback point for previous versions of the site. Once a snapshot is taken, all committed changes are immediately reflected and available to each user in their own sandbox, enabling all users to consistently QA their potential changes against the latest version of the website.

## Content deployment

For known good snapshots of the Staging Sandbox, the snapshot can be deployed to a remote file server, a remote Alfresco server, or a combination of the two. This integrated content deployment service also provides support for deploying a single web project to multiple remote servers for maximum run-time scalability. When a snapshot is deployed, users are able to monitor the progress of the deployment\(s\). Once complete, a report detailing the most recent deployment is available.

## Content launch and expiration

When promoting content to staging, users can optionally set specific launch and expiration dates on the content set being submitted. When a launch date is set, approved content changes are maintained in their own separate area until the specified launch date and time. Prior to the launch, end-users can preview the future state of the website, immediately promote, or cancel the pending launch. This feature is useful when you want to prepare a new version of your website that is to be deployed on a specific day.

In addition, for any changes promoted to the site, specific expiration dates can be specified for the entire content set or on an item-by-item basis. Upon expiration, users are automatically assigned the expired content item as a task so that they can determine whether the item should be updated or removed from the web project.

-   **[Using Alfresco Web Quick Start](../concepts/qs-intro.md)**  
Web Quick Start is a set of website design templates, built on top of the powerful Alfresco Share content management and collaboration framework. With Web Quick Start, developers can rapidly build customized, dynamic web applications with powerful content management features for the business users—without having to start from scratch.
-   **[Alfresco Web Editor](../concepts/awe-introduction.md)**  
Alfresco Web Editor provides in-context editing functionality for content obtained from an Alfresco repository. This enables you to edit Alfresco content directly in the web page in which it is being viewed.
-   **[Using the AVM](../concepts/avm-intro.md)**  
Today’s websites are becoming more and more complex with greater amounts of dynamic content, interactivity, and user-generated content.

**Parent topic:**[Using Alfresco](../concepts/master-using-intro.md)

