---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: [knowledge base, developing]
---

# Defining custom site presets

The Create Site wizard in Alfresco Share lets you quickly create and configure new sites. The *Collaboration Site* is available by default. When you create this type of site, Alfresco Share automatically creates your site space and pre-configures the site with pages and site dashboard components. You can configure the default options for the Collaboration Site through Alfresco Share configuration files.

Using the configuration file presets.xml, you can configure new types of Alfresco Share sites. This defines one or more site presets that describe preconfigured sets of pages, dashlets, components, and templates. These elements are bundled together with an ID. A site preset lets you define a fixed set of pages that are available to the site upon creation. It also lets you preconfigure the site dashboard that will be created for the site. This example shows how to create a site preset that defines a Knowledge Base site and preconfigures the site dashboard for the site.

1.  To create a site preset that defines a Knowledge Base site, modify the presets.xml file to include your custom site preset definition.

    ```
    <pages>
       <page id="site/${siteid}/dashboard">
          <title>Knowledge Base Site Dashboard</title>
          <title-id>page.kbSiteDashboard.title</title-id>
          <description>Knowledge Base site's dashboard page</description>
          <description-id>page.kbSiteDashboard.description</description-id>
          <template-instance>dashboard-3-columns</template-instance>
          <authentication>user</authentication>
          <properties>
             <sitePages>[{"pageId":"knowledgebase"}, {"pageId":"documentlibrary"}, 
                         {"pageId":"links"}, {"pageId":"discussions-topiclist"}]
             </sitePages>
          </properties>
       </page>
    </pages>
    ```

    This defines a site preset with four site pages \(Custom Knowledge Base, Document Library, Links, and Discussions\). It specifies that your Knowledge Base site dashboard requires authentication and should default to a three-column layout.

2.  Adjust the drop-down control of the Create Site wizard to configure your new type of site to appear as an option.

    ```
    var sitePresets = [
     {id: "site-dashboard", name: msg.get("title.collaborationSite")},
     **\{id: "kb-site-dashboard", name: msg.get\(“title.kbSite”\)\}**
    ];
    model.sitePresets = sitePresets;
    ```

    The line in bold adjusts the web script to make the Knowledge Base site available as one of the options.

    The Create Site wizard populates that drop-down control by making a callback to a web script on the Alfresco Share server. This hands back `kb-site-dashboard` as an option and uses your resource bundles for I18N support in the Create Site wizard.

3.  Specify components for the preset.

    The following code pre-configures the site dashboard that will be created for the site. You can add descriptions of components to be bound into the dashboard that specify the URL of the dashlet’s web script, as well as the column and row into which to place the dashlet. Each component in the following code snippet specifies the row and the column where it is to appear on the dashboard. Your preset can completely set up the default layout of the site dashboard as well as all the default dashlet bindings.

    ```
    <preset id="kb-site-dashboard">
       <components>
          ...
          <!-- dashboard components -->
          <component>
             <scope>page</scope>
             <region-id>component-1-1</region-id>
             <source-id>site/${siteid}/dashboard</source-id>
             <url>/components/dashlets/site-welcome</url>
          </component>
          <component>
             <scope>page</scope>
             <region-id>component-2-1</region-id>
             <source-id>site/${siteid}/dashboard</source-id>
             <url>/components/dashlets/activityfeed</url>
          </component>
          ...
       </components>
    </preset>
    ```


**Parent topic:**[Configuring custom site pages](../concepts/custom-site-about.md)

