---
title: Configuring Suggested Redaction
---

The suggested Redaction functionality utilizes RegEx patterns. These patterns can be configured by overriding the bean with id `RedactionRegexAttrMap`.
This may be overridden by following the below steps:

**Step 1** : Create a Extension Content Accelerator Amp [Click here](https://docs.alfresco.com/content-accelerator/latest/develop/extension-content-accelerator/).\
**Step 2** : Locate or create the `alfresco/module/com.tsgrp.opencontent` path.\
**Step 3** : Locate or create the XML file `opencontent-override-overlay-spring-config.xml`.\
**Step 4** : The out of the box suggested redactions bean will default to the following.
```XML
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
**Step 5** : In order to modify what pattern to include for suggested redactions you can override this bean in the file `opencontent-override-overlay-spring-config.xml` and add or remove as many patterns are you need.\
**Step 6** :Provide a key value set similar to the above example to set your own custom Redact Suggestion based on your set up Regex pattern.