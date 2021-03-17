# All-in-One archetype

The Alfresco All-in-One \(AIO\) Archetype is a multi-module project, leveraging Alfresco SDK's powerful capabilities to customize and run the full Alfresco platform embedded with all its components. The archetype does not require additional downloads, such as an Alfresco installer, and provides a perfect starting point for full-blown Alfresco projects where the final artifacts should be the customized alfresco.war and share.war.

The following are typical use-cases for when this archetype should be used:

-   You are going to start on a project for a client and need an Alfresco extension project that can produce the final customized Alfresco WAR and Share WAR artifacts.
-   Your project needs access to the full regression testing suite for the Alfresco Share UI.
-   Your project needs access to the functional testing based on the Alfresco Share Page Object \(PO\) library.
-   When testing with the RAD features you need Solr to be running.

Note that if you are going to develop an addOn, reusable component, module, and so on, that should be distributed independently, then have a look at the AMP projects instead. For Alfresco repository extensions see [Repository AMP](alfresco-sdk-archetypes-repo-amp.md) and for Alfresco Share extensions see [Share AMP](alfresco-sdk-archetypes-share-amp.md).

The main features of the AIO archetype are:

-   AMP packaging for repository and share extensions - the supported packing type for Alfresco extensions.
-   AMP dependency management in Maven.
-   Automatic installation of AMPs into Alfresco WAR and Share WAR.
-   Easy to include extra AMPs and have them included in the WARs.
-   Out-of-the-box Alfresco extensions such Records Management \(RM\), SharePoint Protocol \(SPP\), Media Management etc easily included in the same way as custom AMPs for consistency.
-   AMP Unit Testing support. Just run the standard `mvn test` and see your `src/test/java` Alfresco unit tests run. An sample Unit Test is provided in this archetype.
-   Alfresco Share Regression Testing - you don't have to write tests to protect against regression in out-of-the-box Share UI functionality, just use the -Prun,regression-testing profiles
-   Custom Functional Testing - Utilize the Alfresco Share Page Objects \(PO\) to write your own custom web page testing \(example test included\), use the -Prun,functional-testing profiles
-   Run a full Alfresco stack \(that is, alfresco.war, share.war, solr4.war\) embedded in Tomcat using the H2 database for demo purposes \(-Prun\), rapid application development and integration testing.

    **Important:** This is not a supported stack, so it should only be used for development purposes.

-   Support for \(remote\) Junit and integration testing and Rapid Application Development. This uses spring-loaded. Projects can easily be launched for this scenario using `run.sh`.
-   Seamless IDE integration with Eclipse and IntelliJ IDEA.

