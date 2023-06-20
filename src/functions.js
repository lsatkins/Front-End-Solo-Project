
export const findQuery = (string) => {

    const cutFront = string.substring(10)
    
    const cutEnd = cutFront.slice(0, -2)

    return cutEnd

}

export const shortDescription = (string) => {
    if(string.length > 100){
        string = string.substring(0, 100) + ' ...'
    }
    return string
}

export const getId = (string) => {
    let newString = ''
    for(let i = 0; i <string.length; i++){
        if(string[i]!== '/'){
            newString += string[i]
        }
    }
    return newString
}
