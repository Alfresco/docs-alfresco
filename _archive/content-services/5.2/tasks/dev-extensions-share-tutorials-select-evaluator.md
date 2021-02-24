---
author: Alfresco Documentation
---

# Selecting an evaluator

This tutorial demonstrates how to select an evaluator.

This tutorial assumes you have at least one module deployed \(it can be any of the modules you created in previous tutorials\).

When a module is deployed it is evaluated before being processed. This evaluation determines whether or not the module is to be executed. By default the default evaluator, `default.extensibility.evaluator` is applied to determine if the module should be executed. However, it is possible to select a different evaluator to be applied, from a list of provided evaluators, or a custom coded evaluator. This can be done through configuration or through the Share Module Deployment user interface. This tutorial looks at how this is achieved in practice.

1.  In your browser navigate to `﻿http://localhost:8080/share/page/modules/deploy`.

    Your modules and deployed modules will be displayed.

2.  Ensure that at least one module is deployed.

3.  Click on the deployed module and the Evaluator selector will appear to the right.

4.  In the Evaluator list box select the `config.approval.evaluator` evaluator.

    The evaluator properties will be displayed. In this case the `config.approval.evaluator` evaluator has the key `apply`. For this evaluator if the `apply` key is set to `true` the module will be processed. If, however the `apply` key is set to `false` the module will not be processed.

5.  Set the `apply` key to `false`.

6.  Click **Update** to register your changes.

7.  Click **Apply Changes** to have your changes saved to the database.

8.  Now, in another tab, browse to your dashboard to see if the module is applied or not.

    You will see that the module is no longer processed.

9.  Now back in the Module Deployment tab set the evaluator apply key to true.

10. Click **Update**.

11. Click **Apply Changes**.

12. Navigate back to your dashboard tab and refresh.

    You will now see that your module is applied again.


You have seen how to use the Share Module Deployment page to set an evaluator for a module. This can also be achieved through configuration. In the module configuration file \(aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml in previous tutorials\) you would add some XML to apply the evaluator:

```

...
<module>
    <id>Module (New Content)</id>
    <evaluator type="config.approval.evaluator">
        <params>
            <apply>false</apply>
        </params>
    </evaluator>
...

```

**Parent topic:**[Conditional Rendering \(Evaluators\)](../concepts/dev-extensions-share-tutorials-conditional-rendering-evaluations.md)

