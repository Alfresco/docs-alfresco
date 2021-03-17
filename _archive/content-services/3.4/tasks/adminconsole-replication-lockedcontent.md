---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Administration, Version 3.4]
keyword: Share locked content source repository mapping URL identifier CMIS repositoryId
---

# Configuring Share to open locked content in the source repository

For replication jobs, you must configure Alfresco Share to open a locked node in the source repository, where it can be edited. This is configured by mapping the remote repository identifier \(`repositoryId`\) and the URL, which gives access the remote repository.

1.  Locate the `repositoryId` by browsing to the remote server's CMIS landing page using the following URL:

    ```
    http://{server}:{port}/alfresco/service/cmis/index.html
    ```

    The `repositoryId` field is displayed in the **CMIS Repository Information** panel.

2.  Open the <web-extension\>\\share-config-custom.xml.sample file.

3.  Locate the following example configuration:

    ```
     <config evaluator="string-compare" condition="Replication">
          <share-urls>
             <!--
                To discover a Repository Id, browse to the remote server's CMIS landing page at:
                  http://{server}:{port}/alfresco/service/cmis/index.html
                The Repository Id field is found under the "CMIS Repository Information" expandable panel.
    
                Example config entry:
                  <share-url repositoryId="622f9533-2a1e-48fe-af4e-ee9e41667ea4">http://new-york-office:8080/share/</share-url>
             -->
          </share-urls>
       </config>
    ```

4.  Modify the `repositoryId` in the following line:

    ```
    <share-url repositoryId="622f9533-2a1e-48fe-af4e-ee9e41667ea4">http://new-york-office:8080/share/</share-url>
    ```

5.  Copy this configuration setting to your share-config-custom.xml file or save the sample file without the .sample extension.


**Parent topic:**[Setting up replication jobs](../concepts/adminconsole-replication-config.md)

