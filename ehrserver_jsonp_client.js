/*
 * WARNING: this is a test and references a deprecated API, use the ehrserver_ajax_client.js
 */

var ehrserver_jsonp_client = {

   base_url: undefined,
   get_patients: "/api/v1/patientList?format=json&callback=?",
   get_patient: "/api/v1/getPatient?uid=${uid}&format=json&callback=?",
   get_ehrs: "/api/v1/ehrList?format=json&callback=?",
   get_ehr: "/api/v1/ehrGet?ehrUid=${uid}&format=json&callback=?",
   get_ehr_for_patient: "/api/v1/ehrForSubject?subjectUid=${uid}&format=json&callback=?",
   get_queries: "/api/v1/queryList?format=json&callback=?",
   
   init: function(url) {
     this.base_url = url;
   },
   patients: function (callback) {
     $.getJSON(this.base_url + this.get_patients, null, function(data) {  
       console.log( data );
       callback(data);
     }); 
   },
   patient: function (patient_uid, callback) {
     $.getJSON(this.base_url + this.get_patient.replace("${uid}", patient_uid), null, function(data) {  
       console.log( data );
       callback(data);
     }); 
   },
   ehrs: function (callback) {
     $.getJSON(this.base_url + this.get_ehrs, null, function(data) {  
       console.log( data );
       callback(data);
     }); 
   },
   ehr: function (ehr_uid, callback) {
     $.getJSON(this.base_url + this.get_ehr.replace("${uid}", ehr_uid), null, function(data) {  
       console.log( data );
       callback(data);
     }); 
   },
   ehr_for_patient: function (patient_uid, callback) {
     $.getJSON(this.base_url + this.get_ehr_for_patient.replace("${uid}", patient_uid), null, function(data) {  
       console.log( data );
       callback(data);
     });
   },
   queries: function (callback) {
     $.getJSON(this.base_url + this.get_queries, null, function(data) {  
       console.log( data );
       callback(data);
     });
   }
};
