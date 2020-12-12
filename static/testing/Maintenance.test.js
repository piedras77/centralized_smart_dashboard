// Unit testing file for the Maintenance Controller


// These tests should be good but there is an issue in the controller causing them to fail
// Cannot read property value of null at line 23 of the controller

describe('testing wheelChange', () => {  // Testing for the wheels functions.  May not be needed or possible.

	beforeEach(module('Maintenance'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
		ctrl = $controller('MaintenanceController', { $scope: scope });
	}));

	it('should send a notification', () => {
		scope.notifications = "none yet";
		var output1w = "none yetWheels Changed!\n";
		scope.wheelChange();
		expect(scope.notifications).toEqual(output1w);
	});
});

describe('testing armChange', () => {  // Testing for the arms functions.  May not be needed or possible.

	beforeEach(module('Maintenance'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
		ctrl = $controller('MaintenanceController', { $scope: scope });
	}));

	it('should send a notification', () => {
		scope.notifications = "none yet";
		var output1a = "none yetArms Changed!\n";
		scope.armChange();
		expect(scope.notifications).toEqual(output1a);
	});
});

describe('testing reset button', () => {  // tests written for the reset button

	beforeEach(module('Maintenance'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
		ctrl = $controller('MaintenanceController', { $scope: scope });
	}));

	it('should send a notification when pressed', () => {
		scope.notifications = "none yet";
		var output1r = "none yetRESET PRESSED! Setting all motor direction values to zero.\n";
		scope.resetButton();
		expect(scope.notifications).toEqual(output1r);
	});
});

describe('testing eStop button', () => {  // tests written for the eStop button

	beforeEach(module('Maintenance'));

	var scope, $controller;

	beforeEach(inject(function ($rootScope, _$controller_) {  // inject and mock(?) function
		scope = $rootScope.$new();
		$controller = _$controller_;
		ctrl = $controller('MaintenanceController', { $scope: scope });
	}));

	it('should send a notification when called', () => {
		scope.notifications = "none yet";
		var output1 = "none yetESTOP PRESSED! Rover is force restarting.\n";
		scope.eStopButton();
		expect(scope.notifications).toEqual(output1);
	});
});
