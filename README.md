# TOWNS 5

 Verze Towns 5

* * *

## Kontakt

**Organizace vývoje:** https://trello.com/townsgame

**Mail:** ph@towns.cz

* * *

## Štruktúra

Systém je rozdělený na několik částí: 

Staré Towns 4:

	[towns4]/                   <- root adresár
	├── [app]/
	│   ├── Soubory Administrace
	│   ├── Editory
	│   └── Další pomocné aplikace ...
	├── [core]/
	│   └── Aktuální verze aplikace, systému a administrace
	├── [image]/
	│   └── Všechny obrázky
	├── [lib]/
	│   ├── knihovny
	│   ├── jquery
	│   └── PHP
	├── [tmp]/
	│   ├── předgenerované soubory. Sem se ukládají předgenerované obrázky budov, mapy, místa možné registrace…    
	│   ├── Pokud se tato složka smaže nic se nestane, jen je systém bude chvíli pomalejší, neý se soubory stihnou znovu vytvořit.
	│   └── Kvůli rychlosti doporučuju tuto složku dát na SSD disk. (v Linuxu např. pomocí symlinku)
	├── index.php               <- Inicializační soubor
	├── favicon.ico             <- Ikonka
	└── .htaccess               <- Konfigurační soubor pro Apache


Nové Towns 5:


	[towns5]/                   <- root adresár
	├── [api]/
	│   ├── fakeserver.php      <- momentálne php script vracia len fake object.json
	│   └──                     <- Budúci Node.js api
	├── [app]/
	│	├── [lib]/
	│	│   ├── [cofeehtml]/    <- coffeescripty
	│	│   ├── [css]/
	│	│   ├── [graphic]/      <- obrázky generované cez PHP
	│	│   ├── [js]/           <- naše javascripty (nie knižnice)
	│	│   ├── [lib]/          <- js knižnice (nie naše scripty)
	│	│   ├── [locale]/       <- jazykové lokalizácie
	│	│   └── index.html      <- samotné towns HTML
	├── [media]/
	│   ├── [image]/            <- Všechny obrázky
    │   └── [sound]/            <- Všechny zvuky
	├── [node_modules]/         <- knižnice stiahnuté cez npm
    │   └── [...]/              <- každá knižnica vo vlastnom adresári
	├── favicon.ico             <- Ikonka
	├── gulpfile.js             <- zoznam úloh pre gulp compiler
	├── index.php               <- Inicializační soubor
	├── package.json            <- zoznam potrebných npm balíkov
	└── README.md               <- pár múdrých slov

* * *

## Požadavky

- Počítač

* * *

## Inštalácia

Nainštaluj si node.js a npm(node package manager)

	sudo apt-get install nodejs npm
	
Nainštaluj si gulp cez npm (možeš aj globálne)  

	sudo apt-get install --global gulp

Stiahni si balíky potrebné pre tento projekt (zadefinované v package.json)

	npm install
	
Spusť gulp, nech vykoná úlohy v gulpfile.json

	gulp
	
* * *	
	
## Testovanie

//todo: implementovat aspoň unit testing a behaviour testing. (TDD) + automatické testovanie po každom commite.
	
* * *

## Autoři

**[PH] Pavol Hejný:** https://www.facebook.com/hejny

**[MP] Matúš Petrofčík** https://www.facebook.com/puchal

**[DH] David Hrůša:** https://www.facebook.com/dhrusa

**Přemysl Černý:** https://www.facebook.com/longhorn86

**[SK] Stefan Kecskes:** https://www.skey.uk

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