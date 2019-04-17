'use strict';

describe('Thermostat', function() {
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increases in temperature using up()', function(){
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('decreases in temperature with down()', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('has a minimum of 10 degrees', function(){
    for (var temp = 20; temp > 10 ; temp--){
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  });

  it('can be reset to the default temperature', function() {
    for (var temp = 20; temp < 25; temp++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });
});

describe('power saving', function() {
  var thermostat;
  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('has power saving mode on by default', function() {
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switch power saving mode off', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('has a max temp of 25 degrees when power saving on', function() {
    for (var temp = 20; temp < 25; temp++) {
      thermostat.up();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(25);
  });

  it('has a max temp of 32 degrees when power saving off', function() {
    thermostat.switchPowerSavingModeOff();
    for (var i = 0; i < 13; i++) {
      thermostat.up();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(32);
  });

  it('it is considered low-usage when under 18', function() {
    for (var i = 0; i < 3; i++) {
      thermostat.down();
    }
    expect(thermostat.energyUsage()).toEqual('low-usage');
  });

  it('it is considered medium-usage when between 18 and 25', function() {
    expect(thermostat.energyUsage()).toEqual('medium-usage');
  });

  it('it is considered high-usage above 25', function() {
    thermostat.powerSavingMode = false;
    for (var i = 0; i < 6; i++) {
      thermostat.up();
    }
    expect(thermostat.energyUsage()).toEqual('high-usage');
  });
});
