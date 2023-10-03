---
title: Document Library Extension Point
---

The Document Library page has several extension points that can be used to customize its behavior, such as actions.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

The Document Library in Share is probably the most comprehensive Surf page (note that it has not yet been converted to 
Aikau) in the whole application. You will have a number of extension points available so you can customize according to 
customer requirements.

The following list describes the different Document Library sub-extension points:

* **Actions** - The document library page has lots of actions that you can use to manipulate the content you are looking at, whether it is a file or folder, such as Download. It is also possible to add your own actions so you can process content in a domain specific way.
* **Indicators** - A content item in the Document library can have zero or more so called indicators, they can be used to denote certain states of the content, such as a file has been emailed. You can add your own indicators, they would typically be used together with an action.
* **Metadata templates** - Whenever you view a list of folders or files in the Browse view there is a small number of metadata properties displayed. You can define custom metadata templates to control what metadata is displayed for a specific content type.
* **Views** - When you are browsing the Document Library it is possible to select how to view it. By default the Detailed View will be active, but you can also select from the following views: "Simple", "Gallery", "Filmstrip", "Table", "Audio", and "Media". If none of these views fit your needs it is possible to define custom views.

Most of these sub-extension points are actually part of the [Share Configuration]({% link content-services/7.2/develop/share-ext-points/share-config.md %}) 
extension point as they are applied via XML configuration in share-config-custom.xml. It is really just the Actions 
sub-extension point that will involve coding.

The following picture shows an example of how the *Document Actions* looks like in the UI:

![dev-extensions-share-doclib-document-actions]({% link content-services/images/dev-extensions-share-doclib-document-actions.png %})

If you are viewing a Folder instead of a file you will be looking at *Folder Actions*.

There are a number of ways in which these Document Library actions can be implemented. The following picture illustrates:

![dev-extensions-share-doclib-actions-implementation]({% link content-services/images/dev-extensions-share-doclib-actions-implementation.png %})

So an action can be implemented as a client side JavaScript function that calls a repository action or a web script via 
AJAX. And an action can also just link directly to an existing Share Page. And finally, it is possible to have an action 
link to an external page.

Next picture shows you the *views*:

![dev-extensions-share-doclib-views]({% link content-services/images/dev-extensions-share-doclib-views.png %})

The Detailed View is currently active and the drop down to the right shows you the other available views. An *indicator* looks like this for a file:

![dev-extensions-share-doclib-indicator]({% link content-services/images/dev-extensions-share-doclib-indicator.png %})

In this case a workflow was started, and there is a little icon indicating that this file is part of a workflow. The default *metadata template* for files looks like this:

![dev-extensions-share-doclib-metadata-template]({% link content-services/images/dev-extensions-share-doclib-metadata-template.png %})

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml` (Untouched by re-deployments and upgrades)
* The following locations are inside the exploded Share WAR, so **not** recommended, use a [Share JAR Module]({% link content-services/7.2/develop/sdk.md %}#workingshare)) SDK project instead:
* `tomcat/webapps/share/components/documentlibrary/actions` - DocLib Action JavaScript implementation and icon go here
* `tomcat/webapps/share/components/documentlibrary/indicators` - status indicators icons go here

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/META-INF/share-config-custom.xml` - configuration for actions, indicators, views etc
* Or even better, put all the configuration in a Surf Extension Module:
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/doclib-actions-extension-modules.xml` - configuration for actions, indicators, views etc
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/components/documentlibrary` - DocLib Action JavaScript implementation code
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/components/documentlibrary/actions` - DocLib Action icons go here
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/components/documentlibrary/indicators` - Status Indicators icons go here

## More Information

* [Evaluators Extension Point]({% link content-services/7.2/develop/share-ext-points/evaluators.md %})
* [Configure Document Library]({% link content-services/7.2/develop/share-ext-points/share-config.md %}#doclibconfig)
* [See the Rating Extension Point for example DocLib action, form, and evaluator]({% link content-services/7.2/develop/repo-ext-points/ratings.md %})
* [The Site Document Library]({% link content-services/7.2/using/content/index.md %}#document-library)

## Sample Code

* Follow links to Tutorials below, they each have links to source code

## Tutorials

* [Adding a new Document Library action]({% link content-services/7.2/tutorial/share/doclib.md %}#adddoclibaction)
* [Adding a menu item to the "Create..." menu in DocLib]({% link content-services/7.2/tutorial/share/doclib.md %}#addmenuitem2createmenu)
* [Customizing document library views]({% link content-services/7.2/develop/share-ext-points/share-config.md %}#customizedoclibviews)
* [Configure aspect visibility]({% link content-services/7.2/develop/share-ext-points/share-config.md %}#configaspects)
* [Jeff Potts Alfresco Developer Series: Adding Repo and DocLib actions](http://ecmarchitect.com/alfresco-developer-series-tutorials/actions/tutorial/tutorial.html){:target="_blank"} - a very thorough walk-through of how to develop Repository Actions and Document Library actions, a must read.

## Developer Blogs

* [Share Document Library Extensions in v4.0](https://hub.alfresco.com/t5/alfresco-content-services-blog/share-document-library-extensions-in-v4-0/ba-p/287620){:target="_blank"}
