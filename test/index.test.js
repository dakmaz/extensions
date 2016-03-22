var expect = require('expect');
var should = require('should');
var assert = require('chai').assert;
var extension = require('../src/index');

describe('Object uzantýlarýnýn testi',function(){
	
	it('extension obje olmalý', function(){
		assert(typeof extension==='object', 'extension obje deðil');
	});
	
	it('__stack property olarak var',function(){
		assert.property(extension,'__stack');
	});
	
	it('ssr property olarak var',function(){
		assert.property(extension,'ssr');
	});
	
	it('jparse dizi içindeki stringler json dönüþümü yapýlabilir',function(){
		var o = {Adi:"Cem"};
		var a = [JSON.stringify(o),JSON.stringify(o),JSON.stringify(o)];
		var b = a.jparse();
		assert.isArray(b,'Dizi deðil');		
	});
	
})