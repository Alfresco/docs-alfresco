---
author: Alfresco Documentation
---

# Adding AMD packages via Extension Modules \(Aikau\)

It is possible to add new AMD packages via Extension Modules, rather than having to edit surf.xml.

This tutorial assumes you have completed the [Customizing Share Header](dev-extensions-share-tutorials-custom-share-header-menu.md) tutorials.

In this tutorial you will learn how to add AMD packages via Extension Modules. In a [previous tutorial](dev-extensions-share-tutorials-custom-header-sites-menu.md) you had to add the `tutorials` package by editing surf.xml. As this is a system file it can only be done by administrators, and is therefore somewhat inconvenient for the deployment of third-party extensions. To get around this issue it is now possible \(from 4.2.2 onwards\) to add new packages via an extension module.

1.  In Eclipse, load the file config/alfresco/site-data/extensions/extension-modules.xml into the editor.

2.  Add the following module:

    ```
    
                            
       <module>
          <id>Add a Custom Package</id>
          <version>1.0</version>
          <auto-deploy>true</auto-deploy>
          <configurations>
            <config evaluator="string-compare" condition="WebFramework" replace="false">
              <web-framework>
                <dojo-pages> 
                    <packages> 
                        <package name="custompackage" location="js/custompackage"/> 
                    </packages>
                </dojo-pages>
              </web-framework>
            </config>
          </configurations>
        </module>                        
                            
                        
    ```

3.  In the Package Explorer right-click on the build.xml file and select **Run As** \> **Ant Build**.

    This builds a new JAR file that was already deployed in the previous tutorial.

4.  Restart the application server \(for example, Tomcat\).

5.  Log in to Share. Use the View Source facility of your bowser to view the source code for any page.

    You will see a list of loaded packages, such as the following:

    ```
    
                        
        var dojoConfig = {
           baseUrl: "/share/res/",
           tlmSiblingOfDojo: false,
           async: true,
           parseOnLoad: false,
           packages: [
              { name: "alfresco", location: "js/alfresco" },
              { name: "tutorials", location: "js/tutorials" },
              { name: "custompackage", location: "js/custompackage" },
              { name: "surf", location: "js/surf" },
              { name: "dojo", location: "js/lib/dojo-1.9.0/dojo" },
              { name: "dijit", location: "js/lib/dojo-1.9.0/dijit" },
              { name: "dojox", location: "js/lib/dojo-1.9.0/dojox" }
           ]
        };                    
                        
                    
    ```

    Ensure that the new package, `custompackage` is in the list.


**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials-intro.md)

