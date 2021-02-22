---
author: Alfresco Documentation
---

# Running integration tests using an existing Alfresco Content Services instance \(and hot reloading\)

Alfresco SDK is able to recognize if an Alfresco Content Services \(ACS\) instance is already running, and use it \(or launch it\) accordingly. This feature is very powerful for a couple of reasons. First of all, it allows you to focus on the integration tests, without worrying if the platform instance running, and also because you can use an existing ACS instance that's up running during the integration tests development. The second reason gives a relevant speed up to the development task, as described in the following content.

Look back at the [integration tests](sdk-test-run.md) example, you'll notice that it took 01:40 min for them to complete. It's not bad if we need to launch the integration tests just once \(or few times\). So what can we do if we need to launch the integration tests multiple times \(for example, during the development phase\)?

To significantly reduce the duration of the intergration tests, let's use an existing ACS instance, and run the tests in another session/process.

To test this in your environment follow these steps.

1.  Launch the `run` script, and wait for ACS to be fully available.

2.  Open another terminal and run `mvn integration-test`.

    You will see the following log messages:

    ```
    Results :
    
    Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
    
    [INFO] ------------------------------------------------------------------------
    [INFO] Reactor Summary:
    [INFO] 
    [INFO] AIO - SDK 3.0 Beta ................................. SUCCESS [  0.394 s]
    [INFO] Alfresco Platform/Repository JAR Module ............ SUCCESS [  1.797 s]
    [INFO] Alfresco Share JAR Module .......................... SUCCESS [  0.121 s]
    [INFO] Integration Tests Module ........................... SUCCESS [  3.533 s]
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time: 6.144 s
    [INFO] Finished at: 2017-05-12T14:59:28+02:00
    [INFO] Final Memory: 36M/448M
    [INFO] ------------------------------------------------------------------------
    ```

    Note how the integration tests only took 3.5 seconds. This is a huge improvement and time reduction.

    **Important:** Even if the improvement is great, there is a technical topic to mention that has a relevant impact on the development lifecycle. The SDK uses the source code related to the integration tests deployed directly on the platform side. This means that an update in the code for the Java classes will be included when you run the integration tests *if and only if* they are deployed in the platform. To avoid stopping/starting ACS with every change, use **hot reloading** as the only way to deploy the new version of the Java classes. For more details, see [Hot reloading](../concepts/sdk-hot-reloading.md).


**Parent topic:**[Integration testing](../concepts/sdk-integration-testing.md)

