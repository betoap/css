/**
 * @description
 * Polyfill para Element.closest()
 */

export function getClosest (elem, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      (<any>Element.prototype).matchesSelector ||
      (<any>Element.prototype).mozMatchesSelector ||
      (<any>Element.prototype).msMatchesSelector ||
      (<any>Element.prototype).oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        // tslint:disable-next-line:semicolon
        const matches = (this.document || this.ownerDocument).querySelectorAll(s)
                        let i = matches.length;
                        while (-- i >= 0 && matches.item(i) !== this) {}
                        return i > -1;
                      };
  }

  // Get the closest matching element
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) { return elem; }
  }
  return null;
}


