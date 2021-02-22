---
author: Alfresco Documentation
---

# Java Delegates

The simplest option is to create a class that implements the `org.activiti.engine.delegate.JavaDelegate` interface.

```
package my.company;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;

public class MyJavaDelegate implements JavaDelegate {

    public void execute(DelegateExecution execution) throws Exception {
        System.out.println("Hello from the class delegate");
        execution.setVariable("var1", "Hello from the class delegate");
    }

}
```

Build a jar with this class, and add it to the classpath. In the Service task configuration, set the `class` property to using the fully qualified classname \(in this case `my.company.MyJavaDelegate`\).

**Parent topic:**[Custom Logic](../topics/custom_logic.md)

