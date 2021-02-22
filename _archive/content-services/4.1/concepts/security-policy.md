---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Security filters and clickjacking mitigation in Alfresco Share

You can configure a security filter, `SecurityHeadersPolicy`, that mitigates clickjacking attacks in Alfresco Share.

`SecurityHeadersPolicy` is a Java Servlet filter that applies HTTP response headers to incoming requests in Alfresco Share. The headers that are returned are defined in a configuration section called `SecurityHeadersPolicy` in `alfresco-security-config.xml`.

Three headers are added by default; `X-Frame-Options`, `X-Content-Type-Options` and `X-XSS-Protection`:

```

<config evaluator="string-compare" condition="SecurityHeadersPolicy">
  <headers>
    <header>
      <name>**X-Frame-Options**</name>
      <value>SAMEORIGIN</value>
    </header>
    <header>
      <name>**X-Content-Type-Options**</name>
      <value>nosniff</value>
    </header>
    <header>
      <name>**X-XSS-Protection**</name>
      <value>1; mode=block</value>
    </header>
  </headers>
</config>
```

## X-Frame-Options header

Adding this header to an HTTP response tells the browser whether Share pages are permitted inside iframes. In our default configuration we have set this to `SAMEORIGIN` which means that Share pages are only permitted inside iFrames inside Share or in other web applications that live under the same domain. For example, it is possible to include http://www.acme.com/share inside an iframe on http://www.acme.com/portal.

You can override the configuration and set the header to return `DENY` instead, by placing the following configuration in your `share-config-custom.xml` file:

```
<config evaluator="string-compare" condition="SecurityHeadersPolicy">
  <headers>
    <header>
      <name>X-Frame-Options</name>
      <value>**DENY**</value>
    </header>
  </headers>
</config>
```

## X-Content-Type-Options

This header is valid for Internet Explorer \(IE\) only. Older versions of IE \(8 and below\) sniff the content of a returned resource and then execute the content as the content type that IE thinks the resource has, instead of the content type that the server returned. To stop IE from doing this, `nosniff` is returned in the header.

## X-XSS-Protection

This header is provided by Internet Explorer \(IE\) to rectify “sanitization” logic that can be used by an attacker to introduce an XSS flaw on your site.

By default Alfresco Share returns `1; mode=block` for this header, which stops IE from executing sanitized code.

It is also possible to set the value to `0` which stops IE from inspecting the code for XSS attacks.

## Adding other headers

Alfresco supports adding other headers to the configuration, for example, the `Strict-Transport-Security` header forces the browser to allow only `https` communication. This header is not provided by Alfresco Share, but can be added by using this code:

```
<config evaluator="string-compare" condition="SecurityHeadersPolicy">
  <headers>
    <header>
      <name>**Strict-Transport-Security**</name>
      <value>**max-age=31536000**</value>
    </header>
  </headers>
</config>
```

**Parent topic:**[Security policies and filters in Alfresco Share](../concepts/share-policies.md)

