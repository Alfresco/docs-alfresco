---
author: Alfresco Documentation
---

# Testing the new kind of web script

When developing a scripted web script, you can specify its kind through its web script description document. If the new kind of web script supports extensions to the web script description document, you must provide those as well. Otherwise, development of the web script is the same as any other web script.

This example implements a simple web script based on the example `NodeWebScript` kind, which renders information about the Data Dictionary folder in the repository.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a web script description document for your Data Dictionary information sample:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field: `info.get.desc.xml`

    3.  Type the following in the content box:

        ```
        
        
        <webscript kind="org.example.nodewebscript">
          <shortname>Node Info</shortname>
          <description>Demonstration of Web script Kind</description>
          <url>/info</url>
          <authentication>user</authentication>
          <path>Company Home/Data Dictionary</path>
        </webscript>
        
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the folder org/example using the breadcrumb trail.

4.  Create a web script response template for your Data Dictionary information sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name for the web script in the Name field: `info.get.html.ftl`

    3.  Type the following in the content box:

        ```
        ${node.name} created on ${node.properties.created?date}
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumbs trail.

5.  Register the Data Dictionary Information web script with Alfresco Content Services:

    1.  Type the following in your web browser, and log in with the user name `admin` and password `admin` if requested:`http://localhost:8080/alfresco/service/index`

    2.  Click **Refresh Web Scripts**. A message displays indicating there is one additional web script.

6.  Test the web script:

    1.  Open a web browser tab and enter: `http://localhost:8080/alfresco/service/info`

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Look for a message similar to the following:

        ```
        
        Data Dictionary created on Feb 15, 2013                
                      
        ```

        This means your web script is working.


The web script kind is specified through the `kind` attribute of the `<webscript>` element contained within the web script description document. Its value is the `<web script kind id>` as defined in the Spring configuration for the new kind of web script.

In your example, the `NodeWebScript` kind is selected by specifying its identifier of `org.example .nodewebscript`:

```
<webscript **kind="org.example.nodewebscript"**>
. . .
**<path\>**Company Home/Data Dictionary</path>
. . .
</webscript>
```

As expected by the `NodeWebScript`, the description document also specifies a path to a node in the repository. In the example, you specify the Data Dictionary folder through the custom `<path>` element. Your example does not provide a controller script, as the `NodeWebScript` Java class already encapsulates the behavior of locating a node given a path and populating the web script model. In this case, the located node is placed into the web script model under the name `node`.

`${node.name} created on ${node.properties.created?date}`

This means the response template can simply refer to `node` to render the output.

**Parent topic:**[Creating a new kind of web script](../tasks/ws-new-kind-create.md)

