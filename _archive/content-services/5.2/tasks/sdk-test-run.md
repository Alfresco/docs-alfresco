---
author: Alfresco Documentation
---

# Running the integration tests

1.  To run the integration tests, type the following command:

    `MAVEN_OPTS="-Xms256m -Xmx2G" mvn integration-test`

    After compiling the source code, the SDK also launches Alfresco Content Services \(ACS\), recognizing that there's no active instance of the platform. After some time \(and a lot of log messages\), you should see the following:

    ```
    -------------------------------------------------------
    T E S T S
    -------------------------------------------------------
    Running com.example.platformsample.DemoComponentIT
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.DemoComponentIT#testChildNodesCount
    RunTestWebScript: [clazz=com.example.platformsample.DemoComponentIT][method=testChildNodesCount]
    Running com.example.platformsample.DemoComponentIT Integration Test: testChildNodesCount()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.DemoComponentIT#testChildNodesCount#testChildNodesCount, ignoreCount=0, wasSuccessful=true, runTime=9, runCount=1, resultObject=org.junit.runner.Result@1a855e8c, failureCount=0}
    RunTestWebScript: Stopped executing
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.DemoComponentIT#testGetCompanyHome
    RunTestWebScript: [clazz=com.example.platformsample.DemoComponentIT][method=testGetCompanyHome]
    Running com.example.platformsample.DemoComponentIT Integration Test: testGetCompanyHome()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.DemoComponentIT#testGetCompanyHome#testGetCompanyHome, ignoreCount=0, wasSuccessful=true, runTime=1, runCount=1, resultObject=org.junit.runner.Result@15a00ef8, failureCount=0}
    RunTestWebScript: Stopped executing
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.449 sec - in com.example.platformsample.DemoComponentIT
    Running com.example.platformsample.CustomContentModelIT
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.CustomContentModelIT#testCustomContentModelPresence
    RunTestWebScript: [clazz=com.example.platformsample.CustomContentModelIT][method=testCustomContentModelPresence]
    Running com.example.platformsample.CustomContentModelIT Integration Test: testCustomContentModelPresence()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.CustomContentModelIT#testCustomContentModelPresence#testCustomContentModelPresence, ignoreCount=0, wasSuccessful=true, runTime=0, runCount=1, resultObject=org.junit.runner.Result@67254e7, failureCount=0}
    RunTestWebScript: Stopped executing
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.CustomContentModelIT#testCreateAcmeDocument
    RunTestWebScript: [clazz=com.example.platformsample.CustomContentModelIT][method=testCreateAcmeDocument]
    Running com.example.platformsample.CustomContentModelIT Integration Test: testCreateAcmeDocument()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.CustomContentModelIT#testCreateAcmeDocument#testCreateAcmeDocument, ignoreCount=0, wasSuccessful=true, runTime=150, runCount=1, resultObject=org.junit.runner.Result@4ae99f9c, failureCount=0}
    RunTestWebScript: Stopped executing
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.264 sec - in com.example.platformsample.CustomContentModelIT
    Running com.example.platformsample.HelloWorldWebScriptIT
    Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.204 sec - in com.example.platformsample.HelloWorldWebScriptIT
    
    Results :
    
    Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
    
    [WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent! The file encoding for reports output files should be provided by the POM property ${project.reporting.outputEncoding}.
    [INFO] ------------------------------------------------------------------------
    [INFO] Reactor Summary:
    [INFO] 
    [INFO] AIO - SDK 3.0 Beta ................................. SUCCESS [  0.413 s]
    [INFO] Alfresco Platform/Repository JAR Module ............ SUCCESS [  2.684 s]
    [INFO] Alfresco Share JAR Module .......................... SUCCESS [  0.222 s]
    [INFO] Integration Tests Module ........................... SUCCESS [01:40 min]
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time: 01:43 min
    [INFO] Finished at: 2017-05-12T14:08:00+02:00
    [INFO] Final Memory: 375M/1098M
    [INFO] ------------------------------------------------------------------------
    ```

    **Note:** After the last info message, a number of exceptions are thrown, but you can ignore them. This is a known issue. It doesn't affect the execution or success of the integration tests.

    As you can see, there is a lot of useful information from the result of each integration test.

2.  Check for the `BUILD SUCCESS` message and the following results:

    ```
    Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
    ```

    If you see this result in your environment, congratulations, the integration tests have certified the state of your Alfresco project.

    **Note:** If you made any version changes in your project based on [Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md), you can easily repeat your integration tests for all the supported versions of the platform. This ensures that your source code is correct and supported for all the supported versions of ACS.


**Parent topic:**[Integration testing](../concepts/sdk-integration-testing.md)

