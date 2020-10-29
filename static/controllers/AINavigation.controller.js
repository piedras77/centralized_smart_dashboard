(function() {

    var app = angular.module('AINavigation', ['panzoom', 'panzoomwidget']);
    app.controller('AINavigationController', ['$scope', '$window', '$http', 'PanZoomService', AINavigationController]);

    function AINavigationController($scope, $window, $http, PanZoomService) {
        $scope.homepage = homepage;
        $scope.waypointNew = waypointNew;
        $scope.cameraIP = cameraIP;
        $scope.goButton = goButton;
        $scope.eStopButton = eStopButton;

        $scope.waypoints = []

        // todo: check correct var for this
        var initial_zoom = {
            x: 391,
            y: 371,
            width: 206,
            height: 136
        };

        $scope.panzoomConfig = {
            zoomLevels: 12,
            neutralZoomLevel: 5,
            scalePerZoomLevel: 1.5,
            initialZoomToFit: initial_zoom
        };

        $scope.panzoomModel = {};

        const PATH = 'http://localhost:5000'

        function homepage() {
            $window.location.href = "/home";
        }

        function init() {
            // TODO: sample response, delete when backend ready, points are camprandall and bascom
            test_response = {
                'data': {
                    waypoints: [{'lat': 43.069939, 'long': -89.412116}, {'lat': 43.075441, 'long': -89.404075}]
                }
            }

            $http.get(PATH + '/api/waypoint')
                .then ((response) => {
                    response =test_response; // TODO: only for testing, delete when backend ready
                    response.data.waypoints.forEach(waypoint => $scope.waypoints.push(waypoint));
                    console.log($scope.waypoints)
                }, (error) => {
                    connectionLost();
                });
        }

        //Adds waypoint coordinates to the list
        function waypointNew() {
            var latitude = document.getElementById("waypointNewLatitude").value;
            var longitude = document.getElementById("waypointNewLongitude").value;

            var invalidInput = !(latitude || longitude) || latitude < -180 || latitude > 180 
                || longitude < -180 || longitude > 180;
            if (invalidInput) {
                alert("Invalid coordinates for new waypoint");
            } else {

                // TODO: sample response, delete when backend ready, points are camprandall and bascom
                test_response = {
                    'data': {
                        'lat': latitude,
                        'long': longitude
                    }
                }
                $http.post( PATH + '/api/waypoint', 
                    {
                        'lat': latitude,
                        'long': longitude
                    }
                )
                .then( (response) => {
                    response = test_response // TODO: remove after back end is ready
                    $scope.waypoints.push({'lat': response.data.lat, 'long': response.data.long})
                }, (error) => {
                    connectionLost();
                });
            }
        }

        //Opens a new window with a live stream of the camera at the IP address sent
        function cameraIP() {
            alert("A new camera stream IP address has been opened.");
        }

        //Sends the first target waypoint in the list to the rover
        function goButton() {
            alert("GO Command Sent! The rover is moving to the top waypoint.");
            // todo: POST to fo button endpoint
            $http.get(PATH + '/api/go-button')
                .then ((response) => {
                    if ( response.data.success) {
                        // todo: change colors of waypoints, or something in map
                    } else {
                        connectionLost();
                    }
                }, (error) => {
                    connectionLost();
                });
        }

        //Sends a force restart command to the rover
        function eStopButton() {
            alert("ESTOP PRESSED! Rover is force restarting.");
            $http.get(PATH + '/api/emergency-stop')
                .then ((response) => {
                }, (error) => {
                    connectionLost();
                });
        }

        function getCameraIP(){

        }

        function connectionLost() {
            alert("Connection lost to server");
            // todo: consider if we try some other reconnection or something
        }

        init();
    }


    })();