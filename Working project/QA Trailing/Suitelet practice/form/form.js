/**
 *@NApiVersion 2.0
 *@NModuleScope Public
 *@NScriptType Suitelet
 
 * Module Description
 * Deployment for RENTEGRATE_BulkPreview_suitelet on ROBD Details action
 * Includes rentOnRequestAction
 *
 * Version    Date            Author        Remarks
 * 1.0.0      08 Jul 2020     Sanath        Created for employee profile
 */
define(['N/log', 'N/ui/serverWidget', 'N/record', 'N/search', 'N/task', 'N/redirect', 'N/runtime', '../Modules/PRSUITE_module.js'],

    function (log, serverWidget, record, search, task, redirect, runtime, prsuite) {

     /**
      * Definition of the Suitelet script trigger point.
      *
      * @param {Object} context
      * @param {ServerRequest} context.request - Encapsulation of the incoming request
      * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
      * @Since 2015.2
      */function OnRequestAction(context) {
            if (context.request.method == 'GET') {
                var currentUserId = runtime.getCurrentUser().id;
                log.debug("currentUserId", currentUserId)

                var form = serverWidget.createForm({
                    title: 'Student Information'
                });
                form.addFieldGroup({
                    id: '_examplefieldgroup',
                    label: 'Student Details'
                });

                var emp_name = form.addField({
                    id: 'studpage__name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'student_Name',
                    source: 'studrecord_stud_name',
                    container: '_examplefieldgroup'
                });

                var emp_id = form.addField({
                    id: 'studpage__id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Student_Id',
                    container: '_examplefieldgroup'
                });
                var dateofbirth = form.addField({
                    id: 'studpage_dateof_birth',
                    type: serverWidget.FieldType.DATE,
                    label: 'DateOfBirth',
                    container: '_examplefieldgroup'
                });
                var age = form.addField({
                    id: 'studpage_age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age',
                    container: '_examplefieldgroup'
                });

                // -----------------RADIO BUTTON----------------------------------------------------------
                //for radio button
                form.addField({
                    id: 'inventoryfield',
                    type: serverWidget.FieldType.LABEL,
                    label: 'Gender',
                    container: '_examplefieldgroup'
                });
                form.addField({
                    id: 'custpage_rdoproductrating',
                    type: serverWidget.FieldType.RADIO,
                    label: 'Male',
                    source: 'p1',
                    container: '_examplefieldgroup'
                }).updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });
                form.addField({
                    id: 'custpage_rdoproductrating',
                    type: serverWidget.FieldType.RADIO,
                    label: 'Female',
                    source: 'p2',
                    container: '_examplefieldgroup'
                }).updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });
                // ---------------------------------------------------------------------------

                var address = form.addField({
                    id: 'studpage_address',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Address',
                    container: '_examplefieldgroup'
                });
                form.addFieldGroup({
                    id: '_examplefieldgroupeducation',
                    label: 'Education Details'
                });
                var qualification = form.addField({
                    id: 'studpage_account_branch',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Qualification',
                    container: '_examplefieldgroupeducation'
                });
                qualification.isMandatory = true;

                qualification.addSelectOption({
                    value: '0',
                    text: '',
                    isSelected: true
                });
                qualification.addSelectOption({
                    value: '1',
                    text: 'BE'
                });
                qualification.addSelectOption({
                    value: '2',
                    text: 'ME'
                });
                qualification.addSelectOption({
                    value: '3',
                    text: 'BCA'
                });
                qualification.addSelectOption({
                    value: '4',
                    text: 'MCA',
                    isSelected: true
                });
                var percentage = form.addField({
                    id: 'studpage_account_num',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Percentage',
                    container: '_examplefieldgroupeducation'
                });
                var cgpa = form.addField({
                    id: 'studpage_branch_loc',
                    type: serverWidget.FieldType.TEXT,
                    label: 'CGPA',
                    container: '_examplefieldgroupeducation'
                });

                qualification.isMandatory = true;

                form.addFieldGroup({
                    id: '_examplefieldgroupcontactdetails',
                    label: 'Contact Details'
                });
                var contact_name = form.addField({
                    id: 'studpage_contact_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Contact Name',
                    container: '_examplefieldgroupcontactdetails'
                });

                var dateofbirth = form.addField({
                    id: 'studpage_student_dateof_birth',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date Of Birth',
                    container: '_examplefieldgroupcontactdetails'
                });

                var contactid = form.addField({
                    id: 'studpage_student_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Contact ID',
                    container: '_examplefieldgroupcontactdetails'
                });
                var customerphone = form.addField({
                    id: 'studpage_student_phone',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Phone',
                    container: '_examplefieldgroupcontactdetails'
                });
                // --------------PARENT DETAILS-------------------------------------------------------------
                form.addFieldGroup({
                    id: '_examplefieldgroupparentdetails',
                    label: 'Parent Details'
                });
                var contact_name = form.addField({
                    id: 'parpage_parent_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Parent Name',
                    container: '_examplefieldgroupparentdetails'
                });

                var dateofbirth = form.addField({
                    id: 'parpage_parent_dateof_birth',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date Of Birth',
                    container: '_examplefieldgroupparentdetails'
                });

                var contactid = form.addField({
                    id: 'parpage_parent_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Email ID',
                    container: '_examplefieldgroupparentdetails'
                });
                var customerphone = form.addField({
                    id: 'parpage_parent_phone',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Phone No :',
                    container: '_examplefieldgroupparentdetails'
                });

                // -------------------------------------------------------------------------

                // ---------------------SUBLIST-----------------------------------------------
                var sublist = form.addSublist({
                    id: 'sublist',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'BANK DETAILS'
                });
                sublist.addField({
                    id: 'sublist4',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name :'
                });

                sublist.addField({
                    id: 'sublist2',
                    type: serverWidget.FieldType.TEXT,
                    label: 'ACC NO :'
                });
                sublist.addField({
                    id: 'sublist1',
                    type: serverWidget.FieldType.TEXT,
                    label: 'IFSC CODE'
                });
                sublist.addField({
                    id: 'sublist3',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Bank Email id'
                });
                // --------------------------------------------------------------------
                // record.setSublistText({
                //     sublistId: 'customrecord_vist_1',
                //     fieldId: 'custrecord_emp_add',
                //     text: 'mangalore'
                // });
                // var employeeLookup = search.lookupFields({

                //     type: 'customrecord_emp_leave_details',//custom record id from where you want to fetch the data

                //     id: currentUserId,

                //     columns: ['custrecord_emp_id']

                // });

                // var employeename = employeeLookup["custrecord_emp_name"];

                // if (employeename) {

                //     emp_name.defaultValue = employeename;

                // }
                // var empRecType = 'customrecord_bankcustdet';
                // var columns = [];
                // columns.push(search.createColumn({
                //     name: 'custrecord_custnam',
                // }));

                // columns.push(search.createColumn({
                //     name: 'custrecord_custiid',

                // }));
                // var filters = [];
                // form.addSubmitButton({
                //     label: "submit"
                // })

                context.response.writePage(form);

            }

        }

        return {
            onRequest: OnRequestAction
        };

    });