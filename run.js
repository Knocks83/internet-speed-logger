const speedTest = require('speedtest-net');
var config = require('./config');
var Influx = require('./influx');

const influxObj = new Influx(config.influx);


async function run() {
    try {
        // Check the internet speed
        const speedTestValue = await speedTest(config.speedtest);

        // Write the data to Influx. Since the bandwidth is in bytes per second, it gets multiplied by 8 to get bits per second (bps)
        await influxObj.write(config.speedtest.host, speedTestValue.ping.latency, speedTestValue.ping.jitter, speedTestValue.download.bandwidth * 8,
            speedTestValue.upload.bandwidth * 8, speedTestValue.packetLoss);
        
        // Call self back
        setTimeout(async () => {
            await run();
        }, 5000);

    } catch (err) {
        console.log(err.message);
    }
}

setTimeout(async () => {
    await run();
}, 5000);
