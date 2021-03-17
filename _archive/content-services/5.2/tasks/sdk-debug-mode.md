---
author: Alfresco Documentation
---

# Running the project in debug mode

The first step is to run your project in debug mode irrespective of the IDE used. The command `mvnDebug` starts the application in remote debugging mode, where it listens on port `8000`, ready for a remote debugger to attach.

1.  To run your project in debug mode, launch the `debug` script in the root of the project from a terminal.

    Here is the result:

    ```
    The environment variable 'MAVEN_OPTS' is not set, setting it for you
    MAVEN_OPTS is set to '-Xms256m -Xmx2G'
    Preparing to Execute Maven in Debug Mode
    Listening for transport dt_socket at address: 8000
    ```

    The execution is locked until a remote connection is attached from an external service \(in this case, your preferred IDE\).

2.  Leave the instance locked and move to work on your preferred IDE, using a remote debugging configuration.


**Parent topic:**[Debugging](../concepts/sdk-debugging.md)

