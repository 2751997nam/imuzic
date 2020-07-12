
const BaseController = require("./BaseController");

const Song = use('App/Models/Song');
const youtube = require("../../../config/youtube");
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
var YD = new YoutubeMp3Downloader(youtube.config);
var URL = require('url');
const getMP3Duration = require('get-mp3-duration')
const fs = require('fs');

class SongController extends BaseController {
    async index({ request, response }) {
        const songs = await Song.all();

        return this.response(response, songs);
    }

    async create({ request, response }) {
        const data = request.only(['url']);
        let query = URL.parse(data.url, true).query;
        YD.download(query.v);
        YD.on("progress", function(progress) {
            console.log(JSON.stringify(progress));
        });
        let result = await new Promise((resolve, reject) => {
            YD.on("finished", function(err, data) {
                resolve(data);
            });

            YD.on("error", function(error) {
                reject({});
            });
        });

        let song = new Song();
        for (let key in result) {
            song[key] = result[key];
        }

        const buffer = fs.readFileSync(result.file);
        const duration = getMP3Duration(buffer);
        song.duration = duration;

        song.save();

        return this.response(response, song);
    }
}

module.exports = SongController;
