---
title: Test installation
---

Installation testing checks that Alfresco Content Services is successfully installed and it's working as expected after installation.

Some of the points that need to be checked prior to testing your installation are:

* Verify the prerequisites you need to install.
* Verify that, after a successful install, the application works as per the specification document and meets user needs.
* On uninstall, check that all previously installed files and registry entries are removed as expected.

## Post-installation checks

Once you've successfully installed Alfresco Content Services, test and gain familiarity with the core features and functions.

Here are some tips to familiarize yourself.

> **Note:** We recommend that you create a test site for testing purpose and put all your test data in that site.

* Can you login using your user name and password. See [Logging in](#LINK-tasks/gs-login.md).
* Can you create a site. See [Creating a new site](#LINK-tasks/gs-site-create.md).
* Can you add new users to the site. See [Adding users to a site](#LINK-tasks/members-invite.md).
* Can you add pages to the site. See [Adding pages to a site](#LINK-tasks/gs-customize-site.md).
* Can you add content to a site library. See [Adding content items](#LINK-tasks/gs-content-add.md).
* Can you copy or move content from its current location to another folder or any other site. See [Copying content](#LINK-tasks/library-item-copy.md) and [Moving content](#LINK-tasks/library-item-move.md).
* Can you update content. See [Updating content](#LINK-tasks/library-item-upload.md).
* Can you manage permissions for a user or a group for accessing content. See [Managing content permissions](#LINK-tasks/library-item-permissions.md).
* Can you add a new rule to a folder in the site library and check if it works. See [Adding a new rule](#LINK-tasks/library-folder-rules-new.md).
* Can you edit the new rule. See [Editing a rule](#LINK-tasks/library-folder-rules-edit.md).
* Can you schedule events, such as meeting, for your team. See [Scheduling events](#LINK-tasks/gs-webinar-schedule.md).

## Post-installation checks (clustered environment)

Once you've successfully installed and configured Alfresco Content Services in a distributed/clustered environment, make sure that the features and customizations you've added work properly.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create a test site for testing purposes, and put all your test data in that site.

* Check that the application server is running.
* Can you login using your user name and password. See [Signing in](#LINK-tasks/gs-login.md).
* Check that various components are communicating with each other.
* For a clustered installation, check if when one node is down, the request is forwarded to the next available node.
* Check if clustering is working properly by running the [cluster validation tool](#LINK-tasks/adminconsole-reposerverclustering.md) in the Admin Console.
* Check if you are using a clustering-enabled license.
* Change the cluster-related properties in the `alfresco-global.properties` file, and check if all the nodes are up and running.

> **Note:** After you've finished testing, remember to delete the test site or test data in order to clear your database.
