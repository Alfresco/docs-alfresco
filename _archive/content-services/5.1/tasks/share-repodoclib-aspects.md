---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, aspects]
---

# Configuring aspects

Aspects can be configured in the file ./tomcat/webapps/share/WEB-INF/classes/alfresco/share-documentlibrary-config.xml.

Aspects can be added to any document in the repository. Examples of aspects include `taggable`, `exif`, and `versionable`. There are many others. Each aspect can be configured as visible, hidden, addable, and removable.

1.  Load the file ./tomcat/webapps/share/WEB-INF/classes/alfresco/share-documentlibrary-config.xml into your favorite editor.

2.  Search for the text "aspects". You will find the following configuration:

    ```
    
                
          <!--
             Used by the "Manage Aspects" action and Rules pages
    
             For custom aspects, remember to also add the relevant i18n string(s)
                aspect.cm_myaspect=My Aspect
          -->
          <aspects>
    
             <!--
                Aspects that a user can see in UI.
                Used by Rules, aspects are the listed aspects for rule's "has-aspect" action condition.
             -->
             <visible>
                <aspect name="cm:generalclassifiable" />
                <aspect name="cm:complianceable" />
                <aspect name="cm:dublincore" />
                <aspect name="cm:effectivity" />
                <aspect name="cm:summarizable" />
                <aspect name="cm:versionable" />
                <aspect name="cm:templatable" />
                <aspect name="cm:emailed" />
                <aspect name="emailserver:aliasable" />
                <aspect name="cm:taggable" />
                <aspect name="app:inlineeditable" />
                <aspect name="cm:geographic" />
                <aspect name="exif:exif" />
                <aspect name="audio:audio" />
                <aspect name="cm:indexControl" />
                <aspect name="dp:restrictable" />
             </visible>
    
             <!--
                Aspects that a user can add in UI.
                Used by Rules, aspects are the listed aspects for rule's "add-features" action.
                Same as "visible" if left empty.
             -->
             <addable>
             </addable>
    
             <!--
                Aspects that a user can remove in UI.
                Used by Rules, aspects are the listed aspects for rule's "remove-features" action.
                Same as "visible" if left empty
             -->
             <removeable>
             </removeable>
          </aspects>
                
                
              
    ```

3.  Modify the configuration of aspects as required.


You have seen how to configure aspects via the document library configuration file. You can also add similar configurations to share-config-custom.xml.

**Parent topic:**[Share Document Library](../concepts/share-repodoclib.md)

