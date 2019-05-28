// ==UserScript==
// @name     MagyarPosta&eBay
// @version  2
// @author       Szabó Attila - Tailor993 - www.tailor993.hu
// @description    Magyar Posta kompatibilis eBay
// @include        https://www.ebay.com/myb/PurchaseHistory?*
// @grant          GM.xmlHttpRequest
// @grant          GM_xmlhttpRequest
// @grant          GM.getValue
// @grant          GM_getValue
// @grant          GM.setValue
// @grant          GM_setValue
// @grant          GM.info
// @grant          GM_info
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require        https://code.jquery.com/jquery-3.3.1.slim.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js
// @require        https://stackpath.bootstrapcdn.com/twitter-bootstrap/2.0.4/js/bootstrap.min.js
// ==/UserScript==


/*
https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js
https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css

https://stackpath.bootstrapcdn.com/twitter-bootstrap/2.0.4/css/bootstrap-combined.min.css
*/
$('document').ready(function() {
  /* BootStrap CSS betöltése */
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://stackpath.bootstrapcdn.com/twitter-bootstrap/2.0.4/css/bootstrap-combined.min.css';
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    $('.tracking-label').each(function(index, value){

        var valueBackup = value.innerHTML;

        /* Csomag szám lekérdezése */
        var szam = getCsomagszam(value);
        var szamSzoveg = `Tracking number: <b>` + szam + `</b>`;

        /* Modal elem */
        var modal = generateModal(szam, index);

        /* Gomb elem */
        var gomb = generateGomb(index);

        var vonalkod = generateVonalkod(szam)

        /* Elemek felhelyezése */
        //value.append( gomb );
        //value.append( modal );
        value.innerHTML = "";

        value.innerHTML = valueBackup  + gomb + modal ;
    });


});



function generateGomb(index){
    var szoveg = `
<br>
<a href="#exampleModal`+index+`" role="button" class="btn btn-primary" data-toggle="modal">
    <span style="color:#ffffff">
        Magyar Posta Vonalkód generálás!
    </span>
</a>
<br>
`;
    return szoveg;
}

function generateVonalkod (szam){
return `<br><br><img src="https://www.barcodesinc.com/generator/image.php?code=`+szam+`&style=197&type=C128B&width=232&height=50&xres=1&font=3" />`;
}


function generateModal(szam, index){
        var szoveg =`
<!-- Modal -->
<div class="modal fade" id="exampleModal`+index+`" style="width:800px;"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-content">
        <div class="modal-header ">
            <div style="text-align: center;">
                <h5 class="modal-title text-center" id="exampleModalLabel">
                    Magyar Posta Plugin eBayhez.
                </h5>
            </div>
        </div>
        <div class="modal-body" style="text-align: center;">
            <table class="table">
                <tr>
                    <td colspan="3">
                        <div class="font-weight-normal" style="font-size:1.2em; text-align:justify;">
                            1) Ha nincs telepítve telepítse a Magyar Posta Applikációt. Az alább látható linkek valamelyikéről.
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div  style="margin:auto; text-align: center;">
                            <a  href='https://play.google.com/store/apps/details?id=hu.posta.uzletimobil&hl=hu&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                <img width="200px" alt='Szerezd meg: Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/hu_badge_web_generic.png'/>
                            </a>
                        </div>
                    </td>
                    <td>
                        <div style="margin:auto; text-align: center;">
                            <a href="https://www.posta.hu/postaapp" target="_blank">
                                <img  width="80px"  src="https://lh3.ggpht.com/R-q3n1KDI3a_0e1sPmNBA59SreYniEKiDZVMnOA-ZpVrADBcKSZYvtBEQc41laWZ1x7g=s180" />
                            </a>
                        </div>
                    </td>
                    <td>
                        <div style="margin:auto; text-align: center;">
                            <a href="https://itunes.apple.com/hu/app/magyar-posta-applikacio/id914923477?mt=8" target="_blnak">
                                <img  width="200px"  src="http://tailor993.hu/host/DownloadAppStore.svg">
                            </a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div style="text-align: center; margin-left: 2px;">
                            A Google Play és a Google Play-logó a Google LLC védjegyei.
                        </div>
                    </td>
                    <td>
                        <div style="text-align: center;">
                            A Magyar Posta Applikáció és a Magyar Posta Applikáció-logó a Magyar Posta Zrt védjegyei.
                        </div>
                    </td>
                    <td>
                        <div style="text-align: center; margin-right: 2px;">
                            Az Apple és az Apple-logó a Apple INC védjegyei.
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div class="font-weight-normal" style="font-size:1.2em; text-align: justify; margin-left: 2px;">
                            2) Indítsa el a Magyar Posta Applikációt és válassza a Nyomkövetés menüpontot.<br>
                            3) Válassza az új küldemény gombot.<br>
                            4) Nyomja meg a vonalkód olvasó gombot.<br>
                            6) Ha nincs telepítve telepítse a felajánlott vonalkód olvasó alkalmazást, majd térjen vissza a Magyar Posta Applikációba ami a 4. pontban foglaltakkal fog betölteni.<br>
                            5) Olvassa be telefonjával az alábbi kódot és a küldemény megjelenik a listában.
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div style="text-align: center;">
                            <img src="https://www.barcodesinc.com/generator/image.php?code=`+szam+`&style=197&type=C128B&width=232&height=50&xres=1&font=3" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="modal-footer">
            <table class="table">
                <tr>
                    <td>
                        <div class=" mt-4" style="margin-left: 2px;">
                            Készítette: Szabó Attila (Tailor993)
                            <a href="http://www.tailor993.hu" target="_blnak" class="btn">
                                Weboldal
                            </a>
                        </div>
                    </td>
                    <td style="text-align: right;">
                        <button type="button" class="btn " data-dismiss="modal">Bezárás</button>
                    </td>
                </tr>
             </table>
        </div>
    </div>
</div>
 `;
   return szoveg;
}

function getCsomagszam( elem ){
  var csomagszam = elem.innerHTML;
    //console.log('Fut');
//console.log(csomagszam);
  csomagszam = csomagszam.split(">")[3];
  csomagszam = csomagszam.split("<")[0];
  csomagszam = String(csomagszam).replace('\t','');
  csomagszam = String(csomagszam).replace('\n','');

  console.log(csomagszam);
  return csomagszam;
}
