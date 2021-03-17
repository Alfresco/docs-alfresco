---
author: Alfresco Documentation
---

# Iframes and phishing attack mitigation

You can configure `IFramePolicy` to protect users against a phishing attack, which attempts to acquire information such as user names or passwords by simulating a trustworthy entity.

Alfresco Content Services allows you to control which domain pages or content are included in Alfresco Share to create a whitelist of allowed domains. A whitelist is a list of email addresses or IP addresses that are considered to be safe for use within your organisation.

This `IFramePolicy` is applied when Share includes an `<iframe>` tag while constructing the Web View dashlet. The dashlet will allow only those URLs that have been added to the whitelist. Developers can use the `Alfresco.util.IFramePolicy.isUrlAllowed()` method to check if a URL is allowed for custom implementations of a Web View or `<iframe>` tag is included.

**Note:** If you have a previous installation which includes a URL from a third-party domain, you will get an error message in your production environment prompting you to configure your `IFramePolicy` configuration by adding the domain to the whitelist.

**Note:** URLs pointing to the same domain, such as documents or wiki pages inside Share, will continue to work as usual by default.

The whitelist of allowed domains is set in the <configRootShare\>/classes/alfresco/share-security-config.xml configuration file:

```
<config evaluator="string-compare" condition="IFramePolicy">
 <same-domain>allow</same-domain>
  <cross-domain>
    <url>*</url>
  </cross-domain>
</config>
```

To deny URLs from the current domain, override the existing code in the share-config-custom.xml file with the following code:

```
<config evaluator="string-compare" condition="IFramePolicy" replace="true">
  <same-domain>deny</same-domain>
</config>
```

To allow all cross domain URLs, override the existing code in the share-config-custom.xml file with the following code:

```
<config evaluator="string-compare" condition="IFramePolicy" replace="true">
 <cross-domain>
   <url>*</url>
 </cross-domain>
</config>
```

To allow specific cross domain URLs, override the existing code in the share-config-custom.xml file with the following code:

```
<config evaluator="string-compare" condition="IFramePolicy" replace="true">
 <cross-domain>
   <url>https://www.owasp.org/</url>
 </cross-domain>
</config>
```

**Parent topic:**[Alfresco Share Security policies and filters](../concepts/share-security-policies-filters.md)

