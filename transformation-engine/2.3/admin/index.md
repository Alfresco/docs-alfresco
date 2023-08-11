---
title: Administer the Document Transformation Engine
---

The Document Transformation Engine can be integrated with monitoring tools such as Nagios or Hyperic, by using HTTP REST calls.

The tool should call the Document Transformation Engine URL with a set of parameters and then monitor the response.

Two calls are available:

* Connection tester call

    This call is also used by the Alfresco Transformation client to test availability. It checks the transformation service is up and responding.

    1. URL: `http://<transformation-host>:<port>/transformation-backend/service/transform/v1/version`

    2. HTTP Method: `GET`

    3. Make sure that you include basic authentication credentials to your call.

* Transformation execution call

    This call gets an Office file from the Transformation Service to check whether the transformation engine is still functioning (the Transformation Service makes an internal post, but the HTTP method is still a GET call). This can be used for more in-depth monitoring.

    1. URL: `http://<transformation-host>:<port>/transformation-backend/service/transform/v1/available`

    2. HTTP Method: `GET`

    3. Make sure that you include basic authentication credentials to your call.
