/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 
 * Module Description
 * Deployment for Invoice Print
 * Includes poPrint
 *
 * Version    Date            Author        Remarks
 * 1.0.0      23 Jun 2021     Arshitha MS        Created for po print
 
 */
//  define(['N/log','N/ui/serverWidget', 'N/record', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', 'N/runtime'],
define(['N/log', 'N/ui/serverWidget', 'N/record','N/format', 'N/config','N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', "N/runtime", "N/file", , 'N/render'],
    function (log, serverWidget, record, format,config,search, http, url, redirect, task, runtime, render, file) {
        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
         */
        function onRequest(context) {
            var scriptObj = context.request.parameters;
            var recordId = scriptObj.recid;

            log.debug("recordId", recordId);
            poRecord = record.load({
                type: 'purchaseorder',
                id: 8785,
                isDynamic: false
            });
          
            var vendor = poRecord.getValue({
                fieldId: "billaddress"
            });
            log.debug("vendor", vendor);
            var tranId = poRecord.getValue({
                fieldId: "tranid"
            });
            log.debug("tranId", tranId);

            var date = poRecord.getValue({
                fieldId: "trandate"
            });
            log.debug("date", date);
            var parsedDate = format.format({
                value: date,
                type: format.Type.DATE
                });
            log.debug("parsedDate", parsedDate);
            var vat = poRecord.getValue({
                fieldId: "taxtotal"
            });
            log.debug("vat", vat);
            var payment = poRecord.getValue({
                fieldId: "terms"
            });
            log.debug("payment", payment);
            var delivery = poRecord.getValue({
                fieldId: "incoterm"
            });
            log.debug("delivery", delivery);
            var amtIn = poRecord.getValue({
                fieldId: "custbodyamount_in_words"
            });
            log.debug("amtIn", amtIn);
            var companyInfo = config.load({
                type: config.Type.COMPANY_INFORMATION
            });
            log.debug("companyInfo", companyInfo);
            var name = companyInfo.getValue({
                fieldId: "companyname"
            });
            log.debug("name", name);



            
            var xml = '<?xml version="1.0"?>';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
            xml += '<pdf>';
            xml += '<head>';
            xml += '<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
            xml += '    <style type="text/css">span, table {';
            xml += '     font-family: stsong, sans-serif;';
            xml += '    font-family: msung, sans-serif;';
            xml += '    font-family: heiseimin, sans-serif;';
            xml += '     font-family: hygothic, sans-serif;';
            xml += '    font-family: verdana;';
            xml += '    font-family: sans-serif;';
            xml += '     font-size: 9pt;';
            xml += '     table-layout: fixed;';
            xml += '     }';
            xml += '     td.headerB {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     td.headerM {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     span.headerM {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     td.headerR {';
            xml += '       font-size: 10px;';
            xml += '     }';
            xml += '     td.headerRB {';
            xml += '       font-size: 12px;';
            xml += '       font-weight: bold;';
            xml += '     }';
            xml += '     th {';
            xml += '     font-weight: bold;';
            xml += '     font-size: 8.5pt;';
            xml += '     padding-top: 2px;';
            xml += '     vertical-align: middle;';
            xml += '         }';
            xml += '     b {';
            xml += '     font-weight: bold;';
            xml += '     color: #333333;';
            xml += '     }';
            xml += '     table.header td {';
            xml += '     padding: 0;';
            xml += '     font-size: 10pt;';
            xml += '     }';
            xml += '     table.footer td {';
            xml += '     padding: 0;';
            xml += '     font-size: 8pt;';
            xml += '     }';
            xml += '     #itemtable th p{';
            xml += '     vertical-align: text-top !important;';
            xml += '     text-align: center !important;';
            xml += '     }';
            xml += '     #itemtable{';
            xml += '     font-size: 8.5pt !important;';
            xml += '     border: 0.5px solid #000000';
            xml += '     }';
            xml += '     table.total {';
            xml += '     page-break-inside: avoid;';
            xml += '     }';
            xml += '     tr.totalrow {';
            xml += '     background-color: #e3e3e3;';
            xml += '     line-height: 200%;';
            xml += '     }';
            xml += '     td.totalboxtop {';
            xml += '     font-size: 12pt;';
            xml += '     background-color: #e3e3e3;';
            xml += '     }';
            xml += '     span.title {';
            xml += '     font-size: 28pt;';
            xml += '     }';
            xml += '     .smallTitle {';
            xml += '     font-size: 9pt;';
            xml += '     }';
            xml += '     span.number {';
            xml += '     font-size: 16pt;';
            xml += '     text-align:center;';
            xml += '     }';
            xml += '     span.itemname {';
            xml += '     font-weight: bold;';
            xml += '     line-height: 150%;';
            xml += '     }';
            xml += '     hr {';
            xml += '     width: 100%;';
            xml += '     color: #d3d3d3;';
            xml += '     background-color: #d3d3d3;';
            xml += '     height: 1px;';
            xml += '     }';
            xml += '     table.smalltext tr td {';
            xml += '     font-size: 8pt;';
            xml += '     }';
            xml += '       p.alignR {';
            xml += '     text-align: right !important;';
            xml += '     }';
            xml += '     p.alignL {';
            xml += '     text-align: left !important;';
            xml += '     }';
            xml += '     p.alignC {';
            xml += '     text-align: center !important;';
            xml += '     }';
            xml += '     .td_right_line{';
            xml += '     border-right :0.5px solid #000000;';
            xml += '     }';
            xml += '     .td_bottom_line{';
            xml += '     border-bottom: 0.5px solid #000000;';
            xml += '     }';
            xml += '    .td_bottom_line{ border-bottom: none;  }';
            xml += '     .td_top_line{';
            xml += '     border-top :0.5px solid #000000;';
            xml += '     }';
            xml += '     .title{';
            xml += '     font-weight: bold;';
            xml += '         font-size:16pt;';
            xml += '     line-height: 150%;';
            xml += '     }';
            xml += '     .footer-img{';
            xml += '        top: 0px;';
            xml += '     right: 0px;';
            xml += '     left: 0px;';
            xml += '     bottom: 0px;';
            xml += '     }';
            xml += '     .footer{';
            xml += '     margin-left:-45px; margin-right:-60px; margin-bottom:-115px;';
            xml += '     }';
            xml += '     .td_left_line{';
            xml += '     border-left :0.5px solid #000000;';
            xml += '     }';
            xml += '     .maintbl{';
            xml += '     border:0.5px solid #000000;';
            xml += '     }';
            xml += '     .footertbl{';
            xml += '     border:0.5px solid #000000;';
            xml += '     border-top: 0px !important;';
            xml += '     }';
            xml += '     .footertbl2{';
            xml += '         border-left: 0.5px solid #000000;';
            xml += '     border-right: 0.5px solid #000000;';
            xml += '     border-top: 0px !important;';
            xml += '     }';
            xml += '     .pad_left{';
            xml += '     padding-left: 5px!important;';
            xml += '     }';
            xml += '     th,td{';
            xml += '     padding:4px;';
            xml += '     }';
            xml += ' .custstamp{';
            xml += ' color:#d3d3d3;';
            xml += '     font-weight: bold;';
            xml += '         }';
            xml += '     </style>';
            xml += '        <macrolist>';
            xml += '        <macro id="nlheader">';
            xml += '         </macro>';
            xml += ' <macro id="nlfooter">';
            xml += ' <table class="footer" style="width: 100%; font-size: 8pt;">';
            //xml += '     <tr><td align="right">(Page <pagenumber/> of <totalpages/>)</td></tr>';
            xml += '      <tr><td align="center" >This is a computer-generated document.No signature is required.</td></tr>';
            xml += '  </table>';
            xml += '  </macro>';
            xml += '     </macrolist>';
            xml += '</head>';
            xml += '   <body header="nlheader" footer="nlfooter" footer-height="2%" padding="0.25in 0.5in 0.25in 0.5in" size="A4">';
            //xml += '     <p align="center" style="font-size:20px;"><b>TAX INVOICE</b></p>';
            xml += '<table  style="width:100%;height:100%;">';
            xml += '<tr >';
            xml += '<td style="padding-left:200px;font-size :30px;font-family: Arial, Helvetica, sans-serif;"><h3>ESTIMATE</h3></td>';

            xml += '<td width="50%" style="font-size:14px;">'+relaceSlashN(vendor)+'</td>';
            xml += '<td align="right" width="50%">';
            xml += '<table>';
            xml += '<tr width="50%">';
            xml += '<td  width="38%" style="font-size:14px;"><b>Date</b></td>';
            xml += '<td width="2%">:</td>';
            xml += '<td  width="10%" style="font-size:14px;">'+parsedDate+'</td>';
            xml += '</tr>';
            xml += '<tr width="50%">';
            xml += '<td  width="38%" style="font-size:14px;"><b>Our Ref</b></td>';
            xml += '<td width="2%">:</td>';
            xml += '<td width="10%" style="font-size:14px;">'+tranId+'</td>';
            xml += '</tr>';
            xml += '<tr width="50%">';
            xml += '<td  width="38%" style="font-size:14px;"><b>Your Ref</b></td>';
            xml += '<td width="2%">:</td>';
            xml += '<td width="10%" style="font-size:14px;">'+tranId+'</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr >';
            xml += '</table>';
            xml += '<table>';
            xml += '<tr width="50%">';
            xml += '<td width="50%" style="font-size:14px;"><b>Kind Attention:</b></td>';
            xml += '</tr>';
            xml += '<tr width="50%">';
            xml += '<td width="50%" style="font-size:12px;">We are Pleased to confirm with you the order for the following</td>';
            xml += '</tr>';
            xml += '</table>';
            
           
          
        //     xml += '     <p align="left" style="font-size:14px;"><b>ITEM DETAILS</b></p>';
            xml += '<table class=" td_right_line td_bottom_line" width="100%" height="100%" style="border-left:1px;border-top:1px;">';
            xml += '<tr width="100%" style="border-bottom :1px;">';
            xml += '<th  width="4%" style="border-right :1px;"><b>SL#</b></th>';
            xml += '<th width="14%" style="border-right :1px;"><b>ITEM CODE</b></th>'; 
            xml += '<th width="10%" style="border-right :1px;"><b>UPC CODE</b></th>';
            xml += '<th width="13%" style="border-right :1px;"><b>DESCRIPTION</b></th>';
            xml += '<th width="5%" style="border-right :1px;"><b>QTY</b></th>';
            xml += '<th width="4%" style="border-right :1px;"><b>U/M</b></th>';
            xml += '<th width="11%" style="border-right :1px;"><b>UNIT PRICE</b></th>';
            xml += '<th width="12%" style="border-right :1px;"><b>TOTAL PRICE</b></th>';
            xml += '<th width="6%" style="border-right :1px;"><b>VAT%</b></th>';
            xml += '<th width="11%" style="border-right :1px;"><b>VAT VALUE</b></th>';
            xml += '<th width="10%" style="border-right :0.5px;"><b>NET AMT</b></th>';
            xml += '</tr>';

            var itemRecord = record.load({
                type: 'serviceitem',
                id: 70,
                isDynamic: false
            });
            log.debug("itemRecord", itemRecord);
    
            var itemCode = itemRecord.getValue({
                fieldId:'itemid'
            });
            log.debug("itemCode", itemCode);
            var upcCode = itemRecord.getValue({
                fieldId:'upccode'
            });
            log.debug("upcCode", upcCode);



            var numLines = poRecord.getLineCount({
                sublistId:'item'
            });
               
               log.debug("numLines", numLines);
               var totalPrice=0;
               for (var mm = 0; mm < numLines; mm++) {
                var descrptn = poRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
                    line: mm
                });
                log.debug("descrptn", descrptn);
                var qty = poRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: mm
                });
                log.debug("qty", qty);
                var unit = poRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: mm
                });
                log.debug("unit", unit);
                if(qty!=""&&qty!=null||unit!=""&&unit!=null){
                    totalPrice=parseInt(qty)*parseInt(unit);
                    }
                    log.debug("totalPrice", totalPrice);

                    var units = poRecord.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'unit',
                        line: mm
                    });
                    log.debug("units", units);

