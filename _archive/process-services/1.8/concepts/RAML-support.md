---
author: Alfresco Documentation
---

# RAML support

Alfresco Process Services provides a RAML file that works with popular REST API development tools.

The RAML file complements the [REST API Explorer](../topics/rest_api_explorer.md), providing a best-in-class enterprise tooling for APIs.

RESTful API Modeling Language \(RAML\) is a language to describe RESTful APIs. The language is YAML-based with a json format available, and it provides the constructs to describe RESTful or practically-RESTful APIs. Practically-RESTful APIs are those that do not comply with the all constraints of REST.

The language aims to promote reuse, discovery and pattern-sharing, as well as merit-based emergence of patterns. Tooling for RAML varies from modeling to software life cycle management and API description conversion. For more information about RAML, see [https://raml.org](https://raml.org).

Alfresco Process Services provides a description of all enterprise REST APIs using RAML and in json format. The description follows RAML 0.8 but can easily be converted to the recent RAML 1.0 standard by using tools like Apimatic \(\).

You can access the RAML description of all Enterprise REST APIs in Alfresco Process Services using the following URL:

```
http(s)://<alfresco process services host>:port/activiti-app/raml/activiti.raml
```

This URL returns the entire RAML description of the enterprise APIs.

**Using the RAML file for Alfresco Process Services**

The Alfresco Process Services RAML file can be used with tools supporting RAML to integrate it in API life cycle of enterprise systems.

Mulesoft provides a free RAML IDE called API Workbench. This is a plugin for the free editor, Atom, that can be used to view the Alfresco Process Services RAML file. For information on how to download and setup the Atom plugin, see [http://apiworkbench.com/docs](http://apiworkbench.com/docs).

In addition, Mulesoft provides a web-based RAML API designer that can be used to combine Alfresco Process Services REST APIs in RAML-based API and system design. See [https://www.mulesoft.com/platform/api/anypoint-designer](https://www.mulesoft.com/platform/api/anypoint-designer).

For a full list of tools that can use RAML throughout the entire application development life cycle see [http://raml.org/projects/projects](http://raml.org/projects/projects).

**Parent topic:**[REST API](../topics/rest_api.md)

