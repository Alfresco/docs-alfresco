---
author: Alfresco Documentation
---

# Upgrading an All-in-One \(AIO\) project from SDK 2.1.1 to 2.2.0

These instructions will walk through what is needed when upgrading an AIO project from using SDK version 2.1.1 to using SDK version 2.2.0.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have an All-in-One project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-all-in-one-archetype.md) from the AIO 2.2.0 SDK archetype and move the code and other changes over to it from the SDK 2.1.1 project, but this method is not covered in this article.

**Note:** In the following instructions the `AIO_PROJECT_PATH` variable denotes the path to where you have your All-in-One top project folder. So, for example, if your All-in-One project was generated in the C:\\alfresco-extensions\\acme-poc directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.2.0.

    In the IDE, open up the \{AIO\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.2.0</version>
    </parent> 
    ```

2.  Add dependency for H2 database scripts.

    In the same project file add a new `dependencies` section with the following dependency:

    ```
    <dependencies>
            <!-- If we are running tests then make the H2 Scripts available.
                 Note. tests are skipped when you are running -Prun -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-repository</artifactId>
            <version>${alfresco.version}</version>
            <classifier>h2scripts</classifier>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>*</groupId>
                    <artifactId>*</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
    ```

3.  Remove Spring Loaded configuration from run scripts.

    Spring Loaded currently blocks the Repository \(Platform\) from starting. Update the \{AIO\_PROJECT\_PATH\}/run.sh and run.bat so they don't use Spring Loaded, change the `MAVEN_OPTS` so it looks like this:

    ```
    run.sh: MAVEN_OPTS="-Xms256m -Xmx2G" mvn clean install -Prun
    run.bat: set MAVEN_OPTS=-Xms256m -Xmx2G
    ```

4.  Update the Repo AMP module Spring context load order.

    Open the \{AIO\_PROJECT\_PATH\}/<repo-amp-id\>/src/main/amp/config/alfresco/module/<module-id\>/module-context.xml file and update it so it looks like this:

    ```
    <beans>
           <!-- This is filtered by Maven at build time, so that module name is single sourced. -->
    	<!-- Note. The bootstrap-context.xml file has to be loaded first.
    		    Otherwise your custom models are not yet loaded when your service beans are instantiated and you
    		    cannot for example register policies on them. -->
            <import resource="classpath:alfresco/module/${project.artifactId}/context/bootstrap-context.xml" />
            <import resource="classpath:alfresco/module/${project.artifactId}/context/service-context.xml" />
            <import resource="classpath:alfresco/module/${project.artifactId}/context/webscript-context.xml" />
    </beans>
    ```

5.  Update the Repo AMP module version to align with Maven Artifact version.

    Open the \{AIO\_PROJECT\_PATH\}<repo-amp-id\>/src/main/amp/module.properties file and update the version property:

    ```
    module.version=${project.version}
    ```

6.  Remove `selenium-java` dependency from the Share AMP project.

    Open the \{AIO\_PROJECT\_PATH\}/<share-amp-id\>/pom.xml file and **remove** the following dependency:

    ```
    <!-- Bring in newer selenium version -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>2.45.0-alfresco</version>
            <scope>test</scope>
        </dependency>
    ```

7.  Update the Share AMP module version to align with Maven Artifact version.

    Open the \{AIO\_PROJECT\_PATH\}/<share-amp-id\>/src/main/amp/module.properties file and update the version property:

    ```
    module.version=${project.version}
    ```

8.  Update the Share AMP Page Object \(PO\)

    The Share page object project has been updated a bit so the \{AIO\_PROJECT\_PATH\}/<share-amp-id\>/src/test/java/<package\>/demoamp/po/DemoPage.java class need to be updated a bit:

    ```
    import org.alfresco.po.share.SharePage;
    import org.alfresco.po.RenderTime;
    import org.openqa.selenium.NoSuchElementException;
    import org.openqa.selenium.WebElement;
    import org.openqa.selenium.support.FindBy;
    
    public class DemoPage extends SharePage {
        @FindBy(id="DEMO_SIMPLE_LOGO")
        WebElement logo;
    
        @FindBy(id="DEMO_SIMPLE_MSG")
        WebElement msg;
    
        @SuppressWarnings("unchecked")
        @Override
        public DemoPage render(RenderTime timer) {
    
            // Wait for logo and message to display, then consider page rendered
            while (true) {
                timer.start();
                try {
                    if (isSimpleLogoDisplayed() && isMessageDisplayed()) {
                        break;
                    }
                } catch (NoSuchElementException nse) {
                } finally {
                    timer.end();
                }
            }
    
            return this;
        }
    
        public boolean isSimpleLogoDisplayed() {
            return isDisplayed(logo);
        }
    
        public boolean isMessageDisplayed() {
            return isDisplayed(msg);
        }
    
        public String getMessage() {
            return msg.getText();
        }
    }
    ```

9.  And update the Share AMP Page Object \(PO\) Test

    The Share page object project has been updated a bit so the \{AIO\_PROJECT\_PATH\}/<share-amp-id\>/src/test/java/<package\>/demoamp/DemoPageTestIT.java class need to be updated a bit:

    ```
    import org.alfresco.tut.demoamp.po.DemoPage;
    import org.alfresco.po.share.LoginPage;
    import org.alfresco.po.AbstractTest;
    import org.alfresco.po.share.PeopleFinderPage;
    import org.testng.Assert;
    import org.testng.annotations.BeforeClass;
    import org.testng.annotations.BeforeMethod;
    import org.testng.annotations.Test;
    
    public class DemoPageTestIT extends AbstractTest {
        DemoPage page;
    
        @BeforeClass(groups = {"alfresco-one"})
        public void prepare() throws Exception {
            // Navigate to share, which will redirect to Login page
            driver.navigate().to(shareUrl + "/page");
    
            // Resolve/Bind current page to LoginPage object
            LoginPage loginPage = resolvePage(driver).render();
            loginPage.loginAs(username, password);
        }
    
        @BeforeMethod
        public void loadPage() {
            // Goto demo page
            driver.navigate().to(shareUrl + "/page/hdp/ws/simple-page");
    
            // We need to instantiate the page like this as it is not yet in
            // the factory known list of pages
            page = factoryPage.instantiatePage(driver, DemoPage.class);
        }
    
        @Test
        public void findLogo() {
            Assert.assertTrue(page.isSimpleLogoDisplayed());
        }
    
        @Test
        public void messageIsDisplayed() {
            page.render();
            String msg = page.getMessage();
            Assert.assertNotNull(msg);
            Assert.assertEquals("Hello from i18n!", msg);
        }
    
        /**
         * Example of test reusing methods in abstract share page objects.
         */
        @Test
        public void titleDisplayed() {
            // Invoke render when ready to use page object.
            page.render();
            Assert.assertNotNull(page);
            Assert.assertTrue(page.getTitle().contains("This is a simple page"));
        }
    
        /**
         * Test that show how we are able to reuse share page objects
         * objects in particular the navigation object.
         */
        @Test
        public void navigate() {
            Assert.assertNotNull(page.getNav());
            PeopleFinderPage peopleFinderPage = page.getNav().selectPeople().render();
            Assert.assertNotNull(peopleFinderPage);
        }
    }
    ```

10. Add a Spring version property to the Runner project

    We will need a newer Spring version than 3 to use annotations in the Share PO test classes. Add the following properties section in the \{AIO\_PROJECT\_PATH\}/runner/pom.xml file:

    ```
    <properties>
            <!-- Bring in newer Spring with support for annotations, used for Page Object tests -->
            <spring.version>4.1.6.RELEASE</spring.version>
    </properties>
    ```

11. Add H2 db script dependency to the `tomcat7-maven-plugin` in the Runner project

    These scripts come in a separate artifact now and not in the `alfresco-rad` artifact. In the same project file add a new `dependencies` section to the plug-in as follows \(note. there are actually 2 dependencies to add\):

    ```
    <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <dependencies>
            <!-- Bring in the H2 Database scripts needed when running embedded, they are now
                 available from the standard generated artifacts, no longer needed to be picked
                 up from the alfresco-rad project -->
            <dependency>
                <groupId>org.alfresco</groupId>
                <artifactId>alfresco-repository</artifactId>
                <version>${alfresco.version}</version>
                <classifier>h2scripts</classifier>
                <exclusions>
                    <exclusion>
                        <groupId>*</groupId>
                        <artifactId>*</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!-- Explicitly bring in the Plexus Archiver so assembly goes quicker -->
            <dependency>
                <groupId>org.codehaus.plexus</groupId>
                <artifactId>plexus-archiver</artifactId>
                <version>2.3</version>
            </dependency>
        </dependencies>
        <executions>
        . . .
    ```

12. Add API Explorer webapp to the `tomcat7-maven-plugin` in the Runner project

    The API Explorer can be used to test out/explore the available ReST APIs in an easy way. This is a convenience webapp that is optional to install:

    ```
    
    <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        . . .
        <configuration>
            . . .
            <webapps>
                . . .
                <webapp>
                    <groupId>org.alfresco</groupId>
                    <artifactId>api-explorer</artifactId>
                    <version>${maven.alfresco.api.explorer.version}</version>
                    <contextPath>/api-explorer</contextPath>
                    <type>war</type>
                    <asWebapp>true</asWebapp>
                </webapp>
            </webapps>. . .
                        
    ```

13. Update dependencies section for the `regression-testing` profile in the Runner project

    We need to bring in Spring 4 for example, in the same project file, update the `profile` `dependencies` section so it looks like this:

    ```
    ...<dependencies>
            <!-- Bring in the Share Page Objects (PO) used in our functional tests.
                 It contains page objects such as LoginPage and it also brings
                 in selenium-grid and selenium. -->
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share-po</artifactId>
                <version>${alfresco.version}</version>
                <scope>test</scope>
            </dependency>
            <!-- Bring in the Share Page Object (PO) Tests that comes with Alfresco. It has
                 the org.alfresco.po.share.AbstractTest class that our custom tests extend. -->
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share-po</artifactId>
                <version>${alfresco.version}</version>
                <classifier>tests</classifier>
                <scope>test</scope>
    
                <!-- Exclude selenium as it is already brought in by share-po dependency above -->
                <exclusions>
                    <exclusion>
                        <groupId>org.seleniumhq.selenium</groupId>
                        <artifactId>selenium-java</artifactId>
                    </exclusion>
                    <exclusion>
                        <groupId>org.seleniumhq.selenium</groupId>
                        <artifactId>selenium-server</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!-- Test NG is defined with test scope in share-po, so need it here too -->
            <!-- Alfresco code creates a wrapper around Test NG -->
            <dependency>
                <groupId>org.alfresco.test</groupId>
                <artifactId>alfresco-testng</artifactId>
                <version>1.1</version>
                <scope>test</scope>
                <exclusions>
                    <exclusion>
                        <groupId>org.hamcrest</groupId>
                        <artifactId>hamcrest-core</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!-- Bring in newer selenium version if required
            <dependency>
                <groupId>org.seleniumhq.selenium</groupId>
                <artifactId>selenium-java</artifactId>
                <version>2.48.0</version>
                <scope>test</scope>
            </dependency>
            -->
            <!-- Need to bring in a newer Spring that supports annotations, Alfresco brings in older one -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>${spring.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-beans</artifactId>
                <version>${spring.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-aspects</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>${spring.version}</version>
            </dependency>
        </dependencies>...
    ```

14. Update dependencies section for the `functional-testing` profile in the Runner project

    Same thing as for the regression testing, we need to bring in Spring 4, in the same project file, update the `profile` `dependencies` section so it looks like this:

    ```
    ...<dependencies>
            <!-- Bring in the Share Page Objects (PO) used in our functional tests.
                 It contains page objects such as LoginPage and it also brings
                 in selenium-grid and selenium. -->
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share-po</artifactId>
                <version>${alfresco.version}</version>
                <scope>test</scope>
            </dependency>
            <!-- Bring in the Share Page Object (PO) Tests that comes with Alfresco. It has
                 the org.alfresco.po.share.AbstractTest class that our custom tests extend. -->
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share-po</artifactId>
                <version>${alfresco.version}</version>
                <classifier>tests</classifier>
                <scope>test</scope>
    
                <!-- Exclude selenium as it is already brought in by share-po dependency above -->
                <exclusions>
                    <exclusion>
                        <groupId>org.seleniumhq.selenium</groupId>
                        <artifactId>selenium-java</artifactId>
                    </exclusion>
                    <exclusion>
                        <groupId>org.seleniumhq.selenium</groupId>
                        <artifactId>selenium-server</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!-- Test NG is defined with test scope in share-po, so need it here too -->
            <!-- Alfresco code creates a wrapper around Test NG -->
            <dependency>
                <groupId>org.alfresco.test</groupId>
                <artifactId>alfresco-testng</artifactId>
                <version>1.1</version>
                <scope>test</scope>
                <exclusions>
                    <exclusion>
                        <groupId>org.hamcrest</groupId>
                        <artifactId>hamcrest-core</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!-- Bring in newer selenium version if required
            <dependency>
                <groupId>org.seleniumhq.selenium</groupId>
                <artifactId>selenium-java</artifactId>
                <version>2.48.0</version>
                <scope>test</scope>
            </dependency>
            -->
            <!-- Need to bring in a newer Spring that supports annotations, Alfresco brings in older one -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>${spring.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-beans</artifactId>
                <version>${spring.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-aspects</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>${spring.version}</version>
            </dependency>
        </dependencies>...
    ```

15. Update Virtual Webapp context for Repository \(alfresco.war\) in the Runner project

    Update directory paths for extra resource paths and AMP config, in the \{AIO\_PROJECT\_PATH\}/runner/tomcat/context-repo.xml file, update the `extraResourcePaths` and `virtualClasspath` as follows:

    ```
    ...
           extraResourcePaths="/=${project.parent.basedir}/repo-amp/target/amp/web" />
                   ...
           virtualClasspath="${project.parent.basedir}/repo-amp/target/classes;
                ${project.parent.basedir}/repo-amp/target/amp/config;
                ${project.parent.basedir}/repo-amp/target/test-classes"
                ...
    ```

    Note. if you got more Repo AMPs in your AIO project then you need to update the paths for them too.

16. Update Virtual Webapp context for Share \(share.war\) in the Runner project

    Update directory paths for extra resource paths and AMP config, in the \{AIO\_PROJECT\_PATH\}/runner/tomcat/context-share.xml file, update the `extraResourcePaths` and `virtualClasspath` as follows:

    ```
    ...
           extraResourcePaths="/=${project.parent.basedir}/share-amp/target/amp/web" />
                   ...
           virtualClasspath="${project.parent.basedir}/share-amp/target/classes;
                ${project.parent.basedir}/share-amp/target/amp/config;
                ${project.parent.basedir}/share-amp/target/test-classes;
                ${project.parent.basedir}/share/target/test-classes"
                ...
    ```

    Note. if you got more Repo AMPs in your AIO project then you need to update the paths for them too.

17. Add `maven-dependency-plugin` to the Share project

    We will need it to unpack the MANIFEST.MF file so we can save it and store it in the new custom WAR. Open the \{AIO\_PROJECT\_PATH\}/share/pom.xml file and add the plug-in just before the `maven-war-plugin`:

    ```
    <plugin>
            <!-- Bring in the Maven Dependency plugin so we can unpack and store the MANIFEST.MF file.
                 It will be used in the custom Share WAR that is produced by the WAR plugin,
                 it otherwise gets overwritten by the overlay process. -->
            <artifactId>maven-dependency-plugin</artifactId>
            <executions>
                <execution>
                    <id>unpack</id>
                    <phase>generate-sources</phase>
                    <goals>
                        <goal>unpack-dependencies</goal>
                    </goals>
                    <configuration>
                        <includeTypes>war</includeTypes>
                        <includeGroupIds>org.alfresco</includeGroupIds>
                        <includeArtifactIds>share</includeArtifactIds>
                        <includes>META-INF/MANIFEST.MF</includes>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    ```

18. Add `archive` section to the `maven-war-plugin` in the Share project

    Store the custom MANIFEST.MF file when we build the custom share.war. Open the \{AIO\_PROJECT\_PATH\}/share/pom.xml file and add the `archive` section to the `maven-war-plugin`:

    ```
    <artifactId>maven-war-plugin</artifactId>
       <configuration>
        <!-- Bring in the MANIFEST.MF file from the original share.war, it contains version information
             that is needed for it to operate properly -->
        <archive>
            <addMavenDescriptor>false</addMavenDescriptor>
            <manifestFile>${project.build.directory}/dependency/META-INF/MANIFEST.MF</manifestFile>
        </archive>
    ```

19. Finally remove current alf\_data\_dev directory with previous database.

    Remove the \{AIO\_PROJECT\_PATH\}/alf\_data\_dev directory. This is needed as the H2 script artifact does not currently contain upgrade scripts.


Your All-in-One project should now be fully updated to use the 2.2.0 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.1.1 to 2.2.0](../concepts/alfresco-sdk-upgrading-sdkversion-211-220.md)

