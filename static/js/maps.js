var markersLima = [];
var markersArequipa = [];
var markersPuno = [];
var markersCusco = [];

var routeCusco;

var watchID;

function initMap(){

// styling maps - generated with https://mapstyle.withgoogle.com/
    var generalStyles = [
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

//options per map
    var optionsLima = {
        zoom: 13,
        center: {lat:-12.122026,lng:-77.030747},
        mapTypeControl: false,
        scaleControl: true,
        styles: generalStyles
    };

    var optionsPuno = {
        zoom: 12,
        center: {lat:-15.840693,lng:-70.027999},
        mapTypeControl: false,
        scaleControl: true,
        styles: generalStyles
    };

    var optionsArequipa = {
        zoom: 16,
        center: {lat:-16.398803,lng:-71.536916},
        mapTypeControl: false,
        scaleControl: true,
        styles: generalStyles
    };

    var optionsCusco = {
        zoom: 16,
        center: {lat:-13.516706,lng:-71.978814},
        mapTypeControl: false,
        scaleControl: true,
        styles: generalStyles
    };

//place the map on HTML-page
    var mapLima = new google.maps.Map(document.getElementById("lima-map"), optionsLima);
    var mapPuno = new google.maps.Map(document.getElementById("puno-map"), optionsPuno);
    var mapArequipa = new google.maps.Map(document.getElementById("arequipa-map"), optionsArequipa);
    var mapCusco = new google.maps.Map(document.getElementById("cusco-map"), optionsCusco);

//create icons
    var camera = "https://img.icons8.com/color/24/000000/old-time-camera.png";
    var hotel = "https://img.icons8.com/color/24/000000/hotel-information.png";
    var restaurant = "https://img.icons8.com/color/24/000000/dining-room.png";
    var airport = "https://img.icons8.com/color/30/000000/airplane-take-off.png";
    var bank = "https://img.icons8.com/color/24/000000/euro-pound-exchange.png";
    var bus = "https://img.icons8.com/color/24/000000/bus.png";
    var hospital = "https://img.icons8.com/color/24/000000/clinic.png";
    var police = "https://img.icons8.com/color/24/000000/policeman-male.png";

//markers
    var locationsLima = [
        ['<h5>Larcomar</h5><p>Winkelcentrum Larcomeer ligt op een hoge klif uitkijkend op de Stille Oceaan, en in het hartje van Miraflores, het zaken- en toeristencentrum van Lima. Goed voor een ontspannen middagje voor of na uw internationale vlucht, met een hapje, drankje en een schitterend zicht op de oceaan.</p><img src="/media/naturandes/lima-larcomar.jpg" width="100%" alt="Lima, Larco Mar">', -12.131914, -77.030532, camera],
        ['<h5>Barranco</h5><p>De bohemien-wijk van Lima ligt ook aan de kust en is een verademing met de drukke overige wijken. Met leuke uitgaansgelegenheden, goede (vis)restaurants en het strand nabij, is dit voor ons de leukste buurt om in Lima te verblijven.</p><img src="/media/naturandes/lima-barranco.jpg" width="100%" alt="Lima, plaza Barranco">', -12.149549, -77.021126, camera],
        ['<h5>Museo Larco</h5><p>Van de vele musea in Lima is dit onze favoriet. Men biedt een indrukwekkende verzameling pre-koloniale kunst, niet alleen van de Incas maar ook van andere, oudere inheemse culturen zoals de Moche en de Chimú. Bij het restaurantmuseum kunt u ook prima lunchen.</p><img src="/media/naturandes/lima-museo-larco.jpg" width="100%" alt="Museo Larco, Lima">', -12.072490, -77.070848, camera],
        ['<h5>Plaza Mayor</h5><p>Het koloniale centrum van Lima staat op de Werelderfgoedlijst. Hier vindt u bijvoorbeeld het congresgebouw, maar ook het klooster van Santa Catalina, met lugubere catacomben. Overdag wandelt u hier veilig rond, maar ’s avonds wordt de sfeer in het stadshart van Lima grimmig. Vandaar ook dat u hier niet zult logeren.</p><img src="/media/naturandes/lima-plaza.jpg" width="100%" alt="congresgebouw, Lima">', -12.045846, -77.030535, camera],
        ['<h5>Casa Wayra</h5><p><strong>€</strong><br>13 kamers, Amerikaans ontbijt, perfecte locatie, prijsvechter, rustige binnentuin<br><a href="https://www.casawayra.com" target="_blank">website</a><br><br><em>Fantastisch gelegen in de toeristenwijk van Lima, zeer geprijsd en met een zonnige, rustige binnentuin. Deze bed-en-breakfast biedt geen luxe, maar alle basisvoorzieningen zijn aanwezig. </em></p><img src="/media/naturandes/lima-hotel-casawayra.jpg" width="100%" alt="Casa Wayra, Lima">', -12.129707, -77.025206, hotel],
        ['<h5>Mariel Hotel</h5><p><strong>€€</strong><br>54 kamers, ontbijtbuffet, goede locatie, schoon, goede prijs<br><a href="https://www.mariel-hotel.com/" target="_blank">website</a><br><br><em>Eveneens goed gelegen in Miraflores, is dit hotel schoon, strak en van alle gemakken voorzien. Het is wel wat onpersoonlijk en klinisch naar onze smaak, en het mist wat eigens en karakter. Hoe dan ook een prima uitvalsbasis voor uw dagen in Lima.</em></p><img src="/media/naturandes/lima-hotel-mariel.jpg" width="100%" alt="Hotel Mariel, Lima">', -12.117951, -77.027370, hotel],
        ['<h5>Second Home</h5><p><strong>€€€</strong><br>8 kamers, ontbijtbuffet, restaurant, fantastische ligging, zeer goede service<br><a href="http://www.secondhomeperu.com/" target="_blank">website</a><br><br><em>Perfect gelegen in Barranco, de leukste wijk van Lima. De kamers zijn mooi, ruim en schoon. Het ontbijtbuffet is prima, en u zit heerlijk in de tuin met uitzicht op de oceaan. Een erg goede keuze als u net wat meer te besteden heeft.</em></p><img src="/media/naturandes/lima-hotel-secondhome.jpg" width="100%" alt="Hotel Second Home, Lima">', -12.148315, -77.023623, hotel],
        ['<h5>Atemporal</h5><p><strong>€</strong>€€€<br>9 kamers, ontbijtbuffet, stijlvol, rustige ligging, fantastische service<br><a href="https://www.atemporal.pe/" target="_blank">website</a><br><br><em>Atemporal bestaat nog maar kort. Gelegen in een rustige residentiële wijk van Lima, biedt dit hotel een unieke persoonlijke service. De kamers zijn niet minder mooi dan die van grote, luxe hotelketens, maar de ervaring is zoveel rijker!</em></p><img src="/media/naturandes/lima-hotel-atemporal.jpg" width="100%" alt="Hotel Atemporal, Lima">', -12.108581, -77.034365, hotel],
        ['<h5>Mangos</h5><p><strong>€€</strong><br><a href="http://mangosperu.com/" target="_blank">website</a><br><em>Gelegen in Larcomar, met een schitterend uitzicht op de oceaan, biedt Mangos een zeer goed buffet. Dé manier om ineens veel te proeven van de vermaarde Peruaanse keuken, die een enorme verscheidenheid aan gerechten biedt!</em></p>', -12.132053, -77.030503, restaurant],
        ['<h5>El Muelle</h5><p><strong>€</strong><br><a href="https://www.facebook.com/ElMuelleDeBarranco/" target="_blank">website</a><br><em>Een sympathiek visrestaurant met verrukkelijk verse visgerechten en een grote verscheidenheid aan keuze. U kunt hier niet reserveren en ’s middags zit het stampvol met lokale clientèle. Ook wij gaan er altijd even eten als we in Lima zijn. Dat zegt genoeg!</em></p>', -12.147090, -77.022693, restaurant],
        ['<h5>Astrid y Gastón</h5><p><strong>€€€</strong><br><a href="http://www.astridygaston.com/" target="_blank">website</a><br><em>Gastón Acurio is de bekendste kok van Peru en zijn restaurant Astrid y Gastón werd in 2015 uitgeroepen tot beste van Latijns-Amerika. Net als Central is ook dit restaurant doorgaans maanden van tevoren volgeboekt. Wij helpen u graag reserveren!</em></p>', -12.096534, -77.034960, restaurant],
        ['<h5>Restaurante Central</h5><p><strong>€€€</strong><br><a href="https://centralrestaurante.com.pe/en/" target="_blank">website</a><br><em>Central Restaurante werd van 2014 t/m 2016 uitgeroepen tot beste restaurant in Latijns-Amerika en schommelde in de Werelds beste 50 Restaurants de afgelopen 4 jaar tussen plaats 4 en 6. Omschreven als hedendaags Peruaans, is dit restaurant meestal al maanden van tevoren volgeboekt. Wij helpen u graag reserveren!</em></p>', -12.152808, -77.022521, restaurant],
        ['<h5>Aeropuerto Internacional Jorge Chávez</h5><p>De wijken rond de luchthaven van Lima zijn allesbehalve veili. Hier bieden we dan ook geen hotels aan. U logeert in Miraflores of Barranco, op ongeveer een uur rijden van de luchthaven. Transfers zijn in al onze reizen inclusief.</p>', -12.024158, -77.111939, airport],
        ['<h5>Bank BCP Miraflores</h5><p>Bij de BCP (Banco de Crédito de Perú) kunt u meer dan bij andere banken pinnen, en betaalt u daarnaast ook nog eens de minste commissie. De pinautomaten worden bovendien in de gaten gehouden door veiligheidspersoneel.</p>', -12.128517, -77.029475, bank],
        ['<h5>Bank BCP Barranco</h5><p>Bij de BCP (Banco de Crédito de Perú) kunt u meer dan bij andere banken pinnen, en betaalt u daarnaast ook nog eens de minste commissie. De pinautomaten worden bovendien in de gaten gehouden door veiligheidspersoneel.</p>', -12.145926, -77.021871, bank],
        ['<h5>Clínica Pardo</h5><p>Van de vele privé-klinieken in Lima is Clínica Ricardo Palma uw beste keuze. Men heeft veel specialisten in dienst, en Engels-sprekende artsen. Soms ontvangt u onnodig veel examens en behandelingen: men weet dat u goed verzekerd bent. Voelt u zich ziek, raden we u ook daarom aan ons te bellen op ons noodnummer.</p>', -12.090657, -77.018122, hospital],
        ['<h5>toeristenpolitie</h5><p>Houdt er rekening mee dat u niet altijd netjes behandeld wordt door de toeristenpolitie en da men zelden goed Engels spreekt. Indien nodig, is het altijd beter ons te bellen op ons noodnummer. Wij kunnen voor u bemiddelen.</p>', -12.095447, -77.068782, police]
    ];

    var locationsPuno = [
        ['<h5>Plaza de Armas</h5><p>In het centrum van Puno is vrijwel altijd wat te doen. Ook wel de folkloristische hoofdstad van Peru genoemd, staat Puno vooral bekend om het festival “Virgen de la Candelaria”, dat bezoekers uit de hele wereld trekt. Maar ook de rest van het jaar zijn er veel processies en optochten met dans en muziek. Hart van de festiviteiten is het stadsplein.</p><img src="/media/naturandes/puno-plaza.jpg" width="100%" alt="Plaza de Armas, Puno">', -15.840693, -70.027999, camera],
        ['<h5>Uros-eilanden</h5><p>De Uros vormden een oude stam die zich probeerde te isoleren van oorlogszuchtige buren. Ze trokken het Titicacameer op en bouwden drijvende eilanden van totora-riet om op te wonen. Vandaag de dag leven er nog steeds enkele honderden leden van de Uros-stamop de eilanden, waar huizen, wachttorens, kerken en boten gemaakt zijn van riet. </p><img src="/media/naturandes/puno-uros.jpg" width="100%" alt="Plaza de Armas, Puno">', -15.819134, -69.970587, camera],
        ['<h5>Taquile</h5><p>Prachtig vergezichten over het Titicacameer treft u op Taquile. Dit eiland staat bekend om haar traditionele textielarbeid. Mannen lopen hier met breinaalden rond en vrouwen weven kleurrijke kledij, waaruit hun sociale status blijkt. Men leeft nog op een traditionele manier, zonder gemotoriseerd transport of elektriciteit.</p><img src="/media/naturandes/puno-taquile.jpg" width="100%" alt="Plaza de Armas, Puno">', -15.772094, -69.683186, camera],
        ['<h5>Sillustani</h5><p>Op een landtong met een fantastisch zicht op het er omheen liggende Umayomeer (3890 meter; kijk of je flamingo’s ziet!) rijzen majestueuze graftorens op. De Colla’s en later de Inca’s begroeven hun adel in deze cilindervormige torens. Bij zich hadden ze voedsel en werktuigen, nodig voor na hun wedergeboorte. Daarom werden de mummies altijd in een foetushouding geplaatst.</p><img src="/media/naturandes/puno-sillustani.jpg" width="100%" alt="Plaza de Armas, Puno">', -15.721365, -70.158965, camera],
        ['<h5>Hotel Intiqa</h5><p><strong>€</strong><br>31 kamers, ontbijtbuffet, restaurant, centraal gelegen, gunstig geprijsd<br><a href="http://intiqahotel.com/en/" target="_blank">website</a><br><br><em>Erg mooie kamers voor een wel heel goede prijs. De centrale locatie en een  goed ontbijt maken dat dit hotel een prima keuze is, ondanks de soms wat minder voorkomende medewerkers.</em></p><img src="/media/naturandes/puno-hotel-intiqa.jpg" width="100%" alt="Hotel Intiqa, Puno">', -15.838197, -70.029154, hotel],
        ['<h5>La Hacienda Plaza de Armas</h5><p><strong>€€</strong><br>28 kamers, Amerikaans ontbijt, zeer centraal gelegen, balkon, gunstig geprijsd<br><a href="https://www.hhp.com.pe/hotels.html" target="_blank">website</a><br><br><em>Het sterke punt van dit hotel is de zeer centrale ligging. Vanaf uw balkon kijkt u uit over de Plaza de Armas, het stadsplein van Puno. Daarnaast zijn de mooie kamers gunstig geprijsd. Het ontbijt valt wat tegen: het is geen buffet en weinig gevarieerd.</em></p><img src="/media/naturandes/puno-hotel-hacienda.jpg" width="100%" alt="Hotel La Hacienda Plaza de Armas, Puno">', -15.840855, -70.027775, hotel],
        ['<h5>Casa Andina Premium Lago</h5><p><strong>€€€</strong><br>45 kamers, ontbijtbuffet, restaurant, room service, tuin, 10 minuten buiten Puno aan oever Titicacameer<br><a href="https://www.casa-andina.com/destinos/puno/hotel-puno-peru_casa-andina-premium/" target="_blank">website</a><br><br><em>Hotelketen Casa Andina heeft bijna dezelfde karakteristieken als hotel Sonesta en ligt daar ook in de buurt. De hotels van Casa Andina zijn net wat klinischer als hotel Sonesta, maar men heeft vaak wel gunstige aanbiedingen.</em></p><img src="/media/naturandes/puno-hotel-andina.jpg" width="100%" alt="Casa Andina Premium Lago, Puno">', -15.823624, -69.997047, hotel],
        ['<h5>Sonesta Posada del Inca</h5><p><strong>€€€</strong><br>70 kamers, ontbijtbuffet, restaurant, room service, tuin, 10 minuten buiten Puno aan oever Titicacameer<br><a href="https://www.sonesta.com/pe/puno/sonesta-posadas-del-inca-lake-titicaca-puno" target="_blank">website</a><br><br><em>Sonesta Posada del Inca ligt op een schitterende locatie aan het Titicacameer, buiten het lawaaiige Puno. Het is een goede optie als u een wat ruimer budget heeft: ruime kamers met uitzicht op het meer, prima service, en een mooie, relaxte tuin. Keerzijde is dat u altijd vervoer naar en van Puno zult moeten regelen, al bemiddelt het hotel hierin.</em></p><img src="/media/naturandes/puno-hotel-sonesta.jpg" width="100%" alt="Sonesta Posada del Inca, Puno">', -15.824120, -70.004887, hotel],
        ['<h5>Mojsa</h5><p><strong>€€</strong><br><a href="http://www.mojsarestaurant.com" target="_blank">website</a><br><em>In Puno zijn we persoonlijk wat minder enthousiast over de restaurants. Uitzondering is Mojsa,  waar u voortreffelijke maaltijden kunt krijgen, inclusief de fameuze cuy (cavia). Dit restaurant zit altijd vol en wij weten waarom! </em></p>', -15.840359, -70.027664, restaurant],
        ['<h5>Tradiciones del Lago</h5><p><strong>€</strong><br><a href="https://www.facebook.com/Restaurant-Tradiciones-del-Lago-229204607251490/" target="_blank">website</a><br><em>Tradiciones del Lago is goed voor vis- en vleesgerechten. Het is wel een typisch toeristisch restaurant en het ontbreekt er wat aan een eigen karakter en sfeer.</em></p>', -15.839146, -70.028048, restaurant],
        ['<h5>Giorgio</h5><p><strong>€</strong><br><a href="http://www.restaurantegiorgio.com" target="_blank">website</a><br><em>Giorgio is iets duurder dan het nabijgelegen Tradiciones del Lago, maar een goede keuze en een leuke ambiance. De pizzas zijn een uitzondering hierop - wij suggereren deze niet te bestellen....</em></p>', -15.839276 , -70.028004, restaurant],
        ['<h5>La Table del Inca</h5><p><strong>€€</strong><br><a href="https://facebook.com/latabledelinca/" target="_blank">website</a><br><em>Wij hebben er zelf nog niet gegeten, maar de evaluaties van onze klanten zijn zeer lovend. Samen met Mojsa lijkt dit de beste keuze voor een excellent diner in Puno.</em></p>', -15.841964, -70.028396, restaurant],
        ['<h5>busterminal Cruz del Sur</h5><p>Veiligheidshalve werken wij uitsluitend met de lange afstandsbussen van Cruz del Sur. Dit is de meest aangeraden, veiligste en betrouwbaarste maatschappij van Peru. </p>', -15.843589, -70.017256, bus],
        ['<h5>Bank BCP</h5><p>Bij de BCP (Banco de Crédito de Perú) kunt u meer dan bij andere banken pinnen, en betaalt u daarnaast ook nog eens de minste commissie. De pinautomaten worden bovendien in de gaten gehouden door veiligheidspersoneel.</p>', -15.839748, -70.027996, bank],
        ['<h5>Medicentro Tourists Health</h5><p>Van de vele privé-klinieken in Puno is Medicentro Tourists Health uw beste keuze. Men heeft veel specialisten in dienst, en Engels-sprekende artsen. Soms ontvangt u onnodig veel examens en behandelingen: men weet dat u goed verzekerd bent. Voelt u zich ziek, raden we u ook daarom aan ons te bellen op ons noodnummer.</p>', -15.838599, -70.026801, hospital],
        ['<h5>Toeristenpolitie</h5><p>Houdt er rekening mee dat u niet altijd netjes behandeld wordt door de toeristenpolitie en dat men zelden goed Engels spreekt. Indien nodig, is het altijd beter ons te bellen op ons noodnummer. Wij kunnen voor u bemiddelen.</p>', -15.840426, -70.0285761, police]
    ];

    var locationsArequipa = [
        ['<h5>Plaza de Armas</h5><p>Wellicht het mooiste stadsplein van Peru. De gebouwen aan de Plaza de Armas in Arequipa zijn opgetrokken uit wit sillar-steen, afkomstig van de nabije vulkanen. Moorse invloeden zijn duidelijk zichtbaar. Het is in Arequipa altijd mooi weer en heerlijk zitten op de dakterrassen die het plein omringen. </p><img src="/media/naturandes/arequipa-plaza.jpg" width="100%" alt="Plaza de Armas, Arequipa">', -16.3988907, -71.536915, camera],
        ['<h5>Monasterio de Santa Catalinta</h5><p>Een complex van 20.000 vierkante meter, haast een stad binnen Arequipa. Het Santa Catalina-klooster werd in 1580 gesticht en het was gebruikelijk dat de jongere dochters van rijke families hier als non dienden. Eenmaal binnen de deuren, kregen ze een opleiding van 4 jaar. Daarna mochten ze kiezen om het klooster in schaamte te verlaten, of voor altijd binnen de kloostergronden te blijven…</p><img src="/media/naturandes/arequipa-monasterio.jpg" width="100%" alt="Monasterio de Santa Catalina, Arequipa">', -16.395141, -71.536774, camera],
        ['<h5>Museo de Juanito</h5><p>In 1995 ontdekte archeoloog Johan Reinhard op ongeveer 6300 meter hoogte de bevroren mummie van een Inca-meisje van een jaar of 14, tussen 1440 en 1450 geofferd aan de voor de Inca’s heilige Ampato-vulkaan. In de rondleiding van een uurtje bekijkt u eerst de ontroerende documentaire die National Geographic maakte over deze vondst, waarna u oog in oog zult staan met de verrassend intact gebleven mummie en uitleg krijgt over verscheidene op de vulkaan gevonden artefacten.<br><br>NB: in het museum mag niet gefotografeerd worden.</p>', -16.399810, -71.537825, camera],
        ['<h5>Barrio de San Lázaro</h5><p>Het oudste stukje Arequipa, gesticht rond 1540, is autoluw, en heerlijk om in te wandelen en weg te dromen. Een werkelijk schitterende, historische locatie waar je maar weinig andere mensen tegenkomt. Het spreekt tot de verbeelding!</p><img src="/media/naturandes/arequipa-sanlazaro.jpg" width="100%" alt="Barrio de San Lázaro, Arequipa">', -16.393682, -71.533660, camera],
        ['<h5>Mercado San Camilo</h5><p>Dichtbij het plezante stadscentrum vindt u de grimmige, drukke, zintuig-overdonderende straatjes rondom de markt van San Camilo. Het biedt een fascinerend kijkje in de minder welvarende realiteit van veel Peruanen. U komt ogen te kort! Kijk hier wel uit voor zakkenrollers.</p><img src="/media/naturandes/arequipa-market.jpg" width="100%" alt="Mercado San Camilo, Arequipa">', -16.402717, -71.534836, camera],
        ['<h5>El Misti & Chachani</h5><p>Arequipa ligt in de schaduw van de nog actieve vulkanen El Misti (5825 meter)  en Chachani (6075). Hier komen de witte sillar-stenen, zo kenmerkend voor de gebouwen in Arequipa vandaan. Chachani is 1 van de makkelijkste te beklimmen zesduizenders ter wereld. Nét wat hoger dan de Kilimanjaro!</p><img src="/media/naturandes/arequipa-mountain.jpg" width="100%" alt="El Misti & Chachani, Arequipa">', -16.193399, -71.518899, camera],
        ['<h5>Casa de Avila</h5><p><strong>€</strong><br>39 kamers, ontbijtbuffet, 30 meter van de straat, zonnige tuin, culturele klassen<br><a href="https://www.casadeavila.com/" target="_blank">website</a><br><br><em>Midden in de stad gelegen heeft Casa de Avila 3 grote pluspunten: de zonnige tuin, de goede prijs-kwaliteit verhouding en de culturele klassen (kookles, Spaanse les) die men biedt.</em></p><img src="/media/naturandes/arequipa-hotel-avila.jpg" width="100%" alt="Casa de Avila, Arequipa">', -16.402642, -71.540461, hotel],
        ['<h5>La Hosteria</h5><p><strong>€€</strong><br>16 kamers, ontbijtbuffet, centraal gelegen, kamers met openhaard, patio<br><a href="http://www.lahosteriaqp.com.pe/" target="_blank">website</a><br><br><em>Tegenover het klooster van Santa Catalina gelegen, is dit één van de beste accommodaties van Arequipa. Mooi ingerichte kamers, een charmante binnenplaats en vriendelijke medewerkers. Minpuntje is dat de verkeersdrukte wat doordringt tot sommige kamers.</em></p><img src="/media/naturandes/arequipa-hotel-hosteria.jpg" width="100%" alt="La Hosteria, Arequipa">', -16.394266, -71.537105, hotel],
        ['<h5>Casona Solar</h5><p><strong>€€</strong><br>12 kamers, ontbijtbuffet, zeer sfeervol, twee binnentuinen<br><a href="http://www.casonasolar.com" target="_blank">website</a><br><br><em>Zeer sfeervol hotel, in een koloniaal herenhuis uit 1702, opgetrokken uit wit sillar-gesteente. De kamers ogen stuk voor stuk romantisch, met hoge gebogen daken en leiden alle naar de centrale binnenplaatsen. Een heerlijk ontbijtbuffet maakt dat dit hotel één van onze keuzes in Arequipa is!</em></p><img src="/media/naturandes/arequipa-hotel-casona.jpg" width="100%" alt="Casona Solar, Arequipa">', -16.401777, -71.537058, hotel],
        ['<h5>Katari Hotel</h5><p><strong>€€€</strong><br>18 kamers, ontbijtbuffet, pal aan stadsplein restaurant op dakterras met uitzicht, spa<br><a href="https://hotelkatari.com" target="_blank">website</a><br><br><em>Aan de schitterende Plaza de Armas van Arequipa, centraler kan niet! Mooi ingerichte kamers, een heerlijk restaurant op het dakterras met fabuleus uitzicht en een spa. Wij weten waar we de volgende keer in Arequipa overnachten!</em></p><img src="/media/naturandes/arequipa-hotel-katari.jpg" width="100%" alt="Katari Hotel, Arequipa">', -16.399393, -71.537182, hotel],
        ['<h5>Zig Zag</h5><p><strong>€€</strong><br><a href="https://www.zigzagrestaurant.com" target="_blank">website</a><br><em>Misschien wel de beste steaks in heel Peru. Zig Zag is een steengril. U kunt kiezen tussen rund-, lam, of exotischere vleessoorten als alpaca of struisvogel. Stuk voor stuk heerlijk! Reserveren is nodig, vraag ons om assistentie.</em></p>', -16.395345, -71.535461, restaurant],
        ['<h5>Tradición Arequipena</h5><p><strong>€</strong><br><a href="http://www.tradicionarequipena.pe" target="_blank">website</a><br><em>Ver uit het centrum gelegen, alleen open voor lunch, maar een begrip voor de plaatselijke bevolking. Hier gaat men heen als men echt wat te vieren heeft. Probeer eens een chupe de camarones (kreeftensoep), rocoto relleno (gevulde peper) of adobo (varkenssoep). Stuk voor stuk fantastisch! </em></p>', -16.418058, -71.526539, restaurant],
        ['<h5>Chicha</h5><p><strong>€€€</strong><br><a href="http://www.chicha.com.pe/es/arequipa" target="_blank">website</a><br><em>Chicha met zowel lokalen in Arequipa als in Cusco van Peru’s meest fameuze chef Gastón Acurio, is een uitstekend maar prijzig restaurant. Het is uiteraard verfijnder dan Tradición Arequipena maar je betaalt dan ook echt veel meer.(</em></p>', -16.396357, -71.536331, restaurant],
        ['<h5>busterminal Cruz del Sur</h5><p>Veiligheidshalve werken wij uitsluitend met de lange afstandsbussen van Cruz del Sur. Dit is de meest aangeraden, veiligste en betrouwbaarste maatschappij van Peru. </p>', -16.424043, -71.545526, bus],
        ['<h5>Bank BCP</h5><p>Bij de BCP (Banco de Crédito de Perú) kunt u meer dan bij andere banken pinnen, en betaalt u daarnaast ook nog eens de minste commissie. De pinautomaten worden bovendien in de gaten gehouden door veiligheidspersoneel.</p>', -16.399392, -71.535445, bank],
        ['<h5>Clínica Arequipa</h5><p>Van de vele privé-klinieken in Arequipa is Clínica Arequipa uw beste keuze. Men heeft veel specialisten in dienst, en Engels-sprekende artsen. Soms ontvangt u onnodig veel examens en behandelingen: men weet dat u goed verzekerd bent. Voelt u zich ziek, raden we u ook daarom aan ons te bellen op ons noodnummer.</p>', -16.392168, -71.539977, hospital],
        ['<h5>Toeristenpolitie</h5><p>Houdt er rekening mee dat u niet altijd netjes behandeld wordt door de toeristenpolitie en dat men zelden goed Engels spreekt. Indien nodig, is het altijd beter ons te bellen op ons noodnummer. Wij kunnen voor u bemiddelen.</p>', -16.396264, -71.532936, police]
        
    ];

    var locationsCusco = [
        ['<h5>Plaza de Armas</h5><p>Ooit het centrale plein van de hoofdstad van de Inca’s, wordt Cusco’s Plaza de Armas gedomineerd door de Kathedraal en de Kerk van de Jezuïeten (foto). In de straatjes die uitkomen op het stadsplein staan koloniale gebouwen zij aan zij met Inca-ruïnes.</p><img src="/media/naturandes/cusco-plaza.jpg" width="100%" alt="Plaza de Armas, Cusco">', -13.516706, -71.978814, camera],
        ['<h5>Inca muur</h5><p>De Inca’s waren fantastische bouwmeesters, en de kwaliteit van hun muren overtrof die van de Spaanse kolonisator ruimschoots. Hier treft u de beroemde twaalfhoekige steen. De omringende stenen sluiten overal zo nauw aan, dat er geen vel papier tussen te krijgen is.</p><img src="/media/naturandes/cusco-muur.jpg" width="100%" alt="Inca-muur, Cusco">', -13.515981, -71.976277, camera],
        ['<h5>Barrio de San Blas</h5><p>Een korte maar steile wandeling vanaf Cusco-centrum brengt u naar het charmante, dorps-aandoende San Blas. Autovrij, vol kunstgalerietjes, met leuke koffietentjes, monumentale panden en een prachtig uitzicht over de stad.</p><img src="/media/naturandes/cusco-sanblas.jpg" width="100%" alt="San Blas, Cusco">', -13.515158, -71.974226, camera],
        ['<h5>Mercado de San Pedro</h5><p>Een spektakel voor de zintuigen: van groente, fruit en vlees, tot chicha (Inca-bier, gebrouwen uit maís) en van gewoven kleden tot te offeren lama-foetussen. Op de centrale markt kijkt u uw ogen uit. Doe dat ook voor zakkenrollers!</p><img src="/media/naturandes/cusco-market.jpg" width="100%" alt="Mercado San Pedro, Cusco">', -13.521096, -71.982496, camera],
        ['<h5>Sacsaywamán</h5><p>Zonder twijfel één van ’s werelds meest imposante bouwwerken. Na de verovering werden de stenen gebruikt om koloniaal Cusco op te bouwen. De grootste stenen bleven achter, want de Spanjaarden wisten zich geen raad met stenen van 200 ton.</p><img src="/media/naturandes/cusco-ruins.jpg" width="100%" alt="Sacsaywamán, Cusco">', -13.509773, -71.981678, camera],
        ['<h5>De Heilige Vallei</h5><p>De tijd lijkt te hebben stilgestaan in de landelijke Heilige Vallei, gelegen tussen Cusco en Machu Picchu. Stille gehuchtjes, schitterende Inca-ruïnes zoals Pisac en Ollantaytambo (foto) en een aangenaam klimaat, maken een bezoek zeer de moeite waard!</p><img src="/media/naturandes/cusco-valley.jpg" width="100%" alt="De Heilige Valei">', -13.407218, -71.844302, camera],
        ['<h5>Machu Picchu</h5><p>Herontdekt in 1911 en verkozen tot ‘Nieuw Wereldwonder’ in 2007: Machu Picchu is zonder enige twijfel Peru’s bekendste en indrukwekkendste ruïne. Hoog oprijzend boven de wilde Urubamba-rivier, de piek van Wayna Picchu vaak omsluierd door mystiek aandoende wolken, weet deze ‘citadel’ iedere bezoeker te verbazen.</p><img src="/media/naturandes/cusco-machu-picchu.jpg" width="100%" alt="Machu Picchu">', -13.160992, -72.545153, camera],
        ['<h5>Regenwoud van Manu</h5><p>De regio van Manu, in de Amazone, wordt geroemd als een van de regio’s met de grootste biodiversiteit ter wereld. Het is ook één van de minst betreden gebieden. Hemelsbreed slechts 100 kilometer van Cusco lopen inheemse stammen rond die nog nooit contact hebben gehad met de rest van de wereld.</p><img src="/media/naturandes/cusco-manu.jpg" width="100%" alt="Regenwoud Manu">', -12.221888, -71.001184, camera],
        ['<h5>Inkarri Hostal</h5><p><strong>€</strong><br>36 kamers, Amerikaans ontbijt, 2 sfeervolle patio’s<br><a href="https://www.inkarricusco.com/" target="_blank">website</a><br><br><em>Ondanks het nauwe, drukke straatje waaraan dit hotel ligt, is het onze favoriete accommodatie voor budget-reizigers. Sfeervol opgezet, met een voorkomende, behulpzame staf en ruime kamers doet men gewoon veel goed.</em></p><img src="/media/naturandes/cusco-hotel-inkarri.jpg" width="100%" alt="Hostal Inkarri, Cusco">', -13.518024, -71.973280, hotel],
        ['<h5>Andenes al Cielo</h5><p><strong>€€</strong><br>25 kamers, ontbijtbuffet, sfeervolle patio, zeer centraal gelegen<br><a href="http://www.andenesalcielo.com/" target="_blank">website</a><br><br><em>Zeer centraal gelegen, tussen het stadsplein van Cusco en San Blas, is dit charmante hotel één van uw beste keuzes. Wij genieten vooral van de deluxe kamers met open haard en het prima ontbijtbuffet.</em></p><img src="/media/naturandes/cusco-hotel-andenes.jpg" width="100%" alt="Hotel Andenes al Cielo, Cusco">', -13.515211, -71.975984, hotel],
        ['<h5>Niños Hotel I</h5><p><strong>€€</strong><br>19 kamers, onbijt van de kaart, restaurant, ngo, sfeervolle patio<br><a href="https://www.ninoshotel.com" target="_blank">website</a><br><br><em>Als toeriste trok de eigenaresse zich het lot van de straatkinderen aan. Ze besloot te blijven, adopteerde er negen en begon dit hotel. Met de opbrengst ontvangen honderden straatkinderen eten en zorg.</em></p><img src="/media/naturandes/cusco-hotel-ninos.jpg" width="100%" alt="Niños Hotel, Cusco">', -13.516234, -71.983221, hotel],
        ['<h5>El Mercado Tunqui</h5><p><strong>€€€</strong><br>32 kamers, ontbijtbuffet, restaurant, bar, room-service, sfeervolle patio<br><a href="https://www.elmercadocusco.com" target="_blank">website</a><br><br><em>Een fantastische keuze als u een iets ruimer budget heeft. Heerlijk restaurant, grote zonnige patio en een hele goede prijs-kwaliteit verhouding.</em></p><img src="/media/naturandes/cusco-hotel-mercado.jpg" width="100%" alt="Hotel El Mercado, Cusco">', -13.516292, -71.982495, hotel],
        ['<h5>Paddys Irish Pub</h5><p><strong>€</strong><br><a href="http://www.paddysirishbarcusco.com" target="_blank">website</a><br><em>The highest Irish-owned pub in the world, stelt de eigenaar. Belangrijker is echter de familiaire backpacker-sfeer en de ruime maaltijden voor een schappelijke prijs. Onze favorieten zijn de curry en de zeer goede lasagne. </em></p>', -13.516695, -71.977535, restaurant],
        ['<h5>El Paisa</h5><p><strong>€€</strong><br><a href="https://www.facebook.com/elpaisacusco/?rf=324848510878149" target="_blank">website</a><br><em>Een lokaal restaurant, met specialiteiten uit de kustregio van Peru, maar bijvoorbeeld ook cuy (cavia). Hier gaat de lokale bevolking naar toe als ze iets te vieren heeft. Iets heel anders dan een toeristenrestaurant dus, met live-shows met zang en dans, waardoor het wel lawaaiig is.</em></p>', -13.523403, -71.973704, restaurant],
        ['<h5>Cicciolina</h5><p><strong>€€€</strong><br><a href="http://www.cicciolinacuzco.com" target="_blank">website</a><br><em>Gelegen op de tweede verdieping van een koloniaal pand, wordt dit restaurant al jaren geroemd om haar tapas. U kunt hier ook van de kaart eten, en men verzorgt tevens prima lunchpakketten. Men accepteert twee reserveringen voor een tafeltje per avond, dus u kunt niet voor een extra wijntje blijven pakken.</em></p>', -13.516145, -71.976656, restaurant],
        ['<h5>Marcelo Batata</h5><p><strong>€€</strong><br><a href="https://cuscodining.com/marcelo-batata/" target="_blank">website</a><br><em>Een relaxte plek om wat langer door te brengen. Marcelo Batata heeft een kleurrijke inrichting, een zonnig dakterras met schitterend uitzicht over het centrum van Cusco, en de beste cocktails van de stad. Vooral ook hun steaks zijn verrukkelijk! </em></p>', -13.515914, -71.976790, restaurant],
        ['<h5>busterminal Cruz del Sur</h5><p>Veiligheidshalve werken wij uitsluitend met de lange afstandsbussen van Cruz del Sur. Dit is de meest aangeraden, veiligste en betrouwbaarste maatschappij van Peru. In Cusco heeft men een eigen busterminal.</p>', -13.532846, -71.968532, bus],
        ['<h5>Bank BCP</h5><p>Bij de BCP (Banco de Crédito de Perú) kunt u meer dan bij andere banken pinnen, en betaalt u daarnaast ook nog eens de minste commissie. De pinautomaten worden bovendien in de gaten gehouden door veiligheidspersoneel.</p>', -13.518536, -71.977983, bank],
        ['<h5>Clínica Pardo</h5><p>Van de vele privé-klinieken in Cusco is Clínica Pardo uw beste keuze. Men heeft veel specialisten in dienst, en Engels-sprekende artsen. Soms ontvangt u onnodig veel examens en behandelingen: men weet dat u goed verzekerd bent. Voelt u zich ziek, raden we u ook daarom aan ons te bellen op ons noodnummer.</p>', -13.521621, -71.965407, hospital],
        ['<h5>Toeristenpolitie</h5><p>Houdt er rekening mee dat u niet altijd netjes behandeld wordt door de toeristenpolitie en dat men zelden goed Engels spreekt. Indien nodig, is het altijd beter ons te bellen op ons noodnummer. Wij kunnen voor u bemiddelen.</p>', -13.514825, -71.981167, police]
    ];

    var markerLima, iLima;
    var infowindowLima = new google.maps.InfoWindow(
        {
            maxWidth: 360
        }
    );

    var markerPuno, iPuno;
    var infowindowPuno = new google.maps.InfoWindow(
        {
            maxWidth: 360
        }
    );

    var markerArequipa, iArequipa;
    var infowindowArequipa = new google.maps.InfoWindow(
        {
            maxWidth: 360
        }
    );

    var markerCusco, iCusco;
    var infowindowCusco = new google.maps.InfoWindow(
        {
            maxWidth: 360
        }
    );

    google.maps.event.addListener(mapLima, 'click', function() {
        infowindowLima.close();
    });

    google.maps.event.addListener(mapPuno, 'click', function() {
        infowindowPuno.close();
    });

    google.maps.event.addListener(mapArequipa, 'click', function() {
        infowindowArequipa.close();
    });

    google.maps.event.addListener(mapCusco, 'click', function() {
        infowindowCusco.close();
    });

    for (iLima = 0; iLima < locationsLima.length; iLima++) {
        markerLima = new google.maps.Marker({
            position: new google.maps.LatLng(locationsLima[iLima][1], locationsLima[iLima][2]),
            map: mapLima,
            icon: locationsLima[iLima][3]
        });

        google.maps.event.addListener(markerLima, 'click', (function(markerLima, iLima) {
            return function() {
                infowindowLima.setContent(locationsLima[iLima][0]);
                infowindowLima.open(mapLima, markerLima);
            };
        })(markerLima, iLima));

        markersLima.push(markerLima);
    }

    for (iPuno = 0; iPuno < locationsPuno.length; iPuno++) {
        markerPuno = new google.maps.Marker({
            position: new google.maps.LatLng(locationsPuno[iPuno][1], locationsPuno[iPuno][2]),
            map: mapPuno,
            icon: locationsPuno[iPuno][3]
        });

        google.maps.event.addListener(markerPuno, 'click', (function(markerPuno, iPuno) {
            return function() {
                infowindowPuno.setContent(locationsPuno[iPuno][0]);
                infowindowPuno.open(mapPuno, markerPuno);
            };
        })(markerPuno, iPuno));

        markersPuno.push(markerPuno);
    }

    for (iArequipa = 0; iArequipa < locationsArequipa.length; iArequipa++) {
        markerArequipa = new google.maps.Marker({
            position: new google.maps.LatLng(locationsArequipa[iArequipa][1], locationsArequipa[iArequipa][2]),
            map: mapArequipa,
            icon: locationsArequipa[iArequipa][3]
        });

        google.maps.event.addListener(markerArequipa, 'click', (function(markerArequipa, iArequipa) {
            return function() {
                infowindowArequipa.setContent(locationsArequipa[iArequipa][0]);
                infowindowArequipa.open(mapArequipa, markerArequipa);
            };
        })(markerArequipa, iArequipa));

        markersArequipa.push(markerArequipa);
    }

    for (iCusco = 0; iCusco < locationsCusco.length; iCusco++) {
        markerCusco = new google.maps.Marker({
            position: new google.maps.LatLng(locationsCusco[iCusco][1], locationsCusco[iCusco][2]),
            map: mapCusco,
            icon: locationsCusco[iCusco][3]
        });

        google.maps.event.addListener(markerCusco, 'click', (function(markerCusco, iCusco) {
            return function() {
                infowindowCusco.setContent(locationsCusco[iCusco][0]);
                infowindowCusco.open(mapCusco, markerCusco);
            };
        })(markerCusco, iCusco));

        markersCusco.push(markerCusco);

     // Walking route Cusco
        var routeCuscoCoordinates = [
            {lat: -13.516277, lng: -71.978577},
            {lat: -13.515703, lng: -71.978170},
            {lat: -13.514519, lng: -71.978849},
            {lat: -13.514414, lng: -71.978659},
            {lat: -13.513016, lng: -71.979288},
            {lat: -13.512704, lng: -71.978953},
            {lat: -13.512512, lng: -71.978562},
            {lat: -13.512448, lng: -71.978596},
            {lat: -13.512045, lng: -71.977871},
            {lat: -13.512119, lng: -71.977522},
            {lat: -13.512337, lng: -71.977043},
            {lat: -13.512694, lng: -71.976039},
            {lat: -13.512907, lng: -71.975722},
            {lat: -13.513644, lng: -71.974937},
            {lat: -13.513705, lng: -71.974906},
            {lat: -13.514311, lng: -71.974327},
            {lat: -13.514447, lng: -71.974395},
            {lat: -13.514643, lng: -71.974205},
            {lat: -13.514863, lng: -71.974049},
            {lat: -13.514240, lng: -71.974544},
            {lat: -13.514992, lng: -71.974799},
            {lat: -13.515347, lng: -71.975135},
            {lat: -13.515697, lng: -71.975714},
            {lat: -13.516135, lng: -71.976568},
            {lat: -13.515433, lng: -71.976983},
            {lat: -13.515512, lng: -71.977204},
            {lat: -13.515271, lng: -71.977358},
            {lat: -13.515506, lng: -71.977797},
            {lat: -13.515703, lng: -71.978170},
            {lat: -13.516277, lng: -71.978577}
        ];

        routeCusco = new google.maps.Polyline({
            path: routeCuscoCoordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
    }

    $(".removeLine").click(function(){
        routeCusco.setMap(null);
    });

    $(".addLine").click(function(){
        routeCusco.setMap(mapCusco);
    });

//Geolocation. Because maps are centered with fixed coordinates, Geolocation doesn't bother clients who are not in the city they are looking at.
//In that case the Geolocation Marker doesn't show on the map
    $(".whereAmI").click(function() {

        watchId =  navigator.geolocation.watchPosition(success, error);
        // var watchId = navigator.geolocation.watchPosition(scrollMap);

            var markerUserLima = new google.maps.Marker({
            map: mapLima,
            title: "U bevindt zich hier"
            });

            var markerUserArequipa = new google.maps.Marker({
            map: mapArequipa,
            title: "U bevindt zich hier"
            });

            var markerUserPuno = new google.maps.Marker({
            map: mapPuno,
            title: "U bevindt zich hier"
            });

            var markerUserCusco = new google.maps.Marker({
            map: mapCusco,
            title: "U bevindt zich hier"
            });

        function success(position){
            // Getting Latitude and Longitude
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var latlng = new google.maps.LatLng(lat,long);
            
            markerUserLima.setPosition(latlng)
            markerUserArequipa.setPosition(latlng)
            markerUserPuno.setPosition(latlng)
            markerUserCusco.setPosition(latlng)

        }
        function error() {
            $('body').html('Locatie niet bepaald. U heeft geen toestemming gegeven of uw browser ondersteunt dit niet. <a href="index.html">Laad de pagina opnieuw</a>.');
        }
    });

    $(".hideLocation").click(function() {
        navigator.geolocation.clearWatch(watchId);
    });
         
}

function clickLima(id){
    google.maps.event.trigger(markersLima[id], 'click');
}

function clickPuno(id){
    google.maps.event.trigger(markersPuno[id], 'click');
}

function clickArequipa(id){
    google.maps.event.trigger(markersArequipa[id], 'click');
}

function clickCusco(id){
    google.maps.event.trigger(markersCusco[id], 'click');
}