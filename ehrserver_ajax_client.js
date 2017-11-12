var ehrserver_ajax_client = {
 
   base_url: undefined,
   do_login: "/api/v1/login",
   get_user: "/api/v1/users/",
   get_ehrs: "/api/v1/ehrs",
   get_ehr:  "/api/v1/ehrs/ehrUid/",
   get_ehr_for_patient: "/api/v1/ehrs/subjectUid/",
   get_contributions:   "/api/v1/contributions",
   get_queries:     "/api/v1/queries",
   get_ehr_queries: "/api/v1/getEhrQueries",
   do_ehr_checker:  "/api/v1/ehrChecker",
   matching_ehrs:   "/api/v1/getMatchingEhrs",
   token: undefined, // set by login
   
   init: function(url) {
     console.log('URL : '+ url);
     if (!/^(http[s]?\:)\/\/([^\?\:\/#]+)(\:([0-9]+))?(\/[^\?\#]*)?(\?([^#]*))?(#.*)?/i.test( url ))
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
   set_api_key: function (apikey, callback) {
     
     if (!apikey)
     {
        console.log("apikey is required");
        return false;
     } 
     
     // this doesn't assure that the key is valid
     ehrserver_ajax_client.token = apikey;
   },
   is_authenticated: function() {
     return ehrserver_ajax_client.token != undefined;
   },
   user: function (username, callback) {
     if (!username)
     {
        console.log("username is required");
        return false;
     }
     $.ajax({
       url: this.base_url + this.get_user + username,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
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
   ehrs: function (max, offset, callback) {
     max = (typeof max !== 'undefined') ?  max : 20;
     offset = (typeof offset !== 'undefined') ?  offset : 0;
     $.ajax({
       url: this.base_url + this.get_ehrs,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
       data: {format: 'json', max: max, offset: offset}
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
     if (!ehr_uid)
     {
        console.log("ehr_uid is required");
        return false;
     }   
     $.ajax({
       url: this.base_url + this.get_ehr + ehr_uid,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
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
   ehr_for_patient: function (patient_uid, callback) {
     if (!patient_uid)
     {
        console.log("patient_uid is required");
        return false;
     } 
     $.ajax({
       url: this.base_url + this.get_ehr_for_patient + patient_uid,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
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
   contributions: function (ehr_uid, callback) {
     if (!ehr_uid)
     {
        console.log("ehr_uid is required");
        return false;
     } 
     $.ajax({
       url: this.base_url + this.get_contributions,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
       data: {ehrUid: ehr_uid, format: 'json'}
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
   queries: function (callback) {
     $.ajax({
       url: this.base_url + this.get_queries,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
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
   ehr_queries: function (callback) {
     $.ajax({
       url: this.base_url + this.get_ehr_queries,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
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
   ehr_checker: function (ehr_query_uid, ehr_uid, callback) {
     if (!ehr_query_uid)
     {
        console.log("ehr_query_uid is required");
        return false;
     }
     if (!ehr_uid)
     {
        console.log("ehr_uid is required");
        return false;
     }
     $.ajax({
       url: this.base_url + this.do_ehr_checker,
       method: 'GET',
       beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer '+ ehrserver_ajax_client.token);
       },
       data: {format: 'json', ehrQueryUid: ehr_query_uid, ehrUid: ehr_uid}
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
 