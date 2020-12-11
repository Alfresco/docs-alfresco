---
title: Page Tutorials
---

The following are tutorials related to pages in the Share Web Application (`share.war`).

## Adding content to a Surf page

**Extension Point**: [Surf Extension Modules]({% link content-services/latest/develop/share-ext-points/surf-extension-modules.md %})

**Description**: 

This tutorial demonstrates how to add some extra content to the Footer on each page. The steps you need to take to do 
this can be applied also when adding content to other parts of a page.

**Implementation Steps**:

A simple and effective way to add content to a Surf page is to follow these steps:

1. Create a Web Script that returns the content to be displayed.
2. Find a page component that is located where you want to add new content, such as the footer in our case.
3. Add a new sub-component to the page component, referencing the new Web Script.
4. Use a Surf Extension module to deploy the new sub-component.

**Related Information**:

This tutorial assumes that you are familiar with the Spring Surf development framework. If you are new to it then read 
up on it [here]({% link content-services/latest/develop/software-architecture.md %}#surf-framework) before starting this tutorial. 
If you have not already done so you should also review the [Introducing SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) 
topic as this tool is used in this tutorial.

**Source Code**: [Go to code](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-page-content-share){:target="_blank"}

This tutorial assumes you have created a new [SDK All-In-One]({% link content-services/latest/develop/sdk.md %}#workingaio) project.

Tutorial implementation steps:

1.  In the Share JAR project create a new directory as follows for the Web Script: `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-webscripts/org/alfresco/tutorials`.

2.  Add a Web Script descriptor file called `new-content.get.desc.xml` to the `/tutorials` directory:

    ```xml
    <webscript>
        <shortname>New Page Content</shortname>
        <description>Add new content to a Surf Page</description>
        <url>/tutorials/new-content</url>
        <family>Share Tutorials</family>
    </webscript>
    ```

3.  Add a web script template file called `new-content.get.html.ftl` to the `/tutorials` directory:

    ```xml
    <div>
        Hello World!
    </div>
    ```

4.  Identify which component to add the new sub-component to.

    For this we use the [SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) tool. Once the tool is activated (from `http://localhost:8080/share/page/surfBugStatus`) we can identify the component on the page as follows:

    ![dev-extensions-share-tutorials-add-content-page-surfbug]({% link content-services/images/dev-extensions-share-tutorials-add-content-page-surfbug.png %})

    Here we have scrolled to the bottom of the Dashboard page as we want to add our new content to the footer. Then we have clicked on the last component enclosed in red lines. This brings up the above black information box where we can see the `region-id`, `source-id`, and `scope` values that we are looking for.

5.  Add a new Surf Extension Modules file called add-page-content-extension-modules.xml to the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` directory (note. it is important to give this file a unique name when several Share JARs are installed, otherwise the last one wins):

    ```xml
    <extension>
        <modules>
            <module>
                <id>Add new content to footer</id>
                <version>1.0</version>
                <auto-deploy>true</auto-deploy>
                <components>
                    <component>
                        <region-id>footer</region-id>
                        <source-id>global</source-id>
                        <scope>global</scope>
                        <sub-components>
                            <sub-component id="New_Content" index="25">
                                <url>/tutorials/new-content</url>
                            </sub-component>
                        </sub-components>
                    </component>
                </components>
            </module>
        </modules>
    </extension>
    ```

    What we are doing here is adding a new sub-component to the existing component identified by the region-id `footer` and the source-id `global`.

    The sub-component `url` points to the new Web Script that we just created.

    The sub-component's content can be displayed either before or after the default sub-component, which is the one with the `id` set to `default`. The position of the content is based on the `index` attribute value, which is set to 25 in our case. The `default` sub-component will have an `index` of 50 so our new sub-component will be displayed before it.

    The `id` of the new sub-component need to be unique within the main component (i.e. the footer) and the id `default` is reserved.

    This module will be deployed automatically when the application server is started as we have the `auto-deploy` property set to `true`.

6.  The implementation of this sample is now done, build and start the application server as follows:

    ```bash
    /all-in-one$ ./run.sh build_start
    ```

7.  Now, log in to Alfresco Share (`http://localhost:8080/share`) and you will see the content (Hello World!) from the new web script displayed just above the footer:

    ![dev-extensions-share-tutorials-add-content-page-result]({% link content-services/images/dev-extensions-share-tutorials-add-content-page-result.png %})

    >**Note:** A Surf Extension module like this can be deployed and undeployed during runtime. And this means that an Administrator can control when different customizations should be visible or hidden. This is managed via the Module deployment page that can be found at: `http://localhost:8080/share/service/modules/deploy`.

## Removing content from a Surf page

**Extension Point**: [Surf Extension Modules]({% link content-services/latest/develop/share-ext-points/surf-extension-modules.md %})

**Description**:

This tutorial demonstrates how to prevent content from being rendered in a Surf page. This tutorial also shows how to 
use evaluations to decide whether content should be rendered or not.

**Implementation Steps**:

A simple and effective way to remove content from a Surf page is to follow these steps:

1. Locate the component that corresponds to the content you want to remove from the page.
2. Make a note of the region-id, source-id, and scope information for the component.
3. Override the component definition and add an evaluator that resolves to not rendering the component.
4. Use a Surf Extension module to deploy the overridden component definition.

**Related Information**:

This tutorial assumes that you are familiar with the Spring Surf development framework. If you are new to it then read 
up on it [here]({% link content-services/latest/develop/software-architecture.md %}#surf-framework) before starting this tutorial. 
If you have not already done so you should also review the [Introducing SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) 
topic as this tool is used in this tutorial.

**Source Code**: [Go to code](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/remove-page-content-share){:target="_blank"}

This tutorial assumes you have created a new [SDK All-In-One]({% link content-services/latest/develop/sdk.md %}#workingaio) project.

Tutorial implementation steps:

1.  Identify which component that corresponds to the content that should be removed.

    For this we use the [SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) tool. Once the tool is activated (from `http://localhost:8080/share/page/surfBugStatus`) we can identify the component on the page as follows:

    ![dev-extensions-share-tutorials-remove-content-page-surfbug]({% link content-services/images/dev-extensions-share-tutorials-remove-content-page-surfbug.png %})

    In this case we have clicked on the "My Sites" dashlet, which brings up the above black information box where we can see the `region-id`, `source-id`, and `scope` values that we need to be able to hide the dashlet.

2.  Add a new Surf Extension Modules file called `remove-page-content-extension-modules.xml` to the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` directory (note. it is important to give this file a unique name when several Share JARs are installed, otherwise the last one wins):

    ```xml
    <extension>
        <modules>
            <module>
                <id>Remove content from Share (hide My Sites)</id>
                <version>1.0</version>
                <auto-deploy>true</auto-deploy>
                <components>
                    <component>
                        <region-id>component-1-1</region-id>
                        <source-id>user/{userid}/dashboard</source-id>
                        <scope>page</scope>
                        <sub-components>
                            <sub-component id="default">
                                <evaluations>
                                    <evaluation id="guaranteedToHide">
                                        <render>false</render>
                                    </evaluation>
                                </evaluations>
                            </sub-component>
                        </sub-components>
                    </component>
                </components>
            </module>
        </modules>
    </extension>
    ```

    What we are doing here is overriding the `default` sub-component and putting in a new evaluation for it. The targeted component is identified with the values we got via SurfBug. So we set region-id to `component-1-1`, source-id to `user/{userid}/dashboard`, and scope to `page`. Note that we are changing the `source-id` from the specific one for Administrators (i.e. `user/admin/dashboard`) to one that is valid for all user dashboards.

    The sub-component evaluation definition is quite simple, we just give it a unique "bogus" `id` and set rendering to `false`. This evaluation definition is guaranteed to hide the component.

    This module will be deployed automatically when the application server is started as we have the `auto-deploy` property set to `true`.

3.  The implementation of this sample is now done, build and start the application server as follows:

    ```bash
    /all-in-one$ ./run.sh build_start
    ```

4.  Now, log in to Share (`http://localhost:8080/share`) and you will no longer see the "My Sites" dashlet on the Dashboard (that is, the "My Tasks" dashlet has taken its place):

    ![dev-extensions-share-tutorials-remove-content-page-result]({% link content-services/images/dev-extensions-share-tutorials-remove-content-page-result.png %})

    >**Note:** A Surf Extension module like this can be deployed and undeployed during runtime. And this means that an Administrator can control when different customizations should be visible or hidden. This is managed via the Module deployment page that can be found at: `http://localhost:8080/share/service/modules/deploy`.

5.  Further information

    Some features introduced in this tutorial are explained in more detail in the following sections:

    **Parametrized source-id mapping**: Every Share user gets their own dashboard page, which enables them to customize the layout to suit their own needs, but each user dashboard is generated from a single preset. In this tutorial you specify `user/{userid}/dashboard`. Note the use of the `userid` variable. This allows you to change the appearance of the dashboard for any user, not just the admin user.

    **Extending existing sub-components:** When the dashboard pages were first created, the concept of sub-components in Surf did not exist. Consequently, if you search through the existing dashboard configuration files you will not find sub-components specified. Surf automatically converts these “legacy” components into the new extensible components containing a single sub-component with the ID “default”.

    This allows you to add new content to these legacy components through sub-components, or customize the original content without affecting any new content. In the previous configuration XML, you can change the behaviour of the components through modification of the default sub-component.

    Note that multiple modules can extend the same component, which is why the deployment order of modules is important.

    **Sub-component evaluations:** Every sub-component can optionally have zero or more evaluations. Each evaluation acts like an AND gate to a series of evaluators where an evaluation is considered successful if no evaluators fail. If an evaluation contains no evaluators, it is still considered to have evaluated successfully because nothing has failed.

    The purpose of an evaluation is to change the behaviour of a sub-component in one of three ways:

    * Change the Web Script that renders the content by specifying a new URL.
    * Change the default properties (and/or provide new properties) that are passed to the Web Script.
    * Control whether or not the sub-component is actually rendered.
    
    In this example, you are simply overriding the default behaviour of the sub-component to prevent it from rendering by setting the `<render>` element to have a value of `false` (this defaults to `true`) if not defined.

## Customizing (web script properties) the footer text for a Surf page

**Extension Point**: [Surf Extension Modules]({% link content-services/latest/develop/share-ext-points/surf-extension-modules.md %})

**Description**:

This tutorial demonstrates how to customize the page footer web script i18n properties to change the existing text 
in the footer. The tutorial walks through how to find the related component and web script.

**Implementation Steps**:

It is often necessary to customize different parts of a Surf web script. This tutorial shows you how to customize the 
i18n properties files for a web script. The approach looks something like this:

1. Find the page component that corresponds to the content that should be changed.
2. Identify the web script that is used to deliver the content.
3. Identify what part of the web script need changing to achieve the customization, in this case the properties file, which contains the existing footer text for Alfresco Content Services and Alfresco Community Edition.
4. Create your customized version of the {web script id}.get_{lang}.properties file.
5. Use a Surf Extension module to define the web script override.

**Related Information**:

This tutorial assumes that you are familiar with the Spring Surf development framework. If you are new to it then read 
up on it [here]({% link content-services/latest/develop/software-architecture.md %}#surf-framework) before starting this tutorial. 
If you have not already done so you should also review the [Introducing SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) 
topic as this tool is used in this tutorial.

**Source Code**: [Go to code](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/customize-webscript-i18n-props-share){:target="_blank"}

This tutorial assumes you have created a new [SDK All-In-One]({% link content-services/latest/develop/sdk.md %}#workingaio) project.

Tutorial implementation steps:

1.  Identify the web script that delivers the content that should be customized.

    For this we use the [SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) tool. Once the tool is activated (from `http://localhost:8080/share/page/surfBugStatus`) we can identify the web script as follows:

    ![dev-extensions-share-tutorials-i18n-customize-page-surfbug]({% link content-services/images/dev-extensions-share-tutorials-i18n-customize-page-surfbug.png %})

    Here we have scrolled to the bottom of the Dashboard page where the footer is located. Then we have clicked on the last component enclosed in red lines and representing the footer. This brings up the above black box that contains information about what web script that is delivering the content for the footer component (and then also the properties). In this case it is the `footer.get.*` web script in package `org.alfresco.components.footer` that we need to target. You can also identify the web script via the URL (that is, `/components/footer`).

2.  In the Share JAR project create a new web script override package `org.alfresco.tutorials.customization.footer.i18n`.

    The directory path that needs to be created is: `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-webscripts/org/alfresco/tutorials/customization/footer/i18n`.

    We can choose any package path we want and then specify it in the Surf Extension Module, we will see this in a bit. However, it is important that we use a package path that will not clash with another Extension Module, deployed by some other JAR.

    For example, if we just used `org.alfresco.tutorials.customization.footer` and then another JAR was deployed with some other customization to the footer, using the same package path. Then if one extension module is undeployed its customizations will still be picked up if the other module is active. This is because both modules are using the same package path.

3.  Add our version of the web script properties file for English called `footer.get_en.properties` to the `/tutorials/customization/footer/i18n` directory:

    ```text
    label.copyright=This is free software. Copyright Alfresco forever
    label.copyright.enterprise=This is the software you pay for. Copyright Alfresco forever
    ```

    To know what the property names are we first lookup the original properties file, which is located in the `tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/footer` directory.

4.  Add a new Surf Extension Modules file called `customize-webscript-i18n-props-extension-modules.xml` to the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` directory (note. it is important to give this file a unique name when several Share JARs are installed, otherwise the last one wins):

    ```xml
    <extension>
        <modules>
            <module>
                <id>Customize i18n labels for Footer</id>
                <version>1.0</version>
                <auto-deploy>true</auto-deploy>
                <customizations>
                    <customization>
                        <targetPackageRoot>org.alfresco.components.footer</targetPackageRoot>
                        <sourcePackageRoot>org.alfresco.tutorials.customization.footer.i18n</sourcePackageRoot>
                    </customization>
                </customizations>
            </module>
        </modules>
    </extension>
    ```

    This extension module identifies the package with the web script that we want to override by setting the `targetPackageRoot` property. When we have set what web script to override we use the `sourcePackageRoot` property to tell Alfresco Content Services where to pick up the customized web script files.

    This module will be deployed automatically when the application server is started as we have the `auto-deploy` property set to `true`.

5.  The implementation of this sample is now done, build and start the application server as follows:

    ```bash
    /all-in-one$ ./run.sh build_start
    ```

6.  Now, log in to Share (`http://localhost:8080/share`) and you will see the new footer text displayed as follows:

    ![dev-extensions-share-tutorials-i18n-customize-page-result]({% link content-services/images/dev-extensions-share-tutorials-i18n-customize-page-result.png %})

    >**Note:** A Surf Extension module like this can be deployed and undeployed during runtime. And this means that an Administrator can control when different customizations should be visible or hidden. This is managed via the Module deployment page that can be found at: `http://localhost:8080/share/service/modules/deploy`.


## Customizing (web script controller) the WebView dashlet on the Dashboard page

**Extension Point**: [Surf Extension Modules]({% link content-services/latest/develop/share-ext-points/surf-extension-modules.md %})

**Description**:

This tutorial demonstrates how to customize the WebView dashlet web script controller so the Alfresco Home page is 
displayed by default. The tutorial walks through how to find the related component and web script.

**Implementation Steps**:

It is often necessary to customize different parts of a Surf web script. This tutorial shows you how to customize the 
controller for a web script. The approach looks something like this:

1. Find the page component that corresponds to the content that should be changed.
2. Identify the web script that is used to deliver the content.
3. Identify what part of the web script need changing to achieve the customization, in this case the controller as we can set the page that should be loaded by default in the model.
4. Create your version of the {web script id}.get.js file.
5. Use a Surf Extension module to define the web script override.

**Related Information**:

This tutorial assumes that you are familiar with the Spring Surf development framework. If you are new to it then read 
up on it [here]({% link content-services/latest/develop/software-architecture.md %}#surf-framework) before starting this tutorial. 
If you have not already done so you should also review the [Introducing SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) 
topic as this tool is used in this tutorial.

**Source Code**: [Go to code](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/customize-webscript-controller-share){:target="_blank"}

This tutorial assumes you have created a new [SDK All-In-One]({% link content-services/latest/develop/sdk.md %}#workingaio) project.

Tutorial implementation steps:

1.  Add the WebView dashlet to the default dashboard for users.

    The WebView dashlet is not part of the default dashboard for users so we need to add it in order to be able to work with it when implementing this customization.

    The easiest way to add a dashlet permanently to the user dashboard is to define a new preset for the dashboard layout with id `user-dashboard`. Create a new presets directory under the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data` directory.

    Now, add a file called `presets.xml` to the new presets directory:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <presets>
        <!-- Override wll known preset used to generate the default User dashboard.
             Add the Web View Dashlet so we can check if customization works. -->
        <preset id="user-dashboard">
            <components>
                <!-- title
                <component>
                    <scope>page</scope>
                    <region-id>title</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/title/user-dashboard-title</url>
                </component>
                -->
                <!-- dashboard components -->
                <component>
                    <scope>page</scope>
                    <region-id>full-width-dashlet</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/dashlets/dynamic-welcome</url>
                    <properties>
                        <dashboardType>user</dashboardType>
                    </properties>
                </component>
                <component>
                    <scope>page</scope>
                    <region-id>component-1-1</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/dashlets/my-sites</url>
                </component>
                <component>
                    <scope>page</scope>
                    <region-id>component-1-2</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/dashlets/my-tasks</url>
                </component>
                <component>
                    <scope>page</scope>
                    <region-id>component-2-1</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/dashlets/my-activities</url>
                </component>
                <component>
                    <scope>page</scope>
                    <region-id>component-2-2</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/dashlets/webview</url>
                </component>
                <component>
                    <scope>page</scope>
                    <region-id>component-2-3</region-id>
                    <source-id>user/${userid}/dashboard</source-id>
                    <url>/components/dashlets/my-documents</url>
                    <properties>
                        <height>240</height>
                    </properties>
                </component>
            </components>
            <pages>
                <page id="user/${userid}/dashboard">
                    <title>User Dashboard</title>
                    <title-id>page.userDashboard.title</title-id>
                    <description>Users dashboard page</description>
                    <description-id>page.userDashboard.description</description-id>
                    <template-instance>dashboard-2-columns-wide-right</template-instance>
                    <authentication>user</authentication>
                </page>
            </pages>
        </preset>
    </presets>
    ```

    Here we have included the WebView dashlet as `component-2-2`, so it will be displayed in column 2 and row 2 in the Dashboard layout. If you do not know the `url` for the dashlet, then just add it manually to the Dashboard and use SurfBug to identify what `url` that is used.

2.  Identify the web script that delivers the content that should be customized.

    For this we use the [SurfBug]({% link content-services/latest/develop/useful-tools/surfbug.md %}) tool. Once the tool is activated (from `http://localhost:8080/share/page/surfBugStatus`) we can identify the web script as follows:

    ![dev-extensions-share-tutorials-controller-customize-page-surfbug]({% link content-services/images/dev-extensions-share-tutorials-controller-customize-page-surfbug.png %})

    Here we have scrolled down a bit on the Dashboard page so we have the WebView dashlet in front of us. Then we have clicked on the WebView dashlet. This brings up the above black box that contains information about what web script that is delivering the content for the dashlet. In this case it is the `webview.get.*` web script in package `org.alfresco.components.dashlets` that we need to target. You can also identify the web script via the URL (that is, `/components/dashlets/webview`).

3.  In the Share JAR project create a new web script override package `org.alfresco.tutorials.customization.webview.controller`.

    The directory path that needs to be created is: `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-webscripts/org/alfresco/tutorials/customization/webview/controller`.

    We can choose any package path we want and then specify it in the Surf Extension Module, we will see this in a bit. However, it is important that we use a package path that will not clash with another Extension Module, deployed by some other JAR.

    For example, if we just used `org.alfresco.tutorials.customization.webview` and then another JAR was deployed with some other customization to the WebView dashlet, using the same package path. Then if one extension module is undeployed its customizations will still be picked up if the other module is active. This is because both modules are using the same package path.

4.  Add our version of the web script controller file called `webview.get.js` to the `/tutorials/customization/webview/controller` directory:

    ```javascript
    if (model.isDefault == true)
    {
        model.widgets[0].options.webviewTitle = "Alfresco!";
        model.widgets[0].options.webviewURI = "http://www.alfresco.com";
        model.widgets[0].options.isDefault = false;
    }
    ```

    This controller will be processed after the out-of-the-box WebView controller. So what we are doing is just adding some stuff to the `model` widgets to tell the dashlet to load the Alfresco home page by default.

    By inspecting the source of both the out-of-the-box controller and the template, you can work out what `model` properties the template is using (see `tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/dashlets`). This allows you to determine whether or not you can update the `model` after the base controller but before the template to create the required result.

5.  Add a new Surf Extension Modules file called customize-webscript-controller-extension-modules.xml to the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` directory (note. it is important to give this file a unique name when several Share JARs are installed, otherwise the last one wins):

    ```xml
    <extension>
        <modules>
            <module>
                <id>Customize Web Script Controller for Web View Dashlet</id>
                <version>1.0</version>
                <auto-deploy>true</auto-deploy>
                <customizations>
                    <customization>
                        <targetPackageRoot>org.alfresco.components.dashlets</targetPackageRoot>
                        <sourcePackageRoot>org.alfresco.tutorials.customization.webview.controller</sourcePackageRoot>
                    </customization>
                </customizations>
            </module>
        </modules>
    </extension>
    ```

    This extension module identifies the package with the web script that we want to override by setting the `targetPackageRoot` property. When we have set what web script to override we use the `sourcePackageRoot` property to tell Alfresco where to pick up the customized web script files.

    This module will be deployed automatically when the application server is started as we have the `auto-deploy` property set to `true`.

6.  The implementation of this sample is now done, build and start the application server as follows:

    ```bash
    /all-in-one$ ./run.sh build_start
    ```

    >**Note:**. when defining presets for sites and users know that they are stored in the database after first time usage. In this tutorial we defined a new user preset to display a slightly different user dashboard. If a user, such as **admin** that we most likely use with the SDK, has been logging in before this customization was applied, then that user will already have a user dashboard preset in the database. So the customization will not appear to work. But wipe out `alf_data_dev`, if you can, and restart and you will see that it works.

7.  Now, log in to Share (`http://localhost:8080/share`) and you will see the WebView dashlet loaded with the home page:

    ![dev-extensions-share-tutorials-controller-customize-page-result]({% link content-services/images/dev-extensions-share-tutorials-controller-customize-page-result.png %})

    >**Note:** A Surf Extension module like this can be deployed and undeployed during runtime. And this means that an Administrator can control when different customizations should be visible or hidden. This is managed via the Module deployment page that can be found at: `http://localhost:8080/share/service/modules/deploy`.


The custom JavaScript is executed after the original. The original JavaScript sets up an initial `model` object, which the default FreeMarker template can use to render content. Controller extensions then have the opportunity to change that model and thus change the rendered output. Using this approach is dependent upon the template making use of the changed model content - just adding content to the model will have no effect unless the template is also updated to make use of the additional model data.

It is not always possible to use this approach to customize existing components, as it depends on how the JavaScript controller and template are implemented, but the approach is worth exploring.

## Customizing (web script template) the footer text for a Surf page

## Adding a new Surf page to Share

## Override Share sign in page

## Making the new page the default

## Localizing Pages
