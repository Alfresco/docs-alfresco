---
author: Alfresco Documentation
---

# Custom REST endpoints

It’s possible to add custom REST endpoints to the BPM Suite, both in the regular REST API \(used by the BPM Suite html/javascript UI\) and the *public* API \(using basic authentication instead of cookies\).

The REST API is built using Spring MVC. Please check the [Spring MVC documentation](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html) on how to create new Java beans to implement REST endpoints.

To build against the REST logic of Process Services and its specific dependencies, add following dependency to your Maven *pom.xml* file:

```
<dependencies>
    <dependency>
        <groupId>com.activiti</groupId>
        <artifactId>activiti-app-rest</artifactId>
        <version>${suite.version}</version>
    </dependency>
</dependencies>
```

**The bean needs to be in the com.activiti.extension.rest package to be found.**

A very simple example is shown below. Here, the Process Services `TaskService` is injected and a custom response is fabricated. Of course, this logic can be anything.

```
package com.activiti.extension.rest;

import com.activiti.domain.idm.User;
import com.activiti.security.SecurityUtils;
import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/my-rest-endpoint")
public class MyRestEndpoint {

    @Autowired
    private TaskService taskService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public MyRestEndpointResponse executeCustonLogic() {

        User currentUser = SecurityUtils.getCurrentUserObject();
        long taskCount = taskService.createTaskQuery().taskAssignee(String.valueOf(currentUser.getId())).count();

        MyRestEndpointResponse myRestEndpointResponse = new MyRestEndpointResponse();
        myRestEndpointResponse.setFullName(currentUser.getFullName());
        myRestEndpointResponse.setTaskCount(taskCount);
        return myRestEndpointResponse;

    }

    private static final class MyRestEndpointResponse {

        private String fullName;
        private long taskCount;

                // Getters and setters

    }

}
```

Create a jar containing this class, and add it to the classpath.

A class like this in the **com.activiti.extension.rest** package will be added to the rest endpoints for the application \(e.g. for use in the UI\), which use the cookie approach to determine the user. **The url will be mapped under /app**. So, if logged in into the UI of the BPM Suite, one could go to *http://localhost:8080/activiti-app/app/rest/my-rest-endpoint* and see the result of the custom rest endpoint:

```
{"fullName":" Administrator","taskCount":8}
```

To add a custom REST endpoint to the *public REST API*, protected by basic authentication, a similar class should be placed in the **com.activiti.extension.api package**:

```
package com.activiti.extension.api;

import com.activiti.domain.idm.User;
import com.activiti.security.SecurityUtils;
import org.activiti.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enterprise/my-api-endpoint")
public class MyApiEndpoint {

    @Autowired
    private TaskService taskService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public MyRestEndpointResponse executeCustonLogic() {

        User currentUser = SecurityUtils.getCurrentUserObject();
        long taskCount = taskService.createTaskQuery().taskAssignee(String.valueOf(currentUser.getId())).count();

        MyRestEndpointResponse myRestEndpointResponse = new MyRestEndpointResponse();
        myRestEndpointResponse.setFullName(currentUser.getFullName());
        myRestEndpointResponse.setTaskCount(taskCount);
        return myRestEndpointResponse;

    }

    private static final class MyRestEndpointResponse {

        private String fullName;
        private long taskCount;

        // Getters and setters

    }

}
```

Note that the endpoint needs to have */enterprise* as first element in the url, as this is configured in the SecurityConfiguration to be protected with basic authentication \(more specific, the *api/enterprise/\** is\).

Which can be accessed like the regular API:

```
> curl -u admin@app.activiti.com:password http://localhost:8080/activiti-app/api/enterprise/my-api-endpoint

> {"fullName":" Administrator","taskCount":8}
```

**Note: Due to classloading, it is currently not possible to put jars with these custom rest endpoints in the global or common classpath \(for example tomcat/lib for Tomcat\). They should be put in the web application classpath \(for example WEB-INF/lib\).**

**Parent topic:**[Custom Logic](../topics/custom_logic.md)

