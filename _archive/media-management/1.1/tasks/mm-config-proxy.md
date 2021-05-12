---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Setting up a new proxy for Media Management

Use this information to configure an new proxy rendition.

The standard H.264 proxy is used for video transformations in Media Management. This proxy is called in tomcat/webapps/alfresco/WEB-INF/classes/alfresco/module/org\_alfresco\_mm\_repo/alfresco-mm-standard-context.xml.

1.  If you need to use a different proxy, you can use the standard proxyDefinition720p bean as a template:

    ```
    <bean id="proxyDefinition720p" class="org.alfresco.repo.thumbnail.DeletingThumbnailDefinition">
      <property name="name" value="h264-720"/>
      <property name="mimetype" value="video/mp4"/>
      <property name="transformationOptions">
       <bean class="org.alfresco.repo.content.transform.GytheioPassthroughTransformationOptions">
        <property name="gytheioTransformationOptions">
         <bean class="org.gytheio.content.transform.options.VideoTransformationOptions">
          <property name="resizeOptions">
           <bean class="org.gytheio.content.transform.options.ImageResizeOptions">
            <property name="width" value="1280"/><property name="height" value="720"/>
            <property name="maintainAspectRatio" value="true"/>
           </bean>
          </property>
          <property name="targetVideoCodec" value="h264"/>
          <property name="targetVideoBitrate" value="2400000"/>
          <property name="targetVideoFrameRate" value="29.97"/>
          <property name="targetAudioCodec" value="aac"/>
          <property name="targetAudioBitrate" value="160000"/>
          <property name="targetAudioSamplingRate" value="44100"/>
          <property name="targetAudioChannels" value="2"/>
          <property name="additionalOptions">
           <map>
            <entry key="AWS_TRANSCODE_PRESET_ID" value="1351620000001-000010"/>
           </map>
          </property>
         </bean>
        </property>
        <property name="timeoutMs" value="${system.thumbnail.definition.default.timeoutMs}"/>
        <property name="readLimitTimeMs" value="${system.thumbnail.definition.default.readLimitTimeMs}"/>
        <property name="maxSourceSizeKBytes" value="${system.thumbnail.definition.default.maxSourceSizeKBytes}"/><property name="readLimitKBytes" value="${system.thumbnail.definition.default.readLimitKBytes}"/>
        <property name="pageLimit" value="${system.thumbnail.definition.default.pageLimit}"/>
        <property name="maxPages" value="${system.thumbnail.definition.default.maxPages}"/>
       </bean>
      </property>
      <property name="placeHolderResourcePath" value="alfresco/thumbnail/thumbnail_placeholder_256.png"/>
      <property name="mimeAwarePlaceHolderResourcePath" value="alfresco/thumbnail/thumbnail_placeholder_256{0}.png"/><property name="runAs" value="System"/>
      <property name="failureHandlingOptions" ref="standardFailureOptions"/>
      <property name="deleteOnContentUpdate" value="true"/>
    </bean>
    ```

2.  Change the bean id, value and property name, and any H.264 proxy specific attributes to reflect your new proxy.


**Parent topic:**[Configuring Media Management](../tasks/mm-props-config.md)

