/**
 * @author ©Towns.cz
 * @fileOverview Additional methods to CanvasRenderingContext2D prototype
 */
//======================================================================================================================



/**
 *
 * @param {number} center x
 * @param {number} center y
 * @param {number} width
 * @param {number} height
 */
CanvasRenderingContext2D.prototype.drawEllipse = function( x, y, width, height) {
    var kappa = .5522848,
        ox = (width / 2) * kappa, // control point offset horizontal
        oy = (height / 2) * kappa, // control point offset vertical
        xe = x + width,           // x-end
        ye = y + height,           // y-end
        xm = x + width / 2,       // x-middle
        ym = y + height / 2;       // y-middle

    this.beginPath();
    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    this.closePath(); // todo not used correctly, see comments (use to close off open path)
    this.stroke();
    this.fill();
};



//======================================================================================================================

/**
 * Draw polygons on canvas
 * @param {array} polygons
 * @param {object} position moveBy
 */
CanvasRenderingContext2D.prototype.drawPolygons = function(polygons,moveBy={x:0,y:0}){

    var ctx=this;
    //ctx.globalCompositeOperation = "multiply";

    polygons.forEach(function(polygon){

        if(is(polygon.fill)){
            //r(polygon.fill);
            ctx.fillStyle = polygon.fill.color.rgb();
        }


        if(is(polygon.line)){
            ctx.strokeStyle = polygon.line.color.rgb();
            ctx.lineWidth = polygon.line.width;
            ctx.lineJoin = 'round';
        }


        ctx.beginPath();

        polygon.points.forEach(function(point){

            ctx.lineTo(point.x-moveBy.x,point.y-moveBy.y);


        });

        ctx.closePath();

        if(is(polygon.fill))
            ctx.fill();

        if(is(polygon.line))
        if(polygon.line.width!==0)
            ctx.stroke();

    });

};

//======================================================================================================================


/**
 * Replace one color with another
 * @param {object} color oldColor
 * @param {object} color newColor
 */
CanvasRenderingContext2D.prototype.recolorImage = function(oldColor,newColor){

    //r(this.canvas);

    var w = this.canvas.width;
    var h = this.canvas.height;

    // pull the entire image into an array of pixel data
    var imageData = this.getImageData(0, 0, w, h);

    //r(imageData);
    // examine every pixel,
    // change any old rgb to the new-rgba
    for (var i=0;i<imageData.data.length;i+=4) {
        // is this pixel the old rgb?
        if(imageData.data[i]==oldColor.r &&
            imageData.data[i+1]==oldColor.g &&
            imageData.data[i+2]==oldColor.b &&
            (imageData.data[i+3]==oldColor.a || oldColor.a===false)
        ){
            // change to your new rgba
            imageData.data[i]=newColor.r;
            imageData.data[i+1]=newColor.g;
            imageData.data[i+2]=newColor.b;
            imageData.data[i+3]=newColor.a;
        }


    }

    // put the altered data back on the canvas
    this.putImageData(imageData,0,0);

};

//======================================================================================================================

/**
 * Apply gaussian blur on canvas
 * @param {number} radius
 * @param {number} iterations
 */
