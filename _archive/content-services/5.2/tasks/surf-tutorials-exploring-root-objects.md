---
author: Alfresco Documentation
---

# Exploring root objects

When running in the presentation tier, there are a number of root objects available to your Surf project.

This tutorial builds on the project created in the [previous tutorial](surf-tutorials-create-surf-project.md).

There are a number of root objects exposed to your JavaScript code and FreeMarker templates in your Surf project. This tutorial shows how you can explore what's available. All of the Surf root objects are documented in the [Surf API Reference for web scripts](../references/APISurfPlatform-intro.md).

1.  In the Eclipse Package Explorer, expand out your `simple-surf-project` to find the file src/main/webapp/WEB-INF/webscripts/home/body.get.html.ftl. This is the FreeMarker template whose output is injected into the body of the page found at: `http://localhost:8080/simple-surf-project/page/home`.

2.  Load the file into your editor.

3.  Change the code to be as follows:

    ```
    
                            
    <#-- This is an example of how to request a CSS dependency. The resource request will
         be made in the <head> element of the page (because this is where the <@outputCSS>
         directive has been placed. A checksum suffix generated from the file contents 
         will be appended to the request so that the browser can cache it indefinitely.
         The group attribute is used when dependencies are aggregated together into a single
         request. -->
    
    <#-- APB
    <@link href="${url.context}/res/css/body.css" group="default"/>
    -->
    
    <div class="body">
        <!-- The body class defined in the "css/body.css" file sets a background image to 
             provide an example of how images referenced from within CSS files are encoded
             when the "generate-css-data-images" configuration option is enabled (see the
             "WEB-INF/surf.xml" file). -->
             
             <h2>Root Object Test</h2>
             
    		 <hr/>
             <p>theme: ${theme}</p>
             <p>locale: ${locale}</p>
                      
    		 <hr/>
    		 <p>Page root object:</p>		 
             <p>page.url.url: ${page.url.url}</p>
             <p>page.id: ${page.id}</p>
             <p>page.title: ${page.title}</p>
             
             <hr/>
             <p>context: ${context}</p>
    
    		<hr/>
    		<p>User root object:</p>
    		<p>user.id: ${user.id}</p>
    		<p>user.name: ${user.name}</p>
    		<p>user.fullName: ${user.fullName}</p>
    		<p>user.firstName: ${user.firstName}</p>        
    		 
     		<hr/>
     		<p>List page properties:</p>
            <#assign keys = page.properties?keys/>
            <#list keys as k>
              ${k} => ${page.properties[k]}
            </#list>
             
     		<hr/>
     		<p>List user properties:</p>
            <#assign keys = user.properties?keys/>
            <#list keys as k>
              ${k} => ${user.properties[k]},
            </#list>
             
     		<hr/>
     		<p>List context properties:</p>
     		<table border="2">
            <#assign keys = context.properties?keys/>
            <#list keys as k>
            	<#if context.properties[k]??>
            		<tr>
              		<#if context.properties[k]?is_boolean>
              			<#if context.properties[k]>
              				<td>${k} => TRUE</td>
              			<#else>
              				<td>${k} => FALSE</td>
              			</#if>
              			<br/>
              		<#else>
              			<td>${k} => ${context.properties[k]}</td>
              		</#if>
              		</tr>
              	</#if>
            </#list>
            </table>
    
     		<hr/>
     		<p>List template properties:</p>
     		<table border="2">
            <#assign keys = template.properties?keys/>
            <#list keys as k>
            	<#if template.properties[k]??>
            		<tr>
              		<#if template.properties[k]?is_boolean>
              			<#if template.properties[k]>
              				<td>${k} => TRUE</td>
              			<#else>
              				<td>${k} => FALSE</td>
              			</#if>
              			<br/>
              		<#else>
              			<td>${k} => ${template.properties[k]}</td>
              		</#if>
              		</tr>
              	</#if>
            </#list>
            </table>
    </div>                        
                        
    ```

    First, you comment out the code that places a background image using the CSS. This is no longer required. Then code has been added that explores the root objects as documented in the [Surf API Reference for web scripts](../references/APISurfPlatform-intro.md).

4.  Make sure you have no instances of Alfresco Content Services running.

5.  Rebuild your project on the command line using the command `mvn clean install`.

6.  Run the project by entering the command: `mvn jetty:run`.

    You can also [set up Eclipse so that it is possible to run your Maven project from within Eclipse](http://books.sonatype.com/m2eclipse-book/reference/running-sect-running-maven-builds.html).

7.  In your web browser navigate to `http://localhost:8080/simple-surf-project/page/home`.

    Information will be displayed about the various root objects.

8.  You can expand your FreeMarker code to include more root objects. Then refresh the page to display the results.


You have seen how to explore some of the root objects.

**Parent topic:**[Surf tutorials](../concepts/surf-tutorials.md)

