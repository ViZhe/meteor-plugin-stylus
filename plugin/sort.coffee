
# TODO: optimize sort
@sortFiles = (fileA, fileB) ->
    fileAPath = fileA.getPathInPackage()
    fileBPath = fileB.getPathInPackage()

    regexVars = /client\/styles\/vars\//
    regexMixins = /client\/styles\/mixins\//
    regexTop = /client\/styles\/top\//
    regexMiddle = /client\/styles\/middle\//
    regexBottom = /client\/styles\/bottom\//
    regexLib = /client\/lib\//

    fileAvar = regexVars.test(fileAPath)
    fileBvar = regexVars.test(fileBPath)
    fileAmixin = regexMixins.test(fileAPath)
    fileBmixin = regexMixins.test(fileBPath)
    fileAtop = regexTop.test(fileAPath)
    fileBtop = regexTop.test(fileBPath)
    fileAmiddle = regexMiddle.test(fileAPath)
    fileBmiddle = regexMiddle.test(fileBPath)
    fileAbottom = regexBottom.test(fileAPath)
    fileBbottom = regexBottom.test(fileBPath)
    fileAlib = regexLib.test(fileAPath)
    fileBlib = regexLib.test(fileBPath)

    a1st = -1
    b1st = 1
    sortAlphabet =  if fileAPath < fileBPath then a1st else b1st

    if fileAvar
        if fileBvar
            sortAlphabet
        else
            a1st

    else if fileAmixin
        if fileBmixin
            sortAlphabet
        else
            if fileBvar
                b1st
            else
                a1st

    else if fileAtop
        if !fileBvar && !fileBmixin
            if fileBtop
                sortAlphabet
            else
                a1st
        else
            b1st

    else if fileAmiddle
        if !fileBvar && !fileBmixin && !fileBtop
            if fileBmiddle
                sortAlphabet
            else
                a1st
        else
            b1st

    else if fileAbottom
        if !fileBvar && !fileBmixin && !fileBtop && !fileBmiddle
            if fileBbottom
                sortAlphabet
            else
                a1st
        else
            b1st
    else if fileAlib
        if !fileBvar && !fileBmixin && !fileBtop && !fileBmiddle && !fileAbottom
            if fileBlib
                sortAlphabet
            else
                a1st
        else
            b1st

    else
        sortAlphabet
