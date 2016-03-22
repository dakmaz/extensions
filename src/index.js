_ = require('lodash');

//region EXTENSIONS
function Extensions() {
	
	if(!global.hasOwnProperty('__stack'))
    Object.defineProperty(global, '__stack', {
        get: function () {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function (_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });

	if(!global.hasOwnProperty('__line'))
    Object.defineProperty(global, '__line', {
        get: function () {
            return __stack[1].getLineNumber();
        }
    });

	if(!global.hasOwnProperty('__function'))
    Object.defineProperty(global, '__function', {
        get: function () {
            return __stack[1].getFunctionName();
        }
    });

	if(!global.hasOwnProperty('__file'))
    Object.defineProperty(global, '__file', {
        get: function () {
            return __stack[1].getFileName().split('/').slice(-1)[0];
        }
    });

    global.counter = 0;
    //stacktostring FAIL
	if(!global.hasOwnProperty('ssr'))
    Object.defineProperty(global, 'ssr', {
        get: function () {
            console.log("\033[041m******************************************" +
                "\nFunction: " + __stack[1].getFunctionName() +
                "\nFile\t: " + __stack[1].getFileName().split('/').slice(-1)[0] +
                "\nLine\t: " + __stack[1].getLineNumber() +
                "\n******************************************\033[0m")
        },
        set: function (_params) {

            console.log("\033[041m******************************************" +
                "\nFunction: " + __stack[1].getFunctionName() +
                "\nFile\t: " + __stack[1].getFileName().split('/').slice(-1)[0] +
                "\nLine\t: " + __stack[1].getLineNumber() + "\n" +
                "\n Param\t: " + JSON.stringify(arguments, null, '  ') +
                "\n******************************************\033[0m");
        }
    });

    //stacktostring SUCCESS
	if(!global.hasOwnProperty('ssg'))
    Object.defineProperty(global, 'ssg', {
        get: function () {
            console.log("\033[092m******************************************" +
                "\nFunction: " + __stack[1].getFunctionName() +
                "\nFile\t: " + __stack[1].getFileName().split('/').slice(-1)[0] +
                "\nLine\t: " + __stack[1].getLineNumber() +
                "\n******************************************\033[0m")
        },
        set: function (_params) {
            var simdi = new Date().getTime(),
                meta1 = {
                    "Function": __stack[1].getFunctionName(),
                    "File": __stack[1].getFileName().split('/').slice(-1)[0],
                    "Line": __stack[1].getLineNumber()
                },
                esMesaji = "http://127.0.0.1:9200/logs-" + moment().format("YYYY.MM.DD") + "/_search/?size=1000&q=message:" + simdi,
            /*ozet = "Function: " + __stack[1].getFunctionName() +
             "\nFile\t: " + __stack[1].getFileName().split('/').slice(-1)[0] +
             "\nLine\t: " + __stack[1].getLineNumber() + "\n" +
             "\n Param\t: " + JSON.stringify(arguments, null, 2),*/
                sArguments = JSON.stringify(arguments, null, 2);


            if (sArguments.length < 200) {
                meta1.Param = arguments;
            } else {
                meta1.Param = esMesaji;
                l.es(simdi, arguments);
            }

            var consoleMesaji = "\033[9" + (++global.counter % 7) + "m******************************************\n" + JSON.stringify(meta1, null, 2) + "\n******************************************\033[0m";

            console.log(consoleMesaji);
        }
    });

	if(!String.hasOwnProperty('turkishToLower'))
    String.prototype.splitWithOptions = function (_seperator, _leaveFalsyElements) {
        var arr = this.split(_seperator);
        return _leaveFalsyElements
            ? arr
            : arr.filter(Boolean);
    };

	if(!String.hasOwnProperty('turkishToLower'))
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
	
	if(!String.hasOwnProperty('turkishToLower'))
    String.prototype.turkishToUpper = function () {
        var string = this;
        var letters = {
            "i": "�",
            "�": "�",
            "�": "�",
            "�": "�",
            "�": "�",
            "�": "�",
            "�": "I"
        };
        string = string.replace(/(([i������]))+/g, function (letter) {
            return letters[letter];
        });
        return string.toUpperCase();
    };

	if(!String.hasOwnProperty('turkishToLower'))
    String.prototype.turkishToLower = function () {
        var string = this;
        var letters = {
            "�": "i",
            "I": "�",
            "�": "�",
            "�": "�",
            "�": "�",
            "�": "�",
            "�": "�"
        };
        string = string.replace(/(([�I�����]))+/g, function (letter) {
            return letters[letter];
        });
        return string.toLowerCase();
    };

	
	if(!Array.hasOwnProperty('mapXU'))
    /**
     * Underscoore ya da lodash deki map metodunu �a��ran extended fonk.
     * @param {function} f_function - Her bir eleman i�in �al��mas�n� istedi�imiz fonksiyon
     * @returns {Array|[]} Bo� ya da dolu dizi d�ner
     */
    Array.prototype.mapXU = function (f_function) {
        return _.map(this, f_function);
    };

	if(!Array.hasOwnProperty('pluckX'))
    /**
     * Gelen dizinin sadece istenen prop de�erlerini dizi olarak d�ner
     * @example
     * var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
     * _.pluck(stooges, 'name');
     * => ["moe", "larry", "curly"]
     * @param {string} _prop
     * @returns {Array}
     */
    Array.prototype.pluckX = function (_prop) {
        return _.pluck(this, _prop);
    };


	if(!Array.hasOwnProperty('mapX'))
    /**
     * Daha k�sa yaz�lmas� i�in map fonksiyonu
     * �a��raca��m�z fonksiyonu ilk olarak dizinin eleman�n�, sonra gelen di�er parametreleri ge�ece�iz
     * @param {object|null} instance, fonksiyonun �al��t�r�laca�� nesne (this olacak)
     * @param {function} f_function, �al��t�r�lacak fonksiyon
     * @param {object...=} args
     * @returns {*}
     */
    Array.prototype.mapX = function (instance, f_function, args) {

        if (!Array.isArray(this)) {
            l.e("mapX fonksiyonu ancak bir dizi �st�nde �al���r!");
            throw "mapX fonksiyonu ancak bir dizi �st�nde �al���r!";
        }

        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === "function") {
            l.e("mapX fonksiyonunun ikinci parametresi �al��t�rmak istedi�iniz fonksiyon olmal�!");
            l.e("Birincisi ise fonksiyonu �st�nde ko�turmak istedi�iniz obje yada null olmal�!");
            throw "mapX fonksiyonunun ikinci parametresi �al��t�rmak istedi�iniz fonksiyon olmal�. Birincisi ise fonksiyonu �st�nde ko�turmak istedi�iniz obje yada null olmal�!";
        }
        /* l.i("************* mapX Parametreleri : ");
         l.i("\tthis             : %s", JSON.stringify(this));
         l.i("\targuments.length : %s", arguments.length);
         l.i("\tfunction.name    : %s", f_function.name);*/

        var instance = args[0] || null,
            f = args[1],
            params = args.length == 2 ? [] : args.slice(2, args.length);

        var arrResult = this.map(function (_elm, _idx, _arr) {
            // dizinin eleman�n� en ba�a ekliyorumki fonksiyonun kesinlikle kullanaca�� bir parametre varsa
            // o da bu dizinin eleman�d�r. Di�er parametreler ise mapX fonksiyonuna eklenmi� di�erleri olacakt�r.

            //ssg = [{"instance": instance}, {"params": [_elm].concat(params)}];
            return f.apply(instance, [_elm].concat(params));
        });

        return arrResult;
    };


	if(!Array.hasOwnProperty('allX'))
    /**
     * Daha k�sa yaz�lmas� i�in dizinin sonuna allX fonksiyonu ekledim
     * Promise dizisinin h�zl�ca all metodunu �a��rmak i�in.
     * D�nen sonu� bir dizi olacakt�r. Her promise sonucu {state:("fullfilled"|"rejected"), value:object} �eklindedir. fullfilled sonu�lar ba�ar�l�d�r.
     * {@link https://github.com/kriskowal/q/issues/257}
     * @returns {Promise|{state:("fullfilled"|"rejected"), value:object}[]}}
     */
    Array.prototype.allX = function () {

        if (!Array.isArray(this)) {
            l.e("allX fonksiyonu ancak bir dizi �st�nde �al���r!");
            throw "allX fonksiyonu ancak bir dizi �st�nde �al���r!";
        }

        return Q.allSettled(this)
            .then(function (_replies) {
                var arrReplies = _replies.map(function (_reply) {
                    if (_reply.state == "rejected") {
                        console.error("************* allX PROMISE REJECTED : ");
                        console.error("Promise  STATE : %s", _reply.state);
                        console.error("Promise  VALUE : %s", _reply.value);
                        console.error("Promise REASON : %s", _reply.reason);
                        console.error("------------- allX PROMISE REJECTED *************");
                    }

                    return _reply.value;
                });

                return arrReplies;
            });
    };
    
	
	if(!Function.hasOwnProperty('thenX'))
	Function.prototype.thenX = function () {

        //console.log("************* allX ************");
        if (!Array.isArray(this)) {
            l.e("allX fonksiyonu ancak bir dizi �st�nde �al���r!");
            throw "allX fonksiyonu ancak bir dizi �st�nde �al���r!";
        }


        /**
         * all.apply kulland���m�zda herhangi bir promise null d�nerse dizi olarak d�nm�yor
         * bu y�zden allResolved �nerilmi� daha sonrada allSettled �nerilmi�
         */
        //return Q.all.apply(null,this);
        /*
         https://github.com/kriskowal/q/issues/257
         return Q.allSettled([rejectedWith5, fulfilledWith10]).spread(function (one, two) {
         assert(one.state === "rejected");
         assert(one.reason === 5);

         assert(two.state === "fulfilled");
         assert(two.value === 10);
         });

         */

        return Q.allSettled(this)
            .then(function (_replies) {
                var arrReplies = _replies.map(function (_reply) {
                    if (_reply.state == "rejected") {
                        console.error("************* allX PROMISE REJECTED : ");
                        console.error("Promise  STATE : %s", _reply.state);
                        console.error("Promise  VALUE : %s", _reply.value);
                        console.error("Promise REASON : %s", _reply.reason);
                        console.error("------------- allX PROMISE REJECTED *************");
                    }

                    return _reply.value;
                });

                //l.i("************* allX THEN result : ");
                //l.i("\t", JSON.stringify(arrReplies));

                return arrReplies;
            });

        var sonucAllX = Q.allSettled(this);
        return sonucAllX.then(function (_sonuclar) {
            //ssg = [{"allX.then(function(sonuclar : ": _sonuclar}];
            return _sonuclar.map(function (_sonuc) {
                _sonuc.value;
            });
        });
    };

	if(!Array.hasOwnProperty('whereX'))
    /**
     *
     * @param prop
     * @param val
     * @returns {*}
     */
    Array.prototype.whereX = function (prop, val) {

        var f_deepDig = function (_prop) {

            if (typeof _prop != "object") {
                return _prop;
            }

            var sProp = "";
            for (var pName in _prop) {
                sProp += pName;
                val = _prop[pName];

                //console.log("pName:%s, sProp:%s, val:%s", pName, sProp, val)

                if (typeof val == "object") {
                    sProp += "." + f_deepDig(val);
                }
            }

            return sProp.trim('.');
        };

        prop = f_deepDig(prop);
        //console.log("prop: " + prop);

        var f_findProp = function (_obj, _prop) {
            var propValue;

            if (_prop.indexOf(".") == -1) {
                return _obj[_prop];
            }
            else {
                _prop.split(".").every(function (p) {
                    if (typeof _obj[p] != "object") {
                        propValue = _obj[p];
                        return false;  // property bulundu, de�erini d�n�yoruz
                    }

                    _obj = _obj[p];
                    return true; // hen�z bir �ey bulamad�m, aramaya devam
                });
                return propValue;
            }
        };

        for (var i = 0; Array.isArray(this) && i < this.length; i++) {
            if (f_findProp(this[i], prop) == val) {
                return this[i];
            }
        }
        return null;
    };

	if(!Array.hasOwnProperty('whereX2'))
    /**
     * Istenilen eleman� bulur bulmaz kendisini d�ner. Dizi d�nmez!
     * @param {string} prop
     * @param {*} _requestedVal
     * @returns {*}
     */
    Array.prototype.whereX2 = function (prop, _requestedVal) {
        var f_lookUp = function (_elm, _prop) {
            if (_elm.hasOwnProperty(_prop) && _elm[_prop]) {
                return _elm[_prop];
            }
            return null;
        };


        for (var i = 0; i < this.length; i++) {
            var elm = this[i];

            if (prop.indexOf(".") == -1) {
                val = f_lookUp(elm, prop, val);
            } else {
                var innerElm = elm,
                    val;
                prop.split(".").every(function (_prop, _idx, _arr) {
                    innerElm = f_lookUp(innerElm, _prop);

                    // e�er prop'unu arayaca��m�z obje null de�ilse ve Genel.Tahta.Id propertysi i�inde sonuncuya gelmemi�sek every'ye devam etmek i�in true d�nece�iz
                    if ((_idx != _arr.length - 1) && typeof innerElm == "object") {
                        if (Array.isArray(innerElm)) { // Bu property dizi ve kendisinin whereX'ini �a��raca��z
                            elm = innerElm.whereX2(_arr.slice(_idx + 1).join("."), _requestedVal);
                            val = elm ? elm[_arr[_arr.length - 1]] : undefined;
                            return false;
                        }
                        return true;
                    } else {
                        // every'ye devam edemeyiz
                        val = innerElm
                        return false;
                    }

                });
            }

            if (_requestedVal == val) {
                return elm;
            }
        }

        return null;
    };

	if(!Array.hasOwnProperty('whereXU'))
    /**
     * Aranan objeyi _ (lodash ya da underscore) �st�nden arar
     * @param {object} _arananObje
     * @returns {Array}
     */
    Array.prototype.whereXU = function (_arananObje) {
        return _.where(this, _arananObje);
    };

	if(!Array.hasOwnProperty('differenceXU'))
    /**
     * Gelen dizinin kendinden farkl� olan kay�tlar� d�ner(�rn a:[1,2,3] b:[3] =>>[1,2])
     * @param {Array}  _arr
     * @returns {Array}
     */
    Array.prototype.differenceXU = function (_arr) {
        return _.difference(this, _arr);
    };

	if(!Array.hasOwnProperty('intersectionXU'))
    /**
     * Gelen dizi ile kendisinin kesi�enlerini d�ner(�rn a:[1,2,3] b:[3] =>>[3])
     * @param {Array}  _arr
     * @returns {Array}
     */
    Array.prototype.intersectionXU = function (_arr) {
        return _.intersection(this, _arr);
    };

	if(!Array.hasOwnProperty('unionXU'))
    /**
     * Gelen dizi ile kendisini birle�tirip geri d�ner
     * @param {Array} _arr
     * @returns {Array}
     */
    Array.prototype.unionXU = function (_arr) {
        return _.union(this, _arr);
    };

	if(!Array.hasOwnProperty('findOne'))
    Array.prototype.findOne = function (prop, _requestedVal) {
        var result = null;
        debugger;

        var f_lookUp = function (_elm, _prop) {
            if (_elm.hasOwnProperty(_prop) && _elm[_prop]) {
                return _elm[_prop];
            }
            return null;
        };


        for (var i = 0; i < this.length; i++) {
            var elm = this[i];

            if (prop.indexOf(".") == -1) {
                result = f_lookUp(elm, prop, val);
            } else {
                var innerElm = elm,
                    val;
                prop.split(".").every(function (_prop, _idx, _arr) {
                    innerElm = f_lookUp(innerElm, _prop);

                    // e�er prop'unu arayaca��m�z obje null de�ilse ve Genel.Tahta.Id propertysi i�inde sonuncuya gelmemi�sek every'ye devam etmek i�in true d�nece�iz
                    if ((_idx != _arr.length - 1) && typeof innerElm == "object") {
                        return true;
                    } else {
                        // every'ye devam edemeyiz
                        val = innerElm
                        return false;
                    }

                });
            }

            if (_requestedVal == val) {
                return elm;
            }
        }

        return null;
    };

	if(!Array.hasOwnProperty('jparse'))
    Array.prototype.jparse = function () {
        var sonuc = this.map(function (elm) {
            return elm ? JSON.parse(elm) : null;
        });
        return sonuc;
    };

	if(!Array.hasOwnProperty('last'))
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

	if(!Array.hasOwnProperty('groupX'))
    Array.prototype.groupX = function (_gruplanacak, _sayilacak) {
        var result = _.chain(this)
            .groupBy(_gruplanacak)
            .map(function (value, key) {
                return {
                    Key: key,
                    Count: _.size(_.pluck(value, _sayilacak))
                }
            })
            .value();
        return result;
    };

	if(!String.hasOwnProperty('fq_jparse'))
    Array.fq_jparse = function (_arrDb) {
        console.log("gelen param: " + _arrDb);
        var d = Q.defer();
        try {
            if (Object.prototype.toString.call(_arrDb) === '[object Array]') {
                console.log("diziymi�");
                if (_arrDb.length > 0) {
                    console.log("0 dan b�y�k ve jparse metodu varm�ym��: " + _arrDb.jparse);
                    d.resolve(_arrDb.jparse());
                } else {
                    d.resolve([]);
                }
            } else {
                d.reject("f_jparse i�inde hata. Parametre dizi tipinde de�il! Parametrenin tipi: " + (typeof _arrDb) + " ve de�eri: " + _arrDb);
            }
        } catch (_ex) {
            console.log("Istisna oldu ve _ex: " + _ex);
            d.reject(_ex);
        }
        return d.promise;
    };

	if(!Array.hasOwnProperty('sumX'))
    /**
     * �rnek kullan�m
     * sumX(_.pluck(value, "Fiyat"))
     * Fiyatlar�n toplam�n� getirir
     * @param numbers
     */
    Array.sumX = function (numbers) {
        return _.reduce(numbers, function (result, current) {
            return result + parseFloat(current);
        }, 0);
    };

	if(!Date.hasOwnProperty('f_addDays'))
    Date.prototype.f_addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + parseInt(days));
        return dat;
    };


	return global;
}

//endregion

module.exports = Extensions();