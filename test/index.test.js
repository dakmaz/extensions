var expect = require('expect');
var should = require('should');
var assert = require('chai').assert;
var extension = require('../src/index');

describe('Object uzant�lar�n�n testi',function(){
	
	it('extension obje olmal�', function(){
		assert(typeof extension==='object', 'extension obje de�il');
	});
	
	it('__stack property olarak var',function(){
		assert.property(extension,'__stack');
	});
	
	it('ssr property olarak var',function(){
		assert.property(extension,'ssr');
	});
	
	it('jparse dizi i�indeki stringler json d�n���m� yap�labilir',function(){
		var o = {Adi:"Cem"};
		var a = [JSON.stringify(o),JSON.stringify(o),JSON.stringify(o)];
		var b = a.jparse();
		assert.isArray(b,'Dizi de�il');		
	});
	
})