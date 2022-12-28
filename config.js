var config = {};

config.speedtest = {};
config.influx = {};

config.speedtest.acceptGdpr = true;     // Read the SpeedTest.net GDPR and then set to true
config.speedtest.acceptLicense = true;  // Read the SpeedTest.net License and then set to true
config.speedtest.host = "";             // It's better to find a server and always use that one, for consistency

config.influx.host = "http://localhost:8086";
config.influx.token = "";               // For 1.8 it's username:password
config.influx.org = "";
config.influx.bucket = "";              // For 1.8 it's the database
config.influx.measurement = "internet"; // The name of the measurement
config.influx.deviceHost = "";          // The name of the host which is gonna appear in the measurement

// Export the config var to be used from other modules
module.exports = config;
