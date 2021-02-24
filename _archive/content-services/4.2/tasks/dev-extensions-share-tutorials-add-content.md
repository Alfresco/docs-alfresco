---
author: Alfresco Documentation
---

# Add content to an Alfresco Share page

This tutorial demonstrates how to create and deploy an extension module that adds some extra content to a user dashboard page in Alfresco Share.

You will need to have Eclipse installed, and this tutorial assumes you have some familiarity with using Eclipse. It also assumes you have installed the XML editing tools for Eclipse. For subsequent tutorials you will also need to have the Spring Framework installed. If you have not already done to you should review the [Introducing SurfBug](../concepts/dev-extensions-share-surfbug.md) topic.

A simple and effective way to add content to an Alfresco Share page is to create the content as a web script and then add a new Sub-Component an existing Component on the page.

The content is implemented through an Extension Module deployed into Alfresco Share as a JAR file.

1.  In Eclipse create a new Java Project called something suitable, such as `ShareExtensions`.

2.  In the Package Explorer \(in Eclipse\) right-click on the `ShareExtensions` project folder and create a new folder called `config`.

3.  In the config folder create a new folder called alfresco.

4.  In the alfresco folder create a new folder called site-webscripts.

5.  In the alfresco folder create another folder called site-data.

6.  In the site-data folder create a new folder called extensions.

7.  In the config/alfresco/site-webscripts folder create a new description file \(XML file\) for the webscript called `new-content.get.desc.xml` that contains the following content, and save it :

    ```
    
                                                                    
    <webscript>      
     <shortname>New Content</shortname>       
      <url>/tutorials/new-content</url>       
      <family>Share Tutorials</family>   
    </webscript>
    
    
    ```

8.  In the same folder, config/alfresco/site-webscripts create a new template file called **new-content.get.html.ftl** that contains the following content, and save it:

    ```
    
    
    <div>         
      Hello World!     
    </div>   
    
    
    ```

9.  Right-click on the ShareExtensions project folder and create a new XML file called build.xml

    This will contain an Ant script for packaging up and deploying the project.

10. Add the following content to your Ant script:

    ```
    
                            
    ﻿<?xml version="1.0" encoding="UTF-8"?>
    <project default="deploy-jar">
    
    	<!-- Set these as required -->
    	<property name="jar.name" value="extension_modules.jar"/>	
    	<property name="jar.deploy.dir" value="/home/tony/alfresco-4.2.0/tomcat/webapps/share/WEB-INF/lib"/>	
    
    	<property name="project.dir" value="."/>
    	<property name="build.dir" value="${project.dir}/build"/>
    	<property name="jar.file" value="${build.dir}/lib/${jar.name}"/>
    
    	<target name="mkdirs">
    		<mkdir dir="${build.dir}/lib" />
    	</target>
    	
    	<target name="package-jar" depends="mkdirs">
    		<jar destfile="${jar.file}" >
    			<fileset dir="${project.dir}/config" includes="**/*" />
    		</jar>
    	</target>
    	
    	<target name="deploy-jar" depends="package-jar">
    		<copy file="${jar.file}" todir="${jar.deploy.dir}"/> 
    	</target>
    	
    	<target name="clean">
    		<delete file="${jar.file}"/>
    		<delete file="${jar.deploy.dir}/${jar.name}"/>
    	</target>
    
    </project>
                            
                            
                        
    ```

    The main purpose of this Ant script is to create a JAR file and deploy it. Everything below the config folder is included in the JAR file. The deploy target simply copies the JAR file to the tomcat/webapps/share/WEB-INF/lib directory of your alfresco installation.

11. Now run the build file by right-clicking on it and selecting Run As, Ant Build.

    Check the Eclipse Console for messages. You should see `BUILD SUCCESSFUL`.

