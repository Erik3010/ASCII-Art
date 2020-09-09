/**
 * JavaScript - ASCII Art Editor
 *
 * Your task is to implement all methods marked with @todo. You must not change any other method.
 * You may add as many methods to the ASCIIArtEditor class as you want.
 */


/**
 * Constructor function to create a new ASCIIArtEditor
 * @constructor
 */
var ASCIIArtEditor = function () {
    /**
     * When transforming images this property should be used as line
     * separator for all operations
     * @type {string}
     */
    this.lineSeperator = '\n';
};


/**
 * This function takes an arbitrary ASCII Art string as input and must
 * return a mirrored version of the given image.
 *
 * It should be possible to choose the mirror-axis with the second argument.
 *
 * The function should use the configured lineSeparator property on
 * the ASCIIArtEditor object.
 *
 * Example on 'x' axis:
 *   Input:                 Output:
 *     # --····-- $           # --====-- $
 *     #  +    -  $           #  +    -  $
 *     # --====-- $           # --····-- $
 *
 * Example on 'y' axis:
 *   Input:                 Output:
 *     # --····-- $           $ --····-- #
 *     #  +    -  $           $  -    +  #
 *     # --====-- $           $ --====-- #
 *
 * @param {string} image - the source image
 * @param {'x'|'y'} [axis='y'] - the axis to be used for the mirror operation, defaults to 'y'
 * @return string - the mirrored input image
 *
 * @throws Error - If an invalid axis was provided
 *
 * @todo
 */
ASCIIArtEditor.prototype.mirror = function (image, axis = 'y') {
    // <---- Implement this method

    let validAxis = ['y', 'x'];
    if(!validAxis.includes(axis)) throw 'exception';

    let imageArray = image.split(this.lineSeperator)

    if(axis === 'x') {
        let lastImageRow = imageArray[imageArray.length-1];
        let firstImageRow = imageArray[0];

        imageArray[0] = lastImageRow;
        imageArray[imageArray.length-1] = firstImageRow;

        return imageArray.join(this.lineSeperator);
    }else if(axis === 'y') {
        let newImageArray = [];

        for(let i=0;i<imageArray.length;i++) {
            let imageSplit = imageArray[i].split('');
            let firstCharacter = imageSplit.shift();
            let lastCharacter = imageSplit.pop();

            newImageArray.push([lastCharacter, ...imageSplit, firstCharacter].join(''));
        }

        return newImageArray.join(this.lineSeperator);
    }
};


/**
 * Takes any SQUARE ASCII image and must rotate the image by the
 * given angle (only multiple of 90 allowed).
 *
 * The rotation should always be clockwise.
 *
 * Example:
 *   Input:    90deg:    180deg:    270deg:    360deg:
 *     #-*       $-#       *-$        ***         #-*
 *     --*       ---       *--        ---         --*
 *     $-*       ***       *-#        #-$         $-*
 *
 * @param {string} image
 * @param {number} angle, has to be one of 0, 90, 180, 270, 360
 * @return string
 *
 * @throws Error - If an invalid angle was provided
 *
 * @todo
 */
ASCIIArtEditor.prototype.rotate = function(image, angle) {
    // <---- Implement this method
    if(+angle < 0 || +angle > 360 || +angle % 90 !== 0) throw 'exception';

    if(angle == 0 || angle == 360) return image;

    let imageArray = image.split(this.lineSeperator);

    let newImageArray = [];
    let tempImage = [];

    if(angle == 90) {
        let imageArraySplited = imageArray.map(image => image.split(''))
        // for(let i=0;i<imageArraySplited.length;i++) {
        //     tempImage[i] = [];
        //     for(let j=0;j<imageArraySplited.length;j++) {
        //         tempImage[i].push(imageArraySplited[j][i])
        //     }
        //     newImageArray.push(tempImage[i].reverse().join(''))
        // }

        for(let i=0;i<imageArraySplited.length;i++) {
            tempImage[i] = [];
            for(let j=imageArraySplited.length-1;j>=0;j--) {
                tempImage[i].push(imageArraySplited[j][i])
            }
            newImageArray.push(tempImage[i].join(''))
        }

        return newImageArray.join(this.lineSeperator)
    }

    if(angle == 270) {
        let imageArraySplited = imageArray.map(image => image.split('').reverse());
        for(let i=0;i<imageArraySplited.length;i++) {
            tempImage[i] = [];
            for(let j=0;j<imageArraySplited.length;j++) {
                tempImage[i].push(imageArraySplited[j][i])
            }
            newImageArray.push(tempImage[i].join(''))
        }

        return newImageArray.join(this.lineSeperator)
    }

    if(angle == 180) {
        let imageArraySplited = imageArray.map(image => image.split('')).reverse();
        for(let i=0;i<imageArraySplited.length;i++) {
            tempImage[i] = [];
            for(let j=0;j<imageArraySplited.length;j++) {
                tempImage[i].push(imageArraySplited[i][j])
            }
            newImageArray.push(tempImage[i].reverse().join(''))
        }

        return newImageArray.join(this.lineSeperator)
    }
};