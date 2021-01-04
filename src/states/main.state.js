import ocr from "../objects/ocr";

export default class MainState extends Phaser.State {

    preload() {
    }

    create() {
        this.POINT_ZERO = new Phaser.Point(0, 0);

        this.brush = this.game.make.sprite(0, 0, "dot16px_black");
        this.previousPoint = new Phaser.Point();

        this.game.input.addMoveCallback(this.paint, this);
        this.game.input.onUp.add(() => { this.previousPoint.set(0, 0); }, this);

        // Create the bitmap which will be read by Tesseract
        this.inputImage = this.game.add.bitmapData(this.game.width, this.game.height);
        this.inputImage.addToWorld();
        this.inputImage.antialias = false;

        this.ocr = new ocr();

        this._createUI();
    }

    _createUI() {
        const styleText = {font: "32px Arial", fill: "#fff"};
        const styleButton = {font: "bold 32px Arial", fill: "#fff", backgroundColor: 'rgba(0, 255, 0, 0.25)'};

        const txtTitle = this.game.add.text(this.game.width / 2, 30, "Click and Drag to write", styleText);
        txtTitle.anchor.set(0.5, 0.5);

        const btnDetect = this.game.add.text(0, this.game.height - 30, "Detect Input", styleButton);
        btnDetect.anchor.set(0, 0.5);
        btnDetect.inputEnabled = true;
        btnDetect.events.onInputUp.add(() => {
            this.ocr.processInput(this.inputImage, this.displayOutput.bind(this));
        }, this);

        this.txtOutput = this.game.add.text(0, this.game.height - 80, "Output: N/A", styleText);
        this.txtOutput.anchor.set(0, 0.5);

        const btnClear = this.game.add.text(this.game.width, this.game.height - 30, "Clear Screen", styleButton);
        btnClear.anchor.set(1, 0.5);
        btnClear.inputEnabled = true;
        btnClear.events.onInputUp.add(this.clearBitMapData, this);
    }

    /**
     * Draw on the bitmap.
     * */
    paint(pointer, x, y) {
        if (!pointer.isDown) return;

        if (this.previousPoint.equals(this.POINT_ZERO)) {
            this.previousPoint.set(x, y);
        }

        const incrementX = (x - this.previousPoint.x) / 40.0;
        const incrementY = (y - this.previousPoint.y) / 40.0;
        for (let i = 0; i < 40; i++) {
            const brushDrawX = this.previousPoint.x + incrementX * i - 24;
            const brushDrawY = this.previousPoint.y + incrementY * i - 24;
            this.inputImage.draw(this.brush, brushDrawX, brushDrawY);
        }

        this.previousPoint.set(x, y);
    }

    /**
     * Callback to display parsed text.
     * @parm {string} text
     * */
    displayOutput(text) {
        this.txtOutput.text = "Output: " + text;
    }

    clearBitMapData() {
        this.inputImage.clear();
    }
}