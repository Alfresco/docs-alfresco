---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Opening locked content in the source repository

For replication jobs, you must configure Alfresco to open a locked node in the source repository, where it can be edited. This is configured by mapping the remote repository identifier \(`repositoryId`\) and the URL, which gives access the remote repository.

1.  On the source repository, locate your current `repositoryId` in Admin Console \> General \> Repository Information:

    ```
    http://localhost:8080/alfresco/s/enterprise/admin/admin-repositoryinfo
    ```

2.  On the target repository, save the <web-extension\>\\share-config-custom.xml.sample file as <web-extension\>\\share-config-custom.xml.

    1.  Locate the following example configuration in your <web-extension\>\\share-config-custom.xml file:

        ```
         <config evaluator="string-compare" condition="Replication">
              <share-urls>
                    Example config entry:
                      <share-url repositoryId="622f9533-2a1e-48fe-af4e-ee9e41667ea4">http://new-york-office:8080/share/</share-url>
              </share-urls>
           </config>
        ```

    2.  Uncomment the `<share-url>` element.

    3.  Modify the `repositoryId` to match the value you located in step 1.

    4.  Change the URL to point to http://localhost:8080/share.

    5.  Save the <web-extension\>\\share-config-custom.xml file.

3.  On the target repository, reload the configuration by refreshing the web scripts:

    ```
    http://localhost:8080/share/service/index
    ```


**Parent topic:**[Setting up and managing content replication](../concepts/admintools-replication-config.md)

