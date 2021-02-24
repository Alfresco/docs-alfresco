---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# What's new in Alfresco

Alfresco is now simpler to use with new features so you can tailor it to your needs.

See what we've been up to below, and follow our latest updates at [Alfrescodocs](https://twitter.com/Alfrescodocs).

**For everyone**

-   [Choose your own home page](whats-new.md#1)
-   [Simple add users to sites](whats-new.md#2)
-   [Become owner of other users content](whats-new.md#3)
-   [Smart Folders](whats-new.md#13)
-   [Unzip content right in Alfresco](whats-new.md#4)
-   [Improved Get Started panel](whats-new.md#5)
-   [Clearer edit buttons](whats-new.md#6)
-   [Improved site labeling](whats-new.md#7)
-   [Grouped actions in the file preview](whats-new.md#8)

**For Alfresco admins and developers**

-   [Quick overview of installed modules](whats-new.md#9)
-   [New installation options for Alfresco](whats-new.md#10)
-   [Installing Alfresco on other web applications](whats-new.md#20)
-   [Model Manager](whats-new.md#17)
-   [Solr sharding](whats-new.md#14)
-   [Support for cross-language search](whats-new.md#19)
-   [Solr certificate authentication](whats-new.md#15)
-   [Cryptographic password hashing](whats-new.md#18)
-   [Improved Developer Documentation](whats-new.md#12)

**Choose your own home page**

You can now set your home page to any page in Alfresco, whether it's a site library, and wiki, or even a specific file.

This can save you time if most of your work is done from a specific Alfresco location, by taking you straight to that screen every time you log in.

On your preferred page just select the new option in your user menu and it's set as your home page. You can change this whenever you want to. See [Setting your home page](../tasks/set-homepage.md) for more.



[back to top](whats-new.md#)

![](../images/hr.png)

**Simple add users to sites**

We've improved and simplified how you add users to a site so it's now quick and easy to do. When you add a user they're automatically added, so no more trying to find lost invitation emails.

There's also in-place info on user roles, so you can make timely, informed decisions about what role to give to new site users.

See [Adding users to a site](../tasks/members-invite.md) for more.

[back to top](whats-new.md#)

![](../images/hr.png)

**Become owner of other users content**

You can now take ownership of files and folders from other users.

This can be really useful if, for example, a user has left the company and you need control of their content.

See [Becoming content owner](../tasks/become-owner.md) for more.

[back to top](whats-new.md#)

![](../images/hr.png)

**Smart Folders**

Smart Folders organize your content so that you can store files across your organization, but view them based on information requirement, not location.

With Smart Folders you can:

-   Find content by what it is, not where it is stored
-   Define stored searches in a template and display them in a hierarchical folder tree
-   Run a search when you open a folder and the results are displayed as the "folder's content"
-   Federate content that is distributed across the repository into a single view or Smart Folder
-   Provide one or more metadata-driven taxonomies to build a folder tree, so that any folder or file can be displayed in multiple folders, appropriate to the business context without the need for filing
-   Automatically classify new files and inherit or map metadata to the file itself
-   Easily replicate Smart Folder structures
-   Apply to existing content without the need to restart Alfresco

See [Smart Folders videos](../topics/smart-video-tutorials.md) to watch the videos.

For more information about using Smart Folders, see [Using Smart Folders](../concepts/sf-using-intro.md).

For more information about configuring Smart Folders, see [Configuring Smart Folders](../concepts/sf-intro.md).

[back to top](whats-new.md#)

![](../images/hr.png)

**Unzip content right in Alfresco**

You can now unzip .zip and .acp files to add their contents to a folder in Alfresco.

So there's no longer any need to download a zip file to see it's contents, you can do it right there in Alfresco.

See [Unzipping content](../tasks/unzip-files.md) for more.

[back to top](whats-new.md#)

![](../images/hr.png)

**Improved Get Started panel**

We found that many users wanted the old dashboard Welcome banner to be different - it took up too much space so they deleted it, but once it was gone they couldn't get it back again.

We've shrunk down the new Get Started panel so it takes up minimal space on your screen. You can use it to link straight to our help videos. And like before you can hide it, only now you also have the option to add it back again.

See [Customizing your dashboard](../tasks/dashboard-customize.md) for more.

[back to top](whats-new.md#)

![](../images/hr.png)

**Clearer edit buttons**

There's now a standardized set of edit buttons in Alfresco, so it's clear what action you're about to perform.

-   Edit in Alfresco
-   Edit in Microsoft Office
-   Edit in Google Docs
-   Edit Offline

[back to top](whats-new.md#)

![](../images/hr.png)

**Improved site labeling**

When you create a site in Alfresco you have the option of making it Public, Moderated, or Private. When users are in a site though it wasn't immediately clear if they were putting up restricted content somewhere that everyone could see it.

Now all sites are labeled with their privacy setting so you have clear visibility of who else will be seeing the content you add.

[back to top](whats-new.md#)

![](../images/hr.png)

**Grouped actions in the file preview**

We've sorted the actions in the file preview into sensible groups, so it's easy to quickly find the action that you're looking for.

[back to top](whats-new.md#)

![](../images/hr.png)

**Quick overview of installed modules**

With the Module Browser you can view all the module packages that have been applied to Alfresco.

See [Viewing module packages](../tasks/admintools-modules.md)

[back to top](whats-new.md#)

![](../images/hr.png)

**New installation options for Alfresco**

Alfresco One ships with three installers:

-   Alfresco One Installer: this is appropriate for the majority of users, and installs everything you require to run Alfresco. It corresponds to the installer used in previous versions of Alfresco.
-   Alfresco One Platform Installer: this installs the Alfresco repository, all required third party components \(for example, ImageMagick\), and links to a variety of developer and admin resources. If you have a clustered environment, you might want to use the Platform installer across these servers.
-   Alfresco One Share Installer: this installs Alfresco Share only, with its own Tomcat instance and the Share Services AMP. You might want to use the Share installer to connect to one or more repositories \(that you have installed using the Platform installer\).

    **Note:** Use the Share installer to connect to a repository that you installed using the Platform installer only. Other setups are not supported.


See [Installing](../concepts/master-ch-install.md) for more information.

[back to top](whats-new.md#)

![](../images/hr.png)

**Installing Alfresco on other web applications**

You can install Alfresco on an application server other than Tomcat, for example, JBoss EAP, Oracle WebLogic Server, and IBM WebSphere.

See [Installing Alfresco on other web applications](../concepts/other-apps-install.md) for more information.

[back to top](whats-new.md#)

![](../images/hr.png)

**Model Manager**

Alfresco provides several out-of-the-box content models for specifying the core content type in the repository. The Model Manager allows you to create and manage your own custom models from within Alfresco Share. This is a user-friendly tool that enables you to add custom types, aspects, and properties to your models.

See [Model Manager](../concepts/admintools-cmm-intro.md) for more information.

[back to top](whats-new.md#)

![](../images/hr.png)

**Solr sharding**

Solr sharding involves splitting a single Solr index into multiple parts, which may be on different machines. When the data is too large for one node, you can break it up and store it in sections by creating one or more shards, each containing a unique slice of the index.

See [Solr sharding](../concepts/solr-shard-overview.md) for more information.

[back to top](whats-new.md#)

![](../images/hr.png)

**Support for cross-language search**

The shared.properties file is used to set configuration that applies to all the cores in a Solr instance. The cross core configuration options to use specific locales for cross-locale searches are also set in this file. Cross language search uses the appropriate stemmed tokens for all locales.

See [About shared.properties file](../concepts/solr-shared-properties.md) for more information.

[back to top](whats-new.md#)

![](../images/hr.png)

**Solr certificate authentication**

Alfresco uses SSL and X509 certificate authentication to secure communication between the repository server and the Solr server. In this communication, SSL not only provides encryption, it is also used for authentication.

To turn off SSL and deactivate authentication between the Alfresco repository and the Solr server, see [Solr certificate authentication](../tasks/running-without-ssl.md).

[back to top](whats-new.md#)

![](../images/hr.png)

**Cryptographic password hashing**

Alfresco uses cryptographic password hashing technique to securely store passwords. All versions of Alfresco prior to Alfresco One 5.1.5 used the MD4 \(Message Digest 4\) and SHA256 hash algorithms \(mainly to support NLTM and CIFS\) to store critical data. Alfresco One 5.1.5 can now use Bcrypt to store passwords but this is configurable. By default, the system uses MD4 to allow users to use MD4 hashed passwords for NTLM and CIFS authentication.

See [Cryptographic password hashing](../concepts/bcrypt-overview.md) for more information.

[back to top](whats-new.md#)

![](../images/hr.png)

**Improved Developer Documentation**

The developer documentation has been completely reorganized, updated and expanded. Platform Extension Points, Share Extension Points, APIs, Services and Protocols are clearly identified and documented. A number of tutorials have been updated to use the Alfresco SDK. External resources have been linked to where useful.

[back to top](whats-new.md#)

![](../images/hr.png)

**Parent topic:**[Alfresco One](../concepts/welcome.md)

