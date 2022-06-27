function beforeload(type) {
    nlapiSetFieldValue("custrecord1437","Mangalore")
    nlapiSetFieldValue("custrecord1434","Vyshnav")
}

function beforesubmit(type) {

   var name =  nlapiGetFieldValue("custrecord1436");

   name = name+"_bfsubmit"; 

   nlapiSetFieldValue("custrecord1436","8075733826");

}

function aftersubmit(type) { 

    nlapiSendEmail('1723', 'vyshnav@kpi.co', 'After Submit', 'Data Submitted Successfully', null, null, null, null);

}
