const speedTest = require('speedtest-net');
var config = require('./config');
var Influx = require('./influx');

const influxObj = new Influx(config.influx);


async function run() {
    try {
        // Check the internet speed
        const speedTestValue = await speedTest(config.speedtest);

        // If the values for download and upload are NOT zero, then create the Influx point
        if (!(speedTestValue.download.bandwidth == 0 && speedTestValue.upload.bandwidth == 0)) {
            // Write the data to Influx. Since the bandwidth is in bytes per second, it gets multiplied by 8 to get bits per second (bps)
            await influxObj.write(speedTestValue.server.host, speedTestValue.ping.latency, speedTestValue.ping.jitter,speedTestValue.download.bandwidth * 8,
                speedTestValue.upload.bandwidth * 8, speedTestValue.packetLoss);
        }
        
    } catch (err) {
        console.log(err.message);

        // Write a point with no internet connection
        await influxObj.write(config.speedtest.host, 0, 0, 0, 0, 100);
    } finally {
        // Call self back
        setTimeout(async () => {
            await run();
        }, config.general.delay);
    }
}

(async () => {
    await run();
})();
