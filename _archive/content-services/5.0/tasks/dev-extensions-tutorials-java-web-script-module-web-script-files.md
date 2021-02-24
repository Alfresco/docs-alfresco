---
author: Alfresco Documentation
---

# Adding the web script files

In this task you add the necessary files that make up the web script. The web script consists of three files in this example: the web script description file, the FreeMarker template file, and the Java source code for the controller. In this task you will create the three files and locate them within the project directory structure.

1.  In the `alfresco.extension.templates.webscripts.com.alfresco.tutorials` package create a new XML file with the following contents, and save the file as javadir.get.desc.xml:

    ```
    
                            
    ﻿<webscript>
      <shortname>Folder Listing Utility</shortname>
      <description>Java-backed implementation of listing folder contents</description>
      <url>/javadir/{folderpath}?verbose={verbose?}</url>
      <authentication>user</authentication>
    </webscript>                        
                            
                        
    ```

    This is the description file for the web script.

2.  In the same package create a text file called javadir.get.html.ftl with the following content:

    ```
    
                            
    ﻿<html>
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

    This is the FreeMarker template the web script will use.

3.  To complete the web script code you will now add the Java controller. In the src folder, in the `com.alfresco.tutorials` package, create a new Java Class called `JavaDir`. This will result in the JavaDir.java file being added. Replace the contents of the file with the following:

    ```
    
                            
    ﻿package com.alfresco.tutorials;
    
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

    This is the core code that will actually return a list of files and folders in the folder specified as a parameter to the web script.

    **Attention:** At this point the class will be showing compile errors, as you have not yet linked in the required libraries.


At this point you have added the web script files. The next task is to add in the required module files.

**Parent topic:**[Creating a Java-backed web script module with Ant](../tasks/dev-extensions-tutorials-java-web-script-module.md)