//<th align="left" width="20%" class=" td_right_line td_bottom_line"><p align="left">Item Description</p></th>



            xml += '<tr width="100%" style="border-bottom :1px;">';
            xml += '<td rowspan="3"  width="4%" style="border-right :1px;">'+(+mm+1)+'</td>';
            xml += '<td width="14%" style="border-right :1px;">'+itemCode+'</td>';
            xml += '<td width="10%" style="border-right :1px;">'+upcCode+'</td>';
            xml += '<td width="13%" style="border-right :1px;">';
            if(descrptn!=null){
                xml += '<p align="left">'+descrptn+'</p>';    
            }
            xml += '</td>';
            xml += '<td width="5%" style="border-right :1px;">';
            if(qty!=""&&qty!=null){
                xml += '<p align="left">'+qty+'</p>';    
            }
            xml += '</td>';
            xml += '<td width="4%" style="border-right :1px;">';
            if(units!=null){
                xml += '<p align="left">'+units+'</p>';    
            }
            xml += '</td>';
            xml += '<td width="11%" style="border-right :1px;">';
            if(unit!=null){
                xml += '<p align="left">'+unit+'</p>';    
            }
            xml += '</td>';
            xml += '<td width="12%" style="border-right :1px;">'+parseFloat(totalPrice).toFixed(2)+'</td>';
            xml += '<td width="6%" style="border-right :1px;">'+ parseFloat(vat).toFixed(2)+'%</td>';
            xml += '<td width="11%" style="border-right :1px;">'+parseFloat(vat).toFixed(2)+'</td>';
            xml += '<td width="10%" style="border-right :0.5px;">'+parseFloat(totalPrice).toFixed(2)+'</td>';
            xml += '</tr>';
            
        }
        xml += '</table>';
        xml += '<table align="right" style="padding-top:7px;">';
        xml += '<tr >';
        xml += '<td width="" style="font-size:14px; "><b>Total Price</b></td>';
        xml += '<td style=" " width="">:</td>';
        xml += '<td style=" font-size:14px;" width="" ><b>'+totalPrice+'</b></td>';
        xml += '</tr>';
        xml += '<tr>';
        xml += '<td width="" style="font-size:14px;"><b>Delivery</b></td>';
        xml += '<td width="">:</td>';
        xml += '<td width="" style="font-size:14px;">'+delivery+'</td>';
        xml += '</tr>';
        xml += '<tr>';
        xml += '<td width="" style="font-size:14px;"><b>Payment Terms</b></td>';
        xml += '<td width="">:</td>';
        xml += '<td width="" style="font-size:14px;">'+payment+'</td>';
        xml += '</tr>';
        xml += '</table>';
        xml += '     <p align="left" style="padding-top:-15px;">We look forward to an earliest delivery.Kindly treat this as urgent.</p>';
        xml += '     <p align="left" style="">Thanks Regards,</p>';
        xml += '     <p align="left" style=""><b>'+replaceCharector(name)+'</b></p>';
        //xml += '     <p align="center" style="">This is a computer-generated document.No signature is required.</p>';
        xml += ' </body>';
        xml += '</pdf>';
            context.response.renderPdf({
                xmlString: xml
            });
        }
        return {

            onRequest: onRequest
        };
    });

//   function replaceSlahNWithBreak(str){
//     // return str.replace("\n", "<br />");
//     return str.replace(/\n/gi, "<br />");
//   }
function relaceSlashN(charVal){
    if(charVal){
          return charVal.replace("\n", "<br />", "g");
    }else{
        return "";
    }
  }
  function replaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}
  






