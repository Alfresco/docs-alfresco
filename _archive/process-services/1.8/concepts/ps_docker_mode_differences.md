---
author: Alfresco Documentation
---

# Differences between Trial and Development modes

The Docker container and Alfresco Process Services are the same in Trial and Development modes, but their use varies.

**Trial mode**

You can run Docker with minimal requirements. You don't need to configure the database or Elasticsearch because they're embedded. To run Trial mode type the following in the command line.

```
docker run -p 8080:8080 alfresco/process-services
```

This command starts the container on port 8080. The service should be ready in less than one minute. For more Docker commands see the [Docker help](https://docs.docker.com/engine/reference/commandline/cli/).

**Development mode**

This provides developers with a more persistent configuration \(a de-located database and Elasticsearch container\) for testing Alfresco Process Services apps. To use them go to the [aps-docker-library](https://github.com/Alfresco/ps-docker-library) repository and follow the instructions.

**Default user**: admin@app.activiti.com

**Password**: admin

**Tips for installing Docker in Development mode**

-   Automatic License

To avoid inserting the license every time you start a new container you may want to mount it as a volume.

To do so you need to have a valid Enterprise license \(both tenant or multi-tenant\) and use the volume directive from Docker to mount it under /root/.activiti/enterprise-license/.

```
version:
 '2' services:
     process: 
     image: 
     alfresco/process-services:1.6.0 
     environment: 
     ACTIVITI_CSRF_DISABLED: 'true' 
     ACTIVITI_CORS_ENABLED: 'true' 
     volumes: 
     - "/path/to/your/license:/root/.activiti/enterprise-license/:ro" 
     ports: 
     - 9999:8080
```

-   MySQL Drivers

You can use the same volume directive to mount any MySQL driver inside the container. In this case the target folder will always be /usr/share/tomcat/lib/.

-   **[Installing the Docker Development mode license](../tasks/ps_docker_lic_install.md)**  
In Development mode you don't need to manually install the license through the UI.

**Parent topic:**[Installing Process Services using Docker](../concepts/ps_installing_docker.md)

