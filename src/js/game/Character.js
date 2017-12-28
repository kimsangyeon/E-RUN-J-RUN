class Charecter {
    constructor(options) {
        this.options = options;
    }

    render() {
        this.options.context.drawImage(
            this.options.image,
            0,
            0,
            this.options.width,
            this.options.height,
            0,
            0,
            this.options.width,
            this.options.height);
    }
}

export default Charecter;