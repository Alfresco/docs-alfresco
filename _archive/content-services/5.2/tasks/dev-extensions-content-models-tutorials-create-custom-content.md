---
author: Alfresco Documentation
---

# Creating content of custom type

In this tutorial you create some content of one of the custom types defined in your custom model. This is done using a simple web script so that the type can be conveniently specified.

It is assumed that you are familiar with web scripts. If not, you might want to work through the [web script tutorials](ws-tutorials.md).

Using the model defined in the [previous tutorial](dev-extensions-content-models-tutorials-deploy-model.md), you run a simple web script to create content of type `my:whitepaper`.

1.  In your IDE, navigate to the aio/aio-platform-jar/src/main/resources/alfresco/extension/templates/webscripts folder.

2.  In the next part of this tutorial, you create three files for the test web script, modeltest.get.desc.xml, modeltest.get.html.ftl, and modeltest.get.js in the webscripts folder.
3.  In the webscripts folder, create the web script description file, modeltest.get.desc.xml, with the following content:

    ```
    
                            
    <webscript>
       <shortname>Model test</shortname>
       <family>Tutorials</family>
       <description>Creates content of a custom type</description>
       <url>/modeltest/{documentName}</url>
       <format default="html">extension</format>
       <authentication>user</authentication>
    </webscript>                        
                            
                        
    ```

    You can specify the name of the document to create - it is passed as a parameter via the URL. To keep things simple the type of the content is hardcoded in the JavaScript code to be of type `my:whitepaper`.

4.  In the webscripts folder, create a new JavaScript file, modeltest.get.js, with the following content:

    ```
    
                            
    var contentType = "my:whitepaper";
    var documentName = url.templateArgs.documentName;
    
    var document = companyhome.createNode(documentName, contentType);
    
    if (document != null){
    	model.document = document;
    	model.msg = "Created OK!";
    }
    else {
    	model.msg = "Failed to create document!";
    }                        
                            
                        
    ```

    The web script simply creates a new document of type whitepaper. If the operation fails an error message is recorded and this will be displayed by the corresponding template file. If the operation is successful, the reference to the created document itself is stored in the model for use by the template.

5.  In the webscripts folder, create a new FreeMarker template file, modeltest.get.html.ftl, with the following contents:

    ```
    
                        
    <p>Creating the following document:</p>
    <ul>
    	<li>${document.name}</li>
    	<li>${document.type}</li>
    </ul>
    <b>${msg}</b>                    
                        
                        
    ```

    The template file simply extracts the name and type from the document object and displays it, along with the message passed from the JavaScript code.

6.  Point your web browser at the web scripts index at `http://localhost:8080/alfresco/service/index`.

7.  You can click **Browse 'Tutorials' Web Scripts** to view your web script and confirm that it is indeed present.

8.  Run the web script by specifying a URL such as the following \(you can change the name of the document if you wish\):

    ```
    
                            
    http://localhost:8080/alfresco/service/modeltest/MyWhitepaper                        
                            
                        
    ```

    You will see a page displayed such as the following:

    ```
    
                            
    Creating the following document:
    
        MyWhitepaper
        {http://www.mycompany.com/model/content/1.0}whitepaper
    
    Created OK!                        
                            
                        
    ```

    Note that the fully qualified type name is as specified in your custom model file. If you try to create a content of a type that does not exist you will get an error.

9.  Run the web script a few times to create several documents.

10. Log into Share. You can use the Node Browser to search for nodes of the custom type.

11. On the main Share menu select **Admin Tools** and then from the left-hand **Tools Menu** select **Node Browser**.

    The Node Browser interface will be displayed.

12. In the search box type the following query:

    ```
    
                            
    TYPE:"{http://www.mycompany.com/model/content/1.0}whitepaper"                        
                            
                        
    ```

13. Click the **Search** button.

    A list of nodes with the specified type, `my:whitepaper`, will be returned.


You have created some content of custom type `my:whitepaper` in the repository. You then used the Node Browser to find content only of this custom type.

**Parent topic:**[Content model tutorials](../concepts/dev-extensions-content-models-tutorials-intro.md)

