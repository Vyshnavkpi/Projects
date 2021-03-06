function printNewLH(request, response) {
    var invID = request.getParameter("recid");
    var purchRec = nlapiLoadRecord('vendorbill', 10513);
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
    template += '            <table class="header" style="width: 100%;"><tr>';
    template += '	<td rowspan="3"><#if companyInformation.logoUrl?length != 0><img src="${companyInformation.logoUrl}" style="float: left; margin: 7px" /> </#if> <span class="nameandaddress">${companyInformation.companyName}</span><br /><span class="nameandaddress">${companyInformation.addressText}</span></td>';
    template += '	<td align="right"><span class="title">${record@title}</span></td>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td align="right"><span class="number">#${record.transactionnumber}</span></td>';
    template += '	</tr>';
    template += '	<tr>';
    template += '	<td align="right">${record.trandate}</td>';
    template += '	</tr></table>';
    template += '        </macro>';
    template += '        <macro id="nlfooter">';
    template += '            <table class="footer"><tr>';
    template += '	<td align="right"><pagenumber/> of <totalpages/></td>';
    template += '	</tr></table>';
    template += '        </macro>';
    template += '    </macrolist>';
    template += '    <style type="text/css">* {';
    template += '			<#if .locale == "zh_CN">';
    template += '				font-family: NotoSans, NotoSansCJKsc, sans-serif;';
    template += '			<#elseif .locale == "zh_TW">';
    template += '				font-family: NotoSans, NotoSansCJKtc, sans-serif;';
    template += '			<#elseif .locale == "ja_JP">';
    template += '				font-family: NotoSans, NotoSansCJKjp, sans-serif;';
    template += '			<#elseif .locale == "ko_KR">';
    template += '				font-family: NotoSans, NotoSansCJKkr, sans-serif;';
    template += '			<#elseif .locale == "th_TH">';
    template += '				font-family: NotoSans, NotoSansThai, sans-serif;';
    template += '			<#else>';
    template += '				font-family: NotoSans, sans-serif;';
    template += '			</#if>';
    template += '			}';
    template += '			table {';
    template += '				font-size: 9pt;';
    template += '				table-layout: fixed;';
    template += '			}';
    template += '			th {';
    template += '				font-weight: bold;';
    template += '				font-size: 8pt;';
    template += '				vertical-align: middle;';
    template += '				padding: 5px 6px 3px;';
    template += '				background-color: #e3e3e3;';
    template += '				color: #333333;';
    template += '			}';
    template += '			td {';
    template += '				padding: 4px 6px;';
    template += '			}';
    template += '			td p { align:left }';
    template += '			b {';
    template += '				font-weight: bold;';
    template += '				color: #333333;';
    template += '			}';
    template += '			table.header td {';
    template += '				padding: 0;';
    template += '				font-size: 10pt;';
    template += '			}';
    template += '			table.footer td {';
    template += '				padding: 0;';
    template += '				font-size: 8pt;';
    template += '			}';
    template += '			table.itemtable th {';
    template += '				padding-bottom: 10px;';
    template += '				padding-top: 10px;';
    template += '			}';
    template += '			table.body td {';
    template += '				padding-top: 2px;';
    template += '			}';
    template += '			table.total {';
    template += '				page-break-inside: avoid;';
    template += '			}';
    template += '			span.title {';
    template += '				font-size: 28pt;';
    template += '			}';
    template += '			span.tabletitle {';
    template += '				font-size: 16pt;';
    template += '			}';
    template += '			span.transactionheader {';
    template += '				font-size: 10pt;';
    template += '			}';
    template += '			span.number {';
    template += '				font-size: 16pt;';
    template += '			}';
    template += '			hr {';
    template += '				width: 100%;';
    template += '				color: #d3d3d3;';
    template += '				background-color: #d3d3d3;';
    template += '				height: 1px;';
    template += '			}';
    template += '</style>';
    template += '</head>';
    template += '<body header="nlheader" header-height="10%" footer="nlfooter" footer-height="10pt" padding="0.5in 0.5in 0.5in 0.5in" size="Letter">';
    template += '    <!-- start transaction header -->';
    template += '<table class="itemtable" style="width: 100%; margin-top: 10px;"><tr>';
    template += '	<td style="margin-top: 40px;"><span class="transactionheader"><b>${record.entity@label}:</b>&nbsp;${record.entity}</span></td>';
    template += '	</tr>';
    template += '	<#if preferences.SUBSIDIARIES>';
    template += '	<tr>';
    template += '	<td><span class="transactionheader"><b>${record.subsidiary@label}:</b>&nbsp;${record.subsidiary}</span></td>';
    template += '	</tr>';
    template += '	</#if>';
    template += '	<tr>';
    template += '	<td><span class="transactionheader"><b>${record.duedate@label}:</b>&nbsp;${record.duedate}</span></td>';
    template += '	</tr>';
    template += '	<#if record.terms?has_content>';
    template += '	<tr>';
    template += '	<td><span class="transactionheader"><b>${record.terms@label}:</b>&nbsp;${record.terms}</span></td>';
    template += '	</tr>';
    template += '	</#if></table>';
    template += '<!-- end transaction header --><!-- start items/expenses --><#if (record.item?is_collection && record.item?has_content) || (record.expense?is_collection && record.expense?has_content)><#if (record.item?is_collection && record.item?has_content) && (record.expense?is_collection && record.expense?has_content)><!-- both items and expenses machine have content --><span class="tabletitle">${record.item@label}/${record.expense@label}</span>';
    template += '';
    template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
    template += '<thead>';
    template += '	<tr>';
    template += '	<th colspan="2">${record.item[0].item@label}/${record.expense[0].account@label}</th>';
    template += '	<th>${record.item[0].quantity@label}</th>';
    template += '	<th align="right">${record.item[0].taxrate1@label}</th>';
    template += '	<#if record.item[0].tax1amt@label?length != 0>';
    template += '	<th align="right">${record.item[0].tax1amt@label}</th>';
    template += '	</#if><#if record.item[0].taxrate2@label?length != 0>';
    template += '	<th align="right">${record.item[0].taxrate2@label}</th>';
    template += '	</#if>';
    template += '	<th align="right">${record.item[0].rate@label}</th>';
    template += '	<th align="right">${record.item[0].amount@label}</th>';
    template += '	</tr>';
    template += '</thead>';
    template += '<!-- start items --><#list record.item as item><tr>';
    template += '	<td colspan="2">${item.item}</td>';
    template += '	<td>${item.quantity}</td>';
    template += '	<td align="right">${item.taxrate1}</td>';
    template += '	<#if item.tax1amt?has_content>';
    template += '	<td align="right">${item.tax1amt}</td>';
    template += '	</#if><#if item.taxrate2?has_content>';
    template += '	<td align="right">${item.taxrate2}</td>';
    template += '	</#if>';
    template += '	<td align="right">${item.rate}</td>';
    template += '	<td align="right">${item.amount}</td>';
    template += '	</tr>';
    template += '	</#list><!-- start expenses --><#list record.expense as expense>';
    template += '	<tr>';
    template += '	<td colspan="2">${expense.account}</td>';
    template += '	<td>&nbsp;</td>';

    template += '	<td align="right">${expense.taxrate1}</td>';
    template += '	<#if expense.tax1amt?has_content>';
    template += '	<td align="right">${expense.tax1amt}</td>';
    template += '	</#if><#if expense.taxrate2?has_content>';
    template += '	<td align="right">${expense.taxrate2}</td>';
    template += '	</#if>';
    template += '	<td>&nbsp;</td>';

    template += '	<td align="right">${expense.amount}</td>';
    template += '	</tr>';
    template += '	</#list></table>';
    template += '<#elseif record.item?is_collection && record.item?has_content> <!-- only items machine have content --> <span class="tabletitle">${record.item@label}</span>';
    template += '';
    template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
    template += '<thead>';
    template += '	<tr>';
    template += '	<th colspan="2">${record.item[0].item@label}</th>';
    template += '	<th>${record.item[0].quantity@label}</th>';
    template += '	<th align="right">${record.item[0].taxrate1@label}</th>';
    template += '	<#if record.item[0].tax1amt@label?length != 0>';
    template += '	<th align="right">${record.item[0].tax1amt@label}</th>';
    template += '	</#if><#if record.item[0].taxrate2@label?length != 0>';
    template += '	<th align="right">${record.item[0].taxrate2@label}</th>';
    template += '	</#if>';
    template += '	<th align="right">${record.item[0].rate@label}</th>';
    template += '	<th align="right">${record.item[0].amount@label}</th>';
    template += '	</tr>';
    template += '</thead>';
    template += '<!-- start items --><#list record.item as item><tr>';
    template += '	<td colspan="2">${item.item}</td>';
    template += '	<td>${item.quantity}</td>';
    template += '	<td align="right">${item.taxrate1}</td>';
    template += '	<#if item.tax1amt?has_content>';
    template += '	<td align="right">${item.tax1amt}</td>';
    template += '	</#if><#if item.taxrate2?has_content>';
    template += '	<td align="right">${item.taxrate2}</td>';
    template += '	</#if>';
    template += '	<td align="right">${item.rate}</td>';
    template += '	<td align="right">${item.amount}</td>';
    template += '	</tr>';
    template += '	</#list></table>';
    template += '<#else> <!-- only expenses machine have content --> <span class="tabletitle">${record.expense@label}</span>';
    template += '';
    template += '<table class="itemtable" style="width: 100%; margin-top: 10px;">';
    template += '<thead>';
    template += '	<tr>';
    template += '	<th colspan="2">${record.expense[0].account@label}</th>';
    template += '	<th align="right">${record.expense[0].taxrate1@label}</th>';
    template += '	<#if record.expense[0].tax1amt@label?length != 0>';
    template += '	<th align="right">${record.expense[0].tax1amt@label}</th>';
    template += '	</#if><#if record.expense[0].taxrate2@label?length != 0>';
    template += '	<th align="right">${record.expense[0].taxrate2@label}</th>';
    template += '	</#if>';
    template += '	<th align="right">${record.expense[0].amount@label}</th>';
    template += '	</tr>';
    template += '</thead>';
    template += '<!-- start expenses --><#list record.expense as expense><tr>';
    template += '	<td colspan="2">${expense.account}</td>';
    template += '	<td align="right">${expense.taxrate1}</td>';
    template += '	<#if expense.tax1amt?has_content>';
    template += '	<td align="right">${expense.tax1amt}</td>';
    template += '	</#if><#if expense.taxrate2?has_content>';
    template += '	<td align="right">${expense.taxrate2}</td>';
    template += '	</#if>';
    template += '	<td align="right">${expense.amount}</td>';
    template += '	</tr>';
    template += '	</#list></table>';
    template += '</#if>';
    template += '';
    template += '<hr /> <!-- start items/expenses total -->';
    template += '<table class="total" style="width: 100%; margin-top: 10px;"><#if record.taxtotal?has_content><tr>';
    template += '	<td colspan="4">&nbsp;</td>';
    template += '	<th align="right">${record.taxtotal@label}</th>';
    template += '	<td align="right">${record.taxtotal}</td>';
    template += '	</tr>';
    template += '	</#if><#if record.tax2total?has_content>';
    template += '	<tr>';
    template += '	<td colspan="4">&nbsp;</td>';
    template += '	<th align="right">${record.tax2total@label}</th>';
    template += '	<td align="right">${record.tax2total}</td>';
    template += '	</tr>';
    template += '	</#if>';
    template += '	<tr>';
    template += '	<td colspan="4">&nbsp;</td>';
    template += '	<th align="right">${record.usertotal@label}</th>';
    template += '	<td align="right">${record.usertotal}</td>';
    template += '	</tr></table>';
    template += '<!-- end items/expenses total --> </#if> <!-- end items/expenses -->';
    template += '</body>';
    template += '</pdf>';
    renderer.setTemplate(template);
    renderer.addRecord('record', purchRec);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'vendorbill' + purchRec.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}