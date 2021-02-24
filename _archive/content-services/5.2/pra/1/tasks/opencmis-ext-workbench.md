---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Using the CMIS Workbench with Alfresco

The CMIS Workbench is a CMIS desktop client for developers. It is a repository browser and an interactive test bed for the OpenCMIS client API.

1.  Download the CMIS workbench zip file from the [Apache Chemistry](http://www.apache.org/dyn/closer.cgi/chemistry/opencmis) website.

2.  Unpack the contents of the zip file to a new directory.

3.  Navigate to the directory and run the following command to install the workbench:

    -   Unix: `workbench.sh`
    -   Windows: `workbench.bat`
4.  During the installation:

    1.  In the URL field, enter the Alfresco CMIS URL:

        http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom

        **Note:** This URL has changed since Alfresco One 4.2.1.

        For a Browser binding, use http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/browser.

    2.  Enter the user name and password.

    3.  Click **Load Repositories**.

    4.  Click **Login**.

5.  In the CMIS workbench, check that you can connect to the repository by running CMIS functions such as creating, updating, and deleting folders.


**Parent topic:**[Working with the CMIS API from Java](../../../concepts/opencmis-ext-intro.md)

