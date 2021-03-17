# Processing document generation variables

**interface**: com.activiti.api.docgen.TemplateVariableProcessor

**Maven module**: activiti-app-logic

This section describes the implementation of the document generation task for generating a document based on a MS Word docx template.

An implementation of this class will get called before the variable is passed to the template processor, making it possible to change the value that will be used as the variable name in the template.

Example:

```
@Component
public class MyTemplateVariableProcessor implements TemplateVariableProcessor {

        public Object process(RuntimeDocumentTemplate runtimeDocumentTemplate, DelegateExecution execution, String variableName, Object value) {
                return value.toString() + "___" + "HELLO_WORLD";
        }

}
```

Using the above example, you can add *"HELLO\_WORLD"* to all variable usages in the template. However, you can also add sophisticated implementations based on process definition lookup using the process definition ID from the execution and inject the `RepositoryService` in your bean.

In addition to the process definition, the *runtimeDocumentTemplate* is passed to distinguish for which process and template the variables are being prepared.

**Note:** Only variables with the format *variables.get\("myVariable"\)* in the .docx template will be passed to the *TemplateVariableProcessor* implementation.

**Parent topic:**[Hook points](../topics/hook_points.md)

