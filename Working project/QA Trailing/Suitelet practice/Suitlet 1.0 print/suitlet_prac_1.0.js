function printNewLH(request, response) {
    var invID = request.getParameter("recid");
    var purchRec = nlapiLoadRecord('salesorder', 9532);
    var renderer = nlapiCreateTemplateRenderer();
    var template = '';
    template += '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
    template += '<pdf>';
    template += '<head>';
    template += '	<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
    template += '	<#if .locale == "zh_CN">';
    template += '		<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';
    template += '	<#elseif .locale == "zh_TW">';
    template += '		<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';
    template += '	<#elseif .locale == "ja_JP">';
    template += '		<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';
    template += '	<#elseif .locale == "ko_KR">';
    template += '		<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';
    template += '	<#elseif .locale == "th_TH">';
    template += '		<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';
    template += '	</#if>';
    template += '    <macrolist>';
    template += '        <macro id="nlheader">';
    template += '            <table style="width: 100%; font-size: 10pt;"><tr>';
    template += '	<td rowspan="3" style="padding: 0;"><#if companyInformation.logoUrl?length != 0><img src="${companyInformation.logoUrl}" style="float: left; margin: 7px" /> </#if> ${companyInformation.companyName}<br />${companyInformation.addressText}</td>';
    template += '	<td align="right" style="padding: 0;"><span style="font-size: 28pt;">${record@title}</span></td>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td align="right" style="padding: 0;"><span style="font-size: 16pt;">#${record.tranid}</span></td>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td align="right" style="padding: 0;">${record.trandate}</td>';
    template += '	</tr></table>';
    template += '        </macro>';
    template += '        <macro id="nlfooter">';
    template += '            <table style="width: 100%; font-size: 8pt;"><tr>';
    template += '	<td style="padding: 0;"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>';
    template += '	<td align="right" style="padding: 0;"><pagenumber/> of <totalpages/></td>';
    template += '	</tr></table>';
    template += '        </macro>';
    template += '    </macrolist>';
    template += '    <style type="text/css">* {';
    template += '		<#if .locale == "zh_CN">';
    template += '			font-family: NotoSans, NotoSansCJKsc, sans-serif;';
    template += '		<#elseif .locale == "zh_TW">';
    template += '			font-family: NotoSans, NotoSansCJKtc, sans-serif;';
    template += '		<#elseif .locale == "ja_JP">';
    template += '			font-family: NotoSans, NotoSansCJKjp, sans-serif;';
    template += '		<#elseif .locale == "ko_KR">';
    template += '			font-family: NotoSans, NotoSansCJKkr, sans-serif;';
    template += '		<#elseif .locale == "th_TH">';
    template += '			font-family: NotoSans, NotoSansThai, sans-serif;';
    template += '		<#else>';
    template += '			font-family: NotoSans, sans-serif;';
    template += '		</#if>';
    template += '		}';
    template += '		table {';
    template += '			font-size: 9pt;';
    template += '			table-layout: fixed;';
    template += '		}';
    template += '        th {';
    template += '            font-weight: bold;';
    template += '            font-size: 8pt;';
    template += '            vertical-align: middle;';
    template += '            padding: 5px 6px 3px;';
    template += '            background-color: #e3e3e3;';
    template += '            color: #333333;';
    template += '        }';
    template += '        td {';
    template += '            padding: 4px 6px;';
    template += '        }';
    template += '		td p { align:left }';
    template += '</style>';
    template += '</head>';
    template += '<body header="nlheader" header-height="10%" footer="nlfooter" footer-height="20pt" padding="0.5in 0.5in 0.5in 0.5in" size="Letter">';
    template += '    <table style="width: 100%; margin-top: 10px;"><tr>';
    template += '	<td colspan="3" style="font-size: 8pt; padding: 40px 0 2px; font-weight: bold; color: #333333;">${record.billaddress@label}</td>';
    template += '	<td colspan="3" style="font-size: 8pt; padding: 40px 0 2px; font-weight: bold; color: #333333;">${record.shipaddress@label}</td>';
    template += '	<td colspan="5" style="font-size: 12pt; background-color: #e3e3e3; font-weight: bold;">${record.total@label?upper_case}</td>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td colspan="3" style="padding: 0;">${record.billaddress}</td>';
    template += '	<td colspan="3" style="padding: 0;">${record.shipaddress}</td>';
    template += '	<td align="right" colspan="5" style="font-size: 28pt; padding-top: 20px; background-color: #e3e3e3;">${record.total}</td>';
    template += '	</tr></table>';
    template += '';
    template += '<table style="width: 100%; margin-top: 10px;"><tr>';
    template += '	<th>${record.paymentmethod@label}</th>';
    template += '	<th>${record.otherrefnum@label}</th>';
    template += '	<th>${record.shipmethod@label}</th>';
    template += '	<th>${record.shipdate@label}</th>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td style="padding-top: 2px;">${record.paymentmethod}</td>';
    template += '	<td style="padding-top: 2px;">${record.otherrefnum}</td>';
    template += '	<td style="padding-top: 2px;">${record.shipmethod}</td>';
    template += '	<td style="padding-top: 2px;">${record.shipdate}</td>';
    template += '	</tr></table>';
    template += '<#if record.item?has_content>';
    template += '';
    template += '<table style="width: 100%; margin-top: 10px;"><!-- start items --><#list record.item as item><#if item_index==0>';
    template += '<thead>';
    template += '	<tr>';
    template += '	<th align="center" colspan="3" style="padding: 10px 6px;">${item.quantity@label}</th>';
    template += '	<th colspan="12" style="padding: 10px 6px;">${item.item@label}</th>';
    template += '	<th align="right" colspan="4" style="padding: 10px 6px;">${item.rate@label}</th>';
    template += '	<th align="right" colspan="4" style="padding: 10px 6px;">${item.amount@label}</th>';
    template += '	</tr>';
    template += '</thead>';
    template += '</#if><tr>';
    template += '	<td align="center" colspan="3" line-height="150%">${item.quantity}</td>';
    template += '	<td colspan="12"><span style="font-weight: bold; line-height: 150%; color: #333333;">${item.item}</span><br />${item.description}</td>';
    template += '	<td align="right" colspan="4">${item.rate}</td>';
    template += '	<td align="right" colspan="4">${item.amount}</td>';
    template += '	</tr>';
    template += '	</#list><!-- end items --></table>';
    template += '';
    template += '<hr style="width: 100%; color: #d3d3d3; background-color: #d3d3d3; height: 1px;" /></#if>';
    template += '<table style="page-break-inside: avoid; width: 100%; margin-top: 10px;"><tr>';
    template += '	<td colspan="4">&nbsp;</td>';
    template += '	<td align="right" style="font-weight: bold; color: #333333;">${record.subtotal@label}</td>';
    template += '	<td align="right">${record.subtotal}</td>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td colspan="4">&nbsp;</td>';
    template += '	<td align="right" style="font-weight: bold; color: #333333;">${record.taxtotal@label} (${record.taxrate}%)</td>';
    template += '	<td align="right">${record.taxtotal}</td>';
    template += '	</tr>';
    template += '	<tr style="background-color: #e3e3e3; line-height: 200%;">';
    template += '	<td background-color="#ffffff" colspan="4">&nbsp;</td>';
    template += '	<td align="right" style="font-weight: bold; color: #333333;">${record.total@label}</td>';
    template += '	<td align="right">${record.total}</td>';
    template += '	</tr></table>';
    template += '</body>';
    template += '</pdf>';
    renderer.setTemplate(template);
    renderer.addRecord('record', purchRec);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'salesorder' + purchRec.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}