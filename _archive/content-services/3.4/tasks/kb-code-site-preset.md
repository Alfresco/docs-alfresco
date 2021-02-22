---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
option: knowledge base
---

# Configuring a custom site preset

This describes the process for setting up the new site preset. It involves adding the preset, making it available from the Create Site wizard, and adding message bundles for I18N support.

**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

## Adding the preset

1.  Add the additional preset definition to the preset.xml file as follows:

    Add the file presets.xml to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-data\\presets

    **Note:** The following file fragment should be included into the existing presets.xml file in this directory. Copy this file out of the share.war file or locate it in the sample files ZIP distribution.

    presets.xml

    ```
    <preset id="kb-site-dashboard">
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
             <url>/components/dashlets/site-welcome</url>
          </component>
          <component>
             <scope>page</scope>
             <region-id>component-2-1</region-id>
             <source-id>site/${siteid}/dashboard</source-id>
             <url>/components/dashlets/activityfeed</url>
          </component>
          <component>
             <scope>page</scope>
             <region-id>component-2-2</region-id>
             <source-id>site/${siteid}/dashboard</source-id>
             <url>/components/dashlets/knowledgebase</url>
          </component>
          <component>
             <scope>page</scope>
             <region-id>component-3-1</region-id>
             <source-id>site/${siteid}/dashboard</source-id>
             <url>/components/dashlets/site-links</url>
          </component>
       </components>
       <pages>
          <page id="site/${siteid}/dashboard">
             <title>Knowledge Base Site Dashboard</title>
             <title-id>page.kbSiteDashboard.title</title-id>
             <description>Knowledge Base site's dashboard page</description>
             <description-id>page.kbSiteDashboard.description</description-id>
             <template-instance>dashboard-3-columns</template-instance>
             <authentication>user</authentication>
             <properties>
                <sitePages>
                   [{"pageId":"knowledgebase"}, {"pageId":"documentlibrary"}, 
                    {"pageId":"links"},{"pageId":"discussions-topiclist"}]
                </sitePages>
             </properties>
          </page>
       </pages>
    </preset>
    ```


## Overriding the Create Site dialog list

This overrides the scriptable controller for the `create-site` web script. It overrides the Create Site web script controller by copying in a new JavaScript file that gets picked up instead of the out-of-the-box one.

-   Add the file create-site.get.js to the directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension\\site-webscripts\\org\\alfresco\\modules

    create-site.get.js

    ```
    var sitePresets = [
       {id: "site-dashboard", name: msg.get("title.collaborationSite")},
       {id: "kb-site-dashboard", name: msg.get("title.kbSite")}
    ];
    model.sitePresets = sitePresets;
    ```


