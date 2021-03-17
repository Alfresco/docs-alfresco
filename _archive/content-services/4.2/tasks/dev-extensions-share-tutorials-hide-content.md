---
author: Alfresco Documentation
---

# Control rendering of content on an Alfresco Share page

Building on the previous tutorial where you created and deployed an extension module that added extra content to a user dashboard page in Alfresco Share, this tutorial demonstrates how to use an extension module to prevent content being rendered in an Alfresco Share page. This tutorial also shows how to use evaluations to decide whether a component should be rendered or not.

The module in the previous tutorial added content to the footer on the user dashboard. This tutorial writes a module to hide the top left component \(My Sites by default\). You will use Surfbug to find values for the component `region-id`, `source-id`, and `scope` properties.

1.  In a tab, enable SurfBug as you saw how to do in the previous tutorial.

2.  In another tab display your dashboard.

3.  Click the My Sites component to display its SurfBug data.

4.  Make a note of the values for `region-id`, `source-id` and `scope`.

    If you are logged in as admin these will be `component-1-1`, `user/admin/dashboard` and `page` respectively.

5.  In the Eclipse project you created in the previous tutorial, load the file alfresco/site-data/extensions/extension-modules.xml into the Eclipse editor.

6.  Add another `<module>` entry into the `<modules>` element as follows:

    ```
    
    
    <module>
      <id>Module (Hide My Sites)</id>
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
    
    
    ```

    Note that the `source-id` element uses a parameterized value. This will be discussed in more detail later in this tutorial.

7.  Rebuild your JAR file and deploy it using the project build file as you saw in the previous tutorial.

8.  Restart the application server.

9.  Open **http://localhost:8080/share/page/modules/deploy** in a web browser.

10. If you still have Module \(New Content\) deployed, undeploy it by selecting it and clicking **Remove**.

11. Deploy **Module \(Hide My Sites\)** by selecting it and clicking **Add**.

12. Click **Apply Changes** to save your module deployments.

13. Log in to Alfresco Share. You will see that the My Sites component no longer displays.

    Some features introduced in this tutorial are explained in more detail in the following sections:

    **Parameterized source-id mapping**: Every Alfresco Share user gets their own dashboard page, which enables them to customize the layout to suit their own needs, but each user dashboard is generated from a single preset. In this tutorial you specify `user/{userid}/dashboard`. Note the use of the `user` variable. This allows you to change the appearance of the dashboard for any user, not just the admin user.

    **Extending existing Sub-Components:** When the dashboard pages were first created, the concept of Sub-Components in Spring Surf did not exist. Consequently, if you search through the existing dashboard configuration files you will not find Sub-Components specified. Spring Surf automatically converts these “legacy” Components into the new extensible Components containing a single Sub-Component with the ID “default”. These new extensible Components are called Advanced Components.

    This allows you to add new content to these legacy Components through Sub-Components, or customize the original content without affecting any new content. In the previous configuration XML, you can change the behaviour of the components through modification of the default Sub-Component.

    Note that multiple modules can extend the same Component, which is why the deployment order of modules is important.

    **Sub-Component evaluations:** Every Sub-Component can optionally have zero or more evaluations. Each evaluation acts like an AND gate to a series of evaluators where an evaluation is considered successful if no evaluators fail. If an evaluation contains no evaluators, it is still considered to have evaluated successfully because nothing has failed.

    The purpose of an evaluation is to change the behavior of a Sub-Component in one of three ways:

    -   Change the web script that renders the content by specifying a new URL.
    -   Change the default properties \(and/or provide new properties\) that are passed to the web script.
    -   Control whether or not the Sub-Component is actually rendered.
    In this example, you are simply overriding the default behavior of the Sub-Component to prevent it from rendering by setting the `<render>` element to have a value of `false` \(this defaults to `true`\) if not defined.

    **Module deployment:** It would have been possible to add the `<sub-component>` elements \(and its children\) into the module created in the previous tutorial, as a single module can update multiple Components and Sub-Components.  Adding the configuration to prevent rendering of the My Sites component as a separate module allows you to deploy and undeploy both extension modules independently. If you deploy both modules, you will see that both modules are active.

    **Note:** It is not necessary to restart the web server between module deployment changes. As long as you remember to click Apply Changes, the updates will show the next time you refresh the Alfresco Share page.


**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

