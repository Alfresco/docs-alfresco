---
author: Alfresco Documentation
---

# Customizing \(Web Script Template\) the footer text for a Surf page

|**Name**|Customize the footer text for a Surf page via Web Script Template change.|
|**Extension Point**|[Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules.md)|
|**Description**|This tutorial demonstrates how to customize the page footer Web Script template to add some extra text to the footer. The tutorial walks through how to find the related component and Web Script.|
|**Implementation Steps**|It is often necessary to customize different parts of a Surf Web Script. This tutorial shows you how to customize the template for a Web Script. The approach looks something like this:1.  Find the page component that corresponds to the content that should be changed.
2.  Identify the Web Script that is used to deliver the content.
3.  Identify what part of the Web Script need changing to achieve the customization, in this case the template.
4.  Create your customized version of the \{web script id\}.get.\[html\|json\|..\].ftl file.
5.  Use a Surf Extension module to define the Web Script override.

|
|**Related Information**|This tutorial assumes that you are familiar with the Spring Surf development framework. If you are new to it then read up on it [here](../concepts/dev-extensions-share-architecture-extension-points.md) before starting this tutorial. If you have not already done so you should also review the [Introducing SurfBug](../concepts/dev-extensions-share-surfbug.md) topic as this tool is used in this tutorial.|
|**Source Code**|[Go to code](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-50/all-in-one/customize-webscript-template-share)|

This tutorial assumes you completed the [Installing and Configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md) section and generated an AIO project [as described in this section](alfresco-sdk-tutorials-all-in-one-archetype.md).

Tutorial implementation steps:

1.  Add a new Share AMP module called `customize-webscript-template-share` to the AIO project. Instructions for how to do that can be found [here](alfresco-sdk-advanced-add-custom-amps-aio.md) \(Note. do not add a Repository AMP\).

