---
title: Configure suggested redaction
---

The suggested redaction functionality uses regular expression (RegEx) patterns. You can configure these patterns by overriding the bean with id `RedactionRegexAttrMap`, as described below.

1. Create an Extension Content Accelerator AMP.

    Follow the steps in [Extension Content Accelerator]({% link content-accelerator/latest/develop/extension-content-accelerator.md %}) in the Content Accelerator documentation, and then return to this page.

2. Locate or create the `alfresco/module/com.tsgrp.opencontent` path.

3. Locate or create the XML file `opencontent-override-overlay-spring-config.xml` using the following example.

    The out-of-the-box suggested redactions bean default to:

    ```xml
    <bean id="RedactionRegexAttrMap" class="com.tsgrp.opencontent.universal.util.RedactionTextStripper">
      <property name="redactionRegexAttrMap">
        <map>
          <!-- Regex patterns must consist of exactly two capturing groups, with the second group containing the text to be redacted. -->
          <entry key="SSN" value="(SSN: )?(\d{3}-\d{2}-\d{4})"/>
          <entry key="Phone Number" value="(Phone Number: )?((?:\+?1[-.])?(?:\(?\d{3}\)?)?[-. ]?\d{3}[-.]\d{4})"/>
          <entry key="Credit Card" value="(Credit Card Number:[ ]*)?((?:\d{4}[ -]?){4})"/>
          <entry key="Name" value="([Nn]ame:[ ]*)([A-Za-z]+ [-'A-Za-z]+)"/>
        </map>
      </property>
    </bean>
    ```

4. You can override the pattern to include for suggested redactions by modifying the bean in `opencontent-override-overlay-spring-config.xml`.

    Add or remove as many patterns are you need.

5. Provide a key-value pair similar to the above example to set your own custom redaction suggestion based on your RegEx pattern setup.
