---
author: Alfresco Documentation
---

# transaction

The `transaction` element specifies the transaction level required to run the web script. The `transaction` element is optional.

The `transaction` element can have the following values:

-   **`none`**

    Specifies that no transaction is required to run the web script. This is the default value if the transaction level is not explicitly specified, and the authentication level is `none`. If the authentication level is not `none` then the default value is `required`.

-   **`required`**

    Specifies that a transaction is required \(and will inherit an existing transaction, if open\).

-   **`requiresnew`**

    Specifies that a new transaction is required.


The `transaction` element also has the following attributes:

-   **`allow` \(optional\)**

    Specifies the type of data transfer allowed. Valid values, which are optional/required, are as follows:

    -   `readonly` - read only transfers allowed
    -   `readwrite` - read and write transfers allowed
-   **`buffersize` \(optional\)**

    Specifies the buffer size in bytes. Integer value.

    sets the size in bytes of the transactional buffer the webscript will allocate to guard against the potential rollback of a transaction during the webscript processing. If a rollback occurs and the buffer has not been filled, then it is able to rollback without any output from the webscript being committed to the container output stream. This means error responses can be returned instead of partially formed responses with an error embedded into them.

    Buffers are only present where a transaction is required, otherwise they are not used.

    For some webscripts, a buffer is not appropriate and would actually be detrimental to performance - the webscript may require direct access to the output stream not a wrapped buffer object - the `remoteadm` webscripts are such an example.


`transaction` example.

```

<webscript kind="org.alfresco.httpsonly"> 
  <shortname>Hello World</shortname>
  <description>Greet a user</description>
  <url>/sample/helloworld?to={name}</url>
  <url>/sample/helloworld.xml?to={name}</url>
  <format default="html">extension</format>
  <lifecycle>sample</lifecycle>
  <authentication runas="fred">user</authentication>
  **<transaction\>required</transaction\>**
  <family>Sample</family>
  <cache>
    <never>false</never>
    <public>false</public>
    <mustrevalidate/>
  </cache>
  <negotiate accept="text/html">html</negotiate>
  <negotiate accept="text/xml">xml</negotiate>
</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

