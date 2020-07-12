"use strict";

module.exports = {
    config: {
        ffmpegPath: "/usr/bin/ffmpeg", // FFmpeg binary location
        outputPath: global.dir + '/storage/mp3', // Output file location (default: the home directory)
        youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
        queueParallelism: 2, // Download parallelism (default: 1)
        progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
    },
};
