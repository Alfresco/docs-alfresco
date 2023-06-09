---
title: Install Alfresco Enterprise Viewer Transformer (optional)
---

> **Important:** AEVT (formerly known as "OAT") is not recommended for most installs of AEV. AEVT makes an environment more complex and should only be deployed when needed.

## What is AEVT

AEV requires individualized PDF->PNG page transformations, which is something beyond the capabilities of the current feature set of the Alfresco Transform Service. The OpenContent Alfresco Module Package (AMP) module supports performing these types of transformations, but the downside is that those transformations occur on the ACS container (similar to legacy Alfresco Transformation Services). For the vast majority of deployments, this is sufficient from a performance and infrastructure perspective.

AEVT divorces the page transformation load from the ACS container by installing a completely separate component (or components) based on Spring Boot that is horizontally and vertically scalable. A reverse proxy is required to intercept and redirect requests to the separate components when the AEV application makes a request to the `alfresco/OpenContent/openannotate/transform*` URL. There are significant security, architecture, scalability, and general complexity concerns that all must be answered when deploying AEVT.

## When to deploy AEVT

AEVT is recommended when:

* There is a need to scale AEV page transformation process separately from ACS instance(s)

* There are large amounts of concurrent users viewing documents, which would put CPU pressure on the ACS instance if AEVT is not used

> **Note:** Customers can always skip using AEVT, monitor usage and CPU on the ACS server, and add AEVT into the environment if needed at a later time. This is recommended over installing out without a firm need.

## AEVT architecture

See the below graphic for how AEVT can be added to an AEV installation.

![AEVT Architecture]({% link enterprise-viewer/images/aevt_architecture.png %})

## AEVT install

### Install webapps

This sections walks through how to install the Enterprise Viewer Transformer web application.

