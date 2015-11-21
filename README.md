# Towns 5

* * *

## Organizace vývoje

 Na stránce https://trello.com/townsgame jsou projekty které v ránci Towns řešíme. Káždá tabule začínacící na / nebo ./ je 1 projekt. Projekt začínající na ./ je aktuální projekt začínající s / budoucí. V každém projektu je několik základních informací o projektu v podobě speciálních tagů ("text: ..." = popis projektu, "startx 2.2016" = měsíc/rok kdy je plánováno s projektem začít, "start 4.2015" kdy projekt začal , "author: MP" = autor podílející se na projektu (může jich být více) , "private" = nebude se zobrazovat veřejně , "inbox" = pod tuto kartu budou padat nápady z webu) tyto informace se automaticky exportují na veřejnou stránku projektů na http://projects.towns.cz/ . Pod každým projektem je kromě základních tagů sloupec s nápady, co bychom mohli dělat, vybrané nápady na kterých se má pracovat, aktuální práce a co je hotovo a čeká na otestování.

* * *

## Autoři

**[PH] Pavol Hejný:** https://www.facebook.com/hejny

**[SK] Stefan Kecskes:** https://www.skey.uk

**[MP] Matúš Petrofčík** https://www.facebook.com/puchal

**[DH] David Hrůša:** https://www.facebook.com/dhrusa

**Přemysl Černý:** https://www.facebook.com/longhorn86



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
	│   ├── [fonts]/            <- fonty z knižníc (tiež cez gulp)		
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

## Installation


1. You have to create own virtual domain towns.local

    Linux: http://tecadmin.net/create-virtual-hosts-in-apache-on-ubuntu/
    Windows: http://ccm.net/faq/8485-configuring-apache-and-windows-to-create-a-virtual-host
    

2. Install node.js & npm (node package manager)


	sudo apt-get install nodejs npm
	
	
	
3. Install gulp via NPM (you can also globally)  


	sudo apt-get install --global gulp


4. You have to download and install all dependencies 


	npm install


5. Run gulp!


	gulp

	
6. Production build is in directory `/app-dist`
	
* * *	
	
## Testovanie

Testovanie JsHint Gulpom (Ukáže syntaxové chyby v javascriptových knižniciach)

	gulp hint
	
//todo: implementovat aspoň unit testing a behaviour testing. (TDD) + automatické testovanie po každom commite.
	

* * *

## Konvence


### Commit

Každý commit by měl mít označení [projektu][autora] Název kartičky v Trellu / Co jsem udělal

např.: [WorldLayer][PH] Refaktoring / vytvoření statického objektu Model 


## File names

**.class.js** - todo description

**.action** - todo description

**.tools** - todo description

**.page** - todo description

**.menu** - todo description

**.events** - todo description

**.draw** - todo description

**.init** - todo description

**.ctl.init** - todo description




## Text a kódování


Všechny soubor jsou v UTF-8 a jako oddělovač řádků používat \n


## Dokumentace

Psát poznámky a dokumentovat pomocí JSDoc a PhpDocumentator