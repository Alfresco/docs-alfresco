---
title: Site Presets Extension Point
---

A site preset contains the initial configuration for a Share site, such as the site Dashboard layout.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

When you access a site the Dashboard layout, with the dashlets in different columns, is determined by the Site Preset 
that has been set for the site type. It looks something like this for the `Collaboration` site type:

```xml
<?xml version='1.0' encoding='UTF-8'?>
      <presets>
          <!-- Well known preset used to generate the default Collaboration Site dashboard -->
          <preset id="site-dashboard">
              <components>         
                  <!-- title -->
                  <component>
                      <scope>page</scope>
                      <region-id>title</region-id>
                      <source-id>site/${siteid}/dashboard</source-id>
                      <url>/components/title/collaboration-title</url>
                  </component>
                  <!-- navigation -->
                  <component>
                      <scope>page</scope>
                      <region-id>navigation</region-id>
                      <source-id>site/${siteid}/dashboard</source-id>
                      <url>/components/navigation/collaboration-navigation</url>
                  </component>
                  <!-- dashboard components -->
                  <component>
                      <scope>page</scope>
                      <region-id>component-1-1</region-id>
                      <source-id>site/${siteid}/dashboard</source-id>
                      <url>/components/dashlets/colleagues</url>
                      <properties>
                      <height>504</height>
                      </properties>
                  </component>
                  <component>
                      <scope>page</scope>
                      <region-id>component-2-1</region-id>
                      <source-id>site/${siteid}/dashboard</source-id>
                      <url>/components/dashlets/docsummary</url>
                  </component>
                  <component>
                      <scope>page</scope>
                      <region-id>component-2-2</region-id>
                      <source-id>site/${siteid}/dashboard</source-id>
                      <url>/components/dashlets/activityfeed</url>
                  </component>
              </components>
              <pages>
                  <page id="site/${siteid}/dashboard">
                      <title>Collaboration Site Dashboard</title>
                      <title-id>page.siteDashboard.title</title-id>
                      <description>Collaboration site's dashboard page</description>
                      <description-id>page.siteDashboard.description</description-id>
                      <template-instance>dashboard-2-columns-wide-right</template-instance>
                      <authentication>user</authentication>
                      <properties>
                          <sitePages>[{"pageId":"documentlibrary"}]</sitePages>
                      </properties>
                  </page>
              </pages>
          </preset>
          ...    
```

Here is some Surf component configuration again. If you are not up to speed on Surf and the Share architecture, then 
read the [Share architecture section]({% link content-services/7.2/develop/software-architecture.md %}#surf-framework). 
The first two `component` definitions sets the title and navigation bar for the site. The rest of the component 
definitions sets the different dashlets that should be displayed on the Dashboard. The last `pages` section is used to 
include the Dashboard page with layout and the different site pages.

This site preset looks like this:

![dev-extensions-share-site-preset-collaboration-site]({% link content-services/images/dev-extensions-share-site-preset-collaboration-site.png %})

The default preset configuration for Share is specified in the `tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/presets/presets.xml` file.

When a new custom page has been added to Share it is not automatically visible in the navigation bar after a site has 
bee created. To have a custom page be part of every new site that is created you can override the site preset for the site type.

Here is an example of how to add a custom page to a site:

```xml
<preset id="site-dashboard">
    <components>         
    ...
    </components>
    <pages>
        <page id="site/${siteid}/dashboard">
            <title>Collaboration Site Dashboard</title>
            <title-id>page.siteDashboard.title</title-id>
            <description>Collaboration site's dashboard page</description>
            <description-id>page.siteDashboard.description</description-id>
            <template-instance>dashboard-2-columns-wide-right</template-instance>
            <authentication>user</authentication>
            <properties>
                <sitePages>[{"pageId":"documentlibrary"},{"pageId":"helloworld"}]</sitePages>
            </properties>
        </page>
    </pages>
</preset>
```

In this case we have added a custom page called `helloworld` to the site, and this page will be directly accessible from inside the site.

>**Note:** When you have set up a site preset, or a user preset, and it has been used by a site or a user. Then those site presets are stored in the database for the site and user. So you cannot change by redefining `presets.xml`.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-data/presets/presets.xml` (Untouched by re-deployments and upgrades)

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/presets/presets.xml`

## Tutorials

* [Adding a new Preset]({% link content-services/7.2/tutorial/share/pages.md %}#customizewscontroller) - this tutorial is not really about site presets, but it starts off by setting up a new user preset.

## Alfresco Developer Blogs

* [Create and Edit Site Dialog](https://hub.alfresco.com/t5/alfresco-content-services-blog/create-and-edit-site-dialog-customization-with-aikau/ba-p/292994){:target="_blank"}