1. Install Apache Tomcat.

    See [https://archive.apache.org/dist/tomcat](https://archive.apache.org/dist/tomcat){:target="_blank"}.

2. Copy the `oat.war` file into the `TOMCAT_HOME/webapps` directory.

   You can find this WAR file in the `Web Applications` folder of the `alfresco-enterprise-viewer-package` ZIP file.

3. Configure Tomcat for shared classpath loader as well as encoded slashes:

   * Edit the `TOMCAT_HOME/conf/catalina.properties` file and enable the `shared.loader` by adding the following line (if not already there):

   ```text
   shared.loader=${catalina.base}/shared/classes,${catalina.base}/shared/lib/*.jar
   ```

4. Configure Tomcat ports in the `TOMCAT_HOME/conf/server.xml`:

   Configure the connector, server, and redirect ports to not conflict with the Alfresco Tomcat or any other Tomcats (example below):

   * Set Connector - `port="9090"` (defaults to `8080`)
   * Set Connector - `redirectPort="9443"` (defaults to `8443`)
   * Set Server - `port="9005"` (defaults to `8005`)

5. Start Tomcat.

### Configure OpenContent to Pass the contentPath

AEVT is enabled by setting up a property in OpenContent that tells OC to pass back the `contentPath` of the file on the `getDocumentInfo` call that Enterprise Viewer makes. The property in OpenContent to enable is `annotation.useContentFilepathForTransformations=true`. Once that property is enabled, the AEV frontend has access to the contentPath since it will be returned in the getDocumentInfo call (for example, `/mnt/nas/alf_data/contentstore/2019/05/15/8/3/26/d38b7e22-816e-4bbd-b7ff-f9b164edcfee.bin`).

To enable this property:

1. Stop Alfresco.

2. Set the following property in the `opencontent-override-placeholders.properties` found on the `/alfresco` classpath, for example, in the `ALFRESCO_HOME/tomcat/shared/classes/alfresco/module/com.tsgrp.opencontent/` directory:

    * `annotation.useContentFilepathForTransformations=true`

3. Delete the current Alfresco deployed WAR files:

   Navigate to the `ALFRESCO_HOME/tomcat/webapps` directory and delete the `alfresco` folder.

4. Start Alfresco.

### Proxy calls to go to AEVT

The next step is to configure a proxy so that calls that previously would be going to `/OpenContent/openannotate/transform?`, would now go to AEVT instead.

Below is the example ProxyPass/forwarding rule on Apache Httpd. Note that you can proxy this path in whatever makes the most sense in your setup as long as the same proxy rules apply.

> **Important:** This proxy pass must occur BEFORE any other rules that reference the same host (since a rule with `/alfresco` will match and overrule any rules under it that are more specific).

```text
#Proxy all requests for AEVT
ProxyPass /alfresco/OpenContent/openannotate/transform http://oat-servername:8080/oat/optimus/transform
ProxyPassReverse /alfresco/OpenContent/openannotate/transform http://oat-servername:8080/oat/optimus/transform
ProxyPass /alfresco/OpenContent/openannotate/getThumbnails http://oat-servername:8080/oat/optimus/getThumbnails
ProxyPassReverse /alfresco/OpenContent/openannotate/getThumbnails http://oat-servername:8080/oat/optimus/getThumbnails
```

For example, this request from AEV:

`/OpenContent/openannotate/transform?id=workspace://SpacesStore/82b15c11-b09a-4ab5-8b3a-058029296969&pageNum=3&resolution=64&lastModified=1560972048092&imageWidth=843&docWidth=612&docHeight=792&contentPath=/mnt/nas/alf_data/contentstore/2019/05/15/8/3/26/d38b7e22-816e-4bbd-b7ff-f9b164edcfee.bin`

would now be proxied to:

`/oat/optimus/transform?id=workspace://SpacesStore/82b15c11-b09a-4ab5-8b3a-058029296969&pageNum=3&resolution=64&lastModified=1560972048092&imageWidth=843&docWidth=612&docHeight=792&contentPath=/mnt/nas/alf_data/contentstore/2019/05/15/8/3/26/d38b7e22-816e-4bbd-b7ff-f9b164edcfee.bin`

### (Optional) Map calls between OpenContent and AEVT

Sometimes in may be beneficial to map the calls between OpenContent and AEVT, so the same calls can be made to the OpenContent and AEVT server. This can be accomplished on Tomcat 8+ through extra configuration, without having to install an additional proxy.

On the OAT Tomcat, add the following line to your `conf/server.xml` file:

```xml
...
<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">
...
    <!-- The following will allow native Tomcat url rewriting -->
    <Valve className="org.apache.catalina.valves.rewrite.RewriteValve" />
...
</Host>
```

Then create a new `rewrite.config` file in your `conf/Catalina/localhost` directory. Create this directory if it does not yet exist. The file should contain:

```text
RewriteRule ^/alfresco/OpenContent/openannotate/(.*)$ /oat/optimus/$1 [L]
```

This will cause all incoming to calls from `/alfresco/OpenContent/openannotate` to get mapped to `/oat/optimus`. Thus both the OpenContent and AEVT servers can accept calls to `/alfresco/OpenContent/openannotate`. URL rewriting is no longer necessary at the Proxy/Load Balancer level.

If you are not on Tomcat 8+, setting up the [Tuckey UrlRewriteFilter](https://tuckey.org/urlrewrite){:target="_blank"} may be an option. Or you can setup an additional proxy on the AEVT server.

## AEVT configuration

Your deployment must include an `application.properties`. The `application.properties` can be placed on the `/oat` classpath (for example: `TOMCAT_HOME/shared/classes` or whatever was configured in the shared loader in the webapps install above).

Some of the common properties that will likely need configuration in the `application.properties` as they typically change between environments are:

```java
server.port=8080
# Configs Independent of Transformer
optimus.tempDirForFilesCachedFromNas=/opt/tmp
# if set to true will have the transformer contact OpenContent to determine if the user has permissions for the document
optimus.enableRepositorySecurity=false
# URL the transformer should use to contact OpenContent
optimus.openContentUrl=http://alfresco:8080/alfresco/OpenContent
# Default transformer to user
optimus.defaultTransformer=pdfium
pdfium-configs.executablePath=/opt/pdfium
```

## Limitations

AEVT only supports Content Services installations that have a single content store. If multiple content stores are being used, AEVT will not operate properly.

AEVT reads content directly from a content store or S3. This means that installations where the content is stored elsewhere cannot be implemented for use with AEVT. For example if a document is stored in Content Services as a link, which navigates to another source system, AEVT will not work properly.
