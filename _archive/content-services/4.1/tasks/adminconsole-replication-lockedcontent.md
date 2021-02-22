---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Administration, Version 3.4]
keyword: Share locked content source repository mapping URL identifier CMIS repositoryId
---

# Configuring Share to open locked content in the source repository

You can configure Alfresco Share to open a locked node in the source repository so that it can be edited.

Configure Share by mapping the remote repository identifier \(`repositoryId`\) and the remote Share URL. This then gives access to the remote repository.

1.  On the source repository, locate the `repositoryId` by browsing to the remote server's CMIS landing page using the following URL:

    ```
    http://{server}:{port}/alfresco/service/cmis/index.html
    ```

    The `repositoryId` field is displayed in the **CMIS Repository Information** panel.

2.  On the target repository, save the <web-extension\>\\share-config-custom.xml.sample file as <web-extension\>\\share-config-custom.xml.

3.  Locate the following example configuration in your <web-extension\>\\share-config-custom.xml file:

    ```
     <config evaluator="string-compare" condition="Replication">
          <share-urls>
                Example config entry:
                  <share-url repositoryId="622f9533-2a1e-48fe-af4e-ee9e41667ea4">http://new-york-office:8080/share/</share-url>
          </share-urls>
       </config>
    ```

    1.  Uncomment the `<share-url>` element.

    2.  Modify the `repositoryId` to match the value you located in step 1.

    3.  Change the URL to point to http://localhost:8080/share.

    4.  Save the <web-extension\>\\share-config-custom.xml file.

4.  On the target repository, reload the configuration by refreshing the web scripts:

    ```
    http://localhost:9080/share/service/index
    ```


**Parent topic:**[Setting up replication jobs](../concepts/adminconsole-replication-config.md)

