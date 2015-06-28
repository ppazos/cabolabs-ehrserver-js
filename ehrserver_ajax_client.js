var ehrserver_ajax_client = {
 
   base_url: undefined,
   get_patients: "/rest/patientList",
   get_patient: "/rest/getPatient",
   get_ehrs: "/rest/ehrList",
   get_ehr: "/rest/ehrGet",
   get_ehr_for_patient: "/rest/ehrForSubject",
   get_queries: "/rest/queryList",
   
   init: function(url) {
     this.base_url = url;
   },
   patients: function (callback) {
     $.ajax({
       url: this.base_url + this.get_patients,
       method: 'GET',
       data: {format: 'json'}
     })
     .done( function (data) {
       callback(data);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data); // TODO: allow passing an error callback
     });
   },
   patient: function (patient_uid, callback) {
     $.ajax({
       url: this.base_url + this.get_patient,
       method: 'GET',
       data: {uid: patient_uid, format: 'json'}
     })
     .done( function (data) {
       callback(data);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data); // TODO: allow passing an error callback
     });
   },
   ehrs: function (callback) {
     $.ajax({
       url: this.base_url + this.get_ehrs,
       method: 'GET',
       data: {format: 'json'}
     })
     .done( function (data) {
       callback(data);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data); // TODO: allow passing an error callback
     });
   },
   ehr: function (ehr_uid, callback) {     
     $.ajax({
       url: this.base_url + this.get_ehr,
       method: 'GET',
       data: {ehrUid: ehr_uid, format: 'json'}
     })
     .done( function (data) {
       callback(data);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data); // TODO: allow passing an error callback
     });
   },
   ehr_for_patient: function (patient_uid, callback) {
     $.ajax({
       url: this.base_url + this.get_ehr_for_patient,
       method: 'GET',
       data: {subjectUid: patient_uid, format: 'json'}
     })
     .done( function (data) {
       callback(data);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data); // TODO: allow passing an error callback
     });
   },
   queries: function (callback) {
     $.ajax({
       url: this.base_url + this.get_queries,
       method: 'GET',
       data: {format: 'json'}
     })
     .done( function (data) {
       callback(data);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data); // TODO: allow passing an error callback
     });
   }
 };
 