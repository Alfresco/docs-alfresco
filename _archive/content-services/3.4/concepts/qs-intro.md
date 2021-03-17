---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Using Alfresco Web Quick Start

Web Quick Start is a set of website design templates, built on top of the powerful Alfresco Share content management and collaboration framework. With Web Quick Start, developers can rapidly build customized, dynamic web applications with powerful content management features for the business users—without having to start from scratch.

**Note:** You can use the **Search topics** button to narrow the search scope to just this topic, or to this topic and its subtopics.

-   Click the **Search topics** button ![Search Topics icon](../topics/../images/e_quick_search_multi.gif) in the **Contents** toolbar.
-   Select **Search selected topic** or **Search selected topic and all subtopics** from the menu. A search window appears.
-   Enter your search query in the search window and click **OK**. The search results are listed in the **Search Results** view.

## A flexible platform for web developers

Often when new websites and web applications are created for new business initiatives, the initial focus is solely on the customer who is going to be visiting the website. Dynamic web applications are created using modern frameworks—like Spring Surf \(for Spring MVC\)—on top of lightweight, open source databases to serve up dynamic content. The problem comes when the business users \(content owners\) want to begin updating the content. Now developers have to tackle adding content management features instead of front-end website improvements.

Web Quick Start is a customizable example of a dynamic website built in Spring Surf—but with an Alfresco Share content repository for full-featured content management built right in. Now developers can stay focused on end-user functionality and let Alfresco Share take care of content management for the business.

## Collaborative web content creation

Users need the flexibility to use their tool of choice when creating and updating web content. Web Quick Start provides:

-   **In context web editing:**Using standard web browsers, users can select content from the editorial site by navigating the website and edit it right in their browser.
-   **Office-to-Web:**Users can draft content using MS Office, collaborate in real time through Google Docs, and then use automated rules to publish to the web \(maintaining the CSS standards of the site\).
-   **Shared Network Drive:** Leveraging industry standards \(CIFS\) users can map the web library as if it were just another network drive. This allows users to simply drag-and-drop new web content from their desktop to the web.
-   **Powerful sharing features:** Alfresco’s Share interface allows for easy sharing, collaboration, and co-authoring, along with automated rules and worflows, to help manage the review, approval, and publish process.

The Alfresco web library provides support for all web based content \(including text, images, video, and audio files\).

## Easy administration

Web Quick Start makes it easy for non-technical users to change the website without the need to resort to development. Given the right security setting users can:

-   **Create new sites:** Sites can be created to support specific marketing campaigns \(such as a new micro-site to support the launch of the next video game\). A simple wizard guides the user through the site creation process.
-   **Modify navigation:** Site navigation can be modified without the need to reprogram or use complex XML configuration files.
-   **Define dynamic content collections:**Content owners can define dynamic content sets that will automatically update each time a user visits the site, such as showing the latest three customer case studies on the home page.

## An open platform

Distributed under the Apache software license, Web Quick Start provides the perfect development platform for building content-driven, Java based web applications. Web Quick Start is built using open source software and open standards including Java, CMIS, Spring, Spring Surf, and REST.

-   **[Getting Started](../concepts/qs-introduction.md)**  
Alfresco Web Quick Start is a sample web application built on the Alfresco WCM platform. It provides an end-to-end WCM example including an authoring and publishing environment using Alfresco Share and a web application built using Spring MVC, Spring Surf, and OpenCMIS. The website is delivered dynamically using Alfresco as a CMIS runtime.
-   **[Before you begin](../concepts/qs-before-begin.md)**  
The Web Quick Start demo includes two different sets of sample website data, each one representing a different industry.
-   **[Becoming familiar with the content](../concepts/qs-understand-content.md)**  
Before proceeding with the Web Quick Start tasks, it is important to take some time to understand the Quick Start terminology and the structure of the website content as it exists in Share.
-   **[Home page](../concepts/qs-homepage.md)**  
In the Quick Start Share site, the **root** section of the **Quick Start Editorial** branch drives the content and configuration of the website Home page.
-   **[News](../concepts/qs-news.md)**  
In the Quick Start Share site, the **root \> news** section drives the content and configuration of the News landing page and its subsections—the Global Economy, Companies, and Markets pages—on the Quick Start website.
-   **[Publications](../concepts/qs-publications.md)**  
In the Quick Start Share site, the **root \> publications** section drives the content and configuration of the Publications landing page and its subsections—the Research Reports and White Papers pages—on the Quick Start website.
-   **[Working with visitor feedback](../concepts/qs-blogs.md)**  
Visitors to the Quick Start website are able to provide feedback in two ways: by commenting on a blog post and by submitting a form on the Contact page. All visitor feedback received from these two sources is captured in the Data Lists page component of the Quick Start Share site where it can be managed.
-   **[Publishing content](../tasks/qs-publish-workflow.md)**  
Publishing in the Web Quick Start site is based on a workflow driven model. Once site content associated with a workflow task is approved, a copy of the content is promoted from the Quick Start Editorial folder to the Quick Start Live folder.
-   **[Reference](../references/qs-ref-intro.md)**  
This section provides additional information for using the Web Quick Start demo in Share.

**Parent topic:**[Using Web Content Management \(WCM\)](../concepts/cuh-wcm-intro.md)

