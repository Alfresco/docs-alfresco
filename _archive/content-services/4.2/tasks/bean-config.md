---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: <bean\> tag bean file xml
---

# Customizing bean files

Bean files end with the extension .xml and contain `<bean>` tags. You can modify `<bean>` tags to define properties or point to customized files.

There are two common uses of beans:

-   To define properties
-   To point to one or more of your customized files

A typical bean file is <extension\>/custom-repository-context.xml. A bean file contains `<?xml>` and `<!DOCTYPE>` headers, and `<beans>` tags outside the `<bean>` tags. You must preserve these items in your customized file.

**Important:**

When you override a `<bean>`, the entire effects of the original bean are lost. The effect is the same as if you had overridden a `<config>` by using `replace="true"`. Therefore, the overriding `<bean>` must contain any information from the default bean that you want to keep, as well as any additional information.

For example, if a core bean has four values, and you want to modify a single value, the resultant bean must still have four values. However, if you want to add a value, then the resultant bean must have five values - the original four values plus the added value.

1.  Open the bean file that you want to customize.

    For example, the following `<bean>` is from the `<configRoot>/classes/alfresco/action-services-context.xml` file:

    ```
    <bean id="mail" class="org.alfresco.repo.action.executer.MailActionExecuter" 
     parent="action-executer">
       <property name="publicAction">
          <value>true</value> <!-- setting to true -->
       </property>
       <property name="mailService">
          <ref bean="mailService"></ref>
       </property>
    </bean>
    ```

2.  Delete each pair of `<bean> </bean>` tags that you do not want to modify.

3.  Modify the contents of the remaining `<bean>` tags.

    For example, the following overrides the `publicAction` property from the previous example:

    ```
    <bean id="mail" class="org.alfresco.repo.action.executer.MailActionExecuter" 
     parent="action-executer">
       <property name="publicAction">
          <value>false</value> <!-- setting to false -->
       </property>
       <property name="mailService">
          <ref bean="mailService"></ref>
       </property>
    </bean>
    ```

4.  Save the file.


**Parent topic:**[Customizing individual configuration items](../concepts/default-files-config.md)

