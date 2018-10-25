module.exports = function contains(parent, child) {
    if (parent.contains) {
        return parent.contains(child);
    } else if (parent.compareDocumentPosition) {
        return parent === child || !!(parent.compareDocumentPosition(child) & 16);
    } else {
        if (child) do {
            if (child === parent) return true;
        } while ((child = child.parentNode));
        return false;
    }
}
