---
title: Debugging remote APIs
---

Debugging local Content Services code with an IDE is usually straight forward, but what if the code is calling a 
remote API? How do you debug that? The debugger would perform the call, then move to the next line to process the result, 
completely bypassing the remote API call.

To see what is happening inside the remote API itself, we need to start the remote API with a special port open 
for debugging purposes. Then we must configure the debugger with information about where to attach to the remote debug 
session.

IntelliJ provides a [tutorial](https://www.jetbrains.com/help/idea/tutorial-remote-debug.html){:target="_blank"} on 
how to do remote debugging with the IDEA IDE using a Hello World example. It is worth having a look at this tutorial 
before continuing with this article.

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
    
Only the first project is needed here, but it's recommended to have the other projects available, so might as well get 
them from the beginning. The packaging projects will give you valuable information about how the Docker Image for 
the Alfresco Repository is created. The packaging projects also contain information about how to create custom Docker Images, 
which can be very useful when custom JARs/AMPs should be applied.

### Docker 
If you will be doing the remote debugging with Content Services running in Docker, then download the following project:

* [acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"}

Then change into the `/docker-compose` directory and create a copy of the file `community-docker-compose.yml` called 
`debug-community-docker-compose.yml`.

### TAS tests example
Change `alfresco.port=8082` into `alfresco.port=8080` in 
`alfresco-community-repo/packaging/tests/tas-cmis/src/test/resources/default.properties`.
This is because we will start Content Services locally on 8080 (instead of 8082, which is the default).



