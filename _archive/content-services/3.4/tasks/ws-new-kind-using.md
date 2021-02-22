---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, Folder Listing]
---

# Using a new kind of web script

When developing a scripted web script, you can specify its kind through its web script description document. If the new kind of web script supports extensions to the web script description document, you must provide those as well. Otherwise, development of the web script is the same as any other web script.

This example implements a simple web script based on the example `NodeWebScript` kind, which renders information about the Data Dictionary folder in the Alfresco content repository.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the **org** space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the **example** space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

    4.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

5.  Create a web script description document for your Data Dictionary information sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: info.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript kind="org.example.nodewebscript">
          <shortname>Node Info</shortname>
          <description>Demonstration of Web script Kind</description>
          <url>/info</url>
          <authentication>user</authentication>
          <path>Company Home/Data Dictionary</path>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a web script response template for your Data Dictionary information sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: info.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        ${node.name} created on ${node.properties.created?date}
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

7.  Register the Data Dictionary Information web script with Alfresco:

    1.  Type the following in your web browser, and log in with the user name admin and password admin if requested:`http://localhost:8080/alfresco/service/index`

    2.  Click **Refresh Web Scripts**. A message displays indicating there is one additional web script.

8.  Test the web script:

    1.  Open a web browser and enter: `http://localhost:8080/alfresco/service/info`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Look for a message similar to **Data Dictionary created on Jan 12, 2010**. This means your web script is working.


The web script kind is specified through the `kind` attribute of the `<webscript>` element contained within the web script description document. Its value is the `<web script kind id>` as defined in the Spring configuration for the new kind of web script.

In your example, the `NodeWebScript` kind is selected by specifying its identifier of `org.example .nodewebscript`:

```
<webscript **kind="org.example.nodewebscript"**>
. . .
**<path\>**Company Home/Data Dictionary</path>
. . .
</webscript>
```

As expected by the `NodeWebScript`, the description document also specifies a path to a node in the Alfresco content repository. In the example, you specify the Data Dictionary folder through the custom `<path>` element. Your example does not provide a controller script, as the `NodeWebScript` Java class already encapsulates the behavior of locating a node given a path and populating the web script model. In this case, the located node is placed into the web script model under the name `node`.

`${node.name} created on ${node.properties.created?date}`

This means the response template can simply refer to `node` to render the output.

**Parent topic:**[Java-backed web scripts](../concepts/ws-folderListing-JavaBacked-create.md)

