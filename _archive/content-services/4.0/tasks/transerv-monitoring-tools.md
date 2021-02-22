---
author: Alfresco Documentation
---

# Integrating with monitoring tools

You can integrate the Alfresco Transformation Sever with monitoring tools, for example Nagios or Hyperic, by using HTTP REST calls.

The tool should call the Transformation Server URL with a set of parameters, and then monitor the response.

Two calls are available:

1.  Connection tester call.

    This call is also used by the Alfresco Transformation Client to test availability. It checks the transformation service is up and responding.

    1.  URL: http://<transformation-host\>:<port\>/transformation-server/service/transform/v1/version

    2.  HTTP Method: GET

    3.  Make sure that you include basic authentication credentials to your call.

2.  Transformation execution call. 

    This call gets an Office file from the Transformation Service to check whether the transformation engine is still functioning \(the Transformation Service makes an internal post, but the HTTP method is still a GET call\).This can be used for more in-depth monitoring.

    1.  URL: http://<transformation-host\>:<port\>/transformation-server/service/transform/v1/available

    2.  HTTP Method: GET

    3.  Make sure that you include basic authentication credentials to your call.


**Parent topic:**[Installing and configuring the Alfresco Transformation Server](../concepts/transerv-intro.md)

