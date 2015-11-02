# Towns 5

* * *

## Organizace vývoje

 Na stránce https://trello.com/townsgame jsou projekty které v ránci Towns řešíme. Káždá tabule začínacící na / nebo ./ je 1 projekt. Projekt začínající na ./ je aktuální projekt začínající s / budoucí. V každém projektu je několik základních informací o projektu v podobě speciálních tagů ("text: ..." = popis projektu, "startx 2.2016" = měsíc/rok kdy je plánováno s projektem začít, "start 4.2015" kdy projekt začal , "author: MP" = autor podílející se na projektu (může jich být více) , "private" = nebude se zobrazovat veřejně , "inbox" = pod tuto kartu budou padat nápady z webu) tyto informace se automaticky exportují na veřejnou stránku projektů na http://projects.towns.cz/ . Pod každým projektem je kromě základních tagů sloupec s nápady, co bychom mohli dělat, vybrané nápady na kterých se má pracovat, aktuální práce a co je hotovo a čeká na otestování.

* * *

## Autoři

**[PH] Pavol Hejný:** https://www.facebook.com/hejny

**[MP] Matúš Petrofčík** https://www.facebook.com/puchal

**[SK] Stefan Kecskes:** https://www.skey.uk

**Přemysl Černý:** https://www.facebook.com/longhorn86

**[DH] David Hrůša:** https://www.facebook.com/dhrusa



* * *

## Struktura


Nové Towns 5:


	[towns5]/                   <- root adresár
	├── [api]/
	│   ├── fakeserver.php      <- momentálne php script vracia len fake object.json
	│   └──                     <- Budúci Node.js api - do té doby budeme využívat Towns4 API
	├── [app]/                  <- Vyvojove prostredie
	│   ├── [cofeehtml]/        <- coffeescripty
	│   ├── [css]/              <- naše štýly (nie css z knižníc)
	│   ├── [css-lib]/          <- štýly z knižníc (nie naše css)	
	│   ├── [graphic]/          <- obrázky generované cez PHP
	│   ├── [js]/               <- naše javascripty (nie knižnice)
	│   ├── [js-lib]/           <- js knižnice (nie naše scripty!!!) (některé ale náma upravené) TODO: [SK]@[PH]: o tomto musime hodit rec. 
	│   ├── [locale]/           <- jazykové lokalizácie
	│   ├── [tdd]/              <- 
	│   └── index.php           <- samotné towns HTML
	├── [config]/               <- Konfiguračné súbory
	│   └── app.json            <- hlavné nastavenie aplikácie
	├── [public]/               <- Produkčné súbory vygenerované gulpom     
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


* * *

## Inštalácia


1. Potřeba vytvořit vlastní local doménu pro projekt např. towns.local

    Linux: http://tecadmin.net/create-virtual-hosts-in-apache-on-ubuntu/
    Windows: http://ccm.net/faq/8485-configuring-apache-and-windows-to-create-a-virtual-host
    

2. Nainštaluj si node.js a npm(node package manager)


	sudo apt-get install nodejs npm
	
3. Nainštaluj si gulp cez npm (možeš aj globálne)  


	sudo apt-get install --global gulp

4. Stiahni si balíky potrebné pre tento projekt (zadefinované v package.json)


	npm install


5. Spusť gulp, nech vykoná úlohy v gulpfile.json. 


	gulp

	
Produkčný build bude v adresári `/app-dist`
	
* * *	
	
## Testovanie

Testovanie JsHint Gulpom (Ukáže syntaxové chyby v javascriptových knižniciach)

	gulp lint
	
//todo: implementovat aspoň unit testing a behaviour testing. (TDD) + automatické testovanie po každom commite.
	

* * *

## Commity

Každý commit by měl mít označení projektu + autora např.: [WorldLayer][PH] Změny v minimenu


* * *

## Soubory

Všechny soubory + databáze je v UTF-8 a jako oddělovač řádků používat \n

Psát poznámky a dokumentovat pomocí JSDoc a PhpDocumentator