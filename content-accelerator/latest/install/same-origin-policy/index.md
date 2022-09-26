---
title: Handling the Same Origin Policy
---

Since ACA executes as a JavaScript application in the browser and communicates with OpenContent on the server, you must account for the [Same-Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy).  There are two ways to handle this:

1. Deploy the ACA war to the same Application Server that's running OpenContent.  This ensures that ACA is sourced from the same server and port as OpenContent.  Note - for this to work, the application server port must be accessible to the end user's browser.
1. [Front all communication from ACA to OpenContent through a web server](https://github.com/tsgrp/hpi/wiki/Front-Tomcat-with-Apache).  For example, if ACA runs on server1 on port 9090 and OpenContent runs on server2 port 8080 (could be the same server or different server), you must make both ACA and OpenContent accessible from a single host and port.  So:
  * `server1` has an Apache server installed that:
    * Proxies requests to `server1/hpi` to `server1:9090/hpi`
    * Proxies requests to `server1/OpenContenet` to `server2:8080/OpenContent`
  * `http://server1:9090/hpi` is accessible by `http://server1/hpi`
  * `http://server2:8080/OpenContent` is accessible by `http://server1/OpenContent`

