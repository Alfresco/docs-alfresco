---
title: Tailor your installation
---

When installing Alfresco Content Services, an important part of the configuration process is the removal of any unused applications. Use this information to determine any applications that you might want to remove from your installation and how to remove them.

For example, if you want a Share-only tier, remove the Alfresco WAR file and any Solr configurations. Likewise, if you want an Alfresco-only tier, remove the Alfresco Share WAR file and any Solr configurations.

## Remove the alfresco.war file

The Alfresco WAR file is a bundle file containing the required WAR files, additional commands, configuration files, and licenses for a manual installation. Use this information to remove the `alfresco.war` file from your application.

If you want a Share-only tier in your application, you will need to delete the `alfresco.war` file from your application server. The `alfresco.war` file is stored in the `<TOMCAT_HOME>` directory.

1. Navigate to the `<TOMCAT_HOME>/webapps` directory.

2. Delete the `alfresco.war` file.

You've successfully removed the `alfresco.war` file from your application server.

## Remove the share.war file

Use this information to remove the `share.war` file from your application.

If you want an Alfresco Content Services-only tier in your application, you'll need to delete the `share.war` file from your application server. The `share.war` file is stored in the `<TOMCAT-HOME>` directory.

1. Navigate to the `<TOMCAT_HOME>/webapps` directory.

2. Delete the `share.war` file.

You've successfully removed the `share.war` file from your application server.

### What to do next

Next, you can [Modify Alfresco Content Services applications](#LINK-concepts/modify-alf-apps.md)

## Adding a reverse proxy in front of Alfresco Content Services

It's good security practice to have a reverse proxy in front of your Alfresco Content Services infrastructure.

This proxy is then configured with a whitelist of allowed URLs, and blocks everything else.

<!-- needs more details -->
<!-- You can find a sample NGINX configuration in our GitHub project, [https://github.com/Alfresco/acs-ingress](https://github.com/Alfresco/acs-ingress), and the corresponding image in Docker Hub, [alfresco/alfresco-acs-nginx](https://hub.docker.com/r/alfresco/alfresco-acs-nginx).-->
