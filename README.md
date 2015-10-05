## TOWNS 4

 Verze Towns 4

* * *
### Kontakt

**Organizace vývoje:** https://trello.com/townsgame

**Mail:** ph@towns.cz

* * *
### Struktura

Systém je rozdělený na několik částí: 


**app** Soubory Administrace, Editory, Další  pomocné aplikace 

**core** Aktuální verze aplikace, systému a administrace

**image** Všechny obrázky

**lib** Knihovny: JQuery, PHP

**tmp**

předgenerované soubory. Sem se ukládají předgenerované obrázky budov, mapy, místa možné registrace…

Pokud se tato složka smaže nic se nestane, jen je systém bude chvíli pomalejší, neý se soubory stihnou znovu vytvořit.

Kvůli rychlosti doporučuju tuto složku dát na SSD disk. (v Linuxu např. pomocí symlinku)

**index.php** Inicializační soubor

**favicon.ico** Ikonka

**.htaccess** Konfigurační soubor pro Apache

* * *
### Požadavky


* * *
### Autoři

**[PH] Pavol Hejný:** https://www.facebook.com/hejny

**[MP] Matúš Petrofčík** https://www.facebook.com/puchal

**[DH] David Hrůša:** https://www.facebook.com/dhrusa

**Přemysl Černý:** https://www.facebook.com/longhorn86


Další se připište!

* * *
### Struktura Databáze

Je definovaná v core/create.sql. V Towns4Admin je automatický nástroj pro její aktualizaci. Tzn. strukturu změníte v souboru a podle něj bude automaticky přetvořena tabulka v databázi.

* * *
### Commity

Každý commit by měl mít označení projektu + autora např.: [WorldLayer][PH] Změny v minimenu


* * *
### Soubory

Všechny soubory + databáze je v UTF-8 a jako oddělovač řádků používat \n

Psát poznámky a dokumentovat pomocí PhpDocumentator