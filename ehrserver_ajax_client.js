var ehrserver_ajax_client = {
 
   base_url: undefined,
   do_login: "/rest/login",
   get_patients: "/rest/patients",
   get_patient: "/rest/patients/",
   get_ehrs: "/rest/ehrs",
   get_ehr: "/rest/ehrs/ehrUid/",
   get_ehr_for_patient: "/rest/ehrs/subjectUid/",
   get_contributions: "/rest/contributions",
   get_queries: "/rest/queries",
   token: undefined, // set by login
   
   init: function(url) {
      
     if (!/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( url ))
     {
       console.log('URL not valid: '+ url);
       return false;
     }
     this.base_url = url.replace(/\/$/, "");
     return true;
   },
   login: function (username, password, organization, callback) {
     $.ajax({
       url: this.base_url + this.do_login,
       method: 'POST',
       data: {username: username, password: password, organization: organization, format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       ehrserver_ajax_client.token = data.token;
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   },
   is_authenticated: function() {
     return ehrserver_ajax_client.token != undefined;
   },
   patients: function (callback) {
     $.ajax({
       url: this.base_url + this.get_patients,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   },
   patient: function (patient_uid, callback) {
     if (!patient_uid)
     {
        console.log("patient_uid is required");
        return false;
     }
     $.ajax({
       url: this.base_url + this.get_patient + patient_uid,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
     return true;
   },
   ehrs: function (callback) {
     $.ajax({
       url: this.base_url + this.get_ehrs,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   },
   ehr: function (ehr_uid, callback) {     
     $.ajax({
       url: this.base_url + this.get_ehr + ehr_uid,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   },
   ehr_for_patient: function (patient_uid, callback) {
     $.ajax({
       url: this.base_url + this.get_ehr_for_patient + patient_uid,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   },
   contributions: function (ehr_uid, callback) {
     $.ajax({
       url: this.base_url + this.get_contributions,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {ehrUid: ehr_uid, format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   },
   queries: function (callback) {
     $.ajax({
       url: this.base_url + this.get_queries,
       method: 'GET',
       beforeSend: function(xhr) { console.log(this); xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token); },
       data: {format: 'json'}
     })
     .done( function (data, textStatus, jqXHR) {
       callback(data, jqXHR.status, jqXHR.statusText);
     })
     .fail( function (jqXHR, textStatus, errorThrown) {
       data = $.parseJSON(jqXHR.responseText); // for errors 400/500 ajax doesnt do json parsing
       callback(data, jqXHR.status, jqXHR.statusText); // TODO: allow passing an error callback
     });
   }
 };
 