# internet-speed-logger
Log your internet speed on an Influx DataBase!

## Install
Just clone the repo and then `npm install`.

## Configure
Edit the `config.js` file with your settings.

### SpeedTest
Change `config.speedtest.acceptGdpr` and `config.speedtest.acceptLicense` to true.

It's highly recommended to set `config.speedtest.host` to a static host, to have consistent results.


### Influx
If you're using Influx 1.8, then to use the database you can just use the setting `host`, `bucket` and `measurement`. To organize the data, you can also use the `deviceHost` setting to define which host is doing the speedtest. The other settings are optional.
