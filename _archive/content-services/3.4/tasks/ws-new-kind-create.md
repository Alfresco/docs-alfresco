---
author: Alfresco Documentation
---

# Creating a new kind of web script

To extend the capabilities of the Web Script Framework, you can develop a new kind of web script to encapsulate behavior you want to reuse across many scripted web scripts.

This example encapsulates the logic for finding a node in the content repository given a node path and placing that node into the web script model. Web scripts of this kind only have to declaratively specify the node path in their web script description for the model to automatically populate with the associated node.

1.  Create the Java class for your new web script:

    1.  Launch your Java IDE.

    2.  Create a Java package whose name is: org.example

    3.  Create a Java class whose name is: NodeWebScript

    4.  Implement the Java class as follows:

        ```
        package org.example;
        
        import java.io.Serializable;
        import java.util.HashMap;
        import java.util.Map;
        import org.alfresco.repo.model.Repository;
        import org.alfresco.service.cmr.repository.NodeRef;
        import org.alfresco.web.scripts.Cache;
        import org.alfresco.web.scripts.DeclarativeWebScript;
        import org.alfresco.web.scripts.Status;
        import org.alfresco.web.scripts.WebScriptException;
        import org.alfresco.web.scripts.WebScriptRequest;
        
        public class NodeWebScript extends DeclarativeWebScript
        {
         private Repository repository;
         public void setRepository(Repository repository)
        {
          this.repository = repository;
        }
        protected Map<String, Object> executeImpl(WebScriptRequest req,
        Status status, Cache cache)
        {
        
           // extract node path from description extensions
           Map<String, Serializable> extensions =
           getDescription().getExtensions();
           String path = (String)extensions.get("path");
        
          // search for folder within Alfresco content repository
          String nodePath = "workspace/SpacesStore/" + path;
          NodeRef node = repository.findNodeRef("path", nodePath.split("/"));
           
          // validate that node has been found
           if (node == null)
          {
            throw new WebScriptException(Status.STATUS_NOT_FOUND,
             "Path " + path + " not found");
          }
           // construct model for response template to render
           Map<String, Object> model = new HashMap<String, Object>();
           model.put("node", node);
           return model;
         }
        }
        ```

    5.  Compile the Java class.

    6.  Place the compiled Java class into the folder `org/example` within the web application classpath of the Alfresco content application server.

2.  Create a Java class for extracting the node path configuration for your new kind of web script:

    1.  Create a Java class in the package `org.example` whose name is: NodeWebScriptExtension.

    2.  Implement the Java class as follows:

        ```
        package org.example;
        
        import java.io.InputStream;
        import java.io.Serializable;
        import java.util.HashMap;
        import java.util.Map;
        import org.alfresco.web.scripts.DescriptionExtension;
        import org.alfresco.web.scripts.WebScriptException;
        import org.dom4j.Document;
        import org.dom4j.DocumentException;
        import org.dom4j.Element;
        import org.dom4j.io.SAXReader;
        
        public class NodeWebScriptExtension implements DescriptionExtension
        {
          public Map<String, Serializable> parseExtensions(String serviceDescPath,
          InputStream servicedesc)
          {
           Map<String, Serializable> extensions =
            new HashMap<String, Serializable>();
           SAXReader reader = new SAXReader();
           try
          {
        
          // extract path value from description document
          Document document = reader.read(servicedesc);
          Element rootElement = document.getRootElement();
          Element pathElement = rootElement.element("path");
          String path = pathElement.getTextTrim();
          extensions.put("path", path);
         }
         catch (DocumentException e)
         {
          throw new WebScriptException("Failed to parse", e);
         }
         return extensions;
         }
        }
        ```

    3.  Compile the Java class.

    4.  Place the compiled Java class into the folder `org/example` within the web application classpath of the Alfresco content application server.

3.  Create the Spring Framework configuration file for registering your new web script.

    1.  Create an XML file whose name is: nodewebscript-context.xml

    2.  Register the Java classes as follows:

        ```
        
                        
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN 2.0//EN'
        'http://www.springframework.org/dtd/spring-beans-2.0.dtd'>
        <beans>
          <bean id="webscript.org.example.nodewebscript"
            class="org.example.NodeWebScript" parent="webscript"
            scope="prototype">
          <property name="repository" ref="repositoryHelper"/>
          </bean>
        
          <bean id="webscriptdesc.org.example.nodewebscript"
            class="org.example.NodeWebScriptExtension"/>
        </beans>
        
        
        ```

    3.  Place the Spring Framework configuration into the extension classpath of the Alfresco content application server.


Your example Java class extends `DeclarativeWebScript` just like other Java-backed web scripts. Its primary purpose is to locate a node in the Alfresco content repository given a node path, which it does using the `Repository` service. The `NodeRef` returned from the `Repository` service is placed into the web script model under the name `node`.

**Parent topic:**[Java-backed web scripts](../concepts/ws-folderListing-JavaBacked-create.md)

