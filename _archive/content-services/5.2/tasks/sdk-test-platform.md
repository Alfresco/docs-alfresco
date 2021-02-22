---
author: Alfresco Documentation
---

# Adding integration tests to a Platform JAR project

By default, an Alfresco project created with the All-In-One archetype includes an `integration-tests` sub-project that contains three bundled examples. Here we describe how to add integration tests to an Alfresco project created with the Platform JAR archetype, which is not provided by default.

This tutorial assumes you already have an existing Alfresco project created with the [Platform JAR archetype](../concepts/sdk-archetypes-intro.md). If you don't have a project already, follow the steps in [Getting started with Alfresco Content Services SDK 3](../concepts/sdk-getting-started.md) to learn how to quickly generate it in a few easy steps.

Before continuing, you may recall that the [integration tests](../concepts/sdk-integration-testing.md) are supported only for Alfresco Content Services \(ACS\) used with Alfresco SDK 3.0. If you haven't reviewed the details about the integration tests created with the All-In-One archetype, we suggest you read [Integration test bundles](../concepts/sdk-test-bundles.md).

To add the integration tests to an Alfresco project created with the Platform JAR archetype, you need to copy what the All-In-One archetype provides into your project.

1.  Create a brand new All-In-One project in your development environment.

2.  Copy the integration-tests/src/test/java/<groupId\>/platformsample folder into src/test/java/<groupId\>/platformsample of your Platform JAR project

    Replace `<groupId>` in the target path with the `<groupId>` used in your Platform JAR project.

3.  To run the integration tests, type the following command:

    `MAVEN_OPTS="-Xms256m -Xmx2G" mvn integration-test`

    After compiling the source code, the SDK also launches ACS, recognizing that there's no active instance of the platform. After some time \(and a lot of log messages\), you should see the following:

    ```
    -------------------------------------------------------
    T E S T S
    -------------------------------------------------------
    Running com.example.platformsample.CustomContentModelIT
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.CustomContentModelIT#testCustomContentModelPresence
    RunTestWebScript: [clazz=com.example.platformsample.CustomContentModelIT][method=testCustomContentModelPresence]
    Running com.example.platformsample.CustomContentModelIT Integration Test: testCustomContentModelPresence()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.CustomContentModelIT#testCustomContentModelPresence#testCustomContentModelPresence, ignoreCount=0, wasSuccessful=true, runTime=6, runCount=1, resultObject=org.junit.runner.Result@4756a585, failureCount=0}
    RunTestWebScript: Stopped executing
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.CustomContentModelIT#testCreateAcmeDocument
    RunTestWebScript: [clazz=com.example.platformsample.CustomContentModelIT][method=testCreateAcmeDocument]
    Running com.example.platformsample.CustomContentModelIT Integration Test: testCreateAcmeDocument()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.CustomContentModelIT#testCreateAcmeDocument#testCreateAcmeDocument, ignoreCount=0, wasSuccessful=true, runTime=191, runCount=1, resultObject=org.junit.runner.Result@3932838b, failureCount=0}
    RunTestWebScript: Stopped executing
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 1.412 sec - in com.example.platformsample.CustomContentModelIT
    Running com.example.platformsample.HelloWorldWebScriptIT
    2017-05-19 09:21:49,560  DEBUG [example.platformsample.HelloWorldWebScript] [http-bio-8080-exec-8] Your 'Hello World' Web Script was called!
    Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.181 sec - in com.example.platformsample.HelloWorldWebScriptIT
    Running com.example.platformsample.DemoComponentIT
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.DemoComponentIT#testChildNodesCount
    RunTestWebScript: [clazz=com.example.platformsample.DemoComponentIT][method=testChildNodesCount]
    Running com.example.platformsample.DemoComponentIT Integration Test: testChildNodesCount()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.DemoComponentIT#testChildNodesCount#testChildNodesCount, ignoreCount=0, wasSuccessful=true, runTime=2, runCount=1, resultObject=org.junit.runner.Result@4802dc75, failureCount=0}
    RunTestWebScript: Stopped executing
    RunTestWebScript: Start executing ...
    RunTestWebScript: clazzAndMethod = com.example.platformsample.DemoComponentIT#testGetCompanyHome
    RunTestWebScript: [clazz=com.example.platformsample.DemoComponentIT][method=testGetCompanyHome]
    Running com.example.platformsample.DemoComponentIT Integration Test: testGetCompanyHome()
    RunTestWebScript: model = {result=SUCCESS, throwables=[], failures=[], test=com.example.platformsample.DemoComponentIT#testGetCompanyHome#testGetCompanyHome, ignoreCount=0, wasSuccessful=true, runTime=0, runCount=1, resultObject=org.junit.runner.Result@7813d6, failureCount=0}
    RunTestWebScript: Stopped executing
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.088 sec - in com.example.platformsample.DemoComponentIT
    
    Results :
    
    Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
    
    [WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent! The file encoding for reports output files should be provided by the POM property ${project.reporting.outputEncoding}.
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time: 01:06 min
    [INFO] Finished at: 2017-05-19T09:21:50+02:00
    [INFO] Final Memory: 324M/993M
    [INFO] ------------------------------------------------------------------------
    ```

    **Note:** After the last info message, a number of exceptions are thrown, but you can ignore them. This is a known issue. It doesn't affect the execution or success of the integration tests.

    As you can see, there is a lot of useful information from the result of each integration test.

4.  Check for the `BUILD SUCCESS` message and the following results:

    ```
    Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
    ```

    If you see this result in your environment, congratulations, the integration tests have certified the state of your Alfresco project.

    **Note:** If you made any version changes in your project based on [Switching Alfresco Content Services and Share versions](../concepts/sdk-switching.md), you can easily repeat your integration tests for all the supported versions of the platform. This ensures that your source code is correct and supported for all the supported versions of ACS.


**Parent topic:**[Integration testing](../concepts/sdk-integration-testing.md)

