---
title: Debugging Content Services
---

As a developer you will need to be able to debug Content Services' product code, and custom code contained in [JARs/AMPs]({% link content-services/latest/develop/extension-packaging.md %})
written by you. To do this we usually use so-called Remote debugging. This means that we start up Content Services in 
debug mode ready to accept remote debugging sessions. We then connect with a debugger such as IntelliJ IDEA or Eclipse 
using a *Remote* debugging session.

IntelliJ provides a [tutorial](https://www.jetbrains.com/help/idea/tutorial-remote-debug.html){:target="_blank"} on 
how to do remote debugging with the IDEA IDE using a Hello World example. It is worth having a look at this tutorial 
before continuing with this article to get an understanding of how to attach a debugger to a remote process. 

If you are using any of the Alfresco SDKs, then you should be looking at the following sections for information about 
how to do remote debugging in these environments:

* [SDK 5 remote debugging]({% link content-services/latest/develop/oop-sdk.md %}#debug-extension-project)
* [SDK 4 remote debugging]({% link content-services/latest/develop/sdk.md %}#debugging)

## Introduction
Content Services is slightly more complex than the Hello World example above. Let’s see how to debug a remote API locally, 
in a real-world use case, like (for example) debugging a CMIS API that is called by a CMIS TAS Unit Test in 
Alfresco Community Repo.

Remote debugging can be done either by running Content Services in Docker containers or by running in a local 
Tomcat environment using the `mvnDebug` command.

## Prerequisites
Download the following four projects to your developer machine:

* [alfresco-community-repo](https://github.com/Alfresco/alfresco-community-repo){:target="_blank"}
* [acs-community-packaging](https://github.com/Alfresco/acs-community-packaging){:target="_blank"}
* [acs-packaging](https://github.com/Alfresco/acs-packaging){:target="_blank"}
    
Only the first project is needed here, it contains the product source code, but it's recommended to have the other projects 
available as well. The packaging projects will give you valuable information about how the Docker Image for 
the Alfresco Repository is created. The packaging projects also contain information about how to create custom Docker Images, 
which can be very useful when custom [JARs/AMPs]({% link content-services/latest/develop/extension-packaging.md %}) should be applied.

### Debugging in a Docker environment 
If you will be doing the remote debugging with Content Services running in Docker, then download the following project:

* [acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"}

Then change into the `/docker-compose` directory and create a copy of the file `community-docker-compose.yml` called 
`debug-community-docker-compose.yml`.

### TAS tests example
Change `alfresco.port=8082` into `alfresco.port=8080` in 
`alfresco-community-repo/packaging/tests/tas-cmis/src/test/resources/default.properties`.
This is because we will start Content Services locally on 8080 (instead of 8082, which is the default).

### Steps for Docker
Edit the `debug-community-docker-compose.yml` file by adding the following `ports` and `environment` settings:

```text
services:
    alfresco:
        ports:
            - 8000:8000
        environment:
            CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,address=*:8000,server=y,suspend=n"
            ...
```

The `-agentlib:jdwp=transport=dt_socket,address=*:8000,server=y,suspend=n` option will tell the JVM to start with the 
port 8000 open, ready to accept remote debugging sessions.

Note that the remote debugging configuration is done via the `CATALINA_OPTS` variable instead of `JAVA_TOOL_OPTIONS` or 
`JAVA_OPTS` as we need to instruct Tomcat running inside the Docker container, not the JVM directly (this is a big difference from the 
IntelliJ tutorial).

Now, we need to also open the remote debug port from the container to the host, so that `http://localhost:8000` will be 
propagated to the container and Tomcat, this is done with the `ports` configuration.


then run ACS with docker-compose -f debug-community-docker-compose.yml up and wait it starts


