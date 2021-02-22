---
author: Alfresco Documentation
source: 
audience: 
---

# Create a custom REST service in Alfresco Analytics

If you want to create complex custom reports using Alfresco Analytics, you can create a REST service that receives data from the database and displays it in Alfresco Share.

These instructions show you how to use the Pentaho Community Data Access \(CDA\) plugin to retrieve data from the OLAP cube \(in the database\). The CDA plugin sends an MDX query to Mondrian and receives a response as JSON data. See [Community Data Access](http://www.webdetails.pt/ctools/cda/) for information about how to download the CDA plugin.

1.  Log in to the Pentaho User Console \(BA server\) as a user that is a member of the ANALYTICS\_ADMINISTRATORS group.

    Enter the following URL:

    ```
    http://server:port/pentaho/Home
    ```

    where `server` and `port` are the server and port number where the BA server is installed.

2.  Select File \> New \> Analysis Report and choose the cube that you want to analyze.

3.  Use the Pentaho User Console to create a report showing the data that you are interested in.

4.  In the Pentaho User Console, open the Tools menu and select Administration \> Log.

    In the window that opens, look for the last executed MDX query in the Message column. This query was used to populate the data that is visible in the Pentaho User Console.

5.  Copy the MDX query into a text editor for use in [step 7](analytics-rest-service.md#step7).

6.  From the toolbar, click Browse and navigate to Public \> Alfresco \> cda. Select and edit the Alfresco-Authenticated-Reports.cda file.

    An inline editor opens.

7.  In the inline editor, add a new `<DataAccess>` element by copying the commented-out sample in the file. Replace the sample query in the `<Query>` element with your own MDX query from the text editor.

    Ensure that the `connection` attribute in the `<DataAccess>` element points to the OLAP cube that you selected by comparing it to the `id` attributes in the `<Connection>` element.

8.  Save your new report with a suitable name.

9.  Click Preview to test your query, and in the new window that opens click the Data Access menu and select the new report.

    You will see a table returning the data from your report.

    You can now use this report as a REST service from Alfresco Share.

10. To test the report itself, log in to Alfresco Share and open a Javascript debugger in your browser, and using the right click menu in your Share browser, select Inspect Element.

11. Click the Console tab, and copy and paste the following code:

    ```
    `require(["dojo/request/xhr"], function(xhr){
    
    xhr("http://localhost:8080/share/proxy/alfresco/pentaho/plugin/cda/api/doQuery?path=/public/Alfresco/cda/Alfresco-Authenticated-Reports.cda&dataAccessId=1")
        });`
    ```

    and click Enter. View the result in the Network tab.

    **Note:** Ensure that the `dataAccessId` parameter matches the `id` attribute of the `<DataAccess>` element.

    **Note:** The report you have created is accessible by all authenticated users.

12. To create a report that is accessible only by users from certain Alfresco groups; for example, ANALYTICS\_ADMINISTRATORS or ANALYTICS\_BUSINESS\_ANALYSTS, go back the Pentaho User Console and follow these steps:

    1.  Make a copy of Alfresco-Authenticated-Reports.cda and rename it; for example, Alfresco-Administrator-Reports.cda

    2.  Ensure that it contains the reports you want.

    3.  Click the Properties file action for your new file.

    4.  Select the Share tab.

    5.  Deselect the Inherits folder permissions check box.

    6.  Ensure that only your chosen roles are shown with Read permission in the Users and Roles list.


