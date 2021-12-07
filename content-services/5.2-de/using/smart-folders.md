---
title: Verwenden von Smart-Folders
---

Ein Smart-Folder ist eine Möglichkeit, Dateien aus verschiedenen Speicherorten in Alfresco Share in einem einzelnen Ordner zu gruppieren, so dass Sie schnell ähnliche Dateien finden können.

Beim Öffnen des Smart-Folder-Inhalts wird eine Suche durchgeführt und die Ergebnisse werden angezeigt. Der Ordner ist smart, d. h. **intelligent**, da ihm kein physischer Ordner im Repository entspricht.

Sie können beispielsweise einen Smart-Folder mit den Namen **Meine Videodateien** erstellen, der alle von Ihnen erstellten Dateien mit einem Videoformat enthält. Immer dann, wenn Sie den Ordner **Meine Videodateien** öffnen, wird eine Suche durchgeführt, und alle Videodateien sind in diesem Ordner verfügbar, unabhängig davon, wo sie im Repository erstellt wurden.

Sie sind sich möglicherweise noch nicht einmal bewusst, dass Sie Smart-s verwenden. Sobald Sie das Symbol ![Folder with a magnifying glass representing a Smart Folder]({% link content-services/images/sf.png %}) sehen, ist der Ordner ein smarter Ordner. Dateien werden darüber hinaus automatisch klassifiziert, wenn sie in diese Ordner hochgeladen werden.

Das folgende Diagramm zeigt ein physisches Dateisystem und stellt dar, wie eine Smart-Folder-Struktur erstellt wird, die die für einen bestimmten Kunden relevanten Dateien enthält: ![Physical repository shown on the left with folders and files that relate to a customer.  these are brought together into a new Smart Folder structure in Alfresco]({% link content-services/images/sf-mapping.png %})

Smart-Folders verfügen über eine begrenzte Anzahl von Aktionen:

-   Hinzufügen/Erstellen: Sie können einem Smart-Folder Dateien hinzufügen. Die Datei wird gemäß der Definition in der Filing-Regel in einem physischen Ordner abgelegt.
-   Aktualisieren: Sie können die Dateien in einem Smart-Folder aktualisieren. Das Aktualisieren einer Eigenschaft kann dazu führen, dass eine Datei aus dem aktuellen Smart-Folder entfernt wird (da sie nicht mehr den Suchkriterien entspricht).
-   Aktionen zum Löschen, Bearbeiten von Eigenschaften, Entzippen, Synchronisieren, Suchen, Verschieben und Kopieren von Dateien werden nicht unterstützt.

