---
title: Share Themes Extension Point
---

The Share web application comes with a number of themes that can be used to set the look and feel of the application. 
It is also possible to create your own custom UI themes.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

The look and feel of the Share user interface is determined by what theme that is currently active, it provides the 
default CSS and image assets used across all pages. There are number of themes available out-of-the-box:

* Light Theme (Default)
* Google Docs
* Green
* Blue
* High Contrast Black
* Yellow

The default theme can be changed via the Share Admin Tools: ![dev-extensions-share-admin-console-change-theme]({% link content-services/images/dev-extensions-share-admin-console-change-theme.png %}){:height="18px" width="18px"}

You set the theme for the whole Share UI, but you can also configure a theme per site.

It is possible to create a new custom theme based on one of these existing themes. The way to do that is to start by 
copying one of the themes under `alfresco/tomcat/webapps/share/themes` directory to a new directory under 
`share-amp/src/main/amp/web/themes`. Then update it with a new Theme ID and define the new Theme for Surf by adding a 
file to the `alfresco/web-extension/site-data/themes` directory. This XML file looks something like this:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<theme>
    <title>My Red Theme</title>
    <title-id>theme.redTheme</title-id>
</theme>   
```

When a custom theme has been created based on an existing theme it is time to configure the look and feel for it. 
This involves two steps as the Share UI contains both Aikau components and YUI components, and they are styled in 
different ways. See the tutorials section for more information on this.

>**Important:** If you are upgrading to a newer Content Services version, and you are using a custom theme, then it is important to make sure that whatever out-of-the-box theme your custom theme is based on (such as Green Theme) has not changed between versions. For example, upgrading from version 5.0 to 5.1 will mean that all the out-of-the-box themes will have an extra `images/logo-enterprise.png` file. So if you upgrade to a newer version you will also have to upgrade your custom theme to match.

## Deployment - App Server

It's not recommended to manually install a custom Theme directly into the application server and the exploded Share WAR. 
It would mean copying all the theme resource files into `tomcat/webapps/share/themes`, which means the files would be 
gone after a re-deployment or upgrade. 

Use a Share JAR project instead.

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/META-INF/themes` - the theme's resource files goes here, pretty much the stuff you copy from `alfresco/tomcat/webapps/share/themes`
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/themes` - the theme XML file goes here

## More Information

* [Share theme config]({% link content-services/7.2/develop/share-ext-points/share-config.md %}#sharethemeconfig)

## Tutorials

* [Adding a custom Share Theme]({% link content-services/7.2/tutorial/share/style.md %}#addcustomtheme)

## Developer Blogs

* [Share Header Colour Customization](https://hub.alfresco.com/t5/alfresco-content-services-blog/share-header-colour-customization/ba-p/293200){:target="_blank"} - Customizing the Share header via LESS variable override
* [Why Alfresco 5.0.d will be a game changer for UI development](https://hub.alfresco.com/t5/alfresco-content-services-blog/why-alfresco-5-0-d-will-be-a-game-changer-for-ui-development/ba-p/293156){:target="_blank"} - Aikau is from now on in its own JAR
* [Install new Share theme via JAR file](https://hub.alfresco.com/t5/alfresco-content-services-blog/install-new-share-theme-via-jar-file/ba-p/288688){:target="_blank"}


|

