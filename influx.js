const InfluxDB = require('@influxdata/influxdb-client').InfluxDB
const Point = require('@influxdata/influxdb-client').Point


class Influx {
    constructor(config) {
        this.bucket = config.bucket;
        this.measurement = config.measurement;
        this.deviceHost = config.deviceHost;
        this.influxAPI = new InfluxDB({url: config.host, token: config.token})
    }

    async write(speedtestServer, ping, jitter, download, upload, packetLoss) {
        const writeAPI = this.influxAPI.getWriteApi('', this.bucket)
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
