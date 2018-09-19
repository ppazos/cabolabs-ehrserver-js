# cabolabs-ehrserver-js
Javascript client for CaboLabs EHRServer

## Sample code

See index.html

    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="ehrserver_ajax_client.js"></script>

### Setup

    var ehrserver = ehrserver_ajax_client;
    ehrserver.init('http://localhost:8090'); // change for the IP or domain of your server

### Sample service invocation

Get patient list, and show the result in a textarea with id=out

    ehrserver.patients(
      function(data) {
        $('#out').text( JSON.stringify(data, null, "  ") )
      }
    );
