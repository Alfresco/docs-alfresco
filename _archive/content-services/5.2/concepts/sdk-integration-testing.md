---
author: Alfresco Documentation
---

# Integration testing

“Integration testing is the phase in software testing where individual software modules are combined and tested as a group. It occurs after unit testing and before validation testing. Integration testing takes as its input modules that have been unit tested, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing. \[*Wikipedia*\].”

Even if the definition of integration testing is a general description, the concept is also valid for Alfresco projects. The good news is that Alfresco SDK 3 provides a predefined set of classes, profiles, and configurations to easily develop and launch integration testing.

Here are the basics to understanding and using integration testing in the context of projects created with the SDK, from a technical perspective:

-   SDK 3 develops integration tests for the platform only. Currently, the integration tests that the SDK is able to manage by default is related to Alfresco Content Services \(ACS\) only.
-   Integration tests require an ACS instance to be up and running. You will see that all the scripts and commands are designed to easily manage this requirement, but the prerequisite for the SDK is that an ACS instance is available.
-   If you're running a project created with a Platform JAR archetype, integration tests are not provided by default. However, you can copy them from your All-In-One project.

-   **[Integration test bundles](../concepts/sdk-test-bundles.md)**  
The All-In-One \(AIO\) project created with the Alfresco SDK 3 includes an `integration-tests` sub-project. The sub-project hosts all the source code and the required resources to run the integration tests.
-   **[Running the integration tests](../tasks/sdk-test-run.md)**  

-   **[Running integration tests using an existing Alfresco Content Services instance \(and hot reloading\)](../tasks/sdk-test-acs.md)**  
Alfresco SDK is able to recognize if an Alfresco Content Services \(ACS\) instance is already running, and use it \(or launch it\) accordingly. This feature is very powerful for a couple of reasons. First of all, it allows you to focus on the integration tests, without worrying if the platform instance running, and also because you can use an existing ACS instance that's up running during the integration tests development. The second reason gives a relevant speed up to the development task, as described in the following content.
-   **[Running integration tests from your IDE](../tasks/sdk-test-ide.md)**  
If your project is available in Eclipse or IntelliJ, you can easily run one or more of the integration tests directly from your IDE.
-   **[Adding integration tests to a Platform JAR project](../tasks/sdk-test-platform.md)**  
By default, an Alfresco project created with the All-In-One archetype includes an `integration-tests` sub-project that contains three bundled examples. Here we describe how to add integration tests to an Alfresco project created with the Platform JAR archetype, which is not provided by default.

**Parent topic:**[Advanced topics](../concepts/sdk-advanced-topics.md)

