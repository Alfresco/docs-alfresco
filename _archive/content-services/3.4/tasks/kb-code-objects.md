---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: knowledge base
---

# Configuring the Alfresco Share form

Alfresco Share comes with the ability to render metadata forms for viewing and editing content objects. You just need to provide the form definitions and associate them to your `kb:article` aspect within the Alfresco Share configuration file.

1.  Add the custom Alfresco Share configuration file as follows:

    Add the file share-config-custom.xml to:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\web-extension

    share-config-custom.xml

    ```
    <alfresco-config>
       <!-- Put Share Client in debug mode -->
       <!--
          <config replace="true">
             <flags>
                <client-debug>true</client-debug>
                <client-debug-autologging>true</client-debug-autologging>
             </flags>
          </config>
       -->
    
       <!-- Add a custom page type -->
       <config evaluator="string-compare" condition="SitePages" replace="true">
          <pages>
             <page id="calendar">calendar</page>
             <page id="wiki-page">wiki-page?title=Main_Page</page>
             <page id="documentlibrary">documentlibrary</page>
             <page id="discussions-topiclist">discussions-topiclist</page>
             <page id="blog-postlist">blog-postlist</page>
             <page id="links">links</page>
             <page id="tasks">tasks</page>
             <page id="knowledgebase">knowledgebase</page>
          </pages>
       </config>
    
       <!-- Specify another theme as the default theme -->
       <config evaluator="string-compare" condition="WebFramework">
          <web-framework>
             <application-defaults>
                <theme>default</theme>
             </application-defaults>
          </web-framework>
       </config>
    
       <!-- Form definition for cm:content -->
       <config evaluator="node-type" condition="cm:content">
          <forms>
             <form>
    
                <!-- 2 column template -->
                <edit-form template="/2-column-edit-form.ftl" />
    
                <field-visibility>
    
                   <show id="sys:node-dbid" for-mode="view" />
    
                   <show id="kb:articletype" />
    
                   <show id="kb:status" for-mode="view" />
    
                </field-visibility>
    
                <appearance>
                   <field id="sys:node-dbid" label="KBID" 
                          description="Knowledge Base ID" />
                   <field id="kb:articletype" label="Article Type" 
                          description="Knowledge Base Article Type" />
                   <field id="kb:status" label="Status" 
                          description="Approval Status" />
                </appearance>
             </form>
          </forms>
       </config>
    
    </alfresco-config>
    ```

2.  If any file of the same name exists, overwrite it.


**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

