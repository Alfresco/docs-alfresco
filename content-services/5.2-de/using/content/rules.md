---
title: Anwenden von Regeln auf Ordner
---

Sie können in der Bibliothek Ordnerregeln definieren, um Inhalte automatisch zu verwalten. Sie können viele kreative Lösungen entwickeln, um sicherzustellen, dass bestimmte Inhaltsprozesse automatisiert werden, ohne dass Sie die Arbeit selbst erledigen müssen.

Regeln legen fest, wie Inhalte verwaltet werden, die in einen Ordner eingefügt oder daraus entnommen werden, oder die sich derzeit in einem Ordner befinden.

Eine Inhaltsregel besteht aus drei Teilen:

-   Das Ereignis, das die Regel auslöst.
-   Die Bedingungen, die der Inhalt erfüllen muss.
-   Die Aktion, die für den Inhalt durchgeführt wird.

Die folgenden Ereignisse können eine Regel auslösen:

-   Ein Inhaltselement wird in den Ordner eingefügt.
-   Ein Inhaltselement wird aus dem Ordner entnommen (es wird verschoben oder gelöscht).
-   Ein Inhaltselement im Ordner wird geändert.

Nachfolgend finden Sie einige Beispiele, wie Sie Regeln zur Automatisierung sich wiederholender Aufgaben verwenden können:

-   Alle Dateien, die sich im Ordner *Entwürfe* befinden, werden versioniert.
-   Alle Dateien, die sich im Ordner *Entwürfe* befinden, werden Teil eines einfachen Workflows.
-   Alle Dateien, die sich im Ordner *Abgeschlossen* befinden und das Tag *final* haben, werden in den Ordner *Archiviert* verschoben.
-   Alle GIF-Dateien, die sich im Ordner *Bilder* befinden, werden in PNG-Dateien umgewandelt.
-   Alle Präsentationsdokumente, die sich im Ordner *Publiziert* befinden, werden in Flash umgewandelt und in den Ordner *Assets* kopiert.

## Definieren von Regeln für einen Ordner {#defining-rules-for-a-folder}

Verwenden Sie Ordnerregeln zur automatischen Verwaltung Ihrer Dateien. Es gibt zwei Möglichkeiten, Regeln zu definieren: Erstellen eigener Regeln oder Herstellen eines Links zu bereits für einen anderen Ordner erstellten Regeln.

Wenn Sie eine Regel definieren, gilt sie nur für dem Ordner hinzugefügte neue Inhalte. Dateien, die bereits vor der Definition der Regel im Ordner enthalten waren, sind davon nicht betroffen. Sie können die Ordnerregeln mit der Aktion **Regeln ausführen** manuell anwenden.

> **Hinweis:** Selbst wenn der Ordner über keine eigenen Regeln verfügt, kann er Regeln von einem übergeordneten Ordner erben. In diesem Fall wird auf der Seite mit den Regeln eine entsprechende Meldung angezeigt.

## Erstellen von Regeln {#creating-a-rule}

Sie können Regeln für einen Ordner mehr oder weniger genauso erstellen, wie Sie Regeln für Ihre E-Mails erstellen.

