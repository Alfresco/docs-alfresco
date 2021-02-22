---
author: Alfresco Documentation
---

# Installing the Docker Development mode license

In Development mode you don't need to manually install the license through the UI.

1.  Ensure there's a valid Enterprise license installed on your host machine at the following location:

    ```
    $HOME/.activiti/enterprise-license/activiti.lic
    ```

2.  Uncomment the volume directive in the docker-compose.yml file.

    **Note:** You can change this location by editing the volume mapping in the docker-compose.yml file.


**Parent topic:**[Differences between Trial and Development modes](../concepts/ps_docker_mode_differences.md)

