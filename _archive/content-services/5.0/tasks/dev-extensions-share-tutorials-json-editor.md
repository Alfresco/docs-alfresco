---
author: Alfresco Documentation
---

# JSON Editor

The JSON Editor allows you to create Share Pages by directly entering the JSON code for the page model directly.

You need to be using Alfresco 5.0 or above.

In the previous tutorial you saw how to create a Share page using the Share Page Creator Tool.

1.  In the first part of this tutorial you will create a suitable folder in which to store pages created by the JSON Editor. **If you have already created the Pages folder as shown in the previous tutorial, then this part of the tutorial is not required.**
2.  Log into Share as admin.

3.  Select the **Repository** link.

4.  Click on the Data Dictionary folder.

5.  Create a new folder called ShareResources.

6.  Change into the ShareResources folder.

7.  Create a new folder called Pages.

    You have now created the folder to store pages created by the Share Page Creator tool.

8.  You now need to ensure that the JSON Editor gets loaded by the system. In order to do this you need to ensure that the correct AMD package is loaded. You can simply use the project you created in the tutorial on [Customizing the Share Menu](dev-extensions-share-tutorials-custom-share-header-menu.md). You also saw how to add AMD packages in the [AMD Package tutorial](dev-extensions-share-tutorials-amd-packages-via-extension.md).
9.  Load the `CustomShareProject` in Eclipse.

10. Load the file config/alfresco/site-data/extensions/extension-modules.xml into the Eclipse editor.

11. Add the following module to the file:

    ```
    
                            
    	<module>
    		<id>Add page JSONEditor</id>
    		<version>1.0</version>
    		<auto-deploy>true</auto-deploy>
    		<configurations>
    			<!-- Add in the JSON Editor AMD package -->
    			<config evaluator="string-compare" condition="WebFramework"
    				replace="false">
    				<web-framework>
    					<dojo-pages>
    						<packages>
    							<package name="jsoneditorlib" location="js/lib/jsoneditorlib" />
    						</packages>
    					</dojo-pages>
    				</web-framework>
    			</config>
    		</configurations>
    	</module>           
                            
                        
    ```

    This module ensures the correct package is loaded for the JSON Editor.

12. In the Package Explorer, navigate to the config/META-INF/js folder and create a new folder called lib.

13. In the Package Explorer, navigate to the config/META-INF/js/lib folder and create a new folder called jsoneditorlib.

14. In Eclipse, import the files from your local `jsoneditorlib` folder to `META-INF/js/lib/jsoneditorlib`.

15. In the Eclipse Package Explorer right-click on the build.xml file and select **Run As** \> **Ant Build**.

    This builds a new JAR file that was already deployed in the previous tutorial.

16. Restart the application server \(for example, Tomcat\).

17. Log in to Share as administrator.

18. In the next part of the tutorial you will see how to create pages using the JSON Editor.
19. In your web browser access the following URL:

    ```
    
                            
    http://localhost:8080/share/page/hdp/ws/page-editor                        
                            
                        
    ```

20. Type your JSON code into the **Page Definitions** field.

21. Click on the **Preview** button.

22. Enter a name into the **Page Name** field.

23. Click the **Save** button to save your page.

24. Open a URL similar to the following to access your page:

    ```
    
                            
    http://localhost:8080/share/page/hrp/p/FirstPage                        
                            
                        
    ```

    **Note:** Change FirstPage to the name of your page as required.


**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

