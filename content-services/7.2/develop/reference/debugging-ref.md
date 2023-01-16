---
title: Debugging Content Services
---

As a developer you will need to be able to debug Content Services' product code, and custom code contained in [JARs/AMPs]({% link content-services/7.2/develop/extension-packaging.md %})
written by you. To do this we usually use so-called Remote debugging. This means that we start up Content Services in 
debug mode ready to accept remote debugging sessions. We then connect with a debugger such as IntelliJ IDEA or Eclipse 
using a *Remote* debugging session.

IntelliJ provides a [tutorial](https://www.jetbrains.com/help/idea/tutorial-remote-debug.html){:target="_blank"} on 
how to do remote debugging with the IDEA IDE using a Hello World example. It is worth having a look at this tutorial 
before continuing with this article to get an understanding of how to attach a debugger to a remote process. If you are
using Eclipse, then there is [this article](https://www.eclipse.org/community/eclipse_newsletter/2017/june/article1.php){:target="_blank"} 
that might be a good read before moving on.

If you are using any of the Alfresco SDKs, then you should be looking at the following sections for information about 
how to do remote debugging in these environments:

* [SDK 5 remote debugging]({% link content-services/7.2/develop/oop-sdk.md %}#debug-extension-project)
* [SDK 4 remote debugging]({% link content-services/7.2/develop/sdk.md %}#debugging)

## Introduction

Content Services is slightly more complex than the Hello World example above. Let’s see how to debug a ReST API call, 
such as the [login]({% link content-services/7.2/develop/rest-api-guide/install.md %}#auth) to get a ticket.

Remote debugging can be done either by running Content Services in [Docker containers](#docker-env) or by running in a 
local [Tomcat environment](#tomcat-env).

## Prerequisites

Download the following projects to your developer machine:

* [alfresco-community-repo](https://github.com/Alfresco/alfresco-community-repo){:target="_blank"}
* [acs-community-packaging](https://github.com/Alfresco/acs-community-packaging){:target="_blank"}
* [acs-packaging](https://github.com/Alfresco/acs-packaging){:target="_blank"}

Only the first project is needed here, as it contains the product source code, but it's recommended to have the other projects 
available as well. The packaging projects gives valuable information about how the Docker image for 
the Alfresco Repository is created. The packaging projects also contain information about how to create custom Docker images, 
which is very useful when custom [JARs/AMPs]({% link content-services/7.2/develop/extension-packaging.md %}) should be applied.

## Debug in a Docker environment {#docker-env}

To start remote debugging with Content Services running in Docker, then download the following project:

* [acs-deployment](https://github.com/Alfresco/acs-deployment){:target="_blank"}

Then change into the `/docker-compose` directory and create a copy of the file `community-docker-compose.yml` called 
`debug-community-docker-compose.yml`:

```bash
% git clone git@github.com:Alfresco/acs-deployment.git
Cloning into 'acs-deployment'...
...
% cd acs-deployment/docker-compose 
docker-compose % cp community-docker-compose.yml debug-community-docker-compose.yml

% ls -l
total 88
-rw-r--r--  1 admin  staff  7979 16 Jun 09:37 6.1.N-docker-compose.yml
-rw-r--r--  1 admin  staff  6846 16 Jun 09:37 6.2.N-docker-compose.yml
-rw-r--r--  1 admin  staff   189 16 Jun 09:37 README.md
-rw-r--r--  1 admin  staff  4931 16 Jun 09:37 community-docker-compose.yml
-rw-r--r--  1 admin  staff  4931 16 Jun 09:38 debug-community-docker-compose.yml
-rw-r--r--  1 admin  staff  7097 16 Jun 09:37 docker-compose.yml
```

### Configure Docker Compose for remote debugging

Edit the `debug-community-docker-compose.yml` file by adding the following `ports` and `environment` settings:

```text
services:
    alfresco:
        image: alfresco/alfresco-content-repository-community:7.1.0-M1
        mem_limit: 1500m
        ports:
            - 8000:8000
        environment:
            CATALINA_OPTS: "
                -agentlib:jdwp=transport=dt_socket,address=*:8000,server=y,suspend=n
                "
            JAVA_TOOL_OPTIONS: "
            ...
```

The `-agentlib:jdwp=transport=dt_socket,address=*:8000,server=y,suspend=n` option tells the JVM to start with the 
port 8000 open, ready to accept remote debugging sessions.

Note that the remote debugging configuration is done via the `CATALINA_OPTS` variable instead of `JAVA_TOOL_OPTIONS` or 
`JAVA_OPTS` as we need to instruct Tomcat running inside the Docker container, not the JVM directly (this is a big difference from the 
IntelliJ tutorial).

We need to also open the remote debug port from the container to the host, so that `http://localhost:8000` will be 
propagated to the container and Tomcat. This is done with the `ports` configuration.

### Run Content Services

Now, run Content Services and wait for it to start:

```bash
docker-compose -f debug-community-docker-compose.yml up
```

It's ready when you see logs as follows:

```bash
alfresco_1 | 2021-06-16 09:12:50,699  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-9] Starting 'Transformers' subsystem, ID: [Transformers, default]
alfresco_1 | 2021-06-16 09:12:50,884  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-9] Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
```

### Debug some source code {#debug-some-code}

To test out the new debug settings, let's debug the source code that is called when you call the remote API to [get a 
ticket]({% link content-services/7.2/develop/rest-api-guide/install.md %}#auth) that can be used for authentication.

Open the [alfresco-community-repo](https://github.com/Alfresco/alfresco-community-repo){:target="_blank"} project in 
IntelliJ IDEA and look up the `src/main/java/org/alfresco/rest/api/impl/AuthenticationsImpl.java` file. Set a breakpoint
in this file where a ticket is created, as shown:

![create-ticket-breakpoint]({% link content-services/images/acs-debug-idea-breakpoint-set.png %})

Set up a Remote debugging session in IDEA (**Run -> Debug... -> Edit Configurations... -> + -> Remote JVM Debug**):

![idea-remote-debug-setup]({% link content-services/images/acs-debug-idea-settings.png %})

Click **Debug** to start the debug session:

![remote-debug-session-started]({% link content-services/images/acs-debug-idea-session-started.png %})

Now, call the Remote API that is used to log in and get a ticket (using the default **admin/admin** credentials):

```bash
% curl --header "Content-Type: application/json" --request POST --data '{"userId":"admin","password":"admin"}' http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets
```

This should make the debugger stop on the breakpoint line in IDEA:

![idea-remote-debug-breakpoint-stop]({% link content-services/images/acs-debug-idea-create-ticket.png %})

We can see the credentials used to log in, and start debugging the code as we are used to.

This way of debugging works equally well for any custom code that you have applied to Content Services.

## Debug in a Tomcat environment (no containers) {#tomcat-env}

To start remote debugging with Content Services running directly in Tomcat (i.e. not using containers but 
running Content Services based on a [ZIP installation]({%link content-services/7.2/install/zip/index.md %})), 
then make sure you start Tomcat in debug mode (similar to how we configured the `CATALINA_OPTS` variable 
in the container environment).

See this [StackOverflow article](https://stackoverflow.com/questions/16689274/how-to-start-debug-mode-from-command-prompt-for-apache-tomcat-server){:target="_blank"} 
for more information about how to start Apache Tomcat in debug mode. This article also links to the official 
[Tomcat development](https://cwiki.apache.org/confluence/display/TOMCAT/Developing#Developing-Debugging){:target="_blank"} 
page, which is a good read.

### Debug some source code

Debugging in a Tomcat environment is the same as in a Docker container environment, see [this section above](#debug-some-code).
