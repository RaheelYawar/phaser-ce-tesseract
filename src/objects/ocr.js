import Tesseract from "tesseract.js"

export default class ocr {
    constructor() {
    }

    /**
     * @param {Phaser.BitmapData} image The bitmap.
     * @param {function} callback
     * */
    processInput(image, callback) {
        Tesseract.recognize(
            image.context,
            'eng',
            { logger: m => console.log(m) }
        ).then((result) => {
            callback(result.text);
        })
    }
}