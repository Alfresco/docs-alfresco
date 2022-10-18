---
title: Configuring JRebel for Alfresco Enterprise Viewer
---

## Configuring JRebel for OpenAnnotate

The steps for configuring JRebel for OpenAnnotate are the same as the steps for OpenContent. The difference will be your `rebel.xml` file. Please see the OpenContent documentation on [configuring JRebel](https://github.com/tsgrp/OpenContent/wiki/Configuring-JRebel-for-OpenContent) for more information on getting started.

## Sample Rebel.xml Configuration

This example shows mapping some Java classes as well as static resources.  Setup should be similar to any other project, the big advantage here being that we can reload static resources (HTML, JavaScript, CSS, etc.) without restarting the server.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns="http://www.zeroturnaround.com" 
    xsi:schemaLocation="http://www.zeroturnaround.com http://www.zeroturnaround.com/alderaan/rebel-2_0.xsd">

 <classpath>
  <dir name="C:\work\code\tsg\OA_ROOT\bin" />
 </classpath>
  
 <web>
  <link target="js/">
   <dir name="C:\work\code\tsg\OA_ROOT\src\main\webapp\js" />
  </link>
  <link target="css/">
   <dir name="C:\work\code\tsg\OA_ROOT\src\main\webapp\css" />
  </link>
  <link target="WEB-INF/freemarker/">
   <dir name="C:\work\code\tsg\OA_ROOT\src\main\webapp\WEB-INF\freemarker" />
  </link>
 </web>

</application>
```
