var assert = require('assert')
var sll = require('../src/list')

const { expect } = require('chai')
    
describe('collections', () => {
    describe('built-in', () => {
        describe('look up a string from an int', () => {
            describe('in an array', () => {
                it('finds the right one', () => {
                    const list = ["zero", "one", "two"]
                    expect(list[1]).to.equal("one")
                })
            })
            describe('in a map', () => {
                it('finds the right one', () => {
                    const map = { 0: "zero", 1: "one", 2: "two" }
                    expect(map[1]).to.equal("one")
                })
            })
        })
    })
    describe('home-brewed', () => {
        describe('single-linked list', () => {
            describe('implementation', () => {
                it('finds the head of a list', () => {
                    expect(sll.head(sll.listWith('foo'))).to.equal('foo')
                    expect(sll.head(sll.prepend('bar'), sll.listWith('foo'))).to.equal('bar')
                })
                it('finds the tail of a list', () => {
                    expect(sll.tail(sll.listWith('foo'))).to.equal(sll.empty)
                    expect(sll.tail(sll.prepend('bar', sll.listWith('foo')))).to.eql(sll.listWith('foo'))
                })
                it('makes a long list', () => {
                    expect(sll.listOf('baz', 'bar', 'foo')).to.eql(sll.prepend('baz', sll.prepend('bar', sll.listWith('foo'))))
                })
            })
            describe('look up a string from an int', () => {
                const list = sll.listOf('zero', 'one', 'two')
                it('finds the right one', () => {
                    expect(sll.lookup(1, list)).to.equal('one')
                })
            })
        })
    })
 })