import {
    img_logo,
    img_eyes0,
    img_eyes1,
    img_eyes2,
    img_eyes3,
    img_eyes4,
    img_eyes5,
    img_eyes6,
    img_face0,
    img_face1,
    img_face2,
    img_mouth0,
    img_mouth1,
    img_mouth2,
    img_mouth3,
    img_mouth4,
    img_mouth5,
    img_mouth6,
    img_mouth7,
    
} from "../images/emoji";

export const getImgSrc = (imgId, type) => {

    if (imgId === null) {
        return img_logo;
        
    } else {
        let result;
        
        if (type === "f") {
            switch (imgId) {
                case '1' : result = img_face1; break;
                case '2' : result = img_face2; break;
                default: result = img_face0; break;
            }
        }
        
        if (type === "e") {
            switch (imgId) {
                case '1' : result = img_eyes1; break;
                case '2' : result = img_eyes2; break;
                case '3' : result = img_eyes3; break;
                case '4' : result = img_eyes4; break;
                case '5' : result = img_eyes5; break;
                case '6' : result = img_eyes6; break;
                default: result = img_eyes0; break;
            }
        }
    
        if (type === "m") {
            switch (imgId) {
                case '1' : result = img_mouth1; break;
                case '2' : result = img_mouth2; break;
                case '3' : result = img_mouth3; break;
                case '4' : result = img_mouth4; break;
                case '5' : result = img_mouth5; break;
                case '6' : result = img_mouth6; break;
                case '7' : result = img_mouth7; break;
                default: result = img_mouth0; break;
            }
        }
        
        return result;
    }

}

export default getImgSrc;