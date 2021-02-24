---
author: Alfresco Documentation
---

# Installing Process Services using Docker

Process Services can be deployed using a Docker container.

Deployment using a Docker container is aimed at the following specific use cases:

-   **Trial mode**: pull the container and run it with the following command:
    -   `docker run –d –p 8080:8080 alfresco/process-services`
-   **Development mode**: Use one of the supplied examples in the GitHub repository to create a full PSEP \(Process Services Elasticsearch, Postgres\) stack in your own laptop using docker-compose\)

The Docker container comes with an embedded elastic-search server and H2 database drivers embedded as a choice, but also supports Postgres out of the box.

-   **[Configuring the Docker container environment variables](../concepts/ps_docker_env.md)**  
It is possible to override variables to configure the Docker container.
-   **[Differences between Trial and Development modes](../concepts/ps_docker_mode_differences.md)**  
The Docker container and Alfresco Process Services are the same in Trial and Development modes, but their use varies.

**Parent topic:**[Administering](../topics/adminGuide.md)

