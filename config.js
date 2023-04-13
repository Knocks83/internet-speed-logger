var config = {};

config.speedtest = {};
config.influx = {};
config.general = {};

config.speedtest.acceptGdpr = false;    // Read the SpeedTest.net GDPR and then set to true
config.speedtest.acceptLicense = false; // Read the SpeedTest.net License and then set to true
config.speedtest.id = "";               // It's better to find a server and always use that one, for consistency

config.influx.host = "http://localhost:8086";
config.influx.token = "";               // For 1.8 it's username:password
config.influx.org = "";
config.influx.bucket = "";              // For 1.8 it's the database
config.influx.measurement = "internet"; // The name of the measurement
config.influx.deviceHost = "";          // The name of the host which is gonna appear in the measurement

config.general.delay = 300000;          // Delay for the speedtest loop in ms

// Export the config var to be used from other modules
module.exports = config;