2.  Identify the Web Script that delivers the content that should be customized.

    For this we use the [SurfBug](../concepts/dev-extensions-share-surfbug.md) tool. Once the tool is activated \(from http://localhost:8080/share/page/surfBugStatus\) we can identify the Web Script as follows:

    ![](../images/dev-extensions-share-tutorials-i18n-customize-page-surfbug.png)

    Here we have scrolled to the bottom of the Dashboard page where the footer is located. Then we have clicked on the last component enclosed in red lines and representing the footer. This brings up the above black box that contains information about what Web Script that is delivering the content for the footer component \(and then also the controller\). In this case it is the footer.get.\* Web Script in package org.alfresco.components.footer that we need to target. You can also identify the Web Script via the url \(i.e. `/components/footer`\).

3.  In the new Share AMP project create a new Web Script override package `org.alfresco.tutorials.customization.footer.template`.

    The directory path that needs to be created is: all-in-one/customize-webscript-template-share/src/main/amp/config/alfresco/web-extension/site-webscripts/org/alfresco/tutorials/customization/footer/template.

    We can choose any package path we want and then specify it in the Surf Extension Module, we will see this in a bit. However, it is important that we use a package path that will not clash with another Extension Module, deployed by some other AMP.

    For example, if we just used org.alfresco.tutorials.customization.footer and then another AMP was deployed with some other customization to the footer, using the same package path. Then if one extension module is undeployed its customizations will still be picked up if the other module is active. This is because both modules are using the same package path.

4.  Add our customization of the Web Script template file in a file named footer.get.html.ftl located in the /tutorials/customization/footer/template directory:

    ```
    <@markup id="additional-footer" target="html" action="before" scope="global">
        <div id="additional-footer">
            Additional Footer!
        </div>
    </@markup>
    ```

    This template will be processed after the out-of-the-box footer template. What we are doing here is just telling the template engine that we want to insert some extra footer content before the out-of-the-box footer content. The location of the new footer content is determined by the `action` attribute, which we set to `before` to get our additional footer text displayed above the original footer text. Specifically it is displayed above the markup section tagged with the `html` id, which we specify with the `target` attribute.

    You can find out the available markup sections by looking in the original template file, which in this case is tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/footer/footer.get.html.ftl:

    ```
    <@markup id="css" >
       <#-- CSS Dependencies -->
       <@link href="${url.context}/res/modules/about-share.css" group="footer"/>
       <@link href="${url.context}/res/components/footer/footer.css" group="footer"/>
    </@>
    
    <@markup id="js">
       <@script src="${url.context}/res/modules/about-share.js" group="footer"/>
    </@>
    
    <@markup id="widgets">
       <@createWidgets/>
    </@>
    
    <@markup id="html">
       <@uniqueIdDiv>
          <#assign fc=config.scoped["Edition"]["footer"]>
          <div class="footer ${fc.getChildValue("css-class")!"footer-com"}">
             <span class="copyright">
                <a href="#" onclick="Alfresco.module.getAboutShareInstance().show(); return false;"><img src="${url.context}/res/components/images/${fc.getChildValue("logo")!"alfresco-share-logo.png"}" alt="${fc.getChildValue("alt-text")!"Alfresco Community"}" border="0"/></a>
                <#if licenseHolder != "" && licenseHolder != "UNKNOWN">
                   <span class="licenseHolder">${msg("label.licensedTo")} ${licenseHolder}</span><br>
                </#if>
                <span>${msg(fc.getChildValue("label")!"label.copyright")}</span>
             </span>
          </div>
       </@>
    </@>
    ```

    In most cases there is only one markup section for additional HTML and it is called `html`. You can also see markup sections for `css`, `js`, and `widgets`, which can be used to inject for example additional JavaScript and Stylesheet files.

5.  Add a new Surf Extension Modules file called customize-webscript-template-extension-modules.xml to the all-in-one/customize-webscript-template-share/src/main/amp/config/alfresco/web-extension/site-data/extensions directory \(note. it is important to give this file a unique name when several Share AMPs are installed, otherwise the last one wins\):

    ```
    <extension>
        <modules>
            <module>
                <id>Customize Web Script Template for Footer</id>
                <version>1.0</version>
                <auto-deploy>true</auto-deploy>
                <customizations>
                    <customization>
                        <targetPackageRoot>org.alfresco.components.footer</targetPackageRoot>
                        <sourcePackageRoot>org.alfresco.tutorials.customization.footer.template</sourcePackageRoot>
                    </customization>
                </customizations>
            </module>
        </modules>
    </extension>
    ```

    This extension module identifies the package with the Web Script that we want to override by setting the `targetPackageRoot` property. When we have set what Web Script to override we use the `sourcePackageRoot` property to tell Alfresco where to pick up the customized Web Script files.

    This module will be deployed automatically when the application server is started as we have the `auto-deploy` property set to `true`.

6.  The implementation of this sample is now done, build and start the application server as follows:

    ```
    /all-in-one$ mvn clean install -Prun
    ```

7.  Now, login to Alfresco Share \(http://localhost:8080/share\) and you will see the additional footer texts at the bottom of the Dashboard page:

    ![](../images/dev-extensions-share-tutorials-template-customize-page-result.png)

    **Note:** A Surf Extension module like this can be deployed and undeployed during runtime. And this means that an Administrator can control when different customizations should be visible or hidden. This is managed via the Module deployment page that can be found at: `http://localhost:8080/share/service/modules/deploy`.

8.  If you want to test out the other FreeMarker extensibility operations, then you can update the footer.get.html.ftl file as follows:

    -   To place the new footer content *after* the footer:`<@region id="additional-content" target="html" action="after" scope="global"/>`
    -   To *replace* the content of the footer with the new content:`<@region id= "additional-content" target="html" action="replace" scope="global"/>`
    -   To *remove* the footer region completely:`<@region id="additional-content" target="html" action="remove"/>`

**Parent topic:**[Pages](../concepts/dev-extensions-share-tutorials-pages.md)