12. You can test the contents of the JAR file is as expected by changing into the tomcat/webapps/share/WEB-INF/lib folder of your Alfresco installation and typing:

    ```
    
    jar tf extension_modules.jar               
                            
    ```

    At this point you would expect to see the following:

    ```
    
    ﻿META-INF/
    META-INF/MANIFEST.MF
    alfresco/
    alfresco/site-data/
    alfresco/site-data/extensions/
    alfresco/site-webscripts/
    alfresco/site-webscripts/new-content.get.desc.xml
    alfresco/site-webscripts/new-content.get.html.ftl                        
                        
    ```

    **Attention:** If the tomcat/webapps/share/WEB-INF directory is not available it may be because the share.war has not yet been epxloded by Tomcat. Simply start a new browser tab and start Share. The Share WAR directory structure will be created.

    CAUTION:

    Note that a JAR located in this folder will be lost if Alfresco is upgraded or if the WAR is re-deployed. However, the location is suitable for the purposes of this tutorial.

13. Start \(or restart\) the application server.

14. Open a browser at the URL [http://localhost:8080/share/service/index](http://localhost:8080/share/service/index).

    This assumes the server is running on your local machine and that Tomcat is using the default port setting. The Web Scripts Home page will be displayed. Check for the link **Browse 'Share Tutorials' Web Scripts**. This indicates that your new web script has been successfully registered.

15. **Note:** You now need to select a location within the page to which you will add your new content. The location can be identified using the SurfBug tool. SurfBug is described in more detail in the [Introducing SurfBug](../concepts/dev-extensions-share-surfbug.md).

    Log in to Alfresco Share \(http://localhost:8080/share\) in a separate browser window or tab.

    Your dashboard will be displayed.

16. Switch back to the tab containing the Web Scripts Home page, scroll to the bottom and click **Enable SurfBug**.

    The page refreshes and the button changes to **Disable SurfBug**.

17. Switch back to the Alfresco Share window and refresh the page. The Dashboard page now displays various page components delimited by a red box. Click in any of the boxes and a pop-up displays information about that Sub-Component and its parent Component.

18. Click on the footer and make a note of the Component Details, in particular the `region-id`, `source-id` and `scope` values.

    If you are logged in as Admin these will be as follows: `footer`, `global`, and `global`. This is the information that you will need when defining a new Sub-Component to that existing Component.

19. In the Eclipse Package Explorer, in the alfresco/site-data/extensions folder, create a new extension file called extension-modules.xml that contains the following:

    ```
    
    
    <extension>
      <modules>
        <module>
          <id>New Content Module</id>
          <components>
              <component>
                  <region-id>footer</region-id>
                  <source-id>global</source-id>
                  <scope>global</scope>
                  <sub-components>
                    <sub-component id="New_Content" index= "25" >
                    <url>/tutorials/new-content</url>
                   </sub-component>
                  </sub-components>
              </component>
           </components>
         </module>
        </modules>
    </extension>
    
    
    ```

    **Note:** Note how the target Component is specified using the data taken from SurfBug and how the Sub-Component specifies the URL of the new web script created.

20. Re-build the JAR file so that the extension file is included.

    You can do this by right-clicking on your build.xml file and selecting Run As, Ant Build. This will build and deploy the new JAR file.

21. Restart the application server.

22. **Note:** The extension module needs to be deployed before it will be visible. Module deployment is a new feature in Alfresco 4.0 that is achieved through a web script found at: `http://localhost:8080/share/service/modules/deploy`.

    Navigate to this page to view a list of Available Modules and a list of Deployed Modules. Initially you will see the following two modules available: Alfresco Portlet Extension, and New Content Module

23. Select **New Content Module** and click **Add** to move it into the **Deployed Modules** list.

24. Click **Apply Changes**.

    Note that the **Last update** time stamp changes. You only need to do this action once as Module Deployment data is saved into the Alfresco Repository.

25. Now log back in to Alfresco Share and you will see the content \(Hello World!\) from the new web script displayed just above the footer.


**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

