'use strict';

function Thermostat() {
  this.MINIMUM_TEMPERATURE = 10;
  this.MAXIMUM_TEMPERATURE = 30;
  this.temperature = 20;
}

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.up = function(){
  if (this.isMaximumTemprature()){
    return;
  }
  this.temperature +=1;
};

Thermostat.prototype.down = function (){
  if (this.isMinimumTemprature()){
    return;
  }
  this.temperature -=1
};

Thermostat.prototype.isMinimumTemprature = function (){
  return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isMaximumTemprature = function (){
  return this.temperature === this.MAXIMUM_TEMPERATURE;
};