CanvasRenderingContext2D.prototype.blur = function( radius, iterations=1 ) {

    if ( isNaN(radius) || radius < 1 ) return;
    radius |= 0;

    if ( isNaN(iterations) ) iterations = 1;
    iterations |= 0;
    if ( iterations > 3 ) iterations = 3;
    if ( iterations < 1 ) iterations = 1;

    var canvas  = this.canvas;
    var context = this;


    var top_x=0;
    var top_y=0;
    var width=canvas.width;
    var height=canvas.height;

    var imageData;

    try {
        try {
            imageData = context.getImageData( top_x, top_y, width, height );
        } catch(e) {

            // NOTE: this part is supposedly only needed if you want to work with local files
            // so it might be okay to remove the whole try/catch block and just use
            // imageData = context.getImageData( top_x, top_y, width, height );
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                imageData = context.getImageData( top_x, top_y, width, height );
            } catch(e) {
                alert("Cannot access local image");
                throw new Error("unable to access local image data: " + e);
                return;
            }
        }
    } catch(e) {
        alert("Cannot access image");
        throw new Error("unable to access image data: " + e);
    }

    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
        pr, pg, pb, pa, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;

    var stackStart = new BlurStack();

    var stack = stackStart;
    for ( i = 1; i < div; i++ )
    {
        stack = stack.next = new BlurStack();
        if ( i == radiusPlus1 ) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;



    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];
    while ( iterations-- > 0 ) {
        yw = yi = 0;
        for ( y = height; --y > -1; )
        {
            r_sum = radiusPlus1 * ( pr = pixels[yi] );
            g_sum = radiusPlus1 * ( pg = pixels[yi+1] );
            b_sum = radiusPlus1 * ( pb = pixels[yi+2] );
            a_sum = radiusPlus1 * ( pa = pixels[yi+3] );

            stack = stackStart;

            for( i = radiusPlus1; --i > -1; )
            {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack.a = pa;
                stack = stack.next;
            }

            for( i = 1; i < radiusPlus1; i++ )
            {
                p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
                r_sum += ( stack.r = pixels[p]);
                g_sum += ( stack.g = pixels[p+1]);
                b_sum += ( stack.b = pixels[p+2]);
                a_sum += ( stack.a = pixels[p+3]);

                stack = stack.next;
            }

            stackIn = stackStart;
            for ( x = 0; x < width; x++ )
            {
                pixels[yi++] = (r_sum * mul_sum) >>> shg_sum;
                pixels[yi++] = (g_sum * mul_sum) >>> shg_sum;
                pixels[yi++] = (b_sum * mul_sum) >>> shg_sum;
                pixels[yi++] = (a_sum * mul_sum) >>> shg_sum;

                p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;

                r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
                g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
                b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
                a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);

                stackIn = stackIn.next;

            }
            yw += width;
        }


        for ( x = 0; x < width; x++ )
        {
            yi = x << 2;

            r_sum = radiusPlus1 * ( pr = pixels[yi]);
            g_sum = radiusPlus1 * ( pg = pixels[yi+1]);
            b_sum = radiusPlus1 * ( pb = pixels[yi+2]);
            a_sum = radiusPlus1 * ( pa = pixels[yi+3]);

            stack = stackStart;

            for( i = 0; i < radiusPlus1; i++ )
            {
                stack.r = pr;
                stack.g = pg;
                stack.b = pb;
                stack.a = pa;
                stack = stack.next;
            }

            yp = width;

            for( i = 1; i <= radius; i++ )
            {
                yi = ( yp + x ) << 2;

                r_sum += ( stack.r = pixels[yi]);
                g_sum += ( stack.g = pixels[yi+1]);
                b_sum += ( stack.b = pixels[yi+2]);
                a_sum += ( stack.a = pixels[yi+3]);

                stack = stack.next;

                if( i < heightMinus1 )
                {
                    yp += width;
                }
            }

            yi = x;
            stackIn = stackStart;
            for ( y = 0; y < height; y++ )
            {
                p = yi << 2;
                pixels[p+3] = pa =(a_sum * mul_sum) >>> shg_sum;
                if ( pa > 0 )
                {
                    pa = 255 / pa;
                    pixels[p]   = ((r_sum * mul_sum) >>> shg_sum ) * pa;
                    pixels[p+1] = ((g_sum * mul_sum) >>> shg_sum ) * pa;
                    pixels[p+2] = ((b_sum * mul_sum) >>> shg_sum ) * pa;
                } else {
                    pixels[p] = pixels[p+1] = pixels[p+2] = 0
                }

                p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;

                r_sum -= stackIn.r - ( stackIn.r = pixels[p]);
                g_sum -= stackIn.g - ( stackIn.g = pixels[p+1]);
                b_sum -= stackIn.b - ( stackIn.b = pixels[p+2]);
                a_sum -= stackIn.a - ( stackIn.a = pixels[p+3]);

                stackIn = stackIn.next;

                yi += width;
            }
        }
    }
    context.putImageData( imageData, top_x, top_y );

};

/**
 * @private
 */
var mul_table = [ 1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1];

/**
 * @private
 */
var shg_table = [0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9
];

/**
 * @private
 */
function BlurStack(){
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}