> **Hinweis:** Sind einem Ordner bereits Regeln zugewiesen (gekennzeichnet durch das Symbol []({% link content-services/images/rules-icon.png %}), können Sie ihm neue Regeln hinzufügen, indem Sie [einen Satz Regeln hinzufügen](#adding-to-a-set-of-rules).

1.  Verschieben Sie den Mauszeiger auf einen Ordner ohne Regeln und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Regeln erstellen**.

3.  Geben Sie einen Namen und eine Beschreibung (optional) für die Regel ein.

4.  Legen Sie fest, wann die Regel ausgelöst wird.

    -   **Objekte werden hier erstellt oder hierhin verschoben**: Die Regel wird auf Inhalte angewendet, die diesem Ordner hinzugefügt werden. Dies umfasst alle Elemente, die in den Ordner kopiert oder hochgeladen beziehungsweise in diesem erstellt werden.
    -   **Objekte werden aktualisiert**: Wenn ein Element in diesem Ordner geändert wird, wird die Regel darauf angewendet.
    -   **Objekte werden gelöscht oder aus diesem Ordner verschoben**: Die Regel wird auf Inhalte angewendet, die aus dem Ordner verschoben oder gelöscht werden.
    > **Hinweis:** Eine Regel kann über mehrere Ereignisse, Bedingungen und Aktionen verfügen. Klicken Sie auf **+** oder auf **-**, um Zeilen hinzuzufügen oder zu entfernen.

5.  Wählen Sie aus, ob die Regel angewendet wird, **wenn alle Kriterien erfüllt sind**, **wenn nicht alle Kriterien erfüllt sind** oder in beiden Fällen.

    Nachstehend sehen Sie drei Beispiele für Bedingungen, die zum Auslösen einer Regel angewendet werden könnten:

    -   Die Regel wird angewendet, wenn der Elementtitel das Wort **dringend** enthält (**Wenn alle Kriterien erfüllt sind**).
    -   Die Regel wird angewendet, wenn der Elementtitel nicht das Wort **dringend** enthält (**Wenn nicht alle Kriterien erfüllt sind**).
    -   Die Regel wird angewendet, wenn der Elementtitel das Wort **dringend** enthält, es sei denn, das Element wurde vor einem bestimmten Datum erstellt (**Wenn alle Kriterien erfüllt sind** und **Wenn nicht alle Kriterien erfüllt sind**).
6.  Wählen Sie Kriterien für den Inhalt aus, auf den die Regel angewendet wird, und bedenken Sie dabei, dass Sie mit den Symbolen **+** und **-** zusätzliche Kriterien hinzufügen und entfernen können.

    > **Hinweis:** Wenn Sie im Kriterienmenü die Option **Mehr anzeigen** wählen, stehen Ihnen zusätzliche Eigenschaften zur Auswahl. Verwenden Sie die Ordner auf der Seite **Eigenschaft auswählen**, um nach Eigenschaften zu suchen, und wählen Sie dann rechts auf der Seite eine Eigenschaft aus. Bei Auswahl von **In Menü anzeigen** wird die Eigenschaft in allen Bedingungslisten für die aktuelle Regel angezeigt.

7.  Wählen Sie die [Regelaktion](#rule-actions) aus, die bei Erfüllung der Bedingungen ausgeführt werden soll.

    Wenn Sie eine Aktion ausgewählt haben, müssen Sie anschließend weitere Optionen auswählen, z. B. wenn Sie Elemente kopieren oder verschieben möchten, klicken Sie auf **Auswählen**, um festzulegen, wohin der Inhalt kopiert oder verschoben werden soll.

    >**Tipp:** Mit der Option **Kopieren** werden nur Elemente im Ordner und nicht der Inhalt von Unterordnern kopiert. Wählen Sie die zusätzliche Option **Deep Copy** aus, wenn Sie auch Unterordner und deren Inhalt kopieren möchten.

    > **Hinweis:** Das Symbol ![]({% link content-services/images/im-missinginfo.png %}) gibt an, wo in Ihrer Bedingung oder Aktion eine erforderliche Angabe fehlt.

8.  Wählen Sie zusätzliche Optionen aus:

    -   **Regel abschalten**: Schalten Sie die Regel aus.
    -   **Regel trifft auf Unterordner zu**: Wenden Sie die Regel auf diesen Ordner und alle dazugehörigen Unterordner an.
    -   **Regel im Hintergrund ausführen**: Ermöglicht es Ihnen, während der Ausführung der Regel weiterzuarbeiten. Sie können auch eine Aktion ausführen, wenn bei der Regel ein Fehler auftritt. Diese Aktionen werden von Ihrem Alfresco-Administrator eingerichtet.
9.  Klicken Sie auf **Erstellen** oder **Erstellen und eine weitere erstellen**, um diese Regel zu speichern und mit der Erstellung einer weiteren Regel zu beginnen.

## Aktionen für Regeln {#rule-actions}

Wenn Sie in Alfresco Share eine Regel einrichten, stehen Ihnen viele Standardaktionen zur Verfügung.

Ausgewählte Aktionen werden für Dateien ausgeführt, die den Kriterien des Ereignisses und den von Ihnen ausgewählten Bedingungen entsprechen.

Aktionen werden nicht auf Dateien in Unterordnern angewendet, es sei denn, die Option **Regel trifft auf Unterordner zu** ist ausgewählt, bevor eine Regel erstellt wird.

> **Hinweis:** Zusätzliche Regelaktionen sind mit Modulen wie Alfresco Records Management verfügbar, oder auch dann, wenn sie von Ihrem Alfresco-Administrator eingerichtet wurden.

|Aktion|Funktionsweise der Aktion|
|------|--------------------|
|**Skript ausführen**|Führt ein benutzerdefiniertes JavaScript-Skript aus dem Ordner **Datenverzeichnis/Skripte** aus. Es stehen eine Reihe von Beispielskripten zur Verfügung. Die Liste kann je nachdem, wie Alfresco Content Services für Ihre Organisation konfiguriert ist, unterschiedlich ausfallen.|
|**Kopieren**|Erstellt Kopien von Dateien dem von Ihnen angegebenen Speicherort. Wählen Sie die zusätzliche Option **Deep Copy** aus, wenn Sie auch Unterordner und deren Inhalt kopieren möchten.|
|**Verschieben**|Verschiebt alle Dateien und Unterordner an den gewünschten Speicherort.|
|**Einchecken**|Aktuell ausgecheckte Dateien werden eingecheckt. Sie werden beispielsweise vor dem Verschieben in einen anderen Ordner eingecheckt. Wählen Sie **Optionen**, um auszuwählen, ob sie als Unter- oder Hauptversion eingecheckt werden sollen.
|**Auschecken**|Checkt Dateien automatisch aus, wobei eine Arbeitskopie an dem von Ihnen angegebenen Speicherort erstellt wird.|
|**Mit Kategorie verlinken**|Verlinkt Dateien oder Ordner mit einer von Ihnen angegebenen Kategorie, wie beispielsweise eine Region oder Klassifizierung. Weitere Informationen finden Sie unter [Markieren und Kategorisieren von Inhalten]({% link content-services/5.2-de/using/content/manage.md %}#tagging-and-categorizing-content).|
|**Aspekt hinzufügen**|Fügt Dateien einen Eigenschaftsaspekt hinzu, um zusätzliche Verhaltensweisen oder Eigenschaften zuzuweisen. Weitere Informationen finden Sie unter [Info über Aspekte]({% link content-services/5.2/config/repository.md %}#about-aspects).|
|**Aspekt entfernen**|Entfernt einen Eigenschaftsaspekt aus Dateien, um Funktionen oder Eigenschaften zu entfernen. Weitere Informationen finden Sie unter [Info über Aspekte]({% link content-services/5.2/config/repository.md %}#about-aspects).|
|**Einfachen Workflow hinzufügen**|Fügt Dateien zu einem Workflow hinzu. Standardmäßig ist eine Genehmigungsaufgabe vorhanden. Sie können auch klicken, um eine abgelehnte Aufgabe hinzuzufügen. > **Hinweis:** Sie können auf **Genehmigen** und **Ablehnen** klicken, um die Schritte umzubenennen und einen Speicherort auszuwählen, an den genehmigte/abgelehnte Dateien kopieren verschoben werden sollen. Weitere Informationen finden Sie unter [Aufgaben und Workflows](#creating-a-simple-workflow).|
|**E-Mail senden**|Werden Dateien und Unterordner hinzugefügt, können Sie auswählen, ob Benachrichtigungen per E-Mail gesendet werden sollen. Klicken Sie auf **Nachricht**, um Empfänger auszuwählen und die gewünschte Nachricht hinzuzufügen.|
|**Inhalt umwandeln und kopieren**|Fügen Sie gegebenenfalls Kopien von Dateien im gewünschten Format zu einem anderen Speicherort hinzu. Sie können beispielsweise in einem anderen Ordner eine Kopie eines Word-Dokuments im PDF-Format erzeugen.|
|**Bild umwandeln und kopieren**|Fügen Sie gegebenenfalls Kopien von Bilddateien im gewünschten Format zu einem anderen Speicherort hinzu. Sie können beispielsweise eine Kopie einer GIF-Datei im PNG-Format in einem anderen Ordner generieren.|
|**Übliche Metadaten-Felder extrahieren**|Eingebettete Metadaten werden aus Dateien extrahiert und den Dateieigenschaften hinzugefügt. Es werden Microsoft Office-Dokumenteigenschaften, LibreOffice und eine Reihe anderer Formate unterstützt.|
|**Importieren**|ZIP- und ACP-Dateien werden automatisch entpackt. Wählen Sie einen Speicherort für die Ablage der entpackten Dateien aus.|
|**Typ spezialisieren**|Ändert gegebenenfalls den Inhaltstyp einer Datei. So wird beispielsweise eine Standarddatei in ein Richtliniendokument geändert und die entsprechenden Metadaten für diesen Inhaltstyp werden hinzugefügt. Weitere Informationen finden Sie unter [Ändern des Inhaltstyps]({% link content-services/5.2-de/using/content/files-folders.md %}#changing-the-content-type).|
|**Zähler hochsetzen**| Erhöht automatisch den Wert einer numerischen (Ganzzahl) Eigenschaft. Diese Option wird in der Regel nur von Alfresco-Administratoren verwendet.|
|**Wert einer Eigenschaft setzen**|Wählen Sie eine Eigenschaft aus und geben Sie einen Standardwert ein. Für Dateien mit dieser Eigenschaft wird der eingegebenen Wert verwendet.|
|**Eigenschaften als Metadaten in Inhalt einbetten**|Dateieigenschaften werden direkt als Metadaten in die Binärdatei eingebettet. Anhand der in diesen Dateien enthaltenen Informationen kann gesucht und können Workflows erstellt werden.|

## Verlinkung mit einem vorhandenen Regelsatz {#linking-to-an-existing-rule-set}

Mit der Option **Mit Regelwerk verlinken** können Sie einen bereits für einen anderen Ordner definierten Regelsatz wiederverwenden.

> **Hinweis:** Wenn auf einen Ordner bereits verknüpfte Regeln angewendet wurden (Regeln sind durch das Symbol ![]({% link content-services/images/rules-icon.png %}) gekennzeichnet), können Sie mit neuen Regeln verlinken, indem Sie [mit einem anderen Regelsatz verlinken](#linking-to-a-different-rule-set).

1.  Verschieben Sie den Mauszeiger auf einen Ordner ohne Regeln und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Mit Regelwerk verlinken**.

3.  Suchen Sie den gewünschten Ordner.

    Wählen Sie die Site und dann einen Ordner aus. Prüfen Sie die aufgeführten Regeln, um sicherzustellen, dass Sie mit dem richtigen Ordner verlinken.

    > **Hinweis:** Speicherorte, für die Sie keine Zugriffsberechtigung haben, sind deaktiviert.

4.  Klicken Sie auf **Link**.

    > **Hinweis:** Sie können auf **Regelwerk anzeigen** klicken, um die Details der Regel anzuzeigen, oder auf **Ändern**, um eine andere Regel auszuwählen, mit der Sie verlinken möchten.

5.  Klicken Sie auf **Fertig**.

## Erstellen eines einfachen Workflows {#creating-a-simple-workflow}

Sie können Regeln zum Auslösen eines einfachen Workflows einrichten, der aus Überprüfungs- und Genehmigungsschritten besteht. Wird ein Element einem Ordner hinzugefügt, dem eine Regel dieses Typs zugewiesen ist, stehen dafür zusätzliche Aktionen zur Verfügung.

Sie können die Regel konfigurieren, um die Benutzeraktionen und den Inhaltsfluss zwischen Ordnern festzulegen. Sie können auch einen einfachen Workflow komplexer gestalten, indem Sie Regeln für andere Ordner erstellen und Inhalte von Speicherort zu Speicherort übergeben.

Sie könnten beispielsweise Regeln einrichten, mit denen Sie einen einfachen Workflow zur Verwaltung von Inhalten wie folgt erstellen:

-   Benutzer können dem Ordner **Entwürfe** hinzugefügten Inhalt genehmigen.
-   Nach der Genehmigung wird der Inhalt in den Ordner **Zustimmung anhängig** verschoben.
-   Manager können den Inhalt dieses Ordners genehmigen.
-   Nach der Genehmigung wird der Inhalt in den Ordner **Publiziert** verschoben. Wird der Inhalt abgelehnt, wird er in den Ordner **Entwürfe** zurück verschoben.

> **Hinweis:** Wenn Sie eine Regel für einen Ordner erstellen, wird sie allen Inhaltselementen zugewiesen, die dem Ordner nach der Erstellung der Regel hinzugefügt werden. Auf Inhaltselemente, die sich vor der Erstellung der Regel bereits in dem Ordner befunden haben, hat die Regel keine Auswirkungen. Sie können jedoch mit den Aktionen **Regeln ausführen** sicherstellen, dass die neuen Regeln auf den vorhandenen Inhalt angewendet werden.

1.  Verschieben Sie den Mauszeiger auf einen Ordner ohne Regeln und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Regeln erstellen**.

3.  Geben Sie einen Namen und eine Beschreibung (optional) für die Regel ein.

4.  Legen Sie fest, wann die Regel ausgelöst wird.

    -   **Objekte werden hier erstellt oder hierhin verschoben**: Die Regel wird auf Inhalte angewendet, die diesem Ordner hinzugefügt werden. Dies umfasst alle Elemente, die in den Ordner kopiert oder hochgeladen beziehungsweise in diesem erstellt werden.
    -   **Objekte werden aktualisiert**: Wenn ein Element in diesem Ordner geändert wird, wird die Regel darauf angewendet.
    -   **Objekte werden gelöscht oder aus diesem Ordner verschoben**: Die Regel wird auf Inhalte angewendet, die aus dem Ordner verschoben oder gelöscht werden.
    > **Hinweis:** Eine Regel kann über mehrere Ereignisse, Bedingungen und Aktionen verfügen. Klicken Sie auf **+** oder auf **-**, um Zeilen hinzuzufügen oder zu entfernen.

5.  Wählen Sie aus, ob die Regel angewendet wird, **wenn alle Kriterien erfüllt sind**, **wenn nicht alle Kriterien erfüllt sind** oder in beiden Fällen.

    Nachstehend sehen Sie drei Beispiele für Bedingungen, die zum Auslösen einer Regel angewendet werden könnten:

    -   Die Regel wird angewendet, wenn der Elementtitel das Wort **dringend** enthält (**Wenn alle Kriterien erfüllt sind**).
    -   Die Regel wird angewendet, wenn der Elementtitel nicht das Wort **dringend** enthält (**Wenn nicht alle Kriterien erfüllt sind**).
    -   Die Regel wird angewendet, wenn der Elementtitel das Wort **dringend** enthält, es sei denn, das Element wurde vor einem bestimmten Datum erstellt (**Wenn alle Kriterien erfüllt sind** und **Wenn nicht alle Kriterien erfüllt sind**).
6.  Wählen Sie Kriterien für den Inhalt aus, auf den die Regel angewendet wird, und bedenken Sie dabei, dass Sie mit den Symbolen **+** und **-** zusätzliche Kriterien hinzufügen und entfernen können.

    > **Hinweis:** Wenn Sie im Kriterienmenü die Option **Mehr anzeigen** wählen, stehen Ihnen zusätzliche Eigenschaften zur Auswahl. Verwenden Sie die Ordner auf der Seite **Eigenschaft auswählen**, um nach Eigenschaften zu suchen, und wählen Sie dann rechts auf der Seite eine Eigenschaft aus. Bei Auswahl von **In Menü anzeigen** wird die Eigenschaft in allen Bedingungslisten für die aktuelle Regel angezeigt.

7.  Wählen Sie für die Aktion **Einfachen Workflow hinzufügen**.

8.  Um einen Genehmigungsschritt in den Workflow aufzunehmen, klicken Sie auf **Genehmigen** und geben Sie Details an.

    1.  Geben Sie ein Aktionslabel ein.

        Dieses wird als neue zusätzliche Option angezeigt, die für relevante Inhalte verfügbar ist. Wenn Sie das Label nicht ändern, steht für relevante Elemente in diesem Ordner die neue Option **Genehmigen** zur Verfügung.

    2.  Wählen Sie diese Option, um genehmigte Inhalte zu **kopieren** oder zu **verschieben**, und klicken Sie auf **Auswählen**, um den Zielort für die Aktion festzulegen.

    3.  Klicken Sie auf **OK**.

9.  Um einen Ablehnungsschritt in den Workflow aufzunehmen, aktivieren Sie das Kontrollkästchen, klicken auf **Ablehnen** und geben Details an.

    1.  Geben Sie ein Aktionslabel ein.

        Dieses wird als neue zusätzliche Option angezeigt, die für relevante Inhalte verfügbar ist. Wenn Sie das Label nicht ändern, steht für relevante Elemente in diesem Ordner eine neue Option **Ablehnen** zur Verfügung.

    2.  Wählen Sie diese Option, um abgelehnte Inhalte zu **kopieren** oder zu **verschieben**, und klicken Sie auf **Auswählen**, um den Zielort für die Aktion festzulegen.

    3.  Klicken Sie auf **OK**.

10. Wählen Sie zusätzliche Optionen aus:

    -   **Regel abschalten**: Schalten Sie die Regel aus.
    -   **Regel trifft auf Unterordner zu**: Wenden Sie die Regel auf diesen Ordner und alle dazugehörigen Unterordner an.
    -   **Regel im Hintergrund ausführen**: Ermöglicht es Ihnen, während der Ausführung der Regel weiterzuarbeiten. Sie können auch eine Aktion ausführen, wenn bei der Regel ein Fehler auftritt. Diese Aktionen werden von Ihrem Alfresco-Administrator eingerichtet.
11. Klicken Sie auf **Erstellen** oder **Erstellen und eine weitere erstellen**, um diese Regel zu speichern und mit der Erstellung einer weiteren Regel zu beginnen.

In der **Dokumentenbibliothek** gibt das Symbol ![]({% link content-services/images/im-rules-simpleworkflow.png %}) links neben einem Element an, dass ihm ein einfacher Workflow zugewiesen wurde. Die genehmigten oder abgelehnten Aktionen (mit ihren definierten Labels) werden in der Aktionsliste für diese Elemente angezeigt.

## Arbeiten mit einem Regelsatz {#working-with-a-set-of-rules}

Sie können die einzelnen Regeln, aus denen sich der Regelsatz zusammensetzt, auf einfache Weise anzeigen und pflegen. Sie können Regeln hinzufügen, bearbeiten und löschen, eine Regel deaktivieren und die Ausführungsreihenfolge ändern. Sie können Regeln auch manuell ausführen.

Sie können viele Regeln erstellen, um einen vollständigen Regelsatz zu bilden, und dann mehrere Regeln auf Ordner anwenden.

Wenn Sie die Aktion **Regeln verwalten** für einen Ordner mit definierten Regeln auswählen, ist die Seite **Regeln** in zwei Bereiche geteilt.

Auf der linken Seite werden die Regeln aufgelistet, aus denen sich der Regelsatz zusammensetzt. Wenn der Ordner Regeln von einem übergeordneten Ordner erbt, werden diese Regeln ebenfalls hier angezeigt. Die Regeln werden in der Reihenfolge ausgeführt, in der sie aufgelistet sind. Geerbte Regeln werden immer zuerst ausgeführt.

Ein Häkchen, das links neben der Regel angezeigt wird, weist darauf hin, dass sie aktiviert ist.

Wenn Sie in dieser Liste eine einzelne Regel auswählen, werden die Details auf der rechten Seite angezeigt.

Weitere Informationen über das Lösen von Problemen mit Regeln finden Sie unter [Fehlerbehebung bei Regeln und Aktionen]({% link content-services/5.2/admin/troubleshoot.md %}#troubleshooting-rules-and-actions).

## Hinzufügen zu einem Regelsatz {#adding-to-a-set-of-rules}

Ein Regelsatz kann beliebig viele einzelne Regeln enthalten, und Sie können einem Ordner nach Bedarf neue Regeln hinzufügen.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Neue Regel**.

    Auf der Seite **Neue Regel** können Sie eine neue Regel genauso zu einem Regelsatz hinzufügen wie bei der Erstellung der ersten Regel. Siehe [Erstellen von Regeln](#creating-a-rule).

Nach der Erstellung der letzten Regel kehren Sie zur Seite **Regeln** zurück. Alle neu erstellten Regeln werden am Ende des Regelsatzes hinzugefügt.

## Bearbeiten von Regeln {#editing-a-rule}

Sie müssen Ihre Regeln möglicherweise immer mal wieder überprüfen und einige Änderungen vornehmen, um sie zu aktualisieren. Soll eine bestimmte Regel nicht mehr verwendet werden, wird aber zu einem späteren Zeitpunkt eventuell noch einmal gebraucht, können Sie sie einfach deaktivieren.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie links auf der Seite auf die zu bearbeitende Regel.

    > **Hinweis:** Diese wird in der Regelübersicht rechts auf der Seite angezeigt. Sie können hier keine verlinkten oder geerbten Regeln bearbeiten. Dies muss in den Ordnern erfolgen, in denen sie erstellt wurden.

3.  Klicken Sie auf **Bearbeiten**.

4.  Nehmen Sie Ihre Änderungen vor. Sie können alle Details einer Regel bearbeiten: Name, Beschreibung, Regeldefinition und Optionen.

5.  Klicken Sie auf **Speichern**.

## Löschen von Regeln {#deleting-a-rule}

Ist auf einen Ordner eine Regel angewendet, die Sie nicht mehr benötigen, können Sie diese einzelne Regel löschen.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie links auf der Seite auf die zu löschende Regel.

    Wenn Sie die Regel möglicherweise wiederverwenden möchten, sollten Sie sie stattdessen deaktivieren. Bearbeiten Sie die Regel entsprechend.

    > **Hinweis:** Sie können hier keine verlinkten oder geerbten Regeln löschen. Dies muss in den Ordnern erfolgen, in denen sie erstellt wurden.

3.  Klicken Sie auf **Löschen**.

4.  Wenn Sie aufgefordert werden, den Löschvorgang zu bestätigen, klicken Sie auf **Löschen**.

## Neusortieren der Regeln im Regelsatz {#reordering-the-rules-in-the-rule-set}

Im Rahmen der Verwaltung Ihres Regelsatzes können Sie die Reihenfolge auswählen, in der Regeln ausgeführt werden sollen. Hat Ihr Ordner Regeln geerbt, werden diese immer zuerst in der Reihenfolge ihrer Auflistung ausgeführt. Alle als inaktiv markierten Regeln werden einfach übersprungen.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Verschieben Sie Regeln links auf der Seite mit Drag&Drop an die gewünschte Stelle in der Liste.

    > **Hinweis:** Sie können hier keine verlinkten oder geerbten Regeln neu sortieren. Dies muss in den Ordnern erfolgen, in denen sie erstellt wurden. Klicken Sie auf **Zurücksetzen**, um den Regelsatz auf die letzte gespeicherte Reihenfolge zurückzusetzen.

3.  Klicken Sie auf **Speichern**.

## Abschalten vererbter Regeln {#switching-off-inherited-rules}

Erbt ein Ordner Regeln von einem übergeordneten Ordner, können Sie diese ganz einfach ein- und ausschalten.

Das Ein- und Ausschalten von geerbten Regeln funktioniert auf Ordnerebene und wirkt sich nicht auf weitere Ordner aus.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (durch das Symbol ![]({% link content-services/images/rules-icon.png %}) angegeben) und klicken Sie auf **Regeln verwalten**.

    Verfügt ein Ordner über geerbte Regeln, werden diese links in der Seite angezeigt.

2.  Klicken Sie auf **Regeln erben**.

    Alle geerbten Regeln werden für den Ordner ausgeschaltet und **Regeln nicht erben** wird angezeigt. Sie können auf **Regeln nicht erben** klicken, um die geerbten Regeln für den Ordner wieder einzuschalten.

## Manuelles Ausführen von Regeln {#manually-running-rules}

Wenn Sie einen Regelsatz erstellen oder bearbeiten, werden die Regeln nicht automatisch auf die bereits vorhandenen Ordnerelemente angewendet. Sie können die Regeln jederzeit manuell ausführen, um sie auf alle Inhalte anzuwenden. Dies wirkt sich nur auf die Elemente aus, die die Bedingungen erfüllen.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Regeln ausführen**.

3.  Wählen Sie aus, wie Sie die Regeln ausführen möchten:

    -   **Regeln für diesen Ordner ausführen**
    -   **Regeln für diesen Ordner und seine Unterordner ausführen**
    Eine Meldung erscheint, nachdem die Regeln ausgeführt wurden.

## Arbeiten mit verknüpften Regeln {#working-with-linked-rules}

Wenn ein Ordner über verknüpfte Regeln verfügt, stehen weniger Bearbeitungsoptionen zur Verfügung, als wenn er über einen eigenen Regelsatz verfügt. Sie können entweder eine Verknüpfung zu einem anderen Regelsatz herstellen oder die Verknüpfung vollständig entfernen.

Wenn Sie die Aktion **Regeln verwalten** für einen Ordner mit verknüpften Regeln auswählen, zeigt die Seite **Regeln** den Namen und den Pfad des Ordners an, auf dessen Regelsatz verwiesen wird.

> **Hinweis:** Der Ordner kann auch Regeln von einem übergeordneten Ordner erben. Wenn dies der Fall ist, werden Sie in einer Meldung darüber informiert.

Änderungen am Regelsatz müssen in dem Ordner vorgenommen werden, in dem die Regeln ursprünglich definiert wurden. Sie gelangen ganz einfach zu der Seite **Regeln** für den Quellordner: Klicken Sie einfach auf **Regelwerk anzeigen**.

## Verlinken mit einem anderen Regelsatz {#linking-to-a-different-rule-set}

Möchten Sie die Regeln ändern, mit denen ein Link besteht, können Sie ganz einfach eine Verlinkung mit einem anderen Regelsatz herstellen.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Ändern**.

    > **Hinweis:** Diese Option wird nur dann angezeigt, wenn Regeln mit dem Ordner verlinkt sind.

3.  Wählen Sie die Site und dann einen Ordner aus.

    Sie können nur Speicherorte auswählen, auf die Sie Zugriff haben.

4.  Klicken Sie auf **Link**.

    Damit wird der Link mit dem ursprünglichen Regelsatz aufgehoben und ein Link zum neuen Regelsatz hergestellt.

5.  Klicken Sie auf **Fertig**.

## Aufheben des Links mit einem Regelsatz {#breaking-the-link-to-a-rule-set}

Falls Sie Ihre Regeln nicht mehr benötigen, können Sie den Link mit einem einzigen Mausklick aufheben. Damit entfernen Sie alle Regeln für dem Ordner.

1.  Bewegen Sie den Mauszeiger auf einen Ordner mit Regeln (gekennzeichnet mit dem Symbol ![]({% link content-services/images/rules-icon.png %}) und klicken Sie auf **Mehr** und dann auf **Regeln verwalten**.

2.  Klicken Sie auf **Verlinkung aufheben**.

    > **Hinweis:** Diese Option wird nur dann angezeigt, wenn Regeln mit dem Ordner verlinkt sind.

    Der Link zwischen dem aktuellen Ordner und den verlinkten Regeln ist nun aufgehoben.
