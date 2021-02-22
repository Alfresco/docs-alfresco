---
author: Alfresco Documentation
---

# Integration test bundles

The All-In-One \(AIO\) project created with the Alfresco SDK 3 includes an `integration-tests` sub-project. The sub-project hosts all the source code and the required resources to run the integration tests.

Let's look in more detail into the [All-In-One project structure](sdk-projects-aio.md). The src/test/java folder contains the custom classes, interfaces and Java code in general regarding tests. The src/main/java instead, contains the same content you can find in a regular Java project: the Java source code. Here you should put all the custom classes, interfaces and Java source code in general \(by default, the folder is empty\).

By default, in an Alfresco All-In-One project, you can find three different tests about content modelling, custom components, and web scripts. The test classes are dynamically created in an `<artifadctId>.platformsample` package. As a consequence, a folder structure is automatically created to host the Java classes. Below is a brief description of the bundled classes, where each one represents a single integration test.

**`CustomContentModelIT`: Checking the correct existence and setup of a custom model**

This integration test verifies the existence of the `{http://www.acme.org/model/content/1.0}contentModel` in the Alfresco Content Services instance. It also creates a new node in the repository with the following features:

-   The node is named `AcmeFile.txt`.
-   The node type is set to `{http://www.acme.org/model/content/1.0}document`.
-   The node property `securityClassification` is set to `Company Confidential`.
-   The aspect `cm:titled` is added to the new node.

Once created, some Java assertions are raised to check the correct definition of the node. As a last task, the node is deleted from the repository to clean the environment.

Looking at the source code, there are two main things to bring to your attention. The first is that the `CustomContentModelIT` class extends the abstract class [AbstractAlfrescoIT](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/AbstractAlfrescoIT.java), giving access to the Alfresco Spring Application context and the ServiceRegistry that should be used when accessing Alfresco Content Services.

The second is about the use of the `@RunWith(value = AlfrescoTestRunner.class)` Java annotation. The Alfresco Test Runner \(i.e. `AlfrescoTestRunner.class`\) will check if it is running in an Alfresco Content Services instance and if so, it will execute normally locally. On the other hand, if it detects no Alfresco Spring context, then it will make a call to a custom Web Script that will execute this test in the running container remotely. The remote location is determined by the `@Remote` configuration.

**`DemoComponentIT`: Checking the Alfresco Content Services `DemoComponent` component**

This integration test verifies the existence of the `DemoComponent` component deployed in the Alfresco Content Services instance. You can find the definition of the `DemoComponent` as a custom component of a project created with the All-In-One archetype. For more details, see the class definition in:

```
<artifactId>-platform-jar/src/main/java/com/example/platformsample/DemoComponent.java
```

The integration test retrieves the `DemoComponent` bean from the Alfresco Content Services instance \(see `testGetCompanyHome()`\), and requests the Company Home component. In addition, some Java assertions check if `Company Home` is identified correctly and has seven children stored in it.

As described for the `CustomContentModelIT` integration test, the `DemoComponentIT` class extends the abstract class [AbstractAlfrescoIT](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/AbstractAlfrescoIT.java) and the `@RunWith` with `@Remote` Java annotations are used.

**`HelloWorldWebScriptIT`: Checking the Alfresco Content Services `helloworld` webscript**

This integration test is the simplest one, and verifies the existence and the response of the `helloworld` web script in the Alfresco Content Services instance. The test invokes the web script at the URL `http://localhost:8080/alfresco/service/sample/helloworld` and checks the response using some Java assertions.

**How to add or change the integration tests**

Adding \(or changing\) the integration tests is really straightforward. All changes are to be made in the same folder as the existing integration tests \(i.e. integration-tests/src/test/java/<groupId\>/platformsample\). To add new tests, simply add new classes similar to the existing ones in this folder. From a developer's perspective, you can take the existing classes as an example and develop your own classes based on the existing ones.

Remember to extend the abstract class [AbstractAlfrescoIT](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/AbstractAlfrescoIT.java), if you want to have access to Alfresco Spring Application context and ServiceRegistry, and use the `@RunWith`, `@Remote` Java annotations to ensure that the SDK manages the existence of an Alfresco Content Services instance running for you.

**Parent topic:**[Integration testing](../concepts/sdk-integration-testing.md)

