const empty = {}
function newCell(item, next) { return { 'item': item, 'next': next } }
function listWith(item) { return newCell(item, empty) }
function prepend(item, list) { return newCell(item, list) }
function head(cell) { return cell['item'] }
function tail(cell) { return cell['next'] }
function listOf(...items) { return items.reduceRight((list, next) => prepend(next, list), empty) }
function lookup(index, list) {
    if (0 == index) {
        return head(list)
    } else {
        return lookup(index - 1, tail(list))
    }
}

exports.empty = empty
exports.head = head
exports.tail = tail
exports.listWith = listWith
exports.listOf = listOf
exports.prepend = prepend
exports.lookup = lookup
