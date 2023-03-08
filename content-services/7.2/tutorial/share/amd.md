---
title: Adding AMD packages (Aikau)
---

In this tutorial you will learn how to add AMD packages via Extension Modules, rather than having to edit `surf.xml`.

This tutorial assumes you have completed the [Customizing Share Header]({% link content-services/7.2/tutorial/share/header.md %}) tutorials. In this 
[section]({% link content-services/7.2/tutorial/share/header.md %}#customsitesmenu) 
you had to add the `tutorials` package by editing `surf.xml`. As this is a system file it can only be done by administrators, 
and is therefore somewhat inconvenient for the deployment of third-party extensions. To get around this issue it is now 
possible (from 4.2.2 onwards) to add new packages via an extension module.

1.  Open the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml` file.

2.  Add the following module:

    ```xml
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

3.  Start the server:

    ```bash
    /all-in-one$ ./run.sh build_start
    ```

4.  Log in to Share. Use the View Source facility of your browser to view the source code for any page.

    You will see a list of loaded packages, such as the following:

    ```javascript
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
