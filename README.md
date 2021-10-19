# `This project is very old and not maintained for a long time. So expect a very pure code quality, outdated dependencies and security issues.`

# Towns frontend

* * *

## Organization

https://trello.com/townsgame

https://trello.com/b/d2b6mY6s/frontend

* * *

## Authors of frontend

**[PH] Pavol Hejný:** http://pavolhejny.com

**[SK] Stefan Kecskes:** https://www.skey.uk

**[MP] Matúš Petrofčík** https://www.facebook.com/puchal



* * *

## Folder Structure


	[towns5]/                   <- root adresár
	├── [api]/
	│   ├── fakeserver.php      <- momentálne php script vracia len fake object.json
	│   └──                     <- Budúci Node.js api - do té doby budeme využívat Towns4 API
	├── [app]/                  <- Vyvojove prostredie
	│   ├── //todo
	│   └── index.php           <- samotné towns HTML
	├── [app]/      			<- build
	├── [config]/               <- Konfiguračné súbory
	│   ├── app.json            <- hlavné nastavenie aplikácie
	│   └── includes.json       <- Soubory, ze kterých se vytvoři build
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

	
5. Create directory cache with mod 0777


6. Create directory or symlink with project towns-shared in root


7. Run gulp!


	gulp
	
* * *	

## Deploy

1) Pull repository

2) In config/app.json should be "environment": "production"
	
3) Directory cache and messages should have mod 0777
	
4) Install npm packeges

	npm install
	
//5) todo tests
	
	
6) Build app

	gulp production
	
	

## Testovanie

Testovanie JsHint Gulpom (Ukáže syntaxové chyby v javascriptových knižniciach)

	gulp hint
	
//todo: implementovat aspoň unit testing a behaviour testing. (TDD) + automatické testovanie po každom commite.
	


## Text a kódování


Všechny soubor jsou v UTF-8 a jako oddělovač řádků používat \n


## Dokumentace

Psát poznámky a dokumentovat pomocí JSDoc a PhpDocumentator
