/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 
 * Module Description
 * Deployment for Purchase Print
 * Includes Purchase Print
 *
 * Version    Date            Author           Remarks
 * 1.0.0      5 July 2022     C Vyshnav        Created for Practice
 
 */
//  define(['N/log','N/ui/serverWidget', 'N/record', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', 'N/runtime'],
define(['N/log', 'N/ui/serverWidget', 'N/record', 'N/format', 'N/config', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', "N/runtime", "N/file", , 'N/render'],
    function (log, serverWidget, record, format, config, search, http, url, redirect, task, runtime, render, file) {
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
            var recType = 'purchaseorder';

            if (context.request.method == 'GET') {
                var purRec = record.load({
                    type: recType,
                    id: 10517
                });
                // var vendor = purRec.getValue({ //Get employee ID
                //     fieldId: "entity"
                // });

                // if (vendor) {
                //     //load employee record
                //     var venRec = record.load({
                //         type: 'vendor',
                //         id: vendor
                //     });
                //     empFname = venRec.getValue({
                //         fieldId: "entityid"
                //     });
                // }

				var xml ='<?xml version="1.0"?>';
				xml+='<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
				xml+='<pdf>';
				xml+='<head>';
				// xml+='	<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
				// xml+='	<#if .locale == "zh_CN">';
				// xml+='		<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';
				// xml+='	<#elseif .locale == "zh_TW">';
				// xml+='		<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';
				// xml+='	<#elseif .locale == "ja_JP">';
				// xml+='		<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';
				// xml+='	<#elseif .locale == "ko_KR">';
				// xml+='		<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';
				// xml+='	<#elseif .locale == "th_TH">';
				// xml+='		<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';
				// xml+='	</#if>';
				// xml+='    <macrolist>';
				// xml+='        <macro id="nlheader">';
				// xml+='            <table class="header" style="width: 100%;"><tr>';
				// xml+='	<td rowspan="3"><#if companyInformation.logoUrl?length != 0><img src="${companyInformation.logoUrl}" style="float: left; margin: 7px" /> </#if> <span class="nameandaddress">${companyInformation.companyName}</span><br /><span class="nameandaddress">${companyInformation.addressText}</span></td>';
				// xml+='	<td align="right"><span class="title">${record}</span></td>';
				// xml+='	</tr>';
				// xml+='	<tr>';
				// xml+='	<td align="right"><span class="number">#${record.tranid}</span></td>';
				// xml+='	</tr>';
				// xml+='	<tr>';
				// xml+='	<td align="right">${record.trandate}</td>';
				// xml+='	</tr></table>';
				// xml+='        </macro>';
				// xml+='        <macro id="nlfooter">';
				// xml+='            <table class="footer" style="width: 100%;"><tr>';
				// xml+='	<td><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>';
				// xml+='	<td align="right"><pagenumber/> of <totalpages/></td>';
				// xml+='	</tr></table>';
				// xml+='        </macro>';
				// xml+='    </macrolist>';
				xml+='    <style type="text/css">* {';
				xml+='		<#if .locale == "zh_CN">';
				xml+='			font-family: NotoSans, NotoSansCJKsc, sans-serif;';
				xml+='		<#elseif .locale == "zh_TW">';
				xml+='			font-family: NotoSans, NotoSansCJKtc, sans-serif;';
				xml+='		<#elseif .locale == "ja_JP">';
				xml+='			font-family: NotoSans, NotoSansCJKjp, sans-serif;';
				xml+='		<#elseif .locale == "ko_KR">';
				xml+='			font-family: NotoSans, NotoSansCJKkr, sans-serif;';
				xml+='		<#elseif .locale == "th_TH">';
				xml+='			font-family: NotoSans, NotoSansThai, sans-serif;';
				xml+='		<#else>';
				xml+='			font-family: NotoSans, sans-serif;';
				xml+='		</#if>';
				xml+='		}';
				xml+='		table {';
				xml+='			font-size: 9pt;';
				xml+='			table-layout: fixed;';
				xml+='		}';
				xml+='        th {';
				xml+='            font-weight: bold;';
				xml+='            font-size: 8pt;';
				xml+='            vertical-align: middle;';
				xml+='            padding: 5px 6px 3px;';
				xml+='            background-color: #e3e3e3;';
				xml+='            color: #333333;';
				xml+='        }';
				xml+='        td {';
				xml+='            padding: 4px 6px;';
				xml+='        }';
				xml+='		  td p { align:left }';
				xml+='        b {';
				xml+='            font-weight: bold;';
				xml+='            color: #333333;';
				xml+='        }';
				xml+='        table.header td {';
				xml+='            padding: 0;';
				xml+='            font-size: 10pt;';
				xml+='        }';
				xml+='        table.footer td {';
				xml+='            padding: 0;';
				xml+='            font-size: 8pt;';
				xml+='        }';
				xml+='        table.itemtable th {';
				xml+='            padding-bottom: 10px;';
				xml+='            padding-top: 10px;';
				xml+='        }';
				xml+='        table.body td {';
				xml+='            padding-top: 2px;';
				xml+='        }';
				xml+='        table.total {';
				xml+='            page-break-inside: avoid;';
				xml+='        }';
				xml+='        tr.totalrow {';
				xml+='            background-color: #e3e3e3;';
				xml+='            line-height: 200%;';
				xml+='        }';
				xml+='        td.totalboxtop {';
				xml+='            font-size: 12pt;';
				xml+='            background-color: #e3e3e3;';
				xml+='        }';
				xml+='        td.addressheader {';
				xml+='            font-size: 8pt;';
				xml+='            padding-top: 6px;';
				xml+='            padding-bottom: 2px;';
				xml+='        }';
				xml+='        td.address {';
				xml+='            padding-top: 0;';
				xml+='        }';
				xml+='        td.totalboxmid {';
				xml+='            font-size: 28pt;';
				xml+='            padding-top: 20px;';
				xml+='            background-color: #e3e3e3;';
				xml+='        }';
				xml+='        td.totalboxbot {';
				xml+='            background-color: #e3e3e3;';
				xml+='            font-weight: bold;';
				xml+='        }';
				xml+='        span.title {';
				xml+='            font-size: 28pt;';
				xml+='        }';
				xml+='        span.number {';
				xml+='            font-size: 16pt;';
				xml+='        }';
				xml+='        span.itemname {';
				xml+='            font-weight: bold;';
				xml+='            line-height: 150%;';
				xml+='        }';
				xml+='        hr {';
				xml+='            width: 100%;';
				xml+='            color: #d3d3d3;';
				xml+='            background-color: #d3d3d3;';
				xml+='            height: 1px;';
				xml+='        }';
				xml+='</style>';
				xml+='</head>';
				xml+='<body header="nlheader" header-height="10%" footer="nlfooter" footer-height="20pt" padding="0.5in 0.5in 0.5in 0.5in" size="Letter">';
				// xml+='    <table style="width: 100%;"><tr>';
				// xml+='	<td class="addressheader" colspan="6"><b>${record.billaddress}</b></td>';
				// xml+='	<td class="totalboxtop" colspan="5"><b>${record.total?upper_case}</b></td>';
				// xml+='	</tr>';
				// xml+='	<tr>';
				// xml+='	<td class="address" colspan="6" rowspan="2">${record.billaddress}</td>';
				// xml+='	<td align="right" class="totalboxmid" colspan="5">${record.total}</td>';
				// xml+='	</tr>';
				// xml+='	<tr>';
				// xml+='	<td align="right" class="totalboxbot" colspan="5"><b>${record.duedate}:</b> ${record.duedate}</td>';
				// xml+='	</tr></table>';
				// xml+='';
				// xml+='<table class="body" style="width: 100%;"><tr>';
				// xml+='	<th>${record.duedate}</th>';
				// xml+='	<th>${record.otherrefnum}</th>';
				// xml+='	<th>${record.billphone}</th>';
				// xml+='	</tr>';
				// xml+='	<tr>';
				// xml+='	<td>${record.duedate}</td>';
				// xml+='	<td>${record.otherrefnum}</td>';
				// xml+='	<td>${record.billphone}</td>';
				// xml+='	</tr></table>';
				// xml+='<#if record.item?has_content>';
				// xml+='';
				// xml+='<table class="itemtable" style="width: 100%;"><!-- start items --><#list record.item as item><#if item_index==0>';
				// xml+='<thead>';
				// xml+='	<tr>';
				// xml+='	<th align="center" colspan="3">${item.quantity}</th>';
				// xml+='	<th colspan="12">${item.item}</th>';
				// xml+='	<th colspan="3">${item.options}</th>';
				// xml+='	<th align="right" colspan="4">${item.rate}</th>';
				// xml+='	<th align="right" colspan="4">${item.amount}</th>';
				// xml+='	</tr>';
				// xml+='</thead>';
				// xml+='</#if><tr>';
				// xml+='	<td align="center" colspan="3" line-height="150%">${item.quantity}</td>';
				// xml+='	<td colspan="12"><span class="itemname">${item.item}</span><br />${item.description}</td>';
				// xml+='	<td colspan="3">${item.options}</td>';
				// xml+='	<td align="right" colspan="4">${item.rate}</td>';
				// xml+='	<td align="right" colspan="4">${item.amount}</td>';
				// xml+='	</tr>';
				// xml+='	</#list><!-- end items --></table>';
				// xml+='</#if><#if record.expense?has_content>';
				// xml+='';
				// xml+='<table class="itemtable" style="width: 100%;"><!-- start expenses --><#list record.expense as expense ><#if expense_index==0>';
				// xml+='<thead>';
				// xml+='	<tr>';
				// xml+='	<th colspan="12">${expense.category}</th>';
				// xml+='	<th colspan="10">${expense.account}</th>';
				// xml+='	<th align="right" colspan="4">${expense.amount}</th>';
				// xml+='	</tr>';
				// xml+='</thead>';
				// xml+='</#if><tr>';
				// xml+='	<td colspan="12">${expense.category}</td>';
				// xml+='	<td colspan="10"><span class="itemname">${expense.account}</span></td>';
				// xml+='	<td align="right" colspan="4">${expense.amount}</td>';
				// xml+='	</tr>';
				// xml+='	</#list><!-- end expenses --></table>';
				// xml+='</#if>';
				// xml+='';
				// xml+='<hr />';
				// xml+='<table class="total" style="width: 100%;"><tr class="totalrow">';
				// xml+='	<td background-color="#ffffff" colspan="4">&nbsp;</td>';
				// xml+='	<td align="right"><b>${record.total}</b></td>';
				// xml+='	<td align="right">${record.total}</td>';
				// xml+='	</tr></table>';
				xml+='</body>';
				xml+='</pdf>';
				context.response.renderPdf({
					xmlString: xml
				});
			}
		}
		return {
			onRequest: onRequest
		};
	});