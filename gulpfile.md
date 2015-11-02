#Gulp

Gulp ma primárne za úlohu pripraviť build, teda všetky súbory pre aplikáciu. Gulp taktiež zistí z konfiguračného súboru automaticky, aký build ma vyrobiť. Defaultne sa spúšťa jednoducho:


	gulp default
	// alebo len
	gulp
 
V tomto formáte sa spustí defaultná úloha. V prípade že chcete konkrétny build:
- pre prípravu developerského prostredia


	gulp develop


- Pre prípravu produkčného buildu spusť


	gulp production
	

- pre testovanie naších scriptov v app/js spusť

Testovanie JsHint Gulpom (Ukáže syntaxové chyby v javascriptových knižniciach)

	gulp lint
	
## Schéma úloh v gulpfile


		[default]                           <- default úloha rozhodne ktorý build spustiť
    	├─> [develop]                       <- develop build má 2 úlohy
    	│   ├─> [develop-clean]             <- vyčisti adresár pre develop build
    	│   └─> [develop-build]             <- vytvor develop build
    	│       ├─> [develop-index]    	    <- html súbory
    	│       ├─> [develop-scripts]    	<- priprav js knižnice
    	│       ├─> [develop-styles]        <- priprav css knižnice
    	│       ├─> [develop-fonts]         <- priprav súbory fontov
    	│       ├─> //[develop-images]    	<- priprav obrázky
    	│       ├─> //[develop-sound]    	<- priprav zvuky  	    	    	    	
    	│       ├─────────────────────  	<- ked skončí build spusť watch    	    	
    	│       └─> [develop-watch]    	    <- sleduj zmeny, a spusť develop build úlohy podľa potreby	
    	├─> [test]                          <- Testovanie gulpom, zatiaľ len jshint syntaxové chyby
    	├─> [documentation]                 <- Vytvor dokumentáciu pre js scripty
    	└─> [production]                    <- production build má 2 úlohy
    	    ├─> [production-clean]          <- Vyčisti adresár pre production build
    	    └─> [production-build]          <- Vytvor production build
    	        ├─> [production-index]    	<- html súbory
    	        ├─> [production-scripts]    <- priprav js knižnice   	
    	        ├─> [production-styles]     <- priprav css knižnice
    	        ├─> [production-fonts]      <- priprav súbory fontov
    	        ├─> //[production-images]   <- priprav obrázky
    	        └─> //[production-sound]    <- priprav zvuky