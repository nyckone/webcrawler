remove_duplicates = (arr) => {
    return arr.filter((element, index, self) => self.indexOf(element) === index)
}

module.exports = {
    remove_duplicates: remove_duplicates
}