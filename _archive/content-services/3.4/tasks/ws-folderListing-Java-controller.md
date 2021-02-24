---
author: Alfresco Documentation
---

# Developing a controller for a Folder Listing Java-backed web script

To complete the Folder Listing Java-backed web script, you must create its controller. The controller parses the URI to extract the token values, interacts with the Alfresco content repository to locate the specified folder, and populates the model for subsequent rendering by the HTML response template.

This develops a controller in Java.

1.  Create the Java class for the Folder Listing web script:

    1.  Launch your Java IDE.

    2.  Create a Java package called org.example

    3.  Create a Java class called JavaDir

    4.  Implement the Java class as follows:

        ```
        package org.example;
        
        import java.util.HashMap;
        import java.util.Map;
        
        import org.alfresco.repo.model.Repository;
        import org.alfresco.service.cmr.repository.NodeRef;
        import org.alfresco.web.scripts.Cache;
        import org.alfresco.web.scripts.DeclarativeWebScript;
        import org.alfresco.web.scripts.Status;
        import org.alfresco.web.scripts.WebScriptException;
        import org.alfresco.web.scripts.WebScriptRequest;
        
        public class JavaDir extends DeclarativeWebScript
        {
          private Repository repository;
          public void setRepository(Repository repository)
          {
            this.repository = repository;
          }
          protected Map<String, Object> executeImpl(WebScriptRequest req,
            Status status, Cache cache)
          {
           
          // extract folder listing arguments from URI
           String verboseArg = req.getParameter("verbose");
           Boolean verbose = Boolean.parseBoolean(verboseArg);
           Map<String, String> templateArgs =
           req.getServiceMatch().getTemplateVars();
           String folderPath = templateArgs.get("folderpath");
           String nodePath = "workspace/SpacesStore/" + folderPath;
           NodeRef folder = repository.findNodeRef("path", nodePath.split("/"));
           
          // validate that folder has been found
          if (folder == null)
          {
             throw new WebScriptException(Status.STATUS_NOT_FOUND,
               "Folder " + folderPath + " not found");
           }
        
          // construct model for response template to render
          Map<String, Object> model = new HashMap<String, Object>();
          model.put("verbose", verbose);
          model.put("folder", folder);
          return model;
          }
        }
        ```

    5.  Compile the Java class.

    6.  Place the compiled Java class into the folder **org/example** in the web application classpath of the Alfresco content application server.

2.  Create the Spring Framework configuration for registering your web script Java class:

    1.  Create an XML file called javadir-context.xml.

    2.  Register the Java class as follows:

        ```
        
                        
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN 2.0//EN'
          'http://www.springframework.org/dtd/spring-beans-2.0.dtd'>
        <beans>
          <bean id="webscript.org.example.javadir.get"
            class="org.example.JavaDir" parent="webscript">
          <property name="repository" ref="repositoryHelper"/>
          </bean>
        </beans>
        
        
        ```

    3.  Place the Spring Framework configuration file into the extension classpath of the Alfresco content application server.

        **Note:** When deploying a Java-backed web script to the Alfresco content application server, you must restart the server to fully register the web script.

3.  Test your Java-backed web script by typing the following in your web browser:

    http://localhost:8080/alfresco/service/javadir/Company%20Home?verbose=true


If successful, a verbose listing of the contents of the Company Home folder displays. Externally, this Folder Listing web script looks and behaves the same as its scripted web script implementation.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

