Hey listen, this has nothing to do with the gender of **people** and
everything to do with the gender of **nouns**.

<img src="/images/app-screenshot.jpg" width="640"/>

# Genderizer

**Genderizer** is a Chrome extension that helps advanced language learners
build stronger associations between nouns and their gender by color-coding
them in the browser. It currently offers German and Spanish language support,
and the colors are fully customizable to your preference and accessibility
needs.

## Installation

Genderizer is not yet available in the Chrome Web Store, but you can still try
it out:
1. Download or clone this repo using the green Code button at the top of this
   page
2. Put your Chrome extensions in developer mode using the toggle at the upper
   right of the extensions page
3. Click on "Load unpacked" and point it at the directory where you put the
   Genderizer repo

## Use
When Genderizer is on, it auto-detects the language of each page as it loads and will colorize if the text contains one of the languages Genderizer currently supports.

<img src="/images/ui-screenshot.jpg" width="200"/>

You can control Genderizer's behavior by clicking its icon in your browser. In
this menu, you can toggle Genderizer on and off and select custom colors.
Clicking Save will reload your current tab and re-colorize using your new
selections, while Reset will restore the original default colors. Your colors
will persist across tabs and browser sessions.

## FAQs
### Not all of the nouns are being colorized, what gives?
Genderizer relies on a list of words for each language. The lists are pretty
big, but they don't contain every possible noun (especially in German, where
compound nouns are extremely common). For the moment, if the word isn't in the
list, it won't get colorized.

### I found a noun that's being colorized incorrectly, how do I let you know?
Please open an issue!

### How did you choose default colors? How should I decide on new ones?
Regardless of how we personally feel about cultural gender/color associations,
they are pre-existing associations that we don't need to work to acquire.
Building the grammatical gender associations on top of existing color cues is
more likely to be helpful quickly than simultaneously building new
associations between nouns and gender and color.

That's a long way of saying: if the default colors aren't meaningful or
helpful to you, pick new ones that are! The less work your brain has to do to
tie together color and gender, the better.

### I wish this supported <insert_language_here>, how can I help?
Genderizer can easily be extended to support other languages that make use of
any or all of feminine, masculine, neuter, and ambiguous grammatical gender --
all it takes is a word list! A word list should be a json object containing
key-value pairs of nouns and their genders. I do not recommend attempting to
manually compile a word list (unless your language has a very small vocabulary). Take a peek at the dictionaries in the [lexicon](/lexicon) directory to see what a word list looks like.

## Credits and Thanks
I created Genderizer during my time at the [Recurse
Center](https://www.recurse.com/), a retreat for programmers. Thanks to
[@pius](https://github.com/pius), [@rolandcrosby](https://github.com/rolandcrosby), and [@JohnEarnest](https://github.com/JohnEarnest/) for the assists, and huge
credit to [@lbernick](https://github.com/lbernick) for adding Spanish language
support.

The German lexicon contains data extracted from
[languagetool-org/german-pos-dict](https://github.com/languagetool-org/german-pos-dict)
under
[CC-BY-SA-4.0](https://github.com/languagetool-org/german-pos-dict/blob/master/LICENSE).

