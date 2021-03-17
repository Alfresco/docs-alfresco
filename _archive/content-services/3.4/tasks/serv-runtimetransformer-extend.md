---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [book, services, API/Script]
option: RuntimeExecutableContentTransformer, Spring
---

# Extending `RuntimeExecutableContentTransformer`

This example extends the `RuntimeExecutableContentTransformer` using Spring configuration.

This code sample \(tidyTransformer.xml\) shows the required Spring configuration \(tidyTransformer.xml\) to extend the `RuntimeExecutableContentTransformer`. This is a standard transformer that can execute system executables. An example of a command line transformation program is HTML Tidy \(http://tidy.sourceforge.net/\), which can transform HTML documents into XHTML documents.

1.  Define the transformation command using the `transformCommand` property.

    The transformation mechanism substitutes the variables `${source}` and `${target}`, which are the full file paths of the source and target files for the transformation. For example:

    ```
          <property name="transformCommand">
             <bean class="org.alfresco.util.exec.RuntimeExec">
                <property name="commandMap">
                    <map>
                        <entry key="Linux">
                            <value>tidy -asxhtml -o '${target}' '${source}'</value>
                        </entry>
                        <entry key="Windows.*">
                            <value>tidy -asxhtml -o "${target}" "${source}"</value>
                        </entry>
                    </map>
                </property>
    ```

2.  \(Optional\) Define the `checkCommand` property.

    The optional `checkCommand` property feature comes with the transformer and is executed by the `init` method. If an error occurs during execution of this command, which cannot take any parameters, the transformer is flagged as unavailable. When unavailable, the `getReliability` method returns 0.0; otherwise it assumes that the transformation command will be successful. The reliability of the transformation is used by the transformation registry to select the most appropriate transformer for a given transformation. The transformer remains directly usable, such as if directly selected as an action to perform.

    External utilities stick to a rough convention regarding the return codes. In this case, tidy, returns a code value 2. The `errorCodes` property defines a comma-separated list of values indicating failure. The default is "1, 2".

    ```
                <property name="checkCommand">
             <bean class="org.alfresco.util.exec.RuntimeExec">
                <property name="commandMap">
                    <map>
                        <entry key=".*">
                            <value>tidy -help</value>
                        </entry>
                    </map>
                </property>
                <property name="errorCodes">
                   <value>2</value>
                </property>
             </bean>
          </property>
    
          </property>
    ```

3.  Define the MIME types this transformer supports using the `explicitTransformations` property.

    The transformer supports a source MIME type of text/html and a target MIME type of application/xhtml+xml.

    ```
                <property name="explicitTransformations">
             <list>
                <bean class="org.alfresco.repo.content.transform.ExplictTransformationDetails" >
                    <property name="sourceMimetype"><value>text/html</value></property>
                    <property name="targetMimetype"><value>application/xhtml+xml</value></property>
                </bean>
             </list>
          </property>
    
    ```

4.  Save your file to commit your changes, for example, as tidyTransformer.xml.


This illustrates how to extend an existing service via configuration only by adding a new transformer without any code changes. To expose the new transformer via the client interfaces or as a repository action requires additional configuration. The following shows the full code example used in this task.

```
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

<beans>
   <bean id="transformer.Tidy.XHTML" 
       class="org.alfresco.repo.content.transform.RuntimeExecutableContentTransformer" 
       parent="baseContentTransformer">
      <property name="checkCommand">
         <bean class="org.alfresco.util.exec.RuntimeExec">
            <property name="commandMap">
                <map>
                    <entry key=".*">
                        <value>tidy -help</value>
                    </entry>
                </map>
            </property>
            <property name="errorCodes">
               <value>2</value>
            </property>
         </bean>
      </property>
      <property name="transformCommand">
         <bean class="org.alfresco.util.exec.RuntimeExec">
            <property name="commandMap">
                <map>
                    <entry key="Linux">
                        <value>tidy -asxhtml -o '${target}' '${source}'</value>
                    </entry>
                    <entry key="Windows.*">
                        <value>tidy -asxhtml -o "${target}" "${source}"</value>
                    </entry>
                </map>
            </property>
            <property name="errorCodes">
               <value>2</value>
            </property>
         </bean>
      </property>
      <property name="explicitTransformations">
         <list>
            <bean class="org.alfresco.repo.content.transform.ExplictTransformationDetails" >
                <property name="sourceMimetype"><value>text/html</value></property>
                <property name="targetMimetype"><value>application/xhtml+xml</value></property>
            </bean>
         </list>
      </property>
   </bean>
</beans>

```

**Parent topic:**[Configuring and extending existing services](../concepts/serv-existing-configuring.md)

