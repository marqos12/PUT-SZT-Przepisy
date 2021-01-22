# SZT-Przepisy - projekt zaliczeniowy z przedmiotu systemy Zarządzania treścią

Aplikacja dostępna jest pod adresem http://51.68.225.24:9080

Projekt został utworzony z wykorzystaniem Spring Framework oraz Angular 11. 
Do działania wymaga połączenia z zewnętrzną bazą danych, środowiska Java 8 lub wyżej oraz pakietu NodeJS.


## Uruchamianie 
Aby uruchomić projekt Spring, należy w głównym katalogu projektu uruchomić polecenie
```
mvnw spring-boot:run
```

Aby uruchomić projekt Angular należy w katalogu src\main\ts uruchomić polecenia
```
npm install
npm start
```

Domyślnie projekt Spring pracuje na porcie :8080, natomiast Agular na porcie :4200.

Istnieje możliwosć zbudowania aplikacji do postaci .jar. Uruchomione w ten sposób aplikacje będą działać jako jedna na tym samym porcie.