Der Smart-Folder selbst kann in Alfresco Content Services nicht bearbeitet werden, außer über die Vorlage für Smart-Folder. Weitere Informationen zu Vorlagen für Smart-Folder finden Sie unter [Anwenden von Vorlagen für Smart-Folder](#applying-a-smart-folder-template).

Ihr Systemadministrator erstellt Vorlagen, die Sie für verschiedene Zwecke laden können, z. B. eine Struktur für einen Anspruch oder zum Ablegen von PDF-Dateien getrennt von Video- oder Audiodateien, oder um die Ordnerstruktur einfach entsprechend den einzelnen Benutzern zu personalisieren.

Werfen Sie einen Blick auf die Videos, um mehr zu erfahren: [Videos zu Smart-Folders]({% link content-services/5.2/tutorial/video/content.md %}#smart-folders-videos)

Systemadministratoren und Business-Analysten erhalten hier weitere Informationen: [Konfigurieren von Smart-Folders]({% link content-services/5.2/config/smart-folders/index.md %}#configuring-smart-folders) und im Tutorial: [Tutorial für Smart-Folders]({% link content-services/5.2/tutorial/smart.md %}#smart-folders-tutorial).

## Anwenden von Vorlagen für Smart-Folders

Sie können eine Smart-Folder-Struktur auf einen physischen Ordner anwenden, indem Sie Aspekte verwenden.

1.  Wählen Sie in einer Site die Option **Dokumentenbibliothek**.

2.  Klicken Sie auf **Erstellen** und anschließend auf **Ordner**, um einen neuen Ordner zu erstellen. Geben Sie den Ordnernamen ein und wählen Sie **Speichern**.

    Alternativ können Sie auch einen vorhandenen physischen Ordner auswählen. Ein physischer Ordner ist ein Ordner, den Sie angelegt haben: ![Physical folder icon]({% link content-services/images/folder.png %})

3.  Führen Sie den Mauszeiger über den Ordner. Wählen Sie im Menü die Option **Mehr** und anschließend **Aspekte verwalten**.

4.  Fügen Sie im Fenster **Aspekte auswählen** einen oder mehrere vordefinierte Aspekte für Smart-Folder hinzu (System-Smart-Folder oder Parametrierter Smart-Folder – abhängig von den Vorlagen, die Ihr Unternehmen hinzugefügt hat), und wählen Sie **Speichern**.

    Fragen Sie Ihren Business Analyst oder Systemadministrator, ob für Ihr Unternehmen System-Smart-Folder oder parametrierte Smart-Folder eingerichtet wurden.

5.  Führen Sie den Mauszeiger erneut über den neuen Ordner. Wählen Sie im Menü die Option **Eigenschaften bearbeiten** und anschließend **Alle Eigenschaften**. Wählen Sie die gewünschte Vorlage für Smart-Folder aus und wählen Sie **Speichern**.

    Wenn Ihr Systemadministrator Vorlagen für Ihr Unternehmen erstellt hat, können Sie diese über einen Drilldown in **Datenverzeichnis/Vorlage für Smart-Folder** suchen.

    Systemadministratoren finden hier weitere Informationen zu den Vorlagen: [Aktivieren von Smart-Folders]({% link content-services/5.2/config/smart-folders/index.md %}#enabling-smart-folders).

    Der physische Ordner, den Sie ausgewählt haben, weist nun eine Smart-Folder-Struktur auf, die Dateien enthält, welche den Suchkriterien in der Smart-Folders-Vorlage entsprechen. Wenn Sie die Standardvorlage **smartFoldersExample.json** verwenden, sind mehrere Ordner verfügbar:

    -   Mein Inhalt – jede Datei im Repository, die folgende Elemente enthält:
    -   Alle Site-Inhalte (Dokumente und Multimedia-Dateien, nach Typ archiviert)
    -   Die Inhalte dieses Ordners (Dokumente und Multimedia-Dateien, nach Typ archiviert)
    -   Beiträge
    -   Mein Inhalt, von anderen Benutzern geändert
    -   Benutzer-Home
    -   Getagged mit **Vertraulich**

    Die in den Ordnern enthaltenen Dateien hängen von den Dateien ab, die auf Ihrer Site verfügbar sind. Beispiel: Wenn Sie Audiodateien auf der Site erstellt haben, werden diese angezeigt, wenn Sie einen Drilldown in **Alle Site-Inhalte/Multimedia-Dateien/Audioinhalt** ausführen, sowie alle anderen Dateien, die diesem physischen Ordner in **Inhalt dieses Ordners/Multimedia-Dateien/Audioinhalt** zugeordnet sind. Alle Dateien, die in den Metadaten als vertraulich gekennzeichnet sind, werden im Ordner **Vertraulich** angezeigt.

## Häufig gestellte Fragen zu Smart-Folders

Sollten Probleme mit Smart-Folders auftreten, lesen Sie die folgenden Ratschläge zur Lösung des Problems.

**Was sind die wichtigsten Funktionen von Smart-Folders?**

Smart-Folders bieten die folgenden Möglichkeiten:

-   Suchen von Inhalten anhand des Inhalts und nicht des Speicherorts
-   Definieren von gespeicherten Inhalten in einer Mustervorlage und deren Anzeige in einer hierarchischen Ordnerstruktur
-   Durchführen einer Suche beim Öffnen eines Ordners; die Ergebnisse werden als **Ordnerinhalt** angezeigt
-   Zusammenführen von Inhalten, die im Repository verteilt sind, in einer einzigen Ansicht oder einen Smart-Folder
-   Bereitstellen von einer oder mehreren metadatengesteuerte Taxonomien, um eine Ordnerstruktur zu erstellen, so dass jeder Ordner und jede Datei dem jeweiligen Geschäftskontext entsprechend und ohne Filing in mehreren Ordnern angezeigt werden kann
-   Automatisches Klassifizieren neuer Dateien oder Vererben/Zuordnen von Metadaten an die Datei
-   Einfaches Replizieren von Smart-Folder-Strukturen
-   Anwenden auf vorhandene Inhalte, ohne Alfresco Content Services neu zu starten

**Kann ich eine Datei aus einem Smart-Folder löschen?**

Nein, das ist nicht möglich. Diese Option ist nicht verfügbar. Sie müssen die Datei an ihrem physischen Speicherort löschen oder die Eigenschaften bearbeiten, damit sie nicht den Filing-Kriterien für den Smart-Folder entsprechen.

**Kann ich einen neuen Ordner oder eine Datei innerhalb eines Smart-Folders erstellen?**

Sie können eine neue Datei, aber keinen Ordner erstellen. Die Datei wird gemäß der Definition in der Filing-Regel in einem physischen Ordner abgelegt.

**Kann ich eine Datei in einem Smart-Folder aktualisieren?**

Ja, das ist möglich. Wenn Sie die Eigenschaften der Datei ändern, kann dies jedoch möglicherweise dazu führen, dass die Datei aus dem Smart-Folder verschoben wird.

Nein, das ist nicht möglich. Die Datei ist nicht physisch in diesem Ordner vorhanden. Daher kann sie auch nicht verschoben oder kopiert werden.

**Warum kann ich einen Smart Folder nicht mit **Gefällt mir** oder als Favorit markieren?**

Bestimmte Ordneraktionen werden für Smart-Folders nicht unterstützt. So sind beispielsweise die Optionen **Favorit**, **Gefällt mir** und **Kommentar** nicht verfügbar (da der Ordner physische nicht existiert).

Weitere nicht verfügbare Aktionen sind **Löschen**, **Verschieben nach**, **Kopieren nach**, **Hochladen** und **Erstellen**.

**Warum wird eine neue Datei nicht in einem Smart-Folder angezeigt?**

Es kann einige Sekunden dauern, bis eine neue Datei im Smart-Folder angezeigt wird. Dies ist häufig der Fall, wenn der Index veraltet ist. Wenden Sie sich bei Problemen an Ihren Systemadministrator.
