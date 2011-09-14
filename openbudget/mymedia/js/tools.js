//  T O O L S   A N D   U T I L I T I E S
var Tools = (function () {
    var that = {};

    // get the array of elements under some condition
    that.filter = function ( fn, list ) {
        var result = [];
        var element;
        var i;

        for( i = 0; i < list.length; i += 1 ) {
            element = list[ i ];
            if( fn( element ) ) {
                result.push( element );
            }
        }

        return result;
    };


    // get the normalized array of key values from an object
    that.normalize_data = function ( data, key ) {
        var total = that.get_total( data, key );
        var i, length = data.length;
        var result = [];

        for( i = 0; i < length; ++i ) {
            result.push( data[i][key] / total );
        }
        return result;
    };


    that.next_letter = function ( letter ) {
        var number = letter.charCodeAt( 0 );

        return String.fromCharCode( number + 1 );
    };


    that.prev_letter = function ( letter ) {
        var number = letter.charCodeAt( 0 );

        return String.fromCharCode( number - 1 );
    };


    // get sum of array elements
    that.get_sum = function ( data ) {

        return data.length === 1 ?
               data[0] :
               data[0] + that.get_sum( data.slice( 1 ));
    };


    // remap a value to a new scale
    that.remap = function ( x, imin, imax, omin, omax ) {
        var imin = imin || 0;
        var imax = imax || 1;
        var omin = omin || 0;
        var omax = omax || 1;

        return omin + ( omax - omin ) * (( x - imin ) / ( imax - imin ));
    };


    // get sum of given key in the array of objects
    that.get_total = function ( data, key ) {
        if( data.length === 1 ) {
            return data[0][key];
        }
        return data[0][key] + that.get_total( data.slice( 1 ), key );
    };


    // change the string into Title case
    that.toTitleCase = function ( str ) {
        return  str[0].toUpperCase() + str.slice(1).toLowerCase();
    };


    // take a number and represent it as money string: 1 000 000
    that.money = function ( value ) {
        var result = [];
        var value = "" + value;

        var cut = function ( value ) {
            if( value.length <= 3 ) {
                result.push( value );
            }
            else {
                result.push( value.slice( value.length - 3 ));
                cut( value.slice( 0, value.length - 3 ));
            }
        }
        cut( value );
        return value === '0' ? '0' : result.reverse().join(' ') + " 000";
    };

    return that;
})();
