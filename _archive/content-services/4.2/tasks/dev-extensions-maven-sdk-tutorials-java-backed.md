---
author: Alfresco Documentation
---

# Creating a Java-backed web script

This task demonstrates how you can create a Java-backed web script and build and deploy it using the Maven Alfresco SDK.

You need to have completed the previous tutorials. You should also be familiar with the tutorial described [here](dev-extensions-tutorials-java-web-script-module.md).

You can use the Maven Alfresco SDK to build and deploy a Java-backed web script module.

1.  In the maven\_projects directory type the following command:

    ```
    
                            
    mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -Dfilter=org.alfresco.maven.archetype:
                        
                        
    ```

2.  Select the `All-in-One Archetype`, which is option 2.

3.  Select the default archetype version number.

4.  For the `groupId` enter `com.alfresco.tutorials`.

5.  For the `artifactId` enter `javadir`.

6.  Accept the default Alfresco version by pressing **Enter**.

    The project will be built in the javadir directory.

7.  Change into the javadir project directory.

8.  Change into the amp/src/main/amp/config/alfresco directory.

9.  Create a new directory structure from your current directory extension/templates/webscripts/com/alfresco/tutorials.

    This will be used to store the web script description file and associated Freemarker template.

10. In the current directory create a new web description file javadir.get.desc.xml with the following contents:

    ```
    
                            
    <webscript>
      <shortname>Folder Listing Utility</shortname>
      <description>Java-backed implementation of listing folder contents</description>
      <url>/javadir/{folderpath}?verbose={verbose?}</url>
      <authentication>user</authentication>
    </webscript>                         
                            
                        
    ```

11. In the current directory create a new Freemarker template file javadir.get.html.ftl with the following contents:

    ```
    
                            
    <html>
     <head>
      <title>Folder ${folder.displayPath}/${folder.name}</title>
      </head>
     <body>
       <p>Alfresco ${server.edition} Edition v${server.version} : dir</p>
      <p>Contents of folder ${folder.displayPath}/${folder.name}</p>
      <table>
       <#list folder.children as child>
       <tr>
       <td><#if child.isContainer>d</#if></td>
       <#if verbose>
         <td>${child.properties.modifier}</td>
         <td><#if child.isDocument>
           ${child.properties.content.size}</#if></td>
         <td>${child.properties.modified?date}</td>
       </#if>
       <td>${child.name}</td>
       </tr>
       </#list>
      </table>
     </body>
    </html>                              
                            
                        
    ```

12. In the ﻿﻿javadir/amp/src/main/amp/config/alfresco/module/amp directory load the file called module-context.xml into your editor. Change the contents to the following:

    ```
    
                            
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    	<!--  Spring bean -->
    	<bean id="webscript.com.alfresco.tutorials.javadir.get" class="com.alfresco.tutorials.JavaDir"
    		parent="webscript">
    		<property name="repository" ref="repositoryHelper" />
    	</bean>
    </beans>                        
                            
                        
    ```

13. Change into the ./amp/src/main/amp directory, load module.properties into your editor and make the following changes. Change:

    ```
                            
    ﻿# module.repo.version.min=2.0
    # module.repo.version.max=2.1                        
                        
    ```

    to:

    ```
    
    ﻿module.repo.version.min=4.0
    module.repo.version.max=4.2                        
                        
    ```

14. In the ﻿amp/src/main/java directory create the directory structure com/alfresco/tutorials.

    This will contain the Java class for the web script.

15. In this directory create the Java class file, JavaDir.java, with the following contents:

    ```
    
                            
    package com.alfresco.tutorials;
    
    import java.util.HashMap;
    import java.util.Map;
    
    import org.alfresco.repo.model.Repository;
    import org.alfresco.service.cmr.repository.NodeRef;
    import org.springframework.extensions.webscripts.Cache;
    import org.springframework.extensions.webscripts.DeclarativeWebScript;
    import org.springframework.extensions.webscripts.Status;
    import org.springframework.extensions.webscripts.WebScriptException;
    import org.springframework.extensions.webscripts.WebScriptRequest;
    
    public class JavaDir extends DeclarativeWebScript {
    	private Repository repository;
    
    	public void setRepository(Repository repository) {
    		this.repository = repository;
    	}
    
    	protected Map<String, Object> executeImpl(WebScriptRequest req,
    			Status status, Cache cache) {
    
    		NodeRef folder;
    
    		// extract folder listing arguments from URI
    		String verboseArg = req.getParameter("verbose");
    		Boolean verbose = Boolean.parseBoolean(verboseArg);
    
    		Map<String, String> templateArgs = req.getServiceMatch()
    				.getTemplateVars();
    		String folderPath = templateArgs.get("folderpath");
    
    		if (folderPath.equals("Company Home")) {
    
    			folder = repository.getCompanyHome();
    
    		} else {
    			String nodePath = "workspace/SpacesStore/" + folderPath;
    			folder = repository.findNodeRef("path", nodePath.split("/"));
    		}
    
    		// validate that folder has been found
    		if (folder == null) {
    			throw new WebScriptException(Status.STATUS_NOT_FOUND, "Folder "
    					+ folderPath + " not found");
    		}
    
    		// construct model for response template to render
    		Map<String, Object> model = new HashMap<String, Object>();
    		model.put("verbose", verbose);
    		model.put("folder", folder);
    		return model;
    	}
    }                                                
                            
                        
    ```

16. From the maven\_projects/javadir directory type `mvn install` to build your project.

17. You can check the contents of the generated AMP file by changing into the ./amp/target directory, and then type:

    ```
    
    unzip -t amp.amp                        
                        
    ```

    Check that the web script description and Freemarker files, JavaDir.class file and module-context.xml files are present and located where expected.

18. From the maven\_projects/javadir directory run your newly created project by typing:

    ```
               
    mvn install -Prun            
            
    ```

19. Browse to Alfresco Share at `http://localhost:8080/share`.

20. Create a test folder in the Repository \(Company Home\), called test.

21. Upload a number of files into the test directory.

22. Create several test directories in the test folder, for example test1, test2, test3.

23. In your web browser navigate to the address:

    ```
    
    ﻿http://localhost:8080/alfresco/service/javadir/Company%20Home/test                        
                        
    ```

    The browser will return a list of files and directories, the directories will be prepended with a “d”, such as in the following example:

    ```
    
    Alfresco Community Edition v4.2.0 (4576) : dir
    
    Contents of folder /Company Home/test
    d 	test1
    d 	test2
    	t3.jpeg
    	t4.jpeg
    	index.html
    	t2.jpeg
                    
    ```


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

