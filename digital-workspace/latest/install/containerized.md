---
title: Install Containerized
---

Alfresco Digital Workspace is deployed as part of Alfresco Content Services using Helm charts or a Docker Compose file. Both these methods include a lightweight, pre configured, NGINX server and Digital Workspace application. Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

It is recommended you familiarize yourself with the concepts of containerized deployment before working with Helm charts, and Docker. See [Understanding containerized deployment]({% link content-services/latest/install/containers/index.md %}) for more information.

Follow these links to find out how to deploy Digital Workspace using Helm charts or Docker Compose:

* [Deploying Alfresco Content Services with Helm charts on AWS]({% link content-services/latest/install/containers/helm.md %}).
* [Deploying using Docker Compose]({% link content-services/latest/install/containers/docker-compose.md %}).

## Docker Compose install

If you are using Docker Compose to install the Digital Workspace, you can add environment variables to your `docker-compose.yml` file. For more on the avilable properties see [Configure Digital Workspace]({% link digital-workspace/latest/config/index.md %}).

For example, to configure how to handle downloading large files from within the Digital Workspace:

```yml
digital-workspace:
    image: quay.io/alfresco/alfresco-digital-workspace:4.x.x
    mem_limit: 128m
    environment:
      APP_CONFIG_AUTH_TYPE: "BASIC"
      BASE_PATH: ./
      APP_BASE_SHARE_URL: "http://localhost:8080/workspace/#/preview/s"
      APP_CONFIG_ENABLE_DOWNLOAD_PROMPT: true
      APP_CONFIG_ENABLE_DOWNLOAD_PROMPT_REMINDERS: true
      APP_CONFIG_DOWNLOAD_PROMPT_DELAY: 30
      APP_CONFIG_DOWNLOAD_PROMPT_REMINDER_DELAY: 50
      APP_CONFIG_ENABLE_FILE_AUTO_DOWNLOAD: true
      APP_CONFIG_FILE_AUTO_DOWNLOAD_SIZE_THRESHOLD_IN_MB: 15
```
