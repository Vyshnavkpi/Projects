/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
// This sample shows how to render search results into a PDF file.
define(['N/render', 'N/search','N/file','N/log'], function(render, search,file,log) {
    function onRequest(options) {
        var request = options.request;
        var response = options.response;

        

        var rectype="customrecord_student";
        var col=[];
        var fil=[];

        // col.push(search.createColumn({
        //     name:'custrecord_student_studentid',
 
        // }));

        col.push(search.createColumn({
            name:'custrecord_student_studentid',
 
        }));

        col.push(search.createColumn({
            name:'custrecord_student_studentname',
 
        }));
        


        // fil.push(search.createFilter({
        //     name:"internalId",
        //     operator: search.Operator.IS,
        //     values: 1
        // }))
      

      

       var stuSearchObj = {};
       stuSearchObj.type = rectype;
       stuSearchObj.columns = col;
       stuSearchObj.filters = fil;

       var stuSearch = search.create(stuSearchObj);
       var stuResultSet = stuSearch.run();
       var results = stuResultSet.getRange(0,10);
       log.debug("results",results)
        blogEntries=[];
        blogEntry={}

        for(var i=0;i<results.length;i++)
        {
             blogEntry={
               id:results[i].getValue('custrecord_student_studentid'),
               name:results[i].getValue('custrecord_student_studentname')
            }
                     blogEntries.push(blogEntry);

            
        }
        // blogEntries.push(blogEntry);

        var datasource={
            blogEntries : blogEntries
        }

       var templateFile=file.load('Templates/PDF Templates/exampleName.html');
       var pageRenderer = render.create();
       pageRenderer.templateContent = templateFile.getContents();


       pageRenderer.addCustomDataSource({
           format : render.DataSource.OBJECT,
           alias : 'ds',
           data : datasource
       })
       
       

    //  var results = rs.getRange(0, 1000);
        // var renderer = render.create();
        // renderer.templateContent = xmlStr;
        // renderer.addSearchResults({
        //     templateName: 'Dhanush1',
        //     searchResult: results
        // });

        var renderedpage = pageRenderer.renderAsString();
        response.write(renderedpage);
    }

    return {
        onRequest: onRequest
    };
});