var assert = require('assert')
const { expect } = require('chai')

describe('looping', () => {
    describe('over a list of numbers', () => {
        const some_numbers = [1, 2, 3, 4, 5]
        describe('finding the sum', () => {
            const the_sum = 1 + 2 + 3 + 4 + 5
            describe('with a for loop', () => {
                it('explicitly', () => {
                    let sum = 0
                    for (let i = 0; i < some_numbers.length; i++) {6
                        sum += some_numbers[i]
                    }
                    expect(sum).to.equal(the_sum)
                })

                it('implicitly', () => {
                    let sum = 0
                    for (const n of some_numbers) {
                        sum += n
                    }
                    expect(sum).to.equal(the_sum)
                })
            })

            describe('with a HOF', () => {
                it('explicitly', () => {
                    let sum = 0
                    some_numbers.forEach((n) => {
                        sum += n
                    })
                    expect(sum).to.equal(the_sum)
                })

                it('implicitly', () => {
                    const sum = some_numbers.reduce((partial_sum, n) => partial_sum + n, 0)
                    expect(sum).to.equal(the_sum)
                })
            })
        })

        describe('finding the squares', () => {
            const the_squares = [1, 4, 9, 16, 25]
            describe('with a HOF', () => {
                it('explicitly', () => {
                    let squares = []
                    some_numbers.forEach((n) => squares.push(n * n))
                    expect(squares).to.eql(the_squares)
                }) 

                it('implicitly', () => {
                    const squares = some_numbers.map((n) => n * n)
                    expect(squares).to.eql(the_squares)
                })
            })
        })
    })

    describe('over a list of objects', () => {
        let some_objects = []
        const y_doubled      = [{ 'x': 5, 'y': 14, 'z': 13 }, { 'x': 2, 'y': 8, 'z': 8 }]
        const even_y_doubled = [{ 'x': 5, 'y': 7, 'z': 13 },  { 'x': 2, 'y': 8, 'z': 8 }]
        beforeEach(()=>{
            some_objects = [{ 'x': 5, 'y': 7, 'z': 13 }, { 'x': 2, 'y': 4, 'z': 8 }]
        })

        describe('double the y value', () => {
            describe('with a HOF', () => {
                it('implicitly', () => {
                    some_objects.forEach((o) => { o['y'] = o['y'] * 2 })
                    expect(some_objects).to.eql(y_doubled)
                })
            })
        })

        describe('double even y values', () => {
            describe('with a HOF', () => {
                it('explicitly', () => {
                    some_objects.forEach((o) => {
                        if (o['y'] % 2 == 0) {
                            o['y'] = o['y'] * 2
                        }
                    })
                    expect(some_objects).to.eql(even_y_doubled)
                })

                it('implicitly', () => {
                    some_objects.filter((o)=>o['y'] %2 == 0).forEach((o) => {o['y'] = o['y'] * 2})
                    expect(some_objects).to.eql(even_y_doubled)
                })

                it('implicitly, with names', () => {
                    const y_is_even = (o) => o['y'] % 2 == 0
                    const double_y = (o) => { o['y'] = o['y'] * 2 }
                    some_objects.filter(y_is_even).forEach(double_y)
                    expect(some_objects).to.eql(even_y_doubled)
                })

                it('more implicitly, with names', () => {
                    const y_is_even = (o) => o['y'] % 2 == 0
                    const doubled_y = (o) => { return { 'x': o['x'], 'y': o['y'] * 2, 'z':o['z'] }}
                    const other_than = (f) => { return (o) => !f(o) }

                    the_objects = some_objects.filter(other_than(y_is_even)).concat(some_objects.filter(y_is_even).map(doubled_y))

                    expect(the_objects).to.eql(even_y_doubled)
                })

                it('more implicitly, with better names', () => {
                    const has_even = (key) => { return (o) => o[key] % 2 == 0 }
                    const doubled_y = (o) => { return { 'x': o['x'], 'y': o['y'] * 2, 'z': o['z'] } }
                    const other_than = (f) => { return (o) => !f(o) }

                    the_objects = some_objects.filter(other_than(has_even('y'))).concat(some_objects.filter(has_even('y')).map(doubled_y))

                    expect(the_objects).to.eql(even_y_doubled)
                })
            })
        })
    })
})
    
describe('collections', () => {
    describe('look up a string from an int', () => {
        describe('in an array', () => {
            it('finds the right one', () => {
                const list = ["zero", "one", "two"]
                expect(list[1]).to.equal("one")
            })
        })
        describe('in a dictionary', () => {
            it('finds the right one', () => {
                const dictionary = { 0: "zero", 1: "one", 2: "two" }
                expect(dictionary[1]).to.equal("one")
            })
        })
    })
 })