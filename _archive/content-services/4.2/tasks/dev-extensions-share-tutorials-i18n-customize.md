---
author: Alfresco Documentation
---

# Customize Alfresco Share i18n properties

This tutorial starts describing the changes Alfresco has made to Spring Surf to further simplify customization use cases, starting with demonstrating how to customize web script i18n properties.

You will learn how to override the default i18n properties for the User Dashboard titlebar. This tutorial shows how to use the SurfBug and the Web Scripts UI to find the web scripts that need to be targeted, and demonstrates how to create the necessary extension module configuration and files to achieve the customization.

1.  Log in to Alfresco Share and navigate to the user dashboard.

2.  Open a new browser window or tab and enable **SurfBug**, [http://localhost:8080/share/page/surfBugStatus](http://localhost:8080/share/page/surfBugStatus) – if you are using default port settings on your local machine.

3.  Refresh the dashboard page and click the footer to see the information about the Component/Sub-Component that is rendering it.

4.  Confirm the `url` value in the Component details section. The value will be `/components/footer`.

5.  Open a new browser window or tab at the Web Scripts Home page `http://localhost:8080/share/service/index` and click **Browse by Web Script URI**.

6.  Find and click **/components/footer** to see the information about the web script that is rendering the titlebar.

7.  Click the link next to `Id:` to see all the information about the web script.

8.  Confirm that the package that the web script belongs in is `org.alfresco.components.footer`.

    You will be customizing the code defined in that package.

9.  Edit the `extension-modules.xml` file created in a previous tutorial, and add the following module definition:

    ```
    
    
    <module>        
      <id>Module (i18n property change)</id>        
      <customizations>            
        <customization>                
          <targetPackageRoot>org.alfresco.components.footer</targetPackageRoot>                
          <sourcePackageRoot>tutorials.customization</sourcePackageRoot>            
         </customization>       
        </customizations>   
    </module>           
    
    
    ```

10. On the page showing the information about the web script, scroll down to find the section on the i18n properties file that will show both the fully qualified name of the file with its contents.

11. In Package Explorer, in the `config` folder, create a new folder called `webscripts`.

12. In the `webscripts` folder create a new folder called `tutorials`.

13. In the `tutorials` folder create a new folder called `customization`.

14. In the `customization` folder create a new file called `footer.get_en.properties` containing the following content:

    ```
    
    label.copyright=This is free software. Copyright Alfresco forever
    label.copyright.enterprise=This is the software you pay for. Copyright Alfresco forever
                       
    ```

    **Note:** The file is located in the package `webscripts.tutorials.customization` that was defined as the `sourcePackageRoot` element in the module configuration.

    **Other points to note:**

    -   The file name for the newly created properties file is not the same as that taken from the script information page. The web script information file was `org/alfresco/components/footer/footer.get.properties` and the newly created file is called `footer.get_en.properties`. Although a web script will broaden the locale of its search, for example from “en\_GB” to “en” to the default properties file, extensions do not.
    -   The source package has been prefixed with `webscripts.`. This is a requirement of the class loader used to find web script files.
15. No changes are required to the Ant build script used to build previous projects in Eclipse. Run the build script in Eclipse using Run As, Ant Build to build and deploy the customization to the application server.

16. Restart the application server.

17. Deploy the module in Share using the Module Deployment Tool \(as seen in previous tutorials\).

18. Refresh your Alfresco Share dashboard where you will see that the footer now displays your custom message.


**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

