const InfluxDB = require('@influxdata/influxdb-client').InfluxDB
const Point = require('@influxdata/influxdb-client').Point


class Influx {
    /**
     * Initialize the Influx object
     * @param {Object} config An object with the following paramerters: bucket, measurement, deviceHost, host, token
     */
    constructor(config) {
        this.bucket = config.bucket;
        this.measurement = config.measurement;
        this.deviceHost = config.deviceHost;
        this.org = config.org
        this.influxAPI = new InfluxDB({url: config.host, token: config.token})
    }

    /**
     * Write a point on the Influx DB
     * @param {String} speedtestServer The host the speed was checked on (friendly name)
     * @param {float} ping The ping measured
     * @param {float} jitter The jitter measured
     * @param {int} download The download speed in bps
     * @param {int} upload The upload speed in bps
     * @param {float} packetLoss The packet loss in percentage
     */
    async write(speedtestServer, ping, jitter, download, upload, packetLoss) {
        const writeAPI = this.influxAPI.getWriteApi(this.org, this.bucket)
        const point = new Point(this.measurement)
            .tag('host', this.deviceHost)
            .stringField('speedtestServer', speedtestServer)
            .floatField('ping', ping)
            .floatField('jitter', jitter)
            .intField('download', download)
            .intField('upload', upload)
            .floatField('packetLoss', packetLoss)
        writeAPI.writePoint(point)
        await writeAPI.close()
    }
}

module.exports = Influx;
